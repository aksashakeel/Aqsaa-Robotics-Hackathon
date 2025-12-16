/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Course Modules',
      items: [
        'module1',
        'module2',
        'module3',
      ],
      collapsible: false, // Keep modules always visible
    },
  ],
};

module.exports = sidebars;