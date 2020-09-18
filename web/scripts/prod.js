const { getProdConfig } = require("./config");
const config = getProdConfig();

const webpack = require("webpack");

const compiler = webpack(config);

compiler.run((err, stats) => {
  const info = stats.toJson();

  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }else if (stats.hasErrors()) {
    console.error(info.errors);
  }else if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }else{
      console.log('build successfully')
      console.log([
        console.log(`Time: ${info.time}ms`),
        console.log(`output: ${info.outputPath}`),
        console.log(`webpack version: ${info.version}`),
      ].join('\n'))
  }
});
