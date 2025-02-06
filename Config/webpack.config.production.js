import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.js';

const config = {
    mode: 'production',
};

export default merge(baseConfig, config);
