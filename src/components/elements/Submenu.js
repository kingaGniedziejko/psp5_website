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

    render() {
        const {menuItem} = this.props;
        const {child_items} = menuItem;

        return (
            <ul className={"submenu"}>
                { child_items !== undefined ?
                    child_items.map((elem, index) => {
                        if (elem.object === "category") {
                            return (
                                <Link to={"/aktualnosci/" + elem.slug} key={index} onClick={this.handleItemClick}>
                                    <li className={"submenu-item"}>
                                        {elem.title}
                                    </li>
                                </Link>
                            )
                        } else {
                            return (
                                <Link to={elem.url} key={index} onClick={this.handleItemClick}>
                                    <li className={"submenu-item"}>
                                        {elem.title}
                                    </li>
                                </Link>
                            )
                        }
                    })
                    : ""
                }
            </ul> 
        );
    }
}

export default Submenu;