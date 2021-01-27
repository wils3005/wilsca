#!/usr/bin/env node

import { format } from "prettier";
import { html } from "./html";

console.log(format(html(), { parser: "html" }));

export {};
