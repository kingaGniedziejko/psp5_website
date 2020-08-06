import React, {Component} from "react";
import MapContainer from "../elements/MapContainer";
import {Link} from "react-router-dom";
import "../../styles/contact_style.css"


export class Contact extends Component {

    render() {
        return (
            <div className={"content"}>
                <div className={"section"}>
                    <div className={"photo"}>

                    </div>

                </div>

                <div className={"section"} id={"map"}>
                    <div className={"section-container"} id={"map"}>
                        <MapContainer />
                    </div>
                </div>


            </div>
        );
    }
}

export default Contact;