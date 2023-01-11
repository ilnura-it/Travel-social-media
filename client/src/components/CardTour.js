import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";


const CardTour = ({imageFile, description, title, tags, _id, name, likes}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;

  const dispatch = useDispatch();

   const excerpt = (str) => {
      if (str.length > 45) {
        str = str.substring(0, 45) + " ...";
      }
      return str;
    };

    const Likes = () => {
      if (likes.length > 0) {
        return likes.find((like) => like === userId) ? (
          <>
            <MDBIcon fas icon="thumbs-up"  style={{color: "#4B89AC"}}/>
            {/*
            
            */}
            &nbsp;
            {likes.length > 2 ? (
              <MDBTooltip
                tag="a"
                title={`You and ${likes.length - 1} other people likes`}
              >
                {likes.length} Likes
              </MDBTooltip>
            ) : (
              `${likes.length} Like${likes.length > 1 ? "s" : ""}`
            )}
          </>
        ) : (
          <>
            <MDBIcon far icon="thumbs-up"  style={{color: "#4B89AC"}}/>
            <span >&nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}</span> 
          </>
        );
      }
      return (
        <>
          <MDBIcon far icon="thumbs-up" />
          <span >&nbsp; Like</span> 
        </>
      );
    };
  
    const handleLike = () => {
      dispatch(likeTour({ _id }));
    };

   return (
    
   
    <MDBCardGroup>
         <MDBCard className="h-100 m-2 mt-4 p-2 d-sm-flex" style={{maxWidth: "20rem"}}>
         <MDBCardImage
             src={imageFile}
             alt={title}
             position="top"
             style={{ maxWidth: "100%", height: "180px" }}
         />
         <div className="top-left name-title">{name}</div>
        <span className="text-start tag-card ">
         {tags.map((tag, index)=> 
          <Link key={index} to={`/tours/tag/${tag}`}  style={{color: "#4B89AC"}}>#{tag}</Link>
         )}
         
         <MDBBtn style={{float: "right", color: "#4B89AC", marginRight: "15px"}} tag="a" color="none" onClick={!user?.result ? null : handleLike}>
          {!user?.result ? (
            <MDBTooltip title="Please login to like tour" tag="a">
              <Likes />
            </MDBTooltip>
          ) : (
            <Likes />
          )}
         
         </MDBBtn>
        </span>
          <MDBCardBody>
            <MDBCardTitle className="text-start">{title}</MDBCardTitle>
            <MDBCardText className="text-start">{excerpt(description) }
            <Link  style={{color: "#4B89AC"}} to={`/tour/${_id}`}>Read more</Link>
            </MDBCardText>
           </MDBCardBody>
          </MDBCard>
      </MDBCardGroup>
   )
}

export default CardTour;