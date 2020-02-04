import React from 'react';

export default function AlreadyLogged (props) {
    return (
        <div>
            <p>Вы уже авторизованы</p>
            <button onClick = { props.onExit }>Выйти</button>
        </div>
    );
}
