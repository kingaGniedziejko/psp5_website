import React from "react";


export const Footer = () => (
    // "Footer"
    <div className={"footer"}>
        <div id={"top"}>
            <div id={"showcase"}>
                <img
                src={'images/logo-very-small.png'}
                alt={"Logo PSP 5"}
                />
                <div>
                    <p>Publiczna Szkoła Podstawowa nr 5</p>
                    <p>z Oddziałami Integracyjnymi</p>
                    <p>im. Karola Musioła w Opolu</p>
                </div>
            </div>
            <div id={"contact"}>
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
        <div id="bottom">
            <div>© Publiczna Szkoła Podstawowa nr 5 w Opolu</div>
            <div id={"authors"}>
                <p>Designed by: K. Gniedziejko & I. Hupało</p>
                <p>gniedziejko.kinga@gmail.com</p>
                <p>iga.hupalo@gmail.com</p>
            </div>
        </div>
    </div>
);
