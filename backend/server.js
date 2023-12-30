const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('./UserSkema')
const bodyParser = require('body-parser');
const  ProfileUserSkema = require('./ProfileUser')
const multer = require('multer');
const path = require('path')
const app = express();
app.use(bodyParser.json()); // Middleware for parsing JSON bodies

const port = 8080;

app.use(express.json())
app.use(cors())


mongoose
  .connect(
    "mongodb+srv://arsihoxha23:Arsi159753@cluster0.60zdjwh.mongodb.net/your_database_name",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });



  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // The directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name as the stored file name
    },
  });
  
  const upload = multer({ storage: storage });
  app.use('/uploads', express.static(path.join(__dirname, './uploads')));


app.post('/register' ,async(req,res)=>{
    try {
        const { username, password, age, email } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            password: hashedPassword,
            age: age,
            email: email
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



app.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;

       const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log('jo')

            return res.status(401).json({ error: 'Invalid username or password' });
        }else{
          const token = jwt.sign(
            { _id: user._id, username: user.username },
            'Arsi',
            { expiresIn: "10min" }
          );
      
          // Respond with the token
          res.json({ token });
              }


    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const authenticateUser = (req, res, next) => {
  const token = req.header("authorization");
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, 'Arsi', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token." });
    }else{
      console.log('po')
    }

    req.user = decoded;
    console.log(token)
    next();
  });
};


app.get("/protected", authenticateUser, (req, res) => {
  res.json({
    message: "Access to protected route granted.",
    user: req.user,
  });
  
});



let userID;
app.post('/home',async (req,res) => {
try{

  userID = req.body.userId
  const existingProfile = await ProfileUserSkema.findOne({ userId: req.body.userId });
  if(existingProfile){
    console.log('ESHTE I KRIJUAR')
  }else{
  const Profili_User = new ProfileUserSkema({
      userId:req.body.userId,
      workDetail:req.body.workDetails,
      cityDetail:req.body.cityName,
      addMore:req.body.moreDetails,
      addSchool:req.body.schoolName,
      bannerImage:''
  });
  console.log(Profili_User)
  await Profili_User.save();
}

}catch(err){
  console.log('There was an error in saving Profile DATA IN DATABASE',err)
}

})

let id;
app.post('/homeId',async (req,res)=>{
  const decoded = jwt.decode(req.body.tokeni);
  id = decoded._id
})


app.get('/home', async (req, res) => {
  
  try {
    // Query MongoDB for data
    const data = await ProfileUserSkema.findOne({userId:id});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});





app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const existingProfile = await ProfileUserSkema.findOne({ userId: id });

    if (existingProfile) {
      console.log('EXSISTION PO UPDETOHET')
      existingProfile.bannerImage = req.file.filename
      existingProfile.save()
    } else {
      console.log('Po krijohet profili i ri')

      const newProfile = new ProfileUserSkema({
        userId: req.body.userId,
        bannerImage: req.file.filename, 
      });

      await newProfile.save();

      console.log('New profile created');
    }

    res.json({filename:req.file.filename});
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/uploadProfile', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const existingProfile = await ProfileUserSkema.findOne({ userId: id });

    if (existingProfile) {
      console.log('EXSISTION PO UPDETOHET')
      existingProfile.profileImage = req.file.filename
      existingProfile.save()
    } else {
      console.log('Po krijohet profili i ri')

      const newProfile = new ProfileUserSkema({
        userId: req.body.userId,
        profileImage: req.file.filename, 
      });

      await newProfile.save();

      console.log('New profile created');
    }

    res.json({filename:req.file.filename});
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
