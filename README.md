# Stream haproxy fake logs to amazon kinesis

Generate 500 fake logs per second and put them to kinesis. (500 is the max limit of kinesis records when calling `putRecords`).

## Config

It can be configured with env vars:

- `STREAM_NAME`: Kinesis stream name.
- `PARTITION_KEY`: A partition name. By default it generates one with the current timestamp.
- `REGION`: AWS Region of the Kinesis stream.

## AWS Credentials

It uses the AWS SDK to stream to kinesis. It will either use the environment variables `~/.aws/credentials` or IAM Roles if running on EC2.