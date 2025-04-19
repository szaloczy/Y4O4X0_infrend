import express from 'express';
import { LocationController } from './controller/location.controller';

export const router = express.Router();

const locationController = new LocationController();

router.get('/location', locationController.getAll);
router.post('/user', locationController.create);
