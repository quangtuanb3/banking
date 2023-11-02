import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { customerService } from "../services/customerService";

export const HistoryComponent = () => {
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const transfersData = await customerService.getAllTransfer();
                if (transfersData && transfersData.data) {
                    setTransfers(transfersData.data);
                }
            } catch (error) {
                console.error("Error fetching transfers: ", error);
            }
        };

        fetchTransfers();
    }, []);

    return (
        <Layout>
            <Link to="/">
                <button className="btn btn-primary m-3">Back</button>
            </Link>
            <h3 className="container">List of Transfers</h3>
            <div className="container mt-4">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Sender Id</th>
                            <th>Sender Name</th>
                            <th>Recipient Id</th>
                            <th>Recipient Name</th>
                            <th>Transfer Amount</th>
                            <th>Fees</th>
                            <th>Fees Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transfers.map((transfer, index) => (
                            <tr key={transfer.id}>
                                <td>{index + 1}</td>
                                <td>{transfer.senderId}</td>
                                <td>{transfer.senderName}</td>
                                <td>{transfer.recipientId}</td>
                                <td>{transfer.recipientName}</td>
                                <td>{transfer.transferAmount}</td>
                                <td>{transfer.fees}</td>
                                <td>{transfer.feesAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Layout>
    );
};
