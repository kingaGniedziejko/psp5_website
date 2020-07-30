import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import { Transition } from 'react-transition-group'


import Submenu from "./Submenu"
import { ReactComponent as IconHome } from '../../images/home.svg';
import { ReactComponent as IconSearch } from '../../images/search.svg';

const duration = 1000

const sidebarStyle = {
    transition: `width ${duration}ms`
}
const sidebarTransitionStyles = {
    entering: { width: 0 },
    entered: { width: '70%' },
    exiting: { width: '70%' },
    exited: { width: 0 }
}
// const linkStyle = {
//     transition: `opacity ${duration}ms`
// }
// const linkTransitionStyles = {
//     entering: {opacity: 0},
//     entered: {opacity: 1},
//     exiting: {opacity: 1},
//     exited: {opacity: 0}
// }

export class SideMenu extends Component {

    render() {

        const {menuItems} = this.props;

        return (
            <Transition in={this.props.open} timeout={duration}>
            <ul id={"side-menu"} style={{
                ...sidebarStyle,
                ...sidebarTransitionStyles[this.props.open]
            }}>
                <div>
                    <li className={"side-menu-item"} >
                        <NavLink to={"/"} exact activeClassName={"menu-item-active"}>
                            <div>Strona główna</div>
                        </NavLink>
                    </li>
                </div>

                {
                    menuItems.map((menuItem, index) => {
                        return (
                            <div key={index}>
                                <li className={"side-menu-item"}>
                                    <NavLink to={menuItem.url} activeClassName={"menu-item-active"}>
                                        <div>{menuItem.title}</div>
                                    </NavLink>
                                    <Submenu menuItem={menuItem}/>
                                </li>
                            </div>
                        );
                    })
                }
            </ul>
            </Transition>
        );
    }
}

export default SideMenu;