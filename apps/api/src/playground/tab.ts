export const endpoint = '/graphql';

export const authHeaders = {
  authorization: 'Bearer ',
};

export type Tab = {
  endpoint: string;
  query: string;
  name?: string;
  variables?: string;
  responses?: string[];
  headers?: {
    [key: string]: string;
  };
};
