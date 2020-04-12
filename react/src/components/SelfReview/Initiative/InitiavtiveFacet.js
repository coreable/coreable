import React from 'react'
// import './Facet.css';

const InitiativeFacet = (props) => {

    return(
        props.initiativeFacets.map((val, idx)=> {
            let initiativeFacetId = `emo-${idx}`
            
            const slider = (
                    `linear-gradient(90deg, rgb(66, 113, 249) ${props.initiativeFacets[idx].rating}%, rgb(214, 214, 214) ${props.initiativeFacets[idx].rating}%)`
                );

            return (
            <div className="facet-container">
                <div key={idx}>
                    {/* <label htmlFor={emotionalFacetId}>{`Emotional Facet #${idx + 1}`}</label> */}
                    <label htmlFor={initiativeFacetId} className="facet-name">{props.initiativeFacets[idx].name}</label>

                    <h2 className="facet-heading"> {props.facetScore[props.initiativeFacets[idx].rating/10].title} </h2>
                    <p className="facet-info"> {props.facetScore[props.initiativeFacets[idx].rating/10].info} </p>

                    <input
                    type="range"
                    min={0} 
                    max={100} 
                    step={10} 
                    name={initiativeFacetId}
                    data-id={idx}
                    id={initiativeFacetId}
                    value={props.initiativeFacets[idx].rating}
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

export default InitiativeFacet
