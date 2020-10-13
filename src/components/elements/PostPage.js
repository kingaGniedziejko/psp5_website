import React, {Component} from "react";
import Moment from "react-moment";
import ImageGallery from "react-image-gallery";
import Helmet from "react-helmet";
import {withRouter} from "react-router-dom";

import axios from "axios";
import Spinner from "./Spinner";
import ErrorNotFound from "./ErrorNotFound";
import Attachment from "./Attachment";

import "../../styles/image_gallery_style.css";
import "../../styles/post_page_style.css";

export class PostPage extends Component {
    state = {
        post: undefined,
        isLoaded: false,
        firstLoad: true,
    }

    componentDidMount() {
        const {newsID} = this.props.match.params;
        const getPostUrl = global.config.proxy + "/wp-json/wp/v2/news/" + newsID;

        axios.get(getPostUrl)
            .then(res => this.setState({
                post: res.data,
                isLoaded: true,
                firstLoad: false
            }))
            .catch(err => {
                console.log(err);
                if (this.state.firstLoad) {
                    this.setState({
                        firstLoad: false
                    })
                }
            });
    }

    render() {
        const {post, isLoaded, firstLoad} = this.state;

        if (!firstLoad){
            if (isLoaded) {
                
                const {title, date, acf} = post;
                const {text, image_gallery, attachments} = acf;

                let images = [];

                if (image_gallery !== undefined) {
                    image_gallery.forEach(elem => {
                        if (elem.image) {
                            images.push({
                                fullscreen: elem.image.url,
                                original: elem.image.url,
                                thumbnail: elem.image.sizes.thumbnail
                            })
                        }
                    })
                }

                return (
                    <div className={"content post-page"}>
                        <Helmet>
                            <title>{global.config.mainTitle + " " + title.rendered}</title>
                        </Helmet>
                        <div className={"section-container"}>
                            <div className={"image-gallery-container"}>
                                <ImageGallery items={images} additionalClass={images.length === 1 ? "single" : ""} useBrowserFullscreen={false}/>
                            </div>
                            <div className={"post-content-container"}>
                                <h2 className={"post-title"} dangerouslySetInnerHTML={{__html: title.rendered}}/>
                                <small className={"post-date"}>
                                    <Moment locale={"pl"} format="DD MMMM YYYYr. HH:mm">{date}</Moment>
                                </small>
                                <div className={"post-text"}>
                                    <div dangerouslySetInnerHTML={{ __html: text}}/>
                                    <div className={"post-attachments"}>
                                        {
                                            attachments !== undefined && attachments !== false ?
                                                attachments.map(att => {
                                                    if (att) return <Attachment key={att.attachment.id}
                                                                                className={"post-attachment"}
                                                                                title={att.attachment.title}
                                                                                url={att.attachment.url}/>
                                                    else return "";
                                                }) : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            <button className={"button-accent-2"} onClick={this.props.history.goBack}>Powrót</button>
                        </div>
                    </div>
                );
            } else
                return <ErrorNotFound/>;
        }
        return <Spinner/>;
    }
}

export default withRouter(PostPage);