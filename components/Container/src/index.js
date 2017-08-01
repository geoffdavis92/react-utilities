import React from 'react';
import styled from 'styled-components'

const Container = styled.section`
	/*background-color: #daa;*/
	color: lightseagreen;
	font-family: "Roboto",serif;
	line-height: 1.25;
	padding: 1em;
	@supports ( display: ${ props => props.noFlex ? 'disable_flex' : 'flex' } ) {
		/*background-color: #ada;*/
		display: flex;
		flex-wrap: wrap;
		justify-items: space-between;
		.flex {
			color: cornflowerblue;
		}
	}
	@supports ( display: ${ props => props.noGrid ? 'disable_grid' : 'grid' } ) {
		/*background-color: #aad;*/
		display: grid;
		grid-template-columns: calc(100% - .5em);
		grid-column-gap: 1em;
		grid-row-gap: 1em;
		@media only screen and (min-width: 768px) {
			grid-template-columns: calc(50% - .5em) calc(50% - .5em);
		}
		@media only screen and (min-width: 1100px) {
			grid-template-columns: calc(33% - .5em) calc(33% - .5em) calc(33% - .5em);
		}
		.grid {
			color: palevioletred;
		}
	}
`

export default Container

// function Container(props) {
// 	return <StyledContainer>{props.children}</StyledContainer>
// }