/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/ 

import { sequelize } from "../../../lib/sequelize";

import { CoreableError } from "../../../models/CoreableError";
import { IndustryListCommand } from "../../command/list/Industry";

export default {
  type: IndustryListCommand, 
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    return {
      'data': !errors.length ? {
        'industry': await sequelize.models.Industry.findAll()
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}
