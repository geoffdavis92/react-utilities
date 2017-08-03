import React, { Component } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Welcome } from "@storybook/react/demo";

import styled, { keyframes } from "styled-components";

storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />);

class _RenderChildrenFromFn extends Component {
	render() {
		const { children, ...rest } = this.props;
		return children({ ...rest });
	}
}

const MenuText = ["Home", "About", "Subjects"];

const colors = {
	gray: "#ddd",
	lightgray: "#e5e5e5"
};

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
		display: ${props => (props.isOpen ? "block" : "none")};
		height: 1em;
		position: absolute;
		bottom: calc(-1.75em);
		left: calc(50% - .5em);
		transform: rotate(45deg);
		width: 1em;
	}
`;

const DropdownTrigger = styled.a`
	color: ${props => (props.focused ? "red" : "inherit")};
	display: inline-block;
	padding: .5em 1em;
	text-decoration: none;
`;

/**
 * <Menu>
		{MenuText.map(item =>
			<MenuItem children={item} />
		)}
	</Menu>
 */

const animation_fadein = keyframes`
	from {
		opacity: 0
	}
	to {
		opacity: 1
	}
`

const animation_fadeout = keyframes`
	from {
		opacity: 1
	}
	to {
		opacity: 0
	}
`

// opacity: ${({ isOpen }) => (isOpen ? "1" : 0)};
// transition: .2s opacity;

const DropdownWrapper = styled.div`
	animation: ${animation_fadein} .2s linear forward;
	border: ${({ isOpen }) => (isOpen ? `1px solid ${colors.lightgray}` : "none")};
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

class Dropdown extends Component {
	constructor() {
		super();
		this.state = { menuIsOpen: false, menuFocus: false, triggerFocus: false };
		this.toggleMenu = this.toggleMenu.bind(this);
		this.handleMenu = this.handleMenu.bind(this);
	}
	componentDidMount() {
		// window.addEventListener("click", e => {
		// 	if (e.target.tagName === "HTML") {
		// 		this.setState(prevState => ({
		// 			menuIsOpen: false,
		// 			menuFocus: false
		// 		}));
		// 	}
		// });
	}
	toggleMenu() {
		this.setState(prevState => ({ menuIsOpen: !prevState.menuIsOpen, menuFocus: true }));
	}
	handleMenu({ keepOpen } = { keepOpen: false }) {
		this.setState(prevState => ({
			menuIsOpen: keepOpen,
			menuFocus: keepOpen
		}));
	}
	render() {
		return (
			<DropdownContainer isOpen={this.state.menuIsOpen && this.state.menuFocus}>
				<DropdownTrigger
					onClick={e => {
						e.preventDefault();
						this.toggleMenu();
					}}
					onMouseEnter={() =>
						this.setState(prevState => ({
							menuIsOpen: prevState.menuIsOpen && !prevState.menuFocus ? false : prevState.menuIsOpen
						}))}
				>
					My Menu
				</DropdownTrigger>
				<DropdownWrapper
					data-dropdown-id="wrapper"
					isOpen={this.state.menuIsOpen && this.state.menuFocus}
					onMouseLeave={() => this.setState(prevState => ({ menuFocus: false }))}
				>
					<_RenderChildrenFromFn>
						{props => this.props.children({ handleMenu: this.handleMenu })}
					</_RenderChildrenFromFn>
				</DropdownWrapper>
			</DropdownContainer>
		);
	}
}

const logRoute = route => callback => {
	console.log(route);
	callback();
};

storiesOf("Menu/Dropdown", module).add("default", () =>
	<Dropdown>
		{({ handleMenu }) =>
			<ul style={{ padding: 0, listStyleType: "none" }} >
				<li>
					<a href="#Home" onClick={() => logRoute("/home")(() => handleMenu({ keepOpen: true }))}>
						Home
					</a>
				</li>
				<li>
					<a href="#About" onClick={() => logRoute("/about")(handleMenu)}>
						About
					</a>
				</li>
				<li>
					<a href="#Contact" onClick={() => logRoute("/contact")(handleMenu)}>
						Contact
					</a>
				</li>
			</ul>}
	</Dropdown>
);
