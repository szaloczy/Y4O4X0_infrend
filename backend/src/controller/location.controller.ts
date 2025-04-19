import { AppDataSource } from "../data-source";
import { Location } from "../entity/Location";
import { Controller } from "./base.controller";

export class LocationController extends Controller {
    repository = AppDataSource.getRepository(Location);

    create = async (req, res) => {
        try {
            const locationToCreate = this.repository.create(req.body) as Partial<Location>;
            delete locationToCreate.id;

            if (!locationToCreate.active && !locationToCreate.address && !locationToCreate.code && !locationToCreate.name) {
                this.handleError(res, null, 400, 'All fields are required');
                return;
            }

            const locationCreated = await this.repository.save(locationToCreate);
            res.json(locationCreated);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}