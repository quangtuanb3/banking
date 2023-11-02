import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeCustomer, changeDeposit, changeWithdraw, fetchCustomerById, updateCustomer } from "../redux/customerSlice";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Layout from "./Layout";
import { DEPOSIT_VALIDATOR_SCHEMA, WITHDRAW_VALIDATOR_SCHEMA } from "../constants/AppConstants";
import { toast } from "react-toastify";


export const Withdraw = () => {

    const { customerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentCustomer = useSelector((state) => state.customer.currentCustomer);
    const withdraw = useSelector((state) => state.customer.withdraw);


    useEffect(() => {
        const action = fetchCustomerById(customerId);
        dispatch(action);
    }, [])

    const handleFormSubmit = () => {
        if (Number.parseInt(currentCustomer.balance) < Number.parseInt(withdraw)) {
            alert("Invalid amount");
            return;
        }
        const newBalance = Number.parseInt(currentCustomer.balance) - Number.parseInt(withdraw);
        const newCustomer = { ...currentCustomer, balance: newBalance }
        const action = updateCustomer(newCustomer);
        dispatch(action)
            .unwrap()
            .then(() => {
                toast.success("successful Withdraw")
                setTimeout(() => {
                    navigate('/');

                }, 1300)
            });
    };

    const handleChangeWithdraw = (e) => {

        dispatch(changeWithdraw(e.target.value));
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
                    validationSchema={WITHDRAW_VALIDATOR_SCHEMA}
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
                                        value={withdraw || ''}
                                        onChange={(e) => {
                                            handleChange(e); // Formik's handleChange
                                            handleChangeWithdraw(e); // Custom handleChangeCustomer
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.withdraw && !!errors.withdraw}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.withdraw}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            <div className="d-flex gap-2 justify-content-end">
                                <Button type="submit" variant="primary">
                                    Withdraw
                                </Button>

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

        </Layout>
    )
}