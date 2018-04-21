import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import TripsComponent from './Trips';

import NewModalBox from './Trips/NewModalBox';

export default class AdminTabs extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1'
		};
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	render() {
		return (
			<div className="tabs">
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '1' })}
							onClick={() => { this.toggle('1'); }}
						>
							Definice tras
            </NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '2' })}
							onClick={() => { this.toggle('2'); }}
						>
							Uživatelé
            </NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<Row>
							<Col sm="12">
								<Row>
									<Col sm="11">
										<h4>SEZNAM TRAS</h4>
									</Col>
									<Col sm="1">
										<NewModalBox onSaveclick={this.onSaveclick} />
										{/* <Button className="float-right" color="danger" onClick={()=>this.NewForm}><FaPlus />&nbsp;Nová</Button> */}
									</Col>
								</Row>
								<p />
								<TripsComponent />
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="2">
						<Row>
							<Col sm="6">
								<Card body>
									<CardTitle>Special Title Treatment</CardTitle>
									<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
									<Button>Go somewhere</Button>
								</Card>
							</Col>
							<Col sm="6">
								<Card body>
									<CardTitle>Special Title Treatment</CardTitle>
									<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
									<Button>Go somewhere</Button>
								</Card>
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</div>
		);
	}
}