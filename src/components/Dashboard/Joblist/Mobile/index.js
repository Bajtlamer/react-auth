import React from 'react';
import { Table } from 'reactstrap';
import Arrow from 'react-icons/lib/ti/arrow-down-thick';
import DeleteModalBox from '../delete-modal-box';
import Loader from 'react-loader';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { FaChevronRight } from 'react-icons/lib/fa';

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

const Subtotal = (props) => {
	return <tr>
		<td colSpan="5" className="text-success">Celkem</td>
		<td className="central text-success">{props.subtotal}</td>
	</tr>;
}

const ListItems = (props) => {
    const { data, onDelete } = props;
// console.log();
    const items = data.map((trip, i) => {
        return (
        <ListGroupItem key={i} className="justify-content-between">
            {trancateTitle(trip.val().trasa)}<span className="badge badge-default float-right">
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
		const { data, totalBruto, totalHandling, totalDiets, onDeleteClick } = this.props;
		// console.log(data);
		return (
			<div>
				<p />
				<h3>Seznam přidělených tras</h3>
                <p />
				{data ? (
					<ListGroup>
                        <ListItems data={data} onDelete={onDeleteClick}/>
					</ListGroup>
				) : (
						<Loader />
                    )}
                    <p />
			</div>
		);
	}
}