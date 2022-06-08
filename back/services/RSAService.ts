import RSA from 'node-rsa';
import fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

const rsa = new RSA();

class RSAService {
    async getKeys() {
        const keys = rsa.generateKeyPair();

        const publicKey = keys.exportKey('public');
        const privateKey = keys.exportKey('private');

        fs.mkdir(path.resolve('/keys'), { recursive: true }, (err) => {
            if (err) throw err;
            fs.writeFile(`/keys/public.pem`, publicKey, (err) => {
                if (err) throw err;
            })

            fs.writeFile(`/keys/private.pem`, privateKey, (err) => {
                if (err) throw err;
            })
        });

        return {
            publicKey,
            privateKey,
        }
    }

    async encryptFile(text: string, publicKey: string) {
        rsa.importKey(publicKey);

        return rsa.encrypt(text, 'base64');
    }

    async decryptFile(text: string, privateKey: string) {
        rsa.importKey(privateKey)

        return rsa.decrypt(text, 'utf8');
    }

    async createSign(message: string, privateKey: string) {
        const signPrivateKey = crypto.createPrivateKey({ key: Buffer.from(privateKey) });

        const sign = crypto.createSign('SHA256');
        sign.update(message);
        sign.end();

        const signStr = sign.sign(signPrivateKey).toString('base64');

        return signStr;
    }

    async verify(message: string, publicKey: string, sign: string) {
        const signPublicKey = crypto.createPublicKey({ key: Buffer.from(publicKey) });

        const verify = crypto.createVerify("SHA256");
        verify.update(message);
        verify.end();

        const isVerify = verify.verify(signPublicKey, sign, 'base64');

        return isVerify;
    }
}

export default new RSAService();
