import React, { Component } from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';

class App extends Component {
	state = {
		show: true
	};

  	render() {
	  	return (
			<div>
				<Layout>
					{this.state.show ?<BurgerBuilder/>:null }
				</Layout>
			</div>
		);
	}
}

export default App;
