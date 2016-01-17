
import { Component, PropTypes} from "react"
import { Link } from "react-router"
import ReactDom from "react-dom"
import Moment from "moment"

import { Spinner } from "../../../core/components/loading"
import Split, { Left, Right } from "../../../core/blocks/split"

import { Offline } from "../../components/status"

export default class Layout extends Component {

  componentDidMount() {
    const container = ReactDom.findDOMNode(this.refs["container"])
    container.addEventListener("scroll", this.props.onScroll);
     if (typeof window != "undefined" && window != null) {
       window.addEventListener("scroll", this.props.onScroll);
     }

  }

  componentWillUnmount() {
    const container = ReactDom.findDOMNode(this.refs["container"])
    container.removeEventListener("scroll", this.props.onScroll);

    if (typeof window != "undefined" && window != null) {
      window.removeEventListener("scroll", this.props.onScroll);
    }
  }

  monentize = (value, fixed) => {

    if (typeof value === "number") {
      value = `${value}`
    }

    if (!value.length) {
      return `$0.00`
    }

    value = value.replace(/[^\d.-]/g, "")

    let decimals = value.split(".")[1]
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2)
      value = String(value)
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `$${value}`
  }

  formatDate = (date) => {
    return Moment(date).format("MMM D, YYYY")
  }


  render () {

    const { transactions, ready, alive } = this.props.data


    return (
      <Split nav={true} >
        <Right background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/NScollege-cip-0033_1700_1133_90_c1.jpg"
    mobile={false}>
        </Right>

        <Left scroll={true} ref="container">
          <div className="constrain-copy soft-double-sides@lap-and-up soft-double-top@lap-and-up">
            <div className="soft soft-double-top hard-left@lap-and-up soft-half-bottom">
              <h2 className="flush hard">Giving History</h2>
            </div>
          </div>


          <div className="constrain-copy soft soft-double-sides@lap-and-up hard-top" ref="history">
            {() => {

              if (!alive) {
                return <Offline />
              }

              if (!transactions || !transactions.length && !ready) {
                // loading
                return (
                  <div className="text-center soft">
                    <Spinner styles={{width: "40px", height: "40px"}}/>
                  </div>

                )
              } else if (!transactions || !transactions.length && ready) {
                return (
                  <div className="text-left soft-ends">
                    <p>
                      We didn't find any gifts associated with your account. If you would like to start giving, click <Link to="/give">here</Link>
                    </p>
                    <p><em>If you have any questions, please call our Finance Team at 864-965-9000 or email us at <a href="mailto:finance@newspring.cc">finance@newspring.cc</a> and someone will be happy to assist you.</em></p>
                  </div>
                )
              }



              return transactions.map((transaction, i) => {
                if (!transaction.TransactionDetails.length) {
                  return null
                }

                return transaction.TransactionDetails.map((transactionDetail, i) => {
                  if (!transactionDetail.Account) {
                    return null
                  }

                  return (
                    <div key={i} className="soft-ends push-half-ends hard-sides outlined--light outlined--bottom constrain-mobile">

                      <Link to={`/give/history/${transaction.Id}/${transactionDetail.Account.Id}`}>

                        <div className="grid" style={{verticalAlign: "middle"}} key={i}>

                          <div className="grid__item one-half" style={{verticalAlign: "middle"}}>
                            <h5 className="text-dark-tertiary flush">
                              {transactionDetail.Account.PublicName}
                            </h5>
                            <p className="flush soft-half-top italic small text-dark-tertiary">
                              {this.formatDate(transaction.CreatedDateTime)}
                            </p>
                          </div>

                          <div className="grid__item one-half text-right" style={{verticalAlign: "middle"}}>
                            <div className="soft-half-right">
                              <h4 className="text-dark-tertiary flush soft-right@handheld soft-double-right@lap-and-up">
                                {this.monentize(transactionDetail.Amount)}
                                <span className="text-primary icon-arrow-next locked" style={{
                                    right: "-5px",
                                    top: "1px"
                                  }}></span>
                              </h4>
                            </div>

                          </div>

                        </div>
                      </Link>

                    </div>
                  )

                })
              })

            }()}
          </div>


        </Left>
      </Split>
    )
  }
}