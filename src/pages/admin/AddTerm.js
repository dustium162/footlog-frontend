import React,{useState, useEffect} from 'react'
import Layout from '../../components/Layout';
import axios from 'axios'

import {InputGroup,FormControl,Button} from 'react-bootstrap'

const AddTerm = () => {
  const [terms,setTerms] = useState('')

  const handleTerm = (e) => {
    setTerms(e.target.value)
  } 

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/terms`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    }).then(response => response.data).then(data => setTerms(data))
  },[])
  const updateTerms = () => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/terms`,{
      content: terms
    },{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
  }
  return (
    <Layout>
      <InputGroup>
        <InputGroup.Text>利用規約</InputGroup.Text>
        <FormControl as="textarea" defaultValue={terms.text ? terms.text :""} aria-label="With textarea" onChange={handleTerm}/>
        <Button variant="outline-secondary" id="button-addon2" onClick={updateTerms}>更新</Button>
      </InputGroup>
    </Layout>
  )
}
export default AddTerm;