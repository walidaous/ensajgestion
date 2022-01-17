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
        axios.post(`https://gestionsalles.herokuapp.com/blocs`, {
            name,


        })
    }
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {

    }, [])
    useEffect(() => {
        setInterval(() => {
            axios.get(`https://gestionsalles.herokuapp.com/blocs`)
                .then((response) => {
                    setAPIData(response.data);
                    console.log(APIData);
                })
        }, 1000);

    }, [])
    const onDelete = (id) => {
        axios.delete(`https://gestionsalles.herokuapp.com/blocs/${id}`).then(console.log(APIData));

    }

    function test() {
        console.log(APIData);

    }

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                  crossOrigin="anonymous"/>
            <div className="content">
                <Col md="12">
                    <Card>

                <div className="crud p-3 mb-5 mt-5 bg-body rounded">
                    <div className="row ">
                        <div className=" center col-sm-5 offset-sm-4 text-gred" style={{color: "blue"}}><h2><b>Bloc Details</b></h2></div>
                    </div>
                    <div class="row ">

                        <div class="col-sm-3 mt-5 mb-4 text-gred">
                            <div className="search">
                                <form class="form-inline">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search Bloc" aria-label="Search"/>

                                </form>
                            </div>
                        </div>
                        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}></div>
                        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                            <Button variant="primary" onClick={handleShow}>
                                Add New bloc
                            </Button>
                        </div>
                    </div>
                    <div class="row">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-light">
                                <tr>
                                    <th className="cell100 column1">#</th>
                                    <th className="cell100 column1">University </th>
                                    <th className="cell100 column1">name</th>
                                    <th className="cell100 column1">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {APIData.map((data, key) => {
                                    return (
                                        <tr>
                                            <td>{key}</td>
                                            <td>Ensaj</td>
                                            <td>{data.name}</td>

                                            <td>

                                                <a className="edit" title="Edit" data-toggle="tooltip"><i
                                                    className="material-icons" >&#xE254;</i></a>
                                                <a className="delete" title="Delete" data-toggle="tooltip" ><i
                                                    className="material-icons" onClick={() => onDelete(data._id)}>&#xE872;</i></a>
                                            </td>
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

            </Card>
                </Col>
            </div>
        </>

    );
}

export default Bloc;