import React from 'react'
import '../Emotional/Facet.css'

const NonVerbalFacet = (props) => {

    return(
        props.nonVerbalFacets.map((val, idx)=> {
            let nonVerbalFacetId = `emo-${idx}`
            
            const slider = (
                    `linear-gradient(90deg, rgb(66, 113, 249) ${props.nonVerbalFacets[idx].rating}%, rgb(214, 214, 214) ${props.nonVerbalFacets[idx].rating}%)`
                );

            return (
            <div className="facet-container">
                <div key={idx}>
                    {/* <label htmlFor={nonVerbalFacetId}>{`nonVerbal Facet #${idx + 1}`}</label> */}
                    <label htmlFor={nonVerbalFacetId} className="facet-name">{props.nonVerbalFacets[idx].name}</label>

                    <h2 className="facet-heading"> {props.facetScore[props.nonVerbalFacets[idx].rating/10].title} </h2>
                    <p className="facet-info"> {props.facetScore[props.nonVerbalFacets[idx].rating/10].info} </p>

                    <input
                    type="range"
                    min={0} 
                    max={100} 
                    step={10} 
                    name={nonVerbalFacetId}
                    data-id={idx}
                    id={nonVerbalFacetId}
                    value={props.nonVerbalFacets[idx].rating}
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

export default NonVerbalFacet
