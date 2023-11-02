import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeCustomer, changeDeposit, fetchAllCustomers, fetchCustomerById, updateCustomer } from "../redux/customerSlice";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { customerService } from '../services/customerService'
import Layout from "./Layout";
import { DEPOSIT_VALIDATOR_SCHEMA } from "../constants/AppConstants";
import { toast } from "react-toastify";


export const Transfer = () => {

    const { customerId } = useParams();
    const [transfer, setTransfer] = useState(0);
    const [total, setTotal] = useState(0);
    const [recipientId, setRecipientId] = useState(-1);
    const [recipient, setRecipient] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentCustomer = useSelector((state) => state.customer.currentCustomer);
    const customersData = useSelector((state) => state.customer.data);

    let customers = [];
    if (customersData && customersData.length > 0) {
        customers = customersData.filter(c => c.id != currentCustomer.id)
    }

    useEffect(() => {
        const action = fetchCustomerById(customerId);
        dispatch(action);
        dispatch(fetchAllCustomers())
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        // const recipient = await customerService.getCustomerById(recipientId);

        if (currentCustomer.balance < total) {
            alert("Your balance is not enough money!");
            return;
        }


        const recipientNewBalance = Number.parseInt(currentCustomer.balance) + Number.parseInt(transfer);
        const senderNewBalance = Number.parseInt(currentCustomer.balance) - Number.parseFloat(total);

        const newRecipient = { ...recipient, balance: recipientNewBalance };

        const newSender = { ...currentCustomer, balance: senderNewBalance };
        console.log(newSender)

        dispatch(updateCustomer(newSender))

        console.log(newRecipient);

        customerService.update(newSender)
        customerService.update(newRecipient)

        dispatch(updateCustomer(newRecipient)).unwrap().then(() => {
            toast.success("Successful transfer");
        })

        const dataTransfer = {
            senderId: currentCustomer.id,
            senderName: currentCustomer.fullName,
            recipientId: recipient.id,
            recipientName: recipient.fullName,
            transferAmount: transfer,
            fees: 10,
            feesAmount: (transfer / 10),
        }
        await customerService.createTransfer(dataTransfer)
        navigate("/")

    };

    const handleChangeRecipient = async (e) => {
        setRecipientId(e.target.value);

        // console.log(e.target.value);

        const recipientData = await customerService.getCustomerById(e.target.value);
        setRecipient(await recipientData.data);
    };


    return (
        <Layout>
            {/* <Navbar /> */}
            <Link to="/">
                <button className="btn btn-outline-secondary m-3">Back</button>
            </Link>
            <div className="container">

                <Form onSubmit={handleFormSubmit}>
                    <div className="row">
                        <Form.Group className="mb-3 col-6" controlId="customerPhone">
                            <Form.Label>Sender ID</Form.Label>
                            <Form.Control type="text" readOnly value={currentCustomer.id || ""} />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="customerFullName">
                            <Form.Label>Sender name</Form.Label>
                            <Form.Control type="text" readOnly value={currentCustomer.fullName || ""} />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="customerEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" readOnly value={currentCustomer.email || ""} />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="customerEmail">
                            <Form.Label>Sender Balance</Form.Label>
                            <Form.Control type="number" readOnly value={currentCustomer.balance || 0} />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="recipientName">
                            <Form.Label>Recipient Name</Form.Label>
                            <Form.Select
                                onChange={(e) =>
                                    handleChangeRecipient(e)
                                }
                            >
                                <option>--Select--</option>
                                {customers.map(c => (
                                    <option value={c.id} key={c.id}>
                                        {c.fullName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3 col-6" controlId="transferAmount">
                            <Form.Label>Transfer Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={transfer || ''}
                                onChange={(e) => {
                                    setTransfer(e.target.value);
                                    setTotal(Number.parseInt(e.target.value) / 10 + Number.parseInt(e.target.value)
                                    )
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="transferAmount">
                            <Form.Label>Fee (%)</Form.Label>
                            <Form.Control
                                type="number"
                                value={10}
                                readOnly

                            />
                        </Form.Group>
                        <Form.Group className="mb-3 col-6" controlId="transferAmount">
                            <Form.Label>Total</Form.Label>
                            <Form.Control
                                type="number"
                                value={total || ''}
                                readOnly
                            />
                        </Form.Group>
                    </div>

                    <div className="d-flex gap-2 justify-content-end">
                        <Button type="submit" variant="primary">
                            Transfer
                        </Button>
                    </div>
                </Form>


            </div>

        </Layout>
    )
}