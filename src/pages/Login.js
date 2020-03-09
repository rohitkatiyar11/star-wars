import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { loginAction } from "../actions/actions";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.getData = this.getData.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    let payload = localStorage.getItem("payload");
    payload = JSON.parse(payload);
    payload && payload.isLoggedIn && this.props.history.push(`/search`);
  }

  getData(e) {
    const data = this.state;
    data[e.target.name] = e.target.value;
    this.setState(data);
  }

  submit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginAction(username, password).then(() => {
      const payload = JSON.parse(localStorage.getItem("payload"));
      !payload.isLoggedIn && alert("Incorrect username or password");
      payload.isLoggedIn && this.props.history.push(`/search`);
    });
  }

  render() {
    const styles = {
      display: "flex",
      marginTop: "64px",
      alignItems: "center",
      flexDirection: "column"
    };

    return (
      <div style={styles}>
        <form className={"form"} noValidate onSubmit={this.submit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={this.getData}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.getData}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={"submit"}
            disabled={this.state.username === "" || this.state.password === ""}
          >
            Sign In
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  loginAction: (username, password) => dispatch(loginAction(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
