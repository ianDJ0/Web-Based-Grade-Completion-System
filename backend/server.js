//DEPENDECIES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
//ROUTES
const userRoutes = require('./routes/user-routes');
const requestRoutes = require('./routes/request-routes')
const announcementRoutes = require('./routes/announcement-routes');
const HttpError = require('./models/https-error');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads/images', express.static(path.join('uploads','images')));
app.use('/api/request',requestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/announcements', announcementRoutes);

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'
    );
    next();
});

app.use((req,res,next)=>{
    throw new HttpError('Cound not find this route.', 404);
});

app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, (err)=>{
            console.log(err)
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({message: error.message || 'An unknown error occured'});
});


app.listen(7700);