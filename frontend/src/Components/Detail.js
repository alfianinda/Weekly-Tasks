import React, { useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardBody,
    ModalBody, ModalHeader, Modal, 
    ModalFooter} from 'reactstrap';
import { AuthContext } from './../context/AuthContext';
import { TaskListContext } from './../context/TaskListContext';
import { DetailContext } from './../context/DetailContext';
import Loader from "./Loader";
import '../Assets/scss/Profile.scss';
import '../Assets/scss/Fixed.scss';

const Detail = () => {
    const location = useLocation();

    const {  
        stateAuth, getUserByUserId
    } = useContext (AuthContext);

    const { 
        state, 
        getProjectByUserId, 
    } = useContext (TaskListContext);

    const { 
        stateDetail,
        getDetailByProjectId
       } = useContext (DetailContext);

    const [ desc, setDesc ] = useState("");
    const idUser = useState(location.state.id);

    React.useEffect(() => {
        getUserByUserId(idUser);
        // setTimeout(()=>getProjectByUserId(idUser), 2000);
        getProjectByUserId(idUser);
    }, [location])

    // Detail Modal
    const [modalDetail, setModalDetail] = useState(false);
    const toggleDetail = () => {
        setModalDetail(!modalDetail)
    }

    return(
        <Container className="themed-container body-bg-profile" fluid={true}>
            <Row className="p-100-150">
                <div className="box">
                    {/* <img src={require("./../Assets/images/profile.jpg")}  alt="" className="box-img mb-3" /> */}
                    <img src={`file_store/${stateAuth.userById.file_gambar}`}  alt="" className="box-img mb-3" />
                    <h1>{stateAuth.userById.first_name} {stateAuth.userById.last_name}</h1>
                    <h3>{stateAuth.userById.job_position}</h3>
                    <Row className="mt-2">
                        <Col md="2"className="text-left"></Col>
                        <Col md="4"className="text-left">Email</Col>
                        <Col md="1"className="text-left">:</Col>
                        <Col md="5"className="text-left">{stateAuth.userById.email}</Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md="2"className="text-left"></Col>
                        <Col md="4"className="text-left">Education Background</Col>
                        <Col md="1"className="text-left">:</Col>
                        <Col md="5"className="text-left">{stateAuth.userById.education}</Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md="2"className="text-left"></Col>
                        <Col md="4"className="text-left">Programming Language Skill</Col>
                        <Col md="1"className="text-left">:</Col>
                        <Col md="5"className="text-left">{stateAuth.userById.language}</Col>
                    </Row>
                   
                    <h3 className="mt-5 mb-3">{stateAuth.userById.first_name} {stateAuth.userById.last_name}'s Projects ( {state.post.data && state.post.data.length} ):</h3>
                    <Row className={state.loading || state.post.data.length === 0 ? "d-flex justify-content-center mt-4" : "d-flex p-0-100"}>
                    {state.loading ? <Loader />:
                      state.post.data && state.post.data.map((data, index) => (
                        <Col key={index} md="4" className="grid-task pointer"
                            onClick={() => { 
                                toggleDetail(); 
                                // setTimeout(()=>getDetailByProjectId(data.id), 1500);
                                getDetailByProjectId(data.id);
                                setDesc(data.project_description)
                            }}>
                              {data.project_name}
                        </Col>
                      ))    
                    }
                    {state.post.data && state.post.data.length === 0 && <h1>No Project</h1>}
                    {state.error ? <h1>{state.error}</h1> : null}
                  </Row>

                    {/* Display Detail Project*/}
                    <Modal isOpen={modalDetail} toggle={toggleDetail} className="blue-text display-detail">
                        <ModalHeader toggle={toggleDetail}><h1 className="white-text">Detail Project</h1></ModalHeader>
                        <ModalBody className="d-flex justify-content-center detail">
                        <Card className="card-detail p-25 white-text h-100">
                            <CardBody className="round-10">
                            <div className="wi-100 z-2">
                                <h3 className="we-800 mb-5">{desc === "" ? "No Description" : desc}</h3> 
                                <div>
                                <Row className="text-center border-head">
                                    <Col md="4">Date</Col>
                                    <Col md="4">Hour Estimation</Col>
                                    <Col md="4">Note</Col>
                                </Row>
                                {stateDetail.loading ? <div className="d-flex justify-content-center mt-4"><Loader /></div>:
                                    stateDetail.detail.data && stateDetail.detail.data.map ((data,i) => (
                                    <span key={i}>
                                        <Row className="text-center border-body">
                                        <Col md="4">{ new Date(data.day).toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</Col>
                                        <Col md="4">{data.hours}</Col>
                                        <Col md="4">{data.note === "" ? "No Note" : data.note}</Col>
                                        </Row>
                                    </span>
                                    ))
                                }
                                {stateDetail.detail.data && stateDetail.detail.data.length === 0 && <div className="d-flex justify-content-center mt-4"><h1>No Data</h1></div>}
                                {stateDetail.error ? <h1>{stateDetail.error}</h1> : null}
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        </ModalBody>
                        <ModalFooter className="body-bg-modal border-0">
                        <Button className="grad-color" onClick={toggleDetail}>OK</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Row>
        </Container>
    )
}

export default Detail;