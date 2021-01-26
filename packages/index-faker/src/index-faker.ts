#!/usr/bin/env node

import { HTML } from "./html";
import { format } from "prettier";

console.log(
  format(`<!DOCTYPE html>${new HTML().toString()}`, { parser: "html" })
);

export {};
