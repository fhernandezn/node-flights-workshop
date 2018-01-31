const rl = require('readline');
const prompts = rl.createInterface(process.stdin, process.stdout);

module.exports = {
    ask
};

function ask(question, propName, data) {
    return new Promise((resolve) => {
        prompts.question(`${question}\n`, (response) => {
            data[propName] = response;
            resolve(data);
        });
    });
}