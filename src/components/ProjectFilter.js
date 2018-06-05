import React, { Fragment, Component } from 'react';
import classnames from "classnames";

export default class ProjectFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }

  toggleFilter = () => {
    this.state.filterOpen ? this.setState({ filterOpen: false }) : this.setState({ filterOpen: true });
  }

  updateDimensions = () => {
    document.body.clientWidth <= 768 ? this.setState({ isWindowLarge: false }) : this.setState({ isWindowLarge: true });
  }

  render() {
    const filterButtonClasses = classnames({
      "marginBottom-6": this.state.filterOpen,
      "bp-marginBottom-0": true,
    })
    return (
      <div className="f-subhead c-gray">
        {!this.state.isWindowLarge &&
          <div className={filterButtonClasses}>
            <button className="margin-0" onClick={this.toggleFilter}>
              Project Categories <span style={{ display: "inline-block", width: "10px", textAlign: "center" }}>{this.state.filterOpen ? "-" : "+"}</span>
            </button>
          </div>
        }
        {(this.state.filterOpen || this.state.isWindowLarge) &&
          <Fragment>
            <div className="radio marginBottom-4 bp-1_marginBottom-0">
              <input name="filter" type="radio" id="all" defaultChecked="true" onChange={(el) => this.props.onChange(el.target.id)} />
              <label className="marginRight-4" htmlFor="all">
                All Projects
              </label>
            </div>
            <div className="radio marginBottom-4 bp-1_marginBottom-0">
              <input name="filter" type="radio" id="residential" onChange={(el) => this.props.onChange(el.target.id)} />
              <label className="marginRight-4" htmlFor="residential">
                Residential
              </label>
            </div>
            <div className="radio">
              <input name="filter" type="radio" id="commercial" onChange={(el) => this.props.onChange(el.target.id)} />
              <label className="" htmlFor="commercial">
                Commercial
              </label>
            </div>
          </Fragment>
        }
      </div>
    )
  }
}
