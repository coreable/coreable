import React, { Component } from 'react'
import TrustFacet from './TrustFacet';
import {
  Grid,
  Container,
  Button
} from '@material-ui/core';
import '../Review.scss';

class Trust extends Component {

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
      let facets = [...this.props.trustFacets]
      facets[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ facets }, () => console.log(this.props.facets))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }


  handleSubmit = (e) => { e.preventDefault() }

  render() {

    let { trustFacets } = this.props
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
            <h1> Trust </h1>
            <p style={{ paddingBottom: "23pt" }}> Firm belief in the reliability, truth, or ability of someone </p>

            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

              <TrustFacet
                trustFacets={trustFacets}
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

export default Trust
