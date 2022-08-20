
import {Button, Form, Modal, ListGroup} from "react-bootstrap";
import { useQuery } from 'react-query';
import axios from 'axios'
import {useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useMutation } from "react-query";
import { useRouter } from "next/router";
export async function getServerSideProps() {
  // Fetch data from external API
  const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52"}}
  const res = await fetch(`https://avatar.ristek.cs.ui.ac.id/category/`, config)
  const cats = await res.json()
  console.log(cats);

  // Pass data to the page via props
  return { props: { cats } }
}

async function fetchCategory(){
  if (typeof window !== 'undefined') {
    const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52"}}
    const {data} = await axios.get('https://avatar.ristek.cs.ui.ac.id/category/', config)  
   

    return data
  }


}

function editCategory(formData, token, id){
 
  const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}

  return axios.put('https://avatar.ristek.cs.ui.ac.id/category/'+id, formData, config )  

}

function deleteCategory(token, id){
 
  const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}

  return axios.delete('https://avatar.ristek.cs.ui.ac.id/category/'+id, config )  

}

export default function Home( {cats} ){

  const {data, error, isError, isLoading} = useQuery('listCats', fetchCategory, {initialData: cats});
  const { user } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [role, setRole] = useState('');
  const router = useRouter();

  const mutation = useMutation((id) => {
    deleteCategory(getToken().token, id)
}, { onSuccess: () => {
  alert("Deleted succesfully")
    router.reload();
}} )

  const handleDelete = (id) => {
    mutation.mutate(id);
  }

  
  function getToken(){
    try {
      JSON.parse(user);
    } catch (e) {
      return user;
  }
  return JSON.parse(user);

  }



  
  useEffect(() => {
    if(isLoggedIn){
      setRole(getToken().role)
    }  
  });



  if(isLoading){
      return <div>Loading ...</div>
  }

  if(isError){
      return <div>Error ...{error.message}</div>
  }

  return(
      <div className='container'> 
      <h1>List Category</h1>
      {(role=="admin")?
      (<div>
        <div  className="pb-4">

        <Button className="border border-5 rounded-start" variant="dark" ><Link href={'threads/createCategory'}>Add Category</Link></Button>
        </div>
    


    

      {
          data.map((cat)=>{
              return (
              <div key={cat.id}>
              
                <Category token={getToken().token} {...cat}/>

                 <ListGroup as="ol" numbered>
                  <div className="cat">
                
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start" >
                    <div className="ms-2 me-auto">
   
                    <Link href={'threads/' + cat.id}>{cat.name}</Link> 
                    <Button className="position-absolute top-0 end-0" onClick={()=>handleDelete(cat.id)}  variant="primary" >Delete Category</Button>
                    </div>
                   
                  </ListGroup.Item>
          
                  </div>
                </ListGroup>
                    </div>
              )
          })
      }

      </div>):
      (<div>

      {
          data.map((cat)=>{
              return (<div key={cat.id}>
                  <ListGroup as="ol" numbered>
                  <div className="cat">
                
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start" >
                    <div className="ms-2 me-auto">
                    
                    <Link href={'threads/' + cat.id}>{cat.name}</Link> 
                    </div>
                   
                  </ListGroup.Item>
          
                  </div>
                </ListGroup>
                </div>)
          })
      }
      </div>)
      
      }
      
 
      </div>
  )
}

function Category({name, id, token}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useSelector((state) => state.auth);
  const mutation = useMutation(formData => {
      editCategory(formData, token, id)
  })
 

 

  const handleSubmit = async (event) => {
    event.preventDefault();
        const name = event.target[0].value;
        mutation.mutate({name: name})
        };
  
  return (
    <div>


        <Button variant="primary" onClick={handleShow}>
                  Edit Category
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={name}
                          />
                        </Form.Group> 
                  
                        <Button variant="primary" type='submit'>
                        Edit
                      </Button>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                
                    </Modal.Footer>
                  </Modal>

    </div>
  );
}




