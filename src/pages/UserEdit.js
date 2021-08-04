import Layout from "../components/Layout";
import axios from "axios"
import { useEffect, useState } from "react";


const UserEdit = () => {
  const userId = JSON.parse(localStorage.getItem('currentUser')).id
  const [info,setInfo] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:3000/v1/users/${userId}` ,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    .then(response => response.data)
    .then(data => setInfo(data))
  },[])
  return (
    <Layout>
      {/* {JSON.stringify(info.user.name)} */}
    </Layout>
  )
}
export default UserEdit;