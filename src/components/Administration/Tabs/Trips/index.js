import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { db } from '../../../../firebase';
import Loader from 'react-loader';
import DeleteModalBox from '../../../Dashboard/Joblist/delete-modal-box';
import paginationFactory from 'react-bootstrap-table2-paginator';
import NewModalBox from './NewModalBox';

const DeleteButton = (cell, row, rowIndex, formatExtraData) => {
    return (
        <DeleteModalBox onDelete={() => formatExtraData.onDelete(row.key)} trasa={row.trasa} />
    );
}

const EditButton = (cell, row, rowIndex, formatExtraData) => {
    // console.log(row);
    return (
        <NewModalBox onUpdate={formatExtraData.onUpdate} trip={row} mode={1}/>
    );
}

export default class Table extends React.Component {

    state = {
        trips: null
    }

    onDeleteButtonClick = (id) => {
        db.deleteTripTemplate(id).remove(err => {
            if (err) {
                console.log(err);
            }
        });
    }

    onUpdateButtonClick = (trip, id) => {
        db.updateTrip(trip, id);
        // console.log(id);
        // console.log(trip);
    }

    componentDidMount() {
        this.getTrips();
    }

    getTrips = () => {
        db.getTrips().on('value', snap => {
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



    render() {
        const onDelete = this.onDeleteButtonClick;
        const onUpdate = this.onUpdateButtonClick;
        const columns = [{
            dataField: 'linka',
            text: 'Linka',
            align: 'center',
            headerAlign: 'center',
        }, {
            dataField: 'trasa',
            text: 'Trasa'
        }, {
            dataField: 'handling_kc',
            text: 'Handling Kč',
            align: 'center',
            headerAlign: 'center',
        }, {
            dataField: 'diety_euro',
            text: 'Diety EUR',
            align: 'center',
            headerAlign: 'center',
        }, {
            dataField: 'prijem_ridic_bruto',
            text: 'Příjem BRUTO',
            align: 'center',
            headerAlign: 'center',
        }, {
            dataField: 'upravit',
            text: 'upravit',
            headerAlign: 'center',
            formatter: EditButton,
            formatExtraData: {
                onUpdate
            },
            style: {
                "textAlign": 'center'
            },
        }, {
            dataField: 'smazat',
            text: 'X',
            headerAlign: 'center',
            formatter: DeleteButton,
            formatExtraData: {
                onDelete
            },
            style: {
                "textAlign": 'center'
            },

        }];

        const options = {
            paginationSize: 5,
            pageStartIndex: 1,
            // alwaysShowAllBtns: true,
            // withFirstAndLast: false,
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true,
            firstPageText: 'První',
            prePageText: 'Předchozí',
            nextPageText: 'Další',
            lastPageText: 'Poslední',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            sizePerPageList: [{
                text: '10', value: 10
            }]
        };

        return (
            (this.state.trips ? (
                <BootstrapTable
                    keyField='key'
                    data={this.state.trips}
                    columns={columns}
                    pagination={paginationFactory(options)} />
            ) : (
                    <Loader scale={0.50} />
                )
            )
        )
    }
}