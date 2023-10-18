import { existsSync, readFileSync } from 'fs';
import sliceArrayPosition from './sliceArrayPosition.js';
import messageLog from './messageLog.js';

const segmentoDictionary = { P: 0, Q: 1, R: 2 };
const companyNameIndexStart = 33;
const companyNameIndexEnd = 73;

const { log, error } = console;

const checkValidPath = (filePath) => {
  if (!existsSync(filePath)) {
    error(`Error: File on path "${filePath}" not found`);
    process.exit(1);
  }
};

const getWhichSegmentoToUse = (allSegmentos, segmentoType) => {
  const segmentoIndex = segmentoDictionary[segmentoType];
  return allSegmentos[segmentoIndex];
};

const searchEmpresaName = (allSegmentos, empresaName) => {
  const cnabBodySegmentoQ = allSegmentos[segmentoDictionary.Q];
  const segmentoQName = cnabBodySegmentoQ.substring(companyNameIndexStart, companyNameIndexEnd);
  const empresaNameRegex = new RegExp(empresaName, 'gsi');

  return segmentoQName.match(empresaNameRegex);
};

export default (filePath, {
  segmento, from, to, name,
}) => {
  try {
    const segmentoUpperCase = segmento.toUpperCase();
    checkValidPath(filePath);

    const file = readFileSync(filePath, 'utf8');
    const cnabArray = file.split('\n');

    let oneResultFound = false;
    const segmentoSize = 3;
    let segmentoStartIndex = 2;
    let segmentoEndIndex = segmentoStartIndex + segmentoSize;

    while (cnabArray.length > segmentoEndIndex) {
      const allSegmentos = sliceArrayPosition(cnabArray, segmentoStartIndex, segmentoEndIndex);
      const segmentoToUse = getWhichSegmentoToUse(allSegmentos, segmentoUpperCase);

      if (name) {
        if (searchEmpresaName(allSegmentos, name)) {
          if (!oneResultFound) {
            oneResultFound = !oneResultFound;
            log(`Mostrando resultado(s) para busca "${name}":`);
          }

          log(messageLog(segmentoToUse, segmentoUpperCase, from, to));
        }
      } else {
        if (!oneResultFound) {
          oneResultFound = !oneResultFound;
          log('Mostrando resultado(s):');
        }
        log(messageLog(segmentoToUse, segmentoUpperCase, from, to));
      }

      segmentoStartIndex += segmentoSize;
      segmentoEndIndex += segmentoSize;
    }

    if (!oneResultFound) {
      log(`Nenhum resultado encontrado para busca "${name}"!`);
    }
  } catch (e) {
    error(`🚀 ~ ${e.stack}`);
  }
};
