targetScope = 'subscription'

param location string
param storageSku string
param AppName string

resource newrg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg_${AppName}'
  location: location
}

module storageModule './storage.bicep' = {
  name: 'storageModule'
  scope: newrg
  params: {
    storageAccountName: 'storage${AppName}'
    location: location
    skuName: storageSku
    }
}

module tableService './storage.tableservice.bicep' = {
    name: 'tableServiceModule'
    scope: newrg
    params: {
      storageAccountName: 'storage${AppName}'
      tableName: AppName
      }
}


output storageId string = storageModule.outputs.storageAccountId
output storageName string = storageModule.outputs.storageAccountName
