import React, {Component} from "react";
import MapContainer from "../elements/MapContainer";
import Spinner from "../elements/Spinner"
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
            const logo = sections[0].images[1].image

            const hAddress = sections[0].modules[0].header
            const tAddress = sections[0].modules[0].text

            const hData = sections[0].modules[1].header
            const tData = sections[0].modules[1].text
            const hMembers = sections[0].lonely_headers[0].text

            const members = this.state.content.members

            var key = 0;
            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <div className={"section"}>
                        <SectionImage image={photo}/>

                        <div className={"section-container multicolumn"}>
                            <div>
                                <h1 dangerouslySetInnerHTML={{__html: hMembers}}/>
                                <table className={"no-border-table"}>
                                    <tbody>
                                    {
                                        members.map(member => {return <tr key={key++}><td><strong>{member.position}</strong></td><td>{member.name}</td></tr>})
                                    }
                                    </tbody>

                                </table>
                                <h1 dangerouslySetInnerHTML={{__html: hData}}/>
                                <div dangerouslySetInnerHTML={{__html: tData}} className={"text-content"}/>
                            </div>
                            <div>
                                <h1 dangerouslySetInnerHTML={{__html: hAddress}}/>
                                <div dangerouslySetInnerHTML={{__html: tAddress}} className={"text-content grid"}/>

                            </div>


                        </div>


                    </div>
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