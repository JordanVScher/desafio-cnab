import { readFileSync } from 'fs';
import sliceArrayPosition from './sliceArrayPosition.js';
import messageLog from './messageLog.js';
import * as segmentoExtractor from './segmentoExtractor.js';
import saveJsonFile from './saveJsonFile.js';

const { log } = console;

export default (filePath, {
  segmento, from, to, name, json,
}) => {
  try {
    const segmentoUpperCase = segmento.toUpperCase();

    const file = readFileSync(filePath, 'utf8');
    const cnabArray = file.split('\n');

    const jsonToSave = {};
    let oneResultFound = false;
    let shouldCountEntry = true;
    const segmentoSize = 3;
    let segmentoStartIndex = 2;
    let segmentoEndIndex = segmentoStartIndex + segmentoSize;

    while (cnabArray.length > segmentoEndIndex) {
      if (!oneResultFound) {
        oneResultFound = !oneResultFound;
        if (name) log(`Mostrando resultado(s) para busca "${name}":`);
        else log('Mostrando resultado(s):');
      }

      const allSegmentos = sliceArrayPosition(cnabArray, segmentoStartIndex, segmentoEndIndex);
      const segmentoToUse = segmentoExtractor.getWhichSegmentoToUse(
        allSegmentos,
        segmentoUpperCase,
      );

      if (name) {
        shouldCountEntry = segmentoExtractor.searchEmpresaName(allSegmentos, name) !== null;
      }

      if (shouldCountEntry) {
        if (json) {
          const jsonDataToAdd = segmentoExtractor.getEmpresaJsonData(allSegmentos);
          jsonToSave[jsonDataToAdd.id] = {
            name: jsonDataToAdd.name,
            address: jsonDataToAdd.address,
          };
        }
        log(messageLog(segmentoToUse, segmentoUpperCase, from, to));
      }

      shouldCountEntry += true;
      segmentoStartIndex += segmentoSize;
      segmentoEndIndex += segmentoSize;
    }

    if (!oneResultFound) {
      if (name) log(`Nenhum resultado encontrado para busca "${name}"!`);
      else log('Nenhum resultado encontrado');
    } else if (json) {
      saveJsonFile(jsonToSave, name);
    }
  } catch (e) {
    console.error(`🚀 ~ ${e.stack}`);
  }
};
