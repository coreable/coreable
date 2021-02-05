export const checkIfNull = () => {
    if (report === null) {
      return true;
    } else {
      return false;
    }
}

export const checkState = () => {
    let count = 0;
    const arrayToLoop = props["app"]["data"]["user"]["pending"];

    for (let i = 0; i < arrayToLoop.length; i++) {
      if (arrayToLoop[i]["tutorial"]["subject"]["state"] === 2) {
        count++;
      }
    }

    if (count === arrayToLoop.length) {
      stage = 2;
    }
}

export const setCommOrCollabData = (facets, traits) => {
    return {
      facets: facets,
      traits: traits,
    };
  },

export const setFacetsOrTraits = (report, facetOrTrait, isAverageNull) => {
    if (isAverageNull) {
      let result = [];

      let reflectionObject;

      try {
        reflectionObject = report["reflection"][facetOrTrait]["default"];
      } catch (error) {}

      for (const key in reflectionObject) {
        if (reflectionObject.hasOwnProperty(key)) {
          result.push({
            name:
              facetOrTrait === "facets"
                ? {
                    facet: this.util.getCorrectSpelling(key),
                  }
                : {
                    facet: this.util.getFacetName(key),
                    trait: this.util.getCorrectTraitDetails(key),
                  },
            reflection: reflectionObject[key],
          });
        }
      }

      return result.sort((a, b) => a.reflection - b.reflection);
    } else {
      let result = [];
      let averageObject = report["average"][facetOrTrait]["default"];
      let reflectionObject = report["reflection"][facetOrTrait]["default"];

      for (const key in averageObject) {
        if (averageObject.hasOwnProperty(key)) {
          result.push({
            name:
              facetOrTrait === "facets"
                ? {
                    facet: this.util.getCorrectSpelling(key),
                  }
                : {
                    facet: this.util.getFacetName(key),
                    trait: this.util.getCorrectTraitDetails(key),
                  },
            average: averageObject[key],
            reflection: reflectionObject[key],
            difference: reflectionObject[key] - averageObject[key],
          });
        }
      }

      return result.sort((a, b) => a.average - b.average);
    }
  }

export const setStateValues = (collaborationData, communicationData) => {
    this.setState({
      ...this.state,
      collaborationData: collaborationData,
      communicationData: communicationData,
    });
  }



 export const getFacetName= (trait) => {
    switch (trait) {
      case "calm":
        return "Resilience";
      case "empathy":
        return "Emotional Intelligence";
      case "cooperatively":
        return "Trust";
      case "influences":
        return "Initiative";
      case "managesOwn":
        return "Emotional Intelligence";
      case "newIdeas":
        return "Flexibility";
      case "positiveBelief":
        return "Trust";
      case "proactive":
        return "Initiative";
      case "resilienceFeedback":
        return "Resilience";
      case "clearInstructions":
        return "Clarity";
      case "crossTeam":
        return "Culture";
      case "distractions":
        return "Non-verbal";
      case "easilyExplainsComplexIdeas":
        return "Clarity";
      case "openToShare":
        return "Verbal Attentiveness";
      case "signifiesInterest":
        return "Non-verbal";
      default:
        return "Culture";
    }
  }
  export const getCorrectTraitDetails = (trait) => {
    switch (trait) {
      case "calm":
        return "Remains calm under pressure";
      case "empathy":
        return "Demonstrates empathy";
      case "cooperatively":
        return "Ability to work cooperatively";
      case "influences":
        return "Actively influences events";
      case "managesOwn":
        return "Manages own emotions";
      case "newIdeas":
        return "Adaptable and receptive to new ideas";
      case "positiveBelief":
        return "Has a positive belief about the dependability of others";
      case "proactive":
        return "Proactive and self-starting";
      case "resilienceFeedback":
        return "Accepts constructive feedback";
      case "clearInstructions":
        return "Gives clear instructions";
      case "crossTeam":
        return "Creates an environment where individuals feel safe to report errors";
      case "distractions":
        return "Avoids distractions if at all possible";
      case "easilyExplainsComplexIdeas":
        return "Easily explains complex ideas";
      case "openToShare":
        return "Builds a strong sense of openness, trust and community";
      case "signifiesInterest":
        return "Signifies interest in what other people have to say";
      default:
        return "Uses regulators";
    }
  }

  export const getCorrectSpelling = (trait) => {
    switch (trait) {
      case "flex":
        return "Flex";
      case "initiative":
        return "Initiative";
      case "trust":
        return "Trust";
      case "emotionalIntelligence":
        return "Emotional Intelligence";
      case "resilience":
        return "Resilience";
      case "attentive":
        return "Attentive";
      case "clarity":
        return "Clarity";
      case "nonVerbal":
        return "Non Verbal";
      case "culture":
        return "Culture";
      default:
        break;
    }
  },

