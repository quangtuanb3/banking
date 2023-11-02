import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeCustomer, changeDeposit, fetchCustomerById, updateCustomer } from "../redux/customerSlice";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Layout from "./Layout";
import { DEPOSIT_VALIDATOR_SCHEMA } from "../constants/AppConstants";
import { toast } from "react-toastify";


export const Deposit = () => {

    const { customerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentCustomer = useSelector((state) => state.customer.currentCustomer);
    const deposit = useSelector((state) => state.customer.deposit);


    useEffect(() => {
        const action = fetchCustomerById(customerId);
        dispatch(action);
    }, [])

    const handleFormSubmit = () => {
        const newBalance = Number.parseInt(currentCustomer.balance) + Number.parseInt(deposit);
        const newCustomer = { ...currentCustomer, balance: newBalance }
        const action = updateCustomer(newCustomer);
        dispatch(action)
            .unwrap()
            .then(() => {
                toast.success("successful Transaction")
                setTimeout(() => {
                    navigate('/');

                }, 1300)
            });
    };

    const handleChangeDeposit = (e) => {

        dispatch(changeDeposit(e.target.value));
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
                    validationSchema={DEPOSIT_VALIDATOR_SCHEMA}
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
                                <Form.Group className="mb-3 col-6" controlId="customerPhone">
                                    <Form.Label>Customer ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        value={values.id || ""}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3 col-6" controlId="customerFullName">
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        value={values.fullName || ""}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" controlId="customerEmail">
                                    <Form.Label>Current Balance</Form.Label>
                                    <Form.Control
                                        type="number"
                                        readOnly
                                        value={values.balance || 0}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 col-6" controlId="customerEmail">
                                    <Form.Label>Transaction Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={10000}
                                        max={10000000}
                                        value={deposit || ''}
                                        onChange={(e) => {
                                            handleChange(e); // Formik's handleChange
                                            handleChangeDeposit(e); // Custom handleChangeCustomer
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.deposit && !!errors.deposit}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.deposit}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            <div className="d-flex gap-2 justify-content-end">
                                <Button type="submit" variant="primary">
                                    Deposit
                                </Button>

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

        </Layout>
    )
}