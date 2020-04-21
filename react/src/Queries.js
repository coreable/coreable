import gql from 'graphql-tag'

//Queries
const GET_USER_DETAILS = gql`
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




//Mutations
//Login
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

//Signup
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


//JoinTeam
const JOIN_TEAM = gql`
    mutation JoinTeam($inviteCode: String!){
        joinTeam(inviteCode: $inviteCode) {
            errors {
              code	
              path
              message
            }
            data {
              user { 
                _id
                firstName
                lastName
                email
                teams { 
                  _id
                  name
                }
              }
            }
          }
    }
    `

//Submit self-Review
const SUBMIT_SELF_REVIEW = gql`
    mutation SubmitReview(
        $receiverID: String!, 
        $team_id: String!, 
        $emotionalResponse: Int!, 
        $empathy: Int!, 
        $managesOwn: Int!, 
        $faith: Int!, 
        $cooperatively: Int!,
        $positiveBelief: Int!,
        $resilienceFeedback: Int!,
        $calm: Int!,
        $change: Int!,
        $newIdeas: Int!,
        $workDemands: Int!,
        $proactive: Int!,
        $influences: Int!,
        $clearInstructions: Int!,
        $preventsMisunderstandings: Int!,
        $easilyExplainsComplexIdeas: Int!,
        $openToShare: Int!,
        $tone: Int!,
        $crossTeam: Int!,
        $distractions: Int!,
        $eyeContact: Int!,
        $signifiesInterest: Int!,
        $verbalAttentiveFeedback: Int!
        ){
        submitReview(
            receiver_id: $receiverID, 
            team_id: $team_id, 
            emotionalResponse: $emotionalResponse, 
            empathy: $empathy,
            managesOwn: $managesOwn,
            faith: $faith,
            cooperatively: $cooperatively,
            positiveBelief: $positiveBelief,
            resilienceFeedback: $resilienceFeedback,
            calm: $calm,
            change: $change,
            newIdeas: $newIdeas,
            workDemands: $workDemands,
            proactive: $proactive,
            influences: $influences,
            clearInstructions: $clearInstructions,
            preventsMisunderstandings: $preventsMisunderstandings,
            easilyExplainsComplexIdeas: $easilyExplainsComplexIdeas,
            openToShare: $openToShare,
            tone: $tone,
            crossTeam: $crossTeam,
            distractions: $distractions,
            eyeContact: $eyeContact,
            signifiesInterest: $signifiesInterest,
            verbalAttentiveFeedback: $verbalAttentiveFeedback) {
                errors {
                    path
                    code
                    message
                    }
                data {
                    review {
                        _id
                        receiver {
                            _id
                            firstName
                            lastName
                            email
                        }
                        receiver_id
                        submitter {
                            _id
                            firstName
                            lastName
                            email
                        }
                        submitter_id
                        emotionalResponse
                        empathy
                        managesOwn
                        faith
                        cooperatively
                        positiveBelief
                        calm
                        change
                        newIdeas
                        workDemands
                        proactive
                        clearInstructions
                        preventsMisunderstandings
                        easilyExplainsComplexIdeas
                        openToShare
                        tone
                        crossTeam
                        resilienceFeedback
                        distractions
                        eyeContact
                        signifiesInterest
                        verbalAttentiveFeedback
                    }
                }
        }
    }`

export { LOGIN_MUTATION, SIGNUP_MUTATION, JOIN_TEAM, SUBMIT_SELF_REVIEW, GET_USER_DETAILS } 