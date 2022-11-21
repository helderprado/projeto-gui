import { useRouter } from "next/router";
import React from "react";

function Logout() {
    const router = useRouter();

    async function logout() {
        router.push(`/login`);
    }

    return (
        <button
            className="w-full p-4 bg-black text-white hover:bg-black-900 rounded-2xl"
            onClick={logout}
        >
            Sair
        </button>
    )
}

export { Logout };