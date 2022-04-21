

const {getProdOptions} = require('./options')

const prodOptions = getProdOptions()

const webpack = require('webpack');

const compiler = webpack(prodOptions);

console.log('build start!')

compiler.run((err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    if (stats.hasErrors()) {
        console.error(stats.toString())
    }

    if (stats.hasWarnings()) {
        console.warn(stats.toString());
    }
    compiler.close((closeErr) => {
        if (closeErr) {
            console.error(closeErr)
        }
    });
    if (!stats.hasErrors() && !stats.hasWarnings()) {
        console.log('build successfully!')
    }
});