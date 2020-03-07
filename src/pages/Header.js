import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.setItem(
      "payload",
      JSON.stringify({ isLoggedIn: false, totalSearches: 0 })
    );
    window.location.href = "/";
  }

  render() {
    const { menuStyle, classes } = this.props;
    const style = {
      appBar: {
        position: "fixed",
        top: 0,
        overflow: "hidden",
        maxHeight: 57
      }
    };

    let payload = localStorage.getItem("payload");
    payload = payload && JSON.parse(payload);

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ ...menuStyle, ...style.appBar }}>
          <Toolbar variant="dense">
            {payload.username && (
              <h4>
                <i>Hey {payload.username} !</i>
              </h4>
            )}
            &nbsp;&nbsp;
            {payload && payload.isLoggedIn && (
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={"logout"}
                onClick={this.logout}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
