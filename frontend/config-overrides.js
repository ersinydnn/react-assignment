const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      modifyVars: { "@primary-color": "#1DA57A" },
      javascriptEnabled: true,
    },
  })
);
