import * as Zod from "zod";

type Cluster = Zod.infer<typeof Notenv.clusters>;

type Namespace = Zod.infer<typeof Notenv.namespaces>;

type Service = Zod.infer<typeof Notenv.services>;

type Environment = Zod.infer<typeof Notenv.environments>;

type Name = Zod.infer<typeof Notenv.names>;

type NotenvRecord = Zod.infer<typeof Notenv.record>;

class Notenv {
  static clusters = Zod.enum([
    "dev-CA-eks",
    "dev-US-eks",
    "prod-CA-eks",
    "prod-US-eks",
    "prod-hlgx",
    "qa-hlgx",
    "stg-US-eks",
  ]);

  static namespaces = Zod.enum([
    "stg-ghc",
    "stg-homehealth",
    "stg-hospital",
    "stg-pcc",
    "ghc",
    "homehealth",
    "hospital",
    "pcc",
    "pcc-sales",
    "training",
    "homehealth-ca",
    "hospital-ca",
    "dev-demo",
    "dev-int",
    "dev1",
    "dev2",
    "dev3",
    "pcc-clone",
    "dev-hsnf",
    "hlgx",
    "qa-hlgx",
  ]);

  static services = Zod.enum(["api", "karafka", "worker"]);

  static environments = Zod.enum(["development", "test", "production"]);

  static names = Zod.enum([
    "MARATHON_APP_ID",
    "ALLOWED_FRAME_ORIGINS",
    "AWS_ACCESS_KEY",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_KEY_ID",
    "AWS_BUCKET_ID",
    "AWS_REGION",
    "AWS_RESCUE_BUCKET",
    "BACKGROUND_UPLOAD_ACCESS_KEY",
    "BACKGROUND_UPLOAD_BUCKET_ID",
    "BACKGROUND_UPLOAD_REGION",
    "CANADA_HOST",
    "CHECK_JOB_STATE_WORKER_FREQUENCY",
    "CORS_ALLOWED_ORIGINS",
    "DASHBOARD_FINGERPRINT_AUTH_ENABLED",
    "DASHBOARD_HOSTNAME",
    "DASHBOARD_TOKEN_TTL",
    "DASHBOARD_URL",
    "DATA_API_BASE_URL",
    "DATICA_ADT_TOPIC",
    "DATICA_AUTH_USER",
    "DATICA_EMR_TOPIC",
    "DATICA_PDF_COMPLETE_TOPIC",
    "DATICA_PDF_REQUEST_TOPIC",
    "DB_POOL",
    "DEFAULT_HOST",
    "ENABLED_RND_SERVICES",
    "ENVELOPES_DISABLED",
    "FARADAY_OPEN_TIMEOUT",
    "FARADAY_TIMEOUT",
    "GET_TEMPLATE_ASSESS_VERSION_ENABLED",
    "KAFKA_BROKERS",
    "KARAFKA_SEED_BROKERS",
    "NEW_PATIENT_AVATAR_DOWNLOAD_API",
    "NOTIFIABLE_RESOURCES",
    "PATIENT_APP_DEEP_LINK_URL",
    "PATIENT_APP_STORE_URL_ANDROID",
    "PATIENT_APP_STORE_URL_IOS",
    "PCC_ASSESSMENT_SIGN_URL",
    "PCC_PAGE_LIMIT",
    "PCC_PATIENT_REVALIDATION_ENABLED",
    "PCC_PATIENT_REVALIDATION_SCHEDULE",
    "PCC_RECONCILE_DISCHARGES_ENABLED",
    "PRECACHE_V2_ASSESSMENT_ORGANIZATION_IDS",
    "PRECACHE_SURVEY_ORGANIZATION_IDS",
    "RACK_ENV",
    "RAILS_ENV",
    "RAILS_MAX_THREADS",
    "REBUILD_API_V2_LOCATIONS_INDEX_WORKER_FREQUENCY",
    "RESCUE_IMAGE_WORKER_FREQUENCY",
    "SALES_DEMO_CHILD_ORGANIZATION_REPLICATION_ENABLED",
    "SCMS_S3_BUCKET_NAME",
    "SEND_ENVELOPE_ENABLED",
    "SENTRY_DSN",
    "SILENCE_BACKTRACE",
    "SKYLIGHT_AUTHENTICATION",
    "STATIC_ASSET_HOST",
    "SURVEY_PRECACHE_WORKER_FREQUENCY",
    "SURVEY_URL",
    "SMS_FROM_NUMBER",
    "SWIFT_AUTH_SERVICE_ENABLED",
    "SWIFT_AUTH_URL",
    "UPDATE_PARTNER_FACILITY_PREFS_ENABLED",
    "V2_ASSESSMENT_PRECACHE_WORKER_FREQUENCY",
    "WEB_AUTH_COOKIE_DOMAIN",
  ]);

  static record = Zod.object({
    cluster: Notenv.clusters,
    namespace: Notenv.namespaces,
    environment: Notenv.environments,
    service: Notenv.services,
    name: Notenv.names,
    value: Zod.string(),
  });

  static schema = Zod.array(Notenv.record);

  cluster: Cluster;

  namespace: Namespace;

  environment: Environment;

  service: Service;

  name: Name;

  constructor(
    cluster: Cluster,
    namespace: Namespace,
    environment: Environment,
    service: Service,
    name: Name
  ) {
    this.cluster = cluster;
    this.namespace = namespace;
    this.environment = environment;
    this.service = service;
    this.name = name;
  }
}

export { Notenv };
