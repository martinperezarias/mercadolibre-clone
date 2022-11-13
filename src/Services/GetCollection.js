import {useState, useEffect} from 'react'
import firebase from '../Config/firebase'


export function GetCollection(){

    const [error, setError] = useState(null)
    const [products, setProducts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    

    useEffect (() => {
        firebase.db.collection("productos").get()
        .then(querySnapshot =>{
            setProducts(querySnapshot.docs)
            setIsLoaded(true)
        })
        .catch(error => {
            setIsLoaded(true)
            setError(error)
            console.log('Hubo un problema: ' + error.message)
        })
    }, [])

    return {error, products, isLoaded}
}
    
