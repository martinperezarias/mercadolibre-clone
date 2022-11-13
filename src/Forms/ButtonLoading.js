import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

export function ButtonLoading(props){
    return(
        <Button disabled={props.loading} type={props.type || "submit"} variant={props.variant || "primary"} onClick={props.click} block={props.block || false}>
            {props.loading 
            ? <Spinner animation="border" size="sm"/> 
            : `${props.text}`}
        </Button>
    )
}

