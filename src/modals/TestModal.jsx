import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';

function TestModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
      setModalIsOpen(true);
    }
  
    function closeModal() {
      setModalIsOpen(false);
    }


  return (
    <div>
        {/* <Hero /> */}
    <button onClick={openModal}>Open Modal</button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
     
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          color: 'blue'
        }
      }}
    contentLabel='Example Modal'
      >
        <h2>Modal Title</h2>
        <button onClick={closeModal}>Close</button>
        <div>Modal Content</div>
      </Modal>
    </div>
  )
}

export default TestModal