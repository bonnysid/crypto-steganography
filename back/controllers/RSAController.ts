import RSAService from '../services/RSAService';
import ApiError from '../exceptions/ApiError';

class RSAController {
    async getKeys(req: any, res: any, next: any) {
        try {
            const keys = await RSAService.getKeys();
            return res.json(keys);
        } catch (e) {
            next(e);
        }
    }

    async encryptFile(req: any, res: any, next: any) {
        try {
            const {text, publicKey} = req.body;
            const encryptedText = await RSAService.encryptFile(text, publicKey);
            return res.json(encryptedText);
        } catch (e) {
            next(e);
        }
    }

    async decryptFile(req: any, res: any, next: any) {
        try {
            const {text, privateKey} = req.body;
            const decryptedText = await RSAService.decryptFile(text, privateKey);
            return res.json(decryptedText);
        } catch (e) {
            next(e);
        }
    }
}

export default new RSAController();
