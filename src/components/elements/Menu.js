import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import Submenu from "./Submenu"
import { ReactComponent as IconHome } from '../../images/home.svg';
import { ReactComponent as IconSearch } from '../../images/search.svg';

export class Menu extends Component {

    render() {
        const {menuItems} = this.props;

        return (
            <ul id={"menu"}>
                <NavLink to={"/"} exact activeClassName={"menu-item-active"}>
                    <li className={"menu-item"} >
                        <div><IconHome /></div>
                    </li>
                </NavLink>

                {
                    menuItems.map((menuItem, index) => {
                        return (
                            <NavLink to={menuItem.url} activeClassName={"menu-item-active"} key={index}>
                                <li className={"menu-item"}>
                                    <div>{menuItem.title}</div>
                                    <Submenu key={index} menuItem={menuItem} />
                                </li>
                            </NavLink>
                        );
                    })
                }

                <a href={"#"} onClick={console.log("search")}>
                    <li className={"menu-item"}>
                        <div><IconSearch /></div>
                    </li>
                </a>
            </ul>
        );
    }
}

export default Menu;