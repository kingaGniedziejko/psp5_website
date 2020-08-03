import React from "react";
import "../../styles/footer_style.css"
import {ReactComponent as LogoBip } from '../../images/bip.svg';
import {ReactComponent as IconLogo} from "../../images/logo.svg";


export const Footer = () => (
    // "Footer"
    <div className={"footer"}>

        <div id={"top"}>
            <div className={"footer-container"}>
               <div id={"info"} className={"footer-column"}>
                    <div id={"showcase"}>
                        <IconLogo />

                        <ul>
                            <li>Publiczna Szkoła Podstawowa nr 5</li>
                            <li>z Oddziałami Integracyjnymi</li>
                            <li>im. Karola Musioła w Opolu</li>
                        </ul>
                    </div>

                   <h3>Kontakt</h3>
                   <div id={"contact"}>


                        <ul id={"labels"}>
                            <li className={"contact-label"}>Adres:</li>
                            <li className={"contact-label"}>Telefon:</li>
                            <li className={"contact-label"}>Fax:</li>
                            <li className={"contact-label"}>Email:</li>
                            <li className={"contact-label"}>NIP:</li>
                        </ul>

                        <ul id={"data"}>
                            <li className={"contact-data"}><a className={"inline-label"}>(Adres) </a>ul. Majora Hubala 2, 45-267 Opole</li>
                            <li className={"contact-data"}><a className={"inline-label"}>(Tel) </a><a type={"tel"}>77 545 32 23</a>, <a type={"tel"}>77 545 32 24</a></li>
                            <li className={"contact-data"}><a className={"inline-label"}>(Fax) </a>77 40 30 850</li>
                            <li className={"contact-data"}><a className={"inline-label"}>(Mail) </a><a type={"email"}>psp5@psp5.opole.pl</a></li>
                            <li className={"contact-data"}><a className={"inline-label"}>(NIP) </a>754 315 63 13</li>
                        </ul>
                   </div>

                </div>

                <div id={"emblem"} className={"footer-column"}>
                    <img
                        src={'../../images/emblem.png'}
                        alt={"Godło"}
                    />
                </div>

                <div id={"links"} className={"footer-column"}>
                    <h3>Linki</h3>
                    <ul>
                        <li><a href="" target="_blank">Kontakt</a></li>
                        <li><a href="http://www.kuratorium.opole.pl/" rel="noopener noreferrer" target="_blank">Kuratorium Oświaty w Opolu</a></li>
                        <li><a href="https://www.gov.pl/web/edukacja" rel="noopener noreferrer" target="_blank">Ministerstwo Edukacji Narodowej</a></li>
                        <li><a href="https://poczta22688.domeny.host/" rel="noopener noreferrer" target="_blank">Poczta pracownicza</a></li>
                        <li><a href="" rel="noopener noreferrer" target="_blank">Administrator</a></li>
                        <li><a href="https://psp5-opole.ssdip.bip.gov.pl/" rel="noopener noreferrer" target="_blank">
                            <LogoBip />
                        </a></li>

                    </ul>
                </div>

            </div>
        </div>

        <div id={"divider"}>

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
