targetScope = 'subscription'

param AppName string
param location string
param storageSku string

// Generate names using string interpolation
var rgName = 'rg-${AppName}'
var storageName = 'storage${AppName}'

resource newrg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: rgName
  location: location
}

module storageModule './storage.bicep' = {
  name: 'storageModule'
  scope: newrg
  params: {
    storageAccountName: storageName
    location: location
    skuName: storageSku
  }
}

output storageId string = storageModule.outputs.storageAccountId
output storageName string = storageModule.outputs.storageAccountName
output resourceGroupName string = rgName
