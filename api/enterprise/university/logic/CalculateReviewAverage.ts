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

export function CalculateReviewAverage(reviews: any, args: any, context: any) {
  let counter = 0;
  const average: any = {};
  for (const review of reviews) {
    for (const [key, value] of Object.entries(review)) {
      average[key] = (average[key] || 0) + value;
    }
    counter++;
  }

  for (const key in average) {
    average[key] = average[key] / counter;
  }
  return {
    'reviews': reviews,
    'average': average
  }
}