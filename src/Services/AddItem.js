import firebase from '../Config/firebase'

export function AddItem(props) {
    
    return (
        firebase.db.collection("productos").add({
            title: props.title,
            price: props.price,
            category: props.category,
            description: props.description,
            image: props.image
        }))
}
