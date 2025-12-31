const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

function getTableClient() {
  const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const key = process.env.AZURE_STORAGE_ACCOUNT_KEY;
  const tableName = process.env.AZURE_TABLE_NAME;

  if (!account || !key || !tableName) {
    throw new Error("Missing env vars: AZURE_STORAGE_ACCOUNT_NAME / AZURE_STORAGE_ACCOUNT_KEY / AZURE_TABLE_NAME");
  }

  const cred = new AzureNamedKeyCredential(account, key);
  return new TableClient(`https://${account}.table.core.windows.net`, tableName, cred);
}

module.exports = async function (context, req) {
  try {
    const client = getTableClient();

    const items = [];
    for await (const e of client.listEntities()) {
      items.push(e);
    }

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: items
    };
  } catch (err) {
    context.log.error(err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
