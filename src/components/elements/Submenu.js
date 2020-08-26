import React, {Component} from "react";
import {Link} from "react-router-dom";

export class Submenu extends Component {

    handleItemClick = event => {
        if(this.props.type === "fullscreen") {
            // TODO: close submenu on click
        } else if(this.props.type === "mobile"){
            this.props.closeSideMenu();
        }
    }

    isValidUrl(string) {
        try {
            new URL(string);
        } catch (_) {
            return false;
        }
        return true;
    }

    render() {
        const {menuItem} = this.props;
        const {child_items} = menuItem;

        return (
            <div className={"submenu"}>
                { child_items !== undefined ?
                    child_items.map((elem, index) => {
                        if (elem.object === "category") {
                            return (
                                <Link to={"/aktualnosci/" + elem.slug} key={index} onClick={this.handleItemClick} className={"submenu-item"}>
                                    {elem.title}
                                </Link>
                            )
                        }
                        else if(elem.object === "custom" && this.isValidUrl(elem.url)) {
                            return (
                                <a href={elem.url} key={index} rel="noopener noreferrer" target="_blank" onClick={this.handleItemClick} className={"submenu-item"}>
                                    {elem.title}
                                </a>
                            )
                        } else {
                            return (
                                // docelowo można wywalić tego ifa
                                <Link to={this.isValidUrl(elem.url) ? (new URL(elem.url).pathname) : elem.url} key={index} onClick={this.handleItemClick} className={"submenu-item"}>
                                    {elem.title}
                                </Link>
                            )
                        }
                    })
                    : ""
                }
            </div>
        );
    }
}

export default Submenu;