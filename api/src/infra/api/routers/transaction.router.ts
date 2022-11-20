import express, { Request, Response } from "express";
import TransactionFacadeFactory from "../../../domain/transactions/factory/facade.factory";
import UserFacadeFactory from "../../../domain/users/factory/facade.factory";
export const transactionRouter = express.Router();

transactionRouter.post("/", async (req: Request, res: Response) => {

    const transactionFacade = TransactionFacadeFactory.create()

    try {
        const input = {
            debitAccountId: req.body.debitAccountId,
            creditAccountId: req.body.creditAccountId,
            value: req.body.value
        };
        const output = await transactionFacade.saveTransaction(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});


transactionRouter.get("/:id", async (req: Request, res: Response) => {

    const transactionFacade = TransactionFacadeFactory.create()

    try {
        const input = {
            id: req.params.id
        };
        const output = await transactionFacade.findTransaction(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

transactionRouter.get("/from_account/:accountId", async (req: Request, res: Response) => {

    const transactionFacade = TransactionFacadeFactory.create()

    try {
        const input = {
            accountId: req.params.accountId
        };
        const output = await transactionFacade.findTransactionsFromAccount(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
