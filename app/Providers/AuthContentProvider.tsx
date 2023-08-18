'use client';

import { useContext, createContext, useState, useEffect } from 'react';
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface IAuthContext {
    user: any;
    googleSignIn: () => any;
    logOut: () => any;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    // const googleSignIn2 = () => {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(auth, provider);
    // };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser as any);
        });
        return () => unsubscribe();
    }, [user]);

    return <AuthContext.Provider value={{ user, googleSignIn, logOut }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
