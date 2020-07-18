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
  GraphQLString
} from "graphql";

import { ManagerLogin } from "../../logic/ManagerLogin";
import { SessionObjectCommand } from "../command/object/Session";

export default {
  type: SessionObjectCommand,
  args: {
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    return await ManagerLogin(root, args, context);
  }
}
