import { ApolloServer } from "@apollo/server";
import { User } from "./User/index.js";


export async function createApolloGraphqlServer(){
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                ${User.Query}
            }
            type Mutation{
                ${User.Mutation}
            }
        `,
        resolvers: {
            Query:{
                ...User.resolvers.Query,
            },
            Mutation:{
                ...User.resolvers.Mutation,
            }
        },
      });
    
      await gqlServer.start()
      return gqlServer
}