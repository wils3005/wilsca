import FS from "fs";
import REPL from "repl";
import * as Zod from "zod";

class Application {
  gems = FS.readFileSync(`${__dirname}/gems.txt`).toString().split("\n");

  deps = FS.readFileSync(`${__dirname}/deps.txt`)
    .toString()
    .split("\n\n")
    .map((s) => s.split("\n"))
    .reduce((obj: Record<string, string[]>, a) => {
      const key = Zod.string()
        .parse(a.shift())
        .replace(/Gem /, "")
        .replace(/-\d+\.\d+\.\d+/, "");

      // const obj: Record<string, string[]> = {};
      obj[key] = a.map((s) => s.trim().replace(/\s\(.+\)/, ""));
      return obj;
    }, {});

  asdf = Object.entries(this.deps).reduce((acc, elem) => {
    const key = elem.shift();
    acc[key] = val.map();
    return acc;
  }, {});
}

Object.assign(REPL.start("repl> ").context, { app: new Application() });

export { Application };
