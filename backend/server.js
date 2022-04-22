//DEPENDECIES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//ROUTES
const userRoutes = require('./routes/user-routes');
const HttpError = require('./models/https-error');


const app = express();

app.use(bodyParser.json());
app.use('/uploads/images', express.static('images'))
app.use(cors());
app.use('/api/users', userRoutes);

app.use((req,res,next)=>{
    throw new HttpError('Cound not find this route.', 404);
});
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({message: error.message || 'An unknown error occured'});
});


app.listen(7700, ()=> console.log("Nodemon is Running-------------"));