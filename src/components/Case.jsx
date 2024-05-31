import React from "react";
import Navbar from "./Navbar";

export default function Case({ children }) {
    return (
        <div className="bg-gray-900 dark:bg-gray-900 ">
        <Navbar />
        <section>{children}</section>
        </div>
    );
}