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
                                                <a href={"https://www.facebook.com/psp5opole"} rel="noopener noreferrer"
                                                   target="_blank"><IconFacebook/></a>
                                                <IconYoutube/>
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