import React, { useState, useContext, useEffect } from 'react'
import firebase from '../Config/firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [currentUserUid, setCurrentUserUid] = useState()
    const [userName, setUserName] = useState('')

    const [cartItems, setCartItems] = useState([])
    
    function signup(email, password, name, lastname){
        return (
            firebase.auth.createUserWithEmailAndPassword(email, password)
            .then((data) =>{
                firebase.db.collection("users").add({
                    name: name,
                    lastname: lastname,
                    email: email,
                    userId: data.user.uid
                })
            })
            .catch((error) =>{
                console.log("Error cargando datos en DB", error)
            })
        )
    }


    function login(email, password){
        return firebase.auth.signInWithEmailAndPassword(email, password)
    }


    function logout(){
        return (
            firebase.auth.signOut()
            .then(() =>{
                setUserName()
            })
        )
    }


    function addToCart(){
        
    }

    //Comprueba si hay una sesión iniciada
    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
                if (user) {
                    setCurrentUser(user)
                    setCurrentUserUid(user.uid)
                } else {
                    setCurrentUserUid('')
                }
            })
            return () => unsubscribe()
        }, [])

    
    //Obtiene el nombre de usuario asociado al uid logueado   
    useEffect (() => {
        firebase.db.collection("users").where("userId", "==", `${currentUserUid}`).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUserName(doc.data().name)
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error)
        })

        return { userName } 
    }, [currentUserUid])


    const value = {
        currentUser,
        currentUserUid,
        userName,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
