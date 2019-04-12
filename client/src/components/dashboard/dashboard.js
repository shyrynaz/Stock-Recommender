import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Statistic, Icon } from "antd";
import "antd/dist/antd.css";
import { getStocks } from "../../actions/companyActions";

const gridStyle = {
  width: "50%",
  textAlign: "center"
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(getStocks());
  }
  render() {
    const data = this.props.stockData;
    return (
      <div>
        <Row gutter={16}>
          {data.map((company, index) => {
            return (
              <div key={index}>
                <Col span={8}>
                  <Card
                    style={{ marginBottom: 10 }}
                    title={company.companyName}
                    extra={company.changePercent + "%"}
                  >
                    <Card.Grid style={gridStyle}>
                      <Statistic
                        title="high"
                        value={company.high}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<Icon type="arrow-up" />}
                      />
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <Statistic
                        title="low"
                        value={company.low}
                        valueStyle={{ color: "#cf1322" }}
                        prefix={<Icon type="arrow-down" />}
                      />
                    </Card.Grid>
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
  stockData: state.company.stocks
});

export default connect(mapStateToProps)(Dashboard);
