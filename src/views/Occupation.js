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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [salles, setsalles] = useState('');
    const [creneaux, setcreneaux] = useState('');
    const [salle, setsalle] = useState('');
    const [creneau, setcreneau] = useState('');
    const [date, setdate] = useState('');
    const [API2, setAPI2] = useState([]);
    const [oc, setoc] = useState([{"_id":"61c302dc2dd36a3a30d458a0","salle":"61c262941042787684284aa2","creneau":{"_id":"61c2f88e10bee661209dd9e0","label":"creneau","debut":"08:30:00","fin":"10:30:00","__v":0},"date":"zrrr","__v":0},{"_id":"61c304a38ba7bf2d1c3d07bd","salle":"61c262941042787684284aa2","creneau":{"_id":"61c3044d2dd36a3a30d4597a","label":"crenau 2","debut":"esfsdf","fin":"sdfdsfsdf","__v":0},"date":"ppp","__v":0}]);

    const postData = () => {
        axios.post(`http://localhost:3000/occupation`, {
            salle:salle,
            creneau:creneau,
            date:date
        })
    }
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {

    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3000/salles`)
            .then((response) => {
                setsalles(response.data);
                console.log(oc)
            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3000/creneau`)
            .then((response) => {
                setAPI2(response.data);

            })
    }, [])

    const [APIbloc, setAPIbloc] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/salles`)
            .then((response) => {
                setAPIbloc(response.data);

            })
    }, [])

    const getcreneau = (id) => {
        axios.get(`http://localhost:3000/creneau/${id}`)
            .then((response) => {
                setcreneau(response.data);
                console.log(APIData);
            })
    }
    const occ = (id) => {
        axios.get(`http://localhost:3000/occupation/61ccae681dc4686f50878665`)
            .then((response) => {
                setoc(response.data);
                console.log(oc);
            })
    }
    useEffect(() => {
        setInterval(() => {
            axios.get(`http://localhost:3000/occupation/`)
                .then((response) => {
                    setoc(response.data);
                    console.log(oc);
                })
        }, 1000);

    }, [])
    const getsalle = (id) => {
        axios.get(`http://localhost:3000/salles/${id}`).then((response) => {
            setsalle(response.data);
        })
    }
    const onDelete = (id) => {
        axios.delete(`http://localhost:3000/occupation/${id}`).then(console.log(APIData));

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
                    <select className="form-control" id="bloc" onSelect={(e) => occ("61ccae681dc4686f50878665")} >

                        {APIbloc.map((data, key) => {
                            return (
                                <option value={data._id}>{data.name}</option>
                            );
                        })}
                    </select>
                    <div className="row">
                        <div className="table-responsive ">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
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
                                                <Button variant="info" >update</Button>
                                                <Button variant="danger" type="submit" onClick={() => onDelete(data._id)}>delete</Button></td>
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
                                        <input type="Date" className="form-control"  placeholder=' Name' onChange={(e) => setdate(e.target.value)}
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
                </div>
            </div>
            </Card>
        </>

    );
}

export default Occupation;