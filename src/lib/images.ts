"use server"

// import imagemin from "imagemin";
// import imageminJpegtran from "imagemin-jpegtran";

// const cache = new Map<string, string>();
// const cache = new Map<ImageProps, string>();


// export default async function getBase64ImageUrl(
//   image: ImageProps,
// ): Promise<string> {
//   let url = cache.get(image);
//   if (url) {
//     return url;
//   }
//   const response = await fetch(
//     `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`,
//   );
//   const buffer = await response.arrayBuffer();
//   const minified = await imagemin.buffer(Buffer.from(buffer), {
//     plugins: [imageminJpegtran()],
//   });

//   url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
//   cache.set(image, url);
//   return url;
// }

// export default async function getBlurredImageUrl(
//   image: string,
// ): Promise<string> {
//   let url = cache.get(image);
//   if (url) {
//     return url;
//   }
//   const response = await fetch(image);
//   const buffer = await response.arrayBuffer();
//   const minified = await imagemin.buffer(Buffer.from(buffer), {
//     plugins: [imageminJpegtran()],
//   });

//   url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
//   cache.set(image, url);
//   return url;
// }



// import { getPlaiceholder } from 'plaiceholder'

// export async function getImage(src: string) {
//   const buffer = await fetch(src).then(async res =>
//     Buffer.from(await res.arrayBuffer())
//   )

//   const {
//     metadata: { height, width },
//     ...plaiceholder
//   } = await getPlaiceholder(buffer, { size: 10 })

//   return {
//     ...plaiceholder,
//     img: { src, height, width }
//   }
// }


// import { CloudinaryImage } from "@cloudinary/url-gen";
// import { format } from "@cloudinary/url-gen/actions/delivery";
// import { scale, } from "@cloudinary/url-gen/actions/resize";
// import { auto } from "@cloudinary/url-gen/qualifiers/format";
// export const getCloudinaryImage = (url: string) => {
//   const optimied = new CloudinaryImage(url)
//     .resize(scale().width(300))
//     .delivery(format(auto()));
//   return optimied.transformation.toString()
// }