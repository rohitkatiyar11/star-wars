import React from "react";

import { ListItem, ListItemText } from "@material-ui/core";

const SListItem = props => (
  <ListItem divider={props.divider}>
    <div style={{ height: props.height || "65px" }}>
      <ListItemText
        primary={props.name}
        secondary={`Pupulation: ${props.population}`}
      />
    </div>
  </ListItem>
);

export default SListItem;
