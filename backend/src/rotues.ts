import express from 'express';
import { LocationController } from './controller/location.controller';
import { ClientController } from './controller/client.controller';
import { DonationController } from './controller/donation.controller';
import { UserController } from './controller/user.controller';
import { checkUser } from './middlewares/protect-routes';

export const router = express.Router();

const locationController = new LocationController();

router.get('/location', locationController.getAll);
router.get('/location/:id', locationController.getOne)
router.post('/location', checkUser, locationController.create);
router.put('/location', checkUser, locationController.update);
router.patch('/location/:id/active', checkUser, locationController.updateActiveStatus);
router.delete('/location/:id', checkUser, locationController.delete);

const clientController = new ClientController();

router.get('/client', clientController.getAll);
router.get('/client/:id', clientController.getOne)
router.post('/client', checkUser, clientController.create);
router.put('/client', checkUser, clientController.update);
router.delete('/client/:id', checkUser, clientController.delete);

const donationController = new DonationController();

router.get('/donation', donationController.getAll);
router.get('/donation/:id', donationController.getOne);
router.post('/donation', checkUser, donationController.create);
router.put('/donation', checkUser, donationController.update);
router.delete('/donation/:id', checkUser, donationController.delete);

const userController = new UserController();

router.post('/user', userController.create);
router.post('user/login', userController.login);
