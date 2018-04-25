import React from 'react';
import Select from 'react-select';
import Navigation from '../Navbar';
import Joblist from './Joblist';
import JoblistMobile from './Joblist/Mobile';
import { checkAuth } from '../../services/fireAuth';
import { db } from '../../firebase';
import { Container, Button, Row, Col, Jumbotron } from "reactstrap";
import MonthBox from "../monthbox";
import { CSVLink } from 'react-csv';
import { FaCloudDownload } from 'react-icons/lib/fa';
import { isMobile } from "react-device-detect";
import Loader from 'react-loader';

import 'react-select/dist/react-select.css';
import './dashboard.css'



const DownlodAsCsv = (props) => {
	const { data, year, month, user } = props;
	const filename = user.email.split('@')[0] + '-' + month + '-' + year + ".csv";
	let arr = [];

	data.map((row) => {
		arr.push(row.val())
		return true;
	});

	return <CSVLink data={arr} separator={";"} className="dlink" filename={filename}><FaCloudDownload size={24} />&nbsp;Uložit do souboru CSV</CSVLink>;
}


class Dashboard extends React.Component {
	state = {
		selectedOption: '',
		trips: [],
		month: null,
		year: null,
		error: null,
		user: null,
		userTrips: null,
		totalBruto: 0,
		totalHandling: 0,
		totalDiets: 0
	}

	componentWillMount() {
		const user = JSON.parse(localStorage.getItem('user'));

		this.setState({ user });
		this.getCurrentYear();
		// this.getCurrentMonth();
		this.getTrips();
		this.getUsersTrips(this.getCurrentMonth());
	}

	getTrips = () => {
		db.getTrips().on('value', snap => {
			let trips = [];

			snap.forEach((trip) => {
				let value = { label: trip.val().trasa, value: trip.key };
				trips.push(value);
			});
			this.setState({ trips });
		});
	}

	onDeleteButtonClick = (key) => {
		const user = JSON.parse(localStorage.getItem('user'));
		const { year, month } = this.state;

		db.removeDriversTrips(user.uid, month, year, key).remove(err => {
			if (err) {
				console.log(err);
			}
		});
	}

	onAddButtonPress = () => {
		const user = JSON.parse(localStorage.getItem('user'));
		const tripId = this.state.selectedOption.value;
		const { year, month } = this.state;
		let trip = null;

		db.getTripById(tripId).then(snap => {
			trip = snap.val();
			db.addTripToUser(user.uid, month, year, trip);
		}).then(err => {
			// console.log(err);
		});
	}

	getUsersTrips = (month) => {
		const userId = JSON.parse(localStorage.getItem('user')).uid;
		const year = this.getCurrentYear();

		db.getDriversTrips(userId, month, year).on('value', snap => {
			let userTrips = [];
			var totalBruto = 0;
			var totalHandling = 0;
			var totalDiets = 0;

			snap.forEach((trip) => {
				totalBruto += Number(trip.val().prijem_ridic_bruto);
				totalHandling += Number(trip.val().handling_kc);
				totalDiets += Number(trip.val().diety_euro);

				userTrips.push(trip);
				// console.log(trip.key);
			});
			this.setState({ userTrips, totalBruto, totalHandling, totalDiets });
		});
	}

	getCurrentYear() {
		if (this.state.year) {
			return this.state.year;
		} else {
			var d = new Date();
			var year = d.getFullYear();
		}
		this.setState({ year });
		return year;
	}

	getCurrentMonth() {
		if (this.state.month) {
			return this.state.month;
		} else {
			var d = new Date();
			var month = d.getMonth();
			month = month + 1;
		}
		this.setState({ month });
		return month;
	}

	onMonthChange = (month) => {
		if (!month) {
			month = this.getCurrentMonth();
		}
		this.setState({ month });
		this.getUsersTrips(month);
	}

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	}

	render() {
		const { selectedOption } = this.state;
		const value = selectedOption && selectedOption.value;

		return (
			<Navigation isLogged={checkAuth()} >
				<Container>
						<h1 className="display-4 text-center">Panel řidiče</h1>
						<p />
						<Container>{this.state.error}</Container>
						{this.state.userTrips ?
							<Container>
								<Row>
									<div className="col-sm-12 col-md-6 mt-2">
										{this.state.trips ?
											(<Select
												name="trip-list"
												value={value}
												onChange={this.handleChange}
												options={this.state.trips}
												placeholder="Vyberte trasu..." />
											) : (
												<p>Načítám...</p>
											)}
									</div>
									<div className="col-md-2 col-sm-4 mt-2">
										<MonthBox onChanged={() => this.onMonthChange} month={this.state.month} />
									</div>
									<div className="col mt-2">
										<Button color="primary" onClick={this.onAddButtonPress} >Přidat</Button>
									</div>
								</Row>
							</Container>
							:
							<Loader />}
						<Container>
							{isMobile ? <JoblistMobile data={this.state.userTrips} onDeleteClick={this.onDeleteButtonClick} totalBruto={this.state.totalBruto} /> :
								<Joblist
									data={this.state.userTrips}
									totalBruto={this.state.totalBruto}
									totalHandling={this.state.totalHandling}
									totalDiets={this.state.totalDiets}
									onDeleteClick={this.onDeleteButtonClick}
								/>
							}
						</Container>
						<Container>
							{this.state.userTrips ?
								<DownlodAsCsv
									data={this.state.userTrips}
									year={this.state.year}
									month={this.state.month}
									user={this.state.user}
								/> : ''}
						</Container>
				</Container>
			</Navigation>
		);
	}
}

export default Dashboard;
