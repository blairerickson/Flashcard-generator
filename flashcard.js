

var inquirer = require("inquirer");
var fs = require("fs");
var i = 0;
var question = "Here is a question";

var score = [0,0];

function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.deleted = function (){
        console.log(cloze);
    };
    this.partial = function (){
        question = text.replace(cloze, "______");
    };
    this.PrintCard = function () {
        console.log("------------------");
        console.log(text);
        console.log("------------------");

    };
};


var cards = fs.readFileSync("cards.json");
// Define to JSON type
var jsonContent = JSON.parse(cards);
// Get Value from JSON
console.log("question1:", jsonContent.data[1].q);
console.log("question1:", jsonContent.data[1].cloze);
console.log("\n *EXIT* \n");



var card1 = new ClozeCard("George Washington was the first president of the United States", "Washington");


if (i < 4) {
    card1.partial();
    inquirer.prompt([
        {
            name: "answer1",
            message: question,
        },
    ]).then(function (answers) {
        console.log("Answered:" + answers.answer1);
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