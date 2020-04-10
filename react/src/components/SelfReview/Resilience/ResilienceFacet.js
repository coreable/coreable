import React, { Component } from 'react'
// import './Facet.css';

const ResilienceFacet = (props) => {

    return(
        props.resilienceFacets.map((val, idx)=> {
            let resilienceFacetId = `emo-${idx}`
            
            const slider = (
                    `linear-gradient(90deg, rgb(66, 113, 249) ${props.resilienceFacets[idx].rating}%, rgb(214, 214, 214) ${props.resilienceFacets[idx].rating}%)`
                );

            return (
            <div className="facet-container">
                <div key={idx}>
                    {/* <label htmlFor={emotionalFacetId}>{`Emotional Facet #${idx + 1}`}</label> */}
                    <label htmlFor={resilienceFacetId} className="facet-name">{props.resilienceFacets[idx].name}</label>

                    <h2 className="facet-heading"> {props.facetScore[props.resilienceFacets[idx].rating/10].title} </h2>
                    <p className="facet-info"> {props.facetScore[props.resilienceFacets[idx].rating/10].info} </p>

                    <input
                    type="range"
                    min={0} 
                    max={100} 
                    step={10} 
                    name={resilienceFacetId}
                    data-id={idx}
                    id={resilienceFacetId}
                    value={props.resilienceFacets[idx].rating}
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

export default ResilienceFacet
