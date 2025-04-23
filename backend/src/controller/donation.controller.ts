import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Donation } from "../entity/Donation";

export class DonationController extends Controller {
    repository = AppDataSource.getRepository(Donation);
}