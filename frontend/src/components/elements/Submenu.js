import React, {Component} from "react";
import {Link} from "react-router-dom";

export class Submenu extends Component {

    render() {
        const {barItem} = this.props;
        const {child_items} = barItem;

        console.log(child_items);
        return (
            <ul className={"submenu"}>
                { child_items !== undefined ?
                    child_items.map(elem => {
                        return (
                            <Link to={elem.url}>
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