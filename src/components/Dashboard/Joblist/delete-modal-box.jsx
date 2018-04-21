import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Delete from 'react-icons/lib/ti/delete';
import ReactTooltip from 'react-tooltip';

// import ModalBox from 'modalbox';

class DeleteModalBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onDelete = () => {
    this.props.onDelete();
    this.toggle();
  }

  render() {
      const { trasa } = this.props;
      const style = { cursor: 'hand', color: 'red' };
    return (
      <div>
        <Delete size={26} style={style} onClick={this.toggle} data-tip="Smazat záznam" data-for='delete'/>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Mazání záznamu</ModalHeader>
          <ModalBody>
            Opravdu si přejete smazat vybranou trasu "{trasa}" ?
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="primary" onClick={this.onDelete}>Smazat</Button>{' '}
            <Button size="sm" color="secondary" onClick={this.toggle}>Storno</Button>
          </ModalFooter>
        </Modal>
        <ReactTooltip place="left" id='delete' effect='solid' delayShow={1000}/>
      </div>
    );
  }
}

export default DeleteModalBox;