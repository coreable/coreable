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

import { GraphQLString, GraphQLNonNull } from "graphql";
import { SessionObjectCommand } from "../command/object/Session";
import { ChangePassword } from '../logic/ChangePassword';

export default {
  type: SessionObjectCommand,
  args: {
    currentPassword: {
      type: new GraphQLNonNull(GraphQLString)
    },
    newPassword: {
      type: new GraphQLNonNull(GraphQLString)
    },
    confirmPassword: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    return await ChangePassword(root, args, context);
  }
}
