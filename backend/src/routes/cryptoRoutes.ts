import { Router } from 'express';
import { addCrypto, deleteCrypto, getCryptoList } from '../controllers/cryptoController';

const router = Router();

router.post('/add', addCrypto);
router.post('/delete', deleteCrypto);
router.get('/list', getCryptoList);

export default router;
