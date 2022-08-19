import {useRouter} from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import { useQuery } from 'react-query';
import Link from "next/link";
async function fetchPosts(id){
    
      const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52"}}
      const data = await fetch('https://avatar.ristek.cs.ui.ac.id/thread/'+id, config)  

      return data.json();
    }
      
   
  
function Posts() {
    const router = useRouter();
    const {catId, tritId}=router.query;
    const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52"}}
    // const {data, error, isError, isLoading} = useQuery('listThreads', () =>
    // fetch('https://avatar.ristek.cs.ui.ac.id/category/'+id, config).then(res =>
    //   res.json()));
    const {data:posts, error, isError, isLoading} = useQuery('listPosts', ()=> fetchPosts(tritId));
    if(isLoading){
        return <div>Loading ...</div>
    }

    if(isError){
        return <div>Error ...{error.message}</div>
    }



    return (
      
      <div className='posts'>

           {
                posts.data.map((post, idx)=>{
              return <li key={idx}>{post.content}</li>
          
          })
            }


        </div>
  
   
    )
}

export default Posts