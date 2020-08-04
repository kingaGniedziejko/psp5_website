import React, {Component} from "react";
import {Link} from "react-router-dom";

export class NotFoundPage extends Component {
    render() {
        return (
            <div className={"content"}>
                <h1>404</h1>
                <h2>Nie znaleziono strony</h2>
                <Link to={"/"}><button className={"button-accent-2"}>Strona główna</button></Link>
            </div>
        )
    }

}

export default NotFoundPage;