// @flow
import React, { Component } from 'react';

export default function withFormSpree(ComponentToWrap,formSpreeEmail:string) {
	return class FormSpreeWrapper extends Component {
		constructor(props:Object) {
			super(props)
			this.handleSubmit = this.handleSubmit.bind(this)
		}
		handleSubmit(formData:Object={submission: true},callback:Function) {
			// TODO: add _replyto, _cc, and _subject to default formData and
			// 	add check for fulfilled formData.

			const fetchSendBody = new FormData();
			
			Object.keys(formData).forEach(key => {
				fetchSendBody.append(key,formData[key])
			})

			if (window.fetch) {
				// use Fetch API
				// Init header class
				const headers = new Headers()
				
				// Append Accept header
				headers.append('Accept','application/json')

				// Start fetch pipeline
				fetch(`https://formspree.io/${formSpreeEmail}`, {
					method: 'POST',
					headers: headers,
					body: fetchSendBody
				}).then(function(res) {
					if (callback) {
						callback(res.json())
					}
				})
			} else {
				// use XMLHttpRequest
				const XHR = new XMLHttpRequest()
				const method = 'POST'
				const endpoint = `https://formspree.io/${formSpreeEmail}`
				XHR.open(method,endpoint,true)
				XHR.setRequestHeader('Accept','application/json')
				XHR.onreadystatechange = function checkReadyState() {
					if (XHR.readyState == XMLHttpRequest.DONE && XHR.status == 200) {
						if (callback) {
							callback(JSON.parse(XHR.response))
						}
					}
				}
				XHR.send(fetchSendBody)
			}
		}
		render() {
			return (
				<ComponentToWrap 
					formSpreeCallback={this.handleSubmit}
					{...{formSpreeEmail}}
					{...this.props}
				>
					{this.props.children}
				</ComponentToWrap>
			)
		}
	}
};