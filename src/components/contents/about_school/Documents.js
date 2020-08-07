import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"
import axios from "axios";


export class Documents extends Component {
    state = {
        content: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=documents"
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

        console.log(this.props.path)
        if(this.state.isLoaded) {
            return (
                <div className={"content"}>
                    <div className={"section"}>
                        <div className={"photo-static"} style={{backgroundImage: `url(${photo1})`}}/>

                        <div className={"section-container centered"} id={""}>
                            {/*<h1 dangerouslySetInnerHTML={{__html: hLibrary}}/>*/}
                            {/*<div dangerouslySetInnerHTML={{__html: tLibrary}}/>*/}
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

export default Documents;