import React, { Component } from 'react'
// import './Facet.css';

const FlexibilityFacet = (props) => {

    return(
        props.flexibilityFacets.map((val, idx)=> {
            let FlexiblityFacetId = `flex-${idx}`
            
            const slider = (
                    `linear-gradient(90deg, rgb(66, 113, 249) ${props.flexibilityFacets[idx].rating}%, rgb(214, 214, 214) ${props.flexibilityFacets[idx].rating}%)`
                );

            return (
            <div className="facet-container">
                <div key={idx}>
                    {/* <label htmlFor={emotionalFacetId}>{`Emotional Facet #${idx + 1}`}</label> */}
                    <label htmlFor={FlexiblityFacetId} className="facet-name">{props.flexibilityFacets[idx].name}</label>

                    <h2 className="facet-heading"> {props.facetScore[props.flexibilityFacets[idx].rating/10].title} </h2>
                    <p className="facet-info"> {props.facetScore[props.flexibilityFacets[idx].rating/10].info} </p>

                    <input
                    type="range"
                    min={0} 
                    max={100} 
                    step={10} 
                    name={FlexiblityFacetId}
                    data-id={idx}
                    id={FlexiblityFacetId}
                    value={props.flexibilityFacets[idx].rating}
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

export default FlexibilityFacet
