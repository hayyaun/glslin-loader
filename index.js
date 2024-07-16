const fs = require("fs");
const path = require("path");

module.exports = function (source, ...rest) {
  this.cacheable();

  const options = this.getOptions();
  const root = options.root;

  const reg = /#(pragma\s+)?include\s+(['"])([^'"]+)\2;?/gi;
  source = source.replace(reg, ($, _1, _2, name) => {
    const includePath = path.resolve(root, name);
    this.addDependency(includePath);

    const includeContent = fs.readFileSync(
      includePath,
      { encoding: "utf-8", flag: "r" },
      function (err, _) {
        if (err) return this.callback(err);
      }
    );

    return includeContent;
  });

  this.callback(null, source, ...rest);
};
