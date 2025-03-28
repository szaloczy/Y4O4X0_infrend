import { Repository } from "typeorm";

export abstract class Controller {
    repository: Repository<any>;

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getOne = async (req, res) => {
        try {
            const userId = req.params.id;
            const entities = await this.repository.findOne(userId);

            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    create = async (req, res) => {
        try {
            // TODO
        } catch (err) {
            this.handleError(res, err);
        }
    };

    update = async (req, res) => {
        try {
            // TODO
        } catch (err) {
            this.handleError(res, err);
        }
    };

    delete = async (req, res) => {
        try {
            // TODO
        } catch (err) {
            this.handleError(res, err);
        }
    };

    handleError = (res, err, status = 500, message = 'unknown server error') => {
        if(err) {
            console.error(err);
        }

        res.status(status).json({ message });
    }
}

