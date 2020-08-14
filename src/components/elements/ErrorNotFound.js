import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../../styles/error_style.css";

import {ReactComponent as ImageNotFound} from '../../images/404.svg';


export class ErrorNotFound extends Component {
    render() {
        return (
            <div className={"content"} id={"error"}>
                <ImageNotFound id={"error-image"}/>
                <h3>Nie znaleziono strony</h3>
                <Link to={"/"}><button className={"button-accent-2"}>Powrót do strony głównej</button></Link>
            </div>
        )
    }

}

export default ErrorNotFound;