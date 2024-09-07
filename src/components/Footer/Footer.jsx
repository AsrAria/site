// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import footerStyle from "assets/styles/components/footerStyle.jsx";

// MARK: components

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.right}>
          <span />
        </p>
      </div>
    </footer>
  );
}

// MARK: prop type validation

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

// MARK: export

export default withStyles(footerStyle)(Footer);
