import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

// loading state
import Loading from "../../components/@primitives/UI/loading";
import { nav as navActions } from "../../data/store";

import Headerable from "../../deprecated/mixins/mixins.Header";
import Likeable from "../../deprecated/mixins/mixins.Likeable";
import Shareable from "../../deprecated/mixins/mixins.Shareable";

// import content component
import StoriesContent from "./Content";

class StoriesSingleWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    story: PropTypes.object,
  }

  componentWillMount() {
    if (process.env.WEB) return;
    this.props.dispatch(navActions.setLevel("CONTENT"));
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction,
    }));
  }

  render() {
    const { content } = this.props.story;

    if (!content) {
      // loading
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading />
          </div>
        </div>
      );
    }

    const story = content;
    return <StoriesContent story={story} />;
  }
}

const GET_STORY_QUERY = gql`
  query getStory($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        entryId: id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          channelId
        }
        content {
          body
          ooyalaId
          tags
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
        }
      }
    }
  }
`;

const withStory = graphql(GET_STORY_QUERY, {
  name: "story",
  options: (ownProps) => ({
    variables: { id: ownProps.params.id },
  }),
});

export default connect()(
  withStory(
    ReactMixin.decorate(Likeable)(
      ReactMixin.decorate(Shareable)(
        ReactMixin.decorate(Headerable)(
          StoriesSingleWithoutData
        )
      )
    )
  )
);

export {
  StoriesSingleWithoutData,
  GET_STORY_QUERY,
};
