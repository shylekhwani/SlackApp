import { JOIN_CHANNEL } from "../../utils/eventConstants.js";

export const channelSocketController = function(io, socket) {
/*------------------ Receiving Messages from Client ------------------------*/
  socket.on(JOIN_CHANNEL, async function joinChannelHandler (data, CB){

    const roomId = data.channelId;
    socket.join(roomId);

    CB({
        success: true,
        message: "Successfully Joined The Channel",
        data: roomId
    });
 
  });
};