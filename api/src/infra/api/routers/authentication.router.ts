import express, { Request, Response } from "express";
import AccountFacadeFactory from "../../../domain/accounts/factory/facade.factory";
import UserFacadeFactory from "../../../domain/users/factory/facade.factory";


export const authenticationRouter = express.Router();

authenticationRouter.post("/", async (req: Request, res: Response) => {

    const userFacade = UserFacadeFactory.create()

    try {
        const input = {
            username: req.body.username,
            password: req.body.password,
        };
        const output = await userFacade.authenticateUser(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
