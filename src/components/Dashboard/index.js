import React from 'react';
import Select from 'react-select';
import Navigation from '../Navbar';
import Joblist from './Joblist';
import { checkAuth } from '../../services/fireAuth';
import { db } from '../../firebase';
import { Container, Button, Row, Col } from "reactstrap";
import MonthBox from "../monthbox";
import { CSVLink, CSVDownload } from 'react-csv';
import DownloadIcon from 'react-icons/lib/ti/download-outline';
import 'react-select/dist/react-select.css';
import './dashboard.css'



const DownlodAsCsv = (props) => {
    const { data } = props;
    let arr = [];
    const array = data.map((row) => {
        arr.push(row.val())

    });
    return <CSVLink data={arr} separator={";"}><DownloadIcon size={20}/>Uložit jako CSV soubor</CSVLink>;
}


class Dashboard extends React.Component {
    state = {
        selectedOption: '',
        trips: [],
        month: null,
        year: null,
        userTrips: null,
        totalBruto: 0,
        totalHandling: 0,
        totalDiets: 0
    }

    componentWillMount() {
        this.getCurrentYear();
        // this.getCurrentMonth();
        this.getTrips();
        this.getUsersTrips(this.getCurrentMonth());
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

    onDeleteButtonClick = (key) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { year, month } = this.state;

        db.removeDriversTrips(user.uid, month, year, key).remove(err => {
            if(err){
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
                 totalBruto += trip.val().prijem_ridic_bruto;
                 totalHandling += trip.val().handlink_kc;
                 totalDiets += trip.val().diety_euro;
                
                userTrips.push(trip);
                // console.log(trip.key);
            });
            this.setState({ userTrips, totalBruto, totalHandling, totalDiets });
        });
    }

    getCurrentYear () {
        if(this.state.year){
            return this.state.year;
        }else{
            var d = new Date();
            var year = d.getFullYear();
        }
        this.setState({year});
        return year;
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
        return month;
    }
    
    onMonthChange = (month) => {
        if(!month){
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
                            onDeleteClick={this.onDeleteButtonClick}
                            />
                    </Container>
                    <Container>
                        {this.state.userTrips ? <DownlodAsCsv data={this.state.userTrips} />:''}
                    </Container>
                </Navigation>
            </div>
        );
    }
}

export default Dashboard;
