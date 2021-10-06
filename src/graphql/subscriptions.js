/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat {
    onCreateChat {
      id
      messages {
        items {
          id
          chatID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat {
    onUpdateChat {
      id
      messages {
        items {
          id
          chatID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat {
    onDeleteChat {
      id
      messages {
        items {
          id
          chatID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String!) {
    onCreateMessage(owner: $owner) {
      id
      chatID
      chat {
        id
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String!) {
    onUpdateMessage(owner: $owner) {
      id
      chatID
      chat {
        id
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String!) {
    onDeleteMessage(owner: $owner) {
      id
      chatID
      chat {
        id
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
