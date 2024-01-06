import { db } from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth"

import { useState, useEffect } from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }
    // register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
       

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName,
            })

            setLoading(false)

            return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "The password should contains 6 characters at least."
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "The e-mail is already registered."
            } else {
                systemErrorMessage = "There's been an error. Try again in a few moments."
            }
            setLoading(false)
            setError(systemErrorMessage);
        }
        

    };

    // logout - sign out
    const logout = () => {

        checkIfIsCancelled()

        signOut(auth)

    };

    // login - sign in
    const login = async(data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false);
            
        } catch (error) {

            let systemErrorMessage

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "User not found."
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Incorrect password."
            } else {
                systemErrorMessage = "There's been an error. Please try again in a few moments."
            }

            setError(systemErrorMessage);
            setLoading(false);
            
        }


    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])


    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }

}