const { src, dest } = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

// TypeScript Project
const tsProject = typescript.createProject('tsconfig.json');

// Copy SVG files
function copySvgFiles() {
  return src('src/**/*.svg').pipe(dest('dist/'));
}

// Main build function
exports.default = function() {
  return copySvgFiles();
}; 