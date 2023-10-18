import optionsYargs from './config/optionsYargs.js';
import getFileName from './util/getFileName.js';
import readFile from './util/readFile.js';

const fileName = getFileName(optionsYargs.file);

// console.time('leitura Async');
readFile(fileName, optionsYargs);
// console.timeEnd('leitura Async');
