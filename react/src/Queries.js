import gql from 'graphql-tag'

//Queries





//Mutations
const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!){
        login(email:$email, password: $password) {
            data {
                user {
                    firstName
                    email
                    _id
                    }
                token
                }
                errors {
                    code
                    path
                    message
                }
        }
  }
`
const SIGNUP_MUTATION = gql`
    mutation SignUpMutation($email: String!, $password: String!, $firstname: String!, $lastname: String!){
        register(email: $email, password: $password, firstName: $firstname, lastName: $lastname) {
            errors {
                code
                path
                message
                }
            data {
                user { # =>{User}
                    _id
                    email	
                    manager # // Will always be false
                    firstName
                }
                token # // JsonWebToken
                }
        }
}
`

export { LOGIN_MUTATION, SIGNUP_MUTATION } 