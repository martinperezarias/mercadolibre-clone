//Import cfg
import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

//Import estilos
import { Card, Alert, Form } from 'react-bootstrap'
import { FormGroups } from '../Forms/FormGroup'
import { ButtonLoading } from '../Forms/ButtonLoading'


export default function LoginPage(){

    //Estilos
    const styles={
        cardProp:{
            maxWidth: '30rem',
            margin: "auto",            
        }
    }

    const { login } = useAuth()

    const history = useHistory()
  
    const [form,setForm] = useState ({email:'',password:''})
    const [error, setError] = useState ('')
    const [exito,setExito] = useState ('')
    const [loading,setLoading] = useState (false)    

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setForm({...form,[name]:value})
        e.preventDefault()
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(form.email, form.password)
            setExito(true)
            setTimeout(() => {
                history.push("/")
                setLoading(false)
                }, 1500) 
        } catch {
            setError('Ha ocurrido un error')
        }
        setLoading(false)
    }

    return(
        <div className="pt-4">
            <Card style={styles.cardProp}>
                <Card.Body>
                    <Card.Title>Bienvenido</Card.Title>        
                    {error && <Alert variant="danger">{error}</Alert>}
                    {exito && <Alert variant="success">Logueado con éxito</Alert>}  
                    <Form onSubmit={handleSubmit}>
                        <FormGroups label="Email" type="email" placeholder="Ingrese su email" name="email" value={form.email} change={handleChange}/>
                        <FormGroups label="Contraseña" type="password" placeholder="Ingrese su contraseña" name="password" value={form.password} change={handleChange}/>
                        <ButtonLoading loading={loading} type="submit" text="Ingresar" click={handleSubmit} block={true}/>
                        <Form.Label className="pt-2">
                            ¿No tenes cuenta? <Link to="/register">Registrate acá</Link>
                        </Form.Label>                       
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}