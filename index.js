import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {prismaClient} from "./lib/db.js"
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
        type Mutation{
            createUser(firstName:String!, lastName:String!, email:String!, password:String!):Boolean
        }
    `,
    resolvers: {
        Query:{
            hello:()=>"hello! eeryone",
            say:(_,{name})=>`hello ${name}`
        },
        Mutation:{
            createUser:async (_,{firstName, lastName, email, password})=>{
                await prismaClient.user.create({
                    data:{
                        firstName,
                        lastName,
                        email,
                        password,
                        salt:"Random"
                    }
                })
                return true
            }
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
