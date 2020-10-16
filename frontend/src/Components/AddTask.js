import React from 'react';
import { Container, Row, Col, Card, CardBody, Form, Input } from 'reactstrap';
import CalendarComp from './CalendarComp';
import '../Assets/scss/Fixed.scss';
import '../Assets/scss/AddTask.scss';

const AddTask = () => {
  return (
      <Container className="themed-container" fluid={true}>
        <Row className="p-50">
          <Col className="relative">
            <img src={require("./../Assets/images/lamp.png")} alt="" className="lamp-bg"/>
            <img src={require("./../Assets/images/laptop.png")} alt="" className="laptop-bg"/>
            <Card className="card-full white-text">
              <CardBody className="flex-column p-50">
                <h1 className="we-800">Create Task</h1>
                <Form className="wi-60 z-2">
                    <Input type="text" name="name" placeholder="Task Name" className="simple-form" />
                    <Input type="number" name="hours" placeholder="Hour Estimation" className="simple-form"/>
                    <Input type="textarea" id="inputID" name="description" placeholder="Task Description" className="simple-form"/>
                </Form>
                <CalendarComp />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default AddTask;