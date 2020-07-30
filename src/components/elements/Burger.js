import React, {Component} from "react";
import styled from 'styled-components';
import SideMenu from "./SideMenu";


const StyledBurger = styled.div`
    position: fixed;
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
        open: this.props.open,
        width: 0
    }

    handleClick = () => {
        this.props.mutateState(!this.open);
        this.open = !this.open
    }

    render() {
        return (
            <>
                <StyledBurger open={this.open} onClick={this.handleClick}>
                    <div/>
                    <div/>
                    <div/>
                </StyledBurger>
            </>
        );
    }
}
export default Burger