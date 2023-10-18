import { readFile } from 'fs/promises';
import sliceArrayPosition from './sliceArrayPosition.js';
import messageLog from './messageLog.js';

const { log } = console;

export default (fileName, { segmento, from, to }) => {
  readFile(fileName, 'utf8')
    .then((file) => {
      const cnabArray = file.split('\n');

      // const cnabHeader = sliceArrayPosition(cnabArray, 0, 2);

      const [
        cnabBodySegmentoP,
        cnabBodySegmentoQ,
        cnabBodySegmentoR,
      ] = sliceArrayPosition(cnabArray, 2, -2);

      // const cnabTail = sliceArrayPosition(cnabArray, -2);

      if (segmento === 'p') {
        log(messageLog(cnabBodySegmentoP, 'P', from, to));
        return;
      }

      if (segmento === 'q') {
        log(messageLog(cnabBodySegmentoQ, 'Q', from, to));
        return;
      }

      if (segmento === 'r') {
        log(messageLog(cnabBodySegmentoR, 'R', from, to));
      }
    })
    .catch((error) => {
      log('🚀 ~ file: cnabRows.js ~ line 76 ~ error', error);
    });
};
