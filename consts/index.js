'use strict';

var consts = {
  kW: 'kW',
  kWMax: 'kW Max',
  kWMin: 'kW Min',
  kWh: 'kWh',

  WEBBOX: 'WebBox',
  EGAUGE: 'eGauge',
  ENPHASE: 'Enphase',

  icon: 'Icon',
  precipType: 'PrecipType',
  summary: 'Summary',

  precipIntensity: 'PrecipIntensity',
  precipProbability: 'PrecipProbability',
  temperature: 'Temperature',
  apparentTemperature: 'ApparentTemperature',
  dewPoint: 'DewPoint',
  humidity: 'Humidity',
  windSpeed: 'WindSpeed',
  windBearing: 'WindBearing',
  visibility: 'Visibility',
  cloudCover: 'CloudCover',
  pressure: 'Pressure',
  ozone: 'Ozone',
  sunriseTime: 'SunriseTime',
  sunsetTime: 'SunsetTime',
  precipIntensityMax: 'PrecipIntensityMax',
  precipIntensityMaxTime: 'PrecipIntensityMaxTime',
  precipAccumulation: 'PrecipAccumulation',
  temperatureMin: 'TemperatureMin',
  temperatureMinTime: 'TemperatureMinTime',
  temperatureMax: 'TemperatureMax',
  temperatureMaxTime: 'TemperatureMaxTime',
  apparentTemperatureMin: 'ApparentTemperatureMin',
  apparentTemperatureMinTime: 'ApparentTemperatureMinTime',
  apparentTemperatureMax: 'ApparentTemperatureMax',
  apparentTemperatureMaxTime: 'ApparentTemperatureMaxTime',
  EMPTY_OBJECT: '[]',

  OK: 'OK',
  ASTERISK: '*',
  LOGIN_PAGE_URL: '/login',
  SET_PASSWORD_PAGE_URL: '/setpassword?token=',
  USER_ACTION_PAGE_URL: '/useraction?token=',
  SOCIAL_LOGIN_URL: '/sociallogin',
  PRESENTATION_PAGE_URL: '/presentation',
  MANAGEMENT_PAGE_URL: '/management',
  DATA_SENCE_PAGE_URL: '/datasense',
  BP_ASSET_URL: '0BwW4a4uizniHLXl6SHA3VDh3LUE',

  TAG_TYPES: [
    'Facility',
    'WeatherStation',
    'Scope', 'Node',
    'Metric',
    'BPD'
  ],
  TAG_TYPE: {
    Facility: 'Facility',
    WeatherStation: 'WeatherStation',
    Metric: 'Metric',
    Scope: 'Scope',
    Node: 'Node',
    BPD: 'BPD'
  },
  NO_PARENT_TAG_TYPE: 'None',
  TAG_BINDING_FIELD_NAME: 'tagBindings',
  APP_ENTITIES_TAG_FIELD_NAMES: {
    Dashboard: 'segments',
    Presentation: 'tagBindings'
  },
  ALL_ENTITIES_TAG_FIELD_NAMES: {
    Dashboard: 'segments',
    Presentation: 'tagBindings',
    User: 'accessibleTags'
  },
  TAG_ENTITIES_FIELD_NAMES: {
    Dashboard: 'appEntities',
    Presentation: 'appEntities',
    User: 'usersWithAccess',
    AnalyzeWidget: 'appEntities'
  },
  ENTITY_TYPES: [
    'Dashboard',
    'Presentation',
    'User',
    'AnalyzeWidget'
  ],
  APP_ENTITY_TYPES: [
    'Dashboard',
    'Presentation',
    'AnalyzeWidget'
  ],
  APP_ENTITY_TYPE: {
    DASHBOARD: 'Dashboard',
    PRESENTATION: 'Presentation',
    ANALYZE_WIDGET: 'AnalyzeWidget'
  },
  USER_WITH_ACCESS_TYPES: ['User'],
  USER_WITH_ACCESS_TYPE: {
    USER: 'User'
  },

  RESERVED_TAG_RULE_TYPES: [
    'Facility',
    'Scope',
    'WeatherStation',
    'Node',
    'Metric',
    'BPD'
  ],
  ALLOWED_DATA_SENSE_WIDGET_TYPES: [
    'Timeline',
    'Bar',
    'Pie',
    'Image',
    'Equivalencies',
    'Table',
    'Boilerplate',
    'Kpi'
  ],
  ALLOWED_BOILERPLATE_WIDGET_TYPES: [
    'Current Power',
    'Communication Monitoring',
    'Energy Consumed',
    'Energy Produced',
    'Reimbursement',
    'CO2 Avoided',
    'System Information',
    'Weather',
    'Location'
  ],
  ALLOWED_METRICS_SUMMARY_METHODS: [
    'Total',
    'Average',
    'Count',
    'Minimum',
    'Maximum',
    'Median'
  ],
  ALLOWED_USER_ROLES: [
    'BP',
    'TM',
    'Admin'
  ],
  ALLOWED_APPS: [
    'Present',
    'Analyze',
    'Classroom',
    'Verify',
    'Control',
    'Utilities',
    'Projects',
    'Connect'
  ],
  ALL : 'all_data',
  ALL_TYPE : 'all_type',
  USER_ROLES: {
    BP: 'BP',
    Admin: 'Admin',
    TM: 'TM'
  },
  BP_ACCOUNT_NAME : 'BrightergyPersonnel',
  DEMO_ACCOUNT_NAME : 'Demo Users Account',

  APPS: {
    Present: 'Present',
    Analyze: 'Analyze',
    Classroom: 'Classroom',
    Verify: 'Verify',
    Control: 'Control',
    Utilities: 'Utilities',
    Projects: 'Projects',
    Connect: 'Connect'
  },
  DATA_SENSE_WIDGET_TYPES: {
    Table: 'Table',
    Timeline: 'Timeline',
    Bar: 'Bar',
    Pie: 'Pie',
    Image: 'Image',
    Equivalencies: 'Equivalencies',
    Boilerplate: 'Boilerplate',
    Kpi: 'Kpi'
  },

  BOILERPLATE_WIDGET_TYPES: {
    CurrentPower: 'Current Power',
    CommunicationMonitoring: 'Communication Monitoring',
    EnergyConsumed: 'Energy Consumed',
    EnergyProduced: 'Energy Produced',
    Reimbursement: 'Reimbursement',
    CO2Avoided: 'CO2 Avoided',
    SystemInformation: 'System Information',
    Weather: 'Weather',
    Location: 'Location'
  },
  AWS_ASSETS_INFO: {
    BUCKET_NAME: 'blassets',
    CNAMES: ['cdn','assets','blassets'],
    PLATFORM_ASSETS_FOLDER: 'PlatformAssets',
    CUSTOM_ASSETS_FOLDER: 'CustomAssets',
    FACILITY_ASSETS_FOLDER: 'FacilityAssets'
  },
  AWS_FIRMWARE_INFO: {
    BUCKET_NAME: 'device-softwares',
    S3_DOMAIN_NAME: 's3-us-west-2.amazonaws.com'
  },
  BRIGHTERVIEW_WIDGET_TYPES: {
    Graph: 'graph',
    Solar: 'solar',
    EnergyEquivalencies: 'energyEquivalencies',
    Weather: 'weather'
  },
  PRESENTATION_ENERGY_DATA: 'Presentation energy data',
  METRIC_NAMES: {
    Reimbursement: 'Reimbursement',
    Wh: 'Energy (Wh)',
    kWh: 'Energy (kWh)',
    Watts: 'Power (W)',
    kW: 'Power (kW)',
    WattsMax: 'Max Watts',
    WattsMin: 'Min Watts',
    Temperature: 'Temperature'
  },
  SUMMARY_METHOD_TYPES: ['Total', 'Average', 'Count', 'Minimum', 'Maximum'],
  METRIC_TYPE: {
    Datafeed: 'Datafeed',
    Calculated: 'Calculated'
  },

  FORECAST_URL_WITH_GEO: 'http://forecast.io/#/f/',
  GOOGLEMAP_URL_WITH_GEO: 'http://maps.google.com/?q=',

  USER_COOKIE: {
    STATUS_COOKIE_NAME: 'status'
  },

  USER_TOKENS: {
    SET_PASSWORD: 'SetPassword'
  },

  ASSETS_THUMBNAIL_SIZE: {
    WIDTH : 192,
    HEIGHT : 144
  },

  BRIGHTERVIEW_INTERVALS: {
    Hourly: 'Hourly',
    Daily: 'Daily',
    Weekly: 'Weekly',
    Monthly: 'Monthly',
    Yearly: 'Yearly'
  },

  ALLOWED_SINGLE_POINT_AGGREGATION: [
    'Median',
    'Mode',
    'Min',
    'Max',
    'Total',
    'Average',
    'Count'
  ],

  SINGLE_POINT_AGGREGATION: {
    Median: 'Median',
    Mode: 'Mode',
    Min: 'Min',
    Max: 'Max',
    Total: 'Total',
    Average: 'Average',
    Count: 'Count'
  },

  METRIC_SUMMARY_METHODS: {
    Total: 'Total',
    Average: 'Average',
    Count: 'Count',
    Minimum:'Minimum',
    Maximum: 'Maximum',
    Median: 'Median'
  },

  ALLOWED_SUB_DAY: ['12h', '6h', '3h', '1h', '10m'],

  SUB_DAY: {
    h12: '12h',
    h6: '6h',
    h3: '3h',
    h1: '1h',
    m10: '10m'
  },

  CLIENT_CSS_FILES: {
    LIBRARY: {
      NVD3: './client/lib/d3/nv.d3.css',
      BOOTSTRAP3: './client/lib/bootstrap/css/bootstrap.min.css'
    },
    COMMON: ['./client/assets/css/general.min.css'],
    ANALYZE_APP: ['./client/bl-data-sense/assets/css/datasense.min.css']
  },

  DATE_TIME_FORMAT: {
    UTC: 'UTC',
    LocalTime: 'Local Time',
    AutomaticDaylightSavings: 'Automatic Daylight Savings'
  },

  ALLOWED_DATE_TIME_FORMAT: ['UTC', 'Local Time', 'Automatic Daylight Savings'],

  NODE_TYPES: [
    'Solar',
    'Generation',
    'Supply',
    'Demand',
    'Thermostat'
  ],

  NODE_TYPE: {
    Solar: 'Solar',
    Generation: 'Generation',
    Supply: 'Supply',
    Demand: 'Demand',
    Thermostat: 'Thermostat'
  },

  APPLICATION: {
    Analyze: 'analyze',
    ASSurf: 'assurf',
    Present: 'present',
    EMSLite: 'emslite',
    DeviceLogs: 'devicelogs',
    Core: 'core',
    Demo: 'demo'
  },

  GENERAL_ROUTES: {
    AuthAPI: 'authapi',
    GeneralAPI: 'generalapi',
    Pages: 'pages',
    DemoAPI: 'demoapi'
  },

  ASSURF_TEMPOIQ_CACHE_TTL: 1800,
  EMS_TEMPOIQ_CACHE_TTL: 1800,
  PRESENT_TEMPOIQ_CACHE_TTL: 1800,
  ANALYZE_TEMPOIQ_CACHE_TTL: 1800,

  TREND: {
    UP: 'up',
    DOWN: 'down'
  },

  HEALTH_CHECK_MESSAGE: 'ok',

  TAG_STATE_DATATYPES: [
    'presentDeviceConfig',
    'presentDeviceStatus',
    'presentDeviceLogcatLink',
    'digiConfig',
    'digiEndList',
    'digiReboot',
    'digiStatus',
    'digiStatusReport',
    'digiEventLog',
    'digiEventLogReport',
    'gemConfig',
    'gatewaySoftware',
    'gatewayNetwork',
    'thermostatTemperature'
  ],
  TAG_STATE_DATATYPE: {
    PRESENT_DEVICE_CONFIG: 'presentDeviceConfig',
    PRESENT_DEVICE_STATUS: 'presentDeviceStatus',
    PRESENT_DEVICE_LOGCAT_LINK: 'presentDeviceLogcatLink',
    DIGI_CONFIG: 'digiConfig',
    DIGI_END_LIST: 'digiEndList',
    DIGI_REBOOT: 'digiReboot',
    DIGI_STATUS: 'digiStatus',
    DIGI_STATUS_REPORT: 'digiStatusReport',
    DIGI_EVENT_LOG: 'digiEventLog',
    DIGI_EVENT_LOG_REPORT: 'digiEventLogReport',
    GEM_CONFIG: 'gemConfig',
    GATEWAY_SOFTWARE: 'gatewaySoftware',
    GATEWAY_NETWORK: 'gatewayNetwork',
    THERMOSTAT_TEMPERATURE: 'thermostatTemperature'
  },

  GATEWY_NETWORK_STATES: ['open', 'close'],
  GATEWAY_NETWORK_MAX_INTERVAL: 3600,
  THERMOSTAT_TEMPERATURE_LOWER_LIMIT: -100,
  THERMOSTAT_TEMPERATURE_UPPER_LIMIT: 200,

  HEADERS: {
    XTotalCount: 'X-Total-Count'
  },
  KINESIS: 'kinesis'
};

consts.SERVER_ERRORS    = require('./server-errors');
consts.COUNTRIES        = require('./countries');
consts.TIME_ZONES       = require('./time-zones');
consts.DIMENSIONS       = require('./dimensions');
consts.WEBSOCKET_EVENTS = require('./websocket-events');
consts.CONFIG_KEYS      = require('./required-config-keys');

module.exports = consts;
