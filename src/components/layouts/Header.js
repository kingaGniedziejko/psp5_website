import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import "../../styles/header_style.css";
import "../../styles/menu_style.css";
import "../../styles/sidemenu_style.css";
import '../../config';
import WindowSizeListener from 'react-window-size-listener'
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
        isBurgerVisible: false,
        isFullMenuVisible: false,
        width: 0,
        isLoaded: false,
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        })
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

    onSearchClick() {
        let searchPhrase = document.getElementById("input").value;
        searchPhrase = searchPhrase.replace(/\s+/g, '+');

        this.props.history.push("/szukaj/" + searchPhrase);
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.onSearchClick();
        }
    }

    render() {
        const {menuItems} = this.props;
        const {isFullMenuVisible, isBurgerVisible, isLoaded} = this.state

        if(isLoaded) {

            return(
                <>
                    <WindowSizeListener onResize={windowSize => {
                        let update_width  = windowSize.windowWidth;
                        global.config.isMobile = update_width < 1130

                        if(update_width <= 1130) {
                            this.setState({
                                isFullMenuVisible: false
                            }, () => {
                                document.documentElement.style.setProperty('--nav-bar-height', `${this.navBar.current.clientHeight}px`);
                                this.setState({
                                    isBurgerVisible: true
                                })
                            })
                        } else if(update_width > 1130) {
                            document.documentElement.style.setProperty('--nav-bar-height', `${this.navBar.current.clientHeight}px`);
                            this.setState({
                                isBurgerVisible: false,
                                isFullMenuVisible: true
                            })
                        }

                        if(global.config.isMobile && this.state.isSideMenuOpen) {
                            this.toggleSideMenu();
                        }

                        this.setState({
                            width: update_width,
                        });
                    }}/>
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
                                        <input id={"input"} type={"search"} placeholder={"Szukaj..."} onKeyDown={this.handleKeyPress.bind(this)}/>
                                        <button className={"button-accent-2"} onClick={this.onSearchClick.bind(this)}> {this.state.width < 675 ? <IconArrow /> : "Szukaj"} </button>
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
                                    <div id={"school-name"}>
                                        <p>Publiczna Szkoła Podstawowa nr 5</p>
                                        <p>z Oddziałami Integracyjnymi</p>
                                        <p>im. Karola Musioła w Opolu</p>
                                    </div>
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
                                        isFullMenuVisible ?
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
                        isBurgerVisible ?
                            <Burger
                                isSideMenuOpen={this.state.isSideMenuOpen}
                                mutateSideMenu={this.toggleSideMenu}
                                menuItems={menuItems}
                                ref={this.burgerRef}
                            />
                            : ""
                    }
                </>
            );
        }
        return ""

    }
}

export default withRouter(Header);