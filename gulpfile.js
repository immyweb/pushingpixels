// DEPENDENCIES //
const gulp              = require('gulp');
const runSequence       = require('run-sequence');
const requireDir        = require('require-dir');


// TODO: Use multiple JSON files for data
// TODO: Create build tasks


// Require gulp tasks from task directory
requireDir('./gulp/tasks');


// Consolidated dev phase task
gulp.task('default', (callback) => {
    runSequence(
        'clean:dev',
        'lint:js',
        ['sass', 'bundleJS', 'nunjucks'],
        ['browserSync', 'watch'],
        callback
    )
});

// Create/update svg icon font set
gulp.task('icons', ['iconfont', 'sass']);

// Build prodution version for deployment
// gulp.task('build', (callback) => {
//     runSequence(
//         ['clean:dev', 'clean:dist'],
//         'lint:js',
//         ['sass', 'bundleJS', 'nunjucks'],
//         ['move:css', 'move:images', 'move:fonts', 'move:js']
//         callback
//     )
// });
