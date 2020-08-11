# Alpha_ai_SocioX_Chat_App

A Chat app using React.js and Node.js.

- Design
  - Client Side (running on http://localhost:3000)
    - Main Components : Join Room, Chat, Messages and Message.
      - Join Component : It is component for login into the chatroom of user wish according to the chatroom mention in the input field.  
      - Chat Component : It is component for UI of chatting in the chatroom mention above.
      - Messages Component : It is used for mapping the different messages from different users to Message Component.
      - Message Component : UI for message sent by the user.
    
  - Server Side (running on http://localhost:8000)
    - Main server file: index.js
      - All the dependencies are setup in the main server file viz. Socket.io, http, express.
    - Routers : routes/index.js
      - Main router file only have one router for Join Component (GET : '/')
    - Controllers : controller/userController.js
      - Controllers for 1) Adding the user into the chatroom, 
                        2) Getting the user into the chatroom using socket.id, 
                        3) Removing the user when the user left the chatroom.

- Functionality 
  - Client Side 
    - The client side running on port 3000.
    - First Join the chatroom using the api (GET: 'localhost:3000/') and providing the username & chatroom.
    - Redirect to the Chat UI using React Router(BrowserRouters) to ("localhost:3000/chatting").
    - Start doing chatting using 'socket.io-client' from the client to server.
    - Disconnect from the server by emiting the 'disconnect' parameter in socket.
    
  - Server Side 
    - The server side running on port 8000.
    - Listening and emitting all the sockets parameter using 'socket.io' over 'http'.
    - Different socket parameters are - 'join', 'sendMessage', 'disconnect'.
    - User handling over the 'userController.js' - addUser(), removeUser() and getUser() (using socket.id).
