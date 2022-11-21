import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { postUser } from "../services/user";
import { api } from "./api/api";

export default function Home() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const postUserQuery = useMutation(postUser);

  const toast = useToast();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const input = { username: login, password: password };
      await postUserQuery.mutateAsync(input);
      toast({
        title: "Conta criada com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return router.push(`/login`);
    } catch (error) {
      return toast({
        title: "Coletar o erro",
        description: "Login ou senha inválidos.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  }
  return (
    <div>
      <Head>
        <title>NG - Trybe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 h-screen">
        <div className="bg-ng-purple flex justify-center items-center h-1/2 sm:h-screen lg:h-screen bg-waves bg-no-repeat bg-center bg-cover p-10">
          <div>
            <h1 className="text-white text-[40px] sm:text-[60px] lg:text-[60px] font-black">
              A CARTEIRA DA NOVA GERAÇÃO.
            </h1>
            <h2 className="text-white text-[30px] sm:text-[50px] lg:text-[50px]">
              É para todas as idades!
            </h2>
          </div>
        </div>
        <div className="bg-white flex justify-center items-center h-1/2 sm:h-screen lg:h-screen bg-ng bg-no-repeat bg-center bg-cover">
          <form
            className="flex flex-col gap-4 p-4 bg-ng-purple rounded-2xl"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Login"
              className="p-4 rounded-xl"
              onChange={(event) => setLogin(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-4 rounded-xl"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" colorScheme={"pink"}>
              Cadastrar
            </Button>
            <Flex alignItems={"center"}>
              <Box color={"white"} fontSize={"xs"}>
                Já faz parte da nova geração?
              </Box>
              <Link passHref href={"/login"}>
                <Button
                  variant={"ghost"}
                  colorScheme={"pink"}
                  size={"sm"}
                  ml={2}
                >
                  SIGN UP
                </Button>
              </Link>
            </Flex>
          </form>
        </div>
      </div>
    </div>
  );
}