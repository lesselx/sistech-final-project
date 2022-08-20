import React from "react";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from 'axios'
import { useRouter } from "next/router";

function postCategory(formData, token){
 
    const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}

    return axios.post('https://avatar.ristek.cs.ui.ac.id/category/', formData, config )  

}
function CreateCategory() {  
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    function getToken(){
      try {
        JSON.parse(user);
      } catch (e) {
        return user;
    }
    return JSON.parse(user);

    }

  
    const mutation = useMutation(formData => {
        postCategory(formData, getToken().token)
    }, { onSuccess: () => {

      alert("Succesfully Added");
      router.push('/')
      


      
    }} )
   

    const handleSubmit = async (event) => {
      event.preventDefault();
          const name = event.target[0].value;
          mutation.mutate({name: name})
        
          };
    
    
  return (
    
    <div className='login'>



        
     
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleLabelCategory" className="form-label">Nama Kategori</label>
          <input type="text" className="form-control" id="exampleInputCategory" required/>
        </div>
      
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>


    </div>
  )
}

export default CreateCategory