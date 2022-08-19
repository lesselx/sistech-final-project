import Router, {useRouter} from "next/router";
import { useSelector } from "react-redux";
import React, {useEffect, useState} from 'react'
import { useQuery } from 'react-query';
import Link from "next/link";
import axios from 'axios'
import { useMutation } from "react-query";
import {Button, Form, Modal} from "react-bootstrap";
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



    return (
      
     

<div className='threads'> 
     
      {(isLoggedIn)?
      (<div>
      <div >
      <button type="button" className="btn btn-secondary"><Link href={`/threads/${catId}/createThread`}>Add Thread</Link></button>
      <h1>List Threads</h1>
      </div>
      
      {(role=="admin")?
      (<div>

        {
          data.data?.map((tr)=>{
              return (<div key={tr.id}>
                <button onClick={()=>handleDelete(tr.id)} type="button" className="btn btn-secondary">Delete Thread</button>
     
                <Link href={'/threads/' + catId+'/posts/'+tr.id}>{tr.name}</Link>
                    </div>
              )
          })
        }

      </div>):

      (<div>

        {
          (data.data)?.map((thread)=>{
        
             return (
                 <div key={thread.id}>
        
                <Link href={'/threads/' + catId+'/posts/'+thread.id}>{thread.name}</Link>
                </div>
              )
          
          })
        }

      </div>)
      
      }

      </div>):
      (<div>

        {
          (data.data)?.map((thread)=>{
        
             return (
                 <div key={thread.id}>
                <Link href={'/threads/' + catId+'/posts/'+thread.id}>{thread.name}</Link>
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