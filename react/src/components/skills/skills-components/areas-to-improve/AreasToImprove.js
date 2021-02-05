export default CollabAreasToImprove = (props) => {
  let areasToImprove =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "collab-areas-to-improve" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
        <p>Collaboration</p>
      </div>
      <div className="grid-area-inside">
        {areasToImprove
          ?.sort((a, b) => a.reflection - b.reflection)
          .slice(0, 3)
          .map((improve, idx) => {
            return (
              <SkillBar
                key={idx}
                values={improve}
                type="areasToImprove"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CommsAreasToImprove = (props) => {
  let areasToImprove =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "comms-areas-to-improve" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {areasToImprove
          ?.sort((a, b) => a.reflection - b.reflection)
          .slice(0, 3)
          .map((improve, idx) => {
            return (
              <SkillBar
                key={idx}
                values={improve}
                type="areasToImprove"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};
