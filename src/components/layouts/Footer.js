import React, {Component} from "react";
import "../../styles/footer_style.css"
import {ReactComponent as LogoBip} from '../../images/bip.svg';
import {ReactComponent as IconLogo} from "../../images/logo.svg";
import emblem from '../../images/emblem.png'
import {Link} from "react-router-dom";
import axios from "axios";

export class Footer extends Component {
    state = {
        footerMenuItems: [],
        isLoaded: false
    }

    isValidUrl(string) {
        try {
            new URL(string);
        } catch (_) {
            return false;
        }
        return true;
    }

    componentDidMount() {
        axios.get(global.config.proxy + "/wp-json/menus/v1/menus/stopka")
            .then(res => {
                this.setState({
                    footerMenuItems: res.data.items,
                    isLoaded: true
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        const {footerMenuItems} = this.state
        return (
                <footer>
                    <div id={"top"}>
                        <div className={"footer-container"}>
                            <div>
                                <div id={"showcase"}>
                                    <IconLogo />

                                    <div>
                                        <p>Publiczna Szkoła Podstawowa nr 5</p>
                                        <p>z Oddziałami Integracyjnymi</p>
                                        <p>im. Karola Musioła w Opolu</p>
                                    </div>
                                </div>

                                <h3>Kontakt</h3>
                                <div className={"contact"}>
                                    <div id={"labels"}>
                                        <p>Adres:</p>
                                        <p>Telefon:</p>
                                        <p>Fax:</p>
                                        <p>Email:</p>
                                        <p>NIP:</p>
                                    </div>

                                    <div>
                                        <p><span>(Adres) </span>ul. Majora Hubala 2, 45-267 Opole</p>
                                        <p><span>(Tel) </span><a type={"tel"} href={"tel: 77 545 32 23"}>77 545 32 23</a>, <a type={"tel"} href={"tel: 77 545 32 24"}>77 545 32 24</a></p>
                                        <p><span>(Fax) </span>77 40 30 850</p>
                                        <p><span>(Mail) </span><a  href={"mailto: psp5@psp5.opole.pl"} type={"email"}>psp5@psp5.opole.pl</a></p>
                                        <p><span>(NIP) </span>754 315 63 13</p>
                                    </div>
                                </div>
                                <h3>Inspektor Ochrony Danych Osobowych</h3>
                                <div className={"contact"}>
                                    <div>
                                        <p>Agnieszka Halupczok</p>
                                        <a href={"mailto: iod@psp5.opole.pl"} type={"email"}>iod@psp5.opole.pl</a>
                                    </div>
                                </div>
                            </div>

                            <div id={"emblem"}>
                                <img
                                    src={emblem}
                                    alt={"Godło"}
                                />
                            </div>

                            <div id={"links"}>
                                <h3>Linki</h3>
                                <div>
                                    {
                                        footerMenuItems.map((item, index) => {
                                            if (this.isValidUrl(item.url)) {
                                                return (
                                                    <p key={index}><a href={item.url} rel="noopener noreferrer" target="_blank" dangerouslySetInnerHTML={{__html: item.title}}/></p>
                                                )
                                            }
                                            return (
                                                <p key={index}><Link to={item.url} rel="noopener noreferrer" target="_blank" dangerouslySetInnerHTML={{__html: item.title}}/></p>
                                            )
                                        })
                                    }
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

                            <div id={"authors"}>
                                <p>Designed by: K. Gniedziejko & I. Hupało</p>
                                <p><a href={"mailto: gniedziejko.kinga@gmail.com"}>gniedziejko.kinga@gmail.com</a></p>
                                <p><a href={"mailto: iga.hupalo@gmail.com"}>iga.hupalo@gmail.com</a></p>
                            </div>
                        </div>
                    </div>

                </footer>
            )
    }
}

export default Footer;