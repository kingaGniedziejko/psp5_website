import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"

import "../../../styles/library_style.css"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../../elements/SectionImage";


export class Library extends Component {
    state = {
        title: "Biblioteka",
        content: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=library"
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

            const photo1 = sections[0].images[0].image
            const photo2 = sections[1].images[0].image
            const regulations = sections[1].attachments

            // opis biblioteki szkolnej
            const hLibrary = sections[0].modules[0].header
            const tLibrary = sections[0].modules[0].text

            // godziny otwarcia
            const hHours = sections[1].modules[0].header
            const tHours = sections[1].modules[0].text

            // nauczyciele bibliotekarze
            const hTeachers = sections[1].modules[1].header
            const tTeachers = sections[1].modules[1].text

            // regulaminy
            const hRegulations = sections[1].modules[2].header

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <SectionImage image={photo1}/>

                        <div className={"section-container centered"} id={""}>
                            <h1 dangerouslySetInnerHTML={{__html: hLibrary}}/>
                            <div dangerouslySetInnerHTML={{__html: tLibrary}}/>
                        </div>
                    </div>

                    <div className={"section"}>
                        <SectionImage image={photo2}/>
                        <div className={"section-container multicolumn"}>
                                <div>
                                    <h1 dangerouslySetInnerHTML={{__html: hHours}}/>
                                    <div className={"text-content grid"} dangerouslySetInnerHTML={{__html: tHours}}/>

                                    <h1 dangerouslySetInnerHTML={{__html: hTeachers}}/>
                                    <div className={"text-content"} dangerouslySetInnerHTML={{__html: tTeachers}}/>
                                </div>

                                <div>
                                    <h1 dangerouslySetInnerHTML={{__html: hRegulations}}/>
                                    <div className={"text-content"}>
                                        { regulations.map(att => {
                                            if (att) return <Attachment key={att.file.id} className={"attachment"} title={att.file.title} url={att.file.url}/>
                                            else return "";
                                        })}
                                    </div>

                                </div>
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

export default Library;