import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Navigation from './Navbar';
import { checkAuth } from '../services/fireAuth';
import { db, firebase } from '../firebase';
import {
    Container, Button, Row, Col
} from "reactstrap";
import './dashboard.css'

class Dashboard extends React.Component {
    state = {
        selectedOption: '',
        trips: null
    }

    componentWillMount() {
        this.getTrips();
    }

    getTrips = () => {
        var commentsRef = firebase.db.ref('/trips');
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
        return true;
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        if (selectedOption) {
            console.log(`Selected: ${selectedOption.value}`);
        }
    }

    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

        return (
            <div className="navigation">
                <Navigation isLogged={checkAuth()} >
                    <Container className="dashboard">
                        <h1 className="display-4 text-center">Dashboard</h1>
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
                                <Button color="primary">Přidat</Button>
                            </Col>
                        </Row>
                    </Container>
                </Navigation>
            </div>
        );
    }
}

export default Dashboard;
