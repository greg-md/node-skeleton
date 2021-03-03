import gql from 'graphql-tag';
import { print } from 'graphql';
import { Tab, endpoint, authHeaders } from './tab';

export const helloWorld = gql`
  query helloWorld {
    helloWorld
  }
`;

export const sayHello = gql`
  mutation sayHello($hello: HelloInput!) {
    sayHello(hello: $hello)
  }
`;

export const onHello = gql`
  subscription onHello {
    onHello
  }
`;

export const HelloWorldTab: Tab = {
  endpoint,
  name: 'Hello World',
  query: print(helloWorld),
  headers: { ...authHeaders },
};

export const SayHelloTab: Tab = {
  endpoint,
  name: 'Say Hello',
  query: print(sayHello),
  variables: JSON.stringify({
    name: 'John',
  }),
  headers: { ...authHeaders }
};

export const OnHelloTab: Tab = {
  endpoint,
  name: 'On Hello',
  query: print(onHello),
  headers: { ...authHeaders },
};
