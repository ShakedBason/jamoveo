const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); 
const usersRouter = require('./Routes/appRoutes'); 
const mongoose = require('mongoose');
const uri="mongodb+srv://shakedba17:jamoveo1111@jamoveocluster.09ti2.mongodb.net/?retryWrites=true&w=majority&appName=jamoveoCluster";
const setupSocket = require('./Socket/socket')



const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use('/api', usersRouter); 

setupSocket(server);

// Database setup
mongoose.connect(uri, 
  { useNewUrlParser: true,
     useUnifiedTopology: true 
  })
    .then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error("Error connecting to MongoDB Atlas:", error));


server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
