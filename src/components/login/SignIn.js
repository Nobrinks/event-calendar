import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { AuthContext } from '../contexts/Auth';
 
function SignIn () {
  const navigate = useNavigate()
  const [values, setValues] = useState({'user': '', 'password': ''});
  const {signIn} = useContext(AuthContext);
  function onChange(event) {
    const {value, name} = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }
  
  async function handleSignIn() {
    const signing = await signIn(values.user, values.password)
    navigate('/event-calendar')
  }

  return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
      </Header>
      <Form size='large' onSubmit={handleSignIn}>
        <Segment stacked>
          <Form.Input
          fluid
          name="user"
          icon='user'
          iconPosition='left'
          placeholder='E-mail address'
          onChange={onChange}
          value={values.user}
          />
          <Form.Input
            fluid
            name="password"
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={onChange}
            value={values.password}
          />

          <Button color='teal' fluid size='large' type="submit">
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <Link to="/sign-up">Sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
  );
}

export default SignIn;