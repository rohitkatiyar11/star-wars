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

export class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchString: "",
      items: [],
      searching: false
    };
    this.onInputChange = this.onInputChange.bind(this);
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

  searching() {
    this.props.getPlanetsAction(this.state.searchString).then(() => {
      this.setState({
        items: this.props.planets.data || [],
        searching: false
      });
    });
  }

  getUserPayload() {
    const payload = localStorage.getItem("payload");
    return payload && typeof payload == "object" ? JSON.parse(payload) : {};
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
              placeholder="Search planets (type atleast 2 charators)"
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
