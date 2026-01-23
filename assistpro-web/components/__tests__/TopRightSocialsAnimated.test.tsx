import { render, screen } from "@testing-library/react";
import TopRightSocialsAnimated from "../TopRightSocialsAnimated";

describe("TopRightSocialsAnimated", () => {
  it("renders social media links", () => {
    render(<TopRightSocialsAnimated ready={true} />);

    const instagramLink = screen.getByLabelText("Instagram");
    const tiktokLink = screen.getByLabelText("TikTok");
    const facebookLink = screen.getByLabelText("Facebook");
    const linkedinLink = screen.getByLabelText("LinkedIn");

    expect(instagramLink).toBeInTheDocument();
    expect(tiktokLink).toBeInTheDocument();
    expect(facebookLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
  });

  it("has correct href attributes", () => {
    render(<TopRightSocialsAnimated ready={true} />);

    const instagramLink = screen.getByLabelText("Instagram");
    expect(instagramLink).toHaveAttribute("href", "https://instagram.com/assistpro");
    expect(instagramLink).toHaveAttribute("target", "_blank");
    expect(instagramLink).toHaveAttribute("rel", "noreferrer");
  });

  it("renders when ready prop is false", () => {
    render(<TopRightSocialsAnimated ready={false} />);

    const instagramLink = screen.getByLabelText("Instagram");
    expect(instagramLink).toBeInTheDocument();
  });
});
