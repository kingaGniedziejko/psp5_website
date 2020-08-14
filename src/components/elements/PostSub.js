import React, {Component} from "react";
import Moment from "react-moment";
import "moment/locale/pl";
import PropTypes from "prop-types";
import "../../config";
import axios from "axios";

import Attachment from "./Attachment"
import {CSSTransition} from "react-transition-group";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {Link} from "react-router-dom";

export class PostSub extends Component {
    state = {
        isExpanded: false,
        excerptLength: 150,
        isGalleryLoaded: false,
        gallery: []
    }

    static propTypes = {
        post: PropTypes.object.isRequired,
        postNr: PropTypes.number
    }

    extendButtonClick(){
        this.setState({
            isExpanded: !this.state.isExpanded
        });
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

                axios.all(getGalleryArray).then(axios.spread((...responses) => {
                    responses.forEach(elem => {
                        galleryImages.push(elem.data);
                    })
                    this.setState({
                        gallery: galleryImages,
                        isGalleryLoaded: true
                    })
                })).catch(err => console.log(err));
            }
        }
    }

    render() {
        const {id, title, slug, date, acf} = this.props.post;
        const {text} = acf;
        const excerpt = text.substring(0, this.state.excerptLength)+"...";
        const {isExpanded, isGalleryLoaded, gallery} = this.state;
        const attachments = [
            acf.attachment1,
            acf.attachment2,
            acf.attachment3,
            acf.attachment4,
            acf.attachment5
        ];

        const {postNr} = this.props;
        const postDirection = postNr%2;

        let images = [];
        gallery.forEach(elem => {
            images.push({
                original: elem.media_details.sizes.full.source_url,
                thumbnail: elem.media_details.sizes.thumbnail.source_url
            })
        })

        return (
            <div className={"post " + (postDirection ? "post-left" : "post-right")}>
                <div>
                    {
                        images.length === 1 ?
                            // <img src={images[0].original} alt={"Zdjęcie"}/>
                            <ImageGallery items={images} additionalClass={"single"}/>

                            :
                            <ImageGallery items={images}/>
                    }
                </div>
                <div>
                    <Link to={"/aktualnosci/" + id + "/" + slug}><h2 className={"post-title"}>{title.rendered}</h2></Link>
                    <small className={"post-date"}>
                        <Moment locale={"pl"} format="DD MMMM YYYYr. HH:mm">{date}</Moment>
                    </small>
                    <p className={"post-text"} dangerouslySetInnerHTML={{ __html: isExpanded ? text : excerpt}} />
                    { isExpanded ? <div>
                        { attachments.map(att => {
                            if (att) return <Attachment key={att.id} className={"post-attachment"} title={att.title} url={att.url}/>
                            else return "";
                        })}
                    </div> : "" }
                    <button className={"post-button button-accent-2"}
                            onClick={this.extendButtonClick.bind(this)}>{isExpanded ? "mniej" : "więcej"}
                    </button>
                </div>
            </div>
        );
    }
}

export default PostSub;