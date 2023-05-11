import app from "./fapp";
import { printResponse } from '../src/print-response';
// Импортируйте нужные контроллеры, или репо
import './api/users.controller'

main();

async function main() {
  let response;
  /*
    запрашивайте сервер с помощью inject (без старта всего сервера на реальном порту)
    response = await app.inject({ method: 'GET', url: 'your/endpoint' })
    печатайте ответы в консоль:
    printResponse(response)
    или отдельные объекты через fjson() - formatted json:
    fjson(response.json())
  */

  response = await app.inject({ method: 'GET', url: 'sample/users' })
  printResponse(response, {showHeaders: true})

  app.inject({ method: 'GET', url: 'sample/users/2' }).then(printResponse)


  response = await app.inject({ method: 'POST', url: 'sample/usersZZ' })
  printResponse(response)

}

