import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import ReactDOM from 'react-dom';
import Submenu from "./Submenu"
import {ReactComponent as IconContrast} from "../../images/contrast.svg";

export class SideMenu extends Component {
    state = {
        isSideMenuOpen: false,
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
        this.setState({
            isSideMenuOpen: this.props.isSideMenuOpen,
        })
        document.addEventListener('click', this.handleClickOutside, true);

        const details = document.querySelectorAll("details");

        details.forEach((targetDetail) => {
            targetDetail.addEventListener("click", () => {
                // Close all the details that are not targetDetail.
                details.forEach((detail) => {
                    if (detail !== targetDetail) {
                        detail.removeAttribute("open");
                    }
                });
            });
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);
        const burgerNode = ReactDOM.findDOMNode(this.props.burger.current)

        if ((!domNode || !domNode.contains(event.target)) && (!burgerNode || !burgerNode.contains(event.target))) {
            this.closeSideMenu()
        }
    }

    closeSideMenu = () => {
        this.setState({
            isSideMenuOpen: false
        }, () => {
            this.props.mutateSideMenu();
        })
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

    render() {

        const {menuItems} = this.props;

        return (
            <>
                <div id={"side-menu"} style={this.state.isSideMenuOpen ? {animationName: 'slide-in'} : {animationName: 'slide-out'}}>
                    <div id={"side-menu-container"}>
                        <div>
                            <NavLink to={"/"} exact activeClassName={"menu-item-active"} onClick={this.closeSideMenu} className={"side-menu-item"}>
                                <div>Strona główna</div>
                            </NavLink>
                        </div>

                        {
                            menuItems.map((menuItem, index) => {
                                const {child_items} = menuItem;
                                // var req = require('details-polyfill');
                                return (
                                    <div key={index} className={"side-menu-item"}>

                                    {
                                        child_items !== undefined ?
                                            <details>
                                                <summary>
                                                    {menuItem.title}
                                                </summary>
                                                <Submenu menuItem={menuItem} closeSideMenu={this.closeSideMenu} type={"mobile"} />
                                            </details>
                                            :
                                            <NavLink to={this.isValidUrl(menuItem.url) ? (new URL(menuItem.url).pathname) : menuItem.url} activeClassName={"menu-item-active"} onClick={this.closeSideMenu}>
                                                {menuItem.title}
                                            </NavLink>
                                    }

                                    </div>
                                );
                            })
                        }

                </div>
                    <div className={"accessibility-setting"}>
                        <div>
                            <p>Czcionka:</p>
                            <div>
                                <span onClick={this.increaseFont}>A+</span>
                                <span onClick={this.decreaseFont}>A-</span>
                            </div>

                        </div>
                        <div>
                            <p>Kontrast:</p>
                            <span onClick={this.toggleContrast}><IconContrast/></span>
                        </div>
                    </div>
            </div>
        </>
        );
    }
}

export default SideMenu;