import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';

import Navigation from './Navbar';
import axios from 'axios';


const List = (props) => {
	const { sections } = props;
	// console.log(sections.length);
	let rows = <tr><td>Loading...</td></tr>;
	if(sections.length > 0){
		
	rows = sections.map((row) => (
				  <tr key={row.section_id}>
		            <th scope="row">{row.section_id}</th>
		            <td>{row.title}</td>
		            <td>{row.active}</td>
		            <td>{row.key}</td>
		            <td>{row.Description}</td>
		          </tr>

			));
	}
	return (rows);
}


class Sections extends Component {
	constructor(props) {
		super(props);

		this.fetchUrl = 'http://bajt.rrsoft.cz/api/sections/';
		this.state = {
			sections: [],
			error: ''
		};


	}

	componentWillMount() {
		axios.get(this.fetchUrl)
		.then(res => {
			const sections = res.data;
				setTimeout(function(){
				this.setState({
					sections
				})
			}.bind(this), 500);
		}).catch(err => {
			this.setState({ 
				error: err.message, 
			});
		})

  	}


	render() {
		return (
			<Container>
			<Navigation />
			<h1>Sections</h1>
			<Table>
		        <thead>
		          <tr>
		            <th>ID</th>
		            <th>Section title</th>
		            <th>Is Active</th>
		            <th>Section Key</th>
		            <th>Description</th>
		          </tr>
		        </thead>
		        <tbody>
		        <List sections={this.state.sections} />
		        </tbody>
		      </Table>
      		</Container>
		)
	}
}

export default Sections;
