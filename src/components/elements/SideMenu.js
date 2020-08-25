import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import ReactDOM from 'react-dom';
import Submenu from "./Submenu"

export class SideMenu extends Component {
    state = {
        isSideMenuOpen: false,
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
                                            <NavLink to={menuItem.url} activeClassName={"menu-item-active"} onClick={this.closeSideMenu}>
                                                {menuItem.title}
                                            </NavLink>
                                    }

                                    </div>
                                );
                            })
                        }
                </div>
            </div>
        </>
        );
    }
}

export default SideMenu;