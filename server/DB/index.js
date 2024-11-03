const mongoose = require('mongoose');

const uri='mongodb+srv://shakedba17:<db_password>@jamoveocluster.09ti2.mongodb.net/?retryWrites=true&w=majority&appName=jamoveoCluster';

mongoose.connect(uri, 
  { useNewUrlParser: true,
     useUnifiedTopology: true 
  })
    .then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error("Error connecting to MongoDB Atlas:", error));

