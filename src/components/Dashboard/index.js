import React from 'react';
import Select from 'react-select';
import Navigation from '../Navbar';
import Joblist from './Joblist';
import { checkAuth } from '../../services/fireAuth';
import { db, firebase } from '../../firebase';
import { Container, Button, Row, Col } from "reactstrap";
import MonthBox from "../monthbox";
import 'react-select/dist/react-select.css';
import './dashboard.css'

class Dashboard extends React.Component {
    state = {
        selectedOption: '',
        trips: [],
        month: null,
        userTrips: null,
        totalBruto: 0,
        totalHandling: 0,
        totalDiets: 0
    }

    componentWillMount() {
        this.getCurrentMonth();
        this.getTrips();
        this.getUsersTrips();
    }

    getTrips = () => {
        // var commentsRef = firebase.db.ref('/trips');
        db.getTrips().then((snap) => {
            let trips = [];
            let i = 0;

            snap.forEach((trip) => {
                let value = { label: trip.val().trasa, value: i };
                trips.push(value);
                i++;
            });
            this.setState({ trips });
        });
    }

    onAddButtonPress = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const tripId = this.state.selectedOption.value;
        let trip = null;
        db.getTripById(tripId).then(snap => {
            trip = snap.val();
            trip.id = tripId;
            // console.log(trip);
            // this.setState({trip});
            db.addTripToUser(user.uid, 4, trip);
        });
        // console.log(this.state.trip);
        // let trip = this.state.trip;
            // trip.id = tripId;
        // console.log(user);
    }

    getUsersTrips = (month) => {
        const userId = JSON.parse(localStorage.getItem('user')).uid;
        db.getDriversTrips(userId).on('value', snap => {
            let userTrips = [];
            // trip = snap.val();
            // trip.id = tripId;
            // userTrips = snap.val();
            var totalBruto = 0;
            var totalHandling = 0;
            var totalDiets = 0;
            snap.forEach((trip) => {
                // let value = { label: trip.val().trasa, value: i };
                //console.log(trip.val());
                // snap.forEach(function(item) {console.log(item.val().trip.prijem_ridic_bruto);
                //     totalBruto += item.val().trip.prijem_ridic_bruto;
                //  });
                // console.log(trip.val().trip.prijem_ridic_bruto);
                 totalBruto += trip.val().trip.prijem_ridic_bruto;
                 totalHandling += trip.val().trip.handlink_kc;
                 totalDiets += trip.val().trip.diety_euro;
                //  console.log(totalHandling);
                //  console.log(trip.val().trip.handling);

                userTrips.push(trip.val());
                // i++;
            });
            this.setState({ userTrips, totalBruto, totalHandling, totalDiets });
        });
    }

    getCurrentMonth () {
        if(this.state.month){
            return this.state.month;
        }else{
            var d = new Date();
            var month = d.getMonth();
                month=month+1;
        }
        this.setState({month});
        // return n+1;
    }
    
    onMonthChange = (month) => {
        this.setState({ month });
        this.getUsersTrips(month);
		console.log('Boolean Select value changed to', month);
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        if (selectedOption) {
            // console.log(`Selected: ${selectedOption.value}`);
        }
    }

    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

        return (
            <div>
                <Navigation isLogged={checkAuth()} >
                    <Container className="dashboard">
                        <h1 className="display-4 text-center">Panel řidiče</h1>
                    </Container>
                    <Container>
                        <Row>
                            <Col>
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
                            </Col>
                            <Col className="col-md-2">
                                <MonthBox onChanged={()=>this.onMonthChange} month={this.state.month}/>
                            </Col>
                            <Col>
                                <Button color="primary" onClick={this.onAddButtonPress} >Přidat</Button>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Joblist 
                            data={this.state.userTrips} 
                            totalBruto={this.state.totalBruto} 
                            totalHandling={this.state.totalHandling}
                            totalDiets={this.state.totalDiets}
                            />
                    </Container>
                </Navigation>
            </div>
        );
    }
}

export default Dashboard;
