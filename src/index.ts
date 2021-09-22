import { Handler, HandlerResponse } from "@netlify/functions";

function hello(): HandlerResponse {
  return {
    statusCode: 200,
    body: "Hello from Netlify Functions!",
  };
}

function goodbye(): HandlerResponse {
  return {
    statusCode: 200,
    body: "Goodbye from Netlify Functions!",
  };
}

function index(): HandlerResponse {
  return {
    statusCode: 200,
    multiValueHeaders: {
      "Set-Cookie": ["cookie1=value=1", "cookie2=value=2", "cookie3=value=3"],
    },
    body: "Check those cookies",
  };
}

const routes: { [path: string]: () => HandlerResponse } = {
  "/hello": hello,
  "/goodbye": goodbye,
  "/": index,
};

const server: Handler = (event) => {
  let route = routes[event.path];

  if (!route) {
    return {
      statusCode: 404,
      body: "Not found",
    };
  }

  return route();
};

export { server };
