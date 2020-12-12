import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";
import "reflect-metadata";

@Resolver()
class HelloResolver {
  @Query(() => String!)
  async hello() {
    return "Hello, World!";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log("Server started on http://localhost:4000"));
};

main();
