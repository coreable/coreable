import React from 'react'
import {
  Card,
  Typography
} from '@material-ui/core';
import '../Review.scss';

const EmotionalFacet = (props) => {

  return (
    props.emotionalFacets.map((val, idx) => {
      let emotionalFacetId = `emo-${idx}`

      const slider = (
        `linear-gradient(90deg, rgb(66, 113, 249) ${props.emotionalFacets[idx].rating}%, rgb(214, 214, 214) ${props.emotionalFacets[idx].rating}%)`
      );

      return (
        <Card className="facet-card" key={idx}>
            <Typography htmlFor={emotionalFacetId} className="facet-name">{props.emotionalFacets[idx].name}</Typography>

            <h2 className="facet-heading"> {props.facetScore[props.emotionalFacets[idx].rating / 10].title} </h2>
            <p className="facet-info"> {props.facetScore[props.emotionalFacets[idx].rating / 10].info} </p>

            <input
              type="range"
              min={0}
              max={100}
              step={10}
              name={emotionalFacetId}
              data-id={idx}
              id={emotionalFacetId}
              value={props.emotionalFacets[idx].rating}
              className="rating"
              style={{ backgroundImage: slider }}
            />

            <div className="survey-members">
              <p className="member">{props.userName}</p>
            </div>
        </Card>
      );
    })
  )
}

export default EmotionalFacet;
