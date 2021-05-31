const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const methodOverride = require('method-override')
const articlerouter = require('./routes/article.js')
const path= require('path')
const app = express()
app.set('views', path.join(__dirname, 'views'))
mongoose.connect('mongodb://localhost:27017/blog',{
    useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true
} )
mongoose.connection.once('open',function(){
console.log('connection has been made');
}).on('error', function(error){
   console.log('error is:', error);
});
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false}))
app.use(methodOverride('_method'))

app.get('/',async (req,res)=>{
   const articles= await Article.find()
    res.render('articles/index', {articles:articles})
});
app.use('/article', articlerouter)
app.listen(3000)
console.log("listening on port 3000")