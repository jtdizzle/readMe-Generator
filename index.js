// Importing the required packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");


//Questions for user to input
const questions = [
  
  {
    type: 'input',
    name: 'title',
    message: "What is the tittle of your project?",
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a short description of the project',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Please pick a License.',
    choices: [ 'Apache','GNU','MIT','Mozilla','ODbL'],
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What command should be ran to install dependencies?',
    default: 'npm i',
  },
  {
    type: 'input',
    name: 'test',
    message: 'What command should run the tests?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What does the user need to know about using the repo?',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Please list any contributors of this project.',
  },
  {
    type: 'input',
    name: "username",
    message: "What is your GitHub username?" 
  },
  { type: "input", 
  name: "email", 
  message: "What is your email address?" 
  },
  
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log("Your README.md file has been generated");
  });
}
const writeFileAsync = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
  try {
    // Ask user questions and generate responses
    const userResponse = await inquirer.prompt(questions);
    const markdown = generateMarkdown(userResponse);
    // Write new README.md to
    await writeFileAsync("sample/README.md", markdown);
    console.log("README.md generated");
  } catch (err) {
    console.log(err);
  }
}

//  initializes app
init();
