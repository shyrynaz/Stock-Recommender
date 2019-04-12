import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Select, List, Avatar, Button } from "antd";
import "antd/dist/antd.css";
import { getCompanies, getCompanyInfo } from "../../actions/companyActions";

// const { Meta } = Card;
class Finance extends Component {
  constructor() {
    super();
    this.state = {
      symbol: ""
    };
  }
  componentWillMount() {
    this.props.dispatch(getCompanies());
  }
  handleChange = e => {
    this.setState({ symbol: e });
  };
  handleSubmit = e => {
    e.preventDefault();
    const companyData = { symbol: this.state.symbol };
    // console.log(companyData);
    this.props.dispatch(getCompanyInfo(companyData));
  };
  render() {
    // console.log(this.state.selectedCompany);
    const companyNames = this.props.selectOptions;
    const newsArticles = this.props.companyInfo;
    // console.log(newsArticles);
    const newsData = newsArticles.map(company =>
      company.map(item => {
        const data = item;
        console.log(data);
        return (
          <div className="card text-white bg-primary mb-3">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={value => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{value.headline}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </div>
        );
      })
    );
    return (
      <div>
        <Select
          showSearch
          placeholder="Select a Company"
          optionFilterProp="children"
          style={{ width: "25%" }}
          onChange={this.handleChange}
        >
          {companyNames.map((company, index) => {
            if (company.Sector === "Finance") {
              return (
                <Select.Option key={index} value={company.Symbol}>
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
          onClick={this.handleSubmit}
        >
          GetInfo
        </Button>
        <div>{newsData}</div>
      </div>
    );
  }
  // renderNewsArticles() {

  //   // console.log(newsData);
  //   return (

  //   );
  // }
}
const mapStateToProps = state => ({
  selectOptions: state.company.companies,
  companyInfo: state.company.companyInfo
});

export default connect(mapStateToProps)(Finance);
