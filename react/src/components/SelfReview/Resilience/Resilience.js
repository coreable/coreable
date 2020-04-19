import React, { Component } from 'react'
import ResilienceFacet from './ResilienceFacet';
import {
  Grid,
  Container,
  Button
} from '@material-ui/core';
import '../Review.scss';

class Resilience extends Component {

  //multi-form
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  handleChange = (e) => {
    if (["rating"].includes(e.target.className)) {
      let facets = [...this.props.resilienceFacets]
      facets[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ facets }, () => console.log(this.props.facets))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleSubmit = (e) => { e.preventDefault() }

  render() {

    let { resilienceFacets } = this.props
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
            <h1>Resilience</h1>
            <p style={{ paddingBottom: "23pt" }}> Resilience is the ability to recover, re-bound or bounce back, <br /> adjust and even thrive after misfortune or change </p>

            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

              <ResilienceFacet
                resilienceFacets={resilienceFacets}
                facetScore={facetScore}
                userName={userName}
              />

              <Grid direction="column">
                <Grid item>
                  <Button className="btn-next" onClick={this.continue}>Next</Button>
                </Grid>
                <Grid item>
                  <Button onClick={this.back}>
                    Back
                  </Button>
                </Grid>
              </Grid>

            </form>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Resilience
