import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import properties from './data/properties.js';
import User from './models/userModel.js';
import Property from './models/propertyModel.js'; // Fixed typo in model import
import Favourite from './models/favouriteModel.js';
import connectDB from './config/db.js';

dotenv.config();

const connectWithRetry = async () => {
  try {
    await connectDB();
    console.log('MongoDB Connected!'.green.inverse);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
  }
};

connectWithRetry();

const importData = async () => {
  try {
    await Favourite.deleteMany();
    await Property.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProperties = properties.map((property) => {
      return { ...property, user: adminUser };
    });

    await Property.insertMany(sampleProperties);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Favourite.deleteMany();
    await Property.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}





// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import colors from 'colors';
// import users from './data/users.js';
// import properties from './data/properties.js';
// import User from './models/userModel.js';
// import Property from './models/propertyModel.js'; // Fixed typo in model import
// import Favourite from './models/favouriteModel.js';
// import connectDB from './config/db.js';

// dotenv.config();

// connectDB();

// const importData = async () => {
//   try {
//     await Favourite.deleteMany();
//     await Property.deleteMany();  // Corrected model name
//     await User.deleteMany();

//     const createdUsers = await User.insertMany(users);

//     const adminUser = createdUsers[0]._id;

//     const sampleProperties = properties.map((property) => {
//       return { ...property, user: adminUser };
//     });

//     await Property.insertMany(sampleProperties);  // Corrected model name

//     console.log('Data Imported!'.green.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

// const destroyData = async () => {
//   try {
//     await Favourite.deleteMany();
//     await Property.deleteMany();  // Corrected model name
//     await User.deleteMany();

//     console.log('Data Destroyed!'.red.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

// if (process.argv[2] === '-d') {
//   destroyData();
// } else {
//   importData();
// }
