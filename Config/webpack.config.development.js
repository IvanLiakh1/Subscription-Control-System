import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.js';
const config = {
    mode: 'development',
};
export default merge(baseConfig, config);
