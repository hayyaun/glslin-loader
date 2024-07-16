const fs = require("fs");
const path = require("path");

module.exports = function (source, ...rest) {
  this.cacheable();

  const options = this.getOptions();
  const root = options.root;

  const reg = /#include\s*('|"|\\")([^\)]+)(\1);?/gi;
  source = source.replace(reg, ($, quote, name) => {
    const headerPath = path.resolve(root, name);
    this.addDependency(headerPath);

    const headerContent = fs.readFileSync(
      headerPath,
      { encoding: "utf-8", flag: "r" },
      function (err, _) {
        if (err) return this.callback(err);
      }
    );

    return headerContent;
  });

  this.callback(null, source, ...rest);
};
