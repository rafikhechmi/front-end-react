import {useEffect, useState} from 'react';
import { Container, Row, Col, Table, Button , Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input} from 'reactstrap'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const initialValues={
  id:0,
  firstName:'',
  lastName:'',
  email:'',
  phone:0,
  companyId:0
}
function Contact() {
  
  const [list, setList]= useState([]);
  const [listCompany, setListCompany]= useState([]);

  const [contact, setContact] = useState(initialValues);

  const [modal, setModal] = useState(false);

  const toggle=()=>{
    setModal(!modal);
    if(modal===true){
      setContact(initialValues);
    }
  }
  const handleChangeValues=(e)=>{
    const {name, value}= e.target;
    setContact({...contact,[name]:value});
  }
  

  const saveData= async(e)=>{
    e.preventDefault();
    
    if(contact.id===0){
      await fetch(`http://localhost:3001/contact/new`,{
        method: 'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(contact)
      }).then(getData());
    }else{
      await fetch(`http://localhost:3001/contact/update/${contact.id}`,{
        method: 'PATCH',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(contact)
      }).then(getData());
    }
    toggle();
  }

  const getData=async ()=>{
    await fetch('http://localhost:3001/contact/list')
    .then(res => res.json())
    .then(res=> setList(res.data)); 
  }
  const getData2=async ()=>{
    await fetch('http://localhost:3001/company/list')
    .then(res => res.json())
    .then(res=> setListCompany(res.data)); 
  }

  const updateData=(id)=>{
    const el = list.find((el)=> el.id === id);
    //rigelha !!!!!
    setContact(el);
    console.log(el);
    toggle();
  }

  const deleteData=async (id)=>{
    await fetch(`http://localhost:3001/contact/delete/${id}`,{
      method: 'DELETE',
    })
    setList(list.filter((el)=>el.id !== id))
  };

  

  useEffect( ()=>{
    getData2();
    getData();
  },[]);

  return (
    <div className='products'>
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>CRUD Contact</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Button color="success" onClick={toggle} style={{ float: "left", marginRight:"10px" }}><AddCircleIcon/>Add</Button>
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} >add</ModalHeader>
                <ModalBody>
                <Form onSubmit={saveData}>
                  <Input type="hidden" name="id" value={contact.id} />
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" id="name" onChange={handleChangeValues} value={contact.firstName} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" onChange={handleChangeValues} value={contact.lastName}  />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="zipcode" onChange={handleChangeValues} value={contact.email}  />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="number" name="phone" id="phone" onChange={handleChangeValues} value={contact.phone} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="omcpanyId">Company</Label>
                    <select className="select-container" name="companyId" onChange={handleChangeValues} value={contact.companyId}>
                      <option value='0'>select</option>
                    {listCompany.map((option) => (
                      <option  key={option.id} value={option.id}>{option.name}</option>
                    ))}
                    </select>
                  </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                <Button variant="secondary" onClick={toggle} >Close</Button>
                  <Button type="submit"onClick={saveData}>Submit</Button>
                </ModalFooter>
                
              </Modal>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive hover >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((el)=>(
                  <tr key={el.id}>
                    <th scope="row">{el.id}</th>
                    <td>{el.firstName}</td>
                    <td>{el.lastName}</td>
                    <td>{el.email}</td>
                    <td>{el.phone}</td>
                    <td>{el.name}</td>
                    <td>
                      <Button color="warning" onClick={()=>updateData(el.id)}><EditIcon/>edit</Button>
                      {' '}
                      <Button color="danger" onClick={()=>deleteData(el.id)}><DeleteIcon/>Delete</Button>
                    </td>
                  </tr>
                  
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default Contact;