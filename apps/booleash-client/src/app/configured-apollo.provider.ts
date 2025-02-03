import { inject } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

export function provideConfiguredApollo() {
  return provideApollo(() => {
    const httpLink = inject(HttpLink);

    return {
      link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache(),
    };
  });
}
