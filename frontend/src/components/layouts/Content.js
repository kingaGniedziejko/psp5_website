import React, {Component} from "react";
import axios from 'axios';


export class Content extends Component {
    state = {
        posts: [],
        isLoaded: false
    }

    componentDidMount() {
        axios.get('/wp-json/wp/v2/komunikaty')
            .then(res => this.setState({
                posts: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.posts);
        return (
            <div>

            </div>
        );
    }
}