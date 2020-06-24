import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import "./TeamRank.scss";

class TeamRank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trait: props.trait,
      team: props.team,
      me: props.me,
      user: props.user,
    };
    this.reviewSub$ = props.reviewSubject.subscribe(({ review }) => {
      this.setState(
        {
          ...this.state,
          review: review,
        },
        () => console.log(this.state)
      );
    });
  }

  componentWillUnmount = () => {
    this.reviewSub$.unsubscribe();
  };

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  render() {
    if (this.state.val <= 0) {
      return null;
    }

    // not show bar if doing self review
    if (this.props.teamMemberCount <= 1) {
      return null;
    }

    let review = this.state.review;

    if (!review) {
      review = this.props.defaultReview;
    }

    const me_id = this.state.me._id;
    const team_id = this.state.team._id;
    const user_id = this.state.user._id;
    const trait = this.state.trait;

    if (!review) {
      return null;
    }

    if (review[me_id][team_id]) {
      if (review[me_id][team_id][user_id]) {
        if (review[me_id][team_id][user_id][trait]) {
          return (
            <Grid className="team-rank-container">
              <label
                className="team-rating"
                style={{
                  width: `${review[me_id][team_id][user_id][trait].val *
                    4.3}px`,
                  backgroundImage:
                    "linear-gradient(to right, #4070e0, #0096f8, #00b3e5, #00c8b3, #2dd775)",
                }}
              ></label>

              <Typography
                variant="caption"
                style={{
                  marginLeft: "5px",
                  paddingBottom: "5px",
                  marginTop: "2px",
                }}
              >
                {this.capitalize(this.state.user.firstName)}
              </Typography>
            </Grid>
          );
        }
      }
    }
    return null;
  }
}

export default TeamRank;
