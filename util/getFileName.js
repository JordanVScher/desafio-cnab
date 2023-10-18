import { fileURLToPath } from 'url';
import path from 'path';

export default (fileURL) => {
  const filename = fileURLToPath(fileURL);
  const dirname = path.dirname(filename);
  return path.resolve(`${dirname}/cnabExample.rem`);
};
