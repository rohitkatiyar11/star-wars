import React from "react";
import { connect } from "react-redux";
import {
  TextField,
  Paper,
  Button,
  Grid,
  List,
  LinearProgress,
  ListItem,
  ListItemText
} from "@material-ui/core";
import SListItem from "./ListItem";
import { getPlanetsAction } from "../actions/actions";
import config from "../config";

export class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchString: "",
      items: [],
      searching: false,
      seconds: 0
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    let payload = localStorage.getItem("payload");
    payload = JSON.parse(payload);
    if (!payload.isLoggedIn) {
      window.location.href = "/";
    }
  }

  onInputChange(e) {
    this.setState(
      {
        items: [],
        searchString: e.target.value,
        searching: e.target.value.length > 1
      },
      () => {
        this.state.searchString.length > 1 && this.searching();
      }
    );
  }

  timeLogic() {
    const payload = this.getUserPayload();
    payload.totalSearches -= 1;
    if (!payload.searchAt) {
      payload.searchAt = new Date();
    } else {
      const currentTime = new Date();
      const diff = currentTime.getTime() - new Date(payload.searchAt).getTime();
      const seconds = Math.floor(diff / 1000);
      if (seconds >= 60) {
        payload.searchAt = new Date();
        payload.totalSearches =
          config.username === payload.username ? 1000 : 15;
      }
      this.setState({ seconds });
    }
    localStorage.setItem("payload", JSON.stringify(payload));
  }

  searching() {
    this.timeLogic();
    const totalSearches = this.getUserPayload().totalSearches || 0;
    if (totalSearches > 0) {
      this.props.getPlanetsAction(this.state.searchString).then(() => {
        this.setState({
          items: this.props.planets.data || [],
          searching: false
        });
      });
    } else {
      alert(
        `Searching limit exhausted, Kindly wait for ${60 -
          this.state.seconds} seconds`
      );
      this.setState({ searching: false });
    }
  }

  getUserPayload() {
    const payload = localStorage.getItem("payload");
    return payload ? JSON.parse(payload) : {};
  }

  getHeight(population) {
    if (population && population !== "unknown") {
      return population.toString().length * 12 + "px";
    }
    return "65px";
  }

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        {this.state.searching && <LinearProgress color="secondary" />}
        <Grid container>
          <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Search planets (type atleast 2 charators, example: 'al')"
              value={this.state.searchString}
              onChange={this.onInputChange}
              fullWidth
            />
          </Grid>
          <Grid xs={2} md={1} item>
            <Button
              color="secondary"
              variant="outlined"
              onClick={this.onButtonClick}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Paper style={{ margin: 16 }}>
          {this.state.items.length > 0 && (
            <List style={{ overflow: "scroll" }}>
              {this.state.items.map((item, idx) => (
                <SListItem
                  {...item}
                  height={this.getHeight(item.population)}
                  key={`item.${idx}`}
                  divider={idx !== this.state.items.length - 1}
                />
              ))}
            </List>
          )}

          {!this.state.searching &&
            this.state.searchString.length > 1 &&
            this.state.items.length === 0 && (
              <List style={{ overflow: "scroll" }}>
                <ListItem>
                  <ListItemText primary={"No results found"} />
                </ListItem>
              </List>
            )}
        </Paper>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getPlanetsAction: searchString => dispatch(getPlanetsAction(searchString))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
