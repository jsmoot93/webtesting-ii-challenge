import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import App from "./App";

afterEach(cleanup);

describe("App Tests", () => {
  it("Renders without crashing and initializes balls and strikes to 0", () => {
    render(<App />);
    const { getByText } = render(<App />);
    const strikes = getByText(/strikes/i);
    const balls = getByText(/balls/i);

    expect(strikes).toHaveTextContent("0");
    expect(balls).toHaveTextContent("0");
  });

  it("Allows strikes to increment until 2 and then will reset at 3", () => {
    const { getByText, getByTestId } = render(<App />);
    const strikes = getByText(/strikes/i);
    const strikeButton = getByTestId("strike-button");
    const balls = getByText(/balls/i);

    //Should increment one srike
    fireEvent.click(strikeButton);
    expect(strikes).toHaveTextContent("1");
    expect(balls).toHaveTextContent("0");

    //Increases to two
    fireEvent.click(strikeButton);
    expect(strikes).toHaveTextContent("2");
    expect(balls).toHaveTextContent("0");

    //Resets the strikes to 0
    fireEvent.click(strikeButton);
    expect(strikes).toHaveTextContent("0");
    expect(balls).toHaveTextContent("0");
  });

  it("Allows balls to increment until 3 and then will reset at 4", () => {
    const { getByText, getByTestId } = render(<App />);
    const strikes = getByText(/strikes/i);
    const ballButton = getByTestId("ball-button");
    const balls = getByText(/balls/i);

    //Initial expectations of display
    expect(strikes).toHaveTextContent("0");
    expect(balls).toHaveTextContent("0");

    //Should increment one ball
    fireEvent.click(ballButton);
    expect(strikes).toHaveTextContent("0");
    expect(balls).toHaveTextContent("1");

    //Increases to two
    fireEvent.click(ballButton);
    expect(strikes).toHaveTextContent("0");
    expect(balls).toHaveTextContent("2");

    //Increases to 3
    fireEvent.click(ballButton);
    expect(strikes).toHaveTextContent("0");
    expect(balls).toHaveTextContent("3");

    //Resets to 0
    fireEvent.click(ballButton);
    expect(strikes).toHaveTextContent("0");
    expect(balls).toHaveTextContent("0");
  });

  it("Fouls will increment strike up to 2, but not reset or go past 2", () => {
    const { getByText, getByTestId } = render(<App />);
    const strikes = getByText(/strikes/i);
    const foulButton = getByTestId("foul-button");
    const balls = getByText(/balls/i);

    //Should increment one srike
    fireEvent.click(foulButton);
    expect(strikes).toHaveTextContent("1");
    expect(balls).toHaveTextContent("0");

    //Increases to two
    fireEvent.click(foulButton);
    expect(strikes).toHaveTextContent("2");
    expect(balls).toHaveTextContent("0");

    //Strikes should remain two
    fireEvent.click(foulButton);
    expect(strikes).toHaveTextContent("2");
    expect(balls).toHaveTextContent("0");
  });

  it("Will reset balls and strikes to 0 when hit is pressed", () => {
    const { getByText, getByTestId } = render(<App />);
    const strikes = getByText(/strikes/i);
    const strikeButton = getByTestId("strike-button");
    const ballButton = getByTestId("ball-button");
    const hitButton = getByTestId("hit-button");
    const balls = getByText(/balls/i);

    //Should change strikes and balls to 1
    fireEvent.click(strikeButton);
    fireEvent.click(ballButton);
    expect(strikes).toHaveTextContent("1");
    expect(balls).toHaveTextContent("1");

    //Should reset strikes and balls to 0
    fireEvent.click(hitButton);
    expect(strikes).toHaveTextContent("0");
    expect(balls).toHaveTextContent("0");
  });
});
