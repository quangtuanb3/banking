import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { changeCustomer, createCustomer } from "../redux/customerSlice";
import Layout from "./Layout";
import { toast } from "react-toastify";
import { CUSTOMER_VALIDATOR_SCHEMA } from "../constants/AppConstants";

export const AddCustomer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentCustomer = useSelector((state) => state.customer.currentCustomer);




    const initialValues = {
        fullName: '',
        email: '',
        description: '',
        phone: '',
        address: '',
    };

    const handleFormSubmit = () => {
        const action = createCustomer(currentCustomer);
        dispatch(action)
            .unwrap()
            .then(() => {
                toast.success("Created successfully");
                setTimeout(() => {
                    navigate('/');
                }, 1300)
            });
    };

    const handleChangeCustomer = (e) => {
        const { name, value } = e.target;
        const obj = {
            [name]: value,
        };
        const action = changeCustomer(obj);
        dispatch(action);

    };

    return (
        <Layout>
            <Link to="/">
                <button className="btn btn-outline-secondary m-3">Back</button>
            </Link>
            <div className="container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={CUSTOMER_VALIDATOR_SCHEMA}
                    onSubmit={(values) => {
                        handleFormSubmit(values);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <Form.Group className="mb-3 col-6" controlId="customerFullName">
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter full name"
                                        value={values.fullName}
                                        onChange={(e) => {
                                            handleChange(e); // Formik's handleChange
                                            handleChangeCustomer(e); // Custom handleChangeCustomer
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.fullName && !!errors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" controlId="customerEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={values.email}
                                        onChange={(e) => {
                                            handleChange(e); // Formik's handleChange
                                            handleChangeCustomer(e); // Custom handleChangeCustomer
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && !!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" controlId="customerPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        placeholder="Enter phone"
                                        value={values.phone}
                                        onChange={(e) => {
                                            handleChange(e); // Formik's handleChange
                                            handleChangeCustomer(e); // Custom handleChangeCustomer
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.phone && !!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" controlId="customerAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        name="address"
                                        value={values.address}
                                        onChange={(e) => {
                                            handleChange(e); // Formik's handleChange
                                            handleChangeCustomer(e); // Custom handleChangeCustomer
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.address && !!errors.address}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </div>

                            <div className="d-flex gap-2 justify-content-end">
                                <Button type="submit" variant="primary">
                                    Save changes
                                </Button>

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    )
}