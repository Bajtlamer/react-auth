import React from 'react';
import { Table } from 'reactstrap';
import Delete from 'react-icons/lib/ti/delete';
import Arrow from 'react-icons/lib/ti/arrow-down-thick';
import DeleteModalBox from './delete-modal-box';

const Tbody = (props) => {
	const data = props.data;
	const style = { cursor: 'hand', color: 'red' };

	
	const BodyRow = (props) => {
		const { row, index, onDelete } = props;
		// const bt = <Delete size={26} style={style} onClick={()=>this.toggle} />;
		return (
			<tr key={index}>
				<td>{index + 1}</td>
				<td className="central">{row.linka}</td>
				<td>{row.trasa}</td>
				<td className="central">{row.diety_euro}</td>
				<td className="central">{row.handlink_kc}</td>
				<td className="central">{row.prijem_ridic_bruto}</td>
				<td className="central">
					{/* <Delete size={26} style={style} onClick={onDelete} /> */}
					<DeleteModalBox onDelete={onDelete} trasa={row.trasa}/>
				</td>
			</tr>
		);
	}
	const TableRows = data.map((row, i) =>
		<BodyRow key={i} row={row.val()} index={i} onDelete={() => props.onDelete(row.key)} />
	);
	return TableRows

}

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

const Summary = (props) => {
	const { sub3, sub2, sub1 } = props;
	return <tr className="bg-primary">
		<td colSpan="3" className="text-white">Součet</td>
		<td className="central text-white">{formatNumber(sub1)},-</td>
		<td className="central text-white">{formatNumber(sub2)},-</td>
		<td className="central text-white">{formatNumber(sub3)},-</td>
		<td className="central text-white"></td>
	</tr>;

}

const Subtotal = (props) => {
	return <tr>
		<td colSpan="5" className="text-success">Celkem</td>
		<td className="central text-success">{props.subtotal}</td>
	</tr>;

}


export default class Joblist extends React.Component {
	render() {
		const { data, totalBruto, totalHandling, totalDiets, onDeleteClick } = this.props;
		// console.log(data);
		return (
			<div>
				<br />
				<h3>Seznam přidělených tras</h3>
				{data ? (
					<Table responsive>
						<thead>
							<tr>
								<th>#</th>
								<th className="central">Linka</th>
								<th>Trasa</th>
								<th className="central">Diety Eur</th>
								<th className="central">Handling Kč</th>
								<th className="central">Příjem Bruto</th>
								<th className="central"><Arrow size={26} /></th>
							</tr>
						</thead>
						<tbody>
							<Tbody data={data} onDelete={onDeleteClick} />
							<Summary sub1={totalDiets} sub2={totalHandling} sub3={totalBruto} />
							{/* <Subtotal subtotal={totalHandling+totalBruto}/> */}
						</tbody>
					</Table>
				) : (
						<p>Načítání...</p>
					)}
			</div>
		);
	}
}