import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class UserController extends Controller {
    repository = AppDataSource.getRepository(User);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as User);
            delete entity.id;

            const insertedEntity = await this.repository.save(entity);
            insertedEntity.id = parseInt(insertedEntity.id.toString().padStart(6, '0'));

            entity.password = await bcrypt.hash(entity.password, 12);

            await this.repository.save(insertedEntity);

            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    login = async (req, res) => {
        try {
            const user = await this.repository.findOne({
                where: {email: req.body.email },
                select: ['id', 'password']
            });

            if(!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password');
            }

            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if(!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password');
            }

            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, process.env.JWT_SECRET_KEY as string, {expiresIn: '2w'});

            res.json({accessToken: token});

        } catch (error) {
            this.handleError(res, error);
        }
    }
}