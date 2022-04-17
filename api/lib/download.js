import fs from 'fs';
import fsPromises from 'fs/promises';
import https from 'https';
import http from 'http';
import { basename } from 'path';
import { URL } from 'url';

const TIMEOUT = 10000;

export default function download(url, dest) {
  const uri = new URL(url);
  if (!dest) {
    dest = basename(uri.pathname);
  }
  const pkg = url.toLowerCase().startsWith('https:') ? https : http;

  return new Promise((resolve, reject) => {
    const request = pkg.get(uri.href).on('response', (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest, { flags: 'w' });
        res
          .on('end', () => {
            file.end();
            // console.log(`${uri.pathname} downloaded to: ${path}`)
            resolve();
          })
          .on('error', (err) => {
            file.destroy();
            fs.unlink(dest, () => reject(err));
          }).pipe(file);
      } else if (res.statusCode === 302 || res.statusCode === 301) {
        // Recursively follow redirects, only a 200 will resolve.
        download(res.headers.location, dest).then(() => resolve());
      } else {
        reject(new Error(
          `Download request failed, response status: ${res.statusCode} ${res.statusMessage}`,
        ));
      }
    });
    request.setTimeout(TIMEOUT, () => {
      request.abort();
      reject(new Error(`Request timeout after ${TIMEOUT / 1000.0}s`));
    });
  });
}
