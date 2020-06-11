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
  GraphQLString,
  GraphQLFloat
} from "graphql";

import { CoreableError } from "../../models/CoreableError";
import { APICommand } from "../command/API";
import { config } from '../../config/config';

export default {
  type: APICommand,
  args: {
    time: {
      type: GraphQLFloat
    },
    mode: {
      type: GraphQLString
    }
  },
  resolve(root: any, args: any) {
    let errors: CoreableError[] = [];
    if (config.NODE_ENV !== "production") {
      errors.push({ code: "ER_NODE_ENV", path: "NODE.JS", message: `WARNING: Node.JS is running in ${config.NODE_ENV} mode! Do not ship this mode` });
    }
    return {
      'data': {
        'API': {
          'time': Date.now(),
          'env': config.NODE_ENV
        }
      },
      'errors': errors.length > 0 ? errors : null
    }
  }
}
