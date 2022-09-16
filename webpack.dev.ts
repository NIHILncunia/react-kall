import { join, resolve } from 'path';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Config extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Config = {
  mode: 'development',
  devtool: 'eval',
  entry: {
    app: resolve(__dirname, 'src'),
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx', ],
    alias: {
      '@': resolve(__dirname, 'src/'),
      '@/components': resolve(__dirname, 'src/components/'),
      '@/store': resolve(__dirname, 'src/store/'),
      '@/images': resolve(__dirname, 'src/images/'),
      '@/styles': resolve(__dirname, 'src/styles/'),
      '@/hooks': resolve(__dirname, 'src/hooks/'),
      '@/reducers': resolve(__dirname, 'src/reducers/'),
      '@/utils': resolve(__dirname, 'src/utils/'),
      '@/data': resolve(__dirname, 'src/data/'),
      '@/layouts': resolve(__dirname, 'src/layouts/'),
      '@/actions': resolve(__dirname, 'src/actions/'),
      '@/pages': resolve(__dirname, 'src/pages/'),
      '@/types': resolve(__dirname, 'src/types/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?/,
        loader: 'babel-loader',
        exclude: join(__dirname, 'node_modules'),
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: [ 'last 2 chrome versions', ], },
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
            '@emotion/babel-preset-css-prop',
          ],
          plugins: [ [ '@emotion/babel-plugin', { sourceMap: true, }, ], require.resolve('react-refresh/babel'), ],
        },
      },
      {
        test: /\.(css|scss)/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin({
      overlay: false,
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
    publicPath: '/build',
  },
  devServer: {
    historyApiFallback: true,
    devMiddleware: {
      publicPath: '/build',
    },
    static: {
      directory: resolve(__dirname),
    },
    client: {
      overlay: true,
    },
    port: 3000,
    hot: true,
  },
};

export default config;
