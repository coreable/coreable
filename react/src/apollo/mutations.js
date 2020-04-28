import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
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
`;

export const SIGNUP_MUTATION = gql`
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
`;

export const JOIN_TEAM = gql`
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
          industry {
            _id
            name
          }
          teams {
            _id
            name
            subject {
              _id
              name
              state
            }
          }
          pending {
            _id
            firstName
            lastName
            teams {
              _id
              name
              subject {
                _id
                name
                state
              }
            }
          }
        }
      }
    }
  }
`;

// export const SUBMIT_SELF_REVIEW = gql`
//   mutation SubmitSelfReview(
//     $team_id: String!, 
//     $receiver_id: String!, 
//     $emotionalResponse: Number!, 
//     $empathy: Number!,
//     $managesOwn: Number!,
//     $faith: Number!,
//     $cooperatively: Number!,
//     $positiveBelief: Number!,
//     $resilienceFeedback: Number!,
//     $calm: Number!,
//     $change: Number!,
//     $newIdeas: Number!,
//     $workDemands: Number!,
//     $proactive: Number!,
//     $influences: Number!,
//     $clearInstructions: Number!,
//     $precentsMisunderstandings: Number!,
//     $openToShare: Number!,
//     $tone: Number!,
//     $crossTeam: 0,
//     $distractions: Number!,
//     $eyeContact: Number!,
//     $signifiesInterest: Number!,
//     $verbalAttentiveFeedback: Number!
//     ) {
//     submitReview(
//       receiver_id: $receiver_id, 
//       team_id: $team_id, 
//       emotionalResponse: $emotionalResponse, 
//       empathy: $empathy,
//       managesOwn: $managesOwn,
//       faith: $faith,
//       cooperatively: $cooperatively,
//       positiveBelief: $positiveBelief,
//       resilienceFeedback: $resilienceFeedback,
//       calm: $calm,
//       change: $change,
//       newIdeas: $newIdeas,
//       workDemands: $workDemands,
//       proactive: $proactive,
//       influences: $influences,
//       clearInstructions: $clearInstructions,
//       preventsMisunderstandings: $preventsMisunderstandings,
//       easilyExplainsComplexIdeas: $easilyExplainsComplexIdeas,
//       openToShare: $openToShare,
//       tone: $tone,
//       crossTeam: $crossTeam,
//       distractions: $distractions,
//       eyeContact: $eyeContact,
//       signifiesInterest: $signifiesInterest,
//       verbalAttentiveFeedback: $verbalAttentiveFeedback) {
//       errors {
//         path
//         code
//         message
//       }
//       data {
//         review {
//           _id
//           receiver {
//             _id
//             firstName
//             lastName
//             email
//             manager # // Always false
//             # teams {}
//             # reviews {}
//             # submissions {}
//             # reflection {}
//             # subjects {}
//             # pending {}
//           }
//           receiver_id
//           submitter {
//             _id
//             firstName
//             lastName
//             email
//             manager # // Always false
//             # teams {}
//             # reviews {}
//             # submissions {}
//             # reflection {}
//             # subjects {}
//             # pending {}
//           }
//           submitter_id
//           emotionalResponse
//           empathy
//           managesOwn
//           faith
//           cooperatively
//           positiveBelief
//           calm
//           change
//           newIdeas
//           workDemands
//           proactive
//           clearInstructions
//           preventsMisunderstandings
//           easilyExplainsComplexIdeas
//           openToShare
//           tone
//           crossTeam
//           resilienceFeedback
//           distractions
//           eyeContact
//           signifiesInterest
//           verbalAttentiveFeedback
//         }
//       }
//     }
//   }
// `;