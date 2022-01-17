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
import ChartComponent, {Bar, Line, Pie} from "react-chartjs-2";
import Chart from "react-apexcharts";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col, Input,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import table from "table";
import axios from "axios";

function Dashboard() {
  const [APIData, setAPIData] = useState([]);
  const [salles, setsalles] = useState([]);
  const [oc, setoc] = useState([]);
  const [sallesoc, setsallesoc] = useState([]);
  const [sallesnoc, setsallesnoc] = useState([]);
  const [test2, settest] = useState([]);
  const [bloc, setbloc] = useState([]);


  useEffect(() => {
    setInterval(() => {
      axios.get(`https://gestionsalles.herokuapp.com/occupation/salle/créneau%201`)
          .then((response) => {
            setsallesoc(response.data)

          })
    },1000)
  }, [])
  useEffect(() => {
    setInterval(() => {
      axios.get(`https://gestionsalles.herokuapp.com/occupation/salle2/créneau%201`)
          .then((response) => {
            setsallesnoc(response.data)

          })
    },1000)
  }, [])

  useEffect(() => {
    setInterval(() => {
      axios.get(`https://gestionsalles.herokuapp.com/occupation/salles/a`)
          .then((response) => {
            setAPIData(response.data)

          })
    }, 1000);

  }, [])
  useEffect(() => {
    setInterval(() => {
      axios.get(`https://gestionsalles.herokuapp.com/salles/`)
          .then((response) => {
            setsalles(response.data)

          })
    }, 1000);
  }, [])

  useEffect(() => {
    setInterval(() => {
      axios.get(`https://gestionsalles.herokuapp.com/occupation/salles/b`)
          .then((response) => {
            setoc(response.data)

          })
    }, 1000);


  }, [])
  useEffect(() => {
      axios.get(`https://gestionsalles.herokuapp.com/occupation/a2/salleparbloc2/61d4795b900d230ea4be9d03`)
          .then((response) => {
            setbloc(response.data)
          })
  }, [])

  const Blocupdate=(id)=>{

    Blocnonoccupee(id);

    axios.get(`https://gestionsalles.herokuapp.com/occupation/a2/salleparbloc2/`+id)
          .then((response) => {
            setbloc(response.data)
          })
  }
  const [deff, setdeff] = useState([]);
  useEffect(() => {
    Blocnonoccupee('61d4795b900d230ea4be9d03');
  }, [])
  const Blocnonoccupee=(id)=>{

    axios.get(`https://gestionsalles.herokuapp.com/occupation/a2/salleparbloc2/`+id)
        .then((response) => {
          axios.get('https://gestionsalles.herokuapp.com/occupation/salleparbloc/'+id).then(
              (rep)=>{

                console.log( rep.data.map((e)=>e.name));
                let difference = rep.data.map((e)=>e.name).filter(x => !response.data.map((e)=>e.salle.name).includes(x));
                setdeff(difference);

              }
          )
        })
  }

  const state = {

    series: [
      {
        data:bloc.map((e)=>{return({x:e.salle.name,y:1})})

      }
    ],
    options: {
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Les Salles occupee',
        align: 'center'
      },
      colors: [
        '#ff0d21'
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: true
        }
      }
    },


  };

  const state2 = {

    series: [
      {
        data:deff.map((e)=>{return({x:e,y:1})})

      }
    ],
    options: {
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Les Salles non occupee',
        align: 'center'
      },
      colors: [
        '#37ff29'
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
    },
  };

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
          '#e2785e',
          '#61e1c7',
        ],
        hoverOffset: 2
      }]
    },
    options: {
      animation: {
        duration: 0
      },
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
        label: 'Nombre des occupations',
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
      },
      plugins:{
        legend: { display: false },
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
            label: "Salles occupées",
            fill: false,
            borderColor: "#3e95cd",
            backgroundColor: "#3e95cd",
            pointBorderColor: "#3e95cd",
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
        legend: { display: true },
      },

    },
  };

  return (
      <>


        <div>
        </div>
        <div className="content">
          {/* <Row>
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
        </Row>*/}
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Occupations par jour</CardTitle>
                  <p className="card-category">24 heures </p>
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
                    <i className="fa fa-history" /> Mis à jour il y a 1 seconde
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Occupations actuelles</CardTitle>
                  <p className="card-category">Les salles occupées {sallesoc.length}</p>
                  <p className="card-category">Les salles non occupées {sallesnoc.length}</p>
                </CardHeader>
                <CardBody style={{ height: "266px" }}>
                  <Pie
                      data={config2.data}
                      options={config2.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-danger" /> Occupée
                    <i className="fa fa-circle text-info" /> Non Occupée

                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Mis à jour il y a 1 seconde
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Occupations par salles</CardTitle>
                  <p className="card-category">les salles occupee par bloc</p>
                </CardHeader>
                <CardBody>
                  <Input
                      id="refrence"
                      name="refrence"
                      placeholder="Refrence"
                      type="select"
                      onChange={(e) => Blocupdate(e.target.value)}
                  >

                    <option value="61d4795b900d230ea4be9d03">Bloc A</option>
                    <option value="61ccae591dc4686f5087865a">Bloc B</option>
                    <option value="61d48960753ad53354052a41">Bloc C</option>
                    <option value="61d4d6f114b73a40d4850265">Bloc D</option>
                  </Input>
                  <Chart options={state.options} series={state.series} type="treemap" height={150} />
                  <Chart options={state2.options} series={state2.series} type="treemap" height={125} />

                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Mis à jour il y a 1 seconde
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Occupations par salles</CardTitle>
                  <p className="card-category">Nombre total des occupations d'une salle</p>
                </CardHeader>
                <CardBody>
                  <Bar
                      data={config.data}
                      options={config.options}
                      width={400}
                      height={190}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Mis à jour il y a 1 seconde
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
