//Import cfg
import React from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../Context/AuthContext'

//Import estilos
import { Navbar, Nav, Button, Spinner } from 'react-bootstrap'
import { BsBoxArrowRight, BsFileEarmarkPlus, BsPerson } from 'react-icons/bs'
import logo from '../logo.png'


export default function Menu(){

    //Estilos
    const styles={
        navbar:{
            backgroundColor:"#fdec51"
        },
        link:{
            textDecoration:"none",
            marginRight:"auto"
        },
        userIcon:{
            fontSize:"19",
            marginBottom: ".25rem",
        },
        logo:{
            height: "42px",
            margin: "0 15px 0 10px"
        }
    }

    const history = useHistory()
    const { currentUserUid, logout, userName } = useAuth()

    //Logout
    async function handleLogout(e) {
        e.preventDefault()
        try {
            await logout()
            history.push("/")
        } catch {
            console.log("Ha ocurrido un error")
        }
    }

    return(
        <Navbar variant="secondary" style={styles.navbar}>
            <div className="container">
                        <Nav style={styles.link}>  
                    <Nav.Link as={Link} to="/">
                        <img alt="logo" src={logo} style={styles.logo}/> 
                    </Nav.Link> 
                    <Nav.Link as={Link} to="/add">         
                        <Button type="button"><BsFileEarmarkPlus style={styles.userIcon}/></Button> 
                    </Nav.Link>
                </Nav>
                <Nav>
                {currentUserUid &&
                    <>
                    {!userName
                        ?   <Spinner className="mr-5" animation="border" size="sm" style={styles.spinner}/>
                        :   <>
                            <Navbar.Text className="my-auto"> <BsPerson style={styles.userIcon}/> {userName}</Navbar.Text> 
                            <Button variant="outline-none" onClick={handleLogout}><BsBoxArrowRight style={styles.userIcon}/></Button>
                            </>
                    }
                    </>
                }
                {!currentUserUid &&
                    <>
                    <Nav.Link as={Link} to="/login" style={styles.link}>
                        <Button variant="outline-none">Ingresar</Button>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/register" style={styles.link}>
                        <Button variant="outline-none">Registrarse</Button>
                    </Nav.Link>
                    </>
                }
                </Nav> 
            </div>
      </Navbar>
    )
}