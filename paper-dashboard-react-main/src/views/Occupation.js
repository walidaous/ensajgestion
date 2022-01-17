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


function Occupation() {
    const [show, setShow] = useState(false);
    const [showU, setShowU] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseU = () => setShowU(false);
    const handleShowU = () => setShowU(true);

    const [salles, setsalles] = useState('');
    const [creneaux, setcreneaux] = useState('');
    const [salle, setsalle] = useState('');
    const [creneau, setcreneau] = useState('');
    const [date, setdate] = useState('');
    const [API2, setAPI2] = useState([]);
    const [oc, setoc] = useState([]);

    const postData = () => {
        axios.post(`https://gestionsalles.herokuapp.com/occupation`, {
            salle:salle,
            creneau:creneau,
            date:date
        })
    }

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {

    }, [])
    useEffect(() => {
        axios.get(`https://gestionsalles.herokuapp.com/salles`)
            .then((response) => {
                setsalles(response.data);
                console.log(oc)
            })
    }, [])
    useEffect(() => {
        axios.get(`https://gestionsalles.herokuapp.com/creneau`)
            .then((response) => {
                setAPI2(response.data);

            })
    }, [])

    const [APIbloc, setAPIbloc] = useState([]);
    useEffect(() => {
        axios.get(`https://gestionsalles.herokuapp.com/salles`)
            .then((response) => {
                setAPIbloc(response.data);

            })
    }, [])

    const getcreneau = (id) => {
        axios.get(`https://gestionsalles.herokuapp.com/creneau/${id}`)
            .then((response) => {
                setcreneau(response.data);
                console.log(APIData);
            })
    }
    const occ = (id) => {
        axios.get(`https://gestionsalles.herokuapp.com/occupation/61ccae681dc4686f50878665`)
            .then((response) => {
                setoc(response.data);
                console.log(oc);
            })
    }
    useEffect(() => {
        setInterval(() => {
            axios.get(`https://gestionsalles.herokuapp.com/occupation/`)
                .then((response) => {
                    setoc(response.data);
                    console.log(oc);
                })
        }, 1000);

    }, [])
    const getsalle = (id) => {
        axios.get(`https://gestionsalles.herokuapp.com/salles/${id}`).then((response) => {
            setsalle(response.data);
        })
    }
    const onDelete = (id) => {
        axios.delete(`https://gestionsalles.herokuapp.com/occupation/${id}`).then(console.log(APIData));

    }

    return (
        <>
        <div className="content">
            <Col md="12">
                <Card>
                <div className="crud  p-3 mb-5 mt-5 bg-body rounded">
                    <div className="row ">
                        <div className=" center col-sm-5 offset-sm-4 text-gred" style={{color: "blue"}}><h2><b>Occupation Details</b></h2></div>
                    </div>
                    <div class="row ">

                        <div class="col-sm-3 mt-5 mb-4 text-gred">
                            <div className="search">
                                <form class="form-inline">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search Occupation" aria-label="Search"/>

                                </form>
                            </div>
                        </div>
                        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}></div>
                        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                            <Button variant="primary" onClick={handleShow}>
                                Add New Occupation
                            </Button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Label</th>
                                    <th>debut</th>
                                    <th>fin</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {oc.map((data, key) => {
                                    return (
                                        <tr>
                                            <td>{key}</td>
                                            <td>{data.salle.type}</td>
                                            <td>{data.creneau.label}</td>
                                            <td>{data.date}</td>

                                            <  td>
                                                <a className="edit" title="Edit" data-toggle="tooltip" ><i
                                                    className="material-icons" onClick={handleShowU} >&#xE254;</i></a>
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
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Date</label>
                                        <input type="Date" className="form-control"  placeholder=' Name'  onChange={(e) => setdate(e.target.value)}
                                               id="name"
                                               name="name"
                                        />

                                    </div>

                                    <div className="mb-3">
                                        <label for="exampleFormControlSelect1">salle</label>
                                        <select class="form-control"  id="bloc" onChange={(e) => getsalle(e.target.value)}>

                                            {APIbloc.map((data, key) => {
                                                return (
                                                    <option value={data._id} >{data.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlSelect1">Creneau</label>
                                        <select className="form-control" id="bloc"
                                                onChange={(e) => getcreneau(e.target.value)}>

                                            {API2.map((data, key) => {
                                                return (
                                                    <option value={data._id}>{data.label}</option>
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
                    <div className="model_box">
                        <Modal
                            show={showU}
                            onHide={handleCloseU}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add Record</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Date</label>
                                        <input type="Date" className="form-control" placeholder=' Name'
                                               onChange={(e) => setdate(e.target.value)}
                                               id="name"
                                               name="name"
                                        />

                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlSelect1">salle</label>
                                        <select className="form-control" id="bloc"
                                                onChange={(e) => getsalle(e.target.value)}>

                                            {APIbloc.map((data, key) => {
                                                return (
                                                    <option value={data._id}>{data.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlSelect1">Creneau</label>
                                        <select className="form-control" id="bloc"
                                                onChange={(e) => getcreneau(e.target.value)}>

                                            {API2.map((data, key) => {
                                                return (
                                                    <option value={data._id}>{data.label}</option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary" >Submit</button>
                                </form>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseU}>
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

export default Occupation;