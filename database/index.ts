import { connect } from 'mongoose';

const MONGO_DB_CONNECTION_URL =
  'mongodb+srv://wertypotom:456321Aa@cluster0.jdid0d4.mongodb.net/';

const connectToDb = async () => {
  await connect(MONGO_DB_CONNECTION_URL)
    .then(() => console.log('Connected successfully !'))
    .catch((err) =>
      console.log(`Getting error from DB connection: ${err.message}`)
    );
};

export default connectToDb;
