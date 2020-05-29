/* eslint-disable import/no-cycle */

import { uploader } from '../config/cloudinary_config';
import { dataUri } from '../middlewares/multer_uploads';

const imageUpload = async (req) => {
  try {
    const file = await dataUri(req).content;
    const result = await uploader.upload(file);
    const image = result.url;
    return image;
  } catch (error) {
    console.log(error);
    return new Error('An error occured while processing image');
  }
};

export default imageUpload;
