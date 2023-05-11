# print-response

Print beautified Fastify inject-response in terminal: app.inject(opts).then(printResponse). Color indication of http-status and http-method, brief representation of massive body, optional headers output.

`app.inject({ method: 'GET', url: 'sample/users' }).then(response => {printResponse(response, {showHeaders: true})})`

![fastify.inject() response](./docs/2023-05-11_16-24-40.png)

`app.inject({ method: 'GET', url: 'sample/users/2' }).then(printResponse)`
![fastify.inject() response](./docs/2023-05-11_16-25-43.png)

`app.inject({ method: 'GET', url: 'sample/usersZZ' }).then(printResponse)`
![fastify.inject() response](./docs/2023-05-11_16-27-21.png)

## Usage

```javascript
import app from "./fapp";
import printResponse from 'print-response';


```
