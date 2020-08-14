import React, {Component} from "react";
import MapContainer from "../elements/MapContainer";
import Spinner from "../elements/Spinner"
import {Link} from "react-router-dom";
import "../../styles/contact_style.css"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../elements/SectionImage";


export class Contact extends Component {
    state = {
        title: "Kontakt",
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

        if(this.state.isLoaded) {
            const sections = this.state.content.sections

            const photo = sections[0].images[0].image

            const hAddress = sections[0].modules[0].header
            const tAddress = sections[0].modules[0].text

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <div className={"section"}>
                        <SectionImage image={photo}/>

                        <div className={"section-container"} id={""}>
                            <div dangerouslySetInnerHTML={{__html: tAddress}}/>
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