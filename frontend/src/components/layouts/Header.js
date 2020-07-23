import React from "react";
import "../../styles/header_style.css";
import { ReactComponent as IconPhone } from '../../images/phone.svg';
import { ReactComponent as IconMail } from '../../images/mail.svg';
import { ReactComponent as IconFacebook } from '../../images/facebook.svg';
import { ReactComponent as IconYoutube } from '../../images/youtube.svg';
import { ReactComponent as IconMenu } from '../../images/menu.svg';
import { ReactComponent as IconSearch } from '../../images/search.svg';

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

            <div id={"short-showcase"}>Publiczna Szkoła Podstawowa nr 5</div>

            <div id={"ribbon"}>
                <div id={"ribbon-contact"}>
                    <div className={"ribbon-data"}>
                        <IconPhone />
                        <a type={"tel"}>77 545 32 23</a>
                    </div>

                    <div className={"ribbon-data"}>
                        <IconPhone />
                        <a type={"tel"}>77 545 32 24</a>
                    </div>

                    <div className={"ribbon-data"}>
                        <IconMail />
                        <a type={"email"}>psp5@psp5.opole.pl</a>
                    </div>
                </div>

                <div id={"ribbon-links"}>
                    <a href={"https://www.facebook.com/psp5opole"} rel="noopener noreferrer" target="_blank"><IconFacebook className={"image-button"}/></a>
                    <IconYoutube className={"image-button"}/>
                </div>
            </div>

            <div id={"mobile-menu"}>
                <IconSearch />
                <IconMenu />
            </div>
        </div>

        <div id={"navigation"}>
        </div>
    </div>
);