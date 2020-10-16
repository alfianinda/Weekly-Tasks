import React, { useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, ModalBody, ModalHeader, Modal, ModalFooter} from 'reactstrap';
import { AuthContext } from './../context/AuthContext';
import '../Assets/scss/Profile.scss';
import '../Assets/scss/Fixed.scss';
import axios from 'axios';
import setToken from "./../helpers/setToken";

const Profile = () => {
    const history = useHistory();

    const {  
        stateAuth, getUserByUserId, logout
       } = useContext (AuthContext);

    React.useEffect(() => {
        getUserByUserId(stateAuth.userData.id);
    }, [])
    
    const handleSubmitDelete =async (e) =>{
        e.preventDefault();

        if (localStorage.token) {
            setToken(localStorage.token);
        }

        await axios.post('http://localhost:5000/users/delete',{
        id : stateAuth.userById.id

        }).then((response)=>{
            let dataRes=response.data
            console.log(dataRes)
        });
        await toggleDelete();
        await toggleSuccess();
        await logout()
        setTimeout(()=>history.push("/"), 3000)
    }

    // Delete Project Modal
    const [modalDeleteProject, setModalDeleteProject] = useState(false);
    const toggleDelete = () => {
        setModalDeleteProject(!modalDeleteProject)
    }

    // Alert Success
    const [modalSuccess, setModalSuccess] = React.useState(false);
    const toggleSuccess = () => {
        setModalSuccess(!modalSuccess)
    }

    return(
        <Container className="themed-container body-bg-profile" fluid={true}>
            <Row className="p-100-150 respons-profile">
                <div className="box">
                    {/* <img src={require("./../Assets/images/profile.jpg")}  alt="" className="box-img mb-3" /> */}
                    <img src={`file_store/${stateAuth.userById.file_gambar}`}  alt="" className="box-img mb-3" />
                    <h1 className="mb-3">{stateAuth.userById.first_name} {stateAuth.userById.last_name}</h1>
                    <h5 className="mb-3">{stateAuth.userById.job_position}</h5>
                    <Row className="mt-2 respons-profile-2">
                        <Col md="2" className="text-left"></Col>
                        <Col md="4" className="text-left">Email</Col>
                        <Col md="1" className="text-left">:</Col>
                        <Col md="5" className="text-left">{stateAuth.userById.email}</Col>
                    </Row>
                    <Row className="mt-2 respons-profile-2">
                        <Col md="2"className="text-left"></Col>
                        <Col md="4"className="text-left">Education Background</Col>
                        <Col md="1"className="text-left">:</Col>
                        <Col md="5"className="text-left">{stateAuth.userById.education}</Col>
                    </Row>
                    <Row className="mt-2 respons-profile-2">
                        <Col md="2"className="text-left"></Col>
                        <Col md="4"className="text-left">Programming Language Skill</Col>
                        <Col md="1"className="text-left">:</Col>
                        <Col md="5"className="text-left">{stateAuth.userById.language}</Col>
                    </Row>
                    
                    {/* mobile */}
                    <Row className="mt-5 respons-profile-3">
                        <Col xs="12" className="text-center">Email: {stateAuth.userById.email}</Col>
                        <hr />
                        <Col xs="12" className="text-center">Education Background: {stateAuth.userById.education}</Col>
                        <hr />
                        <Col xs="12" className="text-center">Programming Language Skill: {stateAuth.userById.language}</Col>
                    </Row>
                    <div className="d-flex justify-content-center wi-100 mt-5">
                        <Link to='/profile-edit' className="grad-color wi-30 m-2 br-btn"><Button className="trp-color"><i className="fa fa-edit"></i> Edit Profile</Button></Link>{' '}
                        <Button className="grad-warning-color wi-30 m-2 blue-text" onClick={toggleDelete}><i className="fa fa-trash"></i> Delete Profile</Button>{' '}
                    </div>
                   
                    {/* <p className="mb-3">A web developer is a programmer who specializes in, or is specifically engaged in, 
                        the development of World Wide Web applications, or applications that are run over HTTP 
                        from a web server to a web browser.</p> */}
                    {/* <ul>
                        <li><a href="#"><i className="fa fa-facebook-square" aria-hidden="true" /></a></li>
                        <li><a href="#"><i className="fa fa-twitter-square" aria-hidden="true" /></a></li>
                        <li><a href="#"><i className="fa fa-google-plus-square" aria-hidden="true" /></a></li>
                    </ul> */}

                    <Modal isOpen={modalDeleteProject} toggle={toggleDelete} className="blue-text">
                        <ModalHeader toggle={toggleDelete}><h3 className="warning-text white-text">Delete all your profile data. Are you sure?</h3></ModalHeader>
                        <ModalBody className="d-flex justify-content-center body-bg-modal border-0">
                            <Button className="grad-warning-color m-2 del-button blue-text" onClick={handleSubmitDelete}><i className="fa fa-trash"></i> Delete Profile</Button>{' '}
                            <Button className="grad-color m-2 del-button" onClick={toggleDelete}>Cancel</Button>
                        </ModalBody>
                    </Modal>

                    {/* Alert Success*/}
                    <Modal isOpen={modalSuccess} toggle={toggleSuccess} className="warning-text">
                        <ModalHeader toggle={toggleSuccess}><h1 className="white-text">Bye..!</h1></ModalHeader>
                        <ModalBody className="body-bg-modal border-0 text-center">
                        <h3 className="mt-2">Your profile data have been deleted..</h3>
                        </ModalBody>
                        <ModalFooter className="body-bg-modal border-0">
                        <Button className="grad-color" onClick={toggleSuccess}>OK!</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            </Row>
        </Container>
    )
}

export default Profile