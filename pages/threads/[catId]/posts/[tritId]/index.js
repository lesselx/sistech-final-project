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
        sendVote(formData, getUserData().token)
    }, {onSuccess: () => {
      alert("Voted Successfully")
    }})
    
    const handleLike = (Pid, ownerId) => {
      if(ownerId==id){
        alert("Can't vote your own post")
      }else{
        mutation.mutate({postId:Pid, voteType:"upvote"});    
      }
       
  
     
   
      }

      const handleDislike = (Pid, ownerId) => {
   
     
        if(ownerId==id){
          
          alert("Can't vote your own post")
        }else{
          mutation.mutate({postId:Pid, voteType:"downvote"});    
        }
   
      }




    const deleteMutation = useMutation((pId) => {
        deletePost(getUserData().token, pId)
    }, {onSuccess: () => {
      alert("Delete Successfully")
  
      
    }})
  
    

    const handleDeletePost = (id) => {
        deleteMutation.mutate(id);    
 

      }


    function getUserData(){
      try {
        JSON.parse(user);
      } catch (e) {
        return user;
    }
    return JSON.parse(user);
  
    }

    

    useEffect(() => {
      if(isLoggedIn){
        setId(jwtDecode(getUserData().token).iss);
            setRole(getUserData().role);
            setToken(getUserData().token);

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
<h1> {posts.name}</h1>
      
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
                    <Card>
                    {
                    (role=="admin" && !post.isStarter)?
                    (<div>
                    <Button className="position-absolute top-0 end-0" onClick={()=>handleDeletePost(post.id)} >Delete Post</Button>
                    </div>)
                    :(<div>

                    {
                    (post.owner==id)?
                    
                    <Post postId={post.id} token={token} content={post.content} />
                    :(<div>

                        

                    </div>)
                    }

                    </div>)
                    }
               
                    {(post.edited)?(<div>edited</div>):
                    (<div></div>)}
                    <p>posted by {post.owner}</p>
                    <p> {post.content}</p>
                    
                    <Card.Footer>
                    <div className="py-2">
                      
                    <Button onClick={()=>handleLike(post.id, post.owner)} variant="primary">Upvote {post.upvote}</Button>

                    </div>
                    <Button onClick={()=>handleDislike(post.id, post.owner)}  variant="primary">Downvote {post.downvote}</Button>
                
                    <CreatePost token={token} trId={tritId} repId={post.owner}/>
                 
                    </Card.Footer>
            

               

               

                    </Card>
                
                </div>)
          
          })
            }




        </div>)
        :(<div>
      { 
                posts.data?.map((post, idx)=>{
              return (<div key={idx}>

<Card>
                 
                    <p>posted by {post.owner}</p>
                    <p> {post.content}</p>
                    
            
                    <Card.Footer>
                    <div className="py-2">
                      
                    <Button variant="primary">Upvote {post.upvote}</Button>

                    </div>
                    <Button variant="primary">Downvote {post.downvote}</Button>
                
                    <CreatePost token={token} trId={tritId} repId={post.owner}/>
                 
                    </Card.Footer>
               

            

                    </Card>
               
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
  const mutation = useMutation(formData => {
      editThread(formData, token, tritId)
  })
 

 

  const handleSubmit = async (event) => {
    event.preventDefault();
        const nama = event.target[0].value;
        mutation.mutate({name: nama})
       
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
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const mutation = useMutation(formData => {
      editPost(formData, token, postId)
  })
 

 

  const handleSubmit = async (event) => {
    event.preventDefault();
        const content = event.target[0].value;
        mutation.mutate({content: content})
   
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
  }, {onSuccess: () => {
    alert("Replied Successfully")
    router.reload();
  }})
 

 

  const handleSubmit = async (event) => {
    event.preventDefault();
        const content = event.target[0].value;
        mutation.mutate({content: content, threadId:trId, replyId: repId})
      
        };
  
  return (
    <div>
<div className="py-2"><Button variant="primary" onClick={handleShow}>
                  Reply Post
                </Button></div>
        

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
                        Reply
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