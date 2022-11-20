import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import router from "next/router";

export const Context = createContext(undefined);

const Provider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const loadStoragedData = async () => {
  //     const storagedCookieUser = Cookies.get("user");

  //     if (storagedCookieUser) {
  //       const storagedUser = JSON.parse(storagedCookieUser);
  //       setUser(storagedUser);
  //     }
  //   };
  //   loadStoragedData();
  // }, []);

  // const signOut = async () => {
  //   document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  //   document.cookie = "user" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  //   setUser(null);
  //   router.push("/login");
  // };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
