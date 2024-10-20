// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });


// export const uploadMedia = async (file: string, folder = "") => {
//   try {
//     const uploaded = await cloudinary.uploader.upload(file, {
//       folder:`/nextcommerce/${folder}`
//     });
//     return uploaded
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }

// export const deleteMedia = async (id?: string | null) => {
//   try {
//     if (!id) {
//       return false
//     }
//     await cloudinary.uploader.destroy(id);
//     return true
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }


// export default {
//   uploadMedia,
//   deleteMedia,
// }