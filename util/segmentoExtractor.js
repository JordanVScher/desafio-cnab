const segmentoDictionary = { P: 0, Q: 1, R: 2 };
const companyNameIndexStart = 33;
const companyNameIndexEnd = 72;
const companyAddressIndexStart = 73;
const companyAddressIndexEnd = 154;
const companyIdIndexStart = 1;
const companyIdIndexEnd = 15;

export const getWhichSegmentoToUse = (allSegmentos, segmentoType) => {
  const segmentoIndex = segmentoDictionary[segmentoType];
  return allSegmentos[segmentoIndex];
};

export const searchEmpresaName = (allSegmentos, empresaName) => {
  const cnabSegmentoQ = allSegmentos[segmentoDictionary.Q];
  const segmentoQName = cnabSegmentoQ.substring(companyNameIndexStart, companyNameIndexEnd);
  const empresaNameRegex = new RegExp(empresaName, 'gsi');

  return segmentoQName.match(empresaNameRegex);
};

export const getEmpresaJsonData = (allSegmentos) => {
  const cnabSegmentoQ = allSegmentos[segmentoDictionary.Q];
  const segmentoQName = cnabSegmentoQ.substring(companyNameIndexStart, companyNameIndexEnd);
  const segmentoQAdr = cnabSegmentoQ.substring(companyAddressIndexStart, companyAddressIndexEnd);
  const segmentoQId = cnabSegmentoQ.substring(companyIdIndexStart, companyIdIndexEnd);

  return { id: segmentoQId, name: segmentoQName, address: segmentoQAdr };
};
