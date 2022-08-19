import {useRouter} from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import { useQuery } from 'react-query';
import Link from "next/link";
async function fetchThreads(id){
    
      const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52"}}
      const data = await fetch('https://avatar.ristek.cs.ui.ac.id/category/'+id, config)  

      return data.json();
    }
      
   
  
function Threads() {
    const router = useRouter();
    const {catId}=router.query;
    const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52"}}
    // const {data, error, isError, isLoading} = useQuery('listThreads', () =>
    // fetch('https://avatar.ristek.cs.ui.ac.id/category/'+id, config).then(res =>
    //   res.json()));
    const {data, error, isError, isLoading} = useQuery('listThreads', ()=> fetchThreads(catId));
    if(isLoading){
        return <div>Loading ...</div>
    }

    if(isError){
        return <div>Error ...{error.message}</div>
    }



    return (
      
      <div className='threads'>
        

           {
          (data.data)?.map((thread)=>{
              return <li key={thread.id}><Link href={'/threads/' + catId+'/posts/'+thread.id}>{thread.name}</Link> </li>
          
          })
            }


        </div>
  
   
    )
}
export default Threads