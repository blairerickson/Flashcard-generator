

var inquirer = require("inquirer");
var fs = require("fs");
var i = 0;
var question = "Here is a question";

var score = [0,0];

// Our ClozeCard constructor.
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


var jsonContent = fs.readFileSync("cards.json");
// Define to JSON type
var cards = JSON.parse(jsonContent);




console.log("TOTAL QUESTIONS:" + cards.data.length)
quiz();

function quiz(){
    if (i < cards.data.length)
    {
        var flash = new ClozeCard(cards.data[i].q, cards.data[i].cloze)
        flash.partial();
        inquirer.prompt([
            {
                name: "useranswer",
                message: question,
            },
        ]).then(function (answers) {
            console.log("Answered:" + answers.useranswer);
            if (answers.useranswer == cards.data[i].cloze)
            {
                score[0]++;
                console.log("Correct! Score + 1 \n Current correct answers: " + score[0] )
            }
            else
            {
                score[1]++;
                console.log("Sorry, " + cards.data[i].cloze + " is the right answer. \n Current incorrect answers: " + score[1] )
            }
            i++;
            quiz();
        });

    }
    else{
        console.log("\n -------- Good game!  -------- \n Correct answers: " + score[0] + "\n Wrong answers:" + score[1]);
    }
};

