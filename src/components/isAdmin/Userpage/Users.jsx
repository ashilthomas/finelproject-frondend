
import axios from "axios";

import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const [users, setUsers] = useState([]);

  const mensProduct = useSelector((state) => state.products.products);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users", {
          withCredentials: true,
        });
        setUsers(res.data.users);
      } catch (error) {
        toast(error.responce.message);
      }
    };
    getAllUsers();
  }, []);


 

  return (
  
<>
 <div>
      <div>
        <ToastContainer />
        <Row>
          <Col className="">
            <Table  responsive style={{marginBottom:'none'}}>
              <thead className="table-header">
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>
                    Active
                  </th>
                
                </tr>
              </thead>
              <tbody className="bg-dark">
                {users &&
                  users.map((v, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{v.fullname}</td>
                      <td>{v.email}</td>
                      <td>{v.users}</td>
                    <td><Button className="user-active">Active</Button></td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
    
      </div>

    </div>
</>

   
    
  );
}

export default Users;

