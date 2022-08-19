import Router, {useRouter} from "next/router";
import { useSelector } from "react-redux";
import React, {useEffect, useState} from 'react'
import { useQuery } from 'react-query';
import axios from 'axios'
import { useMutation } from "react-query";
import {Button, Form, Modal, Card} from "react-bootstrap";
import jwtDecode from "jwt-decode";

function deletePost(token, id){
       
    const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}
  
    return axios.delete('https://avatar.ristek.cs.ui.ac.id/post/'+id, config )  
  
  }

  function editPost(formData, token, id, ){
       
    const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}
  
    return axios.put('https://avatar.ristek.cs.ui.ac.id/post/'+id, formData, config )  
  
  }

function editThread(formData, token, id){
 
    console.log(token)
    console.log(id)
    const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}
  
    return axios.put('https://avatar.ristek.cs.ui.ac.id/thread/'+id, formData, config )  
  
  }

async function fetchPosts(id){
    
      const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52"}}
      const data = await fetch('https://avatar.ristek.cs.ui.ac.id/thread/'+id, config)  

      return data.json();
    }

function createPost(formData, token){
 
        const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}
      
        return axios.post('https://avatar.ristek.cs.ui.ac.id/post/', formData, config )  
      
      } 

function sendVote(formData, token){

    const config = {headers: {Authorization: "Bearer 62fca9b9010b337ecc272d52", "X-USER-TOKEN":token}}
      
    return axios.post('https://avatar.ristek.cs.ui.ac.id/post/vote', formData, config )  

}
      
   
  
function Posts() {

    const router = useRouter();
    const {tritId}=router.query;
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const {data:posts, error, isError, isLoading} = useQuery('listPosts', ()=> fetchPosts(tritId));
    const [id, setId] = useState("");
    const [role, setRole] = useState('');
    const [token, setToken] = useState('');

    
    const mutation = useMutation(formData => {
        sendVote(formData, JSON.parse(user).token)
    })
    
    const handleLike = (Pid) => {
        mutation.mutate({postId:Pid, voteType:"upvote"});    
        // Router.reload();
     
   
      }

      const handleDislike = (Pid) => {
        mutation.mutate({postId:Pid, voteType:"downvote"});    
        // Router.reload();
     
   
      }



   


    const deleteMutation = useMutation((pId) => {
        deletePost(JSON.parse(user).token, pId)
    })
  
    

    const handleDeletePost = (id) => {
        deleteMutation.mutate(id);    
        // Router.reload();
     
   
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
        if(isJsonString(user)){
            setId((jwtDecode(JSON.parse(user).token)).iss);
            setRole(JSON.parse(user).role);
            setToken(JSON.parse(user).token);
        }else{
            setId((jwtDecode(user.token)).iss);
            setRole(user.role);
            setToken(user.token);
        }
    
      });

    if(isLoading){
        return <div>Loading ...</div>
    }

    if(isError){
        return <div>Error ...{error.message}</div>
    }




    return (
      
      <div className='posts'>
        {(isLoggedIn)?
        (<div>
        
        
        {(posts.data[0].owner==id)?(
            <div>
            <Thread name={posts.name} tritId={tritId} token={token} />
            </div>)

            :(<div>
            </div>)

        }

            { 
                posts.data?.map((post, idx)=>{
                    return (
                <div key={idx}>
                    
                    {
                    (role=="admin" && idx!==0)?
                    (<div>
                    <button onClick={()=>handleDeletePost(post.id)} type="button" className="btn btn-primary">Delete Post</button>
                    </div>)
                    :(<div>

                    {
                    (post.owner==id && idx!==0)?
                    <Post postId={post.id} token={token} content={post.content} />
                    :(<div>

                        

                    </div>)
                    }

                    </div>)
                    }
                    <Card body>

                    <p>{post.owner}</p>
                    <p> {post.content}</p>
                    
                    <Card.Footer>
                    <Button onClick={()=>handleLike(post.id)} variant="primary">Upvote {post.upvote}</Button>
                    <Button onClick={()=>handleDislike(post.id)}  variant="primary">Downvote {post.downvote}</Button>
                    </Card.Footer>
            

                    </Card>

                    <CreatePost token={token} trId={tritId} repId={post.owner}/>

                  
                
                </div>)
          
          })
            }




        </div>)
        :(<div>
      { 
                posts.data?.map((post, idx)=>{
              return (<div key={idx}>

                posted by {post.owner}
                <p> {post.content}</p>
               
              </div>)
          
          })
            }

        </div>)}
      
    


        </div>
  
   
    )
}

function Thread({name, tritId, token}) {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useSelector((state) => state.auth);
  console.log(tritId)
  const mutation = useMutation(formData => {
      editThread(formData, token, tritId)
  })
 

 

  const handleSubmit = async (event) => {
    event.preventDefault();
        const nama = event.target[0].value;
        console.log(nama)
        mutation.mutate({name: nama})
       
        };
  
  return (
    <div>

    {mutation.isLoading ? (
        'Editing todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          

           
        </>
      )}
        <Button variant="primary" onClick={handleShow}>
                  Edit Thread
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

function Post({postId, token, content}) {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useSelector((state) => state.auth);
  const mutation = useMutation(formData => {
      editPost(formData, token, postId)
  })
 

 

  const handleSubmit = async (event) => {
    event.preventDefault();
        const content = event.target[0].value;
        mutation.mutate({content: content})
        // Router.reload();
        };
  
  return (
    <div>

        <Button variant="primary" onClick={handleShow}>
                  Edit Thread
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Content</Form.Label>
                          <Form.Control
                            type="textarea"
                            defaultValue={content}
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

  function CreatePost({token, trId, repId}) {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useSelector((state) => state.auth);
  const mutation = useMutation(formData => {
      createPost(formData, token)
  })
 

 

  const handleSubmit = async (event) => {
    event.preventDefault();
        const content = event.target[0].value;
        mutation.mutate({content: content, threadId:trId, replyId: repId})
        // Router.reload();
        };
  
  return (
    <div>

        <Button variant="primary" onClick={handleShow}>
                  Reply Post
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Content</Form.Label>
                          <Form.Control
                            type="textarea"
                          />
                        </Form.Group> 
                  
                        <Button variant="primary" type='submit'>
                        Button
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



export default Posts