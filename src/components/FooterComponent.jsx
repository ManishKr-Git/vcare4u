import SimpleReactFooter from "simple-react-footer";
import React, { Component } from "react";
class FooterComponent extends Component {
  render() {
    const description =
      "At Vcare4u, we strive to exceed your expectations by breaking barriers and changing the game. If you need help with hiring, payroll, compliance, or benefits administration, contact us. We’re available to help you navigate even the most difficult human resources issues.";
    const title = "Vcare4u";
    const columns = [
      {
        title: "Resources",
        resources: [
          {
            name: "About",
            link: "/about",
          },
          {
            name: "Careers",
            link: "/careers",
          },
          {
            name: "Contact",
            link: "/contact",
          },
          {
            name: "Admin",
            link: "/admin",
          },
        ],
      },
      {
        title: "Legal",
        resources: [
          {
            name: "Privacy",
            link: "/privacy",
          },
          {
            name: "Terms",
            link: "/terms",
          },
        ],
      },
      {
        title: "Visit",
        resources: [
          {
            name: "Locations",
            link: "/locations",
          },
          {
            name: "Culture",
            link: "/culture",
          },
        ],
      },
    ];
    return (
      <SimpleReactFooter
        description={description}
        title={title}
        columns={columns}
        linkedin="fluffy_cat_on_linkedin"
        facebook="fluffy_cat_on_fb"
        twitter="fluffy_cat_on_twitter"
        instagram="fluffy_cat_live"
        youtube="UCFt6TSF464J8K82xeA?"
        pinterest="fluffy_cats_collections"
        copyright="black"
        iconColor="black"
        backgroundColor="#99A3A4"
        fontColor="black"
        copyrightColor="darkgrey"
      />
    );
  }
}
export default FooterComponent;
