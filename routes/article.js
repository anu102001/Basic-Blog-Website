const express= require('express')
const Article = require('./../models/articles')
const router = express.Router()


router.get('/new',(req,res)=>{
    res.render('articles/new' , {article: new Article()})
})
router.get('/edit/:id',async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit' , {article: article})
})
router.get('/:slug',async (req,res)=>{
   
    const article =await  Article.findOne({slug : req.params.slug})
    if(article==null) 
    {
      return  res.redirect('/')
    }
    res.render('articles/show' , { article: article})
  
})
router.post('/', async (req,res,next)=>{
  
 req.article =new Article()  
  next()
}, savearticle('new'))
router.put('/:id', async (req,res,next)=>{
  
    req.article =await Article.findById(req.params.id)  
    next()
    
   }, savearticle('edit'))

router.delete('/:id',async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')

})
function savearticle(path){
    return  async (req,res)=>{
        let article = req.article
            article.title= req.body.title
            article.description= req.body.description
            article.markdown= req.body.markdown
    
       
         article.save(err=>{
           
             if(err)
             {
                
                res.render(`/article/${path}`,{article:article})
             }
             else
          
            res.redirect(`/article/${article.slug}`)
      }) 

    }
}
module.exports = router

