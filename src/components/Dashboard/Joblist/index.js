import React from 'react';
import { Table } from 'reactstrap';

const Tbody = (props) => {
  const data = props.data;
  //console.log(data);
  const listItems = data.map((row, i) =>
    <tr key={i}>
      <td>{i+1}</td>
      <td className="central">{row.trip.linka}</td>
      <td>{row.trip.trasa}</td>
      <td className="central">{row.trip.diety_euro}</td>
      <td className="central">{row.trip.handlink_kc}</td>
      <td className="central">{row.trip.prijem_ridic_bruto}</td>
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
</tr>;
  
}

const Subtotal = (props) => {
  const { sub3, sub2, sub1 } = props;
  return <tr>
  <td  colSpan="5" className="text-success">Celkem</td>
  <td className="central text-success">{props.subtotal}</td>
</tr>;
  
}


export default class Joblist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, totalBruto, totalHandling, totalDiets } = this.props;
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
              </tr>
            </thead>
            <tbody>
              <Tbody data={data} />
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