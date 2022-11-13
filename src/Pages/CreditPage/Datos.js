//Import cfg
import React,{useState} from 'react'
import firebase from '../../Config/firebase'


//Import estilos
import { Card, Alert, Form, Col, Button } from 'react-bootstrap'
import { FormGroups } from '../../Forms/FormGroup'


export default function Datos(props){

    //Estilos
    const styles={
        cardProp:{
            height: "auto",
            maxWidth: "650px",
            margin: "auto",
            marginTop: "20px",
            width: '30rem'
        }
    }

    const [mensaje,setMensaje] = useState(false);
    const [form,setForm] = useState ({credit:'',name:'',month:'', year:'',cvc:''})

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setForm({...form,[name]:value});
        event.preventDefault();
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        firebase.db.collection("sells").add({
            name: form.name,
            date: Date(),
            product: props.data.title,
            price: props.data.price
        })
        setMensaje(true)
    }

    return(
        <Card style={styles.cardProp}>
            <Card.Body>
                <Card.Title>Datos del comprador</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <FormGroups label="Número de tarjeta" type="number" placeholder="4575 6568 5785 6787" name="credit" value={form.credit} change={handleChange}/>
                    <FormGroups label="Nombre y Apellido" type="text" placeholder="Juan Perez" name="name" value={form.name} change={handleChange}/>
                    <Card.Title>Vencimiento</Card.Title>
                    <Form.Row>
                        <Col>
                            <FormGroups label="Mes" type="number" placeholder="01" name="month" value={form.month} change={handleChange}/>
                        </Col>
                        <Col>
                            <FormGroups label="Año" type="number" placeholder="2025" name="year" value={form.year} change={handleChange}/>
                        </Col>
                        <Col>
                            <FormGroups label="CVC" type="number" placeholder="123" name="cvc" value={form.cvc} change={handleChange}/>
                        </Col>
                    </Form.Row>
                    <Form.Group className="text-center">
                        <h5 className="text-success">Total a pagar: ${props.data.price}</h5>
                    </Form.Group>                    
                    <Form.Group>
                        <Button type="submit" variant="success" size="lg" block >Confirmar compra</Button>
                    </Form.Group>
                    {mensaje &&
                    <Alert variant="success">Gracias por su compra</Alert>
                    }          
                </Form>
            </Card.Body>
        </Card>
    )
}