import React, {Component} from "react";
import {Helmet} from 'react-helmet'
import Shortcuts from "../elements/Shortcuts";
import PostDisplay from "../elements/PostDisplay";
import {Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Spinner from "../elements/Spinner";
import AchievementsGallery from "../elements/AchievementsGallery";
import SectionImage from "../elements/SectionImage";


export class HomePage extends Component {
    state = {
        page: undefined,
        shortcut: undefined,
        isLoaded: false,
        title: global.config.mainTitle + " Strona główna",
        postCategory: "komunikaty",
        postCount: 5,
        width: 0,
        achievements: []
    }

    componentDidMount() {
        let shortcutUrl = global.config.proxy + "/wp-json/menus/v1/menus/na-skroty";

        axios.get(shortcutUrl)
            .then(res => this.setState({
                content: this.props.page.acf,
                shortcut: res.data.items,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }


    render() {
        const {shortcut, isLoaded, title, postCategory, postCount} = this.state;

        if(isLoaded) {
            const sections = this.state.content.sections;
            const photo1 = sections[0].section_image;
            const photo2 = sections[1].section_image;
            const hShortcut = sections[0].one_column_content.modules[0].header;
            const hAnnouncements= sections[1].one_column_content.modules[0].header;
            const hAchievements= sections[1].one_column_content.modules[1].header;

            let shortcutElements = [];

            shortcut.forEach(elem => {
                shortcutElements.push({
                    title: elem.title,
                    url: elem.url,
                    type: elem.type
                });
            })

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>

                    <section>
                        <SectionImage image={photo1} type={"thick"}/>
                        <div className={"section-container"}>
                            <h1 dangerouslySetInnerHTML={{__html: hShortcut}}/>
                            <Shortcuts elements={shortcutElements}/>
                        </div>
                    </section>
                    <section>
                        <SectionImage image={photo2}/>
                        <div className={"section"}>
                            <h1 dangerouslySetInnerHTML={{__html: hAnnouncements}}/>
                            <PostDisplay postCategories={[postCategory]} postsCount={postCount} />
                            <Link to={"/aktualnosci/komunikaty"}><button className={"button-accent-1"}>Czytaj więcej</button></Link>
                        </div>

                    </section>

                    <section className={"grey"}>
                        <h1 dangerouslySetInnerHTML={{__html: hAchievements}}/>
                        <div className={"slider-container"}>
                            <AchievementsGallery />
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

export default HomePage;