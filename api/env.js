import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pathEnv = resolve(__dirname, '.env');

dotenv.config({ path: pathEnv });

const env = { ...process.env };

export default env;
