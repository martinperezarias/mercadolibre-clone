//Import cfg
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../../Config/firebase'

//Import servicios
import { DeleteItem } from '../../Services/ModifyItem'

//Import estilos
import { Card, Form, Alert } from 'react-bootstrap'
import { FormGroups } from '../../Forms/FormGroup'
import { ButtonLoading } from '../../Forms/ButtonLoading'


export default function Modificar(props){

    //Estilos
    const styles={
        cardProp:{
            width: '30rem',
            margin: "auto",
            marginTop: "20px"             
        }
    }

    const id = props.id

    const [modification,setModification] = useState ({title:'',price:'',category:'', description:'', image:''})
    const [error, setError] = useState(null)
    const [exito,setExito] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory()


    const handleChange = (e)=>{
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setModification({...modification,[name]:value})
    }

    
    useEffect (() => {
        firebase.db.doc("productos/"+id).get()
        .then(doc =>{
            setModification({
                title:props.data.title,
                price:props.data.price,
                category:props.data.category,
                description:props.data.description,
                image:props.data.image
            })
        })
        .catch(error => {
            setError(error)
            console.log('Hubo un problema: ' + error)
        })
    }, [props, id])

    const handleModification = (e) => {
        e.preventDefault()
        setLoading(true)
        firebase.db.doc("productos/"+id)
        .set({
            title: modification.title,
            price: modification.price,
            category: modification.category,
            description: modification.description,
            image: modification.image
        },{merge:true})
        .then(doc =>{
            setExito("Modificado con éxito")
            setTimeout(() => {
                history.push("/")
                setLoading(false)
            }, 1500)
        })
        .catch(error =>{
            setError(error)
            setLoading(false)
            console.log(error)
        })
    } 

    async function handleDelete(e){
        e.preventDefault()
        setLoading(true)
    
        try {
            await DeleteItem(id)
            setExito("Eliminado con éxito")
            setTimeout(() => {
                history.push("/")
                setLoading(false)
            }, 1500)
        } catch {
            setError(error)
            console.log("Ha ocurrido un error")
            setLoading(false)
        }
    }

    return(
        <Card className="container" style={styles.cardProp}>
            <Card.Body>
                <Card.Title>Propiedades</Card.Title>
                
                    {error && <Alert variant="danger">{error}</Alert>}
                    {exito && <Alert variant="success">{exito}</Alert>}

                    <FormGroups label="Nombre del producto" type="text" placeholder="Nuevo título de producto" name="title" value={modification.title} change={handleChange}/>
                    <FormGroups label="Precio" type="number" placeholder="Nuevo precio de producto" name="price" value={modification.price} change={handleChange}/>
                    <Form.Group>
                        <Form.Label>Seleccione categoría</Form.Label>
                        <Form.Control as="select" custom name="category" value={modification.category} onChange={handleChange}>
                            <option value="men's clothing">Ropa de Hombre</option>
                            <option value="women's clothing">Ropa de Mujer</option>
                            <option value="electronics">Electrónica</option>
                            <option value="jewelery">Joyería</option>
                        </Form.Control>
                    </Form.Group>
                    <FormGroups label="Descripción del producto" type="text" placeholder="Nueva descripción de producto" name="description" value={modification.description} change={handleChange}/>
                    <FormGroups label="URL de la imagen" type="text" placeholder="Nueva URL de la imagen" name="image" value={modification.image} change={handleChange}/>

                    <div className="text-center">
                        <ButtonLoading loading={loading} type="submit" variant="success" text="Modificar" click={handleModification}/>{' '}
                        <ButtonLoading loading={loading} type="submit" variant="danger" text="Eliminar" click={handleDelete}/>
                    </div>

            </Card.Body>
        </Card>        
    )
}
