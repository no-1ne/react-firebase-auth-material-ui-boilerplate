import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default ({ data }) => {
  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Current version :${data.browserName}  ${data.version}`}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {data.content}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
