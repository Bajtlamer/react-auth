import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
		const { id } = this.props.match.params;
		console.log(id);
		return (
			<Container>
			<Navigation />
				<div>
                <Button color="danger" onClick={this.toggle}> Open Modal </Button>
                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
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
