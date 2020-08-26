import React, {Component} from "react";
import {Link} from "react-router-dom";

// import axios from "axios";

export class Shortcuts extends Component {
    isValidUrl(string) {
        try {
            new URL(string);
        } catch (_) {
            return false;
        }
        return true;
    }

    render() {
        const {elements} = this.props;

        return (
            <div id={"shortcut"}>
                {elements.map((elem, index) => {
                    if (elem.type === "custom") {
                        if (this.isValidUrl(elem.url)) {
                            return (
                                <a href={elem.url} key={index} rel="noopener noreferrer" target="_blank">
                                    <div><h3>{elem.title}</h3></div>
                                </a>
                            )
                        } else {
                            return <Link to={elem.url} key={index}>
                                <div><h3>{elem.title}</h3></div>
                            </Link>;
                        }
                    }
                    if (elem.type === "post_type"){
                        return <Link to={new URL(elem.url).pathname} key={index}>
                            <div><h3>{elem.title}</h3></div>
                        </Link>;
                    }
                })}
            </div>
        );
    }

}

export default Shortcuts;