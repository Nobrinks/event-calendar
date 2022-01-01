import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { AuthContext } from "../contexts/Auth";

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

function SignUp() {
  const [values, setValues] = useState({username: '', password: '', gender: '', email:'', events:[]});
  const navigate = useNavigate()
  const {signUp} = useContext(AuthContext);
  function onChange(event, attribute) {
    const { value, name } = attribute;

    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmit() {
    const {gender, username, email, password} = values;
    if (gender && username && email && password){
      signUp({
        user: values
      })
      navigate('/event-calendar')
    }
      
  }
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column width={6}>
        <Header as="h2" color="teal" textAlign="center">
          Create your account
        </Header>
        <Segment stacked>
          <form className="ui form segment">
            <p>Tell Us About Yourself</p>
            <Form.Group widths={"equal"}>
              <Form.Input label="E-mail" placeholder="user@email.com" type="email" name="email" onChange={onChange} value={values.email}/>
            
              <Form.Select
                fluid
                label="Gender"
                options={options}
                placeholder="Gender"
                name="gender"
                onChange={onChange}
                value={values.gender}
              />
            </Form.Group>
            
            <div className="two fields">
              <div className="field">
                <Form.Input label="Username" placeholder="Username" name="username" onChange={onChange} value={values.username} type="text" />
              </div>
              <div className="field">
                <Form.Input label="Password" type="password" name="password" onChange={onChange} value={values.password}/>
              </div>  
            </div>
              <Button primary onClick={handleSubmit}>Submit</Button>
            <div className="ui error message"></div>
          </form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default SignUp;
