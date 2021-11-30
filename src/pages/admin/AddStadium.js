import React,{useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Form,Button,Row,Col} from "react-bootstrap"

const AddStadium = () => {
  const [stadia,setStadia] = useState({})
  useEffect(() => {
    axios.get("http://localhost:3000/v1/stadia/")
      .then( response => {
        setStadia(response.data)
      })
      .catch(error => console.log(error))
  },[])
  const [name,setName] = useState("")
  const [stadiumTypeId,setStadiumTypeId] = useState(0)
  const [isNewStadiumType,setIsNewStadiumType] = useState(false)

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleStadiumTypeIdChange = (e) => {
    setStadiumTypeId(e.target.value)
  }

  const handleIsNewStadiumTypeChange = (e) => {
    setIsNewStadiumType(e.target.value)
  }

  const createStadium = () => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/stadia`,
    {
      stadium_type_id: stadiumTypeId,
      name: name,
      is_new_stadium_type: isNewStadiumType
    },
    {
      header: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    },
  )
  .catch(error => console.log(error))
  }

  return (
    <Layout>
      <Form className="my-3">
        <Form.Group className="mb-3" controlId="formSerialCode">
          <Form.Label>stadiumTypeID</Form.Label>
          <Form.Control value={stadiumTypeId} placeholder="stadiumTypeIdを入力してください" onChange={handleStadiumTypeIdChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTeamName">
          <Form.Label>スタジアム名</Form.Label>
          <Form.Control value={name} placeholder="スタジアム名を入力してください" onChange={handleNameChange}/>
        </Form.Group>
        <div key={`custom-checkbox`} className="mb-3">
              <Form.Check
                custom
                type={"checkbox"}
                value={isNewStadiumType}
                id={`custom-checkbox`}
                label={`新しいStadiumType？`}
                onChange={handleIsNewStadiumTypeChange}
                />
            </div>
        <Form.Group className="text-end">
          {/* <Button variant="dark" type="submit" onClick={createTeam} disabled={isSubmitDisable}> */}
          <Button variant="dark" type="submit" onClick={createStadium} >
            作成
          </Button>
        </Form.Group>
      </Form>
      <Row>
        <Col>stadium_type_id</Col>
        <Col>stadium_id</Col>
        <Col>stadium_name</Col>
      </Row>
      {Object.keys(stadia).map(stadium_type_id => (
        <Row>
        <Col>
          {Object.keys(stadia[stadium_type_id]).map(stadium_id => (
            <Row>
              <Col>{stadium_type_id}</Col>
              <Col>{stadia[stadium_type_id][stadium_id][0]}</Col>
              <Col>{stadia[stadium_type_id][stadium_id][1]}</Col>
            </Row>
          ))}
        </Col>
        </Row>
        ))}
    </Layout>
  )
}
export default AddStadium;