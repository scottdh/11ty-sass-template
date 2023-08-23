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
  // Copy `img/favicon/` to `_site/`
  eleventyConfig.addPassthroughCopy({ "./src/favicon": "/" });
  // Copy image folder in posts to /blog
  eleventyConfig.addPassthroughCopy({ "./src/posts/media": "/blog/media" });

  // Returns programmes, sorted by display order
  eleventyConfig.addCollection("programmes", (collection) => {
    return sortByDisplayOrder(
      collection.getFilteredByGlob("./src/coaching/*.md")
    );
  });

  // Returns work, sorted by display order
  eleventyConfig.addCollection("work", (collection) => {
    return sortByDisplayOrder(collection.getFilteredByGlob("./src/work/*.md"));
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
