import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import ReactMixin from "react-mixin";
import { Meteor } from "meteor/meteor";

import OnBoard from "../../../components/people/accounts";
import Split, { Left, Right } from "../../../components/@primitives/layout/split";

import GoogleMap from "../../../components/@primitives/map";
import Loading from "../../../components/@primitives/UI/loading";

import Headerable from "../../../deprecated/mixins/mixins.Header";

import { nav as navActions, modal } from "../../../data/store";

import Layout from "./Layout";
import Join from "./Join";

const defaultArray = [];
class TemplateWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (this.headerAction) {
      this.headerAction({ title: "Group Profile" });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(modal.update({ onFinished: null }));
  }

  closeModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    this.props.dispatch(modal.hide());
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
  }

  sendRequest = (e, callback) => {
    if (e && e.preventDefault) e.preventDefault();

    const { currentTarget } = e;
    const message = currentTarget.querySelectorAll("textarea")[0].value
      .replace(new RegExp("\\n", "gmi"), "<br/>");

    Meteor.call("community/actions/join",
      this.props.data.group.entityId, message, callback
    );
  }

  join = () => {
    const joinModal = () => {
      this.props.dispatch(modal.render(Join, {
        group: this.props.data.group,
        onExit: this.closeModal,
        onClick: this.sendRequest,
      }));
    };

    if (Meteor.userId()) return joinModal();

    this.props.dispatch(modal.render(OnBoard, {
      onFinished: joinModal,
      coverHeader: true,
    }));

    return null;
  }

  render() {
    const { data } = this.props;

    if (data.loading) {
      return (
        <div>
          <Split>
            {/* Map */}
            <Right mobile={false} classes={["background--left"]} />
          </Split>
          <Left scroll classes={["background--light-secondary"]}>
            <div className="soft-double text-center">
              <Loading />
            </div>
          </Left>
        </div>
      );
    }


    const { group, person } = data;
    const leaders = group && group.members && group.members
      .filter((x) => x.role.toLowerCase() === "leader");

    const isLeader = person && leaders.filter((x) => x.id === person.id).length;
    if (!group.photo) {
      group.photo = "//s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png";
    }

    let markers = defaultArray;
    if (group.locations && group.locations.length && group.locations[0].location) {
      const { latitude, longitude } = group.locations[0].location;
      markers = [{ latitude, longitude }];
    }
    let isMobile;
    if (typeof window !== "undefined" && window !== null) {
      isMobile = window.matchMedia("(max-width: 768px)").matches;
    }
    return (
      <div>
        <Split>
          {/* Map */}
          <Right mobile={false} classes={["background--left"]}>
            {(() => {
              if (isMobile || Meteor.isServer) return null;
              return (
                <GoogleMap
                  autoCenter
                  markers={markers}
                />
              );
            })()}
          </Right>
        </Split>
        <Left scroll classes={["background--light-secondary"]}>
          <Layout
            isLeader={isLeader}
            group={group}
            leaders={leaders || defaultArray}
            join={this.join}
          />
        </Left>
      </div>
    );
  }
}

const GROUP_QUERY = gql`
  query GetGroup($id: ID!) {
    person: currentPerson {
      id
      firstName
      nickName
    }
    group: node(id: $id) {
      id
      ... on Group {
        name
        entityId
        type
        demographic
        description
        photo
        kidFriendly
        ageRange
        campus { name }
        tags { id, value }
        locations { location { city, state, latitude, longitude } }
        schedule { description }
        members {
          role
          person { photo, firstName, nickName, lastName }
        }
      }
    }
  }
`;

const withGroup = graphql(GROUP_QUERY, {
  options: (ownProps) => ({
    variables: { id: ownProps.params.id },
  }),
});

export default connect()(
  withGroup(
    ReactMixin.decorate(Headerable)(
      TemplateWithoutData
    )
  )
);

export {
  TemplateWithoutData,
};
