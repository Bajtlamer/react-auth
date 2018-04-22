import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Alert, Popover, PopoverBody } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import { FaPlus } from 'react-icons/lib/fa';
import { FaEdit } from 'react-icons/lib/fa';
import { db } from '../../../../../firebase';


class NewModalBox extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props.data);
    this.state = {
      submitted: false,
      modal: false,
      popoverOpen: false,
      popoverAlert: null,
      changged: false,
    };

    this.getValue = this.getValue.bind(this);
    this.toggle = this.toggle.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.trip) {
      this.setState({
        diety_euro: this.props.trip.diety_euro,
        handling_kc: this.props.trip.handling_kc,
        linka: this.props.trip.linka,
        trasa: this.props.trip.trasa,
        prijem_ridic_bruto: this.props.trip.prijem_ridic_bruto,
      });
    }
  }

  PopoverAlert = (target, message) => {
    var msg = (!message) ? "Pole nesmí být prázdné." : message;
    const popoverAlert = <Popover placement="bottom" isOpen={true} target={target} toggle={this.togglePopover}><PopoverBody>{msg}</PopoverBody></Popover>
    // console.log('vytvarim alert pro '+target);
    this.setState({
      popoverAlert
    });
  }

  getValue(item) {
    // value={(!this.state.changged)? this.props.linka : this.state.linka}
    // console.log(typeof this.props.trip === 'undefined');
    // console.log(this.props.trip);  
    // return true;

    // 0 = NEW || 1 = EDIT
    if (this.props.mode === 1) {
      if (!this.state.changged && (typeof this.props.trip !== 'undefined')) {
        //this.state[item] = this.props.trip[item];
        return this.props.trip[item];
      } else {
        return this.state[item];
      }
    }
  }


  checkFieldsxxx = () => {
    var f = ['linka', 'handling_kc', 'diety_euro', 'prijem_ridic_bruto', 'trasa'];

    f.map(item => {
      if (!this.state[item] || typeof this.state[item] === 'undefined') {
        this.PopoverAlert(item);
        return false;
      } else { return null }
    });
  }

  togglePopover() {
    this.setState({
      popoverAlert: !this.state.popoverOpen,
      popoverOpen: !this.state.popoverOpen
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    // this.resetFormState();
  }

  handleChange(e) {
    const { name, value } = e.target;
    // console.log(name, value);
    // this.setState({ [name]: value, submitted: false, error: null });
    this.setState({ [name]: value, changged: true });
    this.togglePopover()
  }

  resetFormState = () => {
    this.setState({
      diety_euro: null,
      handling_kc: null,
      linka: null,
      trasa: null,
      prijem_ridic_bruto: null

    });
  }

  ulozit(trip, id) {
    // console.log('Ukladam...');
    db.addTrip(trip, id);

    this.toggle();
  }

  handleSubmit(e) {
    // console.log(e);
    // e.preventDefault();
    this.setState({ submitted: true });
    var f = ['trasa', 'prijem_ridic_bruto', 'diety_euro', 'handling_kc', 'linka'];
    var c = ['prijem_ridic_bruto', 'diety_euro', 'handling_kc'];

    var result = f.map((item) => {
      if (!e.state[item] || e.state[item] === 'undefined') {
        this.PopoverAlert(item);
        return true;
      } else {
        if (c.find(n => { return n === item })) {
          if (isNaN(Number(e.state[item]))) {
            this.PopoverAlert(item, 'Je vyžadováno číslo!');
            return true;
          }
        } else {
          return null
        }
      }
      return false;
    });

    var trip = {
      diety_euro: Number(e.state.diety_euro),
      handling_kc: Number(e.state.handling_kc),
      linka: e.state.linka,
      trasa: e.state.trasa,
      prijem_ridic_bruto: Number(e.state.prijem_ridic_bruto),
    }

    var id = new Date().getTime();
    if (result.find(val => { return val === true })) {
      // console.log('Nemuzu...');
    } else {
      if (this.props.mode === 1) {
        this.props.onUpdate(trip, this.props.trip.key);
        this.toggle();
      } else {
        this.ulozit(trip, id);
        this.resetFormState();
      }
      // return true;
    }

    // db.addTrip(trip, id);
  }


  render() {
    const style = { cursor: 'hand', color: 'darkblue' };
    return (
      <div>
        {this.props.mode === 1 ?
          (
            <FaEdit size={18} style={style} onClick={this.toggle} data-tip="Upravit záznam" data-for='edit' />
          ) : (
            <Button className="float-right" color="danger" onClick={this.toggle}><FaPlus />&nbsp;Nová</Button>
          )}

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.mode === 1 ? 'Editace trasy' : 'Nová trasa'}</ModalHeader>
          <ModalBody>
            {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
            <FormGroup>
              <Label for="linka">Linka</Label>
              <Input type="text" name="linka" id="linka" value={this.getValue('linka')} placeholder="linka..." onChange={this.handleChange} />
            </FormGroup>
            {this.state.submitted && this.state.popoverAlert &&
              this.state.popoverAlert
            }
            <FormGroup>
              <Label for="handling_kc">Handling Kč</Label>
              <Input type="text" name="handling_kc" id="handling_kc" value={this.getValue('handling_kc')} placeholder="0.00" onChange={this.handleChange} />
            </FormGroup>
            {this.state.submitted && this.state.popoverAlert &&
              this.state.popoverAlert
            }
            <FormGroup>
              <Label for="diety_euro">Diety Eur</Label>
              <Input type="text" name="diety_euro" id="diety_euro" value={this.getValue('diety_euro')} placeholder="0.00" onChange={this.handleChange} />
            </FormGroup>
            {this.state.submitted && this.state.popoverAlert &&
              this.state.popoverAlert
            }
            <FormGroup>
              <Label for="prijem_ridic_bruto">Příjem řidič BRUTO</Label>
              <Input type="text" name="prijem_ridic_bruto" id="prijem_ridic_bruto" value={this.getValue('prijem_ridic_bruto')} placeholder="0.00" onChange={this.handleChange} />
            </FormGroup>
            {this.state.submitted && this.state.popoverAlert &&
              this.state.popoverAlert
            }
            <FormGroup>
              <Label for="trasa">Trasa</Label>
              <Input type="textarea" name="trasa" id="trasa" value={this.getValue('trasa')} placeholder="Trasa z do..." onChange={this.handleChange} />
            </FormGroup>
            {this.state.submitted && this.state.popoverAlert &&
              this.state.popoverAlert
            }
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="primary" onClick={() => this.handleSubmit(this)}>Uložit</Button>{' '}
            <Button size="sm" color="secondary" onClick={this.toggle}>Zavřít</Button>
          </ModalFooter>
        </Modal>
        <ReactTooltip place="left" id='edit' effect='solid' delayShow={1000} />
      </div>
    );
  }
}

export default NewModalBox;