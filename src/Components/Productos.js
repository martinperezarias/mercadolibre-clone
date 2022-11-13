//Import cfg
import React from 'react'
import { Link } from 'react-router-dom'

//Import estilos
import { Card, Button, Nav } from 'react-bootstrap'
import { BsPencil } from 'react-icons/bs'
import { FaCartPlus } from "react-icons/fa";


export default function Productos(props){

    //Estilos
    const styles={
        link:{
            textDecoration:"none",
        },
        buttonMargin:{
            marginBottom:"4px"
        },
        titleMax:{
            paddingTop: "5px",
            height: "55px",
            fontSize: "15px"
        },
        cardProp:{
            height: "auto",
            maxWidth: "35rem",
            margin: "auto",
            marginTop: "20px"
        }
    }

    const verDescripcion = (props.verDescripcion!==false?true:false)
    const verComprar = (props.verComprar!==false?true:false)
    const verPrecio = (props.verPrecio!==false?true:false)
    
    //Reduce el titulo si es muy largo
    let shortDesc = (props.data.title)
    if(verDescripcion === false){
        shortDesc = shortDesc.substring(0,45)
    }

    return(
        <Card className="card-shadow" style={styles.cardProp}>
            <Card.Body>
                {verDescripcion ||
                <Nav className="justify-content-end">
                    <Link to={'/modify/'+props.id}>
                        <BsPencil/>
                    </Link>
                </Nav>
                }
                <img className="card-img" src={props.data.image} variant="top" alt={props.data.title}/>
                {verPrecio &&
                <p className="success">${props.data.price}</p>      
                }
                {!verDescripcion
                ? <>
                    <p style={styles.titleMax}>{shortDesc}</p>
                    <div className="text-center">
                        <Link to={'/producto/'+props.id} style={styles.link}>
                            <Button className="px-4" variant="info" style={styles.buttonMargin}>Detalles</Button>
                        </Link>
                        <Button className="mb-1 ml-2" variant="warning" style={{color:"white"}}><FaCartPlus/></Button>
                    </div>
                </>
                : <>
                    <h6 style={styles.titleMax}>{props.data.title}</h6>
                    <p className="text-secondary">{props.data.description}</p>
                    <div className="text-center">
                        <Link to={'/'} style={styles.link}>
                            <Button className="px-4" variant="info" style={styles.buttonMargin}>Volver</Button>
                        </Link>
                        <Button className="mb-1 ml-2" variant="warning" style={{color:"white"}}><FaCartPlus/></Button>
                    </div>
                </>
                }
                {verComprar &&
                <div className="text-center">
                    <Link to={'/compra/'+props.id} style={styles.link}>
                        <Button className="px-5" variant="success" style={styles.buttonMargin}>Comprar</Button>
                    </Link> 
                </div>
                }
            </Card.Body>
        </Card>
    )
}