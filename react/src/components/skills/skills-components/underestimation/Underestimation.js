const CommsUnderEstimation = (props) => {
  let underEstimation =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "comms-underestimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Underestimation
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {underEstimation
          ?.filter((item) => item.difference < 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((underEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={underEstimation}
                type="underEstimation"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CollabUnderEstimation = (props) => {
  let underEstimation =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "collab-underestimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Underestimation
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {underEstimation
          ?.filter((item) => item.difference < 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((underEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={underEstimation}
                type="underEstimation"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};
