const fs = require('fs');
const program = require('commander');


class ComponentFile {
    constructor(filename, classname) {
        this.filename = filename;
        this.classname = classname;
    }

    match(filename) {
        return this.filename === filename; 
    }

    match(classname) {
        return this.classname === classname;
    }
}

program
    .version('0.0.1')
    .option('-P', '--path', 'Path to React Project that should be mapped out')
    .option('-V', '--verbose', 'Verbose option for extra loggin sugarz')



const main = () => {
    const filehashmap = [];
    
    
    




};

main();
