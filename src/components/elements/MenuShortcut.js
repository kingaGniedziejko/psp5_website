import React, {Component} from "react";
import {Link} from "react-router-dom";
// import axios from "axios";

export class MenuShortcut extends Component {
    render() {
        return (
            <div id={"shortcut"}>
                <Link to={"/kontakt"}><div><h3>Kontakt</h3></div></Link>
                <Link to={"/rekrutacja"}><div><h3>Rekrutacja</h3></div></Link>
                <Link to={"/o-szkole/spacer-po-szkole"}><div><h3>Spacer po szkole</h3></div></Link>
                <Link to={"/uczen/kalendarz"}><div><h3>Kalendarz</h3></div></Link>
            </div>
        )
    }

}

export default MenuShortcut;