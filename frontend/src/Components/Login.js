import React from 'react';
import { Container, Row, Col, Card, CardBody, CardImg, 
  Button, Form, FormGroup, Label, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { AuthContext } from './../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import '../Assets/scss/Fixed.scss';
import '../Assets/scss/Login.scss';

const Login = () => {
  const history = useHistory();
  const { stateAuth, login } = React.useContext (AuthContext);
  const [ formData, setFormData ] = React.useState(
    {
      email:'',
      password:''
    }
  )

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  };

  React.useEffect(()=> {
    if ( stateAuth.isAuthenticated && stateAuth.userData !== "Invalid email or password" && localStorage.token !== "undefined" ) {
      history.push('/profile')
      window.location.reload(false);
    } 
    else if ( stateAuth.isAuthenticated && stateAuth.userData === "Invalid email or password" ) {
      toggleAlertInvalid();
    };
  },[stateAuth])

  const handleLogin = async (e) => {
    e.preventDefault();

    if (
      formData.email === "" ||
      formData.password === ""
    ) {
      toggleAlert();
    } else {
      await login(formData);
    }
  };

  // Alert
  const [modalAlert, setModalAlert] = React.useState(false);
  const toggleAlert = () => {
    setModalAlert(!modalAlert)
  }

  // Alert Invalid
  const [modalAlertInvalid, setModalAlertInvalid] = React.useState(false);
  const toggleAlertInvalid = () => {
    setModalAlertInvalid(!modalAlertInvalid)
  }
 
  return (
      <Container className="themed-container text-center" fluid={true}>
        <Row className="p-170-150 respons-login">
          <Col md="6">
            <Card className="near-card-left">
              <CardBody className="d-flex align-items-center justify-content-center">
               <CardImg src={require('./../Assets/images/login.png')} alt="Card image cap" className="img-small" />
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="near-card-right">
              <CardBody>
                <Form className="form-align blue-text we-800" onSubmit={handleLogin} >
                <h5 className="text-center mb-40 we-800"><span className="we-500">Welcome to</span> Onyx Island</h5>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      className="b2-blue"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      className="b2-blue"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className="blue-bg wi-100 mt-10">Login</Button>
                  <Link to="/register" className="link-reg blue-text"><p className="mt-2">Don't have an account? Register</p></Link>
                </Form>
              </CardBody>
            </Card>
          </Col>

          {/* Alert */}
          <Modal isOpen={modalAlert} toggle={toggleAlert} className="warning-text">
            <ModalHeader toggle={toggleAlert}><h1 className="white-text">Oops..!</h1></ModalHeader>
            <ModalBody className="body-bg-modal border-0 text-center">
              <h3 className="mt-2">Please fill all the form input</h3>
            </ModalBody>
            <ModalFooter className="body-bg-modal border-0">
              <Button className="grad-warning-color blue-text" onClick={toggleAlert}>OK!</Button>{' '}
            </ModalFooter>
          </Modal>

           {/* Alert Invalid*/}
           <Modal isOpen={modalAlertInvalid} toggle={toggleAlertInvalid} className="warning-text">
            <ModalHeader toggle={toggleAlertInvalid}><h1 className="white-text">Oops..!</h1></ModalHeader>
            <ModalBody className="body-bg-modal border-0 text-center">
              <h3 className="mt-2">Invalid email or password</h3>
            </ModalBody>
            <ModalFooter className="body-bg-modal border-0">
              <Button className="grad-warning-color blue-text" onClick={toggleAlertInvalid}>OK!</Button>{' '}
            </ModalFooter>
          </Modal>
          
        </Row>
      </Container>
  );
}

export default Login;