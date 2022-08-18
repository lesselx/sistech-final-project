import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { useRouter } from "next/router";


function RegisterForm() {  
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router =useRouter();
    const [role, setRole] = useState("user")
    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]);

    if (isLoggedIn) {
      
      if (typeof window !== 'undefined') {
        router.push('/')
      }
      
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(event);
          const username = event.target[0].value;
          const password = event.target[1].value;
          
         if (event.target[2].checked){
              setRole('admin')
         }

          setLoading(true);
          dispatch(register({ username, password, role }))
          .unwrap()
          .then(() => {
            alert(`Account has been created!`);
            // props.history.push("/");
            // window.location.reload();
          })
          .catch(() => {
            alert(`Failed to create account!`);
            setLoading(false);
          });
         
    }
    
  return (
    
    <div className='register'>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" required/>
          <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="admin"/>
        <label className="form-check-label" htmlFor="flexRadioDefault1/">
            Admin
        </label>
        </div>
        <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="user"/>
        <label className="form-check-label" htmlFor="flexRadioDefault2">
            User
        </label>
        </div>
      
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>


    </div>
  )
}

export default RegisterForm