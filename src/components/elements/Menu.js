import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";

import Submenu from "./Submenu"
import { ReactComponent as IconHome } from '../../images/home.svg';
import { ReactComponent as IconSearch } from '../../images/search.svg';

export class Menu extends Component {

    render() {
        const {menuItems} = this.props;

        return (
            <div id={"menu"}>
                <NavLink to={""} exact activeClassName={"menu-item-active"} className={"image-button menu-item"}>
                    <IconHome />
                </NavLink>

                {
                    menuItems.map((menuItem, index) => {
                        return (
                            <div key={index} className={"menu-item"}>
                                <NavLink to={menuItem.url} activeClassName={"menu-item-active"}>
                                    {menuItem.title}
                                </NavLink>
                                <Submenu menuItem={menuItem} type={"fullscreen"} />
                            </div>
                        );
                    })
                }

                <div className="image-button menu-item" onClick={this.props.mutateSearchBar}>
                    <IconSearch />
                </div>
            </div>
        );
    }
}

export default Menu;