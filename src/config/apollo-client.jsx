import { ApolloClient, InMemoryCache } from "@apollo/client";
import { hasurKey } from "../utils/constants";

const client = new ApolloClient({
  uri: "https://allowing-wildcat-17.hasura.app/v1/graphql",
  cache: new InMemoryCache({ addTypename: false }),
  headers: {
    "x-hasura-admin-secret": hasurKey,
  },
});

export default client;
