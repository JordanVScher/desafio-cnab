import optionsYargs from './config/optionsYargs.js';
import getFileName from './util/getFileName.js';
import checkValidPath from './util/checkValidPath.js';
import readFile from './util/readFile.js';

const processCNABFile = (fileUrl) => {
  const asyncReadingTimeLog = 'asyncReading';

  const fileName = getFileName(fileUrl);

  checkValidPath(fileName);

  console.time(asyncReadingTimeLog);
  readFile(fileName, optionsYargs);
  console.timeEnd(asyncReadingTimeLog);
};

processCNABFile(optionsYargs.file);
