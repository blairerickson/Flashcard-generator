/**
 * Flashcard-generator Created by blair on 4/1/17.
 */

var inquirer = require("inquirer");
var fs = require("fs");
var i = 0;

var score = [0,0];

function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.deleted = function (){
        console.log(cloze);
    };
    this.partial = function (){
        var question = text.replace(cloze, "______");
    };
    this.PrintCard = function () {
        console.log("------------------");
        console.log(text);
        console.log("------------------");

    };
};

var Card1 = new ClozeCard("George Washington was the first president of the United States", "Washington");


if (i < 4) {

    inquirer.prompt([
        {
            name: "name",
            message: "What is player name?"
        }, {
            name: "position",
            message: "What is current position?"
        }, {
            name: "offense",
            message: "Offense stats?"
        }, {
            name: "defense",
            message: "Defense stats?"
        },
    ]).then(function (answers) {
        console.log("Answered")
        i++;
    });

}
;



// if (i < 4) {
//
//     inquirer.prompt([
//         {
//             answer1: "answer1",
//             question: Card1.partial + "?"
//         }
//     ])
//         .then(function (answers)
//     {
//         if (answer1 == Card1.cloze){
//         console.log(cloze + "is correct!");
//     }
//     else {
//             console.log("wrong answer");
//         }
//     });
// };