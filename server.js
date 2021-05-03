const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;

//conncet database 
connectDB();

//init middleware
app.use(express.json({extended: false}));


app.use(express.static("public"));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/auth', require('./routes/api/auth'));

const s3 = new aws.S3({ apiVersion: '2006-03-01',accessKeyId: '',
secretAccessKey: '', });
// Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'schoolproject',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    })
});

app.use(express.static('public'))

app.post('/upload', upload.array('avatar'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length, Loc: req.files });
});

//Serve static assests in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});

