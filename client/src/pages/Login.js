import { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, googleSignIn } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';


const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth}))
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const devEnv = process.env.NODE_ENV !== "production";
  const clientId = devEnv ? "111141499919-sfhur7fg681i6a35hk9prc1id4hvekdo.apps.googleusercontent.com" : "111141499919-joc5klb8sfb9h9lajqo93ikbd430df3k.apps.googleusercontent.com"; 

  useEffect (() => {
   error && toast.error(error);
  }, [error])

  const handleSubmit = (e) => {
   e.preventDefault();
   if(email && password) {
      dispatch(login({formValue, navigate, toast }))
   }
  };
  const onInputChange = (e) => {
   let { name, value } = e.target;
   setFormValue({...formValue, [name]: value })
  };

  

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: clientId,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const googleSuccess = async (resp) => {
    const email = resp?.profileObj?.email;
    const name = resp?.profileObj?.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = { email, name, token, googleId };
    dispatch(googleSignIn({ result, navigate, toast }));

 };

 const googleFailure = (error) => {
  console.log(error)
   toast.error(error);
 };

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        
      }}
    >
      <MDBCard alignment="center" style={{ marginTop: '120px', padding: '15px' }}>
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
         <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className="col-md-12" >
            <MDBInput 
            label="Email" 
            type="email" 
            value={email} 
            name="email" 
            onChange={onInputChange} 
            required 
            invalid 
            validation="Please provide your email"/>
            </div>
            <div className="col-md-12" >
            <MDBInput 
            label="Password" 
            type="password" 
            value={password} 
            name="password" 
            onChange={onInputChange} 
            required 
            invalid 
            validation="Please provide your password"/>
            </div>
            <div className="col-12">
               <MDBBtn style={{width: "100%",  backgroundColor: "#4B89AC" }} className="mt-2">
                  {loading && (
                     < MDBSpinner
                        size ="sm"
                        role="status"
                        tag="span"
                        className='me-2'
                        />
                  )}
                  Login
               </MDBBtn>
            </div>
            
         </MDBValidation>
         <br/>
       
         <GoogleLogin clientId={clientId}
         render={(renderProps) => (
            <MDBBtn 
            style={{width: "100%"}} 
            color="danger" 
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            >
               <MDBIcon className='me-2' fab icon="google"/>
               Google Sign In
            </MDBBtn>        
            )} 
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
            data-onsuccess="onSignIn"
            />
         
            
        </MDBCardBody>
        <MDBCardFooter>
         <Link to="/register">
         <p  style={{color: "#4B89AC"}}>Don't have an account ? Sign Up</p>
         </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
