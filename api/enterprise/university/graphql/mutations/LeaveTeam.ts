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

import {
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

import { UserObjectCommand } from "../command/object/User";
import { LeaveTeam } from "../../logic/mutations/LeaveTeam";

export default {
  type: UserObjectCommand,
  args: {
    team_id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    return await LeaveTeam(root, args, context);
  }
}