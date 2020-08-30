import React, {Component} from "react";
import {NavLink, Link} from "react-router-dom";

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
                                     if (!isMobile && e.relatedTarget.closest('.hovered') === null && e.target.closest('.hovered') !== null)
                                         e.target.closest('.hovered').classList.remove("hovered");
                                     else return ""
                                 }}
                                 onClick={(e) => {
                                     let hovered = document.getElementsByClassName("hovered")
                                     if(hovered.length !== 0) hovered[0].classList.remove("hovered")
                                     if(isMobile) e.target.classList.add("hovered")
                                 }}>

                                {
                                    isMobile ?
                                        <a onClick={(e) => {
                                            if (isMobile) e.target.closest('.menu-item').classList.add("hovered")
                                        }}>
                                            {menuItem.title}
                                        </a>
                                        :
                                        <Link to={this.isValidUrl(menuItem.url) ? (new URL(menuItem.url).pathname) : menuItem.url} activeClassName={"menu-item-active"}>
                                            {menuItem.title}
                                        </Link>
                                }
                                <Submenu menuItem={menuItem} type={"fullscreen"} index={index}/>
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