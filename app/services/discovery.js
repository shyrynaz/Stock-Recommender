
const config = require('../../config');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const discovery = new DiscoveryV1({
  version: config.DISCOVERY.version_date,
  url: "https://gateway-syd.watsonplatform.net/discovery/api"
});

const NUM_DOCS_TO_QUERY = 5;

/**
 * Query for 5 documents using the Watson Discovery Service
 * @param {string} topic - The topic to query for
 * @returns {promise}
 */
function query(topic) {
  
  var promise = new Promise(function(resolve, reject) {
    discovery.query({
      environment_id : config.DISCOVERY.env_id,
      collection_id  : 'news-en',
      query          : topic,
      count          : NUM_DOCS_TO_QUERY
    }, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
  
  return promise;
}

module.exports = {
  query : query
};
