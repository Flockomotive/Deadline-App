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

resource storageDeleteLock 'Microsoft.Authorization/locks@2020-05-01' = {
  name: 'lock-${storageAccountName}-CanNotDelete'
  scope: storage
  properties: {
    level: 'CanNotDelete'
    notes: 'Protect storage account from deletion.'
  }
}


