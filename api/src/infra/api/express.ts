import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import AccountModel from "../account/repository/account.model";
import TransactionModel from "../transaction/repository/transaction.model";
import UserModel from "../user/repository/user.model";
import { accountRouter } from "./routers/account.router";
import { authenticationRouter } from "./routers/authentication.router";
import { transactionRouter } from "./routers/transaction.router";
import { userRouter } from "./routers/user.router";

var cors = require('cors')

export const app: Express = express();
app.use(express.json());

app.use(cors())

app.use("/authentication", authenticationRouter);
app.use("/user", userRouter);
app.use("/account", accountRouter);
app.use("/transaction", transactionRouter);

export let sequelize: Sequelize;

const user = process.env.DB_USER
const host = process.env.DB_USER
const database = process.env.DB_NAME
const port = process.env.DB_PORT
const password = process.env.DB_PASSWORD


async function setupDb() {
    sequelize = new Sequelize(database, user, password, {
        host: host,
        port: Number(port),
        dialect: "postgres",
        logging: false,
        sync: { force: true },
    });

    sequelize.addModels([UserModel, AccountModel, TransactionModel]);
    await sequelize.sync();
}

setupDb();
