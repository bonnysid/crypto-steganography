import RSAService from '../services/RSAService';
import SteganographyService from '../services/SteganographyService';

class SteganographyController {
    async encodeImage(req: any, res: any, next: any) {
        try {
            const file = req.file;
            const { message } = req.body;
            const encoded = await SteganographyService.encode(file, message || '');
            return res.json(encoded);
        } catch (e) {
            next(e);
        }
    }

    async decodeImage(req: any, res: any, next: any) {
        try {
            const file = req.file;
            const { key } = req.body;
            const decodedMessage = await SteganographyService.decode(file, key);
            return res.json(decodedMessage);
        } catch (e) {
            next(e);
        }
    }
}

export default new SteganographyController();
