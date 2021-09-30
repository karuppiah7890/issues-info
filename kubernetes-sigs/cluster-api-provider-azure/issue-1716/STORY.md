https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1716

Public IP Related bug - https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1692

`azure/services/publicips`

`azure/services/publicips/publicips.go`

`azure/services/publicips/publicips_test.go`

`azure/services/publicips/client.go`

TODO

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

TODO
- Convert Public IPs `Reconcile` method to use async package. Add tests
    - Add tests before, or maybe later, as we need mocks and different test cases, which we will get to know only based on some small implementation details
- Convert Public IPs `Delete` method to use async package. Add tests
    - Add tests before, or maybe later, as we need mocks and different test cases, which we will get to know only based on some small implementation details

Unlike many other resources, Public IPs resource has multiple Public IP specs in the form of a list. We have to create each of those Public IPs. But as a whole, we consider the whole list of Public IPs to be created as an async operation. Or we can create each Public IP in an async manner. Why? Because for resource name for the async operation, we need one name, and there's no name for all the Public IPs list put together. But there is a name for each Public IP! Also, since each `async.CreateResource` handles only one future, we can only create one Public IP per `async.CreateResource` call, because for creating multiple Public IPs, we would have to store multiple futures and process them under a given resource name, and that's not possible with one `async.CreateResource` call

---

Low Level TODOs
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
m.CreateOrUpdate(gomockinternal.AContext(), "my-rg", "my-publicip", gomock.AssignableToTypeOf(network.PublicIPAddress{})).Return(autorest.NewErrorWithResponse("", "", &http.Response{StatusCode: 500}, "Internal Server Error"))
```

---

Low level [TODO]
- Check how other resources manage status for multiple resources / specs similar to public IPs? For example Network Security Groups has multiple specs in a reconcile - https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1684/files `azure/services/securitygroups/securitygroups.go` - DONE

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
- Write tests for `azure/services/publicips/client.go` as all the code from `azure/services/publicips/publicips.go` moved to `azure/services/publicips/client.go`. Use Azure API Client mock to get help with the testing. Test file - `azure/services/publicips/client_test.go`. The test would look similar to the old tests of `azure/services/publicips/publicips_test.go` testing some of the old features of `azure/services/publicips/publicips.go` which are gonna be in `azure/services/publicips/client.go`
- Implement the `CreateOrUpdateAsync` in `azure/services/publicips/client.go` - don't handle updates. Put a TODO for now. 
- Implement the `IsDone` in `azure/services/publicips/client.go`
- Implement the `Parameters` in `azure/publicip_spec.go` - leave out returning any value when existing value is there
- Discuss about how and what kind of updates we would do when public IP specs change. I mean, there are only a few fields in the public IP spec that are possibly mutable - name and resource group are immutable, so remaining is DNS Name and isIPv6. I doubt if we can change an IPv4 public IP to IPv6 - I mean, even if the Azure API allows, that's still a big change, like major, huge! And a breaking change too I think. So, I doubt if that's okay and allowed. Gotta check the webhooks and the validation fields to see if the mutation is allowed based on how the boolean is set
- Add test for `PublicIPSpecs` implemented in `azure/scope/cluster.go`, in `azure/scope/cluster_test.go`. There are no tests for it as of now and it has too much logic!
- Check if the tests `TestDeletePublicIP` and `TestReconcilePublicIP` can run in parallel. I can see their sub tests can run in parallel among the respective subtests. Wondering if we need to put a `t.Parallel` at the top level too so that the top level tests are also triggered simultaneously. Gotta check more on it if there are downsides to not putting `t.Parallel` at the top level / upsides to putting `t.Parallel` at the top level

