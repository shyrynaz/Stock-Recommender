import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select, Button, List, Card, Statistic, Tooltip, Empty } from "antd";
import {
  getCompanies,
  getChartData,
  getCompanyInfo,
  getSentimentData
} from "../../actions/companyActions";
import ChartDisplay from "../layouts/chart";

class HealthCare extends Component {
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
    this.props.dispatch(getSentimentData(companyData));
  };
  render() {
    const companyNames = this.props.selectOptions;
    return (
      <div>
        Health Sector
        <div>
          <Select
            showSearch
            placeholder="Select a Company"
            optionFilterProp="children"
            style={{ width: "25%" }}
            onChange={this.handleChange}
          >
            {companyNames &&
              companyNames.map((company, index) => {
                if (company.Sector === "Health Care") {
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
        </div>
        <div>
          <div>{this.renderSentiment()}</div>
          <div>{this.renderChart()}</div>
        </div>
        <div>{this.renderNewsArticles()}</div>
      </div>
    );
  }
  renderNewsArticles() {
    const newsArticles = this.props.companyInfo;
    return (
      <List
        header={<h5>News Articles</h5>}
        grid={{ gutter: 18, column: 3 }}
        dataSource={newsArticles}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.headline}
              extra={
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  More
                </a>
              }
            >
              {item.summary}
            </Card>
          </List.Item>
        )}
      />
    );
  }
  renderChart() {
    const chartData = this.props.chartData;
    if (!chartData.length) {
      return <Empty />;
    } else {
      return <ChartDisplay chartData={chartData} />;
    }
  }
  renderSentiment() {
    const gridStyle = {
      width: "50%",
      textAlign: "center"
    };

    const sentimentData = Object.values(this.props.sentimentData);
    // console.log(sentimentData);
    return (
      <Card style={{ marginBottom: 10 }} title={sentimentData[1]}>
        <Tooltip title="Strength is the likelihood that a brand is being discussed in the media">
          <Card.Grid style={gridStyle}>
            <Statistic
              title="Strength"
              value={sentimentData[7]}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card.Grid>
        </Tooltip>
        <Tooltip title="Sentiment is the ratio of mentions that are generally positive to those that are generally negative">
          <Card.Grid style={gridStyle}>
            <Statistic
              title="Sentiment"
              value={sentimentData[6]}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card.Grid>
        </Tooltip>
        <Tooltip title="Reach is a measure of the range of influence">
          <Card.Grid style={gridStyle}>
            <Statistic
              title="Reach"
              value={sentimentData[9]}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card.Grid>
        </Tooltip>
        <Tooltip title="passion is a measure of likelihood that individuals talking about a brand will do so repeatedly">
          <Card.Grid style={gridStyle}>
            <Statistic
              title="Passion"
              value={sentimentData[8]}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card.Grid>
        </Tooltip>
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  selectOptions: state.company.companies,
  chartData: state.company.chartData,
  companyInfo: state.company.companyInfo,
  sentimentData: state.company.sentimentData
});

export default connect(mapStateToProps)(HealthCare);
