import { Router } from 'express';
import { ClienteController } from '../controller/cliente.controller';

const router = Router();
const clienteController = new ClienteController();

router.post('/clientes', clienteController.create);
router.get('/clientes', clienteController.all);
router.put('/clientes/:id', clienteController.update);
router.delete('/clientes/:id', clienteController.delete);

export default router;
