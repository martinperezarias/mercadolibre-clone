import { useState, useEffect } from 'react'
import firebase from '../Config/firebase'


export function GetItem(props) {

    const [error, setError] = useState(null)
    const [product, setProduct] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect (() => {
        firebase.db.doc("productos/"+props).get()
        .then(doc =>{
            setProduct(doc)
            setIsLoaded(true)
        })
        .catch(error => {
            setIsLoaded(true)
            setError(error)
            console.log('Hubo un problema: ' + error.message)
        })
    }, [props])

    return {error, product, isLoaded}
}
