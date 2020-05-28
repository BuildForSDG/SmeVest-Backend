import cloudinary from 'cloudinary';
import serverConfig from './index';

const { config, uploader } = cloudinary.v2;

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: serverConfig.cloud_name,
    api_key: serverConfig.cloud_api_key,
    api_secret: serverConfig.cloud_api_secret
  });
  next();
};

export { cloudinaryConfig, uploader };
