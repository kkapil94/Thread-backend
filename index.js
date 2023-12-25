import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query{
            hello:String
            say(name:String):String
        }
    `,
    resolvers: {
        Query:{
            hello:()=>"hello! eeryone",
            say:(_,{name})=>`hello ${name}`
        }
    },
  });

  await gqlServer.start()
  app.use("/graphql",expressMiddleware(gqlServer))

  app.listen(PORT, () => {
    console.log("server listening at " + PORT);
  });
}

init();
