const path = require('path')
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const exphbs = require('express-handlebars')
const connectDB = require("./config/db")
 

// Loading configuration
dotenv.config({ path:'./config/config.env'})

connectDB()

const app = express();


//Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//Static files
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000

app.listen(PORT , console.log(`SERVER runnig on ${process.env.NODE_ENV} mode on port ${PORT}`))