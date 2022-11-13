//Import cfg
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

//Import servicios
import { AddItem } from '../Services/AddItem'

//Import estilos
import { Card, Form, Alert } from 'react-bootstrap'
import { FormGroups } from '../Forms/FormGroup'
import { ButtonLoading } from '../Forms/ButtonLoading'


export default function AddProductPage() {

    //Estilos
    const styles={
        cardProp:{
            width: '40rem',
            margin: "auto",            
        }
    }

    const history = useHistory()

    const [newProduct,setNewProduct] = useState ({title:'',price:'',category:'', description:'', image:''})
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [exito,setExito] = useState()

    const handleChange = (e)=>{
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setNewProduct({...newProduct,[name]:value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
    
        try {
            await AddItem(newProduct)
            setExito(true)
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
        <div className="pt-4">
            <Card className="container pt-2" style={styles.cardProp}>
                <Card.Body>
                    <Card.Title>Nuevo producto</Card.Title>                
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {exito && <Alert variant="success">Agregado con éxito</Alert>}
                        <FormGroups label="Título" type="text" placeholder="Título del nuevo producto" name="title" value={newProduct.title} change={handleChange}/>
                        <FormGroups label="Precio" type="number" placeholder="Precio del nuevo producto" name="price" value={newProduct.price} change={handleChange}/>
                        <Form.Group>
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control as="select" custom name="category" value={newProduct.category} required onChange={handleChange}>
                                <option value="men's clothing">Ropa de Hombre</option>
                                <option value="women's clothing">Ropa de Mujer</option>
                                <option value="electronics">Electrónica</option>
                                <option value="jewelery">Joyería</option>
                            </Form.Control>
                        </Form.Group>
                        <FormGroups label="Descripción" type="text" placeholder="Descripción del nuevo producto" name="description" value={newProduct.description} change={handleChange}/>
                        <FormGroups label="URL de la imagen" type="text" placeholder="URL de la imagen del nuevo producto" name="image" value={newProduct.image} change={handleChange}/>
                        <ButtonLoading loading={loading} type="submit" variant="success" text="Agregar producto" click={handleSubmit} block={true}/>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )

}
