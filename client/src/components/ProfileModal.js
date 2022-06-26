import axios from "axios";
import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { dataStore } from "../store/data";

export default function ProfileModal (props) {
  
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [contact, setContact] = useState('');

    const {token} = dataStore()

    const data = {
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "contact": contact  
    }
  

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleFirstname = (event) => {
        setFirstname(event.target.value)
    }

    const handleLastname = (event) => {
        setLastname(event.target.value)
    }

    const handleContact = (event) => {
        setContact(event.target.value)
    }

    const handleSubmit = () => {
        try {
          
            const response = axios.put('/api/v1/profile', data, {
                headers: {
                    'Authorization': `${token}`
                }
            })
         
            props.handleSubmit()
            props.handleClose()
        } catch (e) {
            console.log(e)
        }
    }
    
  
    return (
        <Modal
        show={props.show}
        onHide={props.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label htmlFor="inputemail">Email</Form.Label>
                <Form.Control
                    type="email"
                    id="inputemail"
                 
                    onChange={handleEmail}
                    value={email}
                />
                <Form.Label htmlFor="inputusername">Username</Form.Label>
                <Form.Control
                    type="text"
                    id="inputusername"
                
                    onChange={handleUsername}
          
                />
                <Form.Label htmlFor="firstname">First Name</Form.Label>
                <Form.Control
                    type="text"
                    id="firstname"
                   
                    onChange={handleFirstname}
                   
                />
                <Form.Label htmlFor="lastname">Last Name</Form.Label>
                <Form.Control
                    type="text"
                    id="lastname"
                 
                    onChange={handleLastname}
                   
                />
                <Form.Label htmlFor="phone">Phone Number</Form.Label>
                <Form.Control
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    aria-describedby="phoneHelpBlock"
                    onChange={handleContact}
                  
                />
                <Form.Text id="phoneHelpBlock" muted>
                    Contoh : 082136846231
                </Form.Text>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}