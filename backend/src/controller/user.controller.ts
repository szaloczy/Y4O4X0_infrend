import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Controller } from "./base.controller";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController extends Controller {
    repository = AppDataSource.getRepository(User);

    create = async (req, res) => {
        try {
            const entityToCreate = this.repository.create(req.body as User);
            delete entityToCreate.id;

            const entityCreated = await this.repository.save(entityToCreate);
           
            entityToCreate.password = await bcrypt.hash(entityCreated.password, 12);

            await this.repository.save(entityCreated);

            res.json(entityCreated);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    login = async (req, res) => {
        try {
            const user = await this.repository.findOne({
                where: { email: req.body.email },
                select: [ 'id', 'password', 'role', 'username']
            });

            if(!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password');
            }

            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if(!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password');
            }

            const token = jwt.sign({ id: user.id, name: user.username, role: user.role }, 'mySecretKey', { expiresIn: '1d'});
            res.json({ accessToken: token });
        } catch (error) {
            this.handleError(res, error);
        }
    }
}