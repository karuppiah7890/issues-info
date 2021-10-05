https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1716

Public IP Related bug - https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1692

`azure/services/publicips`

`azure/services/publicips/publicips.go`

`azure/services/publicips/publicips_test.go`

`azure/services/publicips/client.go`

stuff

- Check existing tests for public IPs reconcile and delete
- Check existing code for public IPs reconcile and delete
- Check how existing async implementations have been done - for both reconcile and delete

---

Public IPs APIs

https://docs.microsoft.com/en-us/rest/api/virtualnetwork/public-ip-addresses

https://docs.microsoft.com/en-us/rest/api/virtualnetwork/public-ip-addresses/create-or-update - `CreateOrUpdate` used in the `azure/services/publicips/publicips.go` calls the create or update API which is a PUT call

---

Currently in `main` branch, only resource groups async implementation has been done and merged

https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1667

Others are being tracked here https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1702

Other open PRs for async implementation -

https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1686

https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1684

https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1697

https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1684

---

https://docs.microsoft.com/en-us/rest/api/virtualnetwork/public-ip-addresses/create-or-update

request body

```json
{
  "properties": {
    "publicIPAddressVersion": "IPv6",
    "publicIPAllocationMethod": "Static"
  },
  "sku": {
    "name": "Standard"
  },
  "location": "australiacentral"
}
```

request

```
PUT https://management.azure.com/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Network/publicIPAddresses/dummy?api-version=2021-03-01
Authorization: Bearer token
Content-type: application/json
```

response headers

```
azure-asyncnotification: Enabled
azure-asyncoperation: https://management.azure.com/subscriptions/dummy-subscription-id/providers/Microsoft.Network/locations/australiacentral/operations/5f301a6a-1a63-4c5f-bb42-06984c7a53a9?api-version=2021-03-01
cache-control: no-cache
content-length: 625
content-type: application/json; charset=utf-8
date: Wed, 29 Sep 2021 12:13:51 GMT
expires: -1
pragma: no-cache
retry-after: 1
server: Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0
strict-transport-security: max-age=31536000; includeSubDomains
x-ms-arm-service-request-id: 59a71b62-6856-438f-9f42-da82dd321a20
x-ms-correlation-request-id: ef03a177-ef72-4984-800e-10ed29a0e197
x-ms-ratelimit-remaining-subscription-writes: 1198
x-ms-request-id: 5f301a6a-1a63-4c5f-bb42-06984c7a53a9
x-ms-routing-request-id: SOUTHINDIA:20210929T121352Z:ef03a177-ef72-4984-800e-10ed29a0e197
```

response body

```json
{
  "name": "dummy",
  "id": "/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Network/publicIPAddresses/dummy",
  "etag": "W/\"e21efd54-147c-463e-905c-b69c43d61938\"",
  "location": "australiacentral",
  "properties": {
    "provisioningState": "Updating",
    "resourceGuid": "dummy-resource-group-id",
    "publicIPAddressVersion": "IPv6",
    "publicIPAllocationMethod": "Static",
    "idleTimeoutInMinutes": 4,
    "ipTags": []
  },
  "type": "Microsoft.Network/publicIPAddresses",
  "sku": {
    "name": "Standard",
    "tier": "Regional"
  }
}
```

---

https://docs.microsoft.com/en-us/rest/api/virtualnetwork/public-ip-addresses/get

request

```
GET https://management.azure.com/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Network/publicIPAddresses/dummy?api-version=2021-03-01
Authorization: Bearer token
```

response headers

```
cache-control: no-cache
content-type: application/json; charset=utf-8
date: Wed, 29 Sep 2021 12:18:25 GMT
etag: W/"1fa03bb7-1445-4eaa-8cb8-b2e2a6a754fa"
expires: -1
pragma: no-cache
server: Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0
strict-transport-security: max-age=31536000; includeSubDomains
x-ms-arm-service-request-id: 0324701a-7aa6-4d8a-99ad-3401e3d20731
x-ms-correlation-request-id: 5ec79c47-84bb-4944-b4f7-8f16f7fee737
x-ms-ratelimit-remaining-subscription-reads: 11998
x-ms-request-id: 8964f891-1480-4004-bfef-bd48e919f46b
x-ms-routing-request-id: WESTINDIA:20210929T121826Z:5ec79c47-84bb-4944-b4f7-8f16f7fee737
```

```json
{
  "name": "dummy",
  "id": "/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Network/publicIPAddresses/dummy",
  "etag": "W/\"1fa03bb7-1445-4eaa-8cb8-b2e2a6a754fa\"",
  "location": "australiacentral",
  "properties": {
    "provisioningState": "Succeeded",
    "resourceGuid": "dummy-resource-group-id",
    "ipAddress": "2603:1010:300::29",
    "publicIPAddressVersion": "IPv6",
    "publicIPAllocationMethod": "Static",
    "idleTimeoutInMinutes": 4,
    "ipTags": []
  },
  "type": "Microsoft.Network/publicIPAddresses",
  "sku": {
    "name": "Standard",
    "tier": "Regional"
  }
}
```

---

https://docs.microsoft.com/en-us/rest/api/virtualnetwork/public-ip-addresses/delete

request

```
DELETE https://management.azure.com/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Network/publicIPAddresses/dummy?api-version=2021-03-01
Authorization: Bearer token
```

response headers

```
azure-asyncnotification: Enabled
azure-asyncoperation: https://management.azure.com/subscriptions/dummy-subscription-id/providers/Microsoft.Network/locations/australiacentral/operations/6d78f11f-12aa-47f7-9a72-c14bd9b3adb9?api-version=2021-03-01
cache-control: no-cache
content-length: 0
date: Wed, 29 Sep 2021 12:31:42 GMT
expires: -1
location: https://management.azure.com/subscriptions/dummy-subscription-id/providers/Microsoft.Network/locations/australiacentral/operationResults/6d78f11f-12aa-47f7-9a72-c14bd9b3adb9?api-version=2021-03-01
pragma: no-cache
retry-after: 10
server: Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0
strict-transport-security: max-age=31536000; includeSubDomains
x-ms-arm-service-request-id: 16f327de-3369-467b-86f5-799701ee06fe
x-ms-correlation-request-id: 20c7ece1-8482-4968-9010-461a29ce03bb
x-ms-ratelimit-remaining-subscription-deletes: 14999
x-ms-request-id: 6d78f11f-12aa-47f7-9a72-c14bd9b3adb9
x-ms-routing-request-id: SOUTHINDIA:20210929T123143Z:20c7ece1-8482-4968-9010-461a29ce03bb
```

---

While deleting, the GET API returned this

request

```
GET https://management.azure.com/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Network/publicIPAddresses/dummy?api-version=2021-03-01
Authorization: Bearer token
```

response header

```
cache-control: no-cache
content-type: application/json; charset=utf-8
date: Wed, 29 Sep 2021 12:31:50 GMT
etag: W/"463ab6f6-6992-42b2-947f-dd42c327e7bb"
expires: -1
pragma: no-cache
server: Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0
strict-transport-security: max-age=31536000; includeSubDomains
x-ms-arm-service-request-id: 83e81b29-bf4a-4ec7-afeb-402aa4281748
x-ms-correlation-request-id: 204a9874-b436-44ca-8eea-2e9409fef119
x-ms-ratelimit-remaining-subscription-reads: 11997
x-ms-request-id: 6b26c227-98aa-4a66-a918-aa6fa92561fb
x-ms-routing-request-id: SOUTHINDIA:20210929T123151Z:204a9874-b436-44ca-8eea-2e9409fef119
```

response body with 200 OK

```json
{
  "name": "dummy",
  "id": "/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Network/publicIPAddresses/dummy",
  "etag": "W/\"463ab6f6-6992-42b2-947f-dd42c327e7bb\"",
  "location": "australiacentral",
  "properties": {
    "provisioningState": "Deleting",
    "resourceGuid": "dummy-resource-group-id",
    "ipAddress": "2603:1010:300::29",
    "publicIPAddressVersion": "IPv6",
    "publicIPAllocationMethod": "Static",
    "idleTimeoutInMinutes": 4,
    "ipTags": []
  },
  "type": "Microsoft.Network/publicIPAddresses",
  "sku": {
    "name": "Standard",
    "tier": "Regional"
  }
}
```

After deletion was complete, GET API -

request

```
GET https://management.azure.com/subscriptions/87fbb054-796e-47cc-a777-c7a052901de1/resourceGroups/dummy/providers/Microsoft.Network/publicIPAddresses/dummy?api-version=2021-03-01
Authorization: Bearer token
```

response headers

```
cache-control: no-cache
content-length: 218
content-type: application/json; charset=utf-8
expires: -1
pragma: no-cache
x-ms-correlation-request-id: 1a94aed5-b960-40a5-9987-e5231008f28e
x-ms-failure-cause: gateway
x-ms-request-id: 1a94aed5-b960-40a5-9987-e5231008f28e
x-ms-routing-request-id: SOUTHINDIA:20210929T131513Z:1a94aed5-b960-40a5-9987-e5231008f28e
```

response body with 404 Not Found

```json
{
  "error": {
    "code": "ResourceNotFound",
    "message": "The Resource 'Microsoft.Network/publicIPAddresses/dummy' under resource group 'dummy' was not found. For more details please go to https://aka.ms/ARMResourceNotFoundFix"
  }
}
```

---

publicips `Reconcile` and `Delete` methods are being used in

- `controllers/azurecluster_reconciler.go`
- `controllers/azuremachine_reconciler.go`

I need to implement a spec for publicips similar to resource groups

I need to implement

```go
// ResourceSpecGetter is an interface for getting all the required information to create/update/delete an Azure resource.
type ResourceSpecGetter interface {
	// ResourceName returns the name of the resource.
	ResourceName() string
	// OwnerResourceName returns the name of the resource that owns the resource
	// in the case that the resource is an Azure subresource.
	OwnerResourceName() string
	// ResourceGroupName returns the name of the resource group the resource is in.
	ResourceGroupName() string
	// Parameters takes the existing resource and returns the desired parameters of the resource.
	// If the resource does not exist, or we do not care about existing parameters to update the resource, existing should be nil.
	// If no update is needed on the resource, Parameters should return nil.
	Parameters(existing interface{}) (interface{}, error)
}
```

I'm wondering if there's any owner resource for the public IPs. I don't think so, I mean, I don't know if there's any Azure resource to which Public IPs is a sub resource. And I'm wondering how the existing is passed in and if we really need to do any updates when there's any updates - as from what I see there's not much one can update. I still need to thoroughly check all the fields that can be mutated in the public IP specs field

https://duckduckgo.com/?t=ffab&q=azure+subresource&ia=web

Another interesting thing I noticed is Public IPs create or update API response codes list does not mention any asynchronous operation, though the response body has a provisioning state value, which can be `Updating`

https://docs.microsoft.com/en-us/rest/api/virtualnetwork/public-ip-addresses/create-or-update#response - only 200 and 201

But in delete response code list mentions about asynchronous operation

https://docs.microsoft.com/en-us/rest/api/virtualnetwork/public-ip-addresses/delete#response - there's a 202 accepted, which tells the operation is asynchronous

But in API, create or update public IP API returns a future! Route table from this PR https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1686 also uses the future from the API though the route table create or update API response code list does not mention about any asynchronous operation

https://duckduckgo.com/?t=ffab&q=route+table+azure+api&ia=web

https://docs.microsoft.com/en-us/rest/api/virtualnetwork/route-tables

https://docs.microsoft.com/en-us/rest/api/virtualnetwork/route-tables/create-or-update#response

I guess it's fast but maybe not too fast. Not sure though

---

- Convert Public IPs `Reconcile` method to use async package. Add tests
  - Add tests before, or maybe later, as we need mocks and different test cases, which we will get to know only based on some small implementation details
- Convert Public IPs `Delete` method to use async package. Add tests
  - Add tests before, or maybe later, as we need mocks and different test cases, which we will get to know only based on some small implementation details

Unlike many other resources, Public IPs resource has multiple Public IP specs in the form of a list. We have to create each of those Public IPs. But as a whole, we consider the whole list of Public IPs to be created as an async operation. Or we can create each Public IP in an async manner. Why? Because for resource name for the async operation, we need one name, and there's no name for all the Public IPs list put together. But there is a name for each Public IP! Also, since each `async.CreateResource` handles only one future, we can only create one Public IP per `async.CreateResource` call, because for creating multiple Public IPs, we would have to store multiple futures and process them under a given resource name, and that's not possible with one `async.CreateResource` call

---

Low Level stuff

- Write tests for publicips reconcile - with async flow
  - Write mocks
- Implement async methods with no code in it to fix the tests

What about tests for publicips client.go? Hmm. There's not much processing in it, but still, there's some processing, hmm

We might have to write just one test for publcips client.go for reconcile - as part of creation

---

```go
s.Scope.V(2).Info("creating public IP", "public ip", ip.Name)

// only set DNS properties if there is a DNS name specified
addressVersion := network.IPVersionIPv4
if ip.IsIPv6 {
  addressVersion = network.IPVersionIPv6
}

// only set DNS properties if there is a DNS name specified
var dnsSettings *network.PublicIPAddressDNSSettings
if ip.DNSName != "" {
  dnsSettings = &network.PublicIPAddressDNSSettings{
    DomainNameLabel: to.StringPtr(strings.Split(ip.DNSName, ".")[0]),
    Fqdn:            to.StringPtr(ip.DNSName),
  }
}

err := s.Client.CreateOrUpdate(
  ctx,
  s.Scope.ResourceGroup(),
  ip.Name,
  network.PublicIPAddress{
    Tags: converters.TagsToMap(infrav1.Build(infrav1.BuildParams{
      ClusterName: s.Scope.ClusterName(),
      Lifecycle:   infrav1.ResourceLifecycleOwned,
      Name:        to.StringPtr(ip.Name),
      Additional:  s.Scope.AdditionalTags(),
    })),
    Sku:      &network.PublicIPAddressSku{Name: network.PublicIPAddressSkuNameStandard},
    Name:     to.StringPtr(ip.Name),
    Location: to.StringPtr(s.Scope.Location()),
    PublicIPAddressPropertiesFormat: &network.PublicIPAddressPropertiesFormat{
      PublicIPAddressVersion:   addressVersion,
      PublicIPAllocationMethod: network.IPAllocationMethodStatic,
      DNSSettings:              dnsSettings,
    },
    Zones: to.StringSlicePtr(s.Scope.FailureDomains()),
  },
)

if err != nil {
  return errors.Wrap(err, "cannot create public IP")
}

s.Scope.V(2).Info("successfully created public IP", "public ip", ip.Name)
```

```go
s.ResourceGroup().AnyTimes().Return("my-rg")
s.ClusterName().AnyTimes().Return("my-cluster")
s.AdditionalTags().AnyTimes().Return(infrav1.Tags{})
s.Location().AnyTimes().Return("testlocation")
s.FailureDomains().AnyTimes().Return([]string{"1,2,3"})
```

```go
ipSpec1 := azure.PublicIPSpec{
  Name:    "my-publicip",
  DNSName: "fakedns.mydomain.io",
}
ipSpec2 := azure.PublicIPSpec{
  Name:    "my-publicip-2",
  DNSName: "fakedns2-52959.uksouth.cloudapp.azure.com",
}
ipSpec3 := azure.PublicIPSpec{
  Name: "my-publicip-3",
}
ipSpec4 := azure.PublicIPSpec{
  Name:    "my-publicip-ipv6",
  IsIPv6:  true,
  DNSName: "fakename.mydomain.io",
}
```

```go
gomock.InOrder(
m.CreateOrUpdate(gomockinternal.AContext(), "my-rg", "my-publicip", gomockinternal.DiffEq(network.PublicIPAddress{
  Name:     to.StringPtr("my-publicip"),
  Sku:      &network.PublicIPAddressSku{Name: network.PublicIPAddressSkuNameStandard},
  Location: to.StringPtr("testlocation"),
  Tags: map[string]*string{
    "Name": to.StringPtr("my-publicip"),
    "sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster": to.StringPtr("owned"),
  },
  PublicIPAddressPropertiesFormat: &network.PublicIPAddressPropertiesFormat{
    PublicIPAddressVersion:   network.IPVersionIPv4,
    PublicIPAllocationMethod: network.IPAllocationMethodStatic,
    DNSSettings: &network.PublicIPAddressDNSSettings{
      DomainNameLabel: to.StringPtr("fakedns"),
      Fqdn:            to.StringPtr("fakedns.mydomain.io"),
    },
  },
  Zones: to.StringSlicePtr([]string{"1,2,3"}),
})).Times(1),
m.CreateOrUpdate(gomockinternal.AContext(), "my-rg", "my-publicip-2", gomockinternal.DiffEq(network.PublicIPAddress{
  Name:     to.StringPtr("my-publicip-2"),
  Sku:      &network.PublicIPAddressSku{Name: network.PublicIPAddressSkuNameStandard},
  Location: to.StringPtr("testlocation"),
  Tags: map[string]*string{
    "Name": to.StringPtr("my-publicip-2"),
    "sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster": to.StringPtr("owned"),
  },
  PublicIPAddressPropertiesFormat: &network.PublicIPAddressPropertiesFormat{
    PublicIPAddressVersion:   network.IPVersionIPv4,
    PublicIPAllocationMethod: network.IPAllocationMethodStatic,
    DNSSettings: &network.PublicIPAddressDNSSettings{
      DomainNameLabel: to.StringPtr("fakedns2-52959"),
      Fqdn:            to.StringPtr("fakedns2-52959.uksouth.cloudapp.azure.com"),
    },
  },
  Zones: to.StringSlicePtr([]string{"1,2,3"}),
})).Times(1),
m.CreateOrUpdate(gomockinternal.AContext(), "my-rg", "my-publicip-3", gomockinternal.DiffEq(network.PublicIPAddress{
  Name:     to.StringPtr("my-publicip-3"),
  Sku:      &network.PublicIPAddressSku{Name: network.PublicIPAddressSkuNameStandard},
  Location: to.StringPtr("testlocation"),
  Tags: map[string]*string{
    "Name": to.StringPtr("my-publicip-3"),
    "sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster": to.StringPtr("owned"),
  },
  PublicIPAddressPropertiesFormat: &network.PublicIPAddressPropertiesFormat{
    PublicIPAddressVersion:   network.IPVersionIPv4,
    PublicIPAllocationMethod: network.IPAllocationMethodStatic,
  },
  Zones: to.StringSlicePtr([]string{"1,2,3"}),
})).Times(1),
m.CreateOrUpdate(gomockinternal.AContext(), "my-rg", "my-publicip-ipv6", gomockinternal.DiffEq(network.PublicIPAddress{
  Name:     to.StringPtr("my-publicip-ipv6"),
  Sku:      &network.PublicIPAddressSku{Name: network.PublicIPAddressSkuNameStandard},
  Location: to.StringPtr("testlocation"),
  Tags: map[string]*string{
    "Name": to.StringPtr("my-publicip-ipv6"),
    "sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster": to.StringPtr("owned"),
  },
  PublicIPAddressPropertiesFormat: &network.PublicIPAddressPropertiesFormat{
    PublicIPAddressVersion:   network.IPVersionIPv6,
    PublicIPAllocationMethod: network.IPAllocationMethodStatic,
    DNSSettings: &network.PublicIPAddressDNSSettings{
      DomainNameLabel: to.StringPtr("fakename"),
      Fqdn:            to.StringPtr("fakename.mydomain.io"),
    },
  },
  Zones: to.StringSlicePtr([]string{"1,2,3"}),
})).Times(1),
```

```go
"cannot create public IP: #: Internal Server Error: StatusCode=500"
```

```go
s.PublicIPSpecs().Return([]azure.PublicIPSpec{
  {
    Name:    "my-publicip",
    DNSName: "fakedns.mydomain.io",
  },
})
s.ResourceGroup().AnyTimes().Return("my-rg")
s.ClusterName().AnyTimes().Return("my-cluster")
s.AdditionalTags().AnyTimes().Return(infrav1.Tags{})
s.Location().AnyTimes().Return("testlocation")
s.FailureDomains().Times(1)
m.CreateOrUpdate(gomockinternal.AContext(), "my-rg", "my-publicip", gomock.AssignableToTypeOf(network.PublicIPAddress{})).Return(autorest.NewErrorWithResponse("", "", &http.Response{StatusCode: 500}, "Internal Server Error"))
```

---

Low level stuff

- Check how other resources manage status for multiple resources / specs similar to public IPs? For example Network Security Groups has multiple specs in a reconcile - https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1684/files `azure/services/securitygroups/securitygroups.go` - [DONE]

---

```bash
Running tool: /usr/local/bin/go test -timeout 30s -run ^TestReconcilePublicIP$ sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips

I0930 18:20:35.653883    2663 async.go:76]  "msg"="creating resource"  "resource"="my-publicip" "resourceGroup"="test-group" "service"="publicips"
I0930 18:20:35.654112    2663 async.go:91]  "msg"="successfully created resource"  "resource"="my-publicip" "resourceGroup"="test-group" "service"="publicips"
I0930 18:20:35.654130    2663 async.go:76]  "msg"="creating resource"  "resource"="my-publicip-ipv6" "resourceGroup"="test-group" "service"="publicips"
I0930 18:20:35.654146    2663 async.go:91]  "msg"="successfully created resource"  "resource"="my-publicip-ipv6" "resourceGroup"="test-group" "service"="publicips"
--- FAIL: TestReconcilePublicIP (0.00s)
    --- FAIL: TestReconcilePublicIP/first_public_IP_creation_fails (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/publicips/publicips_test.go:98: wrong type of argument 0 to Return for *mock_publicips.MockClient.CreateOrUpdateAsync: *errors.errorString is not assignable to azure.FutureAPI [/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/publicips/publicips_test.go:98]
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/publicips/controller.go:266: missing call(s) to *mock_publicips.MockPublicIPScope.PublicIPSpecs() /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/publicips/publicips_test.go:92
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/publicips/controller.go:266: missing call(s) to *mock_publicips.MockPublicIPScope.GetLongRunningOperationState(is equal to my-publicip, is equal to publicips) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/publicips/publicips_test.go:97
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/publicips/controller.go:266: missing call(s) to *mock_publicips.MockClient.CreateOrUpdateAsync(expected a context.Context, but got <nil>, is equal to {my-publicip fakedns.mydomain.io false test-group}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/publicips/publicips_test.go:98
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/publicips/controller.go:266: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips	0.541s
FAIL
```

---

[TODO]

Level 1

- Check existing tests for public IPs reconcile and delete
- Check existing code for public IPs reconcile and delete
- Check how existing async implementations have been done - for both reconcile and delete
- Make public IPs reconcile / delete async

Level 2

- Convert Public IPs `Reconcile` method to use async package. Add tests
  - Add tests before, or maybe later, as we need mocks and different test cases, which we will get to know only based on some small implementation details
- Convert Public IPs `Delete` method to use async package. Add tests
  - Add tests before, or maybe later, as we need mocks and different test cases, which we will get to know only based on some small implementation details

Level 3

- Write tests for publicips reconcile - with async flow [DONE]
  - Write mocks [DONE]
- Implement async methods with no code in it to fix the tests [DONE]

Level 4

- Write tests for `azure/services/publicips/client.go` as all the code from `azure/services/publicips/publicips.go` moved to `azure/services/publicips/client.go`. Use Azure API Client mock to get help with the testing. Test file - `azure/services/publicips/client_test.go`. The test would look similar to the old tests of `azure/services/publicips/publicips_test.go` testing some of the old features of `azure/services/publicips/publicips.go` which are gonna be in `azure/services/publicips/client.go`. Couldn't write the test with mocks. So leaving this out. [DONE] Could have used some sort of library to capture HTTP client requests using actual server or just mocking libraries like gock https://github.com/h2non/gock . But not doing that for now. Not sure how many API calls the code would make, have to mock them all or at least ignore them even if captured. Will check it out later! [DONE]
- Implement the `CreateOrUpdateAsync` in `azure/services/publicips/client.go` - don't handle updates. Put a TODO for now. [DONE]
- Implement the `IsDone` in `azure/services/publicips/client.go` [DONE]
- Implement the `Parameters` in `azure/publicip_spec.go` - leave out returning a value when existing value is there [DONE]
- Add test for `PublicIPSpecs` implemented in `azure/scope/cluster.go`, in `azure/scope/cluster_test.go`. There are no tests for it as of now and it has too much logic! [DONE]

- Discuss about how and what kind of updates we would do when public IP specs change. I mean, there are only a few fields in the public IP spec that are possibly mutable - name and resource group are immutable, so remaining is DNS Name and isIPv6. I doubt if we can change an IPv4 public IP to IPv6 - I mean, even if the Azure API allows, that's still a big change, like major, huge! And a breaking change too I think. So, I doubt if that's okay and allowed. Gotta check the webhooks and the validation fields to see if the mutation is allowed based on how the boolean is set
- Check if the tests `TestDeletePublicIP` and `TestReconcilePublicIP` can run in parallel. I can see their sub tests can run in parallel among the respective subtests. Wondering if we need to put a `t.Parallel` at the top level too so that the top level tests are also triggered simultaneously. Gotta check more on it if there are downsides to not putting `t.Parallel` at the top level / upsides to putting `t.Parallel` at the top level

Level 5

- Fix test errors in `azure/services/bastionhosts/bastionhosts_test.go` - it's due to renaming of publicips client `CreateOrUpdate` method to `CreateOrUpdateAsync` method. Not sure where the old method was getting called as part of `azure/services/bastionhosts/bastionhosts.go`'s `Reconcile` method. Gotta dig in. In `main` also there's no create or update calls in the actual code, just in test. In `main`, commenting out the expectation done using mock method calls still passes the tests. It's weird. Some of them have to fail and fail with proper error. It's weird, gotta dig in and understand what's going on. Branch `remove-unnecessary-method-call-expectations-from-bastion-host-test`

Level 6

- Fix the `TODO(karuppiah7890)` todos wherever and whenever possible. Prioritize though

---

Maybe just write one test in `azure/services/publicips/client_test.go` which checks if the wiring up is all good - Couldn't do this

Write many tests in `spec_test.go` for `Parameters` method as that's where a lot of logic would go in! The tests from `azure/services/publicips/publicips_test.go` for different small logic should go in there, for configuring public ip spec to a azure resource [DONE]

---

https://duckduckgo.com/?t=ffab&q=http+mock+golang&ia=web

https://github.com/jarcoal/httpmock

https://github.com/search?utf8=%E2%9C%93&q=http%20mock%20golang

https://duckduckgo.com/?t=ffab&q=gomock&ia=web

https://duckduckgo.com/?t=ffab&q=gock+golang&ia=web

https://github.com/h2non/gock

---

https://duckduckgo.com/?t=ffab&q=gomega+matchers&ia=images

https://onsi.github.io/gomega/

https://onsi.github.io/gomega/#adding-your-own-matchers

https://duckduckgo.com/?t=ffab&q=golang+gomega+compare+slices+without+order+of+elements&ia=web&iax=qa

https://onsi.github.io/gomega/#consistofelement-interface

https://duckduckgo.com/?t=ffab&q=golang+spread+slice&ia=web

https://duckduckgo.com/?q=golang+gomega+gstruct&t=ffab&ia=web

https://pkg.go.dev/github.com/onsi/gomega/gstruct

https://duckduckgo.com/?t=ffab&q=azure+bastion&ia=web

https://azure.microsoft.com/en-us/services/azure-bastion/

---

[TODO] Make `Delete` async

- Add a time out in the publicips `Delete` method. [DONE]

```go
ctx, cancel := context.WithTimeout(ctx, reconciler.DefaultAzureServiceReconcileTimeout)
defer cancel()
```

- Write tests for `Delete` method in `azure/services/publicips/publicips_test.go` and write the code in `azure/services/publicips/publicips.go` `Delete` method


---

It's interesting to see how an Azure cluster is deleted in the Azure cluster reconciler - it's the same way how I have tried to cleanup clusters in test automation scripts - simply delete the Azure resource group containing all the resources of the cluster. The only tricky thing is - if the resource group is not managed, then we will have to delete each cluster resource one by one - why? Because the resource group may have extra resources which are not managed by capz and are used by other entities (humans, other systems) and if capz deletes the unmanaged resource group, then it will delete everything - the capz managed cluster and everything in the resource group. So that's why we need to delete every cluster resource one by one when resource group is not managed

Best thing - deleting a resource group automatically deletes all the resources in it - Azure takes care of it. Kubernetes also does this - When a Kubernetes namespace is deleted, all the resources in it are also deleted ! :D

---

```go
// Delete deletes the public IP with the provided scope.
func (s *Service) Delete(ctx context.Context) error {
	ctx, _, done := tele.StartSpanWithLogger(ctx, "publicips.Service.Delete")
	defer done()

	ctx, cancel := context.WithTimeout(ctx, reconciler.DefaultAzureServiceReconcileTimeout)
	defer cancel()

	for _, ip := range s.Scope.PublicIPSpecs() {
		managed, err := s.isIPManaged(ctx, ip.Name)
		if err != nil && !azure.ResourceNotFound(err) {
			return errors.Wrap(err, "could not get public IP management state")
		}

		if !managed {
			s.Scope.V(2).Info("Skipping IP deletion for unmanaged public IP", "public ip", ip.Name)
			continue
		}

		s.Scope.V(2).Info("deleting public IP", "public ip", ip.Name)
		err = s.Client.Delete(ctx, s.Scope.ResourceGroup(), ip.Name)
		if err != nil && azure.ResourceNotFound(err) {
			// already deleted
			continue
		}
		if err != nil {
			return errors.Wrapf(err, "failed to delete public IP %s in resource group %s", ip.Name, s.Scope.ResourceGroup())
		}

		s.Scope.V(2).Info("deleted public IP", "public ip", ip.Name)
	}
	return nil
}
```

```go
func TestDeletePublicIP(t *testing.T) {
	testcases := []struct {
		name          string
		expectedError string
		expect        func(s *mock_publicips.MockPublicIPScopeMockRecorder, m *mock_publicips.MockClientMockRecorder)
	}{
		{
			name:          "successfully delete two existing public IP",
			expectedError: "",
			expect: func(s *mock_publicips.MockPublicIPScopeMockRecorder, m *mock_publicips.MockClientMockRecorder) {
				s.V(gomock.AssignableToTypeOf(2)).AnyTimes().Return(klogr.New())
				s.PublicIPSpecs().Return([]publicips.PublicIPSpec{
					{
						Name: "my-publicip",
					},
					{
						Name: "my-publicip-2",
					},
				})
				s.ResourceGroup().AnyTimes().Return("my-rg")
				s.ClusterName().AnyTimes().Return("my-cluster")
				m.Get(gomockinternal.AContext(), "my-rg", "my-publicip").Return(network.PublicIPAddress{
					Name: to.StringPtr("my-publicip"),
					Tags: map[string]*string{
						"sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster": to.StringPtr("owned"),
						"foo": to.StringPtr("bar"),
					},
				}, nil)
				m.Delete(gomockinternal.AContext(), "my-rg", "my-publicip")
				m.Get(gomockinternal.AContext(), "my-rg", "my-publicip-2").Return(network.PublicIPAddress{
					Name: to.StringPtr("my-publicip-2"),
					Tags: map[string]*string{
						"sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster": to.StringPtr("owned"),
						"foo": to.StringPtr("buzz"),
					},
				}, nil)
				m.Delete(gomockinternal.AContext(), "my-rg", "my-publicip-2")
			},
		},
		{
			name:          "public ip already deleted",
			expectedError: "",
			expect: func(s *mock_publicips.MockPublicIPScopeMockRecorder, m *mock_publicips.MockClientMockRecorder) {
				s.V(gomock.AssignableToTypeOf(2)).AnyTimes().Return(klogr.New())
				s.PublicIPSpecs().Return([]publicips.PublicIPSpec{
					{
						Name: "my-publicip",
					},
					{
						Name: "my-publicip-2",
					},
				})
				s.ResourceGroup().AnyTimes().Return("my-rg")
				s.ClusterName().AnyTimes().Return("my-cluster")
				m.Get(gomockinternal.AContext(), "my-rg", "my-publicip").Return(network.PublicIPAddress{}, autorest.NewErrorWithResponse("", "", &http.Response{StatusCode: 404}, "Not found"))
				m.Get(gomockinternal.AContext(), "my-rg", "my-publicip-2").Return(network.PublicIPAddress{
					Name: to.StringPtr("my-public-ip-2"),
					Tags: map[string]*string{
						"sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster": to.StringPtr("owned"),
						"foo": to.StringPtr("buzz"),
					},
				}, nil)
				m.Delete(gomockinternal.AContext(), "my-rg", "my-publicip-2")
			},
		},
		{
			name:          "public ip deletion fails",
			expectedError: "failed to delete public IP my-publicip in resource group my-rg: #: Internal Server Error: StatusCode=500",
			expect: func(s *mock_publicips.MockPublicIPScopeMockRecorder, m *mock_publicips.MockClientMockRecorder) {
				s.V(gomock.AssignableToTypeOf(2)).AnyTimes().Return(klogr.New())
				s.PublicIPSpecs().Return([]publicips.PublicIPSpec{
					{
						Name: "my-publicip",
					},
				})
				s.ResourceGroup().AnyTimes().Return("my-rg")
				s.ClusterName().AnyTimes().Return("my-cluster")
				m.Get(gomockinternal.AContext(), "my-rg", "my-publicip").Return(network.PublicIPAddress{
					Name: to.StringPtr("my-publicip"),
					Tags: map[string]*string{
						"sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster": to.StringPtr("owned"),
						"foo": to.StringPtr("bar"),
					},
				}, nil)
				m.Delete(gomockinternal.AContext(), "my-rg", "my-publicip").
					Return(autorest.NewErrorWithResponse("", "", &http.Response{StatusCode: 500}, "Internal Server Error"))
			},
		},
		{
			name:          "skip unmanaged public ip deletion",
			expectedError: "",
			expect: func(s *mock_publicips.MockPublicIPScopeMockRecorder, m *mock_publicips.MockClientMockRecorder) {
				s.V(gomock.AssignableToTypeOf(2)).AnyTimes().Return(klogr.New())
				s.PublicIPSpecs().Return([]publicips.PublicIPSpec{
					{
						Name: "my-publicip",
					},
					{
						Name: "my-publicip-2",
					},
				})
				s.ResourceGroup().AnyTimes().Return("my-rg")
				s.ClusterName().AnyTimes().Return("my-cluster")
				m.Get(gomockinternal.AContext(), "my-rg", "my-publicip").Return(network.PublicIPAddress{
					Name: to.StringPtr("my-public-ip"),
					Tags: map[string]*string{
						"foo": to.StringPtr("bar"),
					},
				}, nil)
				m.Get(gomockinternal.AContext(), "my-rg", "my-publicip-2").Return(network.PublicIPAddress{
					Name: to.StringPtr("my-publicip-2"),
					Tags: map[string]*string{
						"sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster": to.StringPtr("owned"),
						"foo": to.StringPtr("buzz"),
					},
				}, nil)
				m.Delete(gomockinternal.AContext(), "my-rg", "my-publicip-2")
			},
		},
	}

	for _, tc := range testcases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			g := NewWithT(t)

			t.Parallel()
			mockCtrl := gomock.NewController(t)
			defer mockCtrl.Finish()
			scopeMock := mock_publicips.NewMockPublicIPScope(mockCtrl)
			clientMock := mock_publicips.NewMockClient(mockCtrl)

			tc.expect(scopeMock.EXPECT(), clientMock.EXPECT())

			s := &publicips.Service{
				Scope:  scopeMock,
				Client: clientMock,
			}

			err := s.Delete(context.TODO())
			if tc.expectedError != "" {
				g.Expect(err).To(HaveOccurred())
				g.Expect(err).To(MatchError(tc.expectedError))
			} else {
				g.Expect(err).NotTo(HaveOccurred())
			}
		})
	}
}
```

---

Different error scenarios for `Delete` in public ips service, within it's computation
- Error while getting management state of the public ip
  - resource not found error [DONE]
  - some error, but not resource-not-found [DONE]
- Error while deleting the public ip - some error, but NOT operation-not-done error / deletion-in-progress error
  - what if multiple of these errors occur?
- Other scenarios
  - Deletion of public ip in progress, which also comes up as an error
- Mix of non operation-not-done and operation-not-done errors occur

---

https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/main/docs/proposals/20210716-async-azure-resource-creation-deletion.md

---

[TODO]

Update details about PR
- What changes it has
- The TODOs it has
- Questions

Testing
- Run build, test, verify etc similar to #1696 PR tests and check if everything is good to go

---

Run
- `make test`
- `make verify`
- Check more at https://capz.sigs.k8s.io/developers/jobs.html or https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/main/docs/book/src/developers/jobs.md


---

```bash
cluster-api-provider-azure $ make go-test
echo /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4
go test ./...
?   	sigs.k8s.io/cluster-api-provider-azure	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/api/v1alpha3	41.472s
ok  	sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4	5.694s
ok  	sigs.k8s.io/cluster-api-provider-azure/azure	1.875s
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/converters	1.673s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/mock_azure	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/scope	2.675s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/scope/mocks	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/scope/strategies/machinepool_deployments	2.145s
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/agentpools	1.885s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/agentpools/mock_agentpools	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/async	1.768s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/async/mock_async	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/availabilitysets	2.324s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/availabilitysets/mock_availabilitysets	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts	3.177s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts/mocks_bastionhosts	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/disks	3.092s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/disks/mock_disks	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/groups	3.497s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/groups/mock_groups	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/inboundnatrules	3.448s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/inboundnatrules/mock_inboundnatrules	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/loadbalancers	3.856s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/loadbalancers/mock_loadbalancers	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/managedclusters	2.743s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/managedclusters/mock_managedclusters	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/natgateways	2.137s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/natgateways/mock_natgateways	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/networkinterfaces	2.409s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/networkinterfaces/mock_networkinterfaces	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/privatedns	2.759s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/privatedns/mock_privatedns	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips	3.099s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips/mock_publicips	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/resourceskus	3.036s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/resourceskus/mock_resourceskus	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/roleassignments	3.026s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/roleassignments/mock_roleassignments	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/routetables	2.847s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/routetables/mock_routetables	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesets	2.850s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesets/mock_scalesets	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesetvms	2.561s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesetvms/mock_scalesetvms	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/securitygroups	2.714s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/securitygroups/mock_securitygroups	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/subnets	2.852s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/subnets/mock_subnets	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	3.011s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags/mock_tags	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualmachines	2.771s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualmachines/mock_virtualmachines	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualnetworks	2.836s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualnetworks/mock_virtualnetworks	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmextensions	3.026s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmextensions/mock_vmextensions	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmssextensions	2.882s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmssextensions/mock_vmssextensions	[no test files]
I1004 23:20:48.129422   61108 azuremachine_controller.go:249]  "msg"="Reconciling AzureMachine"  
I1004 23:20:48.129917   61108 azuremachine_controller.go:264]  "msg"="Cluster infrastructure is not ready yet"  
I1004 23:20:48.130045   61108 azuremachine_controller.go:249]  "msg"="Reconciling AzureMachine"  
I1004 23:20:48.130315   61108 azuremachine_controller.go:271]  "msg"="Bootstrap data secret reference is not yet available"  
2021-10-04T23:20:48.135+0530	INFO	azurecluster-resource	default	{"name": "foo"}
Running Suite: Controller Suite
===============================
Random Seed: 1633369848
Will run 4 of 4 specs

2021-10-04T23:20:48.139+0530	DEBUG	controller-runtime.test-env	starting control plane
2021-10-04T23:20:49.309+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 0, "error": "timeout waiting for process kube-apiserver to start successfully (it may have failed to start, or stopped unexpectedly before becoming ready)"}
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/Users/karuppiahn/.go/src/reflect/value.go:476
reflect.Value.Call
	/Users/karuppiahn/.go/src/reflect/value.go:337
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-10-04T23:20:49.589+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 1, "error": "timeout waiting for process kube-apiserver to start successfully (it may have failed to start, or stopped unexpectedly before becoming ready)"}
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/Users/karuppiahn/.go/src/reflect/value.go:476
reflect.Value.Call
	/Users/karuppiahn/.go/src/reflect/value.go:337
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-10-04T23:20:49.757+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 2, "error": "timeout waiting for process kube-apiserver to start successfully (it may have failed to start, or stopped unexpectedly before becoming ready)"}
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/Users/karuppiahn/.go/src/reflect/value.go:476
reflect.Value.Call
	/Users/karuppiahn/.go/src/reflect/value.go:337
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-10-04T23:20:49.930+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 3, "error": "timeout waiting for process kube-apiserver to start successfully (it may have failed to start, or stopped unexpectedly before becoming ready)"}
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/Users/karuppiahn/.go/src/reflect/value.go:476
reflect.Value.Call
	/Users/karuppiahn/.go/src/reflect/value.go:337
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-10-04T23:20:50.121+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 4, "error": "timeout waiting for process kube-apiserver to start successfully (it may have failed to start, or stopped unexpectedly before becoming ready)"}
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/Users/karuppiahn/.go/src/reflect/value.go:476
reflect.Value.Call
	/Users/karuppiahn/.go/src/reflect/value.go:337
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
STEP: bootstrapping test environment
Panic [1.982 seconds]
[BeforeSuite] BeforeSuite 
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:49

  Test Panicked
  unable to start control plane itself: failed to start the controlplane. retried 5 times: timeout waiting for process kube-apiserver to start successfully (it may have failed to start, or stopped unexpectedly before becoming ready)
  /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105

  Full Stack Trace
  sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment(0x2b6fb0a)
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105 +0x3f7
  sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4(0xc0005b6360)
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51 +0x5e
  reflect.Value.call(0x282f980, 0x2c319f8, 0x13, 0x2b46e1b, 0x4, 0xc000091f58, 0x1, 0x1, 0x0, 0x0, ...)
  	/Users/karuppiahn/.go/src/reflect/value.go:476 +0x8e7
  reflect.Value.Call(0x282f980, 0x2c319f8, 0x13, 0xc000082f58, 0x1, 0x1, 0x0, 0x0, 0x0)
  	/Users/karuppiahn/.go/src/reflect/value.go:337 +0xb9
  github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1(0xc0005b6360)
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49 +0x15a
  github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1(0xc000415440, 0xc0005b6360)
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86 +0x74
  created by github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:71 +0xa5
------------------------------


Ran 4 of 0 Specs in 1.982 seconds
FAIL! -- 0 Passed | 4 Failed | 0 Pending | 0 Skipped
You're using deprecated Ginkgo functionality:
=============================================
Ginkgo 2.0 is under active development and will introduce (a small number of) breaking changes.
To learn more, view the migration guide at https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md
To comment, chime in at https://github.com/onsi/ginkgo/issues/711

  You are passing a Done channel to a test node to test asynchronous behavior.  This is deprecated in Ginkgo V2.  Your test will run synchronously and the timeout will be ignored.
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-async-testing
    /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:49
  You are using a custom reporter.  Support for custom reporters will likely be removed in V2.  Most users were using them to generate junit or teamcity reports and this functionality will be merged into the core reporter.  In addition, Ginkgo 2.0 will support emitting a JSON-formatted report that users can then manipulate to generate custom reports.

  If this change will be impactful to you please leave a comment on https://github.com/onsi/ginkgo/issues/711
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-custom-reporters

To silence deprecations that can be silenced set the following environment variable:
  ACK_GINKGO_DEPRECATIONS=1.16.4

--- FAIL: TestAPIs (1.98s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/controllers	4.772s
?   	sigs.k8s.io/cluster-api-provider-azure/exp	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/exp/api/v1alpha3	20.282s
ok  	sigs.k8s.io/cluster-api-provider-azure/exp/api/v1alpha4	5.613s
Running Suite: Controller Suite
===============================
Random Seed: 1633369849
Will run 2 of 2 specs

STEP: bootstrapping test environment
Panic [2.065 seconds]
[BeforeSuite] BeforeSuite 
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/exp/controllers/suite_test.go:50

  Test Panicked
  unable to start control plane itself: failed to start the controlplane. retried 5 times: timeout waiting for process kube-apiserver to start successfully (it may have failed to start, or stopped unexpectedly before becoming ready)
  /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105

  Full Stack Trace
  sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment(0x2c212bc)
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105 +0x3f7
  sigs.k8s.io/cluster-api-provider-azure/exp/controllers.glob..func3(0xc000b3c000)
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/exp/controllers/suite_test.go:52 +0x5e
  reflect.Value.call(0x2884100, 0x2cdeba0, 0x13, 0x2bf89ba, 0x4, 0xc0005a3f58, 0x1, 0x1, 0x0, 0x0, ...)
  	/Users/karuppiahn/.go/src/reflect/value.go:476 +0x8e7
  reflect.Value.Call(0x2884100, 0x2cdeba0, 0x13, 0xc000a3cf58, 0x1, 0x1, 0x0, 0x0, 0x0)
  	/Users/karuppiahn/.go/src/reflect/value.go:337 +0xb9
  github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1(0xc000b3c000)
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49 +0x15a
  github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1(0xc0005449c0, 0xc000b3c000)
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86 +0x74
  created by github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:71 +0xa5
------------------------------


Ran 2 of 0 Specs in 2.066 seconds
FAIL! -- 0 Passed | 2 Failed | 0 Pending | 0 Skipped
You're using deprecated Ginkgo functionality:
=============================================
Ginkgo 2.0 is under active development and will introduce (a small number of) breaking changes.
To learn more, view the migration guide at https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md
To comment, chime in at https://github.com/onsi/ginkgo/issues/711

  You are passing a Done channel to a test node to test asynchronous behavior.  This is deprecated in Ginkgo V2.  Your test will run synchronously and the timeout will be ignored.
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-async-testing
    /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/exp/controllers/suite_test.go:50
  You are using a custom reporter.  Support for custom reporters will likely be removed in V2.  Most users were using them to generate junit or teamcity reports and this functionality will be merged into the core reporter.  In addition, Ginkgo 2.0 will support emitting a JSON-formatted report that users can then manipulate to generate custom reports.

  If this change will be impactful to you please leave a comment on https://github.com/onsi/ginkgo/issues/711
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-custom-reporters

To silence deprecations that can be silenced set the following environment variable:
  ACK_GINKGO_DEPRECATIONS=1.16.4

--- FAIL: TestAPIs (2.07s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/exp/controllers	5.033s
?   	sigs.k8s.io/cluster-api-provider-azure/exp/controllers/mocks	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/feature	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/hack/boilerplate/test	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/internal/test/env	2.645s
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/logentries	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/internal/test/matchers/gomega	(cached)
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/matchers/gomock	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/mock_log	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/record	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/cloudtest	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/pkg/coalescing	(cached)
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/coalescing/mocks	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/ot	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/record	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/test/e2e	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/util/cache/ttllru	(cached)
?   	sigs.k8s.io/cluster-api-provider-azure/util/cache/ttllru/mocks	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/util/futures	2.929s
?   	sigs.k8s.io/cluster-api-provider-azure/util/generators	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/util/identity	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/util/reconciler	(cached)
?   	sigs.k8s.io/cluster-api-provider-azure/util/slice	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/util/ssh	(cached)
ok  	sigs.k8s.io/cluster-api-provider-azure/util/system	(cached)
?   	sigs.k8s.io/cluster-api-provider-azure/util/tele	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/util/webhook	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/version	[no test files]
FAIL
make: *** [go-test] Error 1
cluster-api-provider-azure $ 
```

---

```bash
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ make generate
make generate-go
make[1]: Entering directory '/home/ubuntu/cluster-api-provider-azure'
GOBIN=/home/ubuntu/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh sigs.k8s.io/controller-tools/cmd/controller-gen controller-gen v0.6.1
rm: cannot remove '/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/controller-gen*': No such file or directory
go: creating new go.mod: module fake/mod
go: downloading sigs.k8s.io/controller-tools v0.6.1
go: downloading sigs.k8s.io/yaml v1.2.0
go: downloading k8s.io/api v0.21.2
go: downloading github.com/gobuffalo/flect v0.2.3
go: downloading k8s.io/apimachinery v0.21.2
go: downloading k8s.io/apiextensions-apiserver v0.21.2
go: downloading github.com/gogo/protobuf v1.3.2
go: downloading k8s.io/utils v0.0.0-20201110183641-67b214c5f920
go: downloading k8s.io/klog/v2 v2.8.0
go: downloading sigs.k8s.io/structured-merge-diff/v4 v4.1.0
go: downloading github.com/google/gofuzz v1.1.0
go: downloading gopkg.in/inf.v0 v0.9.1
go: downloading github.com/google/go-cmp v0.5.6
go: downloading github.com/go-logr/logr v0.4.0
go: downloading github.com/json-iterator/go v1.1.10
go: downloading golang.org/x/net v0.0.0-20210428140749-89ef3d95e781
go: downloading github.com/modern-go/reflect2 v1.0.1
go: downloading github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd
go: downloading golang.org/x/text v0.3.6
go get: added sigs.k8s.io/controller-tools v0.6.1
GOBIN=/home/ubuntu/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh github.com/golang/mock/mockgen mockgen v1.6.0
rm: cannot remove '/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/mockgen*': No such file or directory
go: creating new go.mod: module fake/mod
go: downloading github.com/golang/mock v1.6.0
go: downloading golang.org/x/tools v0.1.1
go get: added github.com/golang/mock v1.6.0
GOBIN=/home/ubuntu/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh k8s.io/code-generator/cmd/conversion-gen conversion-gen v0.21.2
rm: cannot remove '/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/conversion-gen*': No such file or directory
go: creating new go.mod: module fake/mod
go: downloading k8s.io/code-generator v0.21.2
go: downloading k8s.io/gengo v0.0.0-20201214224949-b6c5ce23f027
go: downloading golang.org/x/tools v0.1.0
go: downloading golang.org/x/mod v0.3.1-0.20200828183125-ce943fd02449
go: downloading golang.org/x/sys v0.0.0-20210426230700-d19ff857e887
go get: added k8s.io/code-generator v0.21.2
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/controller-gen-v0.6.1 \
	paths=./api/... \
	paths=./exp/api/... \
	object:headerFile=./hack/boilerplate/boilerplate.generatego.txt
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/conversion-gen-v0.21.2 \
	--input-dirs=./api/v1alpha3 \
	--build-tag=ignore_autogenerated_core_v1alpha3 \
	--extra-peer-dirs=sigs.k8s.io/cluster-api/api/v1alpha3 \
	--output-file-base=zz_generated.conversion \
	--go-header-file=./hack/boilerplate/boilerplate.generatego.txt --output-base=/home/ubuntu/cluster-api-provider-azure

/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/conversion-gen-v0.21.2 \
	--input-dirs=./exp/api/v1alpha3 \
	--output-file-base=zz_generated.conversion \
	--go-header-file=./hack/boilerplate/boilerplate.generatego.txt --output-base=/home/ubuntu/cluster-api-provider-azure
go generate ./...
make[1]: Leaving directory '/home/ubuntu/cluster-api-provider-azure'
make generate-manifests
make[1]: Entering directory '/home/ubuntu/cluster-api-provider-azure'
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/controller-gen-v0.6.1 \
	paths=./api/... \
	paths=./exp/api/... \
	crd:crdVersions=v1 \
	rbac:roleName=manager-role \
	output:crd:dir=config/crd/bases \
	output:webhook:dir=config/webhook \
	webhook
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/controller-gen-v0.6.1 \
	paths=./controllers/... \
	paths=./exp/controllers/... \
	output:rbac:dir=config/rbac \
	rbac:roleName=manager-role
make[1]: Leaving directory '/home/ubuntu/cluster-api-provider-azure'
make generate-flavors
make[1]: Entering directory '/home/ubuntu/cluster-api-provider-azure'
GOBIN=/home/ubuntu/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh sigs.k8s.io/kustomize/kustomize/v4 kustomize v4.1.3
rm: cannot remove '/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize*': No such file or directory
go: creating new go.mod: module fake/mod
go: downloading sigs.k8s.io/kustomize/kustomize/v4 v4.1.3
go: downloading sigs.k8s.io/kustomize/cmd/config v0.9.12
go: downloading github.com/spf13/cobra v1.0.0
go: downloading sigs.k8s.io/kustomize/api v0.8.10
go: downloading sigs.k8s.io/kustomize/kyaml v0.10.20
go: downloading github.com/go-errors/errors v1.0.1
go: downloading github.com/olekukonko/tablewriter v0.0.4
go: downloading k8s.io/kube-openapi v0.0.0-20210421082810-95288971da7e
go: downloading github.com/evanphx/json-patch v4.5.0+incompatible
go: downloading github.com/imdario/mergo v0.3.5
go: downloading github.com/mattn/go-runewidth v0.0.7
go: downloading gopkg.in/yaml.v3 v3.0.0-20200615113413-eeeca48fe776
go: downloading github.com/monochromegane/go-gitignore v0.0.0-20200626010858-205db1a8cc00
go: downloading github.com/xlab/treeprint v0.0.0-20181112141820-a009c3971eca
go: downloading github.com/google/shlex v0.0.0-20191202100458-e7afc7fbc510
go: downloading go.starlark.net v0.0.0-20200306205701-8dd3e2ee1dd5
go: downloading github.com/asaskevich/govalidator v0.0.0-20190424111038-f61b66f89f4a
go: downloading github.com/go-openapi/swag v0.19.5
go: downloading github.com/go-openapi/jsonreference v0.19.3
go: downloading github.com/go-openapi/jsonpointer v0.19.3
go: downloading github.com/PuerkitoBio/purell v1.1.1
go: downloading github.com/mailru/easyjson v0.7.0
go: downloading golang.org/x/text v0.3.4
go: downloading github.com/PuerkitoBio/urlesc v0.0.0-20170810143723-de5bf2ad4578
go: downloading golang.org/x/net v0.0.0-20201110031124-69a78807bb2b
go: downloading github.com/evanphx/json-patch v0.5.2
go get: added sigs.k8s.io/kustomize/kustomize/v4 v4.1.3
./hack/gen-flavors.sh
make[1]: Leaving directory '/home/ubuntu/cluster-api-provider-azure'
make generate-e2e-templates
make[1]: Entering directory '/home/ubuntu/cluster-api-provider-azure'
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template --load-restrictor LoadRestrictionsNone > /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template.yaml
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-md-remediation --load-restrictor LoadRestrictionsNone > /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-md-remediation.yaml
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-remediation --load-restrictor LoadRestrictionsNone > /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-remediation.yaml
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption/step1 --load-restrictor LoadRestrictionsNone > /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption.yaml
echo "---" >> /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption.yaml
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption/step2 --load-restrictor LoadRestrictionsNone >> /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption.yaml
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-machine-pool --load-restrictor LoadRestrictionsNone > /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-machine-pool.yaml
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-node-drain --load-restrictor LoadRestrictionsNone > /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-node-drain.yaml
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-upgrades --load-restrictor LoadRestrictionsNone > /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-upgrades.yaml
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-scale-in --load-restrictor LoadRestrictionsNone > /home/ubuntu/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-scale-in.yaml
make[1]: Leaving directory '/home/ubuntu/cluster-api-provider-azure'
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ 
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ 
```

```bash
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ make lint
./hack/lint-latest.sh
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/golangci-lint-v1.41.1 run -v
INFO [config_reader] Config search paths: [./ /home/ubuntu/cluster-api-provider-azure /home/ubuntu /home /] 
INFO [config_reader] Used config file .golangci.yml 
INFO [lintersdb] Active 23 linters: [deadcode errcheck errorlint goconst gocyclo godot gofmt goimports golint gosec gosimple govet ineffassign interfacer misspell nakedret prealloc staticcheck structcheck unconvert unused varcheck whitespace] 
INFO [loader] Go packages loading at mode 575 (compiled_files|exports_file|imports|name|deps|files|types_sizes) took 21.892404147s 
WARN [runner] The linter 'golint' is deprecated (since v1.41.0) due to: The repository of the linter has been archived by the owner.  Replaced by revive. 
WARN [runner] The linter 'interfacer' is deprecated (since v1.38.0) due to: The repository of the linter has been archived by the owner.  
INFO [runner/filename_unadjuster] Pre-built 0 adjustments in 31.367741ms 
INFO [linters context/goanalysis] analyzers took 3m23.008269776s with top 10 stages: buildir: 1m30.148198916s, buildssa: 18.699034019s, goimports: 5.652617953s, unconvert: 5.055185221s, nilness: 4.515946561s, gosec: 4.107924529s, interfacer: 3.392799247s, inspect: 3.319629222s, whitespace: 2.854495738s, gofmt: 2.804513001s 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/inboundnatrules/mock_inboundnatrules by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/vmextensions/mock_vmextensions by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/subnets/mock_subnets by pattern mock* 
INFO [runner/skip dirs] Skipped 3 issues from dir exp/controllers/mocks by pattern mock* 
INFO [runner/skip dirs] Skipped 2 issues from dir azure/services/agentpools/mock_agentpools by pattern mock* 
INFO [runner/skip dirs] Skipped 3 issues from dir azure/services/resourceskus/mock_resourceskus by pattern mock* 
INFO [runner/skip dirs] Skipped 3 issues from dir azure/services/async/mock_async by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/groups/mock_groups by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/routetables/mock_routetables by pattern mock* 
INFO [runner/skip dirs] Skipped 5 issues from dir internal/test/matchers/gomock by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/natgateways/mock_natgateways by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/virtualmachines/mock_virtualmachines by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/publicips/mock_publicips by pattern mock* 
INFO [runner/skip dirs] Skipped 3 issues from dir azure/mock_azure by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/disks/mock_disks by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/loadbalancers/mock_loadbalancers by pattern mock* 
INFO [runner/skip dirs] Skipped 3 issues from dir util/cache/ttllru/mocks by pattern mock* 
INFO [runner/skip dirs] Skipped 3 issues from dir azure/scope/mocks by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/managedclusters/mock_managedclusters by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/roleassignments/mock_roleassignments by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/virtualnetworks/mock_virtualnetworks by pattern mock* 
INFO [runner/skip dirs] Skipped 3 issues from dir internal/test/mock_log by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/scalesets/mock_scalesets by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/networkinterfaces/mock_networkinterfaces by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/securitygroups/mock_securitygroups by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/bastionhosts/mocks_bastionhosts by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/availabilitysets/mock_availabilitysets by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/privatedns/mock_privatedns by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/scalesetvms/mock_scalesetvms by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/tags/mock_tags by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/vmssextensions/mock_vmssextensions by pattern mock* 
INFO [runner/skip dirs] Skipped 4 issues from dir pkg/coalescing/mocks by pattern mock* 
INFO [runner] Issues before processing: 592, after processing: 0 
INFO [runner] Processors filtering stat (out/in): path_prettifier: 592/592, autogenerated_exclude: 55/55, nolint: 0/3, cgo: 592/592, filename_unadjuster: 592/592, skip_files: 175/592, skip_dirs: 55/175, identifier_marker: 55/55, exclude: 55/55, exclude-rules: 3/55 
INFO [runner] processing took 8.799995ms with stages: nolint: 2.977989ms, path_prettifier: 2.268045ms, identifier_marker: 1.008072ms, skip_files: 819.262µs, skip_dirs: 703.19µs, autogenerated_exclude: 467.159µs, exclude-rules: 419.406µs, cgo: 61.355µs, filename_unadjuster: 56.808µs, max_same_issues: 2.807µs, diff: 2.029µs, uniq_by_line: 1.866µs, path_shortener: 1.669µs, source_code: 1.61µs, max_from_linter: 1.548µs, severity-rules: 1.51µs, max_per_file_from_linter: 1.476µs, sort_results: 1.426µs, exclude: 1.402µs, path_prefixer: 1.366µs 
INFO [runner] linters took 21.800242564s with stages: goanalysis_metalinter: 21.791266205s 
INFO File cache stats: 366 entries of total size 2.7MiB 
INFO Memory: 413 samples, avg is 723.3MB, max is 1963.4MB 
INFO Execution took 43.731529704s                 
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ echo $?
0
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ 
```

```bash
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ make go-test
mkdir -p /home/ubuntu/cluster-api-provider-azure/hack/tools/bin
rm -f "/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4*"
curl --retry 3 -fsL https://storage.googleapis.com/kubernetes-release/release/v1.21.4/bin/linux/amd64/kubectl -o /home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4
ln -sf "/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4" "/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kubectl"
chmod +x "/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kubectl" "/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4"
source ./scripts/fetch_ext_bins.sh && fetch_tools
fetching tools
kubebuilder/
kubebuilder/bin/
kubebuilder/bin/etcd
kubebuilder/bin/kube-apiserver
kubebuilder/bin/kubectl
echo /home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4
/home/ubuntu/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4
go test ./...
?   	sigs.k8s.io/cluster-api-provider-azure	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/api/v1alpha3	36.864s
ok  	sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4	5.750s
ok  	sigs.k8s.io/cluster-api-provider-azure/azure	0.076s
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/converters	0.036s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/mock_azure	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/scope	0.116s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/scope/mocks	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/scope/strategies/machinepool_deployments	0.052s
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/agentpools	0.061s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/agentpools/mock_agentpools	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/async	0.101s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/async/mock_async	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/availabilitysets	0.129s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/availabilitysets/mock_availabilitysets	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts	0.088s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts/mocks_bastionhosts	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/disks	0.124s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/disks/mock_disks	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/groups	0.112s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/groups/mock_groups	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/inboundnatrules	0.089s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/inboundnatrules/mock_inboundnatrules	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/loadbalancers	0.090s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/loadbalancers/mock_loadbalancers	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/managedclusters	0.112s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/managedclusters/mock_managedclusters	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/natgateways	0.061s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/natgateways/mock_natgateways	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/networkinterfaces	0.139s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/networkinterfaces/mock_networkinterfaces	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/privatedns	0.075s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/privatedns/mock_privatedns	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips	0.065s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips/mock_publicips	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/resourceskus	0.089s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/resourceskus/mock_resourceskus	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/roleassignments	0.077s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/roleassignments/mock_roleassignments	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/routetables	0.108s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/routetables/mock_routetables	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesets	0.114s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesets/mock_scalesets	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesetvms	0.094s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesetvms/mock_scalesetvms	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/securitygroups	0.126s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/securitygroups/mock_securitygroups	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/subnets	0.097s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/subnets/mock_subnets	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.103s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags/mock_tags	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualmachines	0.068s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualmachines/mock_virtualmachines	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualnetworks	0.047s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualnetworks/mock_virtualnetworks	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmextensions	0.084s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmextensions/mock_vmextensions	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmssextensions	0.057s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmssextensions/mock_vmssextensions	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/controllers	12.960s
?   	sigs.k8s.io/cluster-api-provider-azure/exp	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/exp/api/v1alpha3	28.131s
ok  	sigs.k8s.io/cluster-api-provider-azure/exp/api/v1alpha4	3.567s
ok  	sigs.k8s.io/cluster-api-provider-azure/exp/controllers	11.747s
?   	sigs.k8s.io/cluster-api-provider-azure/exp/controllers/mocks	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/feature	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/hack/boilerplate/test	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/internal/test/env	0.058s
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/logentries	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/internal/test/matchers/gomega	0.039s
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/matchers/gomock	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/mock_log	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/record	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/cloudtest	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/pkg/coalescing	0.013s
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/coalescing/mocks	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/ot	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/record	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/test/e2e	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/util/cache/ttllru	0.055s
?   	sigs.k8s.io/cluster-api-provider-azure/util/cache/ttllru/mocks	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/util/futures	0.036s
?   	sigs.k8s.io/cluster-api-provider-azure/util/generators	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/util/identity	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/util/reconciler	0.035s
?   	sigs.k8s.io/cluster-api-provider-azure/util/slice	[no test files]
ok  	sigs.k8s.io/cluster-api-provider-azure/util/ssh	0.266s
ok  	sigs.k8s.io/cluster-api-provider-azure/util/system	0.032s
?   	sigs.k8s.io/cluster-api-provider-azure/util/tele	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/util/webhook	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/version	[no test files]
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ echo $?
0
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ 
```

```bash
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ make verify-boilerplate
./hack/verify-boilerplate.sh

KUBE_ROOT=$(dirname "${BASH_SOURCE[0]}")/..

boilerDir="${KUBE_ROOT}/hack/boilerplate"
boiler="${boilerDir}/boilerplate.py"

files_need_boilerplate=()
while IFS=$'\n' read -r line; do
  files_need_boilerplate+=( "$line" )
done < <("${boiler}" "$@")
/usr/bin/env: ‘python’: No such file or directory

# Run boilerplate check
if [[ ${#files_need_boilerplate[@]} -gt 0 ]]; then
  for file in "${files_need_boilerplate[@]}"; do
    echo "Boilerplate header is wrong for: ${file}" >&2
  done

  exit 1
fi
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ echo $?
0
```

```bash
cluster-api-provider-azure $ make verify-shellcheck
./hack/verify-shellcheck.sh
Using host shellcheck 0.7.2 binary.
Congratulations! All shell files are passing lint :-)
```

```bash
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ make verify-modules
go mod tidy
go: downloading k8s.io/kubectl v0.21.4
go: downloading github.com/hashicorp/go-retryablehttp v0.6.8
go: downloading sigs.k8s.io/cluster-api/test v0.4.3
go: downloading sigs.k8s.io/kind v0.11.1
go: downloading github.com/Azure/go-autorest/autorest/mocks v0.4.1
go: downloading go.uber.org/goleak v1.1.10
go: downloading github.com/hashicorp/go-cleanhttp v0.5.1
go: downloading github.com/hashicorp/go-hclog v0.9.2
go: downloading k8s.io/apiserver v0.21.4
go: downloading github.com/benbjohnson/clock v1.1.0
go: downloading github.com/moby/spdystream v0.2.0
go: downloading github.com/elazarl/goproxy v0.0.0-20180725130230-947c36da3153
go: downloading gopkg.in/check.v1 v1.0.0-20200227125254-8fa46927fb4f
go: downloading github.com/spf13/viper v1.8.1
go: downloading github.com/coredns/corefile-migration v1.0.12
go: downloading github.com/docker/docker v20.10.7+incompatible
go: downloading github.com/docker/go-connections v0.4.0
go: downloading github.com/docker/distribution v2.7.1+incompatible
go: downloading golang.org/x/lint v0.0.0-20210508222113-6edffad5e616
go: downloading github.com/MakeNowJust/heredoc v1.0.0
go: downloading github.com/google/go-github/v33 v33.0.0
go: downloading github.com/drone/envsubst/v2 v2.0.0-20210615175204-7bf45dbf5372
go: downloading github.com/niemeyer/pretty v0.0.0-20200227124842-a10e7caefd8e
go: downloading github.com/magiconair/properties v1.8.5
go: downloading github.com/mitchellh/mapstructure v1.4.1
go: downloading github.com/pelletier/go-toml v1.9.3
go: downloading github.com/spf13/afero v1.6.0
go: downloading github.com/spf13/cast v1.3.1
go: downloading github.com/spf13/jwalterweatherman v1.1.0
go: downloading gopkg.in/ini.v1 v1.62.0
go: downloading github.com/opencontainers/go-digest v1.0.0
go: downloading github.com/alessio/shellescape v1.4.1
go: downloading github.com/spf13/cobra v1.2.1
go: downloading google.golang.org/appengine v1.6.7
go: downloading github.com/kr/text v0.2.0
go: downloading github.com/google/go-querystring v1.0.0
go: downloading github.com/coredns/caddy v1.1.0
go: downloading golang.org/x/tools v0.1.2
go: downloading github.com/smartystreets/goconvey v1.6.4
go: downloading github.com/docker/go-units v0.4.0
go: downloading gotest.tools v2.2.0+incompatible
go: downloading github.com/opencontainers/image-spec v1.0.1
go: downloading github.com/containerd/containerd v1.5.2
go: downloading gotest.tools/v3 v3.0.3
go: downloading github.com/evanphx/json-patch/v5 v5.2.0
go: downloading github.com/sirupsen/logrus v1.7.0
go: downloading github.com/Microsoft/go-winio v0.5.0
go: downloading github.com/gorilla/mux v1.7.2
go: downloading github.com/moby/term v0.0.0-20201216013528-df9cb8a40635
go: downloading github.com/morikuni/aec v1.0.0
go: downloading github.com/jtolds/gls v4.20.0+incompatible
go: downloading github.com/smartystreets/assertions v0.0.0-20180927180507-b2de0cb4f26d
go: downloading github.com/gopherjs/gopherjs v0.0.0-20181017120253-0766667cb4d1
go: downloading github.com/Azure/go-ansiterm v0.0.0-20170929234023-d6e3b3328b78
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ gst
On branch make-publicips-async
Your branch is up to date with 'origin/make-publicips-async'.

nothing to commit, working tree clean
ubuntu@ip-10-0-0-234:~/cluster-api-provider-azure$ 
```

---

PR summary

- Make `publicips` service `Reconcile` and `Delete` async
- Add / modify various test cases for both `Reconcile` and `Delete` method according to the latest code changes
- Move `PublicIPSpec` entity from `azure` to `publicips` package to implement the `azure.ResourceSpecGetter` interface in the `publicips` package itself and to also avoid cyclic dependency / cyclic import issues caused by implementing the `azure.ResourceSpecGetter` by keeping `PublicIPSpec` in `azure` package itself
- Add `ResourceGroup`, `Location`, `ClusterName`, `AdditionalTags`, `Zones` fields to `PublicIPSpec` so that they can be used from the spec in the `azure.ResourceSpecGetter` method implementation of `PublicIPSpec`
- Added various test cases for `PublicIPSpec` methods
- Make `PublicIPSpecs()` method return `[]azure.ResourceSpecGetter` instead of `[]PublicIPSpec` following other async PR implementations. Any reason why we want to use it instead of the actual spec directly? As however the correct spec and appropriate client sent to the `async.CreateResource` function will work with appropriate Azure APIs to create the resource, and same for resource deletion
- Add test for `ClusterScope`'s `PublicIPSpecs` method
- Make changes to `MachineScope`'s `PublicIPSpecs` method test to accomodate the latest changes in code and to ensure the latest changes are tested too
- Add test for `MachineScope`'s `AdditionalTags` method
- Fix `bastionhosts_test.go` test as there were some compile errors due to changing `CreateOrUpdate` method name in `publicips` client to `CreateOrUpdateAsync`. Raised issue regarding other issues in the file #1753 and also fixed it separately in #1754 . If that gets merged then I can rebase this PR on top of that


Not much testing at publicips client level - I noticed that the client field being used is a concrete type and not an interface that can be mocked and injected. That is the client field `publicips` of type `network.PublicIPAddressesClient` in here

https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/7f78c7bc945b8cabc35c476c09013fb1a9dab320/azure/services/publicips/client.go#L36-L39

There's little logic in client level that I thought could be covered in the tests but left it as I figured Azure API call mocking would be more effort since I can't inject mocks easily with the code as is, and alternatives seemed a bit more complex / more code, for example use if I something like [gock](https://github.com/h2non/gock), it might be too low level to mock the Azure API calls with request data (request URL, request method, request body etc)

I haven't handled the `publicips` update part as of now. I wanted to first understand what can be updated. As part of the Public IP Spec - there's only one field that I think could possibly be updated - the DNS Name. Everything else cannot be updated and are more of read only data. I'm also assuming that users won't create a Public IPv4 address and then want to change to Public IPv6 - I haven't tried this yet with the Azure API. But let me know what we want to support and / what is supported by the APIs and what makes sense and we can take it forward from there
