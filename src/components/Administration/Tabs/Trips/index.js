import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { db } from '../../../../firebase';
import Loader from 'react-loader';
import Delete from 'react-icons/lib/ti/delete';
import FaTrashO from 'react-icons/lib/fa';

const xxx = ()=><FaTrashO />

const DeleteButton = (cell, row, rowIndex, formatExtraData) => {
    const style = { cursor: 'hand', color: 'red' };
    return (
        <Delete size={26} style={style} onClick={this.toggle} data-tip="Smazat záznam" data-for='delete'/>
    );
  }

export default class Table extends React.Component {

    constructor(props){
        super(props);

    }
    state = {
        trips: null
    }

    componentDidMount () {
        this.getTrips();
    }

    getTrips = () => {
        db.getTrips().then((snap) => {
            let trips = [];

            snap.forEach((trip) => {
                let _trip = trip.val();
                    _trip.key = trip.key;
                trips.push(_trip);
            });
            this.setState({ trips });
        });
        return this.state.trips;
    }

    

    render (){
        const columns = [{
            dataField: 'linka',
            text: 'Linka'
          }, {
            dataField: 'trasa',
            text: 'Trasa'
        }, {
            dataField: 'handlink_kc',
            text: 'Handling Kč'
        }, {
            dataField: 'diety_euro',
            text: 'Diety EUR'
        }, {
            dataField: 'prijem_ridic_bruto',
            text: 'Příjem BRUTO'
        }, {
            dataField: 'smazat',
            text: 'X',
            headerAlign: 'center',
            formatter: DeleteButton,
            style: {
                "textAlign":'center'
              },
            
        }];


        return (
            (this.state.trips ? 
            (<BootstrapTable keyField='key' data={ this.state.trips } columns={ columns } />)
            :(<Loader scale={0.50} />)
            )
        )
    }
}