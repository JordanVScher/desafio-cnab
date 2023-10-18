import optionsYargs from './config/optionsYargs.js';
import getFileName from './util/getFileName.js';
import checkValidPath from './util/checkValidPath.js';
import checkSegmento from './util/checkSegmento.js';
import checkToFrom from './util/checkToFrom.js';
import readFile from './util/readFile.js';

const processCNABFile = () => {
  const asyncReadingTimeLog = 'asyncReading';

  const fileName = getFileName(optionsYargs.file);

  checkValidPath(fileName);
  checkToFrom(optionsYargs.from, optionsYargs.to);
  checkSegmento(optionsYargs.segmento);

  console.time(asyncReadingTimeLog);
  readFile(fileName, optionsYargs);
  console.timeEnd(asyncReadingTimeLog);
};

processCNABFile(optionsYargs.file);
