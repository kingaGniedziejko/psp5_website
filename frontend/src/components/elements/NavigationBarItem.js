import React, {Component} from "react";
import axios from "axios";
import PropTypes from "prop-types";

export class NavigationBarItem extends Component {
    state = {
        url: '',
        title: '',
        slug: '',
        number: 0,
        isActive: false, // aktualnie wybrana podstrona
        isLoaded: false
    }

    static propTypes = {
        barItem: PropTypes.object.isRequired,
        barItemNo: PropTypes.number
    }

    componentDidMount() {
        this.setState({
            url: this.props.barItem.url,
            title: this.props.barItem.title,
            slug: this.props.barItem.slug,
            number: this.props.barItem.number,
            isLoaded: false
        });
    }

    render() {
        return(
            <div className={"navigation-bar-item"}>
                dangerouslySetInnerHTML={{ __html: this.props.barItem.title}}
            </div>
        );
    }
}

export default NavigationBarItem;