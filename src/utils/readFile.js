import fs from 'fs';
import path from 'path';

export default (filename, transform) =>
  fs.readFileSync(path.join(__dirname, '../input/', filename), {
    encoding: 'utf-8',
  });
