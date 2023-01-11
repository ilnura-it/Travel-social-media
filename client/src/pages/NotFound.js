import image from '../images/404.jpg';

const NotFound = () => {
   return (
      <div>
         <img src={image} alt="404" style={{maxWidth: "100%", marginTop: "50px"}}/>
      </div>
   )
}

export default NotFound;