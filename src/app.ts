import * as Hapi from "@hapi/hapi";
import * as HapiSwagger from "hapi-swagger";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import { routes } from "./routing";

// code omitted for brevity

(async () => {
  const server = await new Hapi.Server({
    host: "localhost",
    port: 3000
  });
  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: "Test API Documentation"
    }
  };

  const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
      plugin: Inert
    },
    {
      plugin: Vision
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ];

  await server.register(plugins);
  await server.route(routes);

  try {
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.log(err);
  }
})();
