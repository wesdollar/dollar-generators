const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "DG Express Framework",
  tagline: "Fast, quick service. Go build.",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "@dollarcode", // Usually your GitHub org/user name.
  projectName: "dg-express-framework", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          path: "docs",
          routeBasePath: "/",
          // Please change this to your repo.
          editUrl: "https://github.com/facebook/docusaurus/edit/main/website/",
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
      },
      navbar: {
        title: "ProgAnywhere",
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Installation",
          },
          {
            type: "doc",
            docId: "generators",
            position: "left",
            label: "Generators",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Quick Links",
            items: [
              {
                label: "Installation",
                to: "/",
              },
              {
                label: "Generators",
                to: "/docs/generators",
              },
            ],
          },
          {
            title: "Tooling",
            items: [
              {
                label: "Jest",
                to: "https://jestjs.io/",
              },
              {
                label: "Docusaurus",
                to: "https://docusaurus.io/",
              },
            ],
          },
        ],
        copyright: `Licensed under MIT. Built with Docusaurus. Go forth and build.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};
