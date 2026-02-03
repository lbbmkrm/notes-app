import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

const devConfig = merge(commonConfig, {
  mode: "development",
  devServer: {
    static: "./dist",
    watchFiles: ["index.html", "src/**/*"],
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});

export default devConfig;
