import mongoose from 'mongoose';
import appConfig from './appConfig';

export default async function connection() {
  try {
    await mongoose.connect(appConfig.MONGODB_URI);
    console.log('Connected to myDB');
    return true;
  } catch (error) {
    return false;
  }
}
