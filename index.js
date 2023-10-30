require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const port = process.env.PORT || 4000


require('./config/mongodb');

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/storage', express.static(path.join(__dirname, 'storage')));
const indexRoute = require('./routes/index') 
app.use(indexRoute); 

//public index.html file
app.get("/*", function (req, res) {
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
  });


app.listen(port,()=>{
    console.log(`magic happen on ${port}`);
})
