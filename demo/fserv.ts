import ip from "ip";
import config from "./config";
import { requestLog, responseLog } from './common/http-log';
import app from "./fapp";
// import './app.controllers'

// --- LOG requsets / responses ---------

app.addHook("onRequest", requestLog);
app.addHook("onSend", responseLog);


// --- CONTROLLERS ----------------------
import "./api/users.controller";


// --- START ----------------------------
const port = config.port;

async function main() {
  try {
    app.listen({ port, host: "0.0.0.0" }, (err, address) => {
      if (err) throw err;
      console.log("-----------------------------------------");
      console.log("Server in", config.isDev ? "DEVELOPMENT" : "PRODUCTION", "mode:");
      console.log(`  http://localhost:${port}`);
      console.log(" ", address);
      console.log(`  http://${ip.address()}:${port}`);
      console.log('-----------------------------------------\n');
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

main();
