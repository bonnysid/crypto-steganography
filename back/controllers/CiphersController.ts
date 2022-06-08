import CiphersService from '../services/CiphersService';

class CiphersController {
    async encryptFile(req: any, res: any, next: any) {
        try {
            const {key} = req.body;
            const ciphers = await CiphersService.encryptFile(key, req.files.file);
            return res.json(ciphers);
        } catch (e) {
            next(e);
        }
    }

    async decryptFile(req: any, res: any, next: any) {
        try {
            const {key, file} = req.body;
            const result = await CiphersService.decryptFile(key, file.cipherParams, file.mode, file.type);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

export default new CiphersController();
