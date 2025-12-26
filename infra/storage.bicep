param storageAccountName string
param location string = resourceGroup().location
param skuName string 
param kind string = 'StorageV2'

resource storage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: skuName
  }
  kind: kind
  properties: {}
}


output storageAccountId string = storage.id
output storageAccountName string = storage.name

