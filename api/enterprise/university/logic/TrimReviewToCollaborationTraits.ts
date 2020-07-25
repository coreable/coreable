import { UniversityReview } from "../models/Review";
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

import { CollaborationTraits } from "../models/CollaborationTraits";

export function TrimReviewToCollaborationTraits(review: UniversityReview, args: any, context: any): CollaborationTraits {
  return {
    'calm': review.calm,
    'cooperatively': review.cooperatively,
    'empathy': review.empathy,
    'influences': review.influences,
    'managesOwn': review.managesOwn,
    'newIdeas': review.newIdeas,
    'positiveBelief': review.positiveBelief,
    'proactive': review.proactive,
    'resilienceFeedback': review.resilienceFeedback,
    'workDemands': review.workDemands
  };
}