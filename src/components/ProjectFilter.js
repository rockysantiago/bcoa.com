import React, { Component } from 'react';

export default class ProjectFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  toggleFilter = () => {
    this.state.filterOpen ? this.setState({ filterOpen: false }) : this.setState({ filterOpen: true });
  }

  updateDimensions = () => {
    document.body.clientWidth <= 768 ? this.setState({ isWindowLarge: false }) : this.setState({ isWindowLarge: true });
  }

  render() {

    return (
      <div>
        <ProjectFilter toggleFilter={this.toggleFilter} />
      </div>
    );
  }
}
