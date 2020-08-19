import React, {Component} from "react";
import axios from "axios";
import Moment from "react-moment";
import Attachment from "./Attachment";
import ImageGallery from "react-image-gallery";
import Helmet from "react-helmet";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";

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
            <div className={"content post-page"}>
                <Helmet>
                    <title>{global.config.mainTitle + " " + title.rendered}</title>
                </Helmet>
                <div className={"section-container"}>
                    <div className={"image-gallery-container"}>
                        { isGalleryLoaded?
                            (images.length === 1 ?
                                <ImageGallery items={images} additionalClass={"single"}/>
                                : <ImageGallery items={images}/>)
                            : <Spinner/>
                        }
                    </div>
                    <div className={"post-content-container"}>
                        <h2 className={"post-title"}>{title.rendered}</h2>
                        <small className={"post-date"}>
                            <Moment locale={"pl"} format="DD MMMM YYYYr. HH:mm">{date}</Moment>
                        </small>
                        <p className={"post-text"} dangerouslySetInnerHTML={{ __html: text}} />
                        <div className={"post-attachments"}>
                            {
                                attachments !== undefined && attachments !== false?
                                attachments.map(att => {
                                    if (att) return <Attachment key={att.id} className={"post-attachment"} title={att.title} url={att.url}/>
                                    else return "";
                                }) : ""
                            }
                        </div>
                    </div>
                    <Link to={"/"}><button className={"button-accent-2"}>Powrót do strony głównej</button></Link>
                </div>
            </div>
        );
    }
}

export default PostPageSub;