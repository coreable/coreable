export const getData = async () => {
  const query = SKILLS_API;
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      JWT: localStorage.getItem("JWT"),
    },
    body: JSON.stringify(query),
  };

  const res = await fetch(API_URL, options).then((data) => data.json());
  const { data, errors } = res.data.me;

  if (errors) {
    console.error(errors);
    return false;
  }

  const result = data.user.report;

  this.setState({
    ...this.state,
    report: result,
  });

  let isAverageNull = this.util.checkIfNull(result["average"]["collaboration"]);

  let commData = this.filterBy.communicationData(result, isAverageNull);
  let collabData = this.filterBy.collaborationData(result, isAverageNull);

  let commFacets = this.util.setFacetsOrTraits(
    commData,
    "facets",
    isAverageNull
  );
  let collabFacets = this.util.setFacetsOrTraits(
    collabData,
    "facets",
    isAverageNull
  );

  let commTraits = this.util.setFacetsOrTraits(
    commData,
    "traits",
    isAverageNull
  );
  let collabTraits = this.util.setFacetsOrTraits(
    collabData,
    "traits",
    isAverageNull
  );

  let comm = this.util.setCommOrCollabData(commFacets, commTraits);
  let collab = this.util.setCommOrCollabData(collabFacets, collabTraits);

  this.util.setStateValues(collab, comm);
};
