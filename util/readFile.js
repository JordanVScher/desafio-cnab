import { readFileSync } from 'fs';
import sliceArrayPosition from './sliceArrayPosition.js';
import messageLog from './messageLog.js';
import saveJsonFile from './saveJsonFile.js';

const segmentoDictionary = { P: 0, Q: 1, R: 2 };
const companyNameIndexStart = 33;
const companyNameIndexEnd = 72;
const companyAddressIndexStart = 73;
const companyAddressIndexEnd = 154;
const companyIdIndexStart = 1;
const companyIdIndexEnd = 15;

const { log } = console;

const getWhichSegmentoToUse = (allSegmentos, segmentoType) => {
  const segmentoIndex = segmentoDictionary[segmentoType];
  return allSegmentos[segmentoIndex];
};

const searchEmpresaName = (allSegmentos, empresaName) => {
  const cnabSegmentoQ = allSegmentos[segmentoDictionary.Q];
  const segmentoQName = cnabSegmentoQ.substring(companyNameIndexStart, companyNameIndexEnd);
  const empresaNameRegex = new RegExp(empresaName, 'gsi');

  return segmentoQName.match(empresaNameRegex);
};

const getEmpresaJsonData = (allSegmentos) => {
  const cnabSegmentoQ = allSegmentos[segmentoDictionary.Q];
  const segmentoQName = cnabSegmentoQ.substring(companyNameIndexStart, companyNameIndexEnd);
  const segmentoQAdr = cnabSegmentoQ.substring(companyAddressIndexStart, companyAddressIndexEnd);
  const segmentoQId = cnabSegmentoQ.substring(companyIdIndexStart, companyIdIndexEnd);

  return { id: segmentoQId, name: segmentoQName, address: segmentoQAdr };
};

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
      const segmentoToUse = getWhichSegmentoToUse(allSegmentos, segmentoUpperCase);

      if (name) { shouldCountEntry = searchEmpresaName(allSegmentos, name) !== null; }

      if (shouldCountEntry) {
        if (json) {
          const jsonDataToAdd = getEmpresaJsonData(allSegmentos);
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
