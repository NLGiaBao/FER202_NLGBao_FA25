import  Button from "react-bootstrap/Button";
import "./Footer.css"; 
function MyFooter({author, email, linkGithub}) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email} </p>
      <p>&copy; {new Date().getFullYear()} BaoNLG. All rights reserved </p>
      <div>My Link Github: <a href={linkGithub}>{linkGithub}</a></div>
    </footer>
  )
}
export default MyFooter;
