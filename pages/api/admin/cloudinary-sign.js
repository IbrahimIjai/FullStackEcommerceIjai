const cloudinary = require('cloudinary').v2;

export default function signature(req, res) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  console.log("signing......");
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    'JW-JlvfIQWlA0gc69j9OwL4DsrU'
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
  console.log("Signed......");
}
