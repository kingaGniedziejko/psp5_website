import React, {Component} from "react";
import {Link} from "react-router-dom";

export class Submenu extends Component {

    render() {
        const {menuItem} = this.props;
        const {child_items} = menuItem;

        return (
            <ul className={"submenu"}>
                { child_items !== undefined ?
                    child_items.map((elem, index) => {
                        return (
                            <Link to={elem.url} key={index}>
                                <li className={"submenu-item"}>
                                    {elem.title}
                                </li>
                            </Link>
                        )
                    })
                    : ""
                }
            </ul> 
        );
    }
}

export default Submenu;