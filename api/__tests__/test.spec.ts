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

import { describe, it } from 'mocha';
import chai, {expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { server } from '../server';
import { Server } from 'http';

describe('Server [api/server.ts]', () => {

  before(async() => {
    await server._done;
  });

  it('should be an instance of http.Server', async() => {
    return expect(server).to.be.instanceOf(Server);
  });

  after(async() => {

  });

}); 

