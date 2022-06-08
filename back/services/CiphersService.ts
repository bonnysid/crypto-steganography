import CryptoJS from 'crypto-js';
// @ts-ignore
import FileReader from 'filereader';

export enum CryptoType {
    AES = 'AES',
    DES = 'DES',
    DES3 = 'TripleDES',
    RC4 = 'RC4',
}

export enum CryptoMode {
    ECB = 'ECB',
    CBC = 'CBC',
    CFB = 'CFB',
    OFB = 'OFB',
    CTR = 'CTR'
}

const modes = Object.values(CryptoMode);

export enum CryptoMethod {
    DECRYPT = 'Decrypt',
    ENCRYPT = 'Encrypt',
}

export interface IResult {
    cryptoName: string;
    startTime: number;
    endTime: number;
    cryptoType: CryptoType;
    cryptoMethod: CryptoMethod;
    cryptoMode: CryptoMode;
    cipherParams: string;
}

const createWordArr = async (file: any): Promise<CryptoJS.lib.WordArray> => {
    return new Promise(resolve => {
        const data = CryptoJS.lib.WordArray.create(file.data);
        resolve(data);
    })
}

const getCipherParams = async (wordArr: CryptoJS.lib.WordArray, key: string, cryptoMode: CryptoMode, cryptoType: CryptoType): Promise<string> => {
    return new Promise(resolve => {
        const data = CryptoJS[cryptoType].encrypt(wordArr, key, {mode: CryptoJS.mode[cryptoMode]}).toString();
        resolve(data);
    });
}

const encrypt = async (key: string, file: any, cryptoType: CryptoType, cryptoMode: CryptoMode): Promise<IResult> => {
    const startTime = Date.now();
    const wordArr = await createWordArr(file.data);
    const cipherParams = await getCipherParams(wordArr, key, cryptoMode, cryptoType);
    const endTime = Date.now();
    return {
        endTime,
        startTime,
        cryptoName: file.name,
        cryptoType,
        cryptoMode,
        cipherParams,
        cryptoMethod: CryptoMethod.ENCRYPT,
    };
}

class CiphersService {
    async encryptFile(key: string, file: File) {
        const ciphers = [];
        for (let mode of modes) {
            ciphers.push(await encrypt(key, file, CryptoType.DES, mode));
            ciphers.push(await encrypt(key, file, CryptoType.DES3, mode));
            ciphers.push(await encrypt(key, file, CryptoType.RC4, mode));
            ciphers.push(await encrypt(key, file, CryptoType.AES, mode));
        }

        return ciphers;
    }

    async decryptFile(key: string, cipherParams: string, mode: CryptoMode, type: CryptoType) {
        const startTime = Date.now();
        await new Promise(resolve => {
            resolve(CryptoJS[type].decrypt(cipherParams, key, {mode: CryptoJS.mode[mode]}));
        });
        const endTime = Date.now();

        return {
            endTime,
            startTime,
            cryptoType: type,
            cryptoMode: mode,
            cipherParams,
            cryptoMethod: CryptoMethod.DECRYPT,
        };
    }
}

export default new CiphersService();
