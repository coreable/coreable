import React from 'react'
import '../Emotional/Facet.css'

const CultureFacet = (props) => {

    return(
        props.cultureFacets.map((val, idx)=> {
            let cultureFacetId = `emo-${idx}`
            
            const slider = (
                    `linear-gradient(90deg, rgb(66, 113, 249) ${props.cultureFacets[idx].rating}%, rgb(214, 214, 214) ${props.cultureFacets[idx].rating}%)`
                );

            return (
            <div className="facet-container">
                <div key={idx}>
                    {/* <label htmlFor={cultureFacetId}>{`culture Facet #${idx + 1}`}</label> */}
                    <label htmlFor={cultureFacetId} className="facet-name">{props.cultureFacets[idx].name}</label>

                    <h2 className="facet-heading"> {props.facetScore[props.cultureFacets[idx].rating/10].title} </h2>
                    <p className="facet-info"> {props.facetScore[props.cultureFacets[idx].rating/10].info} </p>

                    <input
                    type="range"
                    min={0} 
                    max={100} 
                    step={10} 
                    name={cultureFacetId}
                    data-id={idx}
                    id={cultureFacetId}
                    value={props.cultureFacets[idx].rating}
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

export default CultureFacet
