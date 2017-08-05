const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('default', function() {
	nodemon({
		script: 'index.js',
		env: { 'base-dir' : './public'}
	})
	.on('restart', function() {
		console.log('web server restarted')
	})
})