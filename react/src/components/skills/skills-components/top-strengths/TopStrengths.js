const CollabTopStrengths = (props) => {
  let topStrengths =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "collab-top-strength" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
        <p>Collaboration</p>
      </div>
      <div className="grid-area-inside">
        {topStrengths
          ?.sort((a, b) => b.reflection - a.reflection)
          .slice(0, 3)
          .map((strength, idx) => {
            return (
              <SkillBar
                key={idx}
                values={strength}
                type="strengths"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CommsTopStrengths = (props) => {
  let topStrengths =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "comms-top-strength" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {topStrengths
          ?.sort((a, b) => b.reflection - a.reflection)
          .slice(0, 3)
          .map((strength, idx) => {
            return (
              <SkillBar
                key={idx}
                values={strength}
                type="strengths"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};
