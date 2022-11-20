import express, { Request, Response } from "express";
import AccountFacadeFactory from "../../../domain/accounts/factory/facade.factory";


export const accountRouter = express.Router();

accountRouter.get("/:id", async (req: Request, res: Response) => {

    const accFacade = AccountFacadeFactory.create()

    try {
        const input = {
            id: req.params.id
        };
        const output = await accFacade.findAccount(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
