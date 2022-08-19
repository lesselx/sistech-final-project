import React, { useState, useEffect  } from "react";
import { useSelector } from "react-redux";
import {useRouter} from "next/router";
import { useMutation } from "react-query";
import axios from 'axios'

function postThread(formData, token){
 
    const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}

    return axios.post('https://avatar.ristek.cs.ui.ac.id/thread/', formData, config)  

}
function CreateThread() {  
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [role, setRole] = useState('');
    const router = useRouter();
    const {catId}=router.query;
    
    const { user } = useSelector((state) => state.auth);
    const mutation = useMutation(formData => {
        postThread(formData, JSON.parse(user).token)
    })


    if(mutation.isSuccess){
        console.log("hello");
        console.log(catId);
        if(router.isReady){
            router.push(`/threads/${catId}`)
        }
     
    }
   

   

    const handleSubmit = async (event) => {
      event.preventDefault();
          const title = event.target[0].value;
          const firstPost = event.target[1].value;
          mutation.mutate({categoryId: catId, name: title, firstPost:{content:firstPost}})
          };
    
    
  return (
    
    <div className='login'>
        
        {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          

           
        </>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleLabelCategory" className="form-label">Nama Kategori</label>
          <input type="text" className="form-control" id="exampleInputCategory" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleLabelCategory" className="form-label">Content</label>
          <input type="text" className="form-control" id="exampleInputCategory" required/>
        </div>
      
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>


    </div>
  )
}

export default CreateThread