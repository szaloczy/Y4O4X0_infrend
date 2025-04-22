import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Client } from "../entity/Client";

export class ClientController extends Controller {
    repository = AppDataSource.getRepository(Client);
    
    create = async (req, res) => {
        try {
            const clientToCreate = this.repository.create(req.body) as Partial<Client>;
            delete clientToCreate.id;

            const today = new Date();

            if (clientToCreate.date_of_birth > today) {
                this.handleError(res, null, 400, 'A születési dátum nem lehet a jövőben!');
                return;
            }

            const clientCreated = await this.repository.save(clientToCreate);
            res.json(clientCreated);
            
        } catch (error) {
            this.handleError(res,error);
        }
    }
}