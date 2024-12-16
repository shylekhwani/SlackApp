import { createMessageService } from "../service/messageService.js";
import { NEW_MESSAGE_EVENT } from "../utils/eventConstants.js";

export const socketHandller = function(io, socket){
    
  /*------------------ Receiving Messages from Client ------------------------*/
  socket.on(NEW_MESSAGE_EVENT, createMessageHandler);

  /*------------------ Sending a Message from Server to Client ------------------------*/
  // Emit an initial message to the connected client from the server
  socket.emit('hello', 'Message is coming from server side');
}; 

const createMessageHandler = async function (data, CB) {
    const messageResponse = await createMessageService(data);
    CB({
        success: true,
        message: "Successfully created message",
        data: messageResponse
    });
};

/* 

 io.on('connection', (socket) => { 
  // This callback is executed whenever a new client connects to the server
  console.log('A user connected', socket.id);

  ------------------ Receiving Messages from Client ------------------------

  socket.on('messageFromClient', (data) => { 
    // Triggered when the client sends a message to the server
    console.log('Message from client:', data);

    // Broadcast the received message to all connected clients, including the sender
    io.emit('hi', data);
  });

  ------------------ Sending a Message from Server to Client ------------------------

  // Emit an initial message to the connected client from the server
  
  socket.emit('hello', 'Message is coming from server side');
});

*/