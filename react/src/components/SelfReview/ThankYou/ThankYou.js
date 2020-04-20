import React, { Component } from "react";
import {
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import { JWT } from '../../../constants';
import Chart from './Chart'

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      average: {}
    }
  }

  componentDidMount() {
    let query = {
      query: `query {
        me {
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
              reflection {
                    calm
                    change
                    clearInstructions
                    cooperatively
                    crossTeam
                    distractions
                    easilyExplainsComplexIdeas
                    emotionalResponse
                    empathy
                    eyeContact
                    faith
                    influences
                    managesOwn
                    newIdeas
                    openToShare
                    positiveBelief
                    preventsMisunderstandings
                    proactive
                    resilienceFeedback
                    signifiesInterest
                    tone
                    verbalAttentiveFeedback
                    workDemands
              }
            }
          }
        }
      }
    `};
    fetch('https://coreable.appspot.com/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'JWT': localStorage.getItem(JWT),
      },
      body: JSON.stringify(query)
    }).then(async (data) => {
      const result = await data.json();
      let averages = result.data.me.data.user.reflection;

      let emotionalIntelligence = (averages.emotionalResponse + averages.empathy + averages.managesOwn) / 3;
      let initiative = (averages.proactive + averages.influences) / 2;
      let trust = (averages.faith + averages.cooperatively + averages.positiveBelief) / 3;
      let flex = (averages.newIdeas + averages.workDemands) / 2;
      let clarity = (averages.clearInstructions + averages.preventsMisunderstandings) / 2;
      let culture = (averages.openToShare + averages.tone + averages.crossTeam) / 3;
      let nonVerbal = (averages.distractions + averages.eyeContact) / 2;
      let attentive = (averages.signifiesInterest + averages.verbalAttentiveFeedback) / 2;
      let resilience = (averages.resilienceFeedback + averages.calm + averages.change) / 3;

      this.setState({
        ...this.state,
        loading: false,
        average: {
          emotionalIntelligence,
          initiative,
          trust,
          flex,
          clarity,
          culture,
          nonVerbal,
          attentive,
          resilience
        }
       });
       console.log(this.state.average);
    });
  }

  render() {

    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center">
        <Container style={{ textAlign: 'left', marginTop: '16pt' }}>
          <Typography variant="h3" style={{ fontWeight: 'bold' }}>Thank you,</Typography>
          <Typography variant="h4">here are your results</Typography>
        </Container>
        <Container>
          <Chart {...this.state} />
        </Container>
      </Grid>
    );
  }
}

export default ThankYou;