import React from "react";

export default function CText({ color, children }) {
    return <p style={{
        color: color
    }}>
        {children}
    </p>;
}