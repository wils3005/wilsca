import Knex from "knex";

const values = [
  "/development/us/{{ k8s_namespace }}",
  "https://*.pointclickcare.com,https://*.genesishcc.com",
  "AKIAYGVSKSQPK3FT2SXZ",
  "AKIAYGVSKSQPK3FT2SXZ",
  "AKIAYGVSKSQPK3FT2SXZ",
  "{{ k8s_namespace }}-swiftmedical-io",
  "us-east-1",
  "{{ k8s_namespace }}-swiftmedical-io",
  "AKIAYGVSKSQPPKSH5CNI",
  "{{ k8s_namespace }}-swiftmedical-io-background",
  "us-east-1",
  "",
  "* * * * *",
  "https://{{ k8s_namespace }}-dashboard.swiftmedical.io,https://localhost:58547,https://localhost:3000,http://sm-schema-generator.s3-website-us-east-1.amazonaws.com",
  "0",
  "{{ k8s_namespace }}-dashboard.swiftmedical.io",
  "120",
  "https://{{ k8s_namespace }}-dashboard.swiftmedical.io",
  "",
  "datica_adt_feed",
  "swift-dev",
  "datica_emr_response",
  "pdf_complete_topic",
  "pdf_request_topic",
  "5",
  "{{ k8s_namespace }}.swiftmedical.io",
  "",
  "0",
  "30",
  "30",
  "1",
  "kafka://b-1.kafka.asgx0i.c6.kafka.us-east-1.amazonaws.com:9094,kafka://b-3.kafka.asgx0i.c6.kafka.us-east-1.amazonaws.com:9094,kafka://b-2.kafka.asgx0i.c6.kafka.us-east-1.amazonaws.com:9094",
  "kafka://b-1.kafka.asgx0i.c6.kafka.us-east-1.amazonaws.com:9094,kafka://b-3.kafka.asgx0i.c6.kafka.us-east-1.amazonaws.com:9094,kafka://b-2.kafka.asgx0i.c6.kafka.us-east-1.amazonaws.com:9094",
  "0",
  "Frame",
  "swiftmedicalPatient://",
  "https://play.google.com/store/apps/details?id=io.swiftmedical.android.swiftapp&hl=en_CA",
  "https://apps.apple.com/ca/app/swift-skin-and-wound/id1410310051",
  "https://qalogin01.pointclickcare.com",
  "1000",
  "0",
  "",
  "0",
  "",
  "",
  "production",
  "production",
  "5",
  "21 */1 * * *",
  "0 */4 * * *",
  "0",
  "swift-content-management-dev",
  "1",
  "https://7bf5ce36c5694a989523bd9823bfb879:8ae9a1329f64425f8fa30330db06ec70@sentry.io/1884307",
  "1",
  "wqCKRFDOcjfhC7X1kjzRQPdW5FHSv3N84qVFowLXgg0",
  "https://s3.amazonaws.com/static.dashboard.swiftmedical.io",
  "0 * * * *",
  "https://survey.{{ k8s_namespace }}",
  "+17145819194",
  "1",
  "https://dev-auth.swiftmedical.io",
  "1",
  "0 * * * *",
  ".swiftmedical.io",
];

async function seed(knex: Knex): Promise<void> {
  try {
    await knex("values").del();
    await knex("values").insert(values.map((value) => ({ value })));
  } catch (e) {
    console.error(e);
  }
}

export { seed };
