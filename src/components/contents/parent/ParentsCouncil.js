import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import {Link} from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";
import Moment from "react-moment";
import Attachment from "../../elements/Attachment";
import PostDisplay from "../../elements/PostDisplay";


export class ParentsCouncil extends Component {
    state = {
        title: "Rada Rodziców",
        content: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=parents-council"
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

            const photo1 = sections[0].images[0].url
            const photo2 = sections[1].images[0].url

            const header = sections[0].lonely_headers[0].text

            const hMembers = sections[0].lonely_headers[1].text
            const members = this.state.content.members

            const hAccount = sections[0].modules[0].header
            const tAccount = sections[0].modules[0].text

            const hContact = sections[0].modules[1].header
            const tContact = sections[0].modules[1].text

            const regulations = sections[0].attachments

            const hNews = sections[1].lonely_headers[0].text


            let key = 0;

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <div className={"section"}>
                        <div className={"photo-static"} style={{backgroundImage: `url(${photo1})`}}/>
                        <h1 dangerouslySetInnerHTML={{__html: header}}/>

                        <div className={"section-container multicolumn"}>
                            <div>
                                <h1 dangerouslySetInnerHTML={{__html: hMembers}}/>

                                <table>
                                    <tbody>
                                    {
                                        members.map(member => {return <tr key={key++}><td><strong>{member.position}</strong></td><td>{member.name}</td></tr>})
                                    }
                                    </tbody>

                                </table>
                                {
                                    regulations.map(att => {
                                        if (att) return <Attachment key={att.file.id} className={"attachment"} title={att.file.title} url={att.file.url}/>
                                        else return "";
                                    })
                                }
                            </div>

                            <div>
                                <h1 dangerouslySetInnerHTML={{__html: hAccount}}/>
                                <div dangerouslySetInnerHTML={{__html: tAccount}} className={"text-content"}/>
                                <h1 dangerouslySetInnerHTML={{__html: hContact}}/>
                                <a type={"email"}><div dangerouslySetInnerHTML={{__html: tContact}} className={"text-content"}/></a>
                            </div>
                        </div>
                    </div>

                    <div className={"section"}>
                        <div className={"photo-static"} style={{backgroundImage: `url(${photo2})`}}/>

                        <h1 dangerouslySetInnerHTML={{__html: hNews}}/>
                        <PostDisplay postCategories={["rada-rodzicow"]} postsCount={3} />

                    </div>
                </div>
            );
        }
        return (
            <Spinner />
        );
    }
}

export default ParentsCouncil;