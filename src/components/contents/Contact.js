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
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=contact"
        //TODO: lepsze zabezpieczenie tego

        axios.get(contentUrl)
            .then(res => this.setState({
                content: res.data[0].acf,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const photo1 = this.state.content.photo_1 !== undefined ? this.state.content.photo_1 : "";
        const hAdres = this.state.content.header_1 !== undefined ? this.state.content.header_1 : "";
        const tAdres = this.state.content.text_1 !== undefined ? this.state.content.text_1 : "";

        console.log(this.props.path)
        if(this.state.isLoaded) {
            return (
                <div className={"content"}>
                    <div className={"section"}>
                        <div className={"photo-static"} style={{backgroundImage: `url(${photo1})`}}/>

                        <div className={"section-container"} id={""}>
                            <div dangerouslySetInnerHTML={{__html: tAdres}}/>
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
        return (
            <Spinner />
        );
    }
}

export default Contact;