import React, {Component} from "react";
import {Link} from "react-router-dom";
// import axios from "axios";

export class Shortcuts extends Component {
    render() {
        const {elements} = this.props;

        return (
            <div id={"shortcut"}>
                {elements.map((elem, index) => {
                    return <Link to={elem.path} key={index}><div><h3>{elem.title}</h3></div></Link>;
                })}
            </div>
        );
    }

}

export default Shortcuts;