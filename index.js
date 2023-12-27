import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { createApolloGraphqlServer } from "./src/gql/index.js";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(express.json());

  
  app.use("/graphql",expressMiddleware(await createApolloGraphqlServer()))

  app.listen(PORT, () => {
    console.log("server listening at " + PORT);
  });
}

init();
