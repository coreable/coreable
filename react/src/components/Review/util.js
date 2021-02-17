import { API_URL } from "../../constants";
import emotionalIntelligence from "../../images/EmotionalInteligence.svg";
import initative from "../../images/Initative.svg";
import trust from "../../images/Trust.svg";
import flexibility from "../../images/Flexibility.svg";
import resilience from "../../images/Resilience.svg";
import clarity from "../../images/Clarity.svg";
import nonVerbal from "../../images/NonVerbal.svg";
import verbalAttent from "../../images/VerbalAttent.svg";
import culture from "../../images/Culture.svg";

export const submitReview2 = async (
  AUTH_TOKEN,
  team_id,
  tutorial_id,
  subject_id,
  organisation_id,
  me_id
) => {
  const review = JSON.parse(localStorage.getItem("review-coreable"));

  let calm,
    clearInstructions,
    cooperatively,
    crossTeam,
    distractions,
    easilyExplainsComplexIdeas,
    empathy,
    usesRegulators,
    influences,
    managesOwn,
    newIdeas,
    openToShare,
    positiveBelief,
    proactive,
    resilienceFeedback,
    signifiesInterest,
    workDemands;

  review.map((trait) => {
    switch (trait.trait) {
      case "calm":
        calm = trait.value;
        break;
      case "clearInstructions":
        clearInstructions = trait.value;
        break;
      case "cooperatively":
        cooperatively = trait.value;
        break;
      case "crossTeam":
        crossTeam = trait.value;
        break;
      case "distractions":
        distractions = trait.value;
        break;
      case "easilyExplainsComplexIdeas":
        easilyExplainsComplexIdeas = trait.value;
        break;
      case "empathy":
        empathy = trait.value;
        break;
      case "usesRegulators":
        usesRegulators = trait.value;
        break;
      case "influences":
        influences = trait.value;
        break;
      case "managesOwn":
        managesOwn = trait.value;
        break;
      case "newIdeas":
        newIdeas = trait.value;
        break;
      case "openToShare":
        openToShare = trait.value;
        break;
      case "positiveBelief":
        positiveBelief = trait.value;
        break;
      case "proactive":
        proactive = trait.value;
        break;
      case "resilienceFeedback":
        resilienceFeedback = trait.value;
        break;
      case "signifiesInterest":
        signifiesInterest = trait.value;
        break;
      case "workDemands":
        workDemands = trait.value;
        break;
      default:
        break;
    }
  });

  try {
    const query = {
      query: `
            mutation {
              submitReview(
                receiver_id: "${me_id}",
                team_id: "${team_id}",
                subject_id: "${subject_id}",
                tutorial_id: "${tutorial_id}",
                organisation_id: "${organisation_id}",

                calm: ${calm},
                clearInstructions: ${clearInstructions},
                cooperatively: ${cooperatively},
                crossTeam: ${crossTeam},
                distractions: ${distractions},
                easilyExplainsComplexIdeas: ${easilyExplainsComplexIdeas},
                empathy: ${empathy},
                usesRegulators: ${usesRegulators},
                influences: ${influences},
                managesOwn: ${managesOwn},
                newIdeas: ${newIdeas},
                openToShare: ${openToShare},
                positiveBelief: ${positiveBelief},,
                proactive: ${proactive},
                resilienceFeedback: ${resilienceFeedback},
                signifiesInterest: ${signifiesInterest},
                workDemands: ${workDemands},
              ) {
                errors {
                  path
                  code
                  message
                }
                data {
                  review {
                    _id
                  }
                }
              }
            }
          `,
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: AUTH_TOKEN,
      },
      body: JSON.stringify(query),
    };

    console.log(options);

    let result = await fetch(API_URL, options);
    console.log(result.data);
    console.log(result.error);
      // .then(console.log)
      // .catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
  }
};

export const submitReview = async (props) => {
  const review = JSON.parse(localStorage.getItem("review"));

  const promises = [];
  const AUTH_TOKEN = props.app.JWT;
  const team_id = props.location.state.pending._id;
  const tutorial_id = props.location.state.pending.tutorial._id;
  const subject_id = props.location.state.pending.tutorial.subject._id;
  const organisation_id =
    props.location.state.pending.tutorial.subject.organisation._id;
  const me_id = props.app.data.user._id;

  for (const user in review[me_id][team_id]) {
    try {
      const query = {
        query: `
            mutation {
              submitReview(
                receiver_id: "${user}",
                team_id: "${team_id}",
                subject_id: "${subject_id}",
                tutorial_id: "${tutorial_id}",
                organisation_id: "${organisation_id}",

                calm: ${review[me_id][team_id][user]["calm"].val},
                clearInstructions: ${review[me_id][team_id][user]["clearInstructions"].val},
                cooperatively: ${review[me_id][team_id][user]["cooperatively"].val},
                crossTeam: ${review[me_id][team_id][user]["crossTeam"].val},
                distractions: ${review[me_id][team_id][user]["distractions"].val},
                easilyExplainsComplexIdeas: ${review[me_id][team_id][user]["easilyExplainsComplexIdeas"].val},
                empathy: ${review[me_id][team_id][user]["empathy"].val},
                usesRegulators: ${review[me_id][team_id][user]["usesRegulators"].val},
                influences: ${review[me_id][team_id][user]["influences"].val},
                managesOwn: ${review[me_id][team_id][user]["managesOwn"].val},
                newIdeas: ${review[me_id][team_id][user]["newIdeas"].val},
                openToShare: ${review[me_id][team_id][user]["openToShare"].val},
                positiveBelief: ${review[me_id][team_id][user]["positiveBelief"].val},,
                proactive: ${review[me_id][team_id][user]["proactive"].val},
                resilienceFeedback: ${review[me_id][team_id][user]["resilienceFeedback"].val},
                signifiesInterest: ${review[me_id][team_id][user]["signifiesInterest"].val},
                workDemands: ${review[me_id][team_id][user]["workDemands"].val},
              ) {
                errors {
                  path
                  code
                  message
                }
                data {
                  review {
                    _id
                  }
                }
              }
            }
          `,
      };
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          JWT: AUTH_TOKEN,
        },
        body: JSON.stringify(query),
      };
      promises.push(
        new Promise((r, f) => {
          fetch(API_URL, options)
            .then(r)
            .catch(f);
        })
      );
    } catch (err) {
      console.error(err);
    }
  }

  Promise.all(promises)
    .then(() => {
      try {
        const reviews = JSON.parse(localStorage.getItem("review"));
        delete reviews[team_id];
        localStorage.setItem("review", JSON.stringify(reviews));
      } catch (err) {
        console.error(err);
        return false;
      }
      props.refreshMe();
      if (this.state.reviewState === 1) {
        props.history.push({
          pathname: "/skills",
        });
      }
    })
    .catch((err) => console.error(err));
};

export const facets = [
  {
    name: "Emotional Intelligence",
    desc:
      "Ability to perceive, use, and understand our personality traits to manage and deal with emotions",
    image: emotionalIntelligence,
    traits: [
      {
        name: "Empathy",
        var: "empathy",
        val: 0,
        desc: "Demonstrates empathy",
        para: "Is able to understand and share feelings of another",
      },
      {
        name: "Manages own",
        var: "managesOwn",
        val: 0,
        desc: "Manages own emotions",
        para:
          "Is able to maintain control of emotions in professonal environments",
      },
    ],
  },
  {
    name: "Initiative",
    desc:
      "To be proactive and self-starting; seize opportunities and act upon them to actively influence events",
    image: initative,
    traits: [
      {
        name: "Proactive",
        var: "proactive",
        val: 0,
        desc: "Proactive and self-starting",
        para:
          "The ability to make things happen, instead of waiting for them to happen",
      },
      {
        name: "Influences",
        var: "influences",
        val: 0,
        desc: "Actively influences events",
        para: "Makes an effort to contribute and be involved ",
      },
    ],
  },
  {
    name: "Trust",
    desc: "Firm belief in the reliability, truth, or ability of someone",
    image: trust,
    traits: [
      {
        name: "Cooperatively",
        var: "cooperatively",
        val: 0,
        desc: "Ability to work cooperatively",
        para:
          "Is able to work in a way that involves mutual assistance in working towards a common goal",
      },
      {
        name: "Positive belief",
        var: "positiveBelief",
        val: 0,
        desc: "Has a positive belief about the dependability of others",
        para: "Has faith that other members will complete their role",
      },
    ],
  },
  {
    name: "Flexibility",
    desc:
      "Adaptable and receptive to new ideas; responds and adjusts easily to changing work demands and circumstances; not bound by old ways of doing things",
    image: flexibility,
    traits: [
      {
        name: "New ideas",
        var: "newIdeas",
        val: 0,
        desc: "Adaptable and receptive to new ideas",
        para: "Is open to different ideas that may not be their own",
      },
      {
        name: "Work demands",
        var: "workDemands",
        val: 0,
        desc: "Adjusts easily to a change in work demands",
        para:
          "Is able to productively change and complete unexpected tasks as they arise",
      },
    ],
  },
  {
    name: "Resilience",
    desc:
      "Ability to recover, adjust and even thrive after misfortune or change",
    image: resilience,
    traits: [
      {
        name: "Resilience feedback",
        var: "resilienceFeedback",
        val: 0,
        desc: "Accepts constructive feedback",
        para: "Is receptive and takes on board others opinions",
      },
      {
        name: "Calm",
        var: "calm",
        val: 0,
        desc: "Remains calm under pressure",
        para:
          "Is able to maintain concentration and work through high stress situations without disruption",
      },
    ],
  },
  {
    name: "Clarity",
    desc:
      "Provides clear instructions that encourage productivity and prevent misunderstanding",
    image: clarity,
    traits: [
      {
        name: "Clear instructions",
        var: "clearInstructions",
        val: 0,
        desc: "Gives clear instructions",
        para: "Is able to communicate tasks without repeating themselves",
      },
      {
        name: "Complex ideas",
        var: "easilyExplainsComplexIdeas",
        val: 0,
        desc: "Easily explains complex ideas",
        para:
          "Is able to communicate complicated concepts in a way that someone who is uneducated on the topic could understand",
      },
    ],
  },
  {
    name: "Culture",
    desc:
      "Enables effective communication across all team members, delivers messages in an appropriate tone and cultivates an an open and supportive environment",
    image: culture,
    traits: [
      {
        name: "Open to share",
        var: "openToShare",
        val: 0,
        desc: "Builds a strong sense of openness, trust and community",
        para:
          "When this person is around you feel comfortable to share ideas without judgement",
      },
      {
        name: "Cross team",
        var: "crossTeam",
        val: 0,
        desc:
          "Creates an environment where individuals feel safe to report errors",
        para:
          "When this person is around you feel comfortable to share mistakes without judgement",
      },
    ],
  },
  {
    name: "Non-Verbal Communication",
    desc:
      "Ability to stay engaged through body language, gestures, facial expressions and other ways of communication",
    image: nonVerbal,
    traits: [
      {
        name: "Distractions",
        var: "distractions",
        val: 0,
        desc: "Avoids distractions if at all possible",
        para: "This person maintains concentration when spoken to",
      },
      {
        name: "Uses Regulators",
        var: "usesRegulators",
        val: 0,
        desc: "Uses Regulators",
        para:
          "Demonstrates active listening by appearing relaxed, friendly facial expressions, open posture, eye contact, full attention and non-verbal acknowledgments during interactions",
      },
    ],
  },
  {
    name: "Verbal Attentiveness",
    desc:
      "Practices active listening by paraphrasing, clarifying, reflective listening and asking questions.",
    image: verbalAttent,
    traits: [
      {
        name: "Signifies interest",
        var: "signifiesInterest",
        val: 0,
        desc: "Signifies interest in what other people have to say",
        para:
          "This person actively contributes to conversations ensuring they understand and otherwise asking for clarifcation",
      },
    ],
  },
];

const traits = [
  {
    traitName: "calm",
    value: 0,
  },
  {
    traitName: "clearInstructions",
    value: 0,
  },
  {
    traitName: "cooperatively",
    value: 0,
  },
  {
    traitName: "crossTeam",
    value: 0,
  },
  {
    traitName: "distractions",
    value: 0,
  },
  {
    traitName: "easilyExplainsComplexIdeas",
    value: 0,
  },
  {
    traitName: "empathy",
    value: 0,
  },
  {
    traitName: "usesRegulators",
    value: 0,
  },
  {
    traitName: "influences",
    value: 0,
  },
  {
    traitName: "managesOwn",
    value: 0,
  },
  {
    traitName: "newIdeas",
    value: 0,
  },
  {
    traitName: "openToShare",
    value: 0,
  },
  {
    traitName: "positiveBelief",
    value: 0,
  },
  {
    traitName: "proactive",
    value: 0,
  },
  {
    traitName: "resilienceFeedback",
    value: 0,
  },
  {
    traitName: "signifiesInterest",
    value: 0,
  },
  {
    traitName: "workDemands",
    value: 0,
  },
];

export const createTeamObject = (teamMembers) => {
  let teamObject = [];

  teamMembers.map((member) => {
    teamObject.push({
      ...member,
      results: traits,
    });
  });

  localStorage.setItem("review", JSON.stringify(teamObject));

  return teamObject;
};
