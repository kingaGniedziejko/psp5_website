import React, {Component} from "react";
import {CSSTransition} from 'react-transition-group';
import "../../styles/header_style.css";
import "../../styles/menu_style.css";
import "../../styles/sidemenu_style.css";
import '../../config';

import Menu from "../elements/Menu";
import SideMenu from "../elements/SideMenu";
import Burger from "../elements/Burger";
import { ReactComponent as IconPhone } from '../../images/phone.svg';
import { ReactComponent as IconMail } from '../../images/mail.svg';
import { ReactComponent as IconFacebook } from '../../images/facebook.svg';
import { ReactComponent as IconYoutube } from '../../images/youtube.svg';
import { ReactComponent as IconSearch } from '../../images/search.svg';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ReactComponent as IconCross } from '../../images/cross.svg';
import { ReactComponent as IconArrow } from '../../images/arrow.svg';


export class Header extends Component {
    constructor(props) {
        super(props);
        this.burgerRef = React.createRef();
        this.navBar = React.createRef();
    }

    state = {
        isSideMenuOpen: false,
        isSearchBarOpen: false,
        width: 800,
    }

    toggleSideMenu = () => {
        this.setState({
            isSideMenuOpen: !this.state.isSideMenuOpen
        }, () => {
            if(!this.state.isSideMenuOpen && this.burgerRef.current.state.isSideMenuOpen) this.burgerRef.current.close();
        });
    }

    toggleSearchBar = () => {
        this.setState({
            isSearchBarOpen: !this.state.isSearchBarOpen
        });
    }

    updateDimensions() {
        let update_width  = window.innerWidth;
        global.config.isMobile = update_width < 1130
        if(global.config.isMobile && this.state.isSideMenuOpen) this.toggleSideMenu()
        document.documentElement.style.setProperty('--nav-bar-height', `${this.navBar.current.clientHeight}px`);
        this.setState({
            width: update_width,
        });
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        const { menuItems } = this.props;
        return(
            <>
            <div id={"header"}>
                <CSSTransition
                    in={this.state.isSearchBarOpen}
                    timeout={300}
                    classNames="search-bar-anim"
                    unmountOnExit
                >
                    <div id={"search-bar"}>
                        <div className={"container"}>
                            <div id={"spacer"}/>
                            <div id={"form"}>
                                <input id={"input"} type={"search"} placeholder={"Szukaj..."}/>
                                <button className={"button-accent-2"}> {this.state.width < 675 ? <IconArrow /> : "Szukaj"} </button>
                            </div>
                            <div id={"cross-container"}>
                                <div className="image-button" id={"cross"}>
                                    <IconCross onClick={this.toggleSearchBar}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
                <div id={"navigation-bar"} ref={this.navBar}>
                    <div className={"container"}>
                        <div id={"mobile-spacer"}/>
                        <div id={"showcase"}>
                            <a href={"/"}>
                                <Logo/>
                            </a>
                            <ul id={"school-name"}>
                                <li>Publiczna Szkoła Podstawowa nr 5</li>
                                <li>z Oddziałami Integracyjnymi</li>
                                <li>im. Karola Musioła w Opolu</li>
                            </ul>
                        </div>
                        <div id={"short-showcase"}>PSP nr 5</div>

                        <div id={"menu-container"}>
                            <div id={"ribbon"}>
                                <div id={"ribbon-contact"}>
                                    <div className={"ribbon-data"}>
                                        <IconPhone/>
                                        <a type={"tel"}>77 545 32 23</a>
                                    </div>

                                    <div className={"ribbon-data"}>
                                        <IconPhone/>
                                        <a type={"tel"}>77 545 32 24</a>
                                    </div>

                                    <div className={"ribbon-data"}>
                                        <IconMail/>
                                        <a type={"email"}>psp5@psp5.opole.pl</a>
                                    </div>
                                </div>

                                <div id={"ribbon-links"}>
                                    <a href={"https://www.facebook.com/psp5opole"} rel="noopener noreferrer"
                                       target="_blank"><IconFacebook className={"image-button"}/></a>
                                    <IconYoutube className={"image-button"}/>
                                </div>
                            </div>
                            {
                                this.state.width > 1130 ?
                                    <Menu menuItems={menuItems} mutateSearchBar={this.toggleSearchBar}/> : ""
                            }
                        </div>

                        <div id={"mobile-menu"}>
                            <IconSearch onClick={this.toggleSearchBar}/>
                            <div id={"burger-spacer"}/>

                        </div>
                    </div>
                </div>

            </div>

            <CSSTransition
                in={this.state.isSideMenuOpen}
                timeout={300}
                classNames="side-menu-anim"
                unmountOnExit
            >
                {
                    <SideMenu
                        menuItems={menuItems}
                        mutateSideMenu={this.toggleSideMenu}
                        isSideMenuOpen={this.state.isSideMenuOpen}
                        burger={this.burgerRef}
                    />
                }
            </CSSTransition>
                {
                    this.state.width <= 1130 ?
                        <Burger
                            isSideMenuOpen={this.state.isSideMenuOpen}
                            mutateSideMenu={this.toggleSideMenu}
                            menuItems={menuItems}
                            ref={this.burgerRef}
                        /> : ""
                }
        </>
        );
    }
}

export default Header;