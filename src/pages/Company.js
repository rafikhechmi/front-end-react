import {useEffect, useState} from 'react';
import { Container, Row, Col, Table, Button , Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input} from 'reactstrap'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const initialValues={
  id:0,
  name:'',
  address:'',
  zipcode:'',
  Country:0,
}

function Home() {
  
  const [modal, setModal] = useState(false);

  const toggle=()=>{
    setModal(!modal);
    if(modal===true){
      setCompany(initialValues);
    }
  }

  const [list, setList]= useState([]);
  const [company, setCompany]= useState(initialValues);
 
  const handleChangeValues=(e)=>{
    const {name, value}= e.target;
    setCompany({...company,[name]:value});
  }

 
  const saveData=async (e)=>{
    e.preventDefault();
    if(company.id === 0){
      await fetch(`http://localhost:3001/company/new`,{
        method: 'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(company)
      }).then(res => getData());
      toggle();
    }
    if(company.id !== 0){
      await fetch(`http://localhost:3001/company/update/${company.id}`,{
        method: 'PATCH',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(company)
      }).then(getData()).then(toggle());
    }
    
  }

  const getData=async ()=>{
    await fetch('http://localhost:3001/company/list')
    .then(res => res.json())
    .then(res=> setList(res.data)); 
  }

  const updateData=(id)=>{
    const el = list.find((el)=> el.id === id);
    
    setCompany(el);
    toggle();
  }

  const deleteData=async (id)=>{
    await fetch(`http://localhost:3001/company/delete/${id}`,{
      method: 'DELETE',
    })
    setList(list.filter((el)=>el.id !== id))
  };

  useEffect( ()=>{
    getData();
  },[]);

  return (
    <div className="App">
     <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>CRUD Company</h1>
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
                  <Input type="hidden" name="id" value={company.id} />
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" onChange={handleChangeValues} value={company.name} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="address">address</Label>
                    <Input type="text" name="address" id="address" onChange={handleChangeValues} value={company.address}  />
                  </FormGroup>
                  <FormGroup>
                    <Label for="zipcode">zipcode</Label>
                    <Input type="number" name="zipcode" id="zipcode" onChange={handleChangeValues} value={company.zipcode}  />
                  </FormGroup>
                  <FormGroup>
                    <Label for="country">country</Label>
                    <Input type="text" name="country" id="country" onChange={handleChangeValues} value={company.country} />
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
                  <th>Name</th>
                  <th>Address</th>
                  <th>ZipCode</th>
                  <th>Country</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((el)=>(
                  <tr key={el.id}>
                    <th scope="row">{el.id}</th>
                    <td>{el.name}</td>
                    <td>{el.address}</td>
                    <td>{el.zipcode}</td>
                    <td>{el.country}</td>
                    <td>
                      <Button color="warning" onClick={()=>updateData(el.id)}><EditIcon/>Edit</Button>
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

export default Home;
