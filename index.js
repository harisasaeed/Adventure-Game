#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Hero {
    constructor(name) {
        this.health = 100;
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
    drinkEnergy() {
        this.health += 20;
        if (this.health > 100) {
            this.health = 100;
        }
        console.log(chalk.yellowBright.underline(`\n\t${this.name}: drank an energy drink and restored health to ${this.health}\n\t`));
    }
}
class Enemy {
    constructor(name) {
        this.health = 100;
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
}
async function main() {
    console.log(chalk.blue.bold("\n\t\tAdventure Game!\n\t\t"));
    const { heroName } = await inquirer.prompt([
        {
            type: "input",
            name: "heroName",
            message: "Enter your hero name:",
        },
    ]);
    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            choices: ["alien", "witch", "zombie"],
            message: "Enter the enemy you fight with:",
        },
    ]);
    // Battle field
    const hero = new Hero(heroName);
    const enemy = new Enemy(enemyType);
    console.log(chalk.bold.green.underline(`\n\t\t${enemy.name} v/s ${hero.name}\n\t\t`));
    // Step 4 action
    do {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                choices: ["attack", "defend", "run", "drink energy"],
                message: "Choose your action",
            },
        ]);
        switch (action) {
            case "attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    hero.decreaseHealth();
                    console.log(chalk.magenta.bold(`\n\t${hero.name} health: ${hero.health}\n\t`));
                    console.log(chalk.blue.bold(`\n\t${enemy.name} health: ${enemy.health}\n\t`));
                    if (hero.health <= 0) {
                        console.log(chalk.red.bold("\n\t\tYou lost! Try again.\n\t\t"));
                        return;
                    }
                }
                else {
                    // Enemy health decreases
                    enemy.decreaseHealth();
                    console.log(chalk.magenta.bold(`\n\t${hero.name} health: ${hero.health}\n\t`));
                    console.log(chalk.blue.bold(`\n\t${enemy.name} health: ${enemy.health}\n\t`));
                    if (enemy.health <= 0) {
                        console.log(chalk.yellow.bold("\n\t\tCongratulations! You won.\n\t\t"));
                        return;
                    }
                }
                break;
            case "defend":
                console.log(chalk.bgCyan.italic("\n\t\tYou chose to defend.\n\t\t"));
                break;
            case "run":
                console.log(chalk.red.italic("\n\t\tYou chose to run away.\n\t\t"));
                return;
            case "drink energy":
                hero.drinkEnergy();
                break;
        }
    } while (true);
}
main();
