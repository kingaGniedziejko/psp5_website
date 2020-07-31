import React, {Component} from "react";
import axios from "axios";
// import axios from "axios";

export class AdditionalPage extends Component {
    // state = {
    //
    // }

    // componentDidMount() {
    //     const {page} = this.props;
    //     const {featured_media} = this.props.post;
    //     axios.get(`/wp-json/wp/v2/media/${featured_media}`)
    //         .then(res => this.setState({
    //             imgUrl: res.data.media_details.sizes.full.source_url,
    //             isLoaded: true,
    //             isExpanded: false
    //         }));
    //
    // }

    render() {
        const {image1, title1, text1, image2, title2, text2} = this.props.page.acf;

        return (
            <div className={"content"}>

                <div className={"section section-1"}>
                    <div className={"photo photo-1"} style={{backgroundImage: `url(${image1.url})`}}/>
                    <h1>{title1}</h1>
                    <div dangerouslySetInnerHTML={{__html: text1}}></div>
                </div>

                {image2 ? (
                    <div className={"section section-2"}>
                        <div className={"photo photo-2"} style={{backgroundImage: `url(${image2.url})`}}/>
                        <h1>{title2}</h1>
                        <div dangerouslySetInnerHTML={{__html: text2}}></div>
                    </div>
                    ): ""
                }

            </div>
        );
    }
}

export default AdditionalPage;