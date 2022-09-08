import React from 'react'
import { useNavigate , useParams } from 'react-router-dom'
function Profile() {
  let navigete = useNavigate();
  let {username} = useParams();
  return (
    <div>
      <h2>This Profile Page For {username}!</h2>
      This is Profile Page <button onClick={()=>{navigete('/')}}>Cheange to Home</button>
    </div>
  )
}

export default Profile
