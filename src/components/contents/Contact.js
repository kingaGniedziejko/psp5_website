import React, {Component} from "react";
import MapContainer from "../elements/MapContainer";
import Spinner from "../elements/Spinner"
import {Link} from "react-router-dom";
import "../../styles/contact_style.css"
import axios from "axios";


export class Contact extends Component {
    state = {
        content: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages/contact"

        axios.get(contentUrl)
            .then(res => this.setState({
                content: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {

        if(this.state.isLoaded) {
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

                    <div>{this.state.content.text_1}</div>


                </div>
            );
        }
        return (
            <Spinner />
        );



    }
}

export default Contact;