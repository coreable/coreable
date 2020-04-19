import React from 'react'
import {
  Card
} from '@material-ui/core';

const TrustFacet = (props) => {
  return (
    props.trustFacets.map((val, idx) => {
      let trustFacetId = `emo-${idx}`

      const slider = (
        `linear-gradient(90deg, rgb(66, 113, 249) ${props.trustFacets[idx].rating}%, rgb(214, 214, 214) ${props.trustFacets[idx].rating}%)`
      );

      return (
        <Card className="facet-card" key={idx}>
          <label htmlFor={trustFacetId} className="facet-name">{props.trustFacets[idx].name}</label>

          <h2 className="facet-heading"> {props.facetScore[props.trustFacets[idx].rating / 10].title} </h2>
          <p className="facet-info"> {props.facetScore[props.trustFacets[idx].rating / 10].info} </p>

          <input
            type="range"
            min={0}
            max={100}
            step={10}
            name={trustFacetId}
            data-id={idx}
            id={trustFacetId}
            value={props.trustFacets[idx].rating}
            className="rating"
            style={{ backgroundImage: slider }}
          // style={{backgroundImage: "linear-gradient(90deg, rgb(66, 113, 249) 40%, rgb(214, 214, 214) 40%)"}}
          // personal note: nice colour 
          // style={{backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)"}}
          />
          <div className="survey-members">
            <p className="member">{props.userName}</p>
          </div>
        </Card>
      )
    })
  )
}

export default TrustFacet
