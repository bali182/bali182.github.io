'use strict';

const gulp = require('gulp');
const inlineCss = require('gulp-inline-css');
const pdf = require('gulp-html-pdf');
const rename = require('gulp-rename');
const dom = require('gulp-dom');

const pdfOptions = {
  border: {
    top: "0px",            // default is 0, units: mm, cm, in, px
    right: "0",
    left: "0px",
    bottom: "20px"
  },
  width: '8.27in',
  height: '11.7in'
}

function replaceNonPdfElements() {
  const toRemove = this.querySelectorAll('.pdf-replace');
  for(let i = 0; i < toRemove.length; i++) {
    const element = toRemove[i];
    element.parentNode.removeChild(element);
  }
  return this;
}

gulp.task('default', [], () => gulp.src('index.html')
  .pipe(dom(replaceNonPdfElements))
  .pipe(inlineCss())
  .pipe(pdf(pdfOptions))
  .pipe(rename('cv.pdf'))
  .pipe(gulp.dest(''))
);
