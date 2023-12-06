const express = require('express')
const path = require('path');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();
// let server = http.createServer(app);

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
  })