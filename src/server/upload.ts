import * as _ from "underscore";
import * as fs from "fs";
import * as request from "request";
import {v4 as uuidv4} from "uuid";
import {UploadedFile} from "express-fileupload";

import * as nx from "../notatrix";
import {UploadError} from "./errors";
import {CorpusDB} from "./models/corpus-json";

function upload(treebank: string, filename: string, contents: string, next: (err: Error|null, data?: unknown) => void) {

  console.log("uploading");
  try {

    const corpus = nx.Corpus.fromString(contents);
    // console.log(corpus);
    corpus.filename = filename;
    return CorpusDB.create(treebank).save(filename, corpus.serialize(), next);

  } catch (e) {

    next(new UploadError(e.message));
  }
}

export function fromFile(treebank: string, file: UploadedFile, next: (err: Error|null, data?: unknown) => void) {

  if (!file)
    return next(new UploadError(`No file provided.`));

  const contents = file.data.toString();
  return upload(treebank, file.name, contents, next);
}

export function fromGitHub(treebank: string, url: string, next: (err: Error|null, data?: unknown) => void) {

  if (!url)
    return next(new UploadError(`No URL provided.`));

  // regex magic
  const match = url.match(
      /^(https?:\/\/)?(github\.com|raw\.githubusercontent\.com)\/([\w\d]*)\/([^/]*)\/(tree\/|blob\/)?([^/]*)\/(.*)$/);
  if (!match)
    return next(new UploadError(`Unsupported URL format: ${url}`));

  const [string, protocol, domain, owner, repo, blob_or_tree, branch, filepath] = match;

  const filename = `${repo}__${branch}__${filepath.replace(/\//g, "__")}`;
  const rawURL = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filepath}`;

  request.get(rawURL, (err, _res, body) => {
    if (err)
      return next(err);

    return upload(treebank, filename, body, next);
  });
}
