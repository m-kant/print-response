import { FastifyReply } from "fastify";
import { onRequestHookHandler, onSendHookHandler } from "fastify/types/hooks";


export const requestLog: onRequestHookHandler = function (req, _res, done) {
  (req as any).logTs = Date.now();
  const reqData = req.body || req.query || "";
  console.log(
    req.id,
    '<',
    req.method, '\t',
    req.url, '\t',
    extractReferrers(req), '\t',
    shortJson(reqData)
  );
  done();
};

export const responseLog: onSendHookHandler<any> = function (req, res, payload, done) {
  const err = null;
  const dur = Date.now() - (req as any).logTs + 'ms'
  console.info(
    req.id,
    '>',
    req.method.substring(0, 1),
    res.statusCode, '\t',
    dur + '\t',
    formatResponse(res,payload)
  );
  done(err, payload);
}


/** return referrer IP, if x-forwarded-for header is set, adds this IPs too */
function extractReferrers(req: any) {
  let r = req.ip;
  if (req.ips) {
    r += ', ' + req.ips.join('<');
  }
  return r as string;
}
/** puts reply body in one line.
 * It can be payload, headers or something else, depending on reply */
function formatResponse(res: FastifyReply<any>, payload: any,) {
  const length = 150;
  let str = '';
  if (payload) {
    // if static files
    if (payload.filename) {
      return 'file://' + payload.filename;
    }
    // obj or string
    str = typeof payload === "string" ? payload : JSON.stringify(payload);
  } else {
    str = 'HEADERS: ' + JSON.stringify(res.getHeaders());
  }
  // cut string
  if (str.length > length) {
    str = str.substring(0, length - 11) + "... + " + (str.length - length - 11) + "chrs.";
  }
  return str;
}


/**
 * cuts string by "length", adds remaining chars count like this:
 * {"firstName":"Samuel","lastName... + 54chrs.
 * automatically stringifies objects to JSON
 */
function shortJson(data: any, length = 150) {
  let str = typeof data === "string" ? data : JSON.stringify(data);
  if (str.length > length) {
    str = str.substring(0, length - 11) + "... + " + (str.length - length - 11) + "chrs.";
  }
  return str;
}
