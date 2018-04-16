import React from 'react';
import Select from 'react-select';
import Navigation from '../Navbar';
import Joblist from './Joblist';
import { checkAuth } from '../../services/fireAuth';
import { db, firebase } from '../../firebase';
import { Container, Button, Row, Col } from "reactstrap";
import 'react-select/dist/react-select.css';
import './dashboard.css'

class Dashboard extends React.Component {
    state = {
        selectedOption: '',
        trips: [],
        userTrips: null
    }

    componentWillMount() {
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

    getUsersTrips = () => {
        const userId = JSON.parse(localStorage.getItem('user')).uid;
        db.getDriversTrips(userId).on('value', snap => {
            let userTrips = [];
            // trip = snap.val();
            // trip.id = tripId;
            // userTrips = snap.val();
            snap.forEach((trip) => {
                // let value = { label: trip.val().trasa, value: i };
                //console.log(trip.val());
                userTrips.push(trip.val());
                // i++;
            });
            this.setState({ userTrips });
        });
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
            <div className="">
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
                            <Col>
                                <Button color="primary" onClick={this.onAddButtonPress} >Přidat</Button>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Joblist data={this.state.userTrips}/>
                    </Container>
                </Navigation>
            </div>
        );
    }
}

export default Dashboard;
