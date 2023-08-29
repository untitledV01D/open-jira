import mongoose from 'mongoose';
import type { ConnectionStates } from 'mongoose';

// Database Types
type MongoConnection = {
  isConnected: ConnectionStates
};

const mongoConnection: MongoConnection = {
  isConnected: 0
};

// Database Methods
export const connect = async () => {
  if(mongoConnection.isConnected){
    console.log('We are connected');
    return;
  }

  if(mongoose.connections.length > 0){
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if(mongoConnection.isConnected == 1){
      console.log('Using last connection');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '');
  mongoConnection.isConnected = 1;
  console.log('MongoDB connected:', process.env.MONGO_URL);
};

export const disconnect = async () => {

  if(mongoConnection.isConnected == 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log('Disconnected from MongoDB');
};
