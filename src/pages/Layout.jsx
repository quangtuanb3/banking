import React from "react";
import { Navbar } from "../components/Navbar";
// import "./Layout.css";

// Importing all created components


// Pass the child props
export default function Layout({ children }) {
    return (
        <div>
            {/* Attaching all file components */}
            <Navbar />
            {children}
        </div>
    );
}