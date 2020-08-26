import React, {Component} from "react";
import MapContainer from "../elements/MapContainer";
import Spinner from "../elements/Spinner"
import "../../styles/contact_style.css"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../elements/SectionImage";
import PageContent from "../elements/PageContent";


export class Contact extends Component {
    state = {
        title: "Kontakt",
        page: undefined,
        isLoaded: false
    }

    componentDidMount() {
        this.setState({
            page: this.props.page,
            isLoaded: true
        })
    }

    render() {
        const {isLoaded, page} = this.state

        if(isLoaded) {
            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <PageContent page={page} />

                    <div className={"section grey"} style={{paddingBottom: "0"}}>
                            <div className={"map-container"}>
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