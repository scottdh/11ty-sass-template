const sortByDisplayOrder = require("./src/utils/sort-by-display-order.js");

module.exports = function (eleventyConfig) {
  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy("./src/fonts/");
  eleventyConfig.addPassthroughCopy("./src/images/");

  // Returns work items, sorted by display order
  eleventyConfig.addCollection("focusAreas", (collection) => {
    return sortByDisplayOrder(
      collection.getFilteredByGlob("./src/coaching/*.md")
    );
  });

  eleventyConfig.addWatchTarget("./src/sass/");

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
    },
  };
};
