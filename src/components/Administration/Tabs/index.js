import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Alert } from 'reactstrap';
import classnames from 'classnames';
import TripsComponent from './Trips';
import UserList from './Users';
import Loader from 'react-loader';
import NewModalBox from './Trips/NewModalBox';
import { isAdministrator } from '../../../services/fireAuth';

const NoTrustArea = () => {
	return (
		<TabContent tabs>
			<Alert color="danger">Nemáte oprávnění!</Alert>
		</TabContent>
	)
}

export default class AdminTabs extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
			isAdmin: null
		};
	}

	componentDidMount() {
		isAdministrator().then(isAdmin => {
			this.setState({ isAdmin });
		})
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	render() {
		if (this.state.isAdmin === null) {
			return <Loader />
		} else {
			return (
				this.state.isAdmin === true ?
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
												<NewModalBox mode={0} />
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
											<CardTitle>Seznam uživatelů</CardTitle>
											<UserList />
											<p />
											{/* <Button>Go somewhere</Button> */}
										</Card>
									</Col>
									<Col sm="6">
										<Card body>
											<CardTitle>Uživatelský profil</CardTitle>
											<CardText>Zde budou editovatelné informace o uživateli...</CardText>
											<Button>Zobrazit více</Button>
										</Card>
									</Col>
								</Row>
							</TabPane>
						</TabContent>
					</div>
					:
					<NoTrustArea />
			);
		}
	}
}