import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select } from "antd";
import { getCompanies } from "../../actions/companyActions";

class Finance extends Component {
  componentWillMount() {
    this.props.dispatch(getCompanies());
  }
  render() {
    const companyNames = this.props.selectOptions;
    return (
      <div>
        <Select
          showSearch
          placeholder="Select a Company"
          optionFilterProp="children"
          style={{ width: "100%" }}
        >
          {companyNames.map((company, index) => {
            if (company.Sector === "Finance") {
              return (
                <Select.Option key={index} onClick={this.handleClick}>
                  {company.Name} {company.Symbol}
                </Select.Option>
              );
            }
            return null;
          })}
        </Select>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  selectOptions: state.company.companies
});

export default connect(mapStateToProps)(Finance);
