import React, {Component} from "react";
import Moment from "react-moment";
import ImageGallery from "react-image-gallery";
import Helmet from "react-helmet";
import {withRouter} from 'react-router-dom'

import axios from "axios";
import Spinner from "./Spinner";
import Attachment from "./Attachment";

import "../../styles/image_gallery_style.css";
import "../../styles/post_page_style.css";


export class PostPageSub extends Component {
    state = {
        isGalleryLoaded: false,
        gallery: []
    }

    componentDidMount() {
        const {image_gallery} = this.props.gallery;

        if (image_gallery !== null){
            let galleryArray = image_gallery.split(",");

            if(galleryArray.length !== 0) {
                let getGalleryArray = [];
                let galleryImages = [];

                galleryArray.forEach(elem => {
                    getGalleryArray.push(axios.get(global.config.proxy + "/wp-json/wp/v2/media/" + elem));
                })

                axios.all(getGalleryArray)
                    .then(axios.spread((...responses) => {
                        responses.forEach(elem => {
                            galleryImages.push(elem.data);
                        })
                        this.setState({
                            gallery: galleryImages,
                            isGalleryLoaded: true
                        })
                    }))
                    .catch(err => console.log(err));
            }
        }
    }

    render() {
        const {title, date, acf} = this.props.post;
        const {text, attachments} = acf;
        const {isGalleryLoaded, gallery} = this.state;

        let images = [];
        gallery.forEach(elem => {
            images.push({
                original: elem.media_details.sizes.full.source_url,
                thumbnail: elem.media_details.sizes.thumbnail.source_url
            })
        })

        return (
            <div className={"content post-page photoless-content"}>
                <Helmet>
                    <title>{global.config.mainTitle + " " + title.rendered}</title>
                </Helmet>
                <div className={"section-container"}>
                    <div className={"image-gallery-container"}>
                        { isGalleryLoaded ?
                            <ImageGallery items={images} additionalClass={images.length === 1 ? "single" : ""} useBrowserFullscreen={false}/>
                            : <Spinner/>
                        }
                    </div>
                    <div className={"post-content-container"}>
                        <h2 className={"post-title"}>{title.rendered}</h2>
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
    }
}

export default withRouter(PostPageSub);