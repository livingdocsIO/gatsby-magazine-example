// requires all HTML files in components for the webpack reload
require.context(
  '../', // context folder
  true, // include subdirectories
  /^components\/(.*)\.html$/ // RegExp
)
