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
                            <div key={index}>
                                <li className={"menu-item"}>
                                    <NavLink to={menuItem.url} activeClassName={"menu-item-active"}>
                                        <div>{menuItem.title}</div>
                                    </NavLink>
                                    <Submenu menuItem={menuItem} type={"fullscreen"} />
                                </li>
                            </div>

                        );
                    })
                }

                <a href={"#"} onClick={this.props.mutateSearchBar}>
                    <li className={"menu-item"}>
                        <div><IconSearch /></div>
                    </li>
                </a>
            </ul>
        );
    }
}

export default Menu;