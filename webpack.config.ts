import path from "path";

const config = {
  entry: "./src/index.tsx",
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'], },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
};

export default config;

