import * as z from "zod";
import AWS from "aws-sdk";
import Knex from "knex";
import childProcess from "child_process";
import fs from "fs";
import logger from "./logger";
import path from "path";
import util from "util";

const s3 = new AWS.S3({ apiVersion: "latest" });
const Bucket = "wilsjs";
const Key = `${z.string().parse(process.env.NODE_ENV)}.sqlite3`;
const filename = path.join(process.cwd(), Key);

const knexConfig: Knex.Config = {
  client: "sqlite3",
  connection: { filename },
  useNullAsDefault: true,
};

const knex = Knex(knexConfig);
const exec = util.promisify(childProcess.exec);

void main();

export default knex;

export async function main(): Promise<void> {
  try {
    const getParams = {
      Bucket,
      Key,
    };

    const s3Stream = s3.getObject(getParams).createReadStream();
    const fileStream = fs.createWriteStream(filename);
    s3Stream.pipe(fileStream);
    logger.info(await exec("npm run knex-migrate"));

    const putParams = {
      Body: fs.createReadStream(filename),
      Bucket,
      Key,
    };

    logger.info(await s3.putObject(putParams).promise());
  } catch (err) {
    logger.error(err);
  }
}
