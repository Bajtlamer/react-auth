import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Alert, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import Delete from 'react-icons/lib/ti/delete';
import ReactTooltip from 'react-tooltip';
import { FaPlus } from 'react-icons/lib/fa';
import { db } from '../../../../../firebase';


class NewModalBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      modal: false,
      popoverOpen: false,
      popoverAlert: null
    };

    this.toggle = this.toggle.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  PopoverAlert = (target) => {
    var msg = "Pole '" + target + "' nesmí být prázdné."
    const popoverAlert = <Popover placement="bottom" isOpen={true} target={target} toggle={this.togglePopover}><PopoverBody>{msg}</PopoverBody></Popover>

    this.setState({
      popoverAlert
    });
  }

  checkFields = () => {
    var f = ['linka', 'handling_kc', 'diety_euro', 'prijem_ridic_bruto', 'trasa'];
    var status = false;
    f.map(item => {
      if (!this.state[item] || this.state[item] === 'undefined') {
        // console.log(this.state[item]);
        this.PopoverAlert(item);
        return false;
      }
    });
  }

  togglePopover() {
    // this.setState({
    //   popoverOpen: !this.state.popoverOpen
    // });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, submitted: false, error: null });
    this.togglePopover()
  }

  ulozit = (trip, id) => {
    // console.log('Ukladam...');
    db.addTrip(trip, id);
    this.toggle();
  }

  handleSubmit(e) {
    this.setState({ submitted: true });
    var f = ['trasa', 'prijem_ridic_bruto', 'diety_euro', 'handling_kc', 'linka'];

    var result = f.map((item, ulozit) => {
      if (!this.state[item] || this.state[item] === 'undefined') {
        this.PopoverAlert(item);
        return true;
      }
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
      this.ulozit(trip, id);
    }

    // db.addTrip(trip, id);
  }

  render() {
    const { onSaveclick } = this.props;
    const style = { cursor: 'hand', color: 'red' };
    return (
      <div>
        <Button className="float-right" color="danger" onClick={this.toggle}><FaPlus />&nbsp;Nová</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Nová trasa</ModalHeader>
          <ModalBody>
            {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
            <FormGroup>
              <Label for="linka">Linka</Label>
              <Input type="text" name="linka" id="linka" placeholder="" onChange={this.handleChange} />
              {this.state.submitted && !this.state.linka &&
                this.state.popoverAlert
              }
            </FormGroup>
            <FormGroup>
              <Label for="handling_kc">Handling Kč</Label>
              <Input type="text" name="handling_kc" id="handling_kc" placeholder="0.00" onChange={this.handleChange} />
              {this.state.submitted && !this.state.handling_kc &&
                this.state.popoverAlert
              }
            </FormGroup>
            <FormGroup>
              <Label for="diety_euro">Diety Eur</Label>
              <Input type="text" name="diety_euro" id="diety_euro" placeholder="0.00" onChange={this.handleChange} />
              {this.state.submitted && !this.state.diety_euro &&
                this.state.popoverAlert
              }
            </FormGroup>
            <FormGroup>
              <Label for="prijem_ridic_bruto">Příjem řidič BRUTO</Label>
              <Input type="text" name="prijem_ridic_bruto" id="prijem_ridic_bruto" placeholder="0.00" onChange={this.handleChange} />
              {this.state.submitted && !this.state.prijem_ridic_bruto &&
                this.state.popoverAlert
              }
            </FormGroup>
            <FormGroup>
              <Label for="trasa">Trasa</Label>
              <Input type="textarea" name="trasa" id="trasa" placeholder="Trasa z do..." onChange={this.handleChange} />
              {this.state.submitted && !this.state.trasa &&
                this.state.popoverAlert
              }
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="primary" onClick={() => this.handleSubmit(this)}>Uložit</Button>{' '}
            <Button size="sm" color="secondary" onClick={this.toggle}>Zavřít</Button>
          </ModalFooter>
        </Modal>
        <ReactTooltip place="left" id='delete' effect='solid' delayShow={1000} />
      </div>
    );
  }
}

export default NewModalBox;