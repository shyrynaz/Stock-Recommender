import React, { Component } from "react";
import PropTypes from "prop-types";
//import Select from "react-select";
import { Input, Button } from "react-materialize";
import { connect } from "react-redux";
import {
  getCompanies,
  addCompany,
  deleteCompany,
  getStocks
} from "../../../actions/companyActions";
import Col from "react-materialize/lib/Col";

class AddCompany extends Component {
  componentWillMount() {
    this.props.dispatch(getCompanies());
  }
  onChange = e => {
    console.log(e);
  };
  handleOnclick = e => {
    console.log("yes its working");
  };
  render() {
    const data = this.props.selectOptions;
    const selectOptions = data.map(company => {
      return {
        value: company.name,
        value2: company.tiker,
        display: company.name,
        display2: company.ticker
      };
    });
    return (
      <div className="row">
        <div className="col s10">
          <Input
            className="browser-default"
            type="select"
            onChange={this.onChange}
          >
            {selectOptions.map((company, index) => (
              <option key={index} value={company.value}>
                {company.display} {company.display2}
              </option>
            ))}
          </Input>
          <Button
            floating
            medium="true"
            className="blue"
            icon="add"
            waves="light"
            onClick={this.handleOnclick}
            style={{ marginTop: " 15px" }}
          />
        </div>
      </div>
    );
  }
}

/*AddCompany.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  companies: PropTypes.object.isRequired
};*/
const mapStateToProps = state => ({
  selectOptions: state.company.companies
});

export default connect(mapStateToProps)(AddCompany);
