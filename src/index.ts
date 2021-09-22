import { Handler, HandlerResponse } from "@netlify/functions";

function createHTML(text: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        ${text}
      </body>
    </html>
  `;
}

function hello(): HandlerResponse {
  return {
    statusCode: 201,
    body: createHTML("Hello from Netlify Functions!"),
    multiValueHeaders: {
      "Content-Type": ["text/html"],
    },
  };
}

function goodbye(): HandlerResponse {
  return {
    statusCode: 200,
    body: createHTML("Goodbye from Netlify Functions!"),
    multiValueHeaders: {
      "Content-Type": ["text/html"],
    },
  };
}

function index(): HandlerResponse {
  return {
    statusCode: 200,
    multiValueHeaders: {
      "Content-Type": ["text/html"],
      "Set-Cookie": [
        "cookie1=value1",
        "cookie2=value2",
        "cookie3=value3",
        "cookie4=value4",
        "cookie5=value5",
      ],
    },
    body: createHTML("Check those cookies"),
  };
}

const routes: { [path: string]: () => HandlerResponse | undefined } = {
  "/hello": hello,
  "/goodbye": goodbye,
  "/": index,
};

const createRequestHandler: Handler = (event) => {
  let route = routes[event.path];

  if (!route) {
    return {
      statusCode: 404,
      body: createHTML("Not found"),
      multiValueHeaders: {
        "Content-Type": ["text/html"],
      },
    };
  }

  return route();
};

export { createRequestHandler };
