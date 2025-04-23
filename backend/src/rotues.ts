import express from 'express';
import { LocationController } from './controller/location.controller';
import { ClientController } from './controller/client.controller';
import { DonationController } from './controller/donation.controller';

export const router = express.Router();

const locationController = new LocationController();

router.get('/location', locationController.getAll);
router.get('/location/:id', locationController.getOne)
router.post('/location', locationController.create);
router.put('/location', locationController.update);
router.delete('/location/:id', locationController.delete);

const clientController = new ClientController();

router.get('/client', clientController.getAll);
router.get('/client/:id', clientController.getOne)
router.post('/client', clientController.create);
router.put('/client', clientController.update);
router.delete('/client/:id', clientController.delete);

const donationController = new DonationController();

router.get('/donation', donationController.getAll);
router.get('/donation/:id', donationController.getOne);
router.post('/donation', donationController.create);
router.put('/donation', donationController.update);
router.delete('/donation/:id', donationController.delete);
