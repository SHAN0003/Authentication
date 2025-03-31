import { createContext, useContext } from "react";

export const LoginContext = createContext({
    userLogedIn: false
})

export const  LoginProvider = LoginContext.Provider

export default function useLogin() {
    return useContext(LoginContext)
}
