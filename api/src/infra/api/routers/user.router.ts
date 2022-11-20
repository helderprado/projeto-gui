import express, { Request, Response } from "express";
import UserFacadeFactory from "../../../domain/users/factory/facade.factory";
export const userRouter = express.Router();

userRouter.post("/", async (req: Request, res: Response) => {

    const userFacade = UserFacadeFactory.create()

    try {
        const input = {
            username: req.body.username,
            password: req.body.password,
        };
        const output = await userFacade.createUser(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});


userRouter.get("/:id", async (req: Request, res: Response) => {

    const userFacade = UserFacadeFactory.create()

    try {
        const input = {
            id: req.params.id
        };
        const output = await userFacade.findUser(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});


userRouter.get("/", async (req: Request, res: Response) => {

    const userFacade = UserFacadeFactory.create()

    try {
        const input = {};
        const output = await userFacade.findAllUsers(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

