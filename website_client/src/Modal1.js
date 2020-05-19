import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactDOM from 'react-dom';
import history from './history';
class Modal1 extends React.Component {
  state = { open: false };
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
      <Modal
        open={open}
        onClose={() => {
          this.onCloseModal();
          history.goBack();
        }}
        center
        blockScroll={false}
      >
        <div className="container-fluid">
          <div className="modal-body">
            <div
              className="row d-flex"
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              {this.props.upperPart()}
            </div>
            <hr />
            <div
              className="row d-flex"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              {this.props.lowerPart()}
            </div>
          </div>
        </div>
      </Modal>,
      document.querySelector(this.props.domNode)
    );
  }
}
export default Modal1;
