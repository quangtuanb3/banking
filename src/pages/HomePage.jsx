import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { TableData } from "../components/Table";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { fetchAllCustomers, deleteCustomerById, } from "../redux/customerSlice";
import { useDispatch } from "react-redux";
import Layout from "./Layout";



export const HomePage = () => {

    return (
        <Layout>
            <Link to="/add">
                <button className="btn btn-primary m-3">Add New</button>
            </Link>
            <Link to="/history">
                <button className="btn btn-info m-3">Transfer History</button>
            </Link>
            <h3 className="container">List of Customers</h3>
            <TableData />
            <ToastContainer />
        </Layout>
    )
}