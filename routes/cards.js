const express = require("express");
const router = express.Router();
const data = require("../data/flashcardData.json").data; // OR const {data} = require("../data/flashcardData.json");
const cards = data.cards; // const {cards} = data; 

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];

/*
router.get('/card', (req, res)=> {
    res.render("card", {prompt: "Who is buried", colors});
});
*/ // OR
router.get('/colors', (req, res)=> { 
    res.render("card", {prompt: "Who is buried", colors});
});
// As we are directing routes into this file from the cards path 
// in app.js so all routes here will start from cards, so /cards/colors => /colors

router.get("/", (req, res) => {
    const numberOfCards = cards.length;

    const flashCardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/card/${flashCardId}`);
});


router.get('/:id', (req, res) => {  // :id is route parameter
    const {side} = req.query;
    const {id} = req.params;

    if(!side){
        return res.redirect(`/card/${id}?side=question`);
        // If return is not added, even after redirecting the rest of the code below will continue executing 
        // will throw error.
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const {hint} = cards[id];
    const templateData = {name, id, text, side};

    if(side == "question") {
        templateData.hint = hint;
        templateData.sideToShow = "answer";
        templateData.sideToShowDisplay = "Answer";
    } else if(side == "answer"){
        templateData.sideToShow = "question";
        templateData.sideToShowDisplay = "Question";
    }

    res.render("card", templateData);
});

module.exports = router;