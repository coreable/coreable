<div className="container">
  <div className="grid">
    <div className="grid-card">
      <h1 style={{ textAlign: "left", color: "#000", margin: "0" }}>
        Welcome,
      </h1>
      <h2 style={{ textAlign: "left", color: "#707070", margin: "0" }}>
        login to start
      </h2>
      <FormControl style={{ marginTop: "16pt", autocomplete: "off" }}>
        <TextField
          InputLabelProps={{ style: { fontSize: 12 } }}
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          name="email"
          error={this.handlers.shouldMarkError("email")}
          value={this.state.email}
          type="email"
          onChange={this.handlers.change}
          onBlur={this.handlers.blur("email")}
          style={{
            marginTop: "20pt",
          }}
        />
        <TextField
          InputLabelProps={{ style: { fontSize: 12 } }}
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          name="password"
          error={this.handlers.shouldMarkError("password")}
          value={this.state.password}
          type="password"
          onChange={this.handlers.change}
          onBlur={this.handlers.blur("password")}
          onKeyPress={async (e) => {
            if (e.key === "Enter") {
              await this.loginUser();
            }
          }}
          style={{
            marginTop: "8pt",
            marginBottom: "8pt",
          }}
        />

        <button
          className="btn primarybtn"
          onClick={async () => {
            await this.loginUser();
          }}
          style={{ marginTop: "10px" }}
        >
          Login
        </button>

        <Link
          to="/signup"
          style={{
            marginTop: "8pt",
            textDecoration: "none",
            color: "lightgrey",
          }}
        >
          <button className="btn blueTextButton" style={{ marginTop: "10px" }}>
            Sign up
          </button>
        </Link>

        <div style={{ marginTop: "15px" }}>
          <Link
            to="/forgot"
            style={{
              marginTop: "8pt",
              textDecoration: "none",
              color: "lightgrey",
            }}
          >
            Forgot password
          </Link>
        </div>
      </FormControl>
    </div>
  </div>
</div>;
