import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://al-fatih123.hasura.app/v1/graphql",
  cache: new InMemoryCache({ addTypename: false }),
  headers: {
    "x-hasura-admin-secret": "ag24qAyOejXlqfVHJ7o6mbprs5oz6PaUAaO4aubSCA5OTzw6VIc4Gw2GcUXnp3g5",
  },
});

export default client;
