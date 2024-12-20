const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 
  https://adjusted-cardinal-17.clerk.accounts.dev 
  https://challenges.cloudflare.com 
  https://clerk-telemetry.com/v1/event
  https://connect-js.stripe.com/v1.0/connect.js;
  connect-src 'self' https://adjusted-cardinal-17.clerk.accounts.dev;
  img-src 'self' https://img.clerk.com;
  worker-src 'self' blob:;
  style-src 'self' 'unsafe-inline';
  frame-src 'self' https://challenges.cloudflare.com;
  form-action 'self';
`

/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 {
    //                     key: 'Content-Security-Policy',
    //                     value: cspHeader.replace(/\n/g, ''),
    //                 },
    //             ],
    //         },
    //     ]
    // },
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                // port: "",
                // pathname: "/my-account/**",
            },
        ],
    },
};

export default nextConfig;
