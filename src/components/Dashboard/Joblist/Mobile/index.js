import React from 'react';
import DeleteModalBox from '../delete-modal-box';
import Loader from 'react-loader';
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

const ListItems = (props) => {
    const { data, onDelete } = props;
// console.log();
    const items = data.map((trip, i) => {
        return (
        <ListGroupItem key={i} className="justify-content-between">
            {trancateTitle(trip.val().trasa)}<span className="float-right">
            <DeleteModalBox onDelete={()=>onDelete(trip.key)} trasa={trip.val().trasa} /></span>
        </ListGroupItem>
        )
    });

    return items;
}

function trancateTitle (title) {
    var length = 35;
    if (title.length > length) {
       title = title.substring(0, length)+'...';
    }
    return title;
}

export default class JoblistMobile extends React.Component {
	render() {
		const { data, totalBruto, onDeleteClick } = this.props;
		// console.log(data);
		return (
			<div>
				<p />
				<h3>Seznam přidělených tras</h3>
                <p />
				{data ? (
                    <div>
					<ListGroup>
                        <ListItems data={data} onDelete={onDeleteClick}/>
					</ListGroup>
                    <p />
                    <Alert className="right">Celkem bruto: {formatNumber(totalBruto)},-</Alert>
                    </div>
				) : (
						<Loader />
                    )}
                    <p />
			</div>
		);
	}
}