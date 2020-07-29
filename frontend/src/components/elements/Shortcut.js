import React, {Component} from "react";
// import axios from "axios";

export class Shortcut extends Component {
    render() {
        return (
            <div id={"shortcut"}>
                <a href={"_"}><div><h3>Kontakt</h3></div></a>
                <a href={"_"}><div><h3>Rekrutacja</h3></div></a>
                <a href={"_"}><div><h3>Spacer po szkole</h3></div></a>
                <a href={"_"}><div><h3>Kalendarz</h3></div></a>
            </div>
        )
    }

}

export default Shortcut;