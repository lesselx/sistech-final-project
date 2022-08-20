import Router, {useRouter} from "next/router";
import { useSelector } from "react-redux";
import React, {useEffect, useState} from 'react'
import { useQuery } from 'react-query';
import Link from "next/link";
import axios from 'axios'
import { useMutation } from "react-query";
import {Button, ListGroup} from "react-bootstrap";
async function fetchThreads(id){
    
      const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52"}}
      const data = await fetch('https://avatar.ristek.cs.ui.ac.id/category/'+id, config)  

      return data.json();
    }
      
      
function deleteThread(token, id){
       
        const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}
      
        return axios.delete('https://avatar.ristek.cs.ui.ac.id/thread/'+id, config )  
      
      }
  
function Threads() {


    const router = useRouter();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const {catId}=router.query;
    const {data, error, isError, isLoading} = useQuery('listThreads', ()=> fetchThreads(catId));
    const [role, setRole] = useState('');

  

    const mutation = useMutation((id) => {
        deleteThread(JSON.parse(user).token, id)
    }, { onSuccess: () => {
      alert("Deleted succesfully")
        router.reload();
    } })
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



    return (
      
     

<div className='container'> 
<h1>List Threads</h1>
      {(isLoggedIn)?
      (<div>
      <div className="pb-2">
      <Button variant="success"><Link href={`/threads/${catId}/createThread`}>Add Thread</Link></Button>
     
      </div>
      
      {(role=="admin")?
      (<div>

        {
          data.data?.map((tr)=>{
              return (<div className="pb-2" key={tr.id}>
                <button onClick={()=>handleDelete(tr.id)} type="button" className="btn btn-secondary">Delete Thread</button>
     
                <ListGroup as="ol" numbered >
                  <div className="cat">
                
                  <ListGroup.Item variant="success"
                    as="li"
                    className="d-flex justify-content-between align-items-start" >
                    <div className="ms-2 me-auto">
                  
                    <Link href={'/threads/' + catId+'/posts/'+tr.id}>{tr.name}</Link>
                    
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
          (data.data)?.map((thread)=>{
        
             return (
              
              <ListGroup as="ol" numbered>
              <div className="cat">
            
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start" >
                <div className="ms-2 me-auto">
                
                <Link href={'/threads/' + catId+'/posts/'+thread.id}>{thread.name}</Link>
                
                </div>
               
              </ListGroup.Item>
      
              </div>
            </ListGroup>
              )
          
          })
        }

      </div>)
      
      }

      </div>):
      (<div>

        {
          (data.data)?.map((thread  )=>{
        
             return (
                 <div className="pb-2 " key={thread.id}>


                <ListGroup  as="ol" numbered>
                  <div className="cat">
                
                  <ListGroup.Item variant="success"
                    as="li"
                    className="d-flex justify-content-between align-items-start" >
                    <div className="ms-2 me-auto">
                 
                    <Link href={'/threads/' + catId+'/posts/'+thread.id}>{thread.name}</Link>

                    </div>
                   
                  </ListGroup.Item>
          
                  </div>
                </ListGroup>


        
               
                </div>
              )
          
          })
        }
      </div>)
      
      }
      
 
      </div>
        

       


     
  
   
    )
}



export default Threads