import {useEffect, useState} from 'react';
import { Container, Row, Col, Table, Button , Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input} from 'reactstrap'
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';



function Quote() {

  const initialValues={
    id:0,
    client:'',
    total:0,
    reduction:0,
    status:'',
    companyId:0,
    items:[]
  }
  
  const itemValue={
    id:0,
    name:'',
    description:'',
    price:0,
    quantity:0
  }

  const [list, setList]= useState([]);
  const [listCompany, setListCompany]= useState([]);
  const [item,setItem] =useState(itemValue);
  const [listItem,setListItem]= useState([]);
  const [quote, setQuote] = useState(initialValues);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle=()=>{
    setModal(!modal);
    if(modal===true){
      setQuote(initialValues);
      setListItem([]);
    }
  }

  const toggle2= async (id)=>{
    setModal2(!modal2);
    if(modal2===false){
      await fetch(`http://localhost:3001/item/list/${id}`)
      .then(res => res.json())
      .then(res=> setListItem([...res.data]));
    }
  }
  const addItem=()=>{
    const sum =quote.total+(item.price*item.quantity);
    setListItem([...listItem,item]);
    setItem(itemValue);
    setQuote({...quote,['total']:sum})
    
  }
  const handleChangeValues=(e)=>{
    const {name, value}= e.target;
    setQuote({...quote,[name]:value});
  }
  
  const handleChangeValues2=(e)=>{
    const {name, value}= e.target;
    setItem({...item,[name]:value});
  }
  const saveData= async(e)=>{
    e.preventDefault();
    console.log(quote);
    quote.items=[...listItem];
    if(quote.id === 0){
      await fetch(`http://localhost:3001/quote/new`,{
        method: 'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(quote)
      }).then(getData());
    }else{
      await fetch(`http://localhost:3001/quote/update/${quote.id}`,{
        method: 'PATCH',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(quote)
      }).then(getData());
    }
    toggle();
  }

  const getData=async ()=>{
    await fetch('http://localhost:3001/quote/list')
    .then(res => res.json())
    .then(res=> setList(res.data)); 
  }

  const getData2=async ()=>{
    await fetch('http://localhost:3001/company/list')
    .then(res => res.json())
    .then(res=> setListCompany(res.data)); 
  }

  const updateData=async (id)=>{
    const el = list.find((el)=> el.id === id);
    //rigelha !!!!!
    setQuote(el);
    await fetch(`http://localhost:3001/item/list/${id}`)
    .then(res => res.json())
    .then(res=> setListItem([...res.data]));
    
    
    toggle();
  }
  const deleteItem= async (id)=>{
    await fetch(`http://localhost:3001/item/delete/${id}`,{
      method: 'DELETE',
    })
    setListItem(listItem.filter((el)=>el.id !== id))
  }

  const deleteData=async (id)=>{
    await fetch(`http://localhost:3001/quote/delete/${id}`,{
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
            <h1 style={{margin: "20px 0"}}>CRUD Quote</h1>
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
                  <Input type="hidden" name="id" id="id" value={quote.id} />
                  <FormGroup>
                  <div className="row">
                    <div className="col-sm-3">
                    <Label for="client">Client</Label>
                    <Input type="text" name="client" id="client" onChange={handleChangeValues} value={quote.client} />
                    </div>
                    <div className="col-sm-3">
                    <Label for="total">Total</Label>
                    <Input type="text" name="total" id="total" onChange={handleChangeValues} value={quote.total} disabled/>
                    </div>
                    <div className="col-sm-3">
                    <Label for="reduction">Reduction</Label>
                    <Input type="text" name="reduction" id="reduction" onChange={handleChangeValues} value={quote.reduction} />
                    </div>
                  </div>
                   </FormGroup>
 
                  <FormGroup>
                  <div className="row">
                    <div className="col-sm-3">
                    <Label for="status">Status</Label>
                    <select className="select-container" name="status" onChange={handleChangeValues} value={quote.status}>
                      <option value='0'>select</option>
                      <option value='approved'>approved</option>
                      <option value='denied'>denied</option>
                    </select>
                    </div>
                    <div className="col-sm-3">
                      <Label for="omcpanyId">Company</Label>
                      <select className="select-container" name="companyId" onChange={handleChangeValues} value={quote.companyId}>
                        <option value='0'>select</option>
                      {listCompany.map((option) => (
                        <option  key={option.id} value={option.id}>{option.name}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                  </FormGroup>
                  
                  <fieldset style={{ border:1}}>
                    <legend>Add Item:</legend>
                    <div className="row">
                    <div className="col-sm-3">
                        <Label for="name">Name</Label>
                        <Input className="col-sm-3" type="text" id="name" name="name" onChange={handleChangeValues2} value={item.name} />
                      </div>
                      <div className="col-sm-3">
                        <Label for="description">Description</Label>
                        <Input className="col-sm-3" type="text" id="description" name="description" onChange={handleChangeValues2} value={item.description} />
                      </div>
                      <div className="col-sm-3">
                        <Label for="price">Price</Label>
                        <Input className="col-sm-3" type="number" id="price" name="price" onChange={handleChangeValues2} value={item.price} />
                      </div>
                      <div className="col-sm-3">
                        <Label for="quantity">Quantity</Label>
                        <Input className="col-sm-3" type="number" id="quantity" name="quantity" onChange={handleChangeValues2} value={item.quantity} />

                      </div>
                      <div className="col-sm-3">
                        <Button color="success" onClick={addItem} ><AddCircleIcon/>Add</Button>
                      </div>
                     </div>
                    </fieldset>
                  
                    {listItem.map((el)=>(  <h1 key={el.id}>{el.name}{' '}{el.description}{' '}{el.price}{' '}{el.quantity}{' '}<Button onClick={()=>{deleteItem(el.id)}}>delete</Button></h1> ))}  
                     
                  
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
        <Modal isOpen={modal2} toggle={toggle2}>
                <ModalBody>
                {listItem.map((el)=>(  <h1 key={el.id}>{el.name}{' '}{el.description}{' '}{el.price}{' '}{el.quantity}</h1> ))}  
                </ModalBody>
        </Modal>
        </Row>
        <Row>
          <Col>
            <Table responsive hover >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Reduction</th>
                  <th>Status</th>
                  <th>Company</th>
                  <th>Items</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((el)=>(
                  <tr key={el.id}>
                    <th scope="row">{el.id}</th>
                    <td>{el.client}</td>
                    <td>{el.total}</td>
                    <td>{el.reduction}</td>
                    <td>{el.status === 'approved' ?  <IconButton aria-label="update"  color="primary"><CheckCircleOutlineIcon/> Approved</IconButton> : <IconButton color="secondary" aria-label="Delete"><HighlightOffIcon/>denied</IconButton>}</td>
                    <td>{el.name}</td>
                    <td> <Button color="warning" onClick={()=>{toggle2(el.id)}}><VisibilityIcon/></Button></td>
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

export default Quote;