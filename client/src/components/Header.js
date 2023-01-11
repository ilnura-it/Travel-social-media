import React, { useState } from 'react';
import {
   MDBNavbar,
   MDBContainer,
   MDBIcon,
   MDBNavbarNav,
   MDBNavbarItem,
   MDBNavbarLink,
   MDBNavbarToggler,
   MDBCollapse,
   MDBNavbarBrand
  } from 'mdb-react-ui-kit'
  import { useSelector, useDispatch } from 'react-redux';
  import { setLogout } from '../redux/features/authSlice';
  import { searchTours } from '../redux/features/tourSlice';
  import { useNavigate } from 'react-router-dom';
  import decode from 'jwt-decode';

  //client secret = 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

const Header = () => {

const [show, setShow] = useState(false);
const [search, setSearch] = useState("");
const {user} = useSelector((state) => ({...state.auth}));
const dispatch = useDispatch();
const navigate = useNavigate();
const token = user?.token;

if(token) {
   const decodedToken = decode(token);
   if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
   }
}

const handleLogout = () => {
   dispatch(setLogout())
}

const handleSubmit = (e) => {
   e.preventDefault();
   if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("")
   } else {
      navigate ("/")
   }
};

   return(<div>
      <MDBNavbar fixed='top' expand='lg' style={{backgroundColor: "#FAEE5A"}}>
         <MDBContainer>
            <MDBNavbarBrand style={{color: "#4B89AC", fontWeight: "600", fontSize: "22px" }}
             href="/">
                Travel Social Network
            </MDBNavbarBrand>
            <MDBNavbarToggler type="button" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShow(!show)} style={{color: "#066080"}}>
               <MDBIcon icon="bars" fas />

            </MDBNavbarToggler>
            <MDBCollapse show={show} navbar>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
           
                  <MDBNavbarItem >
                     <MDBNavbarLink href="/">
                        <p className='header-text'>Home</p>
                     </MDBNavbarLink>
                  </MDBNavbarItem>
                  {user?.result?._id && (
                     <>
                      <MDBNavbarItem>
                     <MDBNavbarLink href="/addTour">
                        <p className='header-text'>Add Tour</p>
                     </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                     <MDBNavbarLink href="/dashboard">
                        <p className='header-text'>Dashboard</p>
                     </MDBNavbarLink>
                  </MDBNavbarItem>
                     
                     </>
                  )}
                 {user?.result?._id ? (
                     <MDBNavbarItem>
                     <MDBNavbarLink href="/login">
                        <p className='header-text' onClick={handleLogout}>Logout</p>
                       
                     </MDBNavbarLink>
                  </MDBNavbarItem>
                 ) : (
                  <MDBNavbarItem>
                     <MDBNavbarLink href="/login">
                        <p className='header-text'>Login</p>
                        
                     </MDBNavbarLink>
                  </MDBNavbarItem>
                 )}
               </MDBNavbarNav>
                  <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
                     <input 
                        type="text"
                        className='form-control'
                        placeholder='Search Tour'
                        value = {search}
                        onChange = {(e) => setSearch(e.target.value)}
                     />
                     <div style={{marginTop: "5px", marginLeft: "5px"}}>
                        <MDBIcon fas icon="search" onClick={handleSubmit} />
                     </div>
                  </form>
                  {user?.result?._id && (
              <h5 className='header-text' style={{ marginRight: "30px", marginLeft: "15px", marginTop: "10px", fontSize: "18px" }}>
                <MDBIcon fas icon="user-alt" /> {user?.result?.name} 
              </h5>
            )}
            </MDBCollapse>
         </MDBContainer>


      </MDBNavbar>
   </div>
   )
}

export default Header;