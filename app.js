const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set("view engine", "pug");

const mainRoutes = require("./routes"); // Because this folder has an index js file we don't need to refer to that when 
                                    // we require it

const cardRoutes = require("./routes/cards")

// START Ways to define Middleware they are run sequentially the order they appear in code
/*  
app.use((req, res, next)=> {
    console.log("One");
    next();
},
(req, res, next) => {
    console.log("One and a half");
    next();
});

app.use((req, res, next) => {
    console.log("Two");
    next();
});
*/
// END

app.use(mainRoutes);
app.use("/card", cardRoutes); // for /cards use this routes defined in cardRoutes. Starting with /cards

app.use((req, res, next)=>{
    console.log("Hello");
    // req.message = "This message made it!";
    next(); // next means middleware is ended. Without next the brwoser will be stuck
});

// app.use((req, res, next)=>{
//     console.log(req.message);
//     next();
// });



// START This will also change the url to localhost:1000/badelog
/* 
app.post('/badelog', (req, res)=> {
    res.cookie("username", req.body.username);
    res.render("hello", {name: req.body.username});
});
*/
// END



// START ### Error Handling Example ###
/*
app.use((req, res, next)=> {
    console.log("Hello");
    const err = new Error("Oh noes!");
    err.status = 500;
    next(err);
});

app.use((req, res, next) => {
    console.log(" world");
    next();
});
*/
// END ### Error Handling Example ###

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=> {
    res.locals.error = err;
    res.render("error");
});

// Starting a server
app.listen(1000, () => {
    console.log("Server Running on port: localhost:1000")
});




