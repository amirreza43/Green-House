const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const request = require('request');
const config = require('config');
const axios = require('axios');


//  @route  GET api/profile/me
//  @desc   get current user's profile
//  @access private
router.get('/me', auth, async (req,res)=> {
   
    try{

        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
        ['name', 'lastName']);
        
        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        
        res.json({ profile })

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }

});

//  @route  POST api/profile/
//  @desc   Create or update user profile
//  @access private
router.post('/',[auth] , async (req,res)=>{


    const { name, lastName, location, dob, aboutMe, contact, 
    youtube, facebook, twitter, instagram, linkdin} = req.body;

    //Build Profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(name)  profileFields.name = name;
    if(lastName)  profileFields.lastName = lastName;
    if(location)  profileFields.location = location;
    if(dob)  profileFields.dob = dob;
    if(aboutMe)  profileFields.aboutMe = aboutMe;
    if(contact)  profileFields.contact = contact;
    
    //build social object
    profileFields.social = {};
    if(youtube)  profileFields.social.youtube = youtube;
    if(twitter)  profileFields.social.twitter = twitter;
    if(facebook)  profileFields.social.facebook = facebook;
    if(linkdin)  profileFields.social.linkdin = linkdin;
    if(instagram)  profileFields.social.instagram = instagram;

    try{
        let profile = await Profile.findOne({user : req.user.id});

        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id},
                {$set: profileFields}, { new: true});
            return res.json({ profile });
        }

        //create 
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);


    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')
        
    }
    

});

//  @route  GET api/profile/
//  @desc   Get all profiles
//  @access public
router.get('/', async (req,res)=>{

    try{

        const profiles = await Profile.find()
        .populate('user', ['name' , 'lastName']);
        res.json(profiles)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//  @route  GET api/profile/user/:user_id
//  @desc   Get profile by user id
//  @access public
router.get('/user/:user_id', async (req,res)=>{

    try{

        const profile = await Profile.findOne({user: req.params.user_id})
        .populate('user', ['name' , 'lastName']);

        if(!profile){
            return res.status(400).json({ msg: 'Profile not found.'})
        }

        res.json(profile)

    }catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found.'})
        }
        res.status(500).send('Server Error');
    }

});

//  @route  DELETE api/profile
//  @desc   Delete profile, user & posts
//  @access private
router.delete('/',auth , async (req,res)=>{

    try{
        
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({ _id: req.user.id});

        res.json({msg: 'User removed.'})


    }catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found.'})
        }
        res.status(500).send('Server Error');
    }

});

//  @route  PUT api/profile/experience
//  @desc   Add profile experience
//  @access private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
] ], async (req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {

        const profile = await Profile.findOne({ user : req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');       
    }
})

//  @route  DELETE api/profile/experience/:exp_id
//  @desc   Remove profile experience
//  @access private
router.delete('/experience/:exp_id', auth, async (req,res)=>{

    try {

        const profile = await Profile.findOne({ user : req.user.id});

        //Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf
        (req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save()

        res.json(profile);
        
    } catch (ere) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

//  @route  PUT api/profile/education
//  @desc   Add profile education
//  @access private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
] ], async (req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {

        const profile = await Profile.findOne({ user : req.user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');       
    }
})

//  @route  DELETE api/profile/education/:edu_id
//  @desc   Remove profile education
//  @access private
router.delete('/education/:edu_id', auth, async (req,res)=>{

    try {

        const profile = await Profile.findOne({ user : req.user.id});

        //Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf
        (req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save()

        res.json(profile);
        
    } catch (ere) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});


module.exports = router;