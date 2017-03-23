import React from 'react'

export default function MyButton(props) {
	const { formSpreeEmail, formSpreeCallback } = props

	let setupCallback

	if (formSpreeEmail && formSpreeEmail !== 'your_email@provider.com') {
		setupCallback = () => formSpreeCallback({ event: 'button_click', test: true })
		alert(`Check ${formSpreeEmail} for a confirmation email.`)
	} else {
		setupCallback = () => { throw('Error: You need to set an email in demo.js') }
	}
	return <button onClick={setupCallback ? setupCallback : null}>{props.children}</button>
}