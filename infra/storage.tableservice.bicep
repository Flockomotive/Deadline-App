param storageAccountName string
param tableName string

resource table 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  name: '${storageAccountName}/${tableName}'
}
