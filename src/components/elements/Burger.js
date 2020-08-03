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
        background-color: ${({ isSideMenuOpen }) => isSideMenuOpen ? 'var(--accent-1)' : 'var(--white-1)'};
        border-radius: 6px;
        transform-origin: 1px;
        transition: all 0.3s linear;
      
        &:nth-child(1) {
            transform: ${({ isSideMenuOpen }) => isSideMenuOpen ? 'rotate(45deg)' : 'rotate(0)'};
        }
        &:nth-child(2) {
            transform: ${({ isSideMenuOpen }) => isSideMenuOpen ? 'translateX(100%)' : 'translateX(0)'};
            opacity: ${({ isSideMenuOpen }) => isSideMenuOpen ? 0 : 1};
        }
        &:nth-child(3) {
            transform: ${({ isSideMenuOpen }) => isSideMenuOpen ? 'rotate(-45deg)' : 'rotate(0)'};
        }
    }
`;

export class Burger extends Component {
    state = {
        isSideMenuOpen: false,
    }

    componentDidMount() {
        this.setState({
            isSideMenuOpen: this.props.isSideMenuOpen
        })
    }

    handleClick = () => {
        this.props.mutateSideMenu(!this.isSideMenuOpen);
        this.setState({
            isSideMenuOpen: !this.state.isSideMenuOpen
        })
    }

    close = () => {
        // this.props.mutateState(false);
        this.setState({
            isSideMenuOpen: false
        })
    }

    render() {
        return (
            <>
                <StyledBurger isSideMenuOpen={this.state.isSideMenuOpen} onClick={this.handleClick}>
                    <div/>
                    <div/>
                    <div/>
                </StyledBurger>
            </>
        );
    }
}
export default Burger