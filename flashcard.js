// flashcard JSON reading app
// Blair Erickon 4/1/17

var inquirer = require("inquirer");
var fs = require("fs");
var i = -1;
var question = "Here is a question";

// simple scoring variable, 0 is correct, 1 is incorrect
var score = [0,0];

// Our 100% verified scope safe ClozeCard constructor. Works with or without the 'new' operator
function ClozeCard(text, cloze) {
    if (this instanceof ClozeCard) {
        this.text = text;
        this.cloze = cloze;
        this.deleted = function () {
            console.log(cloze);
        };
        this.partial = function () {
            question = text.replace(cloze, "______");
            // Alert to an error if the cloze word is not in the next
            if (!text.includes(cloze)) {
                console.log("JSON file error. Word not found!");
            }
        };
    }
    else {
        return new ClozeCard(text, cloze);
    }
};

// import the JSON data from cards.json. This can be any JSON object for new questions.
var jsonContent = fs.readFileSync("cards.json");
// Define to JSON type
var cards = JSON.parse(jsonContent);

// starts the game and calls the user to choose.
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
            i=0;
            console.log("TOTAL QUESTIONS:" + cards.data.length)
            basicquiz();
        }
        if (answers.useranswer == 2)
        {
            i=0;
            console.log("TOTAL QUESTIONS:" + cards.data.length)
            clozequiz();
        }
        else if (i<0)
        {
            console.log("Sorry, try again... \n");
            quizselect();
        }
    });
};

// here is our cloze deletion type quiz function.
function clozequiz(){
    if (i < cards.data.length)
    {
        // Import the JSON data into the ClozeCard constructor and run the partial function to hide the Cloze word.
        var flash = ClozeCard(cards.data[i].q, cards.data[i].cloze);
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


// here is our front & back type quiz function.
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
