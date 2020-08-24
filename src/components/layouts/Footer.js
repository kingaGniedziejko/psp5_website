import React from "react";
import "../../styles/footer_style.css"
import {ReactComponent as LogoBip } from '../../images/bip.svg';
import {ReactComponent as IconLogo} from "../../images/logo.svg";
import emblem from '../../images/emblem.png'
import {Link} from "react-router-dom";


export const Footer = () => (
    // "Footer"
    <div className={"footer"}>

        <div id={"top"}>
            <div className={"footer-container"}>
               <div id={"info"} className={"footer-column"}>
                    <div id={"showcase"}>
                        <IconLogo />

                        <div>
                            <p>Publiczna Szkoła Podstawowa nr 5</p>
                            <p>z Oddziałami Integracyjnymi</p>
                            <p>im. Karola Musioła w Opolu</p>
                        </div>
                    </div>

                   <h3>Kontakt</h3>
                   <div id={"contact"}>
                        <div id={"labels"}>
                            <p className={"contact-label"}>Adres:</p>
                            <p className={"contact-label"}>Telefon:</p>
                            <p className={"contact-label"}>Fax:</p>
                            <p className={"contact-label"}>Email:</p>
                            <p className={"contact-label"}>NIP:</p>
                        </div>

                        <div id={"data"}>
                            <p className={"contact-data"}><span className={"inline-label"}>(Adres) </span>ul. Majora Hubala 2, 45-267 Opole</p>
                            <p className={"contact-data"}><span className={"inline-label"}>(Tel) </span><a type={"tel"}>77 545 32 23</a>, <a type={"tel"}>77 545 32 24</a></p>
                            <p className={"contact-data"}><span className={"inline-label"}>(Fax) </span>77 40 30 850</p>
                            <p className={"contact-data"}><span className={"inline-label"}>(Mail) </span><a type={"email"}>psp5@psp5.opole.pl</a></p>
                            <p className={"contact-data"}><span className={"inline-label"}>(NIP) </span>754 315 63 13</p>
                        </div>
                   </div>
                   <h3>Inspektor Ochrony Danych Osobowych</h3>
                   <div id={"contact"}>
                       <div id={"data"}>
                           <p className={"contact-data"}>Agnieszka Halupczok</p>
                           <p className={"contact-data"}><a type={"email"}>iod@psp5.opole.pl</a></p>
                       </div>
                   </div>
                </div>

                <div id={"emblem"} className={"footer-column"}>
                    <img
                        src={emblem}
                        alt={"Godło"}
                    />
                </div>

                <div id={"links"} className={"footer-column"}>
                    <h3>Linki</h3>
                    <div>
                        <p><Link to={"/kontakt"}>Kontakt</Link></p>
                        <p><a href="http://www.kuratorium.opole.pl/" rel="noopener noreferrer" target="_blank">Kuratorium Oświaty w Opolu</a></p>
                        <p><a href="https://www.gov.pl/web/edukacja" rel="noopener noreferrer" target="_blank">Ministerstwo Edukacji Narodowej</a></p>
                        <p><a href="https://poczta22688.domeny.host/" rel="noopener noreferrer" target="_blank">Poczta pracownicza</a></p>
                        <p><a href={global.config.proxy + "/wp-admin"} rel="noopener noreferrer" target="_blank">Administrator</a></p>
                        <p><a href="https://psp5-opole.ssdip.bip.gov.pl/" rel="noopener noreferrer" target="_blank">
                            <LogoBip />
                        </a></p>

                    </div>
                </div>

            </div>
        </div>

        <div id={"divider"}>

        </div>

        <div id="bottom">
            <div className={"footer-container"}>
                <p>© Publiczna Szkoła Podstawowa nr 5 w Opolu</p>

                <div id={"authors"} className={"footer-column"}>
                    <p>Designed by: K. Gniedziejko & I. Hupało</p>
                    <p>gniedziejko.kinga@gmail.com</p>
                    <p>iga.hupalo@gmail.com</p>
                </div>
            </div>
        </div>

    </div>

);
