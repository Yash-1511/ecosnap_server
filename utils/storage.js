const AWS = require("aws-sdk");

exports.s3Upload = async (image) => {
  let imageUrl = "";
  let imageKey = "";
  if (image) {
    const s3bucket = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID,
        secretAccessKey: process.env.AWS_ACCESSKEYSECRET,
      },
      region: "ap-south-1",
    });
    const params = {
      Bucket: "ecosnap",
      Key: `events/${image.originalname}`,
      Body: image.buffer,
      ContentType: image.mimetype,
    };

    const s3Upload = await s3bucket.upload(params).promise();

    imageUrl = s3Upload.Location;
    imageKey = s3Upload.Key;
  }
  return {imageUrl,imageKey}
};
