import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import ReactDOM from 'react-dom';
import Submenu from "./Submenu"
import {CSSTransition} from 'react-transition-group';

export class SideMenu extends Component {
    state = {
        open: false
    }
    componentDidMount() {
        this.setState({
            open: this.props.open
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
        if (!domNode || !domNode.contains(event.target)) {
            this.closeSideMenu()
        }
    }

    closeSideMenu = event => {
        this.setState({
            open: false
        })
        this.props.mutateState(false);
    }

    render() {

        const {menuItems} = this.props;

        return (
            <>
                <ul id={"side-menu"} style={this.state.open ? {animationName: 'slide-in'} : {animationName: 'slide-out'}}>
                    <div id={"side-menu-container"}>
                        <div>
                            <li className={"side-menu-item"} >
                                <NavLink to={"/"} exact activeClassName={"menu-item-active"} onClick={this.closeSideMenu}>
                                    <div>Strona główna</div>
                                </NavLink>
                            </li>
                        </div>

                        {
                            menuItems.map((menuItem, index) => {
                                const {child_items} = menuItem;
                                // var req = require('details-polyfill');
                                return (
                                    <div key={index}>
                                        <li className={"side-menu-item"}>
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
                                        </li>
                                    </div>
                                );
                            })
                        }
                </div>
            </ul>
        </>
        );
    }
}

export default SideMenu;