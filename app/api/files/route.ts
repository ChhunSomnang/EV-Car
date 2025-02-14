import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// Set up AWS S3 for Cloudflare R2
const s3 = new AWS.S3({
  endpoint: 'https://pub-133f8593b35749f28fa090bc33925b31.r2.dev', // Cloudflare R2 endpoint
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID as string, // Access Key from env
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY as string, // Secret Key from env
  region: 'auto',
});

const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME as string; // Get the bucket name from env

// API Route to list objects in the R2 bucket
export async function GET(req: NextRequest) {
  const params = {
    Bucket: bucketName, // Use the bucket name from the environment variable
  };

  try {
    const data = await s3.listObjectsV2(params).promise();

    // Check if files exist in the bucket
    if (data.Contents && data.Contents.length > 0) {
      // Return the list of file names
      const fileNames = data.Contents.map((file) => file.Key);
      return NextResponse.json({ fileNames }, { status: 200 });
    }

    return NextResponse.json({ message: 'No files found in the bucket' }, { status: 404 });
  } catch (error: unknown) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to list files', error: error.message }, { status: 500 });
    } else {
      // Fallback for cases when the error is not an instance of Error
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
