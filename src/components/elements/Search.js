import React, {Component} from "react";
import axios from "axios";


export class Search extends Component {
    state = {
        result: undefined,
        isLoaded: false
    }

    componentDidMount() {
        const {phrase} = this.props.match.params;
        const searchUrl = global.config.proxy + "/wp-json/wp/v2/search?subtype=news,subpages,documents&search=" + phrase;

        axios.get(searchUrl)
            .then(res => this.setState({
                result: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const {result, isLoaded} = this.state;

        if (isLoaded) console.log(result);
        
        return (
            <div>
            </div>
        );
    }

}

export default Search;