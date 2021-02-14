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

import { Review } from "../models/Review";
import { CollaborationFacets } from "../models/CollaborationFacet";

export function CalculateCollaborationFacets(review: Review, args: any, context: any): CollaborationFacets {
  return {
    'emotionalIntelligence': ((review.empathy + review.managesOwn) / 2),
    'initiative': ((review.proactive + review.influences) / 2),
    'trust': ((review.cooperatively + review.positiveBelief) / 2),
    'flex': ((review.newIdeas + review.workDemands) / 2),
    'resilience': ((review.resilienceFeedback + review.calm) / 2)
  };
} 
