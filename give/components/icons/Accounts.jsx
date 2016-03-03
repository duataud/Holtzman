
const AmEx = ({ width, height, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: "3px",
      backgroundImage: "url('data:image/png;base64,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')"

    }}
    className="background--fill display-inline-block"
  >

  </div>
)

const Visa = ({ width, height, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: "3px",
      backgroundImage: "url('data:image/png;base64,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')"
    }}
    className="background--fill display-inline-block"
  >

  </div>
)

const Discover = ({ width, height, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: "3px",
      backgroundImage: "url('data:image/png;base64,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')"
    }}
    className="background--fill display-inline-block"
  >

  </div>
)

const MasterCard = ({ width, height, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: "3px",
      backgroundImage: "url('data:image/png;base64,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')"
    }}
    className="background--fill display-inline-block"
  >

  </div>
)

const Bank = ({ width, height, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: "3px",
      backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA8CAYAAADxJz2MAAAABGdBTUEAALGPC/xhBQAAAc9JREFUeAHt3DFOwzAUxnGcROoMEx04Q4/AoSraoXMWqp4DjgFH4AwgdWvnDlV4FoyOn+xPlVrlnwEJ+32h/eWlcqjkcGfHbrd7Op1Or8MwPNuv8zjGMSqwDyF8tG27Wq/XP+Ef78vw7kcjTKQEDl3XLRrrvC14KR937OF8Pm8bK4u3LUeFQPzIa+zHY0WWyJ/APHYghyDQjWU3m00Ym5vieN/3Q+p904EplYIxAAuwUqUAplQKxgAswEqVAphSKRgDsAArVQpgSqVgDMACrFQpgCmVgrHRJxHvHGMrcy93rfO1T150oHhFAQRQFBDjdCCAooAYpwMBFAXEePU6sHbdJL7eq4tzC4uXBEAARQExTgcCKAqIcToQQFFAjNOBAIoCYrz6SeTS/5G+lScdbmGxAwEEUBQQ43QggKKAGKcDARQFxHj1OvBW1mmijxvnFnaJ8gUA5n3cWQBdonwBgHkfdxZAlyhfAGDex50F0CXKFwCY93FnAXSJ8gUA5n3cWQBdonxBuPR3G/k/f/uzdKB4DSPgXjzHlOP7xjaR+ZyygPLeo11jO/C82EkOyommmDW842w2WzVx+6K4A48NvBkEt7PfDXHrp3fDWyyXy+9ftplH0FR79EYAAAAASUVORK5CYII=')"
    }}
    className="background--fill display-inline-block"
  >

  </div>
)


export default {
  AmEx,
  Visa,
  Discover,
  MasterCard,
  Bank,
}
