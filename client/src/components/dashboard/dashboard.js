import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Statistic, Icon } from "antd";
import "antd/dist/antd.css";
//import { getStocks } from "../../actions/companyActions";
import { getCompanies } from "../../actions/companyActions";

class Dashboard extends Component {
  componentWillMount() {
    this.props.dispatch(getCompanies());
  }
  render() {
    const data = this.props.stockData;
    return (
      <div className="App">
        <Row gutter={16}>
          {data.map((company, index) => {
            return (
              <div>
                <Col span={6} key={index}>
                  <Card title={company.Name}>
                    <Statistic
                      title="high"
                      value={company.LastSale}
                      precision={2}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<Icon type="arrow-up" />}
                      suffix="%"
                    />

                    <Statistic
                      title="low"
                      value={company.LastSale}
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<Icon type="arrow-down" />}
                      suffix="%"
                    />
                  </Card>
                </Col>
              </div>
            );
          })}
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  stockData: state.company.companies
});
export default connect(mapStateToProps)(Dashboard);
