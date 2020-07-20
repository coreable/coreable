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

import { CoreableError } from "../../../../../models/CoreableError";
import { UniversityIndustryListCommand } from "../../command/list/Industry";
import { UniversityIndustry } from "../../../models/Industry";
import { GraphQLString } from "graphql";

export default {
  type: UniversityIndustryListCommand, 
  args: {
    _id: {
      type: GraphQLString
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    if (!context.JWT) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    return {
      'data': !errors.length ? {
        'industry': await UniversityIndustry.findAll({ where: args })
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}
