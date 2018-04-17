import React from 'react';
import { Table, Button } from 'reactstrap';
import TrashAlt from 'react-icons/lib/fa/trash';

const Tbody = (props) => {
  const data = props.data;
  // console.log(data);
  const listItems = data.map((row, i) =>
    <tr key={row.key}>
      <td>{i+1}</td>
      <td className="central">{row.val().linka}</td>
      <td>{row.val().trasa}</td>
      <td className="central">{row.val().diety_euro}</td>
      <td className="central">{row.val().handlink_kc}</td>
      <td className="central">{row.val().prijem_ridic_bruto}</td>
      <td className="central">
        <Button color="danger" size="sm" onClick={()=>props.onDelete(row.key)}>Smazat</Button>
      </td>
    </tr>
  );
  return listItems

}


const Summary = (props) => {
  const { sub3, sub2, sub1 } = props;
  return <tr className="bg-primary">
  <td colSpan="3" className="text-white">Součet</td>
  <td className="central text-white">{sub1}</td>
  <td className="central text-white">{sub2}</td>
  <td className="central text-white">{sub3}</td>
  <td className="central text-white"></td>
</tr>;
  
}

const Subtotal = (props) => {
  return <tr>
  <td  colSpan="5" className="text-success">Celkem</td>
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
                <th className="central">X</th>
              </tr>
            </thead>
            <tbody>
              <Tbody data={data} onDelete={onDeleteClick}/>
              <Summary sub1={totalDiets} sub2={totalHandling} sub3={totalBruto}/>
              {/* <Subtotal subtotal={totalHandling+totalBruto}/> */}
            </tbody>
          </Table>
        ) : (
            <p>Loading...</p>
          )}
      </div>
    );
  }
}