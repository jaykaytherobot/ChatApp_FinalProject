/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      status
      content
      owner
      client
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        content
        owner
        client
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByOwner = /* GraphQL */ `
  query MessagesByOwner(
    $owner: String
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        content
        owner
        client
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByClient = /* GraphQL */ `
  query MessagesByClient(
    $client: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByClient(
      client: $client
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        content
        owner
        client
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByStatus = /* GraphQL */ `
  query MessagesByStatus(
    $status: Status
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByStatus(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        content
        owner
        client
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
