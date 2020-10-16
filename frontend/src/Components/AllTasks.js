import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { AuthContext } from './../context/AuthContext';
import '../Assets/scss/Fixed.scss';
import '../Assets/scss/AllTasks.scss';
import Loader from './Loader';

const AllTasks = () => {
    const {  
        stateAuth, getUsers
       } = React.useContext (AuthContext);

    React.useEffect(() => {
        getUsers();
    }, [])

    return(
        <Container className="themed-container body-bg-profile-pro" fluid={true}>
            <Row className="p-170-150 respons-all">
                <div className="box-all">
                    <div className="wi-100 z-2">
                        <h3 className="we-800 mb-5">All Employee's Tasks</h3>
                        <Row className="text-center border-head">
                            <Col md="6">Employee</Col>
                            <Col md="3">Position</Col>
                            <Col md="3">Detail</Col>
                        </Row>
                        {stateAuth.loading ? <Loader />:
                            stateAuth.users.map((data, i) => (
                                <Row className="text-center border-body" key={i}>
                                {/* <Col md="3"><img src={require("./../Assets/images/profile.jpg")}  alt="" className="box-all-img" /></Col> */}
                                <Col md="3"><img src={`file_store/${data.file_gambar}`}  alt="" className="box-all-img" /></Col>
                                <Col md="3">{data.first_name} {data.last_name}</Col>
                                <Col md="3">{data.job_position}</Col>
                                <Col md="3">
                                    <Link to={{
                                        pathname: '/detail',
                                        state: {id: data.id}
                                    }}>
                                        <Button className="grad-color wi-60 respons-all" ><i className="fa fa-info-circle"></i> Check Detail</Button>
                                    </Link>
                                </Col>
                            </Row>
                            ))
                        } 
                        {stateAuth.error ? <h1>{stateAuth.error}</h1> : null}
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default AllTasks;