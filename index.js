const fs = require('fs');
const path = require('path');

const readline = require('readline');
const program = require('commander');
//const linereader = require('line-reader');
const importRegEx = new RegExp(/(?:import[\s*as{}]+)(?=\b)([A-z,]+)/);
const importPathRegEx = new RegExp(/((?:from[\s'"]+)|(?:require[\('"]+))([\.A-z/@]+)/);
const classRegExp = new RegExp(/(?:class[\s]+)([A-z]+)/, 'g');

let dotstring = '';


const parseFileImports = (file) => {
    const importmap = [];
    const filecontent = fs.readFileSync(file);

    const filecontentlines = filecontent.toString().split(/\r|\n/g);
    for (var i = 0, l = filecontentlines.length; i < l;i++) {
        const line = filecontentlines[i];
        if (line.match(/^(import).+(from|require)/)) {
            const impClass = importRegEx.exec(line);
            const impFrom = importPathRegEx.exec(line);
             importmap[impClass[1].trim()] = impFrom[2];
        }
    }
    return importmap;
}

class ComponentFile {
    constructor(filename) {
        this.filename = filename; 
        this.importedBy = [];
        this.imports = [];
        this.classname = this.getClassName();
        this.getImports();
    }

    getImports() {
        const imports = parseFileImports(this.filename);
        this.imports = imports;
    }

    getClassName() {
        const filecontent = fs.readFileSync(this.filename);
        const classname = classRegExp.exec(filecontent);
        if (classname === null) {

            return path.basename(this.filename);
        } else {
            return classname[1];
        }
    }

    matchFile(filename) {
        return this.filename === filename; 
    }

    setImportedBy(file) {
        if (!this.importedBy.includes(file)) {
            this.importedBy.push(file);
        }
    }

    getDot() {
        let dotstring = '';
        for (let file in this.imports) {
            const dot = `${this.classname}->${file};`;
            dotstring+=dot;
        }
        return dotstring;
    }
}

class ComponentFolder {
    constructor(foldername) {
        this.folder = foldername;
        this.filelist = [];
        this.folderlist = [];
        this.getFileList();
    }

    getFileList() {
        const foldercontent = fs.readdirSync(this.folder)
        for (let i = 0; i < foldercontent.length; i++) {
            const content = foldercontent[i];
            //console.log("Processing: ", content);
            if (fs.statSync(this.folder + '/' + content).isDirectory()) {
                this.folderlist.push(new ComponentFolder(this.folder + '/' + content));
            } else {
                this.filelist.push(new ComponentFile(this.folder + '/' + content));
            }
        }   
    }

    getDot() {
        let dotstring = '';
        this.filelist.forEach( file => {
            dotstring += file.getDot();
        });

        this.folderlist.forEach( folder => {
            dotstring += folder.getDot();
        });
        return dotstring;
    }


}


program
    .version('0.0.1')
    .option('-p --path <path>', 'Path to React Project that should be mapped out')
    .option('-v --verbose', 'Verbose option for extra loggin sugarz')

const main = () => {
    program.parse(process.argv);
    //console.log(program.path);
    const filehashmap = [];
    const folderMap = [];
    const fileMap = [];
    let folderList = [];
    try {
        const folders = fs.readdirSync(program.path);                
        const folderlistlength = folders.length;
        for (let i = 0; i < folderlistlength; i++) {
            if (fs.statSync(program.path + "/" + folders[i]).isDirectory()) {
                folderMap.push(
                    new ComponentFolder(program.path + '/' + folders[i])
                );
            } else {
                fileMap.push(
                    new ComponentFile(program.path + '/' + folders[i])
                );
            }
        }

        let dotstring = '';
        for (let i = 0; i < folderMap.length; i++) {
            dotstring += folderMap[i].getDot();
        }
        for (let i = 0, l = fileMap.length; i < l; i++) {
            dotstring += fileMap[i].getDot();
        }
        dotstring = dotstring.replace(/,/g,'');
        fs.writeFileSync('dotstring.txt', `dninetwork {${dotstring}}`);
    } catch (e) {
        console.error(e);
    }
};

main();

//setTimeout(() => main(), 5000);