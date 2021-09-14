import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import * as chalk from 'chalk';


const templates: string[] = fs.readdirSync(path.join('.', 'templates'));
const addOns: string[] = fs.readdirSync(path.join('.', 'add-ons'));
addOns.push('none');

const questions = [
    {
        name: 'template',
        type: 'list',
        message: 'Select a project template',
        choices: templates
    },
    {
        name: 'addOns',
        type: 'checkbox',
        message: 'Select 1 or more add-ons',
        choices: addOns
    },
    {
        name: 'projectName',
        type: 'input',
        message: 'Enter a name for your project',
        default: 'new-project'
    }
];

function generateTemplate(template: string, dir: string): void {
    const templatePath = path.join('.', 'templates', template);
    const files = fs.readdirSync(templatePath);

    fs.mkdirSync(path.join(dir, 'src'));

    for(const file of files) {
        const data = fs.readFileSync(path.join(templatePath, file), 'utf8');
        fs.writeFileSync(path.join(dir, 'src', file), data);
    }
}

function generateAddOns(addOns: string[] | string, dir: string): void {
    const addOnsPath = path.join('.', 'add-ons');

    for(const addOn of addOns) {
        const files = fs.readdirSync(path.join(addOnsPath, addOn));
        for(const file of files) {
            const data = fs.readFileSync(path.join(addOnsPath, addOn, file));
            fs.writeFileSync(path.join(dir, file), data);
        }
    }
}

inquirer.prompt(questions)
// @ts-ignore
.then((answers) => {
    console.log(chalk.green("\nGenerating project...\n"))
    const a = answers as { [key: string]: string };
    const template = a.template;
    const templateAddOns = a.addOns;
    const projectName = a.projectName;
    const projectPath = path.join('.', projectName);

    fs.mkdirSync(projectPath);

    generateTemplate(template, projectPath);
    generateAddOns(templateAddOns, projectPath);

    console.log(chalk.blue("\nFinished!\n"))
})