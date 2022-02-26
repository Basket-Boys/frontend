import React from "react";

export default function CText({ color, children }) {
    return <p style={{
        display: 'flex',
        marginBlock: 0,
        color: color
    }}>
        {children}
    </p>;
}