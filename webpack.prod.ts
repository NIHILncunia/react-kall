import { join, resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  devtool: 'hidden-source-map',
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
          plugins: [ '@emotion/babel-plugin', ],
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
  plugins: [],
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
};

export default config;
