/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String, $receiver: String) {
    onCreateMessage(owner: $owner, receiver: $receiver) {
      id
      status
      content
      owner
      receiver
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String, $receiver: String) {
    onUpdateMessage(owner: $owner, receiver: $receiver) {
      id
      status
      content
      owner
      receiver
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String, $receiver: String) {
    onDeleteMessage(owner: $owner, receiver: $receiver) {
      id
      status
      content
      owner
      receiver
      createdAt
      updatedAt
    }
  }
`;
