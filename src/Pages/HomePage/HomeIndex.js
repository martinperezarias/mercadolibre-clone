//Import cfg
import React from 'react'
import Productos from '../../Components/Productos'
import Promociones from './Promociones'
// import Filtro from '../../Components/Filtro'

//Import servicios
import { GetCollection } from '../../Services/GetCollection'

//Import estilos
import { Col, Row, Spinner, Alert, Container } from 'react-bootstrap'
import '../../Components/Productos.css'


export default function HomePage(){

    // const apiUrl = "https://murmuring-fjord-13467.herokuapp.com/api/products"

    //Estilos
    const styles={
        row:{
            marginLeft: 0,
            marginRight: 0 ,
            backgroundColor: "#e7e7e7"
        }
        ,
        spinner:{
            position: "fixed",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            margin: "auto"
        }
    } 

    //Get productos en DB
    const {error, products, isLoaded} = GetCollection()


    if (error){
        return(
            <div className="container"><Alert variant="danger">Error: {error}</Alert></div>
        )
    } else {
        return <>
            {!isLoaded
            ? <Spinner animation="border" style={styles.spinner}/>
            : <>
                <Promociones/>
                <Container>
                    <Row className="justify-content-md-center">
                        {products.map(item=>(
                        <Col xs={3} key={item.id}>
                            <Productos key={item.id} id={item.id} data={item.data()} verDescripcion={false}/>
                        </Col>
                        ))}
                    </Row>
                </Container>
            </>
            }
        </>
    }
}

