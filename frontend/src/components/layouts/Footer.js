import React from "react";
import "../../styles/footer_style.css"

export const Footer = () => (
    // "Footer"
    <div className={"footer"}>

        <div id={"top"}>
            <div className={"footer-container"}>
                <div id={"showcase"} className={"footer-column"}>
                    <img
                    src={'images/logo-very-small.png'}
                    alt={"Logo PSP 5"}
                    />
                    <ul>
                        <li>Publiczna Szkoła Podstawowa nr 5</li>
                        <li>z Oddziałami Integracyjnymi</li>
                        <li>im. Karola Musioła w Opolu</li>
                    </ul>
                </div>

                <div id={"emblem"} className={"footer-column"}>
                    <img
                        src={'images/emblem.png'}
                        alt={"Godło"}
                    />
                </div>

                <div id={"contact"} className={"footer-column"}>
                    <div className={"contact-label"}>Adres:</div>
                    <div className={"contact-data"}>ul. Majora Hubala 2, 45-267 Opole</div>
                    <div className={"contact-label"}>Telefon:</div>
                    <div className={"contact-data"}>77 545 32 23, 77 545 32 24</div>
                    <div className={"contact-label"}>Fax:</div>
                    <div className={"contact-data"}>77 40 30 850</div>
                    <div className={"contact-label"}>Email:</div>
                    <div className={"contact-data"}>psp5@psp5.opole.pl</div>
                    <div className={"contact-label"}>NIP:</div>
                    <div className={"contact-data"}>754 315 63 13</div>
                </div>
            </div>
        </div>

        <div id="bottom">
            <div className={"footer-container"}>
                <div id={"copyright"} className={"footer-column"}>
                    <p>© Publiczna Szkoła Podstawowa nr 5 w Opolu</p>
                </div>

                <ul id={"authors"} className={"footer-column"}>
                    <li>Designed by: K. Gniedziejko & I. Hupało</li>
                    <li className={"email"}>gniedziejko.kinga@gmail.com</li>
                    <li className={"email"}>iga.hupalo@gmail.com</li>
                </ul>
            </div>
        </div>

    </div>

);
