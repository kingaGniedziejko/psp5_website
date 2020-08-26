import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../../elements/SectionImage";
import ReactHtmlParser from 'react-html-parser';
import Moment from "react-moment";
import Attachment from "../../elements/Attachment";
import Link from "../../elements/Link";
import PageContent from "../../elements/PageContent";


export class Canteen extends Component {
    state = {
        title: "Stołówka",
        page: undefined,
        menus: [],
        isLoaded: false
    }

    componentDidMount() {
        let menusUrl = global.config.proxy + "/wp-json/wp/v2/menus?per_page=5"

        let getMenus = axios.get(menusUrl);

        axios.all([getMenus])
            .then(res => {
                let menus = []

                if(res[0])
                    res[0].data.forEach(menu => {
                        menus.push({key: menu.acf.file.id, name: menu.title.rendered, url: menu.acf.file.url})
                    })

                this.setState({
                    page: this.props.page,
                    menus: menus,
                    isLoaded: true
                });
            })
            .catch(err => console.log(err));
    }

    render() {


        if(this.state.isLoaded) {
            const {menus, page} = this.state

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <PageContent page={page}/>

                    <section>
                        <div className={"section-content"}>
                            <div className={"one-column center"}>
                                <div className={"text-container"} style={{width: "100%"}}>
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
                    </section>
                </div>
            );
        }
        return (
            <Spinner />
        );
    }
}

export default Canteen;