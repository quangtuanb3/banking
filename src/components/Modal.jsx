import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {FormData} from '../components/Form'
import { useEffect, useState } from "react";

import { productService } from '../services/productService'



export const ModalProduct = ({ }) => {

    const [products, setProducts] = useState(products_data);



    return (
        <div >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormData />
                </Modal.Body>
            </Modal>
        </div>
    );
}