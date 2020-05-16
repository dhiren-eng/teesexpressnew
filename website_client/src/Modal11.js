import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import history from './history';
class Modal11 extends React.Component {
  state = {
    open: false,
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    this.onOpenModal();
  }

  render() {
    const { open } = this.state;
    return ReactDOM.createPortal(
      <div className="container-fluid">
        <div className="modal-body">
          <Modal
            open={open}
            onClose={() => {
              this.onCloseModal();
              history.goBack();
            }}
            center
          >
            {this.props.modalContent()}
          </Modal>
        </div>
      </div>,
      document.querySelector('#newModal')
    );
  }
}
export default Modal11;
