import { AppDataSource } from "../data-source";
import { Location } from "../entity/Location";
import { Controller } from "./base.controller";

export class LocationController extends Controller {
    repository = AppDataSource.getRepository(Location);

    updateActiveStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { active } = req.body;

            const location = await this.repository.findOneBy({ id: Number(id) });
            if (!location) {
                this.handleError(res, null, 404, 'Location not found');
            }

            location.active = active;
            await this.repository.save(location);

            res.json(location);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}