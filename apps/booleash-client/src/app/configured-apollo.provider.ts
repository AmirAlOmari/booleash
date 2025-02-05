import { inject } from '@angular/core';
import { InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

export function provideConfiguredApollo() {
  return provideApollo(() => {
    const httpLinkFactory = inject(HttpLink);

    const httpLink = httpLinkFactory.create({
      uri: 'http://localhost:3000/graphql',
    });
    const wsLink = new GraphQLWsLink(
      createClient({
        url: 'ws://localhost:3000/graphql',
      })
    );

    // Using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // Split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === Kind.OPERATION_DEFINITION &&
          definition.operation === OperationTypeNode.SUBSCRIPTION
        );
      },
      wsLink,
      httpLink
    );
    const cache = new InMemoryCache();

    return { link, cache };
  });
}
