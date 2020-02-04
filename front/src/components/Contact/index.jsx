import React from 'react';

export default function Contact(props) {
    return (
        <a  href={ props.href }  title={ props.title } >
            <img  src={ props.src }  className="icon"/>
            { props.contact }
        </a>
    );
}
