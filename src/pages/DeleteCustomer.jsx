import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeCustomer, deleteCustomerById, fetchCustomerById, updateCustomer } from "../redux/customerSlice";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Layout from "./Layout";
import { CUSTOMER_VALIDATOR_SCHEMA } from "../constants/AppConstants";
import { ToastContainer, toast } from "react-toastify";


export const DeleteCustomer = () => {

    const { customerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentCustomer = useSelector((state) => state.customer.currentCustomer);

    useEffect(() => {
        const action = fetchCustomerById(customerId);
        dispatch(action);
    }, [])



    const handleSuspended = () => {
        const isConfirm = window.confirm("Are you sure?? ");
        if (isConfirm) {
            const action = deleteCustomerById(customerId);
            dispatch(action)
                .unwrap()
                .then(() => {
                    toast.success("Suspended successfully");
                    setTimeout(() => {
                        navigate('/');
                    }, 1300)
                });
        }
    };


    return (
        <Layout>
            {/* <Navbar /> */}
            <Link to="/">
                <button className="btn btn-outline-secondary m-3">Back</button>
            </Link>
            <div className="container">
                <Form >
                    <div className="row">
                        <Form.Group className="mb-3 col-6" controlId="customerFullName">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                name="fullName"
                                placeholder="Enter full name"
                                value={currentCustomer.fullName}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="customerEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                readOnly
                                name="email"
                                placeholder="Enter email"
                                value={currentCustomer.email}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="customerPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                readOnly
                                value={currentCustomer.phone}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="customerAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                // name="address"
                                readOnly
                                value={currentCustomer.address}
                            >
                            </Form.Control>

                        </Form.Group>

                    </div>

                    <div className="d-flex gap-2 justify-content-end">
                        <Button type="button" variant="danger" onClick={handleSuspended}>
                            Suspended
                        </Button>

                    </div>
                </Form>

            </div>

        </Layout>
    )
}