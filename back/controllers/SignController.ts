import RSAService from '../services/RSAService';
import ApiError from '../exceptions/ApiError';

class SignController {
    async getKeys(req: any, res: any, next: any) {
        try {
            const keys = await RSAService.getKeys();
            return res.json(keys);
        } catch (e) {
            next(e);
        }
    }

    async createSign(req: any, res: any, next: any) {
        try {
            const {text, privateKey} = req.body;
            const sign = await RSAService.createSign(text, privateKey);
            return res.json(sign);
        } catch (e) {
            next(e);
        }
    }

    async verifySign(req: any, res: any, next: any) {
        try {
            const {text, publicKey, sign} = req.body;
            const isVerify = await RSAService.verify(text, publicKey, sign);
            return res.json(isVerify);
        } catch (e) {
            next(e);
        }
    }
}

export default new SignController();
