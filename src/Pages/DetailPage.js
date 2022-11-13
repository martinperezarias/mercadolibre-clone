//Import cfg
import React from 'react'
import Producto from '../Components/Productos'

//Import servicios
import { GetItem } from '../Services/GetItem'

//Import estilos
import { Alert, Spinner } from 'react-bootstrap'


export default function DetailPage(props){

    // const apiUrl = "https://murmuring-fjord-13467.herokuapp.com/api/products/"+id

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

    //Get del producto a ver
    const id = props.match.params.id
    const {error, product, isLoaded} = GetItem(id) 

    if (error){
        return(
            <div className="container"><Alert variant="danger">Error: {error}</Alert></div>
        )
    } else {
        return <>
            {!isLoaded
            ?   <Spinner animation="border" style={styles.spinner}/>
            :   <div className="pt-2">
                    <Producto data={product.data()} id={product.id} verDetalle={false} className="pt-2"/>
                </div>
            }
        </>
    }
}