import React, { Component } from 'react'
import FlexibilityFacet from './FlexibilityFacet';
import {
  Grid,
  Container,
  Button
} from '@material-ui/core'
import '../Review.scss';
 
class Flexibility extends Component {

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
      let facets = [...this.props.flexibilityFacets]
      facets[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ facets }, () => console.log(this.props.facets))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleSubmit = (e) => { e.preventDefault() }

  render() {

    let { flexibilityFacets } = this.props
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
            <h1> Flexibility </h1>
            <p style={{ paddingBottom: "23pt" }}> Be adaptable and receptive to new ideas; respond and adjust easily to changing work <br /> demands and circumstances; not bound by old ways of doing things </p>

            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

              <FlexibilityFacet
                flexibilityFacets={flexibilityFacets}
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

export default Flexibility
