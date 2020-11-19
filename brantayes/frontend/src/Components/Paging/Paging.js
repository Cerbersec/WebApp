import React from "react";
import Left from "@material-ui/icons/ChevronLeft";
import Right from "@material-ui/icons/ChevronRight";
import First from "@material-ui/icons/FirstPage";
import Last from "@material-ui/icons/LastPage";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

const Paging = props => {
  let { parsedQueryStr } = props;
  let itemsPerPage = parseInt(parsedQueryStr.itemsPerPage) || 10;
  let page = parseInt(parsedQueryStr.page) || 1;
  let totalPages = Math.ceil(props.totalItemsCount / itemsPerPage);

  if (!props.totalItemsCount) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <IconButton
        size="small"
        color="primary"
        disabled={page === 1}
        onClick={() => {
          props.updateQueryStr({ page: 1 });
        }}
        style={{ marginRight: 10 }}
      >
        <First />
      </IconButton>
      <IconButton
        size="small"
        color="primary"
        disabled={page === 1}
        onClick={() => {
          props.updateQueryStr({ page: page - 1 });
        }}
        style={{ marginRight: 10 }}
      >
        <Left />
      </IconButton>
      <Typography variant="body1">
        Page {page} of {totalPages}
      </Typography>
      <IconButton
        size="small"
        color="primary"
        disabled={page >= totalPages}
        onClick={() => {
          props.updateQueryStr({ page: page + 1 });
        }}
        style={{ marginLeft: 10, marginRight: 10 }}
      >
        <Right />
      </IconButton>
      <IconButton
        size="small"
        color="primary"
        disabled={page >= totalPages}
        onClick={() => {
          props.updateQueryStr({ page: totalPages });
        }}
        style={{ marginRight: 10 }}
      >
        <Last />
      </IconButton>
    </div>
  );
};

export default withRouter(Paging);
