/**
 * @fileoverview Component for showing displaying toasts,
 * which are messages about the status
 * of actions to users.
 */

import React from "react";
import { Alert, Collapse } from "react-bootstrap";

/**
 * Returns a component representing a toast, which shows
 * users messages about their actions.
 *
 * @returns a component representing a toast.
 */
export default class Toast extends React.Component {
  componentDidUpdate() {
    const { showing, onDismiss } = this.props;
    // disappear after a period of time
    if (showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(onDismiss, 5000);
    }
  }

  componentWillUnmount() {
    // clear timer if user navigates away from page
    clearTimeout(this.dismissTimer);
  }

  render() {
    const { showing, bsStyle, onDismiss, children } = this.props;
    return (
      <Collapse in={showing}>
        <div style={{ position: "fixed", bottom: 20, left: 20 }}>
          <Alert bsStyle={bsStyle} onDismiss={onDismiss}>
            {children}
          </Alert>
        </div>
      </Collapse>
    );
  }
}
