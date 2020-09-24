import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import "../../styles/header_style.css";
import "../../styles/menu_style.css";
import "../../styles/sidemenu_style.css";
import '../../config';
import WindowSizeListener from 'react-window-size-listener'
import Menu from "../elements/Menu";
import SideMenu from "../elements/SideMenu";
import Burger from "../elements/Burger";
import {ReactComponent as IconPhone} from '../../images/phone.svg';
import {ReactComponent as IconMail} from '../../images/mail.svg';
import {ReactComponent as IconFacebook} from '../../images/facebook.svg';
import {ReactComponent as IconYoutube} from '../../images/youtube.svg';
import {ReactComponent as IconSearch} from '../../images/search.svg';
import {ReactComponent as Logo} from '../../images/logo.svg';
import {ReactComponent as IconCross} from '../../images/cross.svg';
import {ReactComponent as IconArrow} from '../../images/arrow.svg';
import {ReactComponent as IconContrast} from '../../images/contrast.svg';


import ReactDOM from "react-dom";


export class Header extends Component {
    constructor(props) {
        super(props);
        this.burgerRef = React.createRef();
        this.navBar = React.createRef();
        this.searchbar = React.createRef();
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
        }, () => {
            if(this.state.isSearchBarOpen)
                document.addEventListener('click', this.handleClickOutsideSearchBar, true);
        });
    }

    wiggle() {
        let form = document.getElementById("input")
        form.classList.add("wiggling")
        setTimeout(() => { form.classList.remove("wiggling")}, 500);
    }

    onSearchClick() {
        let searchPhrase = document.getElementById("input").value;

        if(searchPhrase === "") {
            this.wiggle()
            return
        }

        this.toggleSearchBar()
        searchPhrase = searchPhrase.replace(/\s+/g, '+');
        this.props.history.push("/szukaj/" + searchPhrase);
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.onSearchClick();
        }
    }

    handleClickOutsideSearchBar = event => {
        const domNode = ReactDOM.findDOMNode(this);
        const searchBar = ReactDOM.findDOMNode(this.searchbar.current)

        console.log(event.target)

        if(this.state.isSearchBarOpen)
            if((domNode && !domNode.contains(event.target)) || (searchBar && !searchBar.contains(event.target))) {
                this.toggleSearchBar()
            }
    }

    toggleContrast = event => {
        global.config.isContrasted = !global.config.isContrasted
        if(global.config.isContrasted) {
            this.setContrastedColors()
        }
        else {
            this.setStandardColors()
        }
    }

    setContrastedColors() {
        document.documentElement.style.setProperty('--white-1', 'black');
        document.documentElement.style.setProperty('--white-2', 'black');
        document.documentElement.style.setProperty('--font-dark', 'white');
        document.documentElement.style.setProperty('--accent-1', 'yellow');
        document.documentElement.style.setProperty('--accent-1-light', 'yellow');
        document.documentElement.style.setProperty('--accent-1-extra-light', 'black');
        document.documentElement.style.setProperty('--accent-2', 'black');
        document.documentElement.style.setProperty('--accent-2-light', 'black');
        document.documentElement.style.setProperty('--accent-2-lighter', 'black');
        document.documentElement.style.setProperty('--accent-2-faded', 'black');
        document.documentElement.style.setProperty('--accent-2-lightly-faded', 'black');
        document.documentElement.style.setProperty('--accent-3-light', 'black');
    }

    setStandardColors() {
        document.documentElement.style.setProperty('--white-1', 'rgb(246, 246, 246)');
        document.documentElement.style.setProperty('--white-2', 'rgb(242, 242, 242)');
        document.documentElement.style.setProperty('--font-dark', 'rgb(19, 15, 83)');
        document.documentElement.style.setProperty('--accent-1', 'rgb(65, 111, 216)');
        document.documentElement.style.setProperty('--accent-1-light', 'rgb(122, 158, 239)');
        document.documentElement.style.setProperty('--accent-1-extra-light', 'rgb(195, 215, 252)');
        document.documentElement.style.setProperty('--accent-2', 'rgb(238, 204, 35)');
        document.documentElement.style.setProperty('--accent-2-light', 'rgb(241, 218, 105)');
        document.documentElement.style.setProperty('--accent-2-lighter', 'rgb(238, 225, 160)');
        document.documentElement.style.setProperty('--accent-2-faded', 'rgba(238, 204, 35, 0.38)');
        document.documentElement.style.setProperty('--accent-2-lightly-faded', 'rgba(238, 204, 35, 0.53)');
        document.documentElement.style.setProperty('--accent-3-light', 'rgba(232, 232, 232, 1.0)');
    }

    increaseFont = (event) => {
        var body = document.getElementsByTagName('body')[0];
        var style = window.getComputedStyle(body, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        body.style.fontSize = (fontSize + 1) + 'px';
    }

    decreaseFont = (event) => {
        var body = document.getElementsByTagName('body')[0];
        var style = window.getComputedStyle(body, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        body.style.fontSize = (fontSize - 1) + 'px';
    }


    render() {
        const {menuItems} = this.props;
        const {isFullMenuVisible, isBurgerVisible, isSideMenuOpen, isLoaded} = this.state

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
                            if(isSideMenuOpen) this.toggleSideMenu()
                            this.setState({
                                isFullMenuVisible: true,
                                isBurgerVisible: false,
                            })
                            document.documentElement.style.setProperty('--nav-bar-height', `${this.navBar.current.clientHeight}px`);
                        }

                        this.setState({
                            width: update_width,
                        });
                    }}/>
                    <header>
                        <CSSTransition
                            in={this.state.isSearchBarOpen}
                            timeout={300}
                            classNames="search-bar-anim"
                            unmountOnExit
                        >
                            <div id={"search-bar"} ref={this.searchbar}>
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
                                <div id={"showcase"}>
                                    <a href={"/"}>
                                        <Logo/>
                                    </a>
                                    <div>
                                        <p>Publiczna Szkoła Podstawowa nr 5</p>
                                        <p>z Oddziałami Integracyjnymi</p>
                                        <p>im. Karola Musioła w Opolu</p>
                                    </div>
                                </div>
                                {
                                    isFullMenuVisible ?
                                    <div id={"menu-container"}>
                                        <div id={"ribbon"}>
                                            <div>
                                                <div>
                                                    <IconPhone/>
                                                    <a type={"tel"} href={"tel: 77 545 32 23"}>77 545 32 23</a>
                                                </div>

                                                <div>
                                                    <IconPhone/>
                                                    <a type={"tel"} href={"tel: 77 545 32 24"}>77 545 32 24</a>
                                                </div>

                                                <div>
                                                    <IconMail/>
                                                    <a type={"email"} href={"mailto: psp5@psp5.opole.pl"}>psp5@psp5.opole.pl</a>
                                                </div>

                                            </div>
                                            <div>
                                                <div className={"accessibility-setting"}>
                                                    <p>Czcionka:</p>
                                                    <span onClick={this.increaseFont}>A+</span>
                                                    <span onClick={this.decreaseFont}>A-</span>
                                                </div>
                                                <div className={"accessibility-setting"}>
                                                    <p>Kontrast:</p>
                                                    <span onClick={this.toggleContrast}><IconContrast/></span>
                                                </div>
                                            </div>

                                            <div>
                                                <a href={"https://www.facebook.com/psp5opole"} rel="noopener noreferrer"
                                                   target="_blank"><IconFacebook/></a>

                                                <a href={"https://www.youtube.com/channel/UCRiApte7czAngxIDo3jPFAQ/featured?disable_polymer=1"} rel="noopener noreferrer"
                                                   target="_blank"><IconYoutube/></a>
                                            </div>
                                        </div>

                                        <Menu menuItems={menuItems} mutateSearchBar={this.toggleSearchBar}/>
                                    </div> : ""
                                }
                                {
                                    isBurgerVisible ?
                                        <div id={"mobile-menu"}>
                                            <IconSearch onClick={this.toggleSearchBar}/>
                                            <div id={"burger-spacer"}/>
                                        </div>
                                    : ""
                                }
                            </div>
                        </div>

                    </header>

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