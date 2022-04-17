import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  isFlatPickrError() {
    return this.state.error.message == `can't access property "destroy", _this.flatpickr is null`;
  }

  render() {
    if (this.state.errorInfo && !this.isFlatPickrError()) {
      return (
        <div>
          <h2>An Error Has Occured</h2>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
