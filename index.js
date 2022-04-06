const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./Schema/TypeDefs");
const { resolvers } = require("./Schema/Resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ port }) => {
    console.log(`Server ready on port:${port}`);
  })
  .catch((err) => {
    console.log("Error in responding the server", err.message);
  });
