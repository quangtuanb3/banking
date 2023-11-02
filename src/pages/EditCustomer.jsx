import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeCustomer, fetchCustomerById, updateCustomer } from "../redux/customerSlice";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Layout from "./Layout";
import { CUSTOMER_VALIDATOR_SCHEMA } from "../constants/AppConstants";
import { toast } from "react-toastify";


export const EditCustomer = () => {

    const { customerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentCustomer = useSelector((state) => state.customer.currentCustomer);


    useEffect(() => {
        const action = fetchCustomerById(customerId);
        dispatch(action);
    }, [])



    const handleFormSubmit = () => {
        const action = updateCustomer(currentCustomer);
        dispatch(action)
            .unwrap()
            .then(() => {
                toast.success("Updated successfully")
                setTimeout(() => {
                    navigate('/');

                }, 1300)
            });
    };

    const handleChangeCustomer = (e) => {
        const { name, value } = e.target;
        const newCustomer = {
            [name]: value,
        };
        const action = changeCustomer(newCustomer);
        dispatch(action);

    };
    return (
        <Layout>
            {/* <Navbar /> */}
            <Link to="/">
                <button className="btn btn-outline-secondary m-3">Back</button>
            </Link>
            <div className="container">
                <Formik
                    enableReinitialize
                    initialValues={currentCustomer}
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