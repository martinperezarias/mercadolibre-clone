//Import cfg
import React from 'react'
import Modificar from './Modificar'
import Producto from '../../Components/Productos'

//Import servicios
import { GetItem } from '../../Services/GetItem'

//Import estilos
import { Row, Col, Spinner, Alert } from 'react-bootstrap'


export default function ModifyProductPage(props) {

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
            :   <>
                    <Row className="container mx-auto">
                        <Col>
                            <Modificar id={id} data={product.data()}/>
                        </Col>                                
                        <Col>
                            <Producto data={product.data()} verComprar={false}/>
                        </Col>
                    </Row>
                </>
                }
            </>
        )
    }   
}
