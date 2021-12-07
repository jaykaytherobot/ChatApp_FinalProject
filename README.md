# Chat application with React and Amplify
_Final project for Bachelor of Science from University of Iceland by Jóhannes Kári Sólmundarson_

## Purpose
The projects purpose is to create a chat application where clients can send messages to an organization (like a health clinic) and receive messages. The messages the clients can receive can in principle be from any actor i.e. personell from the organization, a pre-determined stream of messages, or a chat bot. The project provides the functionality to receive messages from personell but built with ease of extending it for other sources of messages in mind. 

## Technical stack
The project uses React to build the user interface and Amplify for a quick backend functionality. React was chosen because it would be relatively easy to transform the front end into React native and creating the possibility to extend the website to an app.

### Authentication
I used UserPools to manage the authentication of users. There are two types of users, personell who are part of the _Personell_ user group and users who are not part of any user group, and can be thought of as _Clients_ who initiate contact with the system. 

### API and schema
I used the GraphQL Transform library to create an AWS backend. The Transform library provides directives, the most important one being the @model, that convert the data model into AWS CloudFormation templates that implement it. The schema is [here](./amplify/backend/api/nordversechatapp/schema.graphql). There you can see that the user group _Personell_ has read privileges on all __Messages__ whereas _Clients_ have read privileges on all __Messages__ they have sent and have been sent to them, via the @auth rules.

## How it works
The React front end is responsible for taking the user input and performing the relevant API calls. There are two components that is worth highlighting here. 

First is the [MessageInput](./src/components/MessageInput/MessageInput.js) component. This is a relatively simple html form element that, on submit, sends the Message written to the input and sends it via createMessage mutation to the API. 

The second are the [ClientArea](./src/components/ClientArea/ClientArea.js) and the [PersonellArea](./src/components/PersonellArea/PersonellArea.js). _(They are almost the same component, with the only distinction being that there is the added functionality in PersonellArea to switch between chats they are viewing, and future possibly added functionality.)_  They first fetch all the messages sent to and from the _Client_ and then they subscribe to all messages sent to and from the _Client_. The __Messages__ are stored in the components state in a list, and are displayed in the [ChatHistory](./src/components/ChatHistory/ChatHistory.js). When a new __Message__ is received at the server, the subscription gets notified and receives that __Message__, which is then appended to the list. 