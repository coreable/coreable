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

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Grid,
  CircularProgress,
  Container
} from '@material-ui/core';

let chart = props => {
  if (props.loading) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );
  } else {
    return (
      <Container style={{marginBottom: '16pt'}}>
        <Radar
          options={{
            scale: {
              ticks: {
                max: 100,
                min: 0,
                stepSize: 20
              }
            },
            legend: {
              position: 'right',
              align: 'start'
            }
          }}
          data={{
            labels: [
              'Emotional Intelligence',
              'Initiative',
              'Moral Trust',
              'Flexibility',
              'Clarity',
              'Culture',
              'Non-Verbal',
              'Verbal Attentiveness',
              'Resilience'
            ],
            datasets: [{
              label: 'Self-Review',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,0.4)',
              data: [
                props.average.emotionalIntelligence,
                props.average.initiative,
                props.average.trust,
                props.average.flex,
                props.average.clarity,
                props.average.culture,
                props.average.nonVerbal,
                props.average.attentive,
                props.average.resilience
              ]
            }],
            backgroundColor: '#234'
          }}>

        </Radar>
      </Container>);
  }
}

export default chart;