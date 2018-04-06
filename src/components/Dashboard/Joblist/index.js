import React from 'react';
import { Table } from 'reactstrap';

const Tbody = (props) => {
  const data = props.data;
  console.log(data);
  const listItems = data.map((row, i) =>
    <tr key={i}>
      <td>{row.trip.id}</td>
      <td>{row.trip.kod_inky}</td>
      <td>{row.trip.trasa}</td>
      <td>{row.trip.diety_euro}</td>
      <td>{row.trip.handling}</td>
      <td>{row.trip.handlink_kc}</td>
      <td>{row.trip.prijem_ridic_bruto}</td>
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
        <h3>Vaše trasy</h3>
        {data ? (
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Kód linky</th>
                <th>Trasa</th>
                <th>Diety Eur</th>
                <th>Handling</th>
                <th>Handling Kč</th>
                <th>Příjem Bruto</th>
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