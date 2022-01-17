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
import React, {useEffect, useState} from "react";
// react plugin used to create charts
import {Bar, Line, Pie} from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import table from "table";
import {Chart} from "chart.js";
import axios from "axios";

function Dashboard() {
  const [APIData, setAPIData] = useState([]);
  const [salles, setsalles] = useState([]);
  const [oc, setoc] = useState([]);
  const [sallesoc, setsallesoc] = useState([]);
  const [sallesnoc, setsallesnoc] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/occupation/salle/créneau%201`)
        .then((response) => {
          setsallesoc(response.data)
          console.log(sallesoc.length);

        })
  }, [])
  useEffect(() => {
    axios.get(`http://localhost:3000/occupation/salle2/créneau%201`)
        .then((response) => {
          setsallesnoc(response.data)
          console.log(sallesnoc.length);

        })
  }, [])

  useEffect(() => {
    setInterval(() => {
      axios.get(`http://localhost:3000/occupation/salles/a`)
          .then((response) => {
            setAPIData(response.data)
            console.log(APIData.map(e=>e.count.toString()));

          })
    }, 1000);

  }, [])
  useEffect(() => {
    setInterval(() => {
      axios.get(`http://localhost:3000/salles/`)
          .then((response) => {
            setsalles(response.data)

          })
    }, 1000);
  }, [])

  useEffect(() => {
    setInterval(() => {
      axios.get(`http://localhost:3000/occupation/salles/b`)
          .then((response) => {
            setoc(response.data)

          })
    }, 1000);


  }, [])

  const config2 = {
    type: 'doughnut',
    data: {
      labels: [
        'salle occupee',
        'salle non occupee',
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [sallesoc.length, sallesnoc.length],
        backgroundColor: [
          'rgb(155,40,40)',
          'rgb(13,255,5)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 2
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      maintainAspectRatio: false,
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2,
      },
      scales: {
        y: {
          ticks: {
            display: false,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  };
  const config = {
    type: 'bar',
    data: {
      labels: salles.map(e=>e.name.toString()),
      datasets: [{
        label: 'My First Dataset',
        data: oc.map(e=>e.count.toString()),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      animation: {
        duration: 0
      },
      scales: {
        y: {

          beginAtZero: true
        }
      }
    },
  };
  const test = {
    data: (canvas) => {
      return {
        labels: APIData.map(e=>e._id.toString()),
        datasets: [
          {
            data: APIData.map(e=>parseInt(e.count)),
            fill: false,
            borderColor: "#fbc658",
            backgroundColor: "transparent",
            pointBorderColor: "#fbc658",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0.4,
          },

        ],
      };
    },
    options: {
      animation: {
        duration: 0
      },
      plugins: {
        legend: { display: false },
      },
    },
  };

  return (
    <>
      <div>
      </div>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Capacity</p>
                      <CardTitle tag="p">150GB</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <CardTitle tag="p">$ 1,345</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={test.data}
                  options={test.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={config2.data}
                  options={config2.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Bar
                    data={config.data}
                    options={config.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
