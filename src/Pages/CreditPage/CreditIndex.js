//Import cfg
import React from 'react'
import Producto from '../../Components/Productos'
import Datos from './Datos'

//Import servicios
import { GetItem } from '../../Services/GetItem'

//Import estilos
import { Spinner, Col, Row, Alert } from 'react-bootstrap'
import '../../Components/Productos.css'


export default function CreditPage(props){

    // const apiUrl = "https://murmuring-fjord-13467.herokuapp.com/api/products/"+id

    //Estilos
    const styles={
        spinner:{
            position: "fixed",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            margin: "auto"
        }
    } 
    
    //Get del producto a comprar
    const id = props.match.params.id
    const {error, product, isLoaded} = GetItem(id)

    if (error){
        return(
            <div className="container"><Alert variant="danger">Error: {error}</Alert></div>
        )
    } else {
        return( 
        <>
            {!isLoaded
            ?   <Spinner animation="border" style={styles.spinner}/>
            :   <Row className="container mx-auto pt-2">
                    <Col>
                        <Datos data={product.data()}/>
                    </Col>
                    <Col>
                        <Producto data={product.data()} id={product.id} verPrecio={false} verComprar={false}/>
                    </Col>
                </Row>
            }
        </>
        )
    }    
}