import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import Submenu from "./Submenu"
import {ReactComponent as IconHome} from '../../images/home.svg';
import {ReactComponent as IconSearch} from '../../images/search.svg';
import {isMobile} from 'react-device-detect';


export class Menu extends Component {
    isValidUrl(string) {
        try {
            new URL(string);
        } catch (_) {
            return false;
        }
        return true;
    }


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
                            <div key={index} className={"menu-item"}
                                 onMouseEnter={(e) => {if(!isMobile) e.target.classList.add("hovered")}}
                                 onMouseOut={(e) => {
                                     if (e.relatedTarget.closest('.hovered') === null && e.target.closest('.hovered') !== null)
                                         e.target.closest('.hovered').classList.remove("hovered");
                                     else return ""
                                 }}
                                 onClick={(e) => {
                                     e.preventDefault();
                                     console.log(e.target.classList);
                                     if(isMobile) {
                                         if (!e.target.classList.contains("submenu-item")) {
                                             let hovered = document.getElementsByClassName("hovered");
                                             if (hovered.length !== 0) hovered[0].classList.remove("hovered");
                                             e.currentTarget.classList.add("hovered");
                                         }
                                     }
                                 }}
                            >
                                {isMobile ?
                                    <NavLink to={menuItem.url} className='disabled-link' activeClassName={"menu-item-active"}>{menuItem.title}</NavLink>
                                    // <a href={""}>{menuItem.title}</a>
                                    :
                                    this.isValidUrl(menuItem.url) ?
                                        (new URL(menuItem.url).origin === global.config.proxy ?
                                            <NavLink to={new URL(menuItem.url).pathname} activeClassName={"menu-item-active"}>
                                                {menuItem.title}
                                            </NavLink>
                                            :
                                            <a href={menuItem.url} rel="noopener noreferrer" target="_blank">
                                                {menuItem.title}
                                            </a>
                                        )
                                        :
                                        <NavLink to={menuItem.url} activeClassName={"menu-item-active"}>
                                            {menuItem.title}
                                        </NavLink>
                                    }
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