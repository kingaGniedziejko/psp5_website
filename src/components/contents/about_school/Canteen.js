import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../../elements/SectionImage";
import ReactHtmlParser from 'react-html-parser';
import Moment from "react-moment";
import Attachment from "../../elements/Attachment";
import Link from "../../elements/Link";


export class Canteen extends Component {
    state = {
        title: "Stołówka",
        content: [],
        menus: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=canteen"
        let menusUrl = global.config.proxy + "/wp-json/wp/v2/menus?per_page=5"

        let getContent = axios.get(contentUrl);
        let getMenus = axios.get(menusUrl);

        axios.all([getContent, getMenus])
            .then(res => {
                let menus = []

                if(res[1])
                res[1].data.forEach(menu => {
                    menus.push({key: menu.acf.file.id, name: menu.title.rendered, url: menu.acf.file.url})
                })

                this.setState({
                    content: res[0].data[0].acf,
                    menus: menus,
                    isLoaded: true
                });
            })
            .catch(err => console.log(err));
    }

    render() {


        if(this.state.isLoaded) {
            const {menus} = this.state
            const sections = this.state.content.sections
            const photo1 = sections[0].images[0].image
            const photo2 = sections[1].images[0].image
            const header1 = sections[0].lonely_headers[0].text
            const header2 = sections[1].lonely_headers[0].text
            const links = sections[0].links

            const tCanteen = sections[0].modules[0].text;
            const tMobileSystem = sections[0].modules[1].text;

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <SectionImage image={photo1}/>
                        <div className={"section-container"}>
                           <h1 dangerouslySetInnerHTML={{__html: header1}}/>
                            <div className={"multicolumn wide"}>
                                <div>
                                    <div dangerouslySetInnerHTML={{__html: tCanteen}}/>
                                    {
                                        links.map((link, index) => {
                                            if (link && link.link !== "")
                                                return (
                                                    <Link key={index} title={link.link.title}
                                                          url={link.link.url}/>
                                                )
                                        })
                                    }
                                </div>
                                <div dangerouslySetInnerHTML={{__html: tMobileSystem}}/>

                            </div>
                        </div>
                    </div>
                    <div className={"section"}>
                        <SectionImage image={photo2}/>
                        <div className={"section-container"} style={{minWidth: "40%"}}>
                            <h1 dangerouslySetInnerHTML={{__html: header2}}/>
                            <div style={{width: "100%"}}>
                                {
                                    menus.length > 0 ?
                                        menus.map((menu, index) =>
                                            <Attachment key={index}
                                                        title={menu.name}
                                                        url={menu.url}/>
                                        ) : ""
                                }
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

export default Canteen;