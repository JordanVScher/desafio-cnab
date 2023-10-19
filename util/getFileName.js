import { fileURLToPath } from 'url';

export default (fileURL) => {
  try {
    return fileURLToPath(fileURL);
  } catch (e) {
    return fileURL;
  }
};
