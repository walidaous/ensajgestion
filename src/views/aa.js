
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
import axios, {Axios} from "axios";
import {Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Row} from "reactstrap";

function Bloc() {



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
        axios.get(`http://localhost:3000/blocs`)
            .then((response) => {
                setAPIData(response.data);
                console.log(APIData.name);
            })
    }, [])
    return (
        <>
            <div className="content">
                <div>
                    <Form className="create-form">
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder=' Name' onChange={(e) => setName(e.target.value)}/>
                        </Form.Field>

                        <Button onClick={ console.log(APIData.at(1))} type='submit'>Submit</Button>
                        <div className="stock-container">
                            {APIData.map((data, key) => {
                                return (
                                    <div>
                                        {data.name}
                                    </div>
                                );
                            })}
                        </div>
                    </Form>
                </div>
            </div>

        </>
    );
}

export default Bloc;
function Bloc2() {
    const url="http://localhost:3000/blocs"
    this.state={
        name:""
    }
    function handleSubmit(e) {
        e.preventDefault();
        Axios.post(url,{

        })
    }

    return (
        <>
            <div className="content">
            <Row>
                <Col md="8">
                    <Card className="card-user">
                        <CardHeader>
                            <CardTitle tag="h5">All Blocs</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={(e)=>handleSubmit(e)}>
                                <Row>
                                    <Col className="pr-1" md="5">
                                        <FormGroup>
                                            <label>University</label>
                                            <Input
                                                defaultValue="ENSAJ"
                                                disabled
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col className="pr-1" md="5">
                                        <FormGroup>
                                            <label>Bloc name</label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="name"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <div className="update ml-auto mr-auto">
                                        <Button
                                            className="btn-round"
                                            color="primary"
                                            type="submit"
                                        >
                                            Update Profile
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        </>
    );
}

