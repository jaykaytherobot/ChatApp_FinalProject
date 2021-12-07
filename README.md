# Chat application with React and Amplify
_Final project for Bachelor of Science from University of Iceland by Jóhannes Kári Sólmundarson_

## Purpose
The projects purpose is to create a chat application where _Clients_ can send messages to an organization (like a health clinic) and receive messages. The messages the clients can receive can in principle be from any actor i.e. personell from the organization, a pre-determined stream of messages, or a chat bot. The project provides the functionality to receive messages from personell but built with ease of extending it for other sources of messages in mind. 

## Technical stack
The project uses React to build the user interface and Amplify for a quick backend functionality. React was chosen because it would be relatively easy to transform the front end into React native and creating the possibility to extend the website to an app.

### Authentication
I used UserPools to manage the authentication of users. There are two types of users, personell who are part of the _Personell_ user group and users who are not part of any user group, and can be thought of as _Clients_ who initiate contact with the system. 

### API and schema
I used the GraphQL Transform library to create an AWS backend. The Transform library provides directives, the most important one being the @model, that convert the data model into AWS CloudFormation templates that implement it. The schema is [here](./amplify/backend/api/nordversechatapp/schema.graphql). There you can see that the user group _Personell_ has read privileges on all _Messages_ whereas _Clients_ have read privileges on all _Messages_ they have sent and have been sent to them, via the @auth rules.

## How it works
The React front end is responsible for taking the user input and performing the relevant API calls. There are two components that are worth highlighting here. 

First is the [MessageInput](./src/components/MessageInput/MessageInput.js) component. This is a relatively simple html form element that, on submit, sends the _Message_ written to the input and sends it via createMessage mutation to the API. 

The second are the [ClientArea](./src/components/ClientArea/ClientArea.js) and the [PersonellArea](./src/components/PersonellArea/PersonellArea.js). _(They are almost the same component, with the only distinction being that there is the added functionality in PersonellArea to switch between chats they are viewing, and future possibly added functionality.)_  They first fetch all the _Messages_ sent to and from the _Client_ and then they subscribe to all _Messages_ sent to and from the _Client_. The _Messages_ are stored in the components state in a list, and are displayed in the [ChatHistory](./src/components/ChatHistory/ChatHistory.js). When a new _Message_ is received at the server, the subscription gets notified and receives that _Message_, which is then appended to the list.

### Hacky stuff in the code
I took some short cuts when developing the front end, the biggest one being that when a _Personell_ is logged in there is no API call to fetch the list of users. Instead they list is hard coded in [ChatList](./src/components/ChatList/ChatList.js#L10). 

Another short cut is how I determine if a user belongs to the _Personell_ user group. It is performed in [MainArea](./src/components/MainArea/MainArea.js#L27) and I think it might be vulnarable to some client side shananigans. 

## Extending the project
As mentioned above, the project was written with some extentions in mind. I will now highlight how I pictured those extentions being implemented. 

1. Sending a questionare to a client
---
Sending the questions is just a matter of storing a predetermined list of questions and sending one by one when prompted. You could also get this effect by sending all the questions to the _Client_ and have React render the questions, only when the previous one has been answered. 

Receiving the answers would probably be done with a data object, specific to the questionare and linked to the answering client. The schema would look something like this. 

```
@model
@auth(rules: [
  # allows client to update then answers of the object
  { allow: owner, ownerField: "client", operations: [read, update ]} 
  # allows all Personell to read the answers
  { allow: groups, groups: ["Personell"], operations: [read]} 
])
Questionare[X]Answers {
  id: ID!
  client: String!
  answer1: String
  answer2: INTEGER
  ...
  status: #enum with INPROGRESS or SUBMITTED etc.
}
```

2. Clients can be answered by a bot
---
This is just a question of setting up a service where _Clients_ can marked either in Bot Mode or Personell Mode. When a _Client_ is in Bot Mode can process and answer the message. The Bot is then just another entity in the system, and would just create __Messages__ with a _Client_ field set to the correct _Client_. That way, the _Clients_ subscription would get notified of new messages, and _Personell_ could see what the Bot wrote because they have read privileges of all __Messages__.