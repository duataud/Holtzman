import renderer from "react-test-renderer";
import { reset } from "aphrodite/lib/inject";
import Currency,
  { getCurrencySymbol,
    getNegative,
    getDollars,
    getCents,
    currencySizeCalc,
    BaseCurrencySize,
    ReducedHeadingSize,
    roundCurrency,
    textTheme,
  } from "../";

describe("Currency", () => {
  beforeEach(() => {
    reset();
  });

  afterEach(() => {
    reset();
  });

  it("returns a '$' currency symbol", () => {
    expect(getCurrencySymbol("$420.00")).toBeDefined();
  });

  it("returns a '$' currency symbol when none is provided", () => {
    expect(getCurrencySymbol("420.00")).toBe("$");
  });

  it("returns a negative when one is provided", () => {
    expect(getNegative("$-420.00")).toBeDefined();
  });

  it("doesn't return a negative when one isn't provided", () => {
    expect(getNegative("$420.00")).toBeNull();
  });

  it("returns '420' dollars", () => {
    expect(getDollars("$420.00")).toBe("420");
  });

  it("returns '00' dollars when none is provided", () => {
    expect(getDollars("")).toBe("00");
  });

  it("rounds currency to '$421' when amount is '$420.89' and roundCurrency is true", () => {
    expect(getDollars("$420.89", true)).toBe("421");
  });

  it("currency is not rounded when amount is '$420.89' and roundCurrency is flase", () => {
    expect(getDollars("$420.89", false)).toBe("420");
  });

  it("currency is not rounded when amount is '$420.89' and roundCurrency is not set", () => {
    expect(getDollars("$420.89")).toBe("420");
  });

  it("returns '12' cents", () => {
    expect(getCents("$420.12")).toBe("12");
  });

  it("returns '00' cents when none is provided", () => {
    expect(getCents("420")).toBe("00");
  });

  it("returns 'text-light-primary' when theme is set to 'light'.", () => {
    expect(textTheme("light")).toBe("text-light-primary");
  });

  it("returns 'text-dark-primary' when no theme is set.", () => {
    expect(textTheme()).toBe("text-dark-primary");
  });

  it("properly returns a positive number", () => {
    const tree = renderer.create(
      <Currency
        amount="$420.00"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("correctly returns a negative value.", () => {
    const tree = renderer.create(
      <Currency
        amount="$-420.00"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("correctly returns when no currency symbol is provided.", () => {
    const tree = renderer.create(
      <Currency
        amount="420.00"
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("correctly returns when no cents are provided.", () => {
    const tree = renderer.create(
      <Currency
        amount="$420"
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("correctly returns when no amount is provided.", () => {
    const tree = renderer.create(
      <Currency
        amount=""
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("correctly returns when no heading is provided.", () => {
    const tree = renderer.create(
      <Currency
        amount=""
        baseHeadingSize=""
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("correctly returns when a heading size is provided.", () => {
    const tree = renderer.create(
      <Currency
        amount="$420.00"
        baseHeadingSize="2"
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("should have a base currency size of 'h2'", () => {
    currencySizeCalc("2");
    expect(BaseCurrencySize).toBe("h2");
  });

  it("should have a reduced heading size of 'h4'", () => {
    currencySizeCalc("2");
    expect(ReducedHeadingSize).toBe("h4");
  });
});
