// @flow
import Split, { Left, Right } from "../../../../components/@primitives/layout/split";
import Meta from "../../../../components/shared/meta";

const Layout = () => (
  <div>
    <Split nav classes={["background--light-primary"]}>
      <Meta title="Edit Schedule" />
      <Right
        background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg"
        mobile={false}
      />
    </Split>
    <Left scroll ref="container" classes={["background--light-secondary"]}>
      Edit A Schedule
    </Left>
  </div>
);

export default Layout;
