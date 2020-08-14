import React, {Component} from "react";
import styled from 'styled-components';


const StyledBurger = styled.div`

    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;          
    width: 1.7em;
    height: 1.7em;
    
    @media (max-width: 1130px) {
        height: 1.5em;
        width: 1.5em;
    }
    
    div {

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

    handleClick = () => {

        this.setState({
            isSideMenuOpen: !(this.state.isSideMenuOpen)
        }, () => {
            this.props.mutateSideMenu();
        })
    }

    close = () => {
        this.setState({
            isSideMenuOpen: false
        })
    }

    render() {
        return (
            <div id={"burger"}>
                <StyledBurger
                    onClick={this.handleClick}
                    isSideMenuOpen={this.state.isSideMenuOpen}
                >
                    <div/>
                    <div/>
                    <div/>
                </StyledBurger>
            </div>
        );
    }
}
export default Burger