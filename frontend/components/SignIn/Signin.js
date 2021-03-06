import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from '../Global_Styles/Form'
import Error from '../ErrorMesage/ErrorMessage'
import { CURRENT_USER_QUERY } from '../User/User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

export default class Signin extends Component {
  state = {
    name: '',
    password: '',
    email: '',
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        // auto refetches querys when mutation occurs (shows user loggin in immediately)
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <Form
              // form defaults to get
              method="post"
              // run signup mutation
              onSubmit={async e => {
                e.preventDefault()
                const res = await signin()
                // clear form
                this.setState({ name: '', password: '', email: '' })
              }}
            >
              {/* loading animations */}
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign into account</h2>
                <Error error={error} />
                <label htmlFor="email">
                  email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Sign In!</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}
