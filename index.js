const express = require('express');
const cors  = require('cors');
const dotenv = require('dotenv');
const {errorHandler,notFound} = require('./middlewares/error/errorHandler');
const { urlencoded } = require('express');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());

// create application/json parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//routes
const userRoutes = require('./route/users/usersRoute');
const postRoutes = require('./route/posts/postRoute');
const commentRoutes = require('./route/comments/commentRoute');
const emailRoutes = require('./route/Email/emailRoute');
const categoryRoutes = require('./route/category/categoryRoute');

// connect mongodb
require('./config/DbConnect/dbConnect');


// user route
app.use("/",userRoutes);
//post route
app.use('/',postRoutes);
//comment route
app.use('/',commentRoutes);
//email route
app.use('/',emailRoutes);
//category route
app.use('/',categoryRoutes);
//error handler
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})


