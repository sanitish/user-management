const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const path = require('path');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
//url varibale name = MONGO_URI == assign it to monogo DB url
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
}
connectDB();

// Route files

const user = require('./routes/user');

const app = express();
app.use(cors());

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Mount routers

app.use('/api/user',user)



app.use(errorHandler);

app.use(express.static('client/build'));

app.get('*', (req, res) =>
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);




const PORT = process.env.PORT || 8080;

const server = app.listen(
  PORT,
  console.log(
    `Server running in mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
});
