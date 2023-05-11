import { IncomingMessage } from "http";
import type { Response } from "light-my-request";
import { objFormat, BRIEF, COLUMNS } from "obj-console";
import type { FormatOptions } from "obj-console";
import paint from "./paint";

export interface RpOptions {
  showHeaders?: boolean;
  body?: FormatOptions;
}
const defaults: Required<RpOptions> = {
  showHeaders: false,
  body: { maxArrayLength: 5, maxStringLength: 50, unfoldDepth: 1 }
}
/**
 * Print inject.Response to terminal.
 * In fact it's a response from light-my-request module.
 * Usage: `app.inject(opts).then(printResponse)`
 */
export function printResponse(reply: Response, options?: RpOptions) {
  const opts = Object.assign({}, defaults, options);

  // TITLE, like: "200  GET some/url"
  console.log();
  console.log("===================================================");
  process.stdout.write(formatStatus(reply.statusCode));
  process.stdout.write(" ");
  process.stdout.write(formatRequest(reply.raw.req) + '\n');

  // HTTP HEADERS
  if (opts.showHeaders) {
    console.log("\n----- RESPONSE HEADERS ----------------------------");
    console.log(objFormat(reply.headers, COLUMNS));
  }

  // RESPONSE BODY
  let bg: string, fopts: FormatOptions;
  if (reply.statusCode > 199 && reply.statusCode < 300) {
    bg = "#0f171b";
    fopts = opts.body;
  } else {
    bg = "#2d0000"
    fopts = { maxStringLength: 0, unfoldDepth: 1 };
  }
  process.stdout.write(paint.bg(bg, "", false)); // paint gb depending on status
  process.stdout.write("----- RESPONSE BODY -------------------------------\n");
  process.stdout.write(objFormat(reply.json(), fopts) + paint.reset() + '\n');
}


// COLORS
const colors: { [name: string]: string } = {
  ok: "1B5E20",
  warn: "FF6F00",
  err: "B71C1C",

  GET: "37474F",
  POST: "004D40",
  PUT: "3E2723",
  PATCH: "854b2b",
  DELETE: "6f003b",
  DEFAULT: "01579B",
};

// HELPERS

function formatStatus(status: number) {
  const str = " " + status + " ";
  if (status < 200) return paint.bg(colors.warn, str);
  if (status < 300) return paint.bg(colors.ok, str);
  if (status < 400) return paint.bg(colors.warn, str);
  return paint.bg(colors.err, str);
}

function formatRequest(req: IncomingMessage) {
  const { method, url } = req;
  const color = colors[method || ""] || colors.DEFAULT;
  return paint.bg(color, (" " + method + " " + url + " "));
}
