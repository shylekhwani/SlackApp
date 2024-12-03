import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    body:{
        type: String,
        required: [true, "Message Body is required"]
    },
    image:{
        type: String
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: [true, "Channel Id is required"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User Id is required"]
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: [true, "Workspace Id is required"]
    }
},{timestamps:true});

const Message = mongoose.model('Message', messageSchema);

export default Message;