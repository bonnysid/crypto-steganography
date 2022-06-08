// @ts-ignore
import sg from 'any-steganography';
import * as path from 'path';
import fs from 'fs';
import { IMAGES_PATH } from '../index';

class SteganographyService {
    async encode(file: any, message: string) {
        const key = SteganographyService.generateRandomKey();
        const fileInput = path.join(IMAGES_PATH, file.filename);
        const outputFileName = `${file.filename.split('.')[0]}-encoded.${file.filename.split('.')[1]}`;
        const encodedFileOutput = path.join(IMAGES_PATH, outputFileName);
        const buffer = sg.write(fileInput, message, key);
        fs.writeFile(encodedFileOutput, buffer, (err) => {
            if (err) throw err;
        })

        return { path: `images/${outputFileName}`, key };
    }

    async decode(file: any, key: string) {
        const fileInput = path.join(IMAGES_PATH, file.filename);
        console.log(fileInput);
        const buffer = fs.readFileSync(fileInput);
        const message = sg.decode(buffer, `${file.filename.split('.')[1]}`, key);
        return message;
    }

    static generateRandomKey() {
        let key = '';
        while (key.length < 32) {
            key += Math.random().toString(36).substring(2, 6);
        }
        return key;
    }
}

export default new SteganographyService();
