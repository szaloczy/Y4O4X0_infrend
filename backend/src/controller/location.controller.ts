import { AppDataSource } from "../data-source";
import { Location } from "../entity/Location";
import { Controller } from "./base.controller";

export class LocationController extends Controller {
    repository = AppDataSource.getRepository(Location);
}