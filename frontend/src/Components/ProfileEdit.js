import React from 'react';
import { Container, Row, Col, Card, CardBody, 
  Button, Form, FormGroup, Label, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { AuthContext } from './../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import '../Assets/scss/Fixed.scss';
import '../Assets/scss/Register.scss';

const ProfileEdit = () => {
  const history = useHistory();
  const { stateAuth, updateUsers, getUserByUserId } = React.useContext (AuthContext);

  React.useEffect(() => {
    getUserByUserId(stateAuth.userData.id);
  }, []);

  const [email, setEmail] = React.useState ("");
  const [password, setPassword] = React.useState ("");
  const [fname, setFname] = React.useState ("");
  const [lname, setLname] = React.useState ("");
  const [education, setEducation] = React.useState ("");
  const [position, setPosition] = React.useState ("");
  const [language, setLanguage] = React.useState ("");
  const [fileGambar, setFileGambar] = React.useState ("");
  const [id] = React.useState (stateAuth.userData.id);

  const onChange = e => {
    switch (e.target.name) {
      case 'gambar':
        setFileGambar(e.target.files[0]);
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('email', email); 
    formData.append('password', password);
    formData.append('first_name', fname);
    formData.append('last_name', lname);       
    formData.append('education', education);
    formData.append('job_position', position);
    formData.append('language', language);
    formData.append('file', fileGambar);
    formData.append('id', id)

    if (
      password === "" || email === "" || fname === "" || lname === ""
      || education === "" || position === "" || language === "" || fileGambar === "" 
    ) {
      toggleAlert();
    } else {
      await updateUsers(formData);
      await toggleSuccess();
      history.push('/profile')
    }
  };

  // Alert
  const [modalAlert, setModalAlert] = React.useState(false);
  const toggleAlert = () => {
    setModalAlert(!modalAlert)
  }

  // Alert Success
  const [modalSuccess, setModalSuccess] = React.useState(false);
  const toggleSuccess = () => {
    setModalSuccess(!modalSuccess)
  }
 
  return (
      <Container className="themed-container text-center body-bg-profile" fluid={true}>
        <Row className="p-170-150">
          <Col md="6">
            <Card className="near-card-left-register">
              <CardBody>
              <Form className="form-align white-text we-800" encType="multipart/form-data">
                <h5 className="text-center mb-40 we-800"> Edit Profile </h5>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      className="b2-blue"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder={stateAuth.userById.email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      className="b2-blue"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFname">First Name</Label>
                    <Input
                      type="text"
                      name="fname"
                      id="exampleFname"
                      className="b2-blue"
                      value={fname}
                      onChange={(e)=>setFname(e.target.value)}
                      placeholder={stateAuth.userById.first_name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleLname">Last Name</Label>
                    <Input
                      type="text"
                      name="lname"
                      id="exampleLname"
                      className="b2-blue"
                      value={lname}
                      onChange={(e)=>setLname(e.target.value)}
                      placeholder={stateAuth.userById.last_name}
                    />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="near-card-right-register">
              <CardBody>
                <Form className="form-align white-text we-800" >
                  <FormGroup>
                    <Label for="exampleEducation">Education Background</Label>
                    <Input
                      type="text"
                      name="education"
                      id="exampleEducation"
                      className="b2-blue"
                      value={education}
                      onChange={(e)=>setEducation(e.target.value)}
                      placeholder={stateAuth.userById.education}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePosition">Job Position</Label>
                    <Input
                      type="text"
                      name="position"
                      id="examplePosition"
                      className="b2-blue"
                      value={position}
                      onChange={(e)=>setPosition(e.target.value)}
                      placeholder={stateAuth.userById.job_position}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleLanguage">Programming Language Skill</Label>
                    <Input
                      type="text"
                      name="language"
                      id="exampleLanguage"
                      className="b2-blue"
                      value={language}
                      onChange={(e)=>setLanguage(e.target.value)}
                      placeholder={stateAuth.userById.language}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="exampleGambar">Profile Picture</Label>
                    <Input 
                      type="file"
                      className="b2-blue"
                      name="gambar"
                      id="exampleGambar"
                      onChange={onChange}
                    />
                  </FormGroup>
                                   
                  <Button className="blue-bg wi-100 mt-10" onClick={handleSubmit}>Update Profile</Button>
                  <Link to="/profile" className="link-reg"><p className="mt-1">Back to my profile</p></Link>
                </Form>
              </CardBody>
            </Card>
          </Col>

          {/* Alert */}
          <Modal isOpen={modalAlert} toggle={toggleAlert} className="warning-text">
            <ModalHeader toggle={toggleAlert}><h1 className="white-text">Oops..!</h1></ModalHeader>
            <ModalBody className="body-bg-modal border-0 text-center">
              <h3 className="mt-2">Please fill all the fields!</h3>
            </ModalBody>
            <ModalFooter className="body-bg-modal border-0">
              <Button className="grad-warning-color blue-text" onClick={toggleAlert}>OK!</Button>{' '}
            </ModalFooter>
          </Modal>

           {/* Alert Success*/}
           <Modal isOpen={modalSuccess} toggle={toggleSuccess} className="warning-text">
            <ModalHeader toggle={toggleSuccess}><h1 className="white-text">Success..!</h1></ModalHeader>
            <ModalBody className="body-bg-modal border-0 text-center">
              <h3 className="mt-2">Data have been updated..</h3>
            </ModalBody>
            <ModalFooter className="body-bg-modal border-0">
              <Button className="grad-color" onClick={toggleSuccess}>OK!</Button>{' '}
            </ModalFooter>
          </Modal>
          
        </Row>
      </Container>
  );
}

export default ProfileEdit;