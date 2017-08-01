import React, { Component } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Welcome } from "@storybook/react/demo";

import styled from "styled-components";

storiesOf("Welcome", module).add("to Storybook", () =>
	<Welcome showApp={linkTo("Button")} />
);

const MenuText = ["Home", "About", "Subjects"];

const colors = {
	gray: "#ddd",
	lightgray: "#e5e5e5"
};

const Menu = styled.ul`
	border: 1px solid ${colors.gray};
	border-radius: 3px;
	display: inline-block;
	font-family: 'Roboto', 'Arial', sans-serif;
	margin: 0;
	padding: 0;
`;

const MenuItem = styled.li`
	cursor: pointer;
	display: inline-block;
	padding: .5em 1em;
	&:hover {
		background-color: ${colors.lightgray};
	}
	&:not(:first-child) {
		border-left: 1px solid ${colors.gray};
	}
	&.active {
		background-color: steelblue;
		color: #fff;
	}
`;

const DropdownContainer = styled.div`
	border: 1px solid ${colors.gray};
	display: inline-block;
	cursor: pointer;
	font-family: 'Roboto';
	position: relative;
	user-select: none;
	&:after {
		content: "";
		background-color: #fff;
		border-color: ${colors.lightgray};
		border-style: solid;
		border-width: 1px 0 0 1px;
		display: ${props => props.isOpen ? 'block' : 'none'};
		height: 1em;
		position: absolute;
		bottom: calc(-1.75em);
		left: calc(50% - .5em);
		transform: rotate(45deg);
		width: 1em;
	}
`;

const DropdownTrigger = styled.a`
	color: ${props => props.focused ? 'red' : 'inherit'};
	display: inline-block;
	padding: .5em 1em;
	text-decoration: none;
`

/**
 * <Menu>
		{MenuText.map(item =>
			<MenuItem children={item} />
		)}
	</Menu>
 */

const MenuWrapper = styled.div`
	border: ${({ isOpen }) =>
		isOpen ? `1px solid ${colors.lightgray}` : "none"};
	border-radius: 3px;
	display: inline-block;
	height: ${({ isOpen }) => (isOpen ? "auto" : 0)};
	overflow: hidden;
	padding: ${({ isOpen }) => (isOpen ? "0 1em" : 0)};
	position: absolute;
	top: calc(100% + 1.25em);
	left: -1px;
	min-width: calc(100% - 2em);
`;

class Expandable extends Component {
	render() {
		const { children, ...rest} = this.props
		return children(...rest)
	}
}

class Dropdown extends Component {
	constructor() {
		super();
		this.state = { menuIsOpen: false, menuFocus: false, triggerFocus: false };
		this.updateMenuState = this.updateMenuState.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.handleMenu = this.handleMenu.bind(this)
	}
	componentDidMount() {
		window.addEventListener('click',e => {
			if (e.target.tagName === 'HTML') {
				this.setState(prevState => ({
					menuIsOpen: false,
					menuFocus: false
				}))
			}
		})
	}
	updateMenuState({ menuIsOpen, menuFocus = true }) {
		this.setState(prevState => ({ menuIsOpen: prevState.triggerFocus || (menuFocus ? true : false) , menuFocus: menuFocus || (prevState.triggerFocus) }));
	}
	toggleMenu(callback = (() => null)) {
		this.setState(prevState => {
			return ({ menuIsOpen: !prevState.menuIsOpen, menuFocus: true })
		}, callback())
	}
	handleMenu({ keepOpen } = { keepOpen: false }) {
		this.setState(prevState => ({
			menuIsOpen: keepOpen,
			menuFocus: keepOpen
		}))
	}
	render() {
		return (
			<DropdownContainer isOpen={this.state.menuIsOpen && this.state.menuFocus}>
				<DropdownTrigger href
					onClick={e => { e.preventDefault(); this.toggleMenu()}}
					onMouseEnter={()=> this.setState(prevState => ({ menuIsOpen: prevState.menuIsOpen && !prevState.menuFocus ? false : prevState.menuIsOpen }))}
					onBlur={() => null /*this.setState(prevState => ({ menuFocus: false }))*/}
				>
				My Menu
				</DropdownTrigger>
				<MenuWrapper 
					data-dropdown="menuwrapper"
					isOpen={this.state.menuIsOpen && this.state.menuFocus} 
					onClick={() => null/*this.setState(prevState => ({ menuFocus: false }))*/}
					onMouseEnter={()=> null/*this.setState(prevState => ({ menuFocus: true }))*/}
					onMouseLeave={()=> this.setState(prevState => ({ menuFocus: false }))}>
					<Expandable>
						{(props) => this.props.children({ props, handleMenu: this.handleMenu })}
					</Expandable>
				</MenuWrapper>
			</DropdownContainer>
		);
	}
}

const logRoute = route => callback => { console.log(route); callback() }

/**
 * onClick={e => this.setState(prevState => ({ menuFocus: true }))}
onClick={e => this.setState(prevState => ({ menuFocus: true }))}
onClick={e => this.setState(prevState => ({ menuFocus: true }))}
**/
storiesOf("Menu/Dropdown", module).add("default", () => <Dropdown>
					{({ props, handleMenu }) => (<ul style={{ padding: 0, listStyleType: "none" }} {...props}>
						<li><a href="#Home" onClick={() => logRoute('/home')(() => handleMenu({keepOpen: true}))}>Home</a></li>
						<li><a href="#About" onClick={() => logRoute('/about')(handleMenu)}>About</a></li>
						<li><a href="#Contact" onClick={() => logRoute('/contact')(handleMenu)}>Contact</a></li>
					</ul>)}</Dropdown>);
