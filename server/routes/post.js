const express = require("express")
const router = express.Router()
const Post = require('../models/post')
const requireLogin = require('../middleware/requireLogin')

router.post('/create',requireLogin,(req,res) => {
    
    const {title,body} = req.body

    if(!title || !body) {
        res.status(422).json({error:"teneke misin oğlum boş alanları doldur yoksa içeri almıyoruz"})
    }

    const post = new Post({
        title,
        body,
        postedBy:req.user._id
    })

    post.save()
    .then(post => {
        res.json({message:"post is succesfully created"})
    }).catch(err =>{
        console.log(err)
    }).catch(err => {
        console.log(err)
    })

    
})

router.get('/allpost',(req,res) => {
    Post.find()
    .populate("postedBy","_id nick")
    .then(posts=> {
        res.json({posts:posts})
    }).catch(err => {
        console.log(err)
    })
})




router.get('/post/:postId',(req,res) => {

    const {postId} = req.params
    
    Post.findById(postId)
    .populate("postedBy","_id nick")
    .then(response => {
        res.json({post:response})
    }).catch(err => {
        console.log(res)
    })
})

router.get('/user/:userId',(req,res) => {
    
    const {userId} = req.params;
    
    Post.find({postedBy:userId})
    .populate("postedBy","_id nick")
    .then(posts => {
        res.json({posts})
    }).catch(err => {
        console.log(err)
    })

})



router.get('/mypost',requireLogin,(req,res) => {
    const {_id} = req.user
    
    Post.find({postedBy:_id})
    .then(post => {
        res.json({post:post})
    }).catch(err => {
        console.log(err)
    })
})


router.put('/like',requireLogin,(req,res) => {
    //postid,user ->like
    // console.log(req.user._id)

    Post.findByIdAndUpdate({_id:req.body.postId},{
        $push: {likes:req.user._id}
    },{
        new:true
    }).exec((err,result) => {
        if(err) {
            return res.status(422).json({error:err})
        }else {
            res.json(result)
        }
    })
    
})

router.put('/unlike',requireLogin,(req,res) => {
    //postid,user ->like

    Post.findByIdAndUpdate({_id:req.body.postId},{
        $pull: {likes:req.user._id}
    },{
        new:true
    }).exec((err,result) => {
        if(err) {
            return res.status(422).json({error:err})
        }else {
            res.json(result)
        }
    })
    
})




module.exports = router



