import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactDOM from 'react-dom';
import history from './history';
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
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
        <LoadingOverlay
          active={this.props.isLoading}
          spinner
          text="Signing In..."
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
        </LoadingOverlay>
      </Modal>,
      document.querySelector(this.props.domNode)
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading.startLoad,
  };
};
export default connect(mapStateToProps)(Modal1);
