import React, { Component } from 'react'
import { USERID, TEAMID } from '../../../constants';
import {
  Grid,
  Container,
  Button,
  Typography
} from '@material-ui/core';
import Trait from './Trait/Trait';
import './Facet.scss';

class Facet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      desc: props.desc,
      traits: props.traits,
      review: {
        user_id: localStorage.getItem(USERID),
        team_id: localStorage.getItem(TEAMID),
        emotionalResponse: 0, 
        empathy: 0,
        managesOwn: 0,
        faith: 0,
        cooperatively: 0,
        positiveBelief: 0,
        resilienceFeedback: 0,
        calm: 0,
        change: 0,
        newIdeas: 0,
        workDemands: 0,
        proactive: 0,
        influences: 0,
        clearInstructions: 0,
        preventsMisunderstandings: 0,
        easilyExplainsComplexIdeas: 0,
        openToShare: 0,
        tone: 0,
        crossTeam: 0,
        distractions: 0,
        eyeContact: 0,
        signifiesInterest: 0,
        verbalAttentiveFeedback: 0
      }
    }
  }

  componentDidUpdate() {
    if (this.state.name !== this.props.name) {
      const props = this.props;
      this.setState({
        ...this.state,
        name: props.name,
        desc: props.desc,
        traits: props.traits
      });
    }
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state);
    try {
      this.setState({
        ...this.state,
        review: {
          ...this.state.review,
          [e.path[1].children[2].name]: Number.parseFloat(e.path[1].children[2].value)
        }
      });
    } catch (err) {
      // Ignore HTML error
      // console.error(err);
    }
    localStorage.setItem("self-review", JSON.stringify(this.state.review));
  }

  // handleSubmit = (e) => e.preventDefault();

  render() {
    return (
      <Container className="review-container" maxWidth="lg">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item style={{ marginTop: '16pt' }}>
            <Typography variant="h4">{this.props.name}</Typography>
            <Typography variant="subtitle1" style={{ paddingBottom: '24pt' }}>{this.props.desc}</Typography>
          </Grid>

          {
            this.state.traits.map((trait, index) => {
              return (
                <Grid item key={index}>
                  <Trait {...trait} handleChange={this.handleChange.bind(this)}></Trait>
                </Grid>)
            })
          }

          <Grid item container direction="column">
            <Grid item>
              <Button className="btn-next" onClick={this.continue}>Next</Button>
            </Grid>
            <Grid item>
              <Button className="btn-before" onClick={this.back}>Back</Button>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    );
  }
}

export default Facet;
