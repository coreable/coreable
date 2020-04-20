import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Grid,
  CircularProgress
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
    return (<Radar
    options={{
      scale: {
        ticks: {
          max: 100
        }
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

    </Radar>)
  }
}

export default chart;