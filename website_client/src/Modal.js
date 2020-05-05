import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-responsive-modal';
const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      className="modal fade"
      id="Modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <button
            type="button"
            className="close ml-auto"
            data-dismiss="modal"
            aria-label="Close"
            style={{ padding: '5px' }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="container-fluid">
            <div
              className="row d-flex"
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <div className="col-xs-10">{props.upperPart()}</div>
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
              <div className="col-xs-10">{props.lowerPart()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};
export default Modal;
