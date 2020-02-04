import React from 'react';
import Contact from "../Contact";
import email from "../../img/email.png";
import phone from "../../img/phone.png";
import whatsapp from "../../img/whatsapp.png";
import telegram from "../../img/telegram.png";
import './contactsList.css';

export default class ContactsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [
                { href: "mailto:juise2006@mail.ru", title: "Электронная почта", src: email, contact: "juise2006@mail.ru" },
                { href: "tel:+79040580581", title: "Мобильный телефон", src: phone, contact: "8 (904) 058-058-1" },
                { href: "https://wa.me/79040580581", title: "Контакт Whatsapp", src: whatsapp, contact: "8 (904) 058-058-1" },
                { href: "tg://resolve?domain=isgenius", title: "Контакт Telegram", src: telegram, contact: "8 (904) 058-058-1" },
            ],
        }
    }

    render() {
        return (
            <div>
                <h1>Контакты</h1>
                {
                    this.state.contacts.map( (contact, i) => {
                        return (
                            <p key = {i}>
                                <b>
                                    <Contact
                                        href = { contact.href }
                                        title = { contact.title }
                                        src = { contact.src }
                                        contact = { contact.contact }
                                    />
                                </b>
                            </p>
                        );
                    })
                }
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A61022b38cc29263f9cde60dc2a649faec0ab32f94ff5fcfa72f8a7e9e82582c5&amp;source=constructor"
                    width="100%" height="418" frameBorder="0"></iframe>
            </div>
        );
    }
}

