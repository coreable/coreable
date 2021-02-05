const CommsOverEstimation = (props) => {
  let overEstimation =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "comms-overestimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Overestimation
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {overEstimation
          ?.filter((item) => item.difference > 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((overEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={overEstimation}
                type="overEstimation"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CollabOverEstimation = (props) => {
  let overEstimation =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "collab-overestimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Overestimation
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {overEstimation
          ?.filter((item) => item.difference > 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((overEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={overEstimation}
                type="overEstimation"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};
