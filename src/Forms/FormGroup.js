import React from 'react'
import { Form } from 'react-bootstrap'

export function FormGroups(props){
    return(
        <Form.Group className>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control 
                type={props.type} 
                placeholder={props.placeholder} 
                name={props.name} 
                value={props.value} 
                required 
                onChange={props.change}
            />
        </Form.Group>
    )
}
