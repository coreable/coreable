import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import EmotionalFacet from './EmotionalFacet';
import {
  Grid,
  Container,
  Button
} from '@material-ui/core';

class EmotionalIntelligence extends Component {

  //multi-form
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  handleChange = (e) => {
    if (["rating"].includes(e.target.className)) {
      let facets = [...this.props.emotionalFacets]
      facets[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ facets }, () => console.log(this.props.facets))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }


  handleSubmit = (e) => { e.preventDefault() }

  render() {

    let { emotionalFacets } = this.props
    let { facetScore } = this.props
    let { userName } = this.props

    return (
      <Container className="review-container" maxWidth="lg">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <h1> Emotional Intelligence</h1>
            {this.props.showInfo ?
              <p> Actively create a pleasant human environment for work, show <br /> empathy, accountability, humility, friendliness and unselfishness </p>
              : null} <span onClick={this.props.hideInfo}> {this.props.showInfo ? <span> {/** Hide */} </span> : <span> open </span>} </span>

            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

              <EmotionalFacet
                emotionalFacets={emotionalFacets}
                facetScore={facetScore}
                userName={userName}
              />

              <Grid direction="column">
                <Grid item>
                  <Button className="btn-next" onClick={this.continue}>Next</Button>
                </Grid>
                <Grid item>
                  <Link to="/setup">
                    <Button>
                      Back
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default EmotionalIntelligence;
