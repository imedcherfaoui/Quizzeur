import withImages from 'next-images';

export default withImages({
  webpack(config, { isServer }) {
    // Add the file-loader rule for MP3 files
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/_next/static/sounds/',
            outputPath: 'static/sounds/',
          },
        },
      ],
    });

    // If you need to handle other file types, add additional rules here

    return config;
  },
});
