import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import app from "../firebase/firebase.config";


export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut =() => {
        setLoading(true);
        return signOut(auth)
    }

    const profileUpdate = (name, photourl) => {
        setLoading(true)
        return updateProfile( auth.currentUser, {
            displayName: name, photoURL: photourl
        })
    }

   useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (createUser) => {
        setUser(createUser)
        console.log('current user',createUser);
        setLoading(false)
    })
    return () => {
        unSubscribe()
    }
   },[])

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        googleLogin,
        profileUpdate,
        logOut

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;