param webAppName string
param location string 
param webAppSkuName string 


resource staticSite 'Microsoft.Web/staticSites@2023-01-01' = {
  name: webAppName
  location: location
  sku: {
    name: webAppSkuName
    tier: webAppSkuName
  }
  properties: {}
}
