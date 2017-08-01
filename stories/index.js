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

const Button = styled.div`
	border: 1px solid ${colors.gray};
	cursor: pointer;
	display: inline-block;
	font-family: 'Roboto';
	padding: .5em 1em;
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

/**
 * <Menu>
		{MenuText.map(item =>
			<MenuItem children={item} />
		)}
	</Menu>
 */

const Expandable = styled.div`
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
	width: calc(100% - 2em);
`;

class Dropdown extends Component {
	constructor() {
		super();
		this.state = { MenuIsOpen: false };
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	toggleMenu() {
		this.setState(prevState => ({ MenuIsOpen: !prevState.MenuIsOpen }));
	}
	render() {
		return (
			<Button isOpen={this.state.MenuIsOpen} onClick={this.toggleMenu}>
				My Menu
				<Expandable isOpen={this.state.MenuIsOpen}>
					<ul style={{ padding: 0, listStyleType: "none" }}>
						<li>Home</li>
						<li>About</li>
						<li>Contact</li>
					</ul>
				</Expandable>
			</Button>
		);
	}
}

storiesOf("Menu/Dropdown", module).add("default", () => <Dropdown />);
