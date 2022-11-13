// import { useEffect } from 'react'
import firebase from '../Config/firebase'

export function DeleteItem(props){
    return firebase.db.doc("productos/"+props).delete()
}
