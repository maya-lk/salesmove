import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setItemModalToggle } from '../../redux/advertisements/advertisements.actions';
import { selectItemModalToggle , selectClickedItem } from '../../redux/advertisements/advertisements.selectors';

import ModalItem from '../modal-item/modal-item.component';

import './item-modal-overview.styles.scss';

const ItemModalOverview = ({ toggleItemModal , setItemModalToggle , clickedItem }) => (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={toggleItemModal} 
      onHide={setItemModalToggle} 
      className="itemModalOverview"
    >
      <Modal.Header closeButton>
        <Modal.Title>{clickedItem.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalItem />
      </Modal.Body>
    </Modal>
);

const mapStateToProps = createStructuredSelector({
  toggleItemModal : selectItemModalToggle,
  clickedItem : selectClickedItem
});

const mapDispatchToProps = dispatch => ({
  setItemModalToggle : () => dispatch(setItemModalToggle())
});

export default connect(mapStateToProps , mapDispatchToProps)(ItemModalOverview);