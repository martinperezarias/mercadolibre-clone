//Import cfg
import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

//Import estilos
import { Card, Alert, Form, Col } from 'react-bootstrap'
import { FormGroups } from '../Forms/FormGroup'
import { ButtonLoading } from '../Forms/ButtonLoading'


export default function RegisterPage(){

    //Estilos
    const styles={
        cardProp:{
            maxWidth: '30rem',
            margin: "auto",            
        }
    }

    const { signup } = useAuth()

    const history = useHistory()

    const [form,setForm] = useState ({name:'',lastname:'',email:'',password:'', confirmation:''})
    const [error,setError] = useState ('')
    const [exito,setExito] = useState ('')
    const [loading,setLoading] = useState (false)
    
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setForm({...form,[name]:value});
        e.preventDefault();
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (form.password !== form.confirmation) {
            return setError('Las contraseñas no coinciden')
        }
        try {
            setError('')
            setLoading(true)
            await signup(form.email, form.password, form.name, form.lastname)
            setExito(true)
            setTimeout(() => {
                history.push("/")
                setLoading(false)
                }, 1500) 
        } catch {
            setError('Ha ocurrido un error')
            setLoading(false)
        }
    }

    return(
        <div className="pt-4">
            <Card style={styles.cardProp}>
                <Card.Body>
                    <Card.Title>Formulario de Registro</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {exito && <Alert variant="success">Registrado con éxito</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col>
                                <FormGroups label="Nombre" type="text" placeholder="Ingrese su nombre" name="name" value={form.name} change={handleChange}/>
                            </Col>
                            <Col>
                                <FormGroups label="Apellido" type="text" placeholder="Ingrese su apellido" name="lastname" value={form.lastname} change={handleChange}/>
                            </Col>
                        </Form.Row>
                        <FormGroups label="Email" type="email" placeholder="Ingrese su email" name="email" value={form.email} change={handleChange}/>
                        <FormGroups label="Contraseña" type="password" placeholder="Cree una contraseña" name="password" value={form.password} change={handleChange}/>
                        <FormGroups label="Confirmar contraseña" type="password" placeholder="Confirme su contraseña" name="confirmation" value={form.confirmation} change={handleChange}/>
                        <ButtonLoading loading={loading} type="submit" text="Registrarse" click={handleSubmit} block={true}/>
                        <Form.Label>¿Ya estas registrado? <Link to="/login">Iniciá sesión acá</Link></Form.Label>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}