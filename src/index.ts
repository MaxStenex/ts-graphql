import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { LoginResolver } from "./modules/user/Login";
import { RegisterResolver } from "./modules/user/Register";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log("Server started on http://localhost:4000/graphql"));
};

main();
