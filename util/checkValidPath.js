import { existsSync } from 'fs';

export default (filePath) => {
  if (!existsSync(filePath)) {
    console.error(`Error: File on path "${filePath}" not found`);
    process.exit(1);
  }
};
