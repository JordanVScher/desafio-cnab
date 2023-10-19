import { writeFileSync } from 'fs';

const jsonDirPrefix = './results';

export default (jsonToSave, name) => {
  const moment = new Date();
  const filenameSearchSuffix = name ? `-search_${name}` : '';
  const fileName = `${jsonDirPrefix}/${moment.toISOString()}${filenameSearchSuffix}.json`;

  console.log(`Saving "${fileName}" file...`);
  writeFileSync(fileName, JSON.stringify(jsonToSave, null, 2));
};
