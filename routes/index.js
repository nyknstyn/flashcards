const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if(name){
        res.render("index",{name}); // es2015 shortform for name:name
    } else {
        res.redirect("/hello");
    }
});



router.get('/hello', (req, res)=> {
    const name = req.cookies.username;
    if(name){
        res.redirect("/");
    }else{
        res.render("hello");
    }
});

router.post('/hello', (req, res)=> {
    res.cookie("username", req.body.username);
    res.redirect("/");
});

// OR 
/* 
    router.get('/card', (req, res)=>{
        res.locals.prompt = "Who is buried in Grant's Tomb?";
        res.render("card");
    });
*/

router.post("/goodbye", (req, res)=>{
    res.clearCookie("username");
    res.redirect("/hello");

});

module.exports = router;