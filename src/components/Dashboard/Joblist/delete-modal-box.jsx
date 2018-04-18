import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Delete from 'react-icons/lib/ti/delete';
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

  render() {
      const { onDelete, trasa } = this.props;
      const style = { cursor: 'hand', color: 'red' };
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        <Delete size={26} style={style} onClick={this.toggle} />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Mazání záznamu</ModalHeader>
          <ModalBody>
            Opravdu si přejete smazat vybranou trasu "{trasa}" ?
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="primary" onClick={onDelete}>Smazat</Button>{' '}
            <Button size="sm" color="secondary" onClick={this.toggle}>Storno</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteModalBox;