import { Component, PropTypes} from "react"
import { Link } from "react-router"
import ReactDom from "react-dom"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"
import Moment from "moment"

// loading state
import { Spinner } from "../../../../core/client/components/loading"
import { Authorized } from "../../../../core/client/blocks"
import { nav as navActions } from "../../../../core/client/actions"
import { Split, Left, Right } from "../../../../core/client/layouts/split"

import { ScheduledTransactions, Accounts as Acc } from "../../../lib/collections"
import { AddSchedule } from "../../blocks"

import Details from "./schedule.Details"

@connect()
@ReactMixin.decorate(ReactMeteorData)
export default class Template extends Component {

  state = {
    page: 1,
    pageSize: 20,
    shouldUpdate: true,
    done: false
  }

  // componentWillMount() {
  //   this.props.dispatch(navActions.setLevel("CONTENT"))
  //
  // }
  //
  // componentWillUnmount() {
  //   this.props.dispatch(navActions.setLevel("TOP"))
  // }
  componentDidMount() {
    const container = ReactDom.findDOMNode(this.refs["container"])
    container.addEventListener("scroll", this.pageOnScroll);
    window.addEventListener("scroll", this.pageOnScroll);
  }

  componentWillUnmount() {
    const container = ReactDom.findDOMNode(this.refs["container"])
    container.removeEventListener("scroll", this.pageOnScroll);
    window.removeEventListener("scroll", this.pageOnScroll);
  }

  pageOnScroll = (e) => {
  if (this.state.done) return

  const { scrollHeight, clientHeight, scrollTop, offsetTop } = e.target

  let percentage;

  if (scrollTop && scrollHeight) {
    percentage = scrollTop / scrollHeight
  } else if (window.scrollY && document.body.clientHeight) {
    percentage = window.scrollY, document.body.clientHeight
  }

  if ( percentage > 0.5 && this.state.shouldUpdate) {
    this.setState({
      page: this.state.page + 1,
      shouldUpdate: false
    });

    // wait a bit to prevent paging multiple times
    setTimeout(() => {
      if (this.state.page * this.state.pageSize > this.data.schedules.length) {
        this.setState({ done: true, shouldUpdate: false });
      } else {
        this.setState({ shouldUpdate: true });
      }
    }, 1000);
  }
}

  getMeteorData() {
    let subscription = Meteor.subscribe("scheduledTransactions")
    const schedules = ScheduledTransactions.find({}, {
      limit: this.state.page * this.state.pageSize,
      sort: { CreatedDateTime: -1 }
    }).fetch();

    let accounts

    if (Meteor.isClient) {
      Meteor.subscribe("accounts")
      accounts = Acc.find().fetch()
    }

    if (Meteor.isServer) {
      accounts = api.get.sync(endpoints.accounts)
    }

    let ready = subscription.ready()

    return {
      schedules,
      accounts,
      ready
    };

  }

  formatDate = (date) => {
    return Moment(date).format("MMM D, YYYY")
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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render () {

    return (

      <Split nav={true} >
        <Right
          background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/giveyourbrainabreak2_1000_1000_90.jpg"
          mobile={false}>
        </Right>

        <Left scroll={true} ref="container">
          <div className="constrain-copy soft-double-sides@lap-and-up soft-double-top@lap-and-up">
            <div className="soft soft-double-top hard-left@lap-and-up soft-half-bottom">
              <h2 className="flush hard">Recurring Gifts</h2>
            </div>
          </div>


          <div className="constrain-copy soft soft-double-sides@lap-and-up hard-top">


              <div className="outlined--light outlined--bottom soft-ends soft-double-bottom">
                <AddSchedule accounts={this.data.accounts}/>
              </div>

          </div>


          <div className="constrain-copy soft soft-double-sides@lap-and-up hard-top" ref="history">
            <h4 className="soft-double-top text-center">My Active Gifts</h4>
            {() => {
              const { schedules, ready } = this.data

              if (!schedules.length && !ready) {
                // loading
                return (
                  <div className="text-center soft">
                    <Spinner styles={{width: "40px", height: "40px"}}/>
                  </div>
                )
              }

              if (!schedules.length && ready) {
                return (
                  <div className="text-center soft">
                    <p><em>You don't have any active recurring gifts</em></p>
                  </div>
                )

              }



              return (
                <div>
                  {this.data.schedules.map((schedule, i) => {

                    if (!schedule.ScheduledTransactionDetails[0].Account) {
                      return null
                    }
                    return (
                      <div key={i} className="soft-ends push-half-ends hard-sides outlined--light outlined--bottom constrain-mobile">


                        <h3 className="text-dark-tertiary" style={{lineHeight: "1.75"}}>
                          <span className="text-dark-secondary">{this.capitalizeFirstLetter(schedule.TransactionFrequencyValue.Description.toLowerCase())}</span>, I give <span className="text-dark-secondary">{this.monentize(schedule.ScheduledTransactionDetails[0].Amount)}</span> to <span className="text-primary">{schedule.ScheduledTransactionDetails[0].Account.PublicName}</span>. This began on <span className="text-dark-secondary">{this.formatDate(schedule.StartDate)}</span> using my <span className="text-dark-secondary">{schedule.FinancialPaymentDetail.CreditCardTypeValue.Description.toLowerCase()}</span> ending in <span className="text-dark-secondary">{schedule.FinancialPaymentDetail.AccountNumberMasked.slice(-4)}</span>
                        </h3>

                        <Link to={`/give/recurring/${schedule.Id}`} className="btn">
                          View Details
                        </Link>

                      </div>

                    )
                  })}

                </div>
              )
            }()}
          </div>


        </Left>
      </Split>
    );
  }
}


const Routes = [
  { path: "recurring", component: Template },
  {
    path: "recurring/:id",
    component: Authorized,
    indexRoute: { component: Details }
  }
]

export default {
  Template,
  Routes
}
