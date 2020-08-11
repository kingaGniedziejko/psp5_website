import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"

import "../../../styles/library_style.css"
import axios from "axios";
import Helmet from "react-helmet";


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
        const photo1 = this.state.content.photo_1 !== undefined ? this.state.content.photo_1 : "";
        const photo2 = this.state.content.photo_2 !== undefined ? this.state.content.photo_2 : "";
        const attachments = [
            this.state.content.attachment_1,
            this.state.content.attachment_2
        ];

        // opis biblioteki szkolnej
        const hLibrary = this.state.content.header_1 !== undefined ? this.state.content.header_1 : "";
        const tLibrary = this.state.content.text_1 !== undefined ? this.state.content.text_1 : "";

        // godziny otwarcia
        const hHours = this.state.content.header_2 !== undefined ? this.state.content.header_2 : "";
        const tHours = this.state.content.text_2 !== undefined ? this.state.content.text_2 : "";

        // nauczyciele bibliotekarze
        const hTeachers = this.state.content.header_3 !== undefined ? this.state.content.header_3 : "";
        const tTeachers = this.state.content.text_3 !== undefined ? this.state.content.text_3 : "";

        // regulaminy
        const hRegulations = this.state.content.header_4 !== undefined ? this.state.content.header_4 : "";

        if(this.state.isLoaded) {
            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <div className={"photo-static"} style={{backgroundImage: `url(${photo1})`}}/>

                        <div className={"section-container centered"} id={""}>
                            <h1 dangerouslySetInnerHTML={{__html: hLibrary}}/>
                            <div dangerouslySetInnerHTML={{__html: tLibrary}}/>
                        </div>
                    </div>

                    <div className={"section"}>
                        <div className={"photo"} style={{backgroundImage: `url(${photo2})`}}/>
                        <div className={"section-container multicolumn"}>
                                <div>
                                    <h1 dangerouslySetInnerHTML={{__html: hHours}}/>
                                    <div className={"text-content open-hours"} dangerouslySetInnerHTML={{__html: tHours}}/>

                                    <h1 dangerouslySetInnerHTML={{__html: hTeachers}}/>
                                    <div className={"text-content"} dangerouslySetInnerHTML={{__html: tTeachers}}/>
                                </div>

                                <div>
                                    <h1 dangerouslySetInnerHTML={{__html: hRegulations}}/>
                                    <div className={"text-content"}>
                                        { attachments.map(att => {
                                            if (att) return <Attachment key={att.id} className={"attachment"} title={att.title} url={att.url}/>
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