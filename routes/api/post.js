const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const Message = require('../../models/Message');
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const uuid = require('uuid/v4');
const path = require('path');
const Chat = require('../../models/Chat');



//  @route  POST api/post
//  @desc   create a post
//  @access private
router.post('/', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req,res)=>{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        
        const user = await User.findById(req.user.id).select('-password');
        console.log(req.body);
        const newPost = new Post({
            text: req.body.text,
            title: req.body.title,
            name: user.name,
            user: req.user.id,
            fileName: req.body.fileName,
            filePath: req.body.filePath
        })

        const post = await newPost.save();
        res.json({post});

    } catch (err) {
        console.error(err);
        
        res.status(500).send('Server error');
    }


});

//  @route  POST api/post/message:receiverid
//  @desc   send a message
//  @access private
router.post('/message/:id', auth, async (req,res)=>{
    
    try {
        
        const user = await User.findById(req.user.id).select('-password');
        console.log(user, 'THIS IS THE USER LOG');
        const receiver = await User.findById(req.params.id).select('-password'); 
        console.log(req.params.id);
        console.log(receiver);
        const newMessage = new Message({
            text: req.body.text,
            user: user.id,
            name: user.name,
            receiver: receiver._id
        })

        const message = await newMessage.save();
        res.json({message});

    } catch (err) {
        console.error(err);
        
        res.status(500).send('Server error');
    }


});

//  @route  Get api/post/messages
//  @desc   get all posts
//  @access private
router.get('/message', auth, async (req,res)=>{

    try {
        const user = await User.findById(req.user.id).select('-password');
        const messages = await Message.find({receiver: user}).sort({ date: -1 });
        res.json(messages);

    } catch (err) {
        console.error(err);
        
        res.status(500).send('Server error');
    }

});

//  @route  Get api/post
//  @desc   get all posts
//  @access private
router.get('/', auth, async (req,res)=>{

    try {
        
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);

    } catch (err) {
        console.error(err);
        
        res.status(500).send('Server error');
    }

});

//  @route  Get api/post/:id
//  @desc   get post by id
//  @access private
router.get('/:id', auth, async (req,res)=>{

    try {
        
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg: 'Post not found.'})
        }

        res.json(post);

    } catch (err) {
        console.error(err);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found.'})
        }
        res.status(500).send('Server error');
    }

});


//  @route  DELETE api/post/:id
//  @desc   delete a post
//  @access private
router.delete('/:id', auth, async (req,res)=>{

    try {
        
        const post = await Post.findById(req.params.id);

        //check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "User not authorized"})
        }

        await post.remove()

        res.json({ msg: 'Post removed'});

        

    } catch (err) {
        console.error(err);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found.'})
        }
        res.status(500).send('Server error');
    }

});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has already been liked
      if (post.likes.some(like => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post already liked' });
      }
  
      post.likes.unshift({ user: req.user.id });
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route    PUT api/posts/unlike/:id
  // @desc     Unlike a post
  // @access   Private
  router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has not yet been liked
      if (!post.likes.some(like => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // remove the like
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//  @route  POST api/post/comment/:id
//  @desc   create a comment on a post
//  @access private
router.post('/comment/:id', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req,res)=>{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            title: req.body.title,
            name: user.name,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();
        res.json(post.comments);

    } catch (err) {
        console.error(err);
        
        res.status(500).send('Server error');
    }

    

});

//  @route  POST api/post/comment/:id/:comment_id
//  @desc   Delete a comment on a post
//  @access private
router.delete('/comment/:id/:comment_id', auth, async(req,res)=>{
    try {

        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        //Pull out comment
        const comment = post.comments.find(comment=> comment.id === req.params.comment_id);

        if(!comment){
           return res.status(404).json({ msg: "Comment does not exists"});
        }

        if(comment.user.toString() != req.user.id){
            return res.status(401).json({ msg: "User not authorized"});
        }

        post.comments = post.comments.filter(
            ({ _id }) => _id.toString() !== req.params.comment_id
          );
      
          await post.save();
      
          return res.json(post);
        
    } catch (err) {
        console.error(err);
        
        res.status(500).send('Server error');
    }
});


//  @route  POST api/post/upload
//  @desc   upload a file for a post
//  @access private
const s3 = new aws.S3({ apiVersion: '2006-03-01',accessKeyId: '',
secretAccessKey: '', });
// Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

const upload = multer({
    storage: multerS3({
        s3,
        bucket: '',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    })
});


router.post('/upload', upload.array('avatar'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length, Loc: req.files });
});

//  @route  POST api/post/chat
//  @desc   send a chat
//  @access private
router.post('/chat', auth, async (req,res)=>{
    
    try {
        
        const user = await User.findById(req.user.id).select('-password');
        console.log(user, 'THIS IS THE USER LOG');
        const newChat = new Chat({
            text: req.body.text,
            user: user.id,
            name: user.name
        })

        const chat = await newChat.save();
        res.json({chat});

    } catch (err) {
        console.error(err);
        
        res.status(500).send('Server error');
    }


});

//  @route  Get api/post/chat
//  @desc   get all chat
//  @access private
router.get('/chat/all', auth, async (req,res)=>{

    try {
        
        const chats = await Chat.find().sort({ date: -1 });
        res.json(chats);

    } catch (err) {
        console.error(err);
        
        res.status(500).send('Server error');
    }

});

module.exports = router;