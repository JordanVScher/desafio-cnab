import { existsSync, readFileSync } from 'fs';
import sliceArrayPosition from './sliceArrayPosition.js';
import messageLog from './messageLog.js';

const { log, error } = console;

const checkValidPath = (filePath) => {
  if (!existsSync(filePath)) {
    error(`Error: File on path "${filePath}" not found`);
    process.exit(1);
  }
};

const getWhichSegmentoToUse = (allSegmentos, segmentoType) => {
  const segmentoDictionary = { P: 0, Q: 1, R: 2 };
  const segmentoIndex = segmentoDictionary[segmentoType];
  return allSegmentos[segmentoIndex];
};

export default (filePath, { segmento, from, to }) => {
  try {
    const segmentoUpperCase = segmento.toUpperCase();
    checkValidPath(filePath);

    const file = readFileSync(filePath, 'utf8');
    const cnabArray = file.split('\n');

    const segmentoSize = 3;
    let segmentoStartIndex = 2;
    let segmentoEndIndex = segmentoStartIndex + segmentoSize;

    while (cnabArray.length > segmentoEndIndex) {
      const allSegmentos = sliceArrayPosition(cnabArray, segmentoStartIndex, segmentoEndIndex);
      const segmentoToUse = getWhichSegmentoToUse(allSegmentos, segmentoUpperCase);

      log(messageLog(segmentoToUse, segmentoUpperCase, from, to));

      segmentoStartIndex += segmentoSize;
      segmentoEndIndex += segmentoSize;
    }
  } catch (e) {
    error(`🚀 ~ ${e.stack}`);
  }
};
