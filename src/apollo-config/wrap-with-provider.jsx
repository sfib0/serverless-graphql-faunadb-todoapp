import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo-setup";

export default function wrapWithProvider({ element }) {
  return <ApolloProvider client={client}> {element} </ApolloProvider>;
}