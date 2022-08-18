import { Container, Navbar, Nav } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { logout } from "../slices/auth";
function LogoutNavbar() {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
    return (
      <div>
          <Navbar bg="dark" variant="dark">
                  <Container>
                      <Navbar.Brand >Forum Anime</Navbar.Brand>
                      <Nav className="me-auto">
                          <Nav.Link href="/">Home</Nav.Link>
                          <Nav.Link onClick={logOut} href="/login">Logout</Nav.Link >
                      </Nav>
                  </Container>
          </Navbar>
      </div>
    )
  }


function LoginNavbar() {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
    return (
      <div>
          <Navbar bg="dark" variant="dark">
                  <Container>
                      <Navbar.Brand >Forum Anime</Navbar.Brand>
                      <Nav className="me-auto">
                          <Nav.Link href="/">Home</Nav.Link>
                          <Nav.Link href="/register">Register</Nav.Link>
                          <Nav.Link onClick={logOut} href="/login">Login</Nav.Link>
                      </Nav>
                  </Container>
          </Navbar>
  
      </div>
    )
  }


export default function Layout({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return(
    <div>

  {(isLoggedIn==false)?(
      <div><LoginNavbar/>
      <main>{children}</main>
      </div>
    ):(
   
      <div><LogoutNavbar/> 
      <main>{children}</main>
      </div>
    )
    }

    </div>
 

  )
}

