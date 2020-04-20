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

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo'
import { TEAMID, JWT } from '../../../constants';
import { JOIN_TEAM } from '../../../apollo/mutations'
import './Setup.scss';

import {
  Typography,
  Container,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  CardActions
} from '@material-ui/core';

class Setup extends Component {
  constructor() {
    super();
    this.state = {
      inviteCode: "",
      isLoading: true,
      loggedIn: false,
      teams: [],
    };
    if (localStorage.getItem(JWT)) {
      this.state.loggedIn = true;
    }
    if (this.state.loggedIn) {
      fetch('https://coreable.appspot.com/graphql', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'JWT': localStorage.getItem(JWT),
        },
        body: JSON.stringify({
          query: `
      query {
        me {
          data {
            user {
              _id
              teams {
                _id
                name
                subject {
                  _id
                  name
                  state
                }
              }
            }
          }
        }
      }
    `})
      }).then(async (data) => {
        const result = await data.json();
        result.data.me.data.user.teams.push('jointeam');
        this.setState({ teams: result.data.me.data.user.teams });
      });
    }
  }

  validate = inviteCode => {
    return {
      inviteCode: inviteCode.length <= 0
    };
  }

  handleChange = (evt) => {
    this.setState({ inviteCode: evt.target.value });
  };

  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
  };

  canBeSubmitted() {
    return !this.isDisabled();
  }

  handleBlur = (field) => {

  }

  errors = () => {
    return this.validate(this.state.inviteCode);
  };

  isDisabled = () => Object.keys(this.errors()).some(x => this.errors()[x]);

  render() {
    if (!this.state.loggedIn) {
      return (<Redirect to="/"></Redirect>);
    }

    const { inviteCode } = this.state;
    return (
      <Container maxWidth="lg" style={{ height: '95.25vh' }} className="setup-container">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={2}
        >
          {
            this.state.teams.map((team, index) => {
              if (team !== 'jointeam') {
                return (<Grid item xs={12} md={6} lg={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {team.name}
                      </Typography>
                      <Typography variant="h6" component="h2">
                        state: {team.subject.state}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container justify="center">
                        <Link to={{ pathname: '/self-review', state: { team_id: team._id } }}>
                          <Button size="small" variant="contained" color="primary" disableElevation>Start Review</Button>
                        </Link>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>);
              } else if (team === 'jointeam') {
                return (<Grid item xs={12} md={6} lg={4} key={index}>
                  <Card>
                    <CardContent>
                      <TextField
                        label="Team Code"
                        placeholder="eg: GHDK0402"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        name="inviteCode"
                        value={this.state.inviteCode}
                        type="text"
                        required
                        onChange={this.handleChange}
                        onBlur={this.handleBlur("inviteCode")}
                        style={{ marginTop: '8pt' }}
                      />
                      <Mutation
                        mutation={JOIN_TEAM}
                        variables={{ inviteCode }}
                        onCompleted={data => this._success(data)}
                      >
                        {mutation => (
                          <Grid container justify="center">
                            <Button variant="contained" color="primary" disableElevation disabled={this.isDisabled()} onClick={mutation}>
                              Join Team
                            </Button>
                          </Grid>
                        )}
                      </Mutation>
                    </CardContent>
                  </Card>
                </Grid>);
              } else {
                return (<Redirect to="/"></Redirect>);
              }
            })
          }
        </Grid>
      </Container>
    );
  }

  _success = async data => {
    try {
      const { teams } = data.joinTeam.data.user;
      teams.push('jointeam');
      this.setState({
        ...this.state,
        teams
      });
    } catch (err) {
      alert('Invalid team');
    }
  }

  _saveUserData = ({ _id }) => {
    localStorage.setItem(TEAMID, _id)
  }

}

export default Setup;
