export const selfCollaborationData = (props) => {
  return [
    props.report?.report?.reflection?.collaboration?.facets?.default
      ?.emotionalIntelligence || 0,
    props.report?.report?.reflection?.collaboration?.facets?.default
      ?.initiative || 0,
    props.report?.report?.reflection?.collaboration?.facets?.default?.trust ||
      0,
    props.report?.report?.reflection?.collaboration?.facets?.default?.flex || 0,
    props.report?.report?.reflection?.collaboration?.facets?.default
      ?.resilience || 0,
  ];
};

export const teamCollaborationData = (props) => {
  return [
    props.report?.report?.average?.collaboration?.facets?.default
      ?.emotionalIntelligence || 0,
    props.report?.report?.average?.collaboration?.facets?.default?.initiative ||
      0,
    props.report?.report?.average?.collaboration?.facets?.default?.trust || 0,
    props.report?.report?.average?.collaboration?.facets?.default?.flex || 0,
    props.report?.report?.average?.collaboration?.facets?.default?.resilience ||
      0,
  ];
};

export const selfCommunicationData = (props) => {
  return [
    props.report?.report?.reflection?.communication?.facets?.default
      ?.attentive || 0,
    props.report?.report?.reflection?.communication?.facets?.default?.clarity ||
      0,
    props.report?.report?.reflection?.communication?.facets?.default?.culture ||
      0,
    props.report?.report?.reflection?.communication?.facets?.default
      ?.nonVerbal || 0,
  ];
};

export const teamCommunicationData = (props) => {
  return [
    props.report?.report?.average?.communication?.facets?.default?.clarity || 0,
    props.report?.report?.average?.communication?.facets?.default?.culture || 0,
    props.report?.report?.average?.communication?.facets?.default?.nonVerbal ||
      0,
    props.report?.report?.average?.communication?.facets?.default?.attentive ||
      0,
  ];
};
