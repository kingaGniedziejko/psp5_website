import React, {Component} from "react";
import Lottie from 'react-lottie';
import spinner from '../../images/spinner';


export class Spinner extends Component {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: spinner,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        return(
            <div>
                <Lottie
                    options={defaultOptions}
                    height={50}
                    width={50}
                    style={{margin: "2em"}}
                />
            </div>
        );
    }
}

export default Spinner;