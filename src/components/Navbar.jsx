import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {


    return (
        <>
            <Nav
                style={{ padding: 20, backgroundColor: "#cbecd8", marginBottom: 10 }}
            >
                <h2 style={{ paddingLeft: 20, fontWeight: 800 }}>BANKING</h2>

            </Nav>

        </>
    )
}
