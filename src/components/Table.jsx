import React, { useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers, deleteCustomerById, } from "../redux/customerSlice";
import { faEdit, faTrash, faPlus, faMinus, faExchange, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const TableData = () => {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customer.data);

    useEffect(() => {
        dispatch(fetchAllCustomers());
    }, [dispatch]);

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            dispatch(deleteCustomerById(id));
        }
    };

    return (
        <div className="container mt-4">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> No. </th>
                        <th>Full Name </th>
                        <th>Email</th>
                        <th> Phone </th>
                        <th> Address </th>
                        <th> Balance </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={customer.id}>
                            <td> {index} </td>
                            <td>{customer.fullName} </td>
                            <td>{customer.email}</td>
                            <td> {customer.phone} </td>
                            <td> {customer.address} </td>
                            <td> {customer.balance} </td>
                            <td>
                                <Link to={`/edit/${customer.id}`} style={{ paddingRight: 10, alignItems: "center" }}>
                                    <FontAwesomeIcon icon={faEdit} />

                                </Link>

                                <Link to={`/delete/${customer.id}`} style={{ paddingRight: 10, alignItems: "center" }}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
                                </Link>

                                <Link to={`/deposit/${customer.id}`} style={{ paddingRight: 10, alignItems: "center" }}>
                                    <FontAwesomeIcon icon={faPlus} style={{ color: "green" }} />
                                </Link>

                                <Link to={`/withdraw/${customer.id}`} style={{ paddingRight: 10, alignItems: "center" }}>
                                    <FontAwesomeIcon icon={faMinus} style={{ color: "orange" }} />
                                </Link>

                                <Link to={`/transfer/${customer.id}`} style={{ paddingRight: 10, alignItems: "center" }}>
                                    <FontAwesomeIcon icon={faExchange} style={{ color: "pink" }} />
                                </Link>

                             

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
