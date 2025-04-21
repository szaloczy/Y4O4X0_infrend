import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Client } from "../entity/Client";

export class ClientController extends Controller {
    repository = AppDataSource.getRepository(Client);
}