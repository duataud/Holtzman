
import {
  SolidLeaf,
  StripedLeaf,
} from "../components/leaves";

import {
  Stats,
  Leaves,
  Image,
  Body,
} from "../components/layout";

import FitText from "../components/fit-text";
import List from "../components/list";

const socialMedia = [
  { count: "95,238", label: "Average number of people reached daily on Facebook" },
  // { count: "1,393,779", label: "People reached on social media each month" },
];

/* eslint-disable max-len */
const SocialMedia = () => (
  <div className="display-inline-block text-center one-whole ">
    <div className="background--primary soft-double-top@lap-and-up" style={{ overflow: "visible" }}>
      <Stats>
        <FitText compressor={1.7}>
          <h3
            className="flush-bottom soft-half-bottom soft-double-top text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            Because you shared on social media,
          </h3>
        </FitText>

        <FitText compressor={0.3}>
          <h1
            className="uppercase flush-bottom text-light-primary"
            style={{
              fontWeight: "900",
            }}
          >
              Mary
          </h1>
        </FitText>

        <FitText compressor={0.60}>
          <h1
            className="uppercase text-light-primary"
            style={{
              fontWeight: "900",
            }}
          >
            Ashleigh&#39;s
          </h1>
        </FitText>

        <FitText compressor={1.7}>
          <h3
            className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            life was changed
          </h3>
        </FitText>
      </Stats>

      <div className="soft-double-ends" />
      <Leaves>
        <SolidLeaf
          className="locked-bottom locked-right"
          size="200px"
          color="text-secondary"
          style={{
            transform: "rotate(-225deg)",
            marginBottom: "-50px",
            marginRight: "-150px",
          }}
        />
        <SolidLeaf
          className="locked-bottom locked-right"
          size="130px"
          color="text-tertiary"
          style={{
            transform: "rotate(-270deg)",
            marginBottom: "-100px",
            marginRight: "-10px",
          }}
        />
        <StripedLeaf
          className="locked-bottom locked-right"
          size="90px"
          color="text-tertiary"
          style={{
            transform: "rotate(180deg)",
            marginBottom: "60px",
            marginRight: "-20px",
          }}
        />

        <SolidLeaf
          className="locked-bottom locked-left"
          size="250px"
          color="text-secondary"
          style={{
            transform: "rotate(-135deg)",
            marginBottom: "-90px",
            marginLeft: "-150px",
          }}
        />

        <StripedLeaf
          className="locked-bottom locked-left"
          size="120px"
          color="text-tertiary"
          style={{
            transform: "rotate(-90deg)",
            marginBottom: "-20px",
            marginLeft: "0px",
          }}
        />

      </Leaves>


    </div>

    <div className="soft-double-ends push-double-ends soft-sides text-center">
      <div className="grid" style={{ verticalAlign: "middle" }}>
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/MaryAshleighBrowning.jpg" />

        <Body>
          <blockquote>
            <p>
              It just clicked in me, &quot;Jesus is real.&quot;
            </p>
          </blockquote>

          <p>
            &quot;Everyone was posting on social media about NewSpring all the time. As a single mom of twins, my life at that point was overwhelming, so I decided to go to NewSpring Spartanburg. During a dating and relationships series in 2015, it just clicked in me, &#39;Jesus is real.&#39; God saved me, and I feel like I’m a lot more positive and hopeful about my future now because I’m building a relationship with Jesus every day.&quot;
          </p>
          <h6
            className="italic text-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            Mary Ashleigh Browning, Spartanburg Campus
          </h6>
        </Body>
      </div>

    </div>

    <div
      className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up"
    >

      <h3
        className="text-center soft-half-top flush-bottom"
      >Social Media</h3>

      <List items={socialMedia} />
    </div>
  </div>
);
/* eslint-enable max-len */

export default SocialMedia;
