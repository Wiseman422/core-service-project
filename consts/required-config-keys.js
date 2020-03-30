'use strict';

module.exports = {
  GENERAL: [
    'env',
    'instance',
    'domain',
    'platformdomain',
    'replacements',
    'scopecryptokey',
    'session:cookiedomain',
    'cookie:secure',
    'winston:transports',
    'apps:classroom',
    'apps:present',
    'apps:verify',
    'apps:respond',
    'apps:analyze',
    'apps:utilities',
    'apps:projects',
    'apps:connect'
  ],
  AWS: [
    'aws:auth:accesskeyid',
    'aws:auth:secretaccesskey',
    'aws:auth:region',
    'aws:kinesis:endpoint',
    'aws:kinesis:shardsparallelread',
    'aws:kinesis:readperiodmilliseconds',
    'aws:route53:resourcerecordsetbasename',
    'aws:route53:resourcerecordvalue',
    'aws:route53:hostedzoneid',
    'aws:route53:createcname',
    'aws:snsgcmarn'
  ],
  DB: [
    'db:connection',
    'db:options'
  ],
  REDIS: [
    'redis:port',
    'redis:host',
    'redis:compressing',
    'redis:compressedkey'
  ],
  EMAIL: [
    'email:username',
    'email:password',
    'email:onerrorsendemail',
    'email:recipients:erroroccured',
    'email:recipients:newutilityprovider'
  ]
};
