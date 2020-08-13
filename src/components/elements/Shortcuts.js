import React, {Component} from "react";
import {Link} from "react-router-dom";
// import axios from "axios";

export class Shortcuts extends Component {
    render() {
        const {elements} = this.props;

        return (
            <div id={"shortcut"}>
                {elements.map((elem, index) => {
                    if (elem.type === "outside_link"){
                        return (
                            <a href={elem.path} key={index} rel="noopener noreferrer" target="_blank">
                                <div><h3>{elem.title}</h3></div>
                            </a>
                        )
                    } else {
                        return <Link to={elem.path} key={index}><div><h3>{elem.title}</h3></div></Link>;
                    }
                })}
            </div>
        );
    }

}

export default Shortcuts;