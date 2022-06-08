import { Router } from 'express';
import multer from 'multer';
import RSAController from '../controllers/RSAController';
import CiphersController from '../controllers/CiphersController';
import SignController from '../controllers/SignController';
import SteganographyController from '../controllers/SteganographyController';
import { FileMiddleware } from '../middlewares/fileMiddleware';

const router = Router();

router.get('/rsa/keys', RSAController.getKeys);
router.post('/rsa/encrypt', RSAController.encryptFile);
router.post('/rsa/decrypt', RSAController.decryptFile);

router.get('/sign/keys', SignController.getKeys);
router.post('/sign/create', SignController.createSign);
router.post('/sign/verify', SignController.verifySign);

router.post('/cipher/encrypt', CiphersController.encryptFile);
router.post('/cipher/decrypt', CiphersController.decryptFile);

router.post('/steganography/encode', FileMiddleware.single('image'), SteganographyController.encodeImage);
router.post('/steganography/decode', FileMiddleware.single('image'), SteganographyController.decodeImage);

export default router;
