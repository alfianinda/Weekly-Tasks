import React, { useEffect, useContext, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Input, 
  Tooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form } from 'reactstrap';
import { AuthContext } from './../context/AuthContext';
import { TaskListContext } from './../context/TaskListContext';
import { DetailContext } from './../context/DetailContext';
import { useParams } from 'react-router-dom';
import Loader from "./Loader";
import '../Assets/scss/Fixed.scss';
import '../Assets/scss/TaskList.scss';
import axios from 'axios';
import setToken from "./../helpers/setToken";

const TaskList = () => {
  const { state, 
    getProjectByUserId, 
    createProjectByUserId, 
    updateProjects, 
    // deleteProject
   } = useContext (TaskListContext);

   const { stateDetail,
    createDetailByUserIdByProjectId,
    getDetailByProjectId,
    updateDetail, 
    // deleteDetail
   } = useContext (DetailContext);

   const {
    stateAuth, getUserByUserId
   } = React.useContext (AuthContext);

   //
   const [ projName, setProjName ] = useState("")
   const [ desc, setDesc ] = useState("")

  let { user_id } = useParams();

  //search filter------------------------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setTimeout(()=> getProjectByUserId(user_id), 1500);
    getUserByUserId(stateAuth.userData.id);


  //search filter inside useeffect------------------------------------------------------
    const results = state.post.data && state.post.data.filter(search => 
      search.project_name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, user_id, stateAuth]);

  
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => {
    setTooltipOpen(!tooltipOpen);
  }

  // Create------------------------------------------------------
  const [ formData, setFormData ] = useState(
    {
      user_id:stateAuth.userData.id,
      project_name:'', 
      project_description:''
    }
  )

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
    // console.log("test")
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (
      formData.project_name === ""
    ) {
      toggleCreate();
      toggleAlertName();
    } else {
      await createProjectByUserId(formData);
      await toggleCreate();
      getProjectByUserId(user_id);
      setFormData({
        user_id:stateAuth.userData.id,
        project_name:'', 
        project_description:''
      })
    }
  };

  // Create Modal------------------------------------------------------
  const [modal, setModal] = useState(false);
  const toggleCreate = () => {
    setModal(!modal)
  }

  // Edit Project------------------------------------------------------
  const [user_id_edit] = useState (user_id);
  const [project_name_edit, setProject_name_edit] = useState (projName);
  const [project_description_edit, setProject_description_edit] = useState (desc);
  const [id_edit, setId_edit] = useState (null);

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    
    const formDataEdit = {
      user_id:user_id_edit,
      project_name:project_name_edit, 
      project_description:project_description_edit,
      id: id_edit
    }

    // console.log(id_edit)
    // console.log(formDataEdit)
    if (
      formDataEdit.project_name === ""
    ) {
      toggleEdit();
      toggleAlertName();
    } else {
      await updateProjects(formDataEdit);
      await setModalManage(!modalManage);
      await toggleEdit();
      getProjectByUserId(user_id);
      setProject_name_edit("");
      setProject_description_edit("");
    }
  };

  // Edit Project Modal------------------------------------------------------
  const [modalEditProject, setModalEditProject] = useState(false);
  const toggleEdit = () => {
    setModalEditProject(!modalEditProject)
  }

  // Delete Project------------------------------------------------------
  const [id_delete, setId_delete] = useState (null);

  // const handleSubmitDelete = async (e) => {
  //   e.preventDefault()
    
  //   const formDataDelete = {
  //     id: id_delete
  //   }

  //   console.log(user_id)
  //   console.log(formDataDelete)

  //     await deleteProject(formDataDelete);
  //     await setModalManage(!modalManage);
  //     await toggleDelete();
  //     getProjectByUserId(user_id);
  // };
  const handleSubmitDelete =async (e) =>{
    // console.log(e)
    e.preventDefault();

    if (localStorage.token) {
      setToken(localStorage.token);
    }

    await axios.post('http://localhost:5000/projects/delete',{
    id : id_delete
    }).then((response)=>{
        let dataRes=response.data
        console.log(dataRes)
    });
    await setModalManage(!modalManage);
    await toggleDelete();
    getProjectByUserId(user_id) 
}

  // Delete Project Modal------------------------------------------------------
  const [modalDeleteProject, setModalDeleteProject] = useState(false);
  const toggleDelete = () => {
    setModalDeleteProject(!modalDeleteProject)
  }

  // Detail Project------------------------------------------------------
  const [project_id_detail, setProject_id_detail] = useState (null);
  const [user_id_detail] = useState (user_id);
  const [hours, setHours] = useState (null);
  const [note, setNote] = useState ("");
  const [day, setDay] = useState ("");

  const handleSubmitDetail = async (e) => {
    e.preventDefault()
    
    const formDataDetail = {
      project_id: project_id_detail,
      user_id:user_id_detail, 
      hours:hours,
      note:note,
      day:day
    }

    // console.log(formDataDetail)

    if (
      formDataDetail.hours === null || formDataDetail.hours === ""
    ) {
      toggleDetail();
      toggleDetailAlert();
    } else {
      await createDetailByUserIdByProjectId(formDataDetail)
      // await setModalManage(!modalManage);
      await toggleDetail();
      await toggleDisplayDetail();
      getDetailByProjectId(project_id_detail);
      setHours("");
      setNote("");
      setDay("");
    }
  };

  // Detail Project Modal------------------------------------------------------
  const [modalDetailProject, setModalDetailProject] = useState(false);
  const toggleDetail = () => {
    setModalDetailProject(!modalDetailProject)
  }

  // Display Detail Project Modal------------------------------------------------------
  const [modalDisplayDetailProject, setModalDisplayDetailProject] = useState(false);
  const toggleDisplayDetail = () => {
    setModalDisplayDetailProject(!modalDisplayDetailProject)
  }

  // Display Detail Delete------------------------------------------------------
  const [id_delete_detail, setId_delete_detail] = useState (null);

  const handleSubmitDeleteDetail =async (e) =>{
    e.preventDefault();

    if (localStorage.token) {
      setToken(localStorage.token);
  }

    await axios.post('http://localhost:5000/details/delete',{
    id : id_delete_detail
    }).then((response)=>{
        let dataRes=response.data
        console.log(dataRes)
    });
    await toggleDisplayDetailDelete();
    getDetailByProjectId(project_id_detail); 
}

  // Display Detail Delete Modal------------------------------------------------------
  const [modalDeleteDetailProject, setModalDeleteDetailProject] = useState(false);
  const toggleDisplayDetailDelete = () => {
    setModalDeleteDetailProject(!modalDeleteDetailProject)
  }

  // Display Detail Edit------------------------------------------------------
  const [hours_edit, setHours_edit] = useState (hours);
  const [note_edit, setNote_edit] = useState ("");
  const [detail_id, setDetail_id] = useState(null)

  const handleSubmitDetailEdit = async (e) => {
    e.preventDefault()
    
    const formDataDetailEdit = {
      project_id: project_id_detail,
      user_id:user_id_detail, 
      hours:hours_edit,
      note:note_edit,
      id:detail_id
    }

    // console.log(formDataDetailEdit)

    if (
      formDataDetailEdit.hours === null || formDataDetailEdit.hours === ""
    ) {
      toggleDisplayDetailEdit();
      toggleDetailAlert();
    } else {
      // console.log(formDataDetailEdit)
      await updateDetail(formDataDetailEdit)
      await toggleDisplayDetailEdit();
      getDetailByProjectId(project_id_detail);
      setHours_edit("")
      setNote_edit("")
    }
  };

  // Display Detail Edit Modal------------------------------------------------------
  const [modalEditDetailProject, setModalEditDetailProject] = useState(false);
  const toggleDisplayDetailEdit = () => {
    setModalEditDetailProject(!modalEditDetailProject)
  }

  // Alert Modal Name------------------------------------------------------
  const [modalAlertName, setModalAlertName] = useState(false);
  const toggleAlertName = () => {
    setModalAlertName(!modalAlertName)
  }

  // Detail Alert Modal------------------------------------------------------
  const [modalDetailAlert, setModalDetailAlert] = useState(false);
  const toggleDetailAlert = () => {
    setModalDetailAlert(!modalDetailAlert)
  }

  // Manage Modal------------------------------------------------------
  const [modalManage, setModalManage] = useState(false);

  //Pagination------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(state.post.data && state.post.data.length / 6);

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  const prev = () => {
      setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  const jump = (page) => {
      const pageNumber = Math.max(1, page);
      setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  //Pagination data array
  const begin = (currentPage - 1) * 6;
  const end = begin + 6;
  const dataPage = searchResults && searchResults.slice(begin, end);

  //Pagination displaying numbers
  const handleClick = number => {
    setCurrentPage(number)
  };

  const pageNumbers = [];
  for ( let i=1; i<=maxPage; i++) {
    pageNumbers.push(i);
  }
  
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <div className="page-grid number pointer" key={number} id={number} onClick={() => handleClick(number)}>{number}</div>
    );
  });

  return (
      <Container className="themed-container" fluid={true}>
        <Row className="p-170-150">
          <Col md="6"className="relative">
          <img src={require("./../Assets/images/laptop.png")} alt="" className="laptop-bg-list"/>
            <Card className="card-left white-text p-50 h-100">
              <CardBody className="info-onyx respons-list-3">
                <div className="wi-100 z-2">
                  <h1 className="we-800">Hi { stateAuth.userById.first_name}..</h1>
                  <p>Welcome back to the workspace, we missed You!</p>
                  <Input
                  type="search"
                  name="search"
                  placeholder="Search Task or Project.."
                  className="simple-search wi-60"
                  value={searchTerm}
                  onChange={handleSearch}
                  />
                  
                  <h5><span id="TooltipExample" onClick={toggleCreate} className="pointer"><i className="fa fa-plus-circle"></i> Your Projects ( {state.post.data && state.post.data.length} ) </span></h5>
                  
                  <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                    Add your project..
                  </Tooltip>

                  {/* Create */}
                  <Modal isOpen={modal} toggle={toggleCreate} className="blue-text">
                    <ModalHeader toggle={toggleCreate}><h1 className="white-text">Create Project</h1></ModalHeader>
                    <ModalBody className="body-bg-modal border-0">
                    <Form>
                        <Input 
                          type="text" 
                          name="project_name" 
                          placeholder="Task Name" 
                          className="simple-form-list" 
                          value={formData.project_name}
                          onChange={handleChange}/>
                        <Input 
                          type="textarea" 
                          id="inputIdList" 
                          name="project_description" 
                          placeholder="Task Description" 
                          className="simple-form-list"
                          value={formData.project_description}
                          onChange={handleChange}/>
                    </Form>
                    </ModalBody>
                    <ModalFooter className="body-bg-modal border-0">
                      <Button className="grad-color" onClick={handleSubmit}>Save Task</Button>{' '}
                      <Button color="secondary" onClick={toggleCreate}>Cancel</Button>
                    </ModalFooter>
                  </Modal>

                  {/* Alert fill name*/}
                  <Modal isOpen={modalAlertName} toggle={toggleAlertName} className="warning-text">
                    <ModalHeader toggle={toggleAlertName}><h1 className="white-text">Oops..!</h1></ModalHeader>
                    <ModalBody className="body-bg-modal border-0 text-center">
                      <h3 className="mt-2">Please fill your project name..</h3>
                    </ModalBody>
                    <ModalFooter className="body-bg-modal border-0">
                      <Button className="grad-warning-color blue-text" onClick={toggleAlertName}>OK!</Button>{' '}
                    </ModalFooter>
                  </Modal>

                  {/* Detail Alert */}
                  <Modal isOpen={modalDetailAlert} toggle={toggleDetailAlert} className="warning-text">
                    <ModalHeader toggle={toggleDetailAlert}><h1 className="white-text">Oops..!</h1></ModalHeader>
                    <ModalBody className="body-bg-modal border-0 text-center">
                      <h3 className="mt-2">Please fill hour estimation field</h3>
                    </ModalBody>
                    <ModalFooter className="body-bg-modal border-0">
                      <Button className="grad-warning-color blue-text" onClick={toggleDetailAlert}>OK!</Button>{' '}
                    </ModalFooter>
                  </Modal>
                  
                  {/* <Row className="d-flex justify-content-center mt-4"> */}
                  <Row className={state.loading || state.post.data.length === 0 ? "d-flex justify-content-center mt-4" : "d-flex mt-4"}>
                    {state.loading ? <Loader />:
                      // state.post.data && state.post.data.map((data, index) => (
                      //   <Col key={index} md="4" className="grid-task pointer"
                      //     onClick={() => { 
                      //       setModalManage(!modalManage); 
                      //       setId_edit(data.id); 
                      //       setId_delete(data.id); 
                      //       setProject_id_detail(data.id);
                      //       setProjName(data.project_name)
                      //       setDesc(data.project_description)
                      //       }}>
                      //         {data.project_name}
                      //   </Col>
                      // ))    
                       dataPage && dataPage.map((data, index) => (
                        <Col key={index} md="4" className="grid-task pointer"
                          onClick={() => { 
                            setModalManage(!modalManage); 
                            setId_edit(data.id); 
                            setId_delete(data.id); 
                            setProject_id_detail(data.id);
                            setProjName(data.project_name)
                            setDesc(data.project_description)
                            }}>
                              {data.project_name}
                        </Col>
                      ))    
                    }
                    {state.post.data && state.post.data.length === 0 && <h1>No Project</h1>}
                    {state.error ? <h1>{state.error}</h1> : null}
                  </Row>

                  <div className="d-flex page-parent">
                    <div className="page-grid pointer" onClick={prev}>prev</div>                  
                    {renderPageNumbers}           
                    <div className="page-grid pointer" onClick={next}>next</div>           
                  </div>

                  {/* <div className="d-flex page-parent-current">
                    <div className="page-grid number pointer">{currentPage}</div>         
                  </div> */}

                  {/* Manage */}
                  <Modal isOpen={modalManage} toggle={()=>{setModalManage(!modalManage)}} className="blue-text">
                    <ModalHeader toggle={()=>{setModalManage(!modalManage)}}><h2 className="text-center white-text">{desc === "" ? "No description" : desc}</h2></ModalHeader>
                    <ModalBody className="d-flex flex-column manage">
                    <div className="d-flex justify-content-center wi-100 mb-3">
                        <Button className="grad-color wi-60" onClick={() => {
                            setModalManage(!modalManage); 
                            toggleDisplayDetail(); 
                            // setTimeout(()=>getDetailByProjectId(project_id_detail), 1500);
                            getDetailByProjectId(project_id_detail);
                            }}><i className="fa fa-info-circle"></i> Check Detail Project</Button>{' '}
                      </div>
                      <div className="d-flex justify-content-center wi-100 mb-3"> 
                        <Button className="grad-color wi-60" onClick={toggleDetail}><i className="fa fa-plus-circle"></i> Add Detail Project</Button>{' '}
                      </div>
                      <div className="d-flex justify-content-center wi-100 mb-3">
                        <Button className="grad-color wi-60" onClick={toggleEdit}><i className="fa fa-edit"></i> Edit Project</Button>{' '}
                      </div>
                      <div className="d-flex justify-content-center wi-100 mb-3">
                        <Button className="grad-color wi-60" onClick={toggleDelete}><i className="fa fa-trash"></i> Delete Project</Button>{' '}
                      </div>
                    </ModalBody>
                  </Modal>

                  {/* Edit Project */}
                  <Modal isOpen={modalEditProject} toggle={toggleEdit} className="blue-text">
                    <ModalHeader toggle={toggleEdit}><h1 className="white-text">Edit Project</h1></ModalHeader>
                    <ModalBody className="body-bg-modal border-0">
                    <Form>
                        <Input 
                          type="text" 
                          placeholder={projName} 
                          className="simple-form-list" 
                          value={project_name_edit}
                          onChange={(e)=>setProject_name_edit(e.target.value)}/>
                        <Input 
                          type="textarea" 
                          id="inputIdList" 
                          placeholder={desc === "" ? "No Description" : desc}
                          className="simple-form-list"
                          value={project_description_edit}
                          onChange={(e)=>setProject_description_edit(e.target.value)}/>
                    </Form>
                    </ModalBody>
                    <ModalFooter className="body-bg-modal border-0">
                      <Button className="grad-color" onClick={handleSubmitEdit}>Save Task</Button>{' '}
                      <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
                    </ModalFooter>
                  </Modal>

                  {/* Delete Project */}
                  <Modal isOpen={modalDeleteProject} toggle={toggleDelete} className="blue-text">
                    <ModalHeader toggle={toggleDelete}><h1 className="warning-text white-text">Delete Project</h1></ModalHeader>
                      <ModalBody className="d-flex justify-content-center body-bg-modal border-0">
                        <Button className="grad-warning-color m-2 del-button blue-text" onClick={handleSubmitDelete}><i className="fa fa-trash"></i> Delete Task</Button>{' '}
                        <Button className="grad-color m-2 del-button" onClick={toggleDelete}>Cancel</Button>
                      </ModalBody>
                  </Modal>

                  {/* Detail Project*/}
                  <Modal isOpen={modalDetailProject} toggle={toggleDetail} className="blue-text">
                    <ModalHeader toggle={toggleDetail}><h1 className="white-text">Create Detail Project</h1></ModalHeader>
                    <ModalBody className="body-bg-modal border-0">
                    <Form>
                      <Input 
                        type="date" 
                        placeholder="Date" 
                        className="simple-form-list" 
                        value={day || ""}
                        onChange={(e)=>setDay(e.target.value)}/>
                      <Input 
                        type="number" 
                        placeholder="Hour Estimation" 
                        className="simple-form-list" 
                        value={hours || ""}
                        onChange={(e)=>setHours(e.target.value)}/>
                      <Input 
                        type="textarea" 
                        id="inputIdList" 
                        placeholder="Notes" 
                        className="simple-form-list"
                        value={note}
                        onChange={(e)=>setNote(e.target.value)}/>
                    </Form>
                    </ModalBody>
                    <ModalFooter className="body-bg-modal border-0">
                      <Button className="grad-color" onClick={handleSubmitDetail}>Save Detail Task</Button>{' '}
                      <Button color="secondary" onClick={toggleDetail}>Cancel</Button>
                    </ModalFooter>
                  </Modal>

                  {/* Display Detail Project*/}
                  <Modal isOpen={modalDisplayDetailProject} toggle={toggleDisplayDetail} className="blue-text display-detail">
                    <ModalHeader toggle={toggleDisplayDetail}><h1 className="white-text">Detail Project</h1></ModalHeader>
                    <ModalBody className="d-flex justify-content-center detail">
                      <Card className="card-detail p-25 white-text h-100">
                        <CardBody className="round-10">
                          <div className="wi-100 z-2">
                            <h3 className="we-800 mb-5">{desc === "" ? "No Description" : desc}</h3> 
                            <div>
                              <Row className="text-center border-head">
                                <Col md="3">Date</Col>
                                <Col md="3">Hour Estimation</Col>
                                <Col md="3">Note</Col>
                                <Col md="3">Action</Col>
                              </Row>
                              {stateDetail.loading ? <div className="d-flex justify-content-center mt-4"><Loader /></div>:
                                stateDetail.detail.data && stateDetail.detail.data.map ((data,i) => (
                                  <span key={i}>
                                    <Row className="text-center border-body">
                                      <Col md="3">{ new Date(data.day).toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</Col>
                                      <Col md="3">{data.hours}</Col>
                                      <Col md="3">{data.note === "" ? "No Note" : data.note}</Col>
                                      <Col md="3">
                                        <Button className="grad-color btn-detail-modal" 
                                          onClick={()=> {
                                            toggleDisplayDetailEdit();
                                            setDetail_id(data.id);
                                          }}>
                                          <i className="fa fa-edit"></i>
                                        </Button>
                                        <Button className="grad-color btn-detail-modal grad-warning-color warning-text" 
                                          onClick={() => {
                                            toggleDisplayDetailDelete();
                                            setId_delete_detail(data.id);
                                          }}>
                                            <i className="fa fa-trash"></i>
                                        </Button>
                                      </Col>
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
                      <Button className="grad-color" onClick={toggleDisplayDetail}>OK</Button>
                    </ModalFooter>
                  </Modal>

                  {/* Display Detail Delete */}
                  <Modal isOpen={modalDeleteDetailProject} toggle={toggleDisplayDetailDelete} className="blue-text">
                    <ModalHeader toggle={toggleDisplayDetailDelete}><h1 className="warning-text white-text">Delete Detail Task</h1></ModalHeader>
                      <ModalBody className="d-flex justify-content-center body-bg-modal border-0">
                        <Button className="grad-warning-color m-2 del-button blue-text" onClick={handleSubmitDeleteDetail}><i className="fa fa-trash"></i> Delete Task</Button>{' '}
                        <Button className="grad-color m-2 del-button" onClick={toggleDisplayDetailDelete}>Cancel</Button>
                      </ModalBody>
                  </Modal>

                  {/* Display Detail Edit*/}
                  <Modal isOpen={modalEditDetailProject} toggle={toggleDisplayDetailEdit} className="blue-text">
                    <ModalHeader toggle={toggleDisplayDetailEdit}><h1 className="white-text">Edit Detail Task</h1></ModalHeader>
                    <ModalBody className="body-bg-modal border-0">
                    <Form>
                      <Input 
                        type="number" 
                        placeholder="Edit Hour Estimation" 
                        className="simple-form-list" 
                        value={hours_edit || ""}
                        onChange={(e)=>setHours_edit(e.target.value)}/>
                      <Input 
                        type="textarea" 
                        id="inputIdList" 
                        placeholder="Edit Notes" 
                        className="simple-form-list"
                        value={note_edit}
                        onChange={(e)=>setNote_edit(e.target.value)}/>
                    </Form>
                    </ModalBody>
                    <ModalFooter className="body-bg-modal border-0">
                      <Button className="grad-color" onClick={handleSubmitDetailEdit}>Save Detail Task</Button>{' '}
                      <Button color="secondary" onClick={toggleDisplayDetailEdit}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-right p-25 blue-text h-100">
              <CardBody className="white-bg p-50 round-10 info-onyx">
                <div className="wi-100 z-2">
                    <h1 className="we-800 mb-4 respons-list-2">Onyx Island Info</h1> 
                    <ul className="respons-list">
                      <li>
                        <h5>Monday, 16 March 2020</h5> 
                        <h5 className="we-800 ml-3">Public Holiday</h5>
                      </li>
                      <li>
                        <h5>Tuesday, 17 March 2020</h5> 
                        <h5 className="we-800 ml-3">Public Holiday</h5>
                      </li>
                    </ul>
                  </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default TaskList;