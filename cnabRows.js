import optionsYargs from './config/optionsYargs.js';
import getFileName from './util/getFileName.js';
import readFile from './util/readFile.js';

const asyncReadingTimeLog = 'asyncReading';
const fileName = getFileName(optionsYargs.file);

console.time(asyncReadingTimeLog);
readFile(fileName, optionsYargs);
console.timeEnd(asyncReadingTimeLog);
