import React, { createContext, useState } from "react";
import * as auth from '../services/Auth';

export const AuthContext = createContext({
    signed: false,
    user: null,
    signIn: () => {},
    signUp: () => {},
    setUser: () => {},
    getEvents: () => {}
});

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState({});
    const [signed, setSigned] = useState(false);

    async function signIn(user, password){
        const response = await auth.signIn(user, password)
        setUser(response);
        setSigned(!!response);
    }

    async function signUp(user) {
        const response = await auth.signUp(user)
        setUser(response)
        setSigned(true)
    }
    function getEvents(){
        return user.events
    }
    return (
        <AuthContext.Provider
            value={{
                signed,
                user,
                signIn,
                signUp,
                setUser,
                getEvents
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
