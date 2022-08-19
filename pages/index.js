import styles from '../styles/Home.module.css'
import {Button, Form, Modal} from "react-bootstrap";
import { useQuery } from 'react-query';
import axios from 'axios'
import {useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useMutation } from "react-query";
import Router from 'next/router'
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

export default function Home( ){

  const {data, error, isError, isLoading} = useQuery('listCats', fetchCategory);
  const { user } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [role, setRole] = useState('');
  const mutation = useMutation((id) => {
    deleteCategory(JSON.parse(user).token, id)
})

  const handleDelete = (id) => {
    mutation.mutate(id);
    Router.reload();
  }



  function isJsonString(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }

  
  useEffect(() => {
    if(isLoggedIn){
     if(isJsonString(user)){
      setRole(JSON.parse(user).role);
     }else{
      setRole(user.role)
     
     }

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
      <h1></h1>

      {(role=="admin")?
      (<div>
      <div >
      <button type="button" className="btn btn-secondary"><Link href={'threads/createCategory'}>Add Category</Link></button>
      <h1>List Category</h1>
      </div>

      {
          data.map((cat)=>{
              return (<div key={cat.id}>
                <button onClick={()=>handleDelete(cat.id)} type="button" className="btn btn-secondary">Delete Category</button>
                <Category{...cat}/>
             

                <li><Link href={'threads/' + cat.id}>{cat.name}</Link> </li>
                    </div>
              )
          })
      }

      </div>):
      (<div>

      {
          data.map((cat)=>{
              return <li key={cat.id}>
                 <Link href={'threads/' + cat.id}>{cat.name}</Link> </li>
          })
      }
      </div>)
      
      }
      
 
      </div>
  )
}

function Category({name, id}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useSelector((state) => state.auth);
  const mutation = useMutation(formData => {
      editCategory(formData, JSON.parse(user).token, id)
  })
 

 

  const handleSubmit = async (event) => {
    event.preventDefault();
        const name = event.target[0].value;
        mutation.mutate({name: name})
        Router.reload();
        };
  
  return (
    <div>

    {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          

           
        </>
      )}
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




