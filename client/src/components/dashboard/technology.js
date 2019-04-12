import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select } from "antd";
import { getCompanies } from "../../actions/companyActions";
import { Button } from "antd";

class Technology extends Component {
  componentWillMount() {
    this.props.dispatch(getCompanies());
  }
  handleClick = () => {
    console.log("button clicked");
  };
  render() {
    const companyNames = this.props.selectOptions;
    return (
      <div>
        <Select
          showSearch
          placeholder="Select a Company"
          optionFilterProp="children"
          style={{ width: "25%" }}
        >
          {companyNames.map((company, index) => {
            if (company.Sector === "Technology") {
              return (
                <Select.Option key={index}>
                  {company.Name} {company.Symbol}
                </Select.Option>
              );
            }
            return null;
          })}
        </Select>
        <Button
          style={{ marginLeft: 10 }}
          type="primary"
          onClick={this.handleClick}
        >
          GetInfo
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  selectOptions: state.company.companies
});

export default connect(mapStateToProps)(Technology);
