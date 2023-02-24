const sortByDisplayOrder = require("./src/utils/sort-by-display-order.js");

// Filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");

module.exports = function (eleventyConfig) {
  // Add filters
  eleventyConfig.addFilter("dateFilter", dateFilter);
  eleventyConfig.addFilter("w3DateFilter", w3DateFilter);

  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy("./src/fonts/");
  eleventyConfig.addPassthroughCopy("./src/images/");

  // Returns work items, sorted by display order
  eleventyConfig.addCollection("focusAreas", (collection) => {
    return sortByDisplayOrder(
      collection.getFilteredByGlob("./src/coaching/*.md")
    );
  });

  // Returns a collection of blog posts in reverse date order
  eleventyConfig.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
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
