import api from "./backend";

type Authentication = {
    isAuthenticated: boolean,
    userId: string
}

export const authentication = async (input): Promise<Authentication> => {

    const url = "authentication";

    const res = await api.post(url, input);

    return res.data

};
