import React from 'react';
import Select from 'react-select';

export default class MonthBox extends React.Component {

    state = {
        options: [
            { value: 1, label: 'Leden' },
            { value: 2, label: 'Únor' },
            { value: 3, label: 'Březen' },
            { value: 4, label: 'Duben' },
            { value: 5, label: 'Květen' },
            { value: 6, label: 'Červen' },
            { value: 7, label: 'Červenec' },
            { value: 8, label: 'Srpen' },
            { value: 9, label: 'Září' },
            { value: 10, label: 'Říjen' },
            { value: 11, label: 'Listopad' },
            { value: 12, label: 'Prosinec' },
        ],
        month: null
    }

	onChange = (month) => {
		this.setState({ month });
		// console.log('Boolean Select value changed to', month);
    }
    
	render () {
        const { month } = this.props;
		return (
			<div className="section">
				
				<Select
					onChange={this.props.onChanged(this.state.month)}
					options={this.state.options}
					simpleValue
                    value={month}
                    placeholder="Měsíc..."
					/>
			</div>
		);
	}
};
