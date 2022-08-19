import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { useRouter } from "next/router";


function LoginForm() {  
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const router =useRouter();
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
          const username = event.target[0].value;
          const password = event.target[1].value
          setLoading(true);
          console.log(event);
          dispatch(login({ username , password }))
          .unwrap()
          .then(() => {
            alert(`berhasil login!`);
          })
          .catch(() => {
            setLoading(false);
          });
      
    }
    
  return (
    
    <div className='login'>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" required/>
      
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>


    </div>
  )
}

export default LoginForm