---
title: "Stream Twitter Data into BigQuery with Cloud Dataprep"
subtitle: "Inspired by Lakshmanan V’s article to show just a couple extra features"
summary: "Let’s see how much data we can get by listening to Twitter’s Streaming API. I will break the code out into chunks to explain, but again all of this is included in the git repo."
publishedAt: "2018-01-30"
readingTime: "3 min read"
category: "Engineering & Makers"
tags:
  - "Google Cloud Platform"
  - "Google Data Studio"
  - "Twitter API"
  - "Node.js"
  - "BigQuery"
coverImage: "/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/01-1_KbR3sE6WRNsUqJGV_-wKIg.png"
relatedProjectTitle: "Cloud Functions & BigQuery Data Pipelines"
mediumUrl: "https://medium.com/google-cloud/stream-twitter-data-into-bigquery-with-cloud-dataprep-73aa8998fcc1"
---

*Inspired by [Lakshmanan V](https://medium.com/u/247b0630b5d6)’s [article](https://medium.com/google-cloud/how-to-schedule-a-bigquery-etl-job-with-dataprep-b1c314883ab9) to show just a couple extra features.*

> All code mentioned here can be found in my [git repo](https://github.com/jeremylorino/gcp-dataprep-bigquery-twitter-stream). Contribute, steal, or do nothing with it — your choice ;)

Let’s see how much data we can get by listening to [Twitter’s Streaming API](https://developer.twitter.com/en/docs/tweets/filter-realtime/overview). I will break the code out into chunks to explain, but again all of this is included in the [git repo](https://github.com/jeremylorino/gcp-dataprep-bigquery-twitter-stream).

### Listen to streaming Twitter data

Below we are utilizing a *TwitterStream* helper class that takes an Array of keywords that will filter the real-time tweet stream.

```javascript title="stream-setup.js"
const stream = new TwitterStream(config.get("twitter"));
const params = {
  with: 'user',
  // some keywords to track in the twitter stream
  track: [
    'nfl',
    'super bowl',
    'superbowl',
    'football',
    'minnesota',
    'olympics',
    'winter olympics',
  ]
};
//create stream
stream.stream(params);
```
*Configure stream listener with Twitter keyword filters*

Then we bind an event listener to the data event that is emitted from the *TwitterStream* instance from above. This listener will capture all tweets emitted as JSON and buffer them into a working array. Once the buffer is full, a copy of the working array is saved to the configured Google Cloud Storage bucket via *StorageProvider*; and the working array is cleared to allow for more tweets.

```javascript title="stream-listen.js"
stream.on('data', function(json) {
  if (count++ < max) {
    if (pubsubBuffer.length < maxBuffer - 1) {
      pubsubBuffer.push(json);
    }
    else {
      let response = pubsubBuffer.concat([]);
      pubsubBuffer = [];

      logger.info('batch buffer full - flush and write batch to storage');
      promiseBuffer.push(storage.save(`twitter_stream/${Date.now()}.bq.json`, response));
    }
  }

  if (count == max) {
    logger.info('over stream events max - wait for write batches to finish then exit');
    stream.destroy();
    Promise.all(promiseBuffer)
      .then((lst) => process.exit());
  }
});
```

And don’t forget your *config.json*. Fill in your GCP project id, the location of your default application credentials, twitter app credentials, and storage bucketName.

```json title="config.json"
{
  "GCLOUD_PROJECT": "",
  "GOOGLE_APPLICATION_CREDENTIALS": "serviceaccount.json",
  "twitter": {
    "access_token_key": "",
    "access_token_secret": "",
    "consumer_secret": "",
    "consumer_key": "",
    "sample_stream_url": "https://stream.twitter.com/1.1/statuses/sample.json",
    "stream_url": "https://stream.twitter.com/1.1/statuses/filter.json"
  },
  "bigquery": {
    "dataset": "staging",
    "table": "twitter_stream_test"
  },
  "storage": {
    "forBigQuery": true,
    "bucketName": ""
  }
}
```

### Import Cloud Storage folder to Dataprep

Open the [Google Cloud Platform dashboard](https://console.cloud.google.com) — choose from the top left menu; *Dataprep*.

> It is normal at the *very* bottom of the list — unless you have pinned it to your favorites.

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/02-1_3JLO3y2zBibEG3DnmHSDnQ.png)

Quick video on importing your dataset. For real, it is quick.

[![Import dataset (Video Demo)](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/loom-4.png)](https://www.useloom.com/share/6b261f0131d24636b4f1e41f6be0bc2f)
*Video demo: [Import dataset](https://www.useloom.com/share/6b261f0131d24636b4f1e41f6be0bc2f)*

### Wrangle newly imported dataset

Cloud Dataprep’s awesomeness is complemented by the fact that it would like you to “wrangle” your data. Particularly appealing to myself being a Texan.


There are at least 10,000 in-depth Cloud Dataprep articles, I will stick to the basics.

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/03-1_cjuDzO2aUEm0-1l0iAb1xg.png)

Now run that job yo. (top right)

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/04-1_QqBd8sVf3Di6--Q184IWiA.png)

### Schedule Dataprep ETL to BigQuery

The best part about this little setup we are about to walk through; we are selecting a “folder” inside of a Cloud Storage bucket. Each time the flow runs it will pull all the files inside the folder and consider those files as the dataset to wrangle. So as the TwitterStream collector runs and dumps files into Cloud Storage Dataprep will continuously be able to get the latest and greatest.

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/05-1_jQkX8tFaX3Sk0mw1qSEX4A.png)
*Add a schedule to your flow*

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/06-1_8T9wCNtsZXIjwMj2l8OcxQ.png)
*Every hour; 15 minutes past the hour*

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/07-1_9lL-pHRVWY3o68T6RL4qsg.png)
*Select a BigQuery dataset*

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/08-1_6xGI_LxmkT4N4pq75EDvjA.png)
*Select ‘Create a new table’*

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/09-1_sv_hvURYFAWTA5_wEffm6g.png)
*Select ‘Create a new table every run’*

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/10-1_1kKwFK34XaxeVgj5dFC2KA.png)
*End result*

> Next time…Visualize with Datastudio

![](/images/blog/stream-twitter-data-into-bigquery-with-cloud-dataprep/01-1_KbR3sE6WRNsUqJGV_-wKIg.png)
