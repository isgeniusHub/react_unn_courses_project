import React from 'react';
import "./preloader.css";

export default function Preloader(props) {
    return (
        <div>
            <div className="preloader-overlay"></div>
            <div className="preloader"></div>
        </div>
    );
}