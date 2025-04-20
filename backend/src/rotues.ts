import express from 'express';
import { LocationController } from './controller/location.controller';

export const router = express.Router();

const locationController = new LocationController();

router.get('/location', locationController.getAll);
router.get('/location/:id', locationController.getOne)
router.post('/location', locationController.create);
router.put('/location', locationController.update);
router.delete('/location/:id', locationController.delete);

