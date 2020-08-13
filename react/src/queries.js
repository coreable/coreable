/*
  ===========================================================================
    Copyright (C) 2020 Coreable
    This file is part of Coreable's source code.
    Coreables source code is free software; you can redistribute it
    and/or modify it under the terms of the End-user license agreement.
    Coreable's source code is distributed in the hope that it will be
    useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    You should have received a copy of the license along with the 
    Coreable source code.
  ===========================================================================
*/

const MANAGER_API = {
  query: `
  query {
    manager {
      errors {
        code
        path
        message
      }
      data {
         manager {
          _id
          firstName
          lastName
          email

          # ORGANISATION
          organisation {
            _id
            name
            report {
              average {
                default {
                  calm
                  clearInstructions
                  cooperatively
                  crossTeam
                  distractions
                  easilyExplainsComplexIdeas
                  empathy
                  usesRegulators
                  influences
                  managesOwn
                  newIdeas
                  openToShare
                  positiveBelief
                  proactive
                  resilienceFeedback
                  signifiesInterest
                  workDemands
                }
                sorted {
                  field
                  value
                }
                communication {
                  traits {
                    default {
                      clearInstructions
                      easilyExplainsComplexIdeas
                      openToShare
                      crossTeam
                      distractions
                      usesRegulators
                      signifiesInterest
                    }
                    sorted {
                      field
                      value
                    }
                  }
                  facets {
                    default {
                      clarity
                      culture
                      nonVerbal
                      attentive
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
                collaboration {
                  traits {
                    default {
                      calm
                      cooperatively
                      empathy
                      influences
                      managesOwn
                      newIdeas
                      positiveBelief
                      proactive
                      resilienceFeedback
                      workDemands
                    }
                    sorted {
                      value
                      field
                    }
                  }
                  facets {
                    default {
                      emotionalIntelligence
                      initiative
                      trust
                      flex
                      resilience
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
              }
            }
          }

          # SUBJECT
          subject {
            _id
            name
            report {
              average {
                default {
                  calm
                  clearInstructions
                  cooperatively
                  crossTeam
                  distractions
                  easilyExplainsComplexIdeas
                  empathy
                  usesRegulators
                  influences
                  managesOwn
                  newIdeas
                  openToShare
                  positiveBelief
                  proactive
                  resilienceFeedback
                  signifiesInterest
                  workDemands
                }
                sorted {
                  field
                  value
                }
                communication {
                  traits {
                    default {
                      clearInstructions
                      easilyExplainsComplexIdeas
                      openToShare
                      crossTeam
                      distractions
                      usesRegulators
                      signifiesInterest
                    }
                    sorted {
                      field
                      value
                    }
                  }
                  facets {
                    default {
                      clarity
                      culture
                      nonVerbal
                      attentive
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
                collaboration {
                  traits {
                    default {
                      calm
                      cooperatively
                      empathy
                      influences
                      managesOwn
                      newIdeas
                      positiveBelief
                      proactive
                      resilienceFeedback
                      workDemands
                    }
                    sorted {
                      value
                      field
                    }
                  }
                  facets {
                    default {
                      emotionalIntelligence
                      initiative
                      trust
                      flex
                      resilience
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
              }
            }
          }

          # TUTORIAL
          tutorial {
            _id
            name
            report {
              average {
                default {
                  calm
                  clearInstructions
                  cooperatively
                  crossTeam
                  distractions
                  easilyExplainsComplexIdeas
                  empathy
                  usesRegulators
                  influences
                  managesOwn
                  newIdeas
                  openToShare
                  positiveBelief
                  proactive
                  resilienceFeedback
                  signifiesInterest
                  workDemands
                }
                sorted {
                  field
                  value
                }
                communication {
                  traits {
                    default {
                      clearInstructions
                      easilyExplainsComplexIdeas
                      openToShare
                      crossTeam
                      distractions
                      usesRegulators
                      signifiesInterest
                    }
                    sorted {
                      field
                      value
                    }
                  }
                  facets {
                    default {
                      clarity
                      culture
                      nonVerbal
                      attentive
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
                collaboration {
                  traits {
                    default {
                      calm
                      cooperatively
                      empathy
                      influences
                      managesOwn
                      newIdeas
                      positiveBelief
                      proactive
                      resilienceFeedback
                      workDemands
                    }
                    sorted {
                      value
                      field
                    }
                  }
                  facets {
                    default {
                      emotionalIntelligence
                      initiative
                      trust
                      flex
                      resilience
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
              }
            }
          }

          # TEAM
          team {
            _id
            name
            report {
              average {
                default {
                  calm
                  clearInstructions
                  cooperatively
                  crossTeam
                  distractions
                  easilyExplainsComplexIdeas
                  empathy
                  usesRegulators
                  influences
                  managesOwn
                  newIdeas
                  openToShare
                  positiveBelief
                  proactive
                  resilienceFeedback
                  signifiesInterest
                  workDemands
                }
                sorted {
                  field
                  value
                }
                communication {
                  traits {
                    default {
                      clearInstructions
                      easilyExplainsComplexIdeas
                      openToShare
                      crossTeam
                      distractions
                      usesRegulators
                      signifiesInterest
                    }
                    sorted {
                      field
                      value
                    }
                  }
                  facets {
                    default {
                      clarity
                      culture
                      nonVerbal
                      attentive
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
                collaboration {
                  traits {
                    default {
                      calm
                      cooperatively
                      empathy
                      influences
                      managesOwn
                      newIdeas
                      positiveBelief
                      proactive
                      resilienceFeedback
                      workDemands
                    }
                    sorted {
                      value
                      field
                    }
                  }
                  facets {
                    default {
                      emotionalIntelligence
                      initiative
                      trust
                      flex
                      resilience
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
              }
            }
          }

          # USER
          user {
            _id
            identity {
              firstName
              lastName
              email
            }
            team {
              _id
              name
            }
            tutorial {
              _id
              name
            }
            organisation {
              _id
              name
            }
            report {
              average {
                default {
                  calm
                  clearInstructions
                  cooperatively
                  crossTeam
                  distractions
                  easilyExplainsComplexIdeas
                  empathy
                  usesRegulators
                  influences
                  managesOwn
                  newIdeas
                  openToShare
                  positiveBelief
                  proactive
                  resilienceFeedback
                  signifiesInterest
                  workDemands
                }
                sorted {
                  field
                  value
                }
                communication {
                  traits {
                    default {
                      clearInstructions
                      easilyExplainsComplexIdeas
                      openToShare
                      crossTeam
                      distractions
                      usesRegulators
                      signifiesInterest
                    }
                    sorted {
                      field
                      value
                    }
                  }
                  facets {
                    default {
                      clarity
                      culture
                      nonVerbal
                      attentive
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
                collaboration {
                  traits {
                    default {
                      calm
                      cooperatively
                      empathy
                      influences
                      managesOwn
                      newIdeas
                      positiveBelief
                      proactive
                      resilienceFeedback
                      workDemands
                    }
                    sorted {
                      value
                      field
                    }
                  }
                  facets {
                    default {
                      emotionalIntelligence
                      initiative
                      trust
                      flex
                      resilience
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
              }
              reflection {
                default {
                  calm
                  clearInstructions
                  cooperatively
                  crossTeam
                  distractions
                  easilyExplainsComplexIdeas
                  empathy
                  usesRegulators
                  influences
                  managesOwn
                  newIdeas
                  openToShare
                  positiveBelief
                  proactive
                  resilienceFeedback
                  signifiesInterest
                  workDemands
                }
                sorted {
                  field
                  value
                }
                communication {
                  traits {
                    default {
                      clearInstructions
                      easilyExplainsComplexIdeas
                      openToShare
                      crossTeam
                      distractions
                      usesRegulators
                      signifiesInterest
                    }
                    sorted {
                      field
                      value
                    }
                  }
                  facets {
                    default {
                      clarity
                      culture
                      nonVerbal
                      attentive
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
                collaboration {
                  traits {
                    default {
                      calm
                      cooperatively
                      empathy
                      influences
                      managesOwn
                      newIdeas
                      positiveBelief
                      proactive
                      resilienceFeedback
                      workDemands
                    }
                    sorted {
                      value
                      field
                    }
                  }
                  facets {
                    default {
                      emotionalIntelligence
                      initiative
                      trust
                      flex
                      resilience
                    }
                    sorted {
                      value
                      field
                    }
                  }
                }
              }
            }
          }

          # END
        }
      }
    }
  }`,
};
const SKILLS_API = {
  query: `
  query {
    me {
      data {
        user {
          report {
            reflection {
              default {
                calm
                clearInstructions
                cooperatively
                crossTeam
                distractions
                easilyExplainsComplexIdeas
                empathy
                usesRegulators
                influences
                managesOwn
                newIdeas
                openToShare
                positiveBelief
                proactive
                resilienceFeedback
                signifiesInterest
                workDemands
              }
              communication {
                traits {
                  default {
                    clearInstructions
                    easilyExplainsComplexIdeas
                    openToShare
                    crossTeam
                    distractions
                    usesRegulators
                    signifiesInterest
                  }
                }
                facets {
                  default {
                    clarity
                    culture
                    nonVerbal
                    attentive
                  }
                }
              }
              collaboration {
                traits {
                  default {
                    calm
                    cooperatively
                    empathy
                    influences
                    managesOwn
                    newIdeas
                    positiveBelief
                    proactive
                    resilienceFeedback
                    workDemands
                  }
                }
                facets {
                  default {
                    emotionalIntelligence
                    initiative
                    trust
                    flex
                    resilience
                  }
                }
              }
              sorted {
                value
                field
              }
            }
            average {
              communication {
                traits {
                  default {
                    clearInstructions
                    easilyExplainsComplexIdeas
                    openToShare
                    crossTeam
                    distractions
                    usesRegulators
                    signifiesInterest
                  }
                }
                facets {
                  default {
                    clarity
                    culture
                    nonVerbal
                    attentive
                  }
                }
              }
              collaboration {
                traits {
                  default {
                    calm
                    cooperatively
                    empathy
                    influences
                    managesOwn
                    newIdeas
                    positiveBelief
                    proactive
                    resilienceFeedback
                    workDemands
                  }
                }
                facets {
                  default {
                    emotionalIntelligence
                    initiative
                    trust
                    flex
                    resilience
                  }
                }
              }
              default {
                calm
                clearInstructions
                cooperatively
                crossTeam
                distractions
                easilyExplainsComplexIdeas
                empathy
                usesRegulators
                influences
                managesOwn
                newIdeas
                openToShare
                positiveBelief
                proactive
                resilienceFeedback
                signifiesInterest
                workDemands
              }
              sorted {
                value
                field
              }
            }
          }
        }
      }
    }
  }
  `,
};

export { MANAGER_API, SKILLS_API };
