require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

app.get("/", (req, res) => {
  res.send("Spotify Backend API is running successfully 🚀");
});


app.listen(3000, (req, res) =>{
    console.log('Server Started Successfully On Port 3000');
})