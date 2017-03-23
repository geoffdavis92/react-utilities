import React, { Component } from 'react'

export default class Form extends Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
		this.formInputs = [
			{ name: 'name', type: 'text' },
			{ name: 'age', type: 'number' }
		]
	}
	handleSubmit(e) {
		e.preventDefault();
		const submission = {
			[this.Name.name]: this.Name.value,
			[this.Age.name]: this.Age.value,
		}
		if (this.props.formSpreeEmail && this.props.formSpreeEmail !== 'your_email@provider.com') {
			this.props.formSpreeCallback(submission,() => this.Form.reset())
		} else {
			throw('Error: You need to set an email in demo.js')
		}
	}
	render() {
		const inputs = this.formInputs.map(input => {
			const { name, type } = input
			return (
				<label 
					key={name} 
					htmlFor={name}
				>
				{name.substr(0,1).toUpperCase()}{name.substr(1,(name.length-1))} <input 
					type={type}
					name={name}
					id={name}
					ref={input => this[`${name.substr(0,1).toUpperCase()}${name.substr(1,(name.length-1))}`] = input}
				/>
				</label>
			)
		})
		return (
			<form 
				onSubmit={this.handleSubmit}
				ref={form => this.Form = form}
			>
				{inputs}
				<input type="submit" value="Submit" />
			</form>
		)
	}
}