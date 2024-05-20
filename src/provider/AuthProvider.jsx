import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import app from "../firebase/firebase.config";
import axios from 'axios';
import PropTypes from 'prop-types';


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

    const logOut = async () => {
        setLoading(true);
        // const { data } = await axios(`${import.meta.env.VITE_API_URL}/logout`, {
        //     withCredentials: true
        // })
        // console.log(data);
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
      }

//    useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, (createUser) => {
//         setUser(createUser)
//         console.log('current user',createUser);
//         setLoading(false)
//     })
//     return () => {
//         unSubscribe()
//     }
//    },[])

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      console.log("current user", currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            loggedUser,
            { withCredentials: true }
          )
          .then((res) => {
            console.log("with token respo", res.data);
          });
      } else {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/logout`,
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
          });
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [user?.email]);
  

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        googleLogin,
        updateUserProfile,
        logOut

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}
 
export default AuthProvider;