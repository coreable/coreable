<Container>
  <Header>
    <h1>Your teams</h1>
    <p style={{ fontSize: "1.4rem", color: "white" }}>
      View, review and join teams.
    </p>
  </Header>
  <div className="main">
    <div className="grid-home">
      {this.state.me.team.map((team, index) => {
        if (!team._id) {
          return null;
        }
        if (team._id !== "joinTeam") {
          return (
            <ReviewCard
              team={team}
              key={index}
              onClick={this.ReviewCardHandler}
              capitalize={this.capitalize}
              disabled={this.getReviewButtonState(team._id)}
              teamSubjectState={
                this.state.me.teamMap[team._id].tutorial.subject.state
              }
              reviewState={
                this.state.me.teamMap[team._id].tutorial.subject.state
              }
              user_id={this.state.me["_id"]}
              pending={this.getPendingUser(team._id)}
            />
          );
        }
        return (
          <JoinCard
            key={index}
            value={this.state.inviteCode}
            onChange={this.handleChange}
            onBlur={this.handleBlur("inviteCode")}
            onKeyPress={async (e) => {
              if (e.key === "Enter") {
                await this.joinTeam();
              }
            }}
            disabled={this.isDisabled()}
            onClick={async () => {
              await this.joinTeam();
            }}
          />
        );
      })}
    </div>
  </div>
</Container>;
