// @flow
import React, { Component } from 'react'
import { render } from 'react-dom'

// react-utilities modules
import withFormSpree from './hocs/withFormSpree'

// example components
import Form from './examples/Form'
import MyButton from './examples/MyButton'

const FormTest = withFormSpree(Form)
const ButtonTest = withFormSpree(MyButton,'your_email@provider.com')

// Choose one of the following to render: 
// 		<ButtonTest>Click To Submit Form</ButtonTest>
// 		<FormTest />
render((
	<FormTest />
), document.getElementById('app'))