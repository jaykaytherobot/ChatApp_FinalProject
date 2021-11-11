/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String, $client: String) {
    onCreateMessage(owner: $owner, client: $client) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String, $client: String) {
    onUpdateMessage(owner: $owner, client: $client) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String, $client: String) {
    onDeleteMessage(owner: $owner, client: $client) {
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
