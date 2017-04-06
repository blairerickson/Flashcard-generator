

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

quizselect();



// this function lets us choose whether we're doing a cloze type flashcard quiz or a front back style.
// The JSON object has both embedded in the data.
function quizselect()
{
    inquirer.prompt([
        {
            name: "useranswer",
            message: "Which quiz type do you want? \n Front/Back[1] \n Hidden Word[2]\n",
        }, ]).then(function (answers) {
        console.log("Quiz type selected: " + answers.useranswer);
        if (answers.useranswer == 1)
        {
            console.log("TOTAL QUESTIONS:" + cards.data.length)
            basicquiz();
        }
        if (answers.useranswer == 2)
        {
            console.log("TOTAL QUESTIONS:" + cards.data.length)
            clozequiz();
        }
        else
        {
            console.log("Sorry, try again... \n");
            quizselect();
        }
    });
};

function clozequiz(){
    if (i < cards.data.length)
    {
        // Import the JSON data into the ClozeCard constructor and run the partial function to hide the Cloze word.
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
            clozequiz();
        });

    }
    else{
        console.log("\n -------- Good game!  -------- \n Correct answers: " + score[0] + "\n Wrong answers:" + score[1]);
    }
};


function basicquiz(){
    if (i < cards.data.length)
    {
        // this version of the quiz is front & back, so it doesn't use the ClozeCard constructor
        inquirer.prompt([
            {
                name: "useranswer",
                message: cards.data[i].front,
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
            basicquiz();
        });

    }
    else{
        console.log("\n -------- Good game!  -------- \n Correct answers: " + score[0] + "\n Wrong answers:" + score[1]);
    }
};
