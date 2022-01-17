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
import QRCode from 'qrcode.react';


function Salle() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');
    const [type, settype] = useState('');
    const [bloc, setbloc] = useState('');
    const [b, setb] = useState('');
    const postData = () => {
        axios.post(`http://localhost:3000/salles`, {
            name:name,
            type:type,
            bloc:b

        })
    }
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {

    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3000/salles`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])
    const [APIbloc, setAPIbloc] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/blocs`)
            .then((response) => {
                setAPIbloc(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/blocs/61c1227c361e0304847f3c99`)
            .then((response) => {
                setb(response.data);
                console.log(APIData);
            })
    }, [])

    const onDelete = (id) => {
        axios.get(`http://localhost:3000/blocs/${id}`).then((response) => {
            setb(response.data);
            setbloc(response.data.name);
        })
    }
    function getb(id)  {
        let a;
        axios.get(`http://localhost:3000/blocs/${id}`).then((response) => {
            a= response.data.name;
        })
          return a;
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
                        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Salle Details</b></h2></div>
                        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                            <Button variant="primary" onClick={handleShow}>
                                Add New Salle
                            </Button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive " >
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>name</th>
                                    <th>Type</th>
                                    <th>bloc</th>
                                    <th>QR</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {APIData.map((data, key) => {
                                    return (
                                        <tr>
                                            <td>{key}</td>
                                            <td>{data.name}</td>
                                            <td>{data.type}</td>
                                            <td >{data.bloc.name}</td>
                                            <td><QRCode value={data._id} /></td>
                                            <td>
                                                <Button variant="info" >update</Button>
                                                <Button variant="danger"  >delete</Button></td>
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
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Salle name</label>
                                        <input type="text" className="form-control"  placeholder=' Name' onChange={(e) => setName(e.target.value)}
                                               id="name"
                                               name="name"
                                                />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Salle Type</label>
                                        <input type="text" className="form-control"   onChange={(e) => settype(e.target.value)}
                                               id="type"
                                               name="type"
                                               placeholder="type"
                                        />

                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlSelect1">Bloc</label>
                                        <select class="form-control"  id="bloc" onChange={(e) => onDelete(e.target.value)}>

                                            {APIbloc.map((data, key) => {
                                                return (
                                                    <option value={data._id} >{data.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={ postData}>Submit</button>
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

export default Salle;