import React from 'react'
import '../Emotional/Facet.css'

const VerbalFacet = (props) => {

    return(
        props.verbalFacets.map((val, idx)=> {
            let verbalFacetId = `emo-${idx}`
            
            const slider = (
                    `linear-gradient(90deg, rgb(66, 113, 249) ${props.verbalFacets[idx].rating}%, rgb(214, 214, 214) ${props.verbalFacets[idx].rating}%)`
                );

            return (
            <div className="facet-container">
                <div key={idx}>
                    {/* <label htmlFor={verbalFacetId}>{`verbal Facet #${idx + 1}`}</label> */}
                    <label htmlFor={verbalFacetId} className="facet-name">{props.verbalFacets[idx].name}</label>

                    <h2 className="facet-heading"> {props.facetScore[props.verbalFacets[idx].rating/10].title} </h2>
                    <p className="facet-info"> {props.facetScore[props.verbalFacets[idx].rating/10].info} </p>

                    <input
                    type="range"
                    min={0} 
                    max={100} 
                    step={10} 
                    name={verbalFacetId}
                    data-id={idx}
                    id={verbalFacetId}
                    value={props.verbalFacets[idx].rating}
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

export default VerbalFacet
