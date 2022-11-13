//Import cfg
import React, { useState } from 'react'

//Import estilos
import { Card, Form, Button, Alert } from 'react-bootstrap'


export default function Filtro(){

    const [filter,setFilter] = useState ({title:'',price:'',category:''})


    const handleChange = (e)=>{
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setFilter({...filter,[name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }     

    return(
        <Card className="container">
            <Card.Body>
                <Alert variant="warning">FILTRO EN DESARROLLO</Alert>
                <Card.Title>Filtrar por:</Card.Title>

                    <Form.Group>
                        <Form.Label>Nombre del producto</Form.Label>
                        <Form.Control type="text" placeholder="¿Qué producto desea buscar?" name="title" value={filter.title} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Precio máximo</Form.Label>
                        <Form.Control type="number" placeholder="¿Hasta que precio?" name="price" value={filter.price} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control as="select" custom name="category" value={filter.category} onChange={handleChange}>
                        <option value="men's clothing">Ropa de Hombre</option>
                        <option value="women's clothing">Ropa de Mujer</option>
                        <option value="electronics">Electrónica</option>
                        <option value="jewelery">Joyería</option>
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" onClick={handleSubmit} block>Filtrar</Button>

            </Card.Body>
        </Card>
    )
}
