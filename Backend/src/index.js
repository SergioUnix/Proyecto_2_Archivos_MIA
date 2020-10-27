
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const multer= require('multer');
const path= require('path');



//imports
const personRoutes = require('./routes/person-rotes');

//settings
app.set('port', 3000);


//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//routes
app.use(personRoutes);

// Static files
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.resolve('uploads')));




//run
//app.listen(app.get('port'), () => {
    //console.log('Server on Port 3000')
 //   console.log(`Server on port ${app.get('port')}`);
//})


app.listen(3000, '0.0.0.0', function() { 
    console.log('Listening to port: ' + 3000); 
}); 
