import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'

import mutation from '../mutations/SignUp'
import query from '../queries/CurrentUser'

import AuthForm from './AuthForm'

class SignUpForm extends Component {

  constructor (props) {
    super(props)

    this.state = { errors: [] }
  }

  componentWillUpdate (nextProps) {
    if (nextProps.data.user && !this.props.data.user) {
      hashHistory.push('/dashboard')
    }
  }

  onSubmit ({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(err => err.message )
      this.setState({ errors })
    })
  }

  render () {
     return (
       <div>
         <h3>SignUp</h3>
         <AuthForm errors={ this.state.errors } onSubmit={ this.onSubmit.bind(this) }/>
       </div>
     )
  }
}

export default graphql(query)(
  graphql(mutation)(SignUpForm)
)
