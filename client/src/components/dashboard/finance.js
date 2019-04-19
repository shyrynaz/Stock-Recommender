import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Select, List, Avatar, Button, Row, Col } from "antd";
import "antd/dist/antd.css";
import {
  getCompanies,
  getCompanyInfo,
  getChartData
} from "../../actions/companyActions";
import ChartDisplay from "../layouts/chart";

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
    this.props.dispatch(getChartData(companyData));
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
        <Row>
          <Col span={12}>{this.renderNewsArticles()}</Col>
          <Col span={12}>{this.renderChart()}</Col>
        </Row>
      </div>
    );
  }
  renderNewsArticles() {
    const newsArticles = this.props.companyInfo;
    return (
      <List
        itemLayout="horizontal"
        dataSource={newsArticles}
        renderItem={item => (
          <List.Item extra={<img width={272} alt="logo" src={item.image} />}>
            <List.Item.Meta
              title={
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.headline}
                </a>
              }
              description={
                <span>
                  <p>
                    <b>Source: </b>
                    {item.source}
                  </p>
                  <p>
                    <b>Date: </b>
                    {item.datetime}
                  </p>
                </span>
              }
            />
            {item.summary}
          </List.Item>
        )}
      />
    );
  }
  renderChart() {
    const chartData = this.props.chartData;
    if (!chartData.length) {
      return <div>no Data to display</div>;
    } else {
      return <ChartDisplay chartData={chartData} />;
    }
  }
}
const mapStateToProps = state => ({
  selectOptions: state.company.companies,
  companyInfo: state.company.companyInfo,
  chartData: state.company.chartData
});

export default connect(mapStateToProps)(Finance);
