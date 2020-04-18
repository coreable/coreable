// eslint-disable-next-line
import React, { Component } from 'react'
import './Facet.css'

const EmotionalFacet = (props) => {

    return(
        props.emotionalFacets.map((val, idx)=> {
            let emotionalFacetId = `emo-${idx}`
            
            const slider = (
                    `linear-gradient(90deg, rgb(66, 113, 249) ${props.emotionalFacets[idx].rating}%, rgb(214, 214, 214) ${props.emotionalFacets[idx].rating}%)`
                );

            return (
            <div className="facet-container">
                <div key={idx}>
                    {/* <label htmlFor={emotionalFacetId}>{`Emotional Facet #${idx + 1}`}</label> */}
                    <label htmlFor={emotionalFacetId} className="facet-name">{props.emotionalFacets[idx].name}</label>

                    <h2 className="facet-heading"> {props.facetScore[props.emotionalFacets[idx].rating/10].title} </h2>
                    <p className="facet-info"> {props.facetScore[props.emotionalFacets[idx].rating/10].info} </p>

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
                    style={{backgroundImage: slider}}
                    // style={{backgroundImage: "linear-gradient(90deg, rgb(66, 113, 249) 40%, rgb(214, 214, 214) 40%)"}}
                    // personal note: nice colour 
                    // style={{backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)"}}
                    />

                    <div className="survey-members">
                        <p className="member">{props.userName}</p>
                    </div>
                </div>
            </div>
            )
        })
    )
}

export default EmotionalFacet
