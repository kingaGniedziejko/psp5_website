import React, {Component} from "react";
import styled from 'styled-components';
import SideMenu from "./SideMenu";


const StyledBurger = styled.div`
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;  
    z-index: 20;
    div {
        width: 1.7em;
        height: 0.2em;
        background-color: ${({ open }) => open ? 'var(--accent-1)' : 'var(--white-1)'};
        border-radius: 6px;
        transform-origin: 1px;
        transition: all 0.3s linear;
      
        &:nth-child(1) {
            transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
        }
        &:nth-child(2) {
            transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
            opacity: ${({ open }) => open ? 0 : 1};
        }
        &:nth-child(3) {
            transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        }
    }
`;

export class Burger extends Component {
    state = {
        open: false,
    }

    componentDidMount() {
        this.setState({
            open: this.props.open
        })
    }

    handleClick = () => {
        this.props.mutateState(!this.open);
        this.setState({
            open: !this.state.open
        })
    }

    close = () => {
        // this.props.mutateState(false);
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <>
                <StyledBurger open={this.state.open} onClick={this.handleClick}>
                    <div/>
                    <div/>
                    <div/>
                </StyledBurger>
            </>
        );
    }
}
export default Burger