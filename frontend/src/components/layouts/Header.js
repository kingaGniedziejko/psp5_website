import React from "react";
import "../../styles/header_style.css";
// import { ReactComponent as IconPhone } from '%PUBLIC_URL%/phone.svg';

import {Button} from "../elements/Button"

export const Header = () => (
    //"Header"
    <div className={"header"}>
        <div className={"header-container"}>
            <div id={"showcase"}>
                <img
                    src={'images/logo-very-small.png'}
                    alt={"Logo PSP 5"}
                />
                <ul id={"school-name"}>
                    <li>Publiczna Szkoła Podstawowa nr 5</li>
                    <li>z Oddziałami Integracyjnymi</li>
                    <li>im. Karola Musioła w Opolu</li>
                </ul>
            </div>
        </div>
        <div id={"ribbon"}>
            <div id={"ribbon-contact"}>
                <div className={"ribbon-data"}>
                    <img
                        src={'images/phone.png'}
                        alt={"Tel"}
                    />
                    <a type={"tel"}>77 545 32 23</a>
                </div>

                <div className={"ribbon-data"}>
                    <img
                        src={'images/phone.png'}
                        alt={"Tel"}
                    />
                    <a type={"tel"}>77 545 32 24</a>
                </div>

                <div className={"ribbon-data"}>
                    <img
                        src={'images/mail.png'}
                        alt={"Mail"}
                    />
                    <a type={"email"}>psp5@psp5.opole.pl</a>
                </div>

            </div>
        </div>

    </div>


    // <Button text={"Więcej"}/>
);