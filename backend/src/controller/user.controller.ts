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
                select: [ 'id', 'password']
            });

            if(!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password');
            }

            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if(!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password');
            }

            const token = jwt.sign({ id: user.id }, 'mySecret', { expiresIn: '1d'});
            res.json({ accessToken: token });

            res.json({ sucess: true });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    register = async (req, res) => {
        try {
            const { email, username, password } = req.body;

            const existingUser = await this.repository.findOneBy({ email });
            if (existingUser) {
                return this.handleError(res, null, 400, 'This email is already in use');
            }

            const hashedPassword = await bcrypt.hash(password, 21);
        } catch (error) {
            
        }
    }
}