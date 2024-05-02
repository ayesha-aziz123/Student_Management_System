#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const randomNumber = Math.floor(10000 + Math.random() * 9000);
let condition = true;
let myBalance = 10000;
do {
    const answer = await inquirer.prompt([
        {
            name: "student",
            type: "input",
            message: "Enter student Name :"
        },
        {
            name: "course",
            type: "list",
            message: "Select the course to Enrolled :",
            choices: ["Type script", "java script", "HTML", "Python"]
        }
    ]);
    const tuitionFee = {
        "HTML": 1000,
        "java script": 5000,
        "Type script": 3000,
        "Python": 6000
    };
    console.log(chalk.italic.magenta(`\nTuition Fee : ${tuitionFee[answer.course]}`));
    console.log(chalk.italic.yellow(`\nYour Balance : ${myBalance}\n`));
    let payment = await inquirer.prompt([
        {
            name: "cash",
            type: "list",
            message: "Select your payment Method :",
            choices: ["Bank transfer", "Easy Paisa", "Jaze Cash"]
        },
        {
            name: "amount",
            type: "input",
            message: "Transfer Money:"
        }
    ]);
    console.log(chalk.italic.magentaBright(`\nYour select this Payment Method : ${payment.cash}`));
    const tuitionFees = tuitionFee[answer.course];
    const paymentAmount = parseFloat(payment.amount);
    if (tuitionFees === paymentAmount) {
        console.log(chalk.italic.red(`\nCongratulations! You have successfully Enrolled : ${chalk.italic.yellow(answer.course)}\n`));
        let value = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "What would yo do next :",
                choices: ["view status", "Exit"]
            }
        ]);
        if (value.select === "view status") {
            console.log(chalk.italic.magentaBright.underline("\n\t     ********** STATUS ***********   \t\n"));
            console.log(chalk.italic.blueBright(`\t   Student Name : ${chalk.italic.green(answer.student)}`));
            console.log(chalk.italic.blueBright(`\t   Student Id : ${chalk.italic.green(randomNumber)}`));
            console.log(chalk.italic.blueBright(`\t   Student Course : ${chalk.italic.green(answer.course)}`));
            console.log(chalk.italic.blueBright(`\t   Tution Fees paid : ${chalk.italic.green(paymentAmount)}`));
            console.log(chalk.italic.blueBright(`\t   Remaining Balance :${chalk.italic.green(myBalance -= paymentAmount)}`)); //subtraction assiangment operator
            console.log(chalk.italic.redBright(`\t   ***** your Total Balance :${myBalance} ****`));
        }
        if (value.select === "Exit") {
            condition = false;
            console.log(chalk.italic.bgGrey("Good by..."));
        }
    }
    else {
        console.log(chalk.italic.bgRed("Invalid amount due to course"));
    }
} while (condition);
