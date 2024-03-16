import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function Delete({ categoryId, allCategory }) {
  const [show, setShow] = useState(false);
//   const [editedCategory, setEditedCategory] = useState('');
//   const [categoryName, setCategoryName] = useState('');

  useEffect(() => {

    const editCategory = allCategory.find(val => val._id === categoryId);
    // if (editCategory) {
    //   setCategoryName(editCategory.name);
    // }
  }, [categoryId, allCategory]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    // const updatedCategory = {
    //   name: editedCategory
    // };


    
        axios.delete(`http://localhost:4000/update-category/${categoryId}`,) //updatedCategory

      .then(response => {
      
       // setCategoryName(editedCategory); // Update categoryName immediately after successful edit
        handleClose();
        if(response.data.success){
          toast.success(`  ${response.data.message}`)
        }
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });

  
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      Delete
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        {/* <Form style={{ padding: "50px" }}>
          <Form.Group className="mb-3">
            <Form.Label>Edit Category</Form.Label>
            <Form.Control
          
            value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              type="text"
            />
          </Form.Group>
        </Form> */}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default  Delete;

