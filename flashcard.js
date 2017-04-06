

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


var jsonContent = fs.readFileSync("cards.json");
// Define to JSON type
var cards = JSON.parse(jsonContent);
// test JSON reading
// console.log("question1:", cards.data[1].q);
// console.log("question1:", cards.data[1].cloze);
// console.log("question1:", cards.data[1].front);
// console.log("\n *EXIT* \n");



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
            i++;
            quiz();
        });

    };

};

