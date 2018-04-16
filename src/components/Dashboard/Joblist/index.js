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

export default class Joblist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
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
            </tbody>
          </Table>
        ) : (
            <p>Loading...</p>
          )}
      </div>
    );
  }
}