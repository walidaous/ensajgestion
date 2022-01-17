/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
import axios, {Axios} from "axios";
import {Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Row} from "reactstrap";

function Bloc() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');
    const postData = () => {
        axios.post(`http://localhost:3000/blocs`, {
            name,


        })
    }
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {

    }, [])
    useEffect(() => {
        setInterval(() => {
            axios.get(`http://localhost:3000/blocs`)
                .then((response) => {
                    setAPIData(response.data);
                    console.log(APIData);
                })
        }, 1000);

    }, [])
    const onDelete = (id) => {
        axios.delete(`http://localhost:3000/blocs/${id}`).then(console.log(APIData));

    }

    function test() {
        console.log(APIData);

    }

    return (
        <>
            <Card>
            <div class="container ">
                <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                    <div class="row ">

                        <div class="col-sm-3 mt-5 mb-4 text-gred">
                            <div className="search">
                                <form class="form-inline">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search Student" aria-label="Search"/>

                                </form>
                            </div>
                        </div>
                        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Bloc Details</b></h2></div>
                        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                            <Button variant="primary" onClick={handleShow}>
                                Add New bloc
                            </Button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive " >
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>University </th>
                                    <th>name</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {APIData.map((data, key) => {
                                    return (
                                        <tr>
                                            <td>{key}</td>
                                            <td>Ensaj</td>
                                            <td>{data.name}</td>

                                            <  td>
                                                <Button variant="info" onClick={test}>update</Button>
                                                <Button variant="danger"  onClick={() => onDelete(data._id)}>delete</Button></td>
                                        </tr>

                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* <!--- Model Box ---> */}
                    <div className="model_box">
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add Record</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div class="form-group">
                                        <input
                                            defaultValue="ENSAJ"
                                            disabled
                                            placeholder="Company"
                                            type="text"
                                        />
                                    </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Bloc name</label>
                                            <input type="text" className="form-control"  placeholder=' Name' onChange={(e) => setName(e.target.value)}
                                                   id="name"
                                                   name="name"
                                                   placeholder="name"
                                                   type="text"
                                            />
                                                                       </div>
                                    <button type="submit" class="btn btn-success mt-4" onClick={ postData}>Add Record</button>
                                </form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>

                            </Modal.Footer>
                        </Modal>

                        {/* Model Box Finsihs */}
                    </div>
                </div>
            </div>
            </Card>
        </>

    );
}

export default Bloc;