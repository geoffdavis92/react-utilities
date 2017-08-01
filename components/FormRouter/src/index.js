import React, { Component } from 'react';
import { HashRouter, Route, Link, NavLink, withRouter } from 'react-router-dom'

class FormRouter extends Component {
  render() {
  	const { children, action } = this.props
  	let FormViews;
  	let FormStart;
  	if (children.length) {
  		FormViews = children.map(View => {
  			return () => (
  				<Route path={View.props.route} render={() => <View/>}/>
  			)
  		})
  		FormStart = () => {
  			const Start = children[0]
  			return <Link to={Start.props.route}>Start&nbsp;&raquo;</Link>
  		}
  	} else {
  		console.log({children})
  	}
  	console.log(FormViews)
    return (
    	<HashRouter>
    		<form>
    			<Route exact path="#" render={() => (<FormStart/>)} />
    			{FormViews}
    		</form>
    	</HashRouter>
    );
  }
}

export default FormRouter;
