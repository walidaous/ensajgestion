import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
import axios, {Axios} from "axios";
import {Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Row} from "reactstrap";

function Creneau() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Reference, setReference] = useState('');
    const [entreprise, setentreprise] = useState('');
    const [date, setdate] = useState('');
    const [debut, setdebut] = useState('');
    const [label, setlabel] = useState('');
    const [fin, setfin] = useState('');
    const postData = () => {
        axios.post(`https://gestionsalles.herokuapp.com/creneau`, {
            entreprise:entreprise,
            date:date,
            status:false,
            Client:{
                code:Reference
            }

        })
    }
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {

    }, [])
    useEffect(() => {
        axios.get(`https://gestionsalles.herokuapp.com/creneau`)
            .then((response) => {
                setAPIData(response.data);
                console.log(APIData);
            })
    }, [])
    const onDelete = (id) => {
        axios.delete(`https://gestionsalles.herokuapp.com/creneau/${id}`).then(console.log(APIData));

    }

    function test() {
        console.log(APIData);

    }

    return (
        <>
            <div className="content">
                <Col md="12">
                    <Card>
                <div className="crud p-3 mb-5 mt-5 bg-body rounded">
                    <div className="row ">
                        <div className=" center col-sm-5 offset-sm-4 text-gred" style={{color: "blue"}}><h2><b>Creneau Details</b></h2></div>
                    </div>
                    <div class="row ">

                        <div class="col-sm-3 mt-5 mb-4 text-gred">
                            <div className="search">
                                <form class="form-inline">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search Creneau" aria-label="Search"/>

                                </form>
                            </div>
                        </div>
                        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}></div>
                        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                            <Button variant="primary" onClick={handleShow}>
                                Add New Creneau
                            </Button>
                        </div>
                    </div>
                    <div class="row">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Label </th>
                                    <th>debut</th>
                                    <th>fin</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {APIData.map((data, key) => {
                                    return (
                                        <tr>
                                            <td>{key}</td>
                                            <td>{data.label}</td>
                                            <td>{data.debut}</td>
                                            <td>{data.fin}</td>
                                            < td>
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
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Lable</label>
                                        <input type="text" className="form-control"  placeholder=' Name' onChange={(e) => setlabel(e.target.value)}
                                               id="name"
                                               name="name"
                                               placeholder="name"
                                               type="text"
                                        />
                                    </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Debut</label>

                                            <input type="time" className="form-control"  placeholder=' Name' onChange={(e) => setdebut(e.target.value)}
                                                   id="name"
                                                   name="name"
                                                   placeholder="name"
                                            />
                                        </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Fin</label>
                                                <input type="time" className="form-control"  placeholder=' Name' onChange={(e) => setfin(e.target.value)}
                                                       id="name"
                                                       name="name"
                                                       placeholder="name"
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

export default Creneau;