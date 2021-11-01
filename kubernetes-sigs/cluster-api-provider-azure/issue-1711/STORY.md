https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1711

https://duckduckgo.com/?t=ffab&q=disk+api+azure&ia=web

https://docs.microsoft.com/en-us/rest/api/compute/disks

---

[Workflow]

- Always update and sync with upstream `main` first

```
{
    git checkout main;
    git pull --rebase --autostash --verbose upstream main;
    git push;
}
```

- Rebase issue branch with latest `main`

```bash
{
    git checkout fix-1711;
    git rebase main;
}
```

- Push to issue branch

```bash
git push
```

---

`azure/services/disks/disks.go`

Disk service is used in Azure machine reconciler `controllers/azuremachine_reconciler.go`, and only for `Delete`

Disk service `Reconcile` method is a no-op

```go
// Reconcile on disk is currently no-op. OS disks should only be deleted and will create with the VM automatically.
func (s *Service) Reconcile(ctx context.Context) error {
	_, _, done := tele.StartSpanWithLogger(ctx, "disks.Service.Reconcile")
	defer done()

	return nil
}
```

As Disks are created as part of VM creation, hmm

So we just need to delete the disk async, no need to worry about creating disk async, as long as the VM itself is created async, Disk creation will be taken care as part of async VM creation whose code is in `azure/services/virtualmachines/virtualmachines.go` `Reconcile`, I can see mention of disks a lot - both boot disk / OS disk to run the OS, and also data disks - which are external extra disks attached to VMs

---

[TODO] [Level-1]

- Delete disks async in `azure/services/disks/disks.go` > `Delete` method

---

[TODO] [Level-2]

- Experiment with Disks API [DONE]
  - Get and List disks [DONE]
  - Create disks and then Get and List disks [DONE]
  - Delete created disks [DONE]

- Check existing tests for disks delete
- Check existing code for disks delete
- Check how existing async implementations have been done - for delete - public ip async PR maybe

https://docs.microsoft.com/en-us/rest/api/compute/disks/list

https://docs.microsoft.com/en-us/rest/api/compute/disks/get

https://docs.microsoft.com/en-us/rest/api/compute/disks/create-or-update

https://docs.microsoft.com/en-us/rest/api/compute/disks/create-or-update#creationdata

https://docs.microsoft.com/en-us/rest/api/compute/disks/create-or-update#diskcreateoption

https://docs.microsoft.com/en-us/rest/api/compute/disks/delete

---

Disk creation request -

```
PUT https://management.azure.com/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Compute/disks/dummy-disk?api-version=2020-12-01
Authorization: Bearer <token>
Content-type: application/json
```

Request Body -

```json
{
  "location": "australiacentral",
  "properties": {
    "creationData": {
      "createOption": "Empty"
    },
    "diskSizeGB": 1
  }
}
```

Response code - 202

Response headers -

```
azure-asyncoperation: https://management.azure.com/subscriptions/dummy-subscription-id/providers/Microsoft.Compute/locations/australiacentral/DiskOperations/6795385d-d7b2-4dc4-bb0e-23d1a47052d0?p=56c1db0b-2eb4-4d35-9e30-5675fac45060&api-version=2020-12-01
cache-control: no-cache
content-length: 237
content-type: application/json; charset=utf-8
date: Mon, 01 Nov 2021 07:22:09 GMT
expires: -1
location: https://management.azure.com/subscriptions/dummy-subscription-id/providers/Microsoft.Compute/locations/australiacentral/DiskOperations/6795385d-d7b2-4dc4-bb0e-23d1a47052d0?p=56c1db0b-2eb4-4d35-9e30-5675fac45060&monitor=true&api-version=2020-12-01
pragma: no-cache
retry-after: 2
server: Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0
strict-transport-security: max-age=31536000; includeSubDomains
x-ms-correlation-request-id: bb39b783-99f2-440d-994b-84cb35385666
x-ms-ratelimit-remaining-resource: Microsoft.Compute/CreateUpdateDisks3Min;999,Microsoft.Compute/CreateUpdateDisks30Min;7999
x-ms-ratelimit-remaining-subscription-writes: 1199
x-ms-request-id: 6795385d-d7b2-4dc4-bb0e-23d1a47052d0
x-ms-routing-request-id: JIOINDIAWEST:20211101T072210Z:bb39b783-99f2-440d-994b-84cb35385666
x-ms-served-by: 56c1db0b-2eb4-4d35-9e30-5675fac45060_132753955049796345
```

Response Body -

```json
{
  "name": "dummy-disk",
  "location": "australiacentral",
  "properties": {
    "creationData": {
      "createOption": "Empty"
    },
    "diskSizeGB": 1,
    "provisioningState": "Updating",
    "isArmResource": true
  }
}
```

---

One Disk retrieval request -

Request -

GET https://management.azure.com/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Compute/disks/dummy-disk?api-version=2020-12-01
Authorization: Bearer <token>

Response headers -

```
cache-control: no-cache
content-type: application/json; charset=utf-8
date: Mon, 01 Nov 2021 07:25:49 GMT
expires: -1
pragma: no-cache
server: Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0
strict-transport-security: max-age=31536000; includeSubDomains
x-ms-correlation-request-id: 8faa1d5f-0b6b-41cd-a2ca-b7e74a851d76
x-ms-ratelimit-remaining-resource: Microsoft.Compute/LowCostGet3Min;14999,Microsoft.Compute/LowCostGet30Min;119997
x-ms-ratelimit-remaining-subscription-reads: 11999
x-ms-request-id: de8b2a71-ed85-448c-aa85-c806d6f9fa02
x-ms-routing-request-id: WESTINDIA:20211101T072549Z:8faa1d5f-0b6b-41cd-a2ca-b7e74a851d76
x-ms-served-by: 56c1db0b-2eb4-4d35-9e30-5675fac45060_132753955049796345
```

Response body -

```json
{
  "name": "dummy-disk",
  "id": "/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Compute/disks/dummy-disk",
  "type": "Microsoft.Compute/disks",
  "location": "australiacentral",
  "sku": {
    "name": "Standard_LRS",
    "tier": "Standard"
  },
  "properties": {
    "creationData": {
      "createOption": "Empty"
    },
    "diskSizeGB": 1,
    "diskIOPSReadWrite": 500,
    "diskMBpsReadWrite": 60,
    "encryption": {
      "type": "EncryptionAtRestWithPlatformKey"
    },
    "networkAccessPolicy": "AllowAll",
    "timeCreated": "2021-11-01T07:22:09.91759+00:00",
    "provisioningState": "Succeeded",
    "diskState": "Unattached",
    "diskSizeBytes": 1073741824,
    "uniqueId": "c3b70e7c-1fd1-498b-8a43-cf65969f36fd"
  }
}
```

Response code - 200 OK

---

Disk list request

Request

GET https://management.azure.com/subscriptions/dummy-subscription-id/providers/Microsoft.Compute/disks?api-version=2020-12-01
Authorization: Bearer <token>

Response code - 200 OK

Response headers -

```
cache-control: no-cache
content-type: application/json; charset=utf-8
date: Mon, 01 Nov 2021 07:27:22 GMT
expires: -1
pragma: no-cache
server: Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0
strict-transport-security: max-age=31536000; includeSubDomains
x-ms-correlation-request-id: 725644b5-72d7-46ec-9670-4ddd8ecd1560
x-ms-ratelimit-remaining-resource: Microsoft.Compute/HighCostGet3Min;238,Microsoft.Compute/HighCostGet30Min;1918
x-ms-ratelimit-remaining-subscription-reads: 11998
x-ms-request-id: 74b8fe04-5610-43af-add8-a2b3e10120d7
x-ms-routing-request-id: WESTINDIA:20211101T072722Z:725644b5-72d7-46ec-9670-4ddd8ecd1560
x-ms-served-by: 56c1db0b-2eb4-4d35-9e30-5675fac45060_132753955049796345
```

Response Body -

```json
{
  "value": [
    {
      "name": "dummy-disk",
      "id": "/subscriptions/dummy-subscription-id/resourceGroups/DUMMY/providers/Microsoft.Compute/disks/dummy-disk",
      "type": "Microsoft.Compute/disks",
      "location": "australiacentral",
      "sku": {
        "name": "Standard_LRS",
        "tier": "Standard"
      },
      "properties": {
        "creationData": {
          "createOption": "Empty"
        },
        "diskSizeGB": 1,
        "diskIOPSReadWrite": 500,
        "diskMBpsReadWrite": 60,
        "encryption": {
          "type": "EncryptionAtRestWithPlatformKey"
        },
        "networkAccessPolicy": "AllowAll",
        "timeCreated": "2021-11-01T07:22:09.91759+00:00",
        "provisioningState": "Succeeded",
        "diskState": "Unattached",
        "diskSizeBytes": 1073741824,
        "uniqueId": "c3b70e7c-1fd1-498b-8a43-cf65969f36fd"
      }
    }
  ]
}
```

---

Disk deletion of a non-existent disk named `blah`

Request -

DELETE https://management.azure.com/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Compute/disks/blah?api-version=2020-12-01
Authorization: Bearer <token>

Response code - 204 No Content

Response headers

```
cache-control: no-cache
expires: -1
pragma: no-cache
x-ms-correlation-request-id: 7ef707c4-4125-4b5a-98f4-5a588c5ffc90
x-ms-ratelimit-remaining-subscription-deletes: 14999
x-ms-request-id: 7ef707c4-4125-4b5a-98f4-5a588c5ffc90
x-ms-routing-request-id: JIOINDIAWEST:20211101T075830Z:7ef707c4-4125-4b5a-98f4-5a588c5ffc90
```

---

Disk deletion of a existing disk named `dummy-disk`

Request -

DELETE https://management.azure.com/subscriptions/dummy-subscription-id/resourceGroups/dummy/providers/Microsoft.Compute/disks/dummy-disk?api-version=2020-12-01
Authorization: Bearer <token>

Response code - 202 Accepted

Response headers

```
azure-asyncoperation: https://management.azure.com/subscriptions/87fbb054-796e-47cc-a777-c7a052901de1/providers/Microsoft.Compute/locations/australiacentral/DiskOperations/80d2636c-22eb-44e9-aa15-1e7ec93b38c9?p=56c1db0b-2eb4-4d35-9e30-5675fac45060&api-version=2020-12-01
cache-control: no-cache
content-length: 0
date: Mon, 01 Nov 2021 07:59:55 GMT
expires: -1
location: https://management.azure.com/subscriptions/87fbb054-796e-47cc-a777-c7a052901de1/providers/Microsoft.Compute/locations/australiacentral/DiskOperations/80d2636c-22eb-44e9-aa15-1e7ec93b38c9?p=56c1db0b-2eb4-4d35-9e30-5675fac45060&monitor=true&api-version=2020-12-01
pragma: no-cache
server: Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0
strict-transport-security: max-age=31536000; includeSubDomains
x-ms-correlation-request-id: 354c4d5d-0799-4610-a42d-7d04bdeedd5b
x-ms-ratelimit-remaining-resource: Microsoft.Compute/DeleteDisks3Min;2999,Microsoft.Compute/DeleteDisks30Min;23999
x-ms-ratelimit-remaining-subscription-deletes: 14998
x-ms-request-id: 80d2636c-22eb-44e9-aa15-1e7ec93b38c9
x-ms-routing-request-id: JIOINDIAWEST:20211101T075956Z:354c4d5d-0799-4610-a42d-7d04bdeedd5b
x-ms-served-by: 56c1db0b-2eb4-4d35-9e30-5675fac45060_132753955049796345
```

---


