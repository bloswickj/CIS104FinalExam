/**
 *   @author Bloswick, John (bloswickj@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Final Exam || created: 12/16/2016
 *   @todo
 */

"use strict";

const PROMPT = require('readline-sync');
const IO = require('fs');

let gameSetUp = [];
let playerDamage, playerHealth, playerStoredHealth, enemyDamage, enemyHealth, enemyStoredHealth;
let playerName, enemyName, userInput;

function main(){
    populateGameSetUp();
    setPlayerName();
    setPlayerDamage();
    setPlayerHealth();
    setEnemyName();
    setEnemyDamage();
    setEnemyHealth();
    printWelcomeMessage();
    setUserInput();
    while (userInput == 1){
        fight();
        setUserInput();
    }
}

main();

function populateGameSetUp(){
    let fileContents = IO.readFileSync(`gameSetUp.csv` , 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++){
        gameSetUp.push(lines[i].toString().split(/,/));
    }
}

function setPlayerName() {
     playerName = gameSetUp[0][0];
}

function setPlayerDamage() {
     playerDamage = gameSetUp[0][1];
}

function setPlayerHealth() {
     playerHealth = gameSetUp[0][2];
    playerStoredHealth = playerHealth;
}

function setEnemyName() {
    enemyName = gameSetUp[1][0];
}

function setEnemyDamage() {
    enemyDamage = gameSetUp[1][1];
}

function setEnemyHealth() {
    enemyHealth = gameSetUp[1][2];
    enemyStoredHealth = enemyHealth;
}

function printWelcomeMessage() {
     console.log(`Welcome, ${playerName}.`);
     console.log(`Your fighting stats are as follows:\n\tDamage: ${playerDamage}\n\tHealth: ${playerHealth}`);
     console.log(`Your opponent today is ${enemyName}.`);
     console.log(`Your opponent's fighting stats are as follows:\n\tDamage: ${enemyDamage}\n\tHealth: ${enemyHealth}`);
}

function setUserInput() {
    let firstFight;
    if(userInput == null) {
        userInput = PROMPT.question("Are you ready to fight?\n\t1 = Yes\n\t0 = No\n");
        firstFight = true;
    }
    else {
        userInput = PROMPT.question("Would you like to fight again?\n\t1 = Yes\n\t0 = No\n");
        firstFight = false;
    }
    if (userInput != 0 && userInput != 1){
        console.log(`That is not a valid option. Please try again.`);
        return setUserInput();
    }
    else if (userInput == 1){
        console.log(`Let the fight begin!`);
    }
    else if (userInput == 0 && firstFight == false) {
        process.stdout.write('\x1Bc');
        console.log(`\n\tFarewell.`);
    }
    else if (userInput == 0 && firstFight == true){
        process.stdout.write('\x1Bc');
        console.log(`\n\tThen why did you come here?`);
    }
}

function fight() {
    let fightOver = false;
    playerHealth = playerStoredHealth;
    enemyHealth = enemyStoredHealth;
    console.log(`${playerName} and ${enemyName} begin fighting!`);
    while (fightOver == false) {
        pickAction();
        if (enemyHealth <= 0) {
            console.log(`${playerName} has defeated ${enemyName}!`);
            fightOver = true;
        }
        else if (playerHealth <= 0) {
            console.log(`${enemyName} has defeated ${playerName}!`);
            fightOver = true;
        }

    }
}

function pickAction(){
    let action, effect;
    action = Math.floor((Math.random() * 4) + 1);
    switch (action) {
        case 1:
            effect = action = Math.floor((Math.random() * playerDamage) + 1);
            console.log(`${playerName} gets a swing off on ${enemyName}! ${enemyName} loses ${effect} health!`);
            enemyHealth -= effect;
            break;
        case 2:
            effect = action = Math.floor((Math.random() * enemyDamage) + 1);
            console.log(`${enemyName} gets a swing off on ${playerName}! ${playerName} loses ${effect} health!`);
            playerHealth -= effect;
            break;
        case 3:
            console.log(`${playerName} gets a swing off on ${enemyName}! ${enemyName} blocks the swing!`);
            break;
        case 4:
            console.log(`${enemyName} gets a swing off on ${playerName}! ${playerName} blocks the swing!`);
            break;
    }
}

/*
You can set up the file in this format:
playerName, playerDamage, playerHealth
enemyName, enemyDamage, enemyHealth
*/