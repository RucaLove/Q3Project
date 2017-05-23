// https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')

gulp.task('default', ['browser-sync'], function () {
})

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    proxy: 'http://localhost:5000',
    files: ['app/public/**/*.*'],
    browser: 'google chrome',
    port: 7000,
		reloadDelay: 1000,
  })
})

gulp.task('nodemon', function (cb) {
  let started = false

  return nodemon({
    script: './app/bin/www',
    ignore: [
      'test/',
      'app/public/',
      'gulpfile.js',
      'node_modules/'
    ],
  }).on('start', function () {
    if (!started) {
			setTimeout(cb, 500)
      started = true
    }
  })
})
