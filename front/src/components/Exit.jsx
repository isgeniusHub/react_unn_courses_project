import React from 'react';
import Preloader from "./Preloader";
import { Redirect } from "react-router-dom";
/*
* висит после регистрации если выходить
*
* */
export default function Exit (props) {
    props.onExit();

    return (
        <div>
            <Preloader />
            <Redirect to="/login" />
        </div>
    );
}

