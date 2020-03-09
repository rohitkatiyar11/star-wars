import React from "react";
import { shallow } from "enzyme";
import { Login } from "../pages/Login";

describe("<Login />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Login />);
  });

  it("renders the username input box", () => {
    const username = wrapper.find("#username");
    expect(username).toHaveLength(1);
  });

  it("renders the password input box", () => {
    const password = wrapper.find("#password");
    expect(password).toHaveLength(1);
  });
});
