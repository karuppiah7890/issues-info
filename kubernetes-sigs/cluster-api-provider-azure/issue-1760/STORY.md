- Find all the `t.Parallel()` called along with `t.Run()` using table test cases and ensure test case is captured in a closure variable using something like `tc := tc` or `testCase := testCase` etc
- Ensure all the changed tests are passing
- Parallelize some of the tests that are not parallelized as part of making the above changes to the test code. Just check if tests are parallelized on the test files that

---

[TODO]

- Fix `TestAzureCluster_ValidateUpdate` test

  - For some reason, the `oldCluster` is not defined for a lot of the test cases and the the validation happens based on `oldCluster` and the `cluster` only, nothing else
  - Not sure what's the idea of the following tests -
    - `azurecluster with pre-existing vnet - valid spec` - no old cluster!
    - `azurecluster without pre-existing vnet - valid spec` - the `ValidateUpdate` method does not even seem to look at the `c.Spec.NetworkSpec.Vnet.ResourceGroup` or any `Vnet` related fields! And there's no old cluster!
    - `azurecluster with pre-existing vnet - lack control plane subnet` - again, the `ValidateUpdate` method does not even seem to look at the `c.Spec.NetworkSpec.Subnets` field or any `Subnets` related fields! And there's no old cluster!
    - `azurecluster with pre-existing vnet - lack node subnet` - same argument as for above test And there's no old cluster!
    - `azurecluster with pre-existing vnet - invalid resourcegroup name` - same argument as with the other vnet test, when no vnet fields are checked. And there's no old cluster!
    - `azurecluster with pre-existing vnet - invalid subnet name` - same argument as with the other vnet test, when no vnet fields are checked. And there's no old cluster!
    - `azurecluster azureEnvironment is immutable` - two duplicate tests with the same name too! [DONE] Removed the duplicate tests
  - When commenting out all the tests which did not contain the `oldCluster` field, the `TestAzureCluster_ValidateUpdate` test passed with all uncommented sub tests passing!

- Fix `TestReconcileBastionHosts` test - there's a fix in https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1754 [DONE]
- Fix `TestDeleteBastionHost` test - there's a fix in https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1754 [DONE]

---

```bash
Running tool: /Users/karuppiahn/.go/bin/go test -timeout 30s -run ^TestReconcileBastionHosts$ sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts

I1017 12:05:40.799741   36475 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I1017 12:05:40.799741   36475 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I1017 12:05:40.799790   36475 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I1017 12:05:40.799797   36475 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I1017 12:05:40.799823   36475 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I1017 12:05:40.799814   36475 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I1017 12:05:40.799866   36475 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I1017 12:05:40.800693   36475 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I1017 12:05:40.800803   36475 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
--- FAIL: TestReconcileBastionHosts (0.00s)
    --- FAIL: TestReconcileBastionHosts/fail_to_get_subnets (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35: Unexpected call to *mock_publicips.MockClient.Get([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) my-rg my-publicip]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35 because: there are no expected calls of the method "Get" for that receiver
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:74
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: aborting test due to missing call(s)
    --- FAIL: TestReconcileBastionHosts/fail_to_get_publicip (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35: Unexpected call to *mock_publicips.MockClient.Get([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) my-rg my-publicip]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:99 doesn't have a prerequisite call satisfied:
            *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:98
            should be called before:
            *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:99
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:98
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:99
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: aborting test due to missing call(s)
    --- FAIL: TestReconcileBastionHosts/bastion_successfully_created_with_created_public_ip (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35: Unexpected call to *mock_publicips.MockClient.Get([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) my-rg my-publicip]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:179 doesn't have a prerequisite call satisfied:
            *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:178
            should be called before:
            *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:179
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:181 doesn't have a prerequisite call satisfied:
            *mock_publicips.MockClient.CreateOrUpdate(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-publicip (string), is assignable to PublicIPAddress) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:180
            should be called before:
            *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:181
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:178
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_bastionhosts.Mockclient.CreateOrUpdate(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-bastion (string), is assignable to BastionHost) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:182
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:179
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:181
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_publicips.MockClient.CreateOrUpdate(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-publicip (string), is assignable to PublicIPAddress) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:180
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: aborting test due to missing call(s)
    --- FAIL: TestReconcileBastionHosts/bastion_successfully_created (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35: Unexpected call to *mock_publicips.MockClient.Get([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) my-rg my-publicip]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:209 doesn't have a prerequisite call satisfied:
            *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:208
            should be called before:
            *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:209
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:208
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:209
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_bastionhosts.Mockclient.CreateOrUpdate(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-bastion (string), is assignable to BastionHost) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:210
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: aborting test due to missing call(s)
    --- FAIL: TestReconcileBastionHosts/create_publicip_fails (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35: Unexpected call to *mock_publicips.MockClient.Get([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) my-rg my-publicip]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/azurebastion.go:35 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:125 doesn't have a prerequisite call satisfied:
            *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:124
            should be called before:
            *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:125
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:124
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_publicips.MockClient.Get(expected a context.Context, but got *context.valueCtx, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:125
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_publicips.MockClient.CreateOrUpdate(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-publicip (string), is assignable to PublicIPAddress) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:126
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: aborting test due to missing call(s)
    --- FAIL: TestReconcileBastionHosts/fails_to_get_a_created_publicip (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:270:
            Expected
                <*errors.withStack | 0xc000784270>: {
                    error: <*errors.withMessage | 0xc0004b2360>{
                        cause: <*errors.withStack | 0xc000784240>{
                            error: <*errors.withMessage | 0xc0004b2340>{
                                cause: <autorest.DetailedError>{
                                    Original: nil,
                                    PackageType: "",
                                    Method: "",
                                    StatusCode: <int>404,
                                    Message: "Not found",
                                    ServiceError: nil,
                                    Response: {
                                        Status: "",
                                        StatusCode: 404,
                                        Proto: "",
                                        ProtoMajor: 0,
                                        ProtoMinor: 0,
                                        Header: nil,
                                        Body: nil,
                                        ContentLength: 0,
                                        TransferEncoding: nil,
                                        Close: false,
                                        Uncompressed: false,
                                        Trailer: nil,
                                        Request: nil,
                                        TLS: nil,
                                    },
                                },
                                msg: "failed to get public IP for azure bastion",
                            },
                            stack: [0x2093df6, 0x20944d8, 0x2099bb4, 0x111d4ef, 0x1073261],
                        },
                        msg: "error creating Azure Bastion",
                    },
                    stack: [0x209451a, 0x2099bb4, 0x111d4ef, 0x1073261],
                }
            to match error
                <string>: failed to get created publicIP: #: Internal Server Error: StatusCode=500
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_subnets.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-vnet (string), is equal to my-subnet (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:150
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_publicips.MockClient.Get(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-publicip (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:153
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_publicips.MockClient.CreateOrUpdate(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-publicip (string), is assignable to PublicIPAddress) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:152
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts	0.520s
FAIL
```

```bash
Running tool: /Users/karuppiahn/.go/bin/go test -timeout 30s -run ^TestDeleteBastionHost$ sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts

I1017 12:06:42.694712   36682 azurebastion.go:89]  "msg"="deleting bastion host"  "bastion"="my-bastionhost"
I1017 12:06:42.694769   36682 azurebastion.go:89]  "msg"="deleting bastion host"  "bastion"="my-bastionhost"
I1017 12:06:42.694772   36682 azurebastion.go:89]  "msg"="deleting bastion host"  "bastion"="my-bastionhost"
I1017 12:06:42.694982   36682 azurebastion.go:98]  "msg"="successfully deleted bastion host"  "bastion"="my-bastionhost"
I1017 12:06:42.694986   36682 azurebastion.go:98]  "msg"="successfully deleted bastion host"  "bastion"="my-bastionhost"
--- FAIL: TestDeleteBastionHost (0.00s)
    --- FAIL: TestDeleteBastionHost/bastion_host_already_deleted (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: missing call(s) to *mock_bastionhosts.Mockclient.Delete(expected a context.Context, but got <nil>, is equal to my-rg (string), is equal to my-bastionhost1 (string)) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/bastionhosts_test.go:331
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/bastionhosts/controller.go:269: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts	0.475s
FAIL
```

---

`TestAzureCluster_ValidateUpdate` test issue

It was introduced in - 752728db490b719f2f935b042dde0defe29c246c

At that point, the `old` cluster was not being used as part of the source code implementation and was not tested by the test too

For testing the existing cluster, it used to use - `validateClusterSpec` - which in turn uses `validateNetworkSpec`, which checks `c.Spec.NetworkSpec` - which in turn uses `validateResourceGroup` - which in turn checks `c.Spec.NetworkSpec.Vnet.ResourceGroup`, checks using `resourceGroupRegex` regexp - which in turn also uses `validateSubnets` - which in turn checks `c.Spec.NetworkSpec.Subnets` - which in turn uses `validateSubnetName` - which in turn uses `validateInternalLBIPAddress` - which turn checks - For a given subnet in `c.Spec.NetworkSpec.Subnets`, checks subnet's `InternalLBIPAddress`

All tests pass in `752728db490b719f2f935b042dde0defe29c246c` - both with and without `tc := tc`. Ideally it should have `tc := tc` for correctness to run the test properly and check the code properly!

Currently it's broken at `fix-1760` branch, hmm

Checking previous commit which touched the tests - `202fa4e4f1ad1b16740874fd43efe808c3ea150b`

`api/v1beta1/azurecluster_webhook_test.go`

`202fa4e4f1ad1b16740874fd43efe808c3ea150b` - tests fail with `tc := tc` ! :O

`e5c40a4f727d51be6e0c819ebbaad01580af3871` - adds 2 tests to `api/v1alpha4/azurecluster_webhook_test.go` with old cluster, hmm

`e5c40a4f727d51be6e0c819ebbaad01580af3871` - tests fail with `tc := tc` ! :O

`70f6c5b025c2968c5c0bd0210ca0798ea377d211` - compile itself failed with 0 changes!

```bash
Running tool: /Users/karuppiahn/.go/bin/go test -timeout 30s -run ^TestAzureCluster_ValidateUpdate$ sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4

# sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4 [sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4.test]
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:98:10: disk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:99:61: disk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:101:40: disk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:201:14: newDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:201:44: oldDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:202:59: oldDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:202:81: newDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:203:22: newDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:203:52: oldDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:203:84: newDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/api/v1alpha4/azuremachine_validation.go:203:84: too many errors
FAIL	sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4 [build failed]
FAIL
```

```bash
$ make manager
go build -ldflags "-X 'sigs.k8s.io/cluster-api-provider-azure/version.buildDate=2021-10-23T08:40:29Z' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitCommit=70f6c5b025c2968c5c0bd0210ca0798ea377d211' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitTreeState=clean' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitMajor=0' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitMinor=4' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitVersion=v0.4.11-46-70f6c5b025c296'" -o /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/bin/manager .
# sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4
api/v1alpha4/azuremachine_validation.go:98:10: disk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:99:61: disk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:101:40: disk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:201:14: newDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:201:44: oldDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:202:59: oldDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:202:81: newDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:203:22: newDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:203:52: oldDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:203:84: newDisk.ManagedDisk undefined (type DataDisk has no field or method ManagedDisk)
api/v1alpha4/azuremachine_validation.go:203:84: too many errors
```

---

`27f1cf5404583e96e076249e3c5300ac9ce49ffb` - `api/v1alpha3/azurecluster_webhook_test.go` `TestAzureCluster_ValidateUpdate` tests fail with `tc := tc` :O

https://duckduckgo.com/?t=ffab&q=find+commits+between+two+commits&ia=web

https://stackoverflow.com/questions/18679870/list-commits-between-2-commit-hashes-in-git#44344164


```
git rev-list --ancestry-path 752728db490b719f2f935b042dde0defe29c246c..27f1cf5404583e96e076249e3c5300ac9ce49ffb
```

```bash
cluster-api-provider-azure $ git rev-list --ancestry-path 752728db490b719f2f935b042dde0defe29c246c..27f1cf5404583e96e076249e3c5300ac9ce49ffb
27f1cf5404583e96e076249e3c5300ac9ce49ffb
743055f90c36c4fed473ab8b9d30a34f3bb640c8
7b1949ce3316f564c40f9d905694f4a7436cf730
8891f16a77ee47076d4e4d6a0892fcc87e11eb84
31fb9a698fbf9d3d2328a2ba4a708b2294858d0f
b5b00cc9d23a5cb2b4736bccde8d07fc70a4f2fc
e14b25dc2f22da4297bc62385f83b96d1320151d
bba3ef7bce9a3b4aee4adec7e705caefe65f3f4d
05ae2259b61513ed97c5f63c16803b6c58630aec
d08adf614afe66223b9fc4e29d6afb1d039d1aaf
1063282720cf2e1347955faf7170cc8566a14585
f8cf6f54db7b2d6f93f2d097d5207a5e4d9c1931
ae7110b406ddca5a129d17ca8387bc4e69c352c0
6528e9b071c0c2a59c95aab074b9205fb2c604a8
a3c45cf7d831240f2e8c0426b961d5f60ea7aa72
0cf9e6c7c35a637bcf419b14fd0bc866f159c2ec
9ffddc05bea4d7b06ead35ebdd84bd8925f29a1c
24004d5fd3b59bd487814dce49303b1773cf756d
b9c90e48157f63f9b3321a1cdccd0e5f2a3f21d0
7da9a97f9c10afb26afaab3ea18435312a94dcc6
9f6f5a250c29914df8328d0f2e68621eca6645d6
8d535973df7ae2c40589cce945011cae1439d28e
f38e930650b8aace014f8e1b0e490dd9f7ad7748
417eccbe0ca8a433f44d1fb2a3a473c494a5ada3
9bc6d4fc6310276aea76dae96a468db82a5175f6
fdbccbbb964e25376e258e5842d1cec5a235e57c
2276bf0780b3d6e6479e57a88a1b215e4487f493
e7ac15ef00cf9e67d791f032bd8804068ed3d6b6
6f51b4ed99e0816761eadcfb26158f745f54f1d2
779bd18ca8005866ba944c09d65efc7cf7cd1d91
e15f742eacdc4c684c47283d3b348216a74643ff
b366f62f5f147e796b36c0f83011ec61e7fc8a0a
5191709227e92d0e6345a9135bb613c008f8aabd
8373a92dc96205bad9c9fb5834709e379ad23bf6
8924038de4642517d50ba7e941fbcb11dd958e03
ab7cca07fc16f89e9faee7f3b1ed243c3f01b011
aca87615b0b57f92bd7c8fdc713eb6328eba473c
54397bbd16532ab663730f383efc1e4d48fc6fff
2fa0cef02fd0161e5b51478b009852ba039d7c81
8df269291bae09a1873fa13619c03617e0d7e71f
3985d63c9f370e8a87f757f79515d989c23b0ff1
9f1dd0c9105afa182aceecaeb5e8949536cca31c
68169f8d57550cb7d6f944540236935c95787dd1
81d8798b59330a9ec83d4403a99e9bd3cc1c935a
f5a7f42277062037bcd00f333826a628d0e19d29
1a1269a1a99bafafa5a4945d115149bc413d5d22
19ea37919e2c98a2bc632688373a57b44be0cbe9
e1e60e2bee79bc6bef856752910bae23962980a4
f820befe48bdc94e436e3ca006956731c6652e15
a8cc6750fa8fee4a8c68fde03a8ef363a660e06b
8bfb7bc9d7f76a089c2fa752e5ae7b30f99b71b7
5cbe35262bafffbe533cec53b58d1e61c35a509b
e8f327d183af7a2037494196faf4fa2ebe401797
bc3657dad85dbff58038e3b95105408146d33abb
5aa90f6999fd3981a7398fe22fe233a010859e23
986ce131d6999453328b898cb6c876d130a9fd6b
dc6cfd70c118d18ef60615904f556f2fed26122e
e52b0cec87d1d8c58e045c4c5b5eb43d2f15b7d1
f13336999f451858c5cc65d97e018788348826f9
ed0de07741fdcf560d70d10d3e14380030ef4e5d
78a4ca2251f9f73048759d887f2bfabd6c0828a0
e7ffa8efe0cdaacefff759ce73d990d91931eafb
1eb1438cc51666ce3b1351136b453abb3494abad
aafdac6677ba5c605457c8188c146a3c8338d83b
edaa96440c149b987329c322dfe9666671dbe058
87561e006b62add68700ab32665c16572b4a3571
4141d33d7e897f46274ed01b1fc133c13dd802b3
522db2e1968622ffd43a7bed1840f851a0dd1afd
dd0d7acd32f9c17c1268fd4bbd9fd6482c49e04a
9f44c78dbb3caf27bbfcae5bbd9985d1c2e25290
137d145749285bf20ce3cfe2e87d8f1daa0ebc0a
87cffe17148e5a3c9ae7a7620d5faa368c9782ba
c0d8e366f12de60733dcf8d20ac456ef79ef3a71
a25e5176015383454cd2bb8fe6412e78b39e6598
e218a13350eb60305471c257f6bf9d19a5545019
a90bcc0df92812165db0785b08a8004d79163c0a
51851ecb6f6ea53530d6acb3eda6dfaebe88a76d
fd806fc9353355dd92cbcf20f5f4f0c79710c368
ae02111be7c2c7fe2ce064f8db02ce9c5f6986b8
6a80ae3fd5d80267b55432913ede0c3fb0debc49
b6ce82b41493596b0f15f3cfa94a2fe0e68da569
9cbfb3371a78c800684e3a92a3b22ef57b2cf11d
fd959a87b2f8feca2f25754f315dc1afad6b138e
f1430845a22e952edb20b55f2be198eb4795bdc8
2ce27e6783e6f83624e3a90587b070063ef32dfe
dfb9e66f2d2c853edb472683cf2f5354997ce152
e7ebdf3bef11fcb5a6e001b2860ae8d6654e0202
98481cfeedfe0b17f685c4c0362fb7489ace87e3
4fe0c58f5c75544894bc3ecf4cd948523343968e
ef693da03e00a7a6f2bad72456e603f1c09856d0
9c0af5b747a4da506c0b55db44c501ff03754a4b
a3525d2d89821192dbaeef270f46eff09e4c4587
6fd9a796b31592f99bfa7c8008e11fe7957c06bd
2e5dc062dfe7076919a46eb20a7feb1efb6326ea
02cbfe62a184ea5313aa758ca71be109dfce708e
f46baa1119d1441f263a4a5437d589b46367eae2
725a7de792cb03e5a4a7229e59a343bc65abcc37
c3ec13f5f22927cdf6b41ab164157f6a188ab30e
7fc51795a55417095be8a2129f5c70231ce436d3
4a568429070b839020f27085f94e7764274f6add
20aef6943de9930f567d6b75c2983415e54453ea
e22855d7a19ebebc5e40020db7b1637c053676f4
3ef3ab56e85d3b815880395eefc094a8d42f7910
b69480fc45af0426f3264b4529a030793eb0ce06
313cf0771c95d7f393a5e2b65795287ec175ff21
5763b8b7bf859066253d2980e4d9267f20978f76
35bf449242c91006a5abf5b61509a5faa2c5f309
b1087d641cccab2ebf5e331463215b4e09884070
00ab476a72b97d6211ca71f6565973e2351da198
a90e722689e4595917a83470876afb9cabea6965
507da8bb110dcdb7ce0c752a53ab119bd5bdbffd
9f4589d2578e745b808446191fa535a83801ae43
736a04e8e5a2045b146e4a8c8a2c4084dca202be
2758760f7e4ece6115d60565464d8de5d160e0d5
b895dfe06b1b29e03e63ac8a5e5e2d6f61b15d8d
68dcfbf43e162445bdeebfd535c1a697a109e7e0
2bc6a358effcb1f119150446be5f1de63a5ca397
460b51d8fc4e6273a0ef2f4473e0c175948e71bf
e753a32fccdf6b825b606f12bb1acd6e34a70339
980b22e2e4c9bf24355cf6ff16f7787d35b0a5f5
1a27ca152c9fffcaaf490075767897f2bec1e3b1
3e168e89ca7f5e4613e050b0c55ceb1c23893d32
f7609013b258d74a90a351f0db9059611fbf8d5e
6d9d41992e0da498b7d7ba44a1ce0432813faff5
d866d3aadd588f86a3fe36e1aa07c71b80e960c2
c55aa65247ec97957fb2c36716a42432aaf2cbd1
b54731647d45aaf43446419bb56057524bcd991c
7487093d94453ee60fb64bbf5152fabe7f7afec7
82277309a2bb2cc402340561327a1516ed4e5558
591631eb0d19557bfbae1ac625b620db27b4eabc
06a4b3c38dc43190bf6c19bdec66dded7fa5b517
73ad2c857bfa5a91d413bc261e107501a1053989
368ebd0afa65c1258a532cad0fe4632da30c75b8
d52af1abd6f530b10d906819b1af383b67f04239
ea3c5780265fabd5a5c11eaf7a7faa20ae77533d
df6bd318bb28b717d6f7c17d7cbc296fac497135
2ac0c4ee805c15b88a668d2d472dcdc9d62dcb07
dcc68d6f31c50d16e7389a25917d546c60f62d07
2518d26ebfa75043c5dbff713beae92bf2492495
d1c81f0f3e0336c8631a32c75c06e5abf0e1de92
700eeeefcc28e7b53e6c582129ace4d7c796825f
6f9e3eb97a79763ab5ad03e1f47545d25f8860cc
f591d6077623e77388901465e0b7aa8bb40cbeea
eea4b799765a903f9b6612b0c0a8c2c97bab2c94
6783e86e73a7c6f3c1c5cd0479a684f2add9afab
43f2d992c115beea438b4baa88a1bff64a9b981e
2942bf32843b404b71bb259843e6c68fbcc435ff
90e89101d1a4ddb6a56c528a12f2b056a3eeeff7
fbfacbbff9b9a17c2696a01415da23e95012b85d
f5817038c1df10f446131203a450cbab0097c303
9177ff93e2fba764593692af661869fed78fd137
73965884d2d733595ccf16941797e3b9118c6044
5b4efc4883d6625a8e025abefaca793b7e8b38f1
6c24d95f56061419573acc12254c49f207c26820
5d607e013c86c0cb7eb7bab32c534c34b451605e
b608470f59d54707fffed8c3112a47b201c4633f
8ef20c68cae8aca81a5d7635592a63d24a88e0cc
d58a89e486a10e7168ff2978c9e7ac38ad0d5eb8
0e65fc3448fc4564679160096681d4548962ed8d
99a04899a5196cb2e27572d3427480add9d953e6
9a0a059ff91ccc4bc94276f5a5cc4cb908d7347e
e02af4b28cd200a5a28cb962a7393386ab0c9656
3004a5e0a3202c151e9583dd0cf38c54a481e705
1b99af883b931b02fb09729fbfdfcede55db9bb8
568062434557672c9215c1ad3d7f77d8e7cdb55b
37b83321997721f8268bc99b43d95a45fede7db8
64c6f5320fb074da5b272d22917248153c7461fd
8f3dd96310a5106a2086d4a3118f7de1f3c90598
d1fe59be07c10dd6a66681f89448feb69585a78f
c8b05609027041ab52b4709c0acd7f251b0bd5f1
4a69ac7ab639e3417741e29b82fddbb13788485c
9e1eeaa4d7fb3d5fbb10ce8f37c91d4a2393e22c
48cc6317a288589c466a2a8fc7751ac41a6af644
50d686d270cbaff4201ccf9246f8a6b275e7f9e5
8e70ad63eab71ecaee62eefd90f6bb5d7953f869
2a3e737f129f6ab6653794dbf86edfff2469c271
1f3f742c2669c63f1b60fa2abf570ceb7d87f87f
33345d23e38592afad0144c1f327707b73285b64
a42a1490599b5682ecda15e4b07a042d60dc2c3b
0477320a794b609be2e8c64ce7ea929d29db7821
10eba4793cc7f90ce82a7469b08e17b6761cba57
9f5e341e34b7d37fa41a809dfb654565535cb8e4
5ce2cc61a6862852cd7ed7229757422c6f6b7dfb
35e6c264b2211849597780803faddc9b42af4a27
b40de4c309f4d3eb88c1c0d880d023c6f2c1ed56
a0e422a4c947cc22dd388617e763f2814da73c3b
0bf5c238488ba0299c0007668852491de871cbe5
0e7584aef2254e7b5800f234ea6e158e69f93dbe
4e9c0d8ef4b2b6a90f82bd0df88fd3d15723a7e3
3dfd1e6e0e32471e44ef1e6c5f833a8504566150
b77c94a09e03bb3b54b5f016be7eb4b3ff16daec
34ebec59980ee43e30ebc7c4db4bf01de1091cfc
95283bed2b4b044269df5569880fe3ed39fa7095
1cee310a3e5d83965f368f011ac6a3c0867fdd60
cb486c3d7b26dc84ad5156fa97773ccb97578ebe
e678cd2625ad11fb81316d1e3dfc6295fc6b9aa4
908cfbc5ab2c0c8abc86243dc9ae0b4624d4c479
a408cc4c4f2b3e45f31a5bc0b2f7fc90afb76b98
d531755078486360b78b0d0cbbbbe5a1d01a5552
b1b0a0b95e052d08f1dab433655c1a6570b61d8b
ae4dafa74c2ea7c7e632ece30d6758fb488af6b3
1787fae9d26348f0957d88b8db3aee209a11802e
fca728a81861b77452ea4ecbb37f044fe8d34f70
1b229583798037e6c022acd53f57c4c4d36e67b3
24176a2a0cca8f7f02a75a5957ba39cc47a8d262
9167e8c8753a31dc25e3fa9dc37904587ee9bd36
f6faccb0956e209c99fba458e0dfe78994ee0f4e
feca9a46acc5870e37a6f652760df109c9980e8d
422be0e2a5229345bea96edc86a350c2fa59304b
3ceff1fd7c454da65cc64a313e494dd8ca4c0a83
79849e951d0b5ca1c46161ecdd0f4fd93845e1de
9e254f247914fb75a1b94c81be4a5ab4e9f180fa
a8b9860987c1d5b21bba6ea9184773057c6dd64d
1e68dad9846ce5fc67f258f9edfc99c00a049e3e
dfa066298817861f39d827381606c402b7e90156
f860dc489b44757cb7a847263d1179a2730eec3c
45fb80d54ee124928f4a713a6fdd866f25e4d913
2dfc5ea4acb9bc037349516d6a75a262606963f1
fd5c6ad88d9cf6175e8991f5a03b88a2cd9c8033
d165cc7c38f64a02e46cb101ee43401fb46c325e
8f7acd9e51635bd8200dc93bcd1f0e524966abf7
bdb8fc3d912b51a03553b038d18911808f15e40a
aec76b10d5055790ba2387192ba61d561c372d0a
8482bc80fc342e59bb75fab87ea8a165f5d4cc9a
12032805ca563966adb6ef561d439928151d19a4
f8f2ef1b0155330473df2b6abe4c44f5107f7f8f
74df4e260dbf1ec76c26b044d5ba0db05c9dda99
9c8c56d9200b795ad7ec591d7a23b973434a01f3
33c5e7b415e44856d3924b397ece15ae3c64333b
5ff8051703afaba778442b48f76bc6a34a3bae81
2cc75f4e6be222b7340139614adfc7b03f8cb612
bad0f62729a252611fa02f1d653fabc96a83ec3c
fd51606abfd0e34c748e7612ec0dedefeaf831fa
c613c3bef6e3619ec31c17f7c4aa71697175602d
811d7afe0ab670b1feb3ddfe446a66913b323c92
9c2b417d7103ec663cb2ceddc7bad760569d9a6f
b06d06700fc0b45c82d56b86f1f2e48a35eabba0
9eb212380db6895624c4fdacf2c03dcebafa0f14
a724144aebc2fbad01b4462be2405c00463ed7b3
de88326e512b7fd5df17d8e2371ce0b421f973a3
c7421281d911229dcecfe095c6f468000929e6a7
c12a58ebd631d50b903153a1cc5924ec505f22e4
3c5cb5b975548137d1675bf685766d624bcfa48b
2bcdc7b00925f518f259c770fa8e94459a927667
ee66de2dd22be6190266025b2e1755ec30c96603
272261b395983b18247850dfb979ec4c41717632
1d9ad209dfb5a3d8f93d871140d4f039066f3d05
254746e99cd7edd0a97edc61983eaa9d72e70fe2
140bbc3846702aad0a1bdce54215cbf84a8a0b00
14a716da78eb0d84e4be1483f942cb9f39eb7c48
7aae52315423dfd25baf29b6ae3afe24992b5718
b46363752fa379b899660b4e26cf7c57af7f369d
59bc01a379e3c54912f389c98d857e58062e21d7
7e3a74057c72c7b1c5f73deb51be07ddc965af0f
9fe0600616483cad2d2574eff48697d636f666ca
f68b4844e8831090e63a0caf1090ac3d30bea87c
e92bba9b95d18578e09a4eaad1c1150c0c6f5516
bd73de75dc1aa2613e729384b76142ddbab4f7c6
76d783635f3c1d40fb6a16091e4f44c381b199d6
5a0d4ad8fde853ffe8211f8eb2942cb84eb65ea8
e47947c7ba30b05bca5e85c62d34c58db5f5af97
9b8b494ed7324daa6ffaaa2756c81f587c178e23
8a339cf388b7a521cfa76bf5fedba0145758ce73
2307c8cf182db51ff8901e08356897caac9d4798
59458afe3f11343e1641fd8b154474a1c91f0a78
6da6061738b972f8b0408a00e275694bc213b62a
4ab94abee09e37a8126d86ddbebb8d309f95028e
3cb228ac7d42059798433eb7722a54f547b56ffc
d0494d2bea2522bd733a4328af7561c937801ebd
3da52a303b650521e86ff0d56dfcca15e926779b
0d68b3d4c73218cf508bf2d2f588b0e6b03c5d2b
4b2fdbc3e11cac7174f16db7202dff6bc949825e
144efc5b37ace910cc37d22cb9bfa3ad90d1fdc4
2cc2b7bfab7cc661161cd3000a3a3f3d20994a40
38c2360c4caaaf6060860c279f45b64bedd54406
6d7647a1f35dc20f6cd82625528353c1dfa777c0
2a098cd762e9d01d3c0474254d961dbc5b7289ce
a985e1e228913c293d972035e729fbfc03334d28
3b5ed138b336f8021c6f467ebed590aaaeb7340c
f621f73f67d65f1dc2e392898c464ad7a4bfc021
a62acc83ddef8368439b84868637ed8bf68f6020
2e100d19787016a78130fd5b9440dedbad754c85
c3ccf47ce4e367536dda634944c6c9b6acfe564c
d2d727c0fffa1caa41fbca2f8c0f47a056950604
81728bb006490dfdc1d99eb4f30251ca018e9534
45c7a3ee47b0b2ffaea7a3c9878d6680deedc09a
c5fed9ef9b520c2032fe39e4a5e47c1b247b7d6c
27f33d583c749c6e8f4b28178e988500e7ffd885
29ba7f37f1f1e2274bee24bc66ef9561dd158c73
665d996178d91596f3d5de5e2e2c668424da311b
bf9bdc00c1fd6356f53c892dfbacd8359d2785c3
3a817fe6bd971d91a25e0086d3658d32fe113f24
d4584fa483f4ddd18ac893730c06dd1dce51414e
5e08e505dadfec65ecc6cf3ab0c5a44cc474bf16
4195d4cbca1224ff2f552a608f7cab2fc3d1007c
9eb31409ab83b568687ee5c6388719ebe7c0d435
611bdb7d66b228e34146306246856a978789bccf
d82721b2694d360ca677468a8b2f03d877be40a4
5392d74bfdbe3f2ab387eb7900274181241b5d8e
2ef20456b232ae479c60b65ad5cfeda4f8c3e6c2
b28e91b9db52d2e83cc0c78ee3aca2489a3819b8
360dc476793723f13c7bc633d916cfee23df1d82
4d75fcc03d81562a7fa24ba0bbb20cddbf4cb765
84885cef0c93bb9d3e7f560e1587bdadebd46ef5
121244f2b3dc885374e90f57e6b37954cdfe0676
fbfd231065a4c3359be8cd3f312eee41d40a6a15
0c45468b245feb28565bba57938511c3cf3f5f59
20517fdbe8af9ba47b3d80d2aba789c5d4935c6e
7a23372acc26849bcca8725aef5874bd7a58791f
5f71ddc4e2f6d183bc075d78093e1e281b3c502b
521cb92d6e81983453df0dcaa9194b2821a014b5
d816b6a176a21097051b0c684c9048aa585090e5
f3e7a3531e08038b448562abb18cc828bc2310b0
3c82eafd5695514ee4a162b09df947d37045e4f1
723f2415eacce14332993ff637a3f7f0bbdc62db
111a0de90b575fab1842d487492f01a316c944e9
110f084337f64c49a13b01744a2e6d03dba55d13
c05182f6e9871ce529ddd645ea0433bc262ea5eb
73b0396227f6b08e933e086f40c1ae34fda5993a
4082ce3de1835ba6c35c1e3cf612a51210687a73
148da2ddf7adf3fb9998ebccd211cd5975734c50
138e5c58d5d9e84e05e97fdb694489bd27fc14da
bc043d3ae054fc34de3f449a274adfbc15522390
5f7473fd8221248ca01e35365e4e862a27bf5acf
b19460ee0912ebfcc3c9e0acebee7f221c368ca9
d1c24e6b60b1eefe6a687c4cca4b23cee0c076d9
fbb2d55b0e72b4ef8fc6aa56d6383cc37c4a658a
5e9c2fb55eaad02a13853754103ae4770b2d7ca5
8ecb0da5017e4f838bd96548cf25639ac7742b09
cd8f5e7ee5f8abf4b4923409e3f74f1bcbe078e2
81df8291b5ed12a2d1435627de89200ef8c6d1fe
8a15f6cb662b3fc0cc55a740f258633a2bdfeb0c
76128245f97a0f50a9ae2c49ce96793459503d07
0d347d9b4dd78d9e34a4dd4184c6b39a282bc110
4ea23faed7480e7577f88777b3c543a1bc97d29f
a228edab322fc9178a15d8c1f3146c35addcec38
12f49d8c160e8eac05b1eec103f468451164d7e5
5e1d612a196eb16424a5e5c06e42b2754e268e6d
8cdfe2d87476abc3467446a982483421d67fe9fb
0c7c50db11722a83208322d57832fa07bffa104f
0184f1deeebde5caa42ca067390d476efc148c2f
0973b4356263788293609e27ecdaf05208402a8f
f6df267ae375c380b4f1dba41d32513d5c29dca6
79efc61ce4abb26580d6ecfd4488d046d38e7563
92b465d97ce2e5535b87993f88e9b565bc66f41a
5a8fb9a459dbc56ab34279c1b3c93f54d3c57352
dad101d8a0b1aeb0dbe45f5c452239971c0cad35
ec1693d405d13a13c13a8d4ecc08169c3e89c927
677a920bbb3af72357b52e2dcb21074df48475ae
4b9b1110f3305daf28f8164d20e25563bbd8f268
3138254c984cfd63706cff1ff4e69fa932c7b121
d3a24a951c1224b5c630d0dbaf7b247308867fcc
0b611b649581dad9ca2a97b12783708c6eeba01f
10dfcd63fce6627bbb2cb36277939d95718a1180
dae11e84e07c3e9d3c87f2b1c05f069b2755b4c2
4ef369626d21c997c9f6d0d661f2a1c5aad51899
cba51f21d701a4c783ccde2368728a3b99ea8dff
33f1b6bbd4ce90aada6757c464795b27bb42afd8
2ee219c2474f69b8c6a4dcb6f06d20364485f999
7240721cb206a7e0eec43cb7fd2a0ccc5491531f
5c680a6c2dd4cc0316658b492770890e77eef136
fe6ada8605345f669d729fffe0733e6bb1490e3d
d6b9dec21b10457ee2f284e04abdf202d18cc374
f09265dceb8a09d0432bea4d56ddc53c663d41eb
69ebb3fca3fb382ccd44050c2bfa02b6e541493f
7f69008235fe5938a95eedafebb5121fcfc00805
68ae979fb15e0ed5d826a9646f7b25fd4595a1fc
bdecbfe44821bf126bb4f94986cbe92619c26116
a2bdbef2e4ef5d9dd49344bc3c9ca8aa391161c6
8e6cf27fc4bea69ac2abea85af475842e4d2e431
85c984e1ae457087f65d97aa89d60f941508d175
ef306a47db45134ebd427c19827eacfdd8937a28
e79a2741a8af5c0139eda405709c8aa17fd173fd
056c641ec8454e31b3a4776becea76a985d741d5
95a1657cc3f2ee596d7ccd41488782694eea30d9
6d18ed80bacf99a738d1b782431b56f06394c65d
227bbdec3a6a691a90fa82624b42d200aaa627a7
e8da002290950201c09eee45b5e48eb417c471db
2de9262e00712fee6299c836dfd434c868cfdf51
6eb879fd81a5168efa82fb281f6d51abce2828fb
3c0b4df0fef849a8607bf6decf3e4c5eadf2376f
3386cdd997fa32f3d9a394e5f0b1f91ee2276aca
7d1b0dbb45848031e48b4c859f01fdc45456817e
08f13e1c1f7c06c0e382479a4e89df82e40dbe60
b6831cdf4b3a77a585df190795137a736b97349d
995da71c822c201cfa72cf99ae1b96652544e352
460b8bd0daaa90849410dcf6b084b4fa621d80f4
b60e7cd152bdf735c0e6219e91e0b59c5e3c2d50
2a6c0cfece5f675ed2ce1ef5770d8fa81f6eea36
a86fec3a9f9513c7c413986d98e852407a120b88
70304536e5690edd491a928de2b9c31cecabf222
78d319ededce4ff2d17c3a7e28afd24fb3bf67b8
c49aa73a2d967797856bae09993a47d5a03647c1
19e80de4a7e92082ca0c5eb672e486801da23766
07b7495d42c4f0479d8bdd1a479c2848005f5d88
0ccb197364a5ed8623cdf500ebedbc9099609d19
9476396471ddb11f892c35e371a9ee4b7cb98001
b4704084c698b3fd81a68473300fa7e3f71e9049
07e2ccae1dc0c992d6455606e053e102ed28a6ba
3ad5e9e00240d05aef83a293283849064f7dcf94
100a9e5ccdeb3b33fb92cc6b51b473a13a4631c0
cb9b07faedd74b146bcf67f0a8e76dfa1752dba9
77b1656fdf9c10225b348acbaa2e47a71d5c586f
be6da12152233f75d1c85d248b0703d34348e43f
5a9cf7ba56c6bbecf03af52c330a2bc8a8cdcf87
f8844c6a2fcddd809d252d286183ba18d3d67e60
14af81a53d8735c314b4ab84788a046e3d4a8abd
3e1f071aae7f81d6b4c8638414679821f7ff1659
47d19896ac4f0b9c618eb17fcf6616a26aad01e9
b185781e9547bd6c9ba3b0a87ecf13d23ca6b637
b2514b11a1114f4b7b8662cc93f2ee1faafd15c1
6f0baa64a9533f3ed7cb8b487c934c92d6cced38
49a2804b8a8b5f12b0df7ce4ff99fec0f9fcd1c9
ad84605ead343db3d6ebe2a24bdb3ccfcb8d0be7
92164bbf8c1ae7073c7d3f63ade6cb9c9335f971
d1d309038c1d03bdb97f722093daf3139830aa8e
4958b9a02b2bed682d76d519cf3cccb7ce433b16
ec590aaffe680402738f89690e3f9188e1d7d72b
6fb7fc1a441f8953a9b31d9f44961a591d322f63
d78efa460aa1750472e00e95737b8e61bc9e476a
67b7e6f1b13c1b50da44797d31de169f5a4f0a7b
d8f9349217ab0b41f0029d0b917b4d179c0bfba2
05c6c9afd383a9c0fb6367ab52593d8575986bd3
bf691a6555ee568b6a39d29daf64f02d05df5154
1109ed7d01d1a3d0dcbb700c2418798e749170d0
f65c209f583affee815852925eed7ad0442e6afd
6c1e1f46d7e808aa2df749420dc23b426a46768a
afed79ecd97bd2c7f4beb4c30b0be1cf6c1951c5
eb860aefaeba3431f1c00f7586a88179193d50aa
3687d743efc7220d4a15f5e308d1c1103536e809
01aa442dd6eab4338e646153249043fbd25dcb75
f96be68f3da8a2eae93f4a15cdc6aab81bc7ac3f
075631160f58ccc26b6ea657ebe5cd05b2de70af
59a5442bee363e873531d287dcb488e3760ccdd2
48b6d578b001f8b8afc02713fe5d054089783c46
ed614562a366f4ed3234cfd5466f43f71a3ac818
dd3778d42289164550a10c0d0fab854feff20c3c
c6530dd894a0c0e496aff5b53b0925186a015d65
c4b52027ebd9d4a963e015e50105c105c16c1320
9ab1faab9b04e7a3d8bc3772ad6b085226da0e6a
4ad7b2ddf79d5d3a083ff612e31907685ca0f4be
d2a26ac51e768fdaa26a07f9f686ce328ab40409
5098a460e1213efedac44f2a1fff01e227724478
fb6bd1b92cb6e5bfc3fccf0f8b506de42a7e100b
709c6ea64a44d3cadfdac97b79b019f0cfe9e096
f0774380c94c61e8ac76eead6af47e0ca38d3cfb
3f5387a273eb3595af774c124365c272179928b2
a22d46f267958415a82fdc1d74ba256de9cb4814
c8cbe86825782e9e87347381a09ec99fb8eaecf8
06f066bc2ad82271ed8757648fb9d79b6856b1f4
f18db767000e1b3144a6f803a3149ffd41dea54b
9241b7edd4f150554d109200b89046c821037ec4
99f90b1a6392d4e3a671498d47a4295aaf298f25
bed65b6441f9c739c50670641546a4976061ec18
330d68c973e11ff224d98a740e818581f74ff712
8b2866123ccce2d63c0df52c8507d0e2996857e9
250b07fa4dbfd80ddfad8917a11f4d8f6f9b2db9
96eadddf9d6af490855f42633f0d5ba95c1bc5e9
052a5fd3debe0e556d8eb7132ea4e2730a40652c
476d9d9628223962d6953b5c308fb20406419d3f
df22023917a8b856e2960f5f199b9281f96decb4
5442e23869219f601dac4bd856104078bc01f72d
6dee98a941778ac36361f1ae37982693e83f3efe
f8ca63979c28b5bc4d2d53c7a2cffd4d7edcbda4
d1287776e41f591937047f86dbda829164627c1d
a4e0b70faacc213d02843c6aa03402ea936a7ebe
c28cdfcf368a666d8a2c7a4801b0820ed6f98e52
ef30b32fbe9363e0d8baf646b0bd1ba527f402be
1059293d05f0ec9fd171d8ed7c5febd7fb2cc664
58033d258e0822d459eec884c90a98bfc34ebacf
5684af2a947837eab501aa8ae0c76e59943a5605
0e846b52b95c0f371c1d830da48d54bdabe14ba0
3b2f7fdca03d0e001256357f18b8530578dc3158
d2f4b77e6abd74ef42ad7d89ca8b875901017c9d
b431f06b549b2ba542c30c6b944bf9e49f5a2297
c1dccd681ce98def5f30c22cfacaf760406fc63f
1958c8a512cc2b848c8dd9ed1bbdf38ea6e89c88
4b92107fb2cc824fc6ab3e70e65c24c12df20bec
af4a9582e37b153b8dd2fa004c103c5f6b2841ac
f1e81c1ac979ba57c24642ce9fd8430449817e58
928f0c492b8dccf78703b343c7bbe543a5861210
8b2d4d5d726b5c0817bcc5e044a051e41a41a0a9
03df29cde9414c1234f8b840c9c3661d6cd8ab2f
6db35b44f67c1c83b9f12f4de4518ffe548d57c8
16d9e12fef3723e96aeab015206cb6ba774a2471
2c6ec7d6017ad3e7eac0f94557c7ce7801ac757a
5ff5deb74f52915ab7122a51ae48ab0e9539ac44
dcbe30dae4dbe0d73fa816556ec346705300bf6a
e732c32e5b9decd1c6a25f7a718b1d18829a346e
013374ceeba4892cf2d446456582b5f439cc0334
b8b88f6d8aa202ef6f2930c5af35b2697c913d6a
cca9e61da48800d369e3be52825b651e5abe6c9c
0213da1a181e6ad80145553c71d152511f20e44f
b9eef390f295348dd17d1ac0f96761a02bb9c1c0
877654846827524e8000b4a00b436ac32627cb7c
6958d5af610f275dae1dd4ad914a1c4047b52c1d
47524f27ea9c307dbcf2d7aaac24c4d6dcd73c00
0deb03dc121e5099dd07f302d0961252e1b37870
4e3bc9bf3273ba9948257dad6e82a40d8ee316bb
62f466058de45d9f55a37a7312c4d641aeabf934
36e7e1fb0a768abd57312762807300dc6cd5f9f8
9dec43b034f8f47460f9b835444e65a1af762615
c367ab8a052f87560ab545a81cfef52f0b2edaa5
bceee96d979fd164662ff6a4dcf10676271555da
e42e1ac24a9ae91bd841b8884c5cf24c454b10d2
38303cfd9351bc3ccfea9ad28e2a8fcef4355cee
6ad50d0e79546d9f3c5e5d632836412df91a6a9c
9f28c6fde68ecf5bdc65f500a3a3bddecec6ea20
5f99b7c24254ff67c0d44304fdd72dfbe9b64afc
92da24fc749203f708f1c1e7546d4ed37dbcbe34
a8f1a68e3d2fa5eb6ce08988c5dad16402a745b8
8d6aa89d83a55ed81a2350466b8f4e484e692469
06649e1090c393e38462c8513b62226c918717cf
4b327b221fbce133811a6556173b540595b79e52
9d9227554c149fa6db3f68bafc6fbccb3b034a7f
4ff4326be9c75d8d0de804ef1af77d3fb2bd6364
7b418861e609584f3abed6f9397c04994d6e3982
1a5728fb71a7c96fa2a657011b61d71aeb03326b
eddf931e60c56a98dd3ee61e4b53ee5bfea4af39
3018ac72ef0b9b801cddf7a8c6a2559c02c60a43
f7cc9dc5e70b8e4d8d4e2081c217f6848db3ac59
5d75506dc2c51866f18177cbe2af40abcf1e599e
b88f8e8064bfbc9e12fc055e7641b763fdadc02f
299e266f7ae51cb0d0e58ca4a4db82eccf9bcb52
48d25a3372d2c44f46da32665f88ecae0476418c
2dafed276259a68b90c7774bd7a3d00b9283631c
6ca13ab87a186683c1f735fad9fea0ccf34ed024
d73c831095460497b9cc11ad3cecff0cc8c42c7c
0416736454ed8b98b40ab57eb0a26ed810e4114d
ea25851aa6ddf4ff0ce00cae1ac83e30d6ffddfa
94346409142b9e97ba8066e013cd5d56c4cfbc3f
b44768185345a06c069a38547dec3e09054abb88
896d62e5d4ed643c180776c39761bb1514f7a079
d9ccde94fd247a701461868c6f6da3381aa2fe72
d87fbb94719706ea1e3122bbde256d2a07479818
5dafe9d4e2b64c85bd6964f7210899ba23e36443
09259ca745e874d3f19a41f2a549954688b9cae3
206e3d865da1a0e74bd418e17ce71f1d7fd4107f
c210ee4a904f99230fefa7c8c2d9b99eae58b570
ea8ae550ac81ff3db5468647b3546a62484ed01f
e45efcfa64739c9dce04fc441b4a98c104730d52
b62341be6d8c3acdf05bc17bee9c271bb79b2843
0aa24fa6c70db423444d8b4e643f582aee80d8c3
87f35a2bf537f106c249b57a652c0625c7faaeb3
1b9d71123c6c6beab4e581e5cb280dfeeae48af0
7a27b1a25419b0ff77e64a9dffce359266303608
a0c59497413579de8d7d794461e01b5b8e73724b
6cf2090ab4298b695afdff2330f8c3e651e1a5a4
dadb939702a37a20b30a67c532dbec8f150e0105
82b903d6eaef7eff13b4c89602f965dc2fa76b0c
013ad0cfe7bf64ff8a5d412e279f2ad7521dc785
81330946a541785e36290044519bc262e5a166ce
387db5a07600fdab823a56da465cbaa355deabeb
9b6b28264cec6b266002e668cdcafbf68fb45fa6
eaaa3127f0b71352e1f74436d1a94af883c5fb38
43cc7fed41a2e2047bef0305fe07dd46dd815f37
11aa5e5b5963bf14ea539a3b8cf4af2ee80e0a49
cf2473927944a9585de7ae7d80abb2ac3369739b
035a32d8e776684a97a9f9e7bdf976e5695a7e42
2ac0cb2b480c58ca2e38a0a5527c145b29c08f8a
a9d8ae581aa938edd47ef3222342c8da448421fb
94b559befcee76e7b94649a4b9bbc42de0394add
f69c77e56defa20ba3f66f47d9d1aa8397a93d33
371f30b6cf26ac1ce1c3e60e38883a13a11f08a1
c50f2cdd1d65e2515d285b45082c13c209a46fff
88d2cedf4887addae320f86ee917be77fc2c6c76
3a0bf3ca9ede4850b78753745fa45693620ad77a
02d21b3a3c607f23847103e13ac39579de00b856
004e869043e70878ede1d378d3a2374a5b5b63ca
bc334bee2919a4ec113dd6d20203b0e85307c470
0bae181000b769c61344125d11f86b97334397ba
4059470a77fd4292fcb8cfb3bcc63ca03e9b8acd
b0e2d89ea5e941c114713fca837520e64266676b
23e3998f60f1af7d656e99c4c1c2dcbc27fcd43e
e20d9d8f8d289c6b3ae27988c8a9126b31944844
c20469d21ff55938b7216f3a52467608f6e0bcd3
6f098c902c601e3ca3a4ebc18d1addf1fed95ab2
9b05c6b12bdb4a9ea8bfb17573a9de7eba386eb0
27d9fb6ebdc5d2876b5fe6545eb927aaf32f297c
75071549a5196436b57c680bdfc987a1909554d1
7cafe962c04adb390fedb3687674f9a18098eb4c
b4faf16b50329b708ad5b879b630ffc08727f276
6908f7cf4c95807da8a7c714944d433ab367e1c1
df2e7d3213e8842fff9d0e929de14d8b17c50fa3
dbe493e8f250aa0c90241d695945faac9eb88fd7
e893e2792de8059ad2ae9cae8760042ba0e1132b
9bf0121e2977509835139a8b6642ca4dda1caf85
254f75c660609d09d37411e1e8d82d603239da75
e45d6c558a0fca5e4c840c779989fcfaa7e5cdd4
7741cd61bde284a7b7b2f58264361abbfa24de4e
e06c352bdce89d3c7ceeb3723e4b4c27bc7e2d0a
ccfe354acc9c4e13f3079583603e6ec814a27726
0a13b3104008bda9612f144b1f7c8d13f295259f
033e7f967d632ad5abe244534f0b2e6c76b5fec5
754912d42226a996f4fa286c89ba882a9081a556
e73f75c05457873d1fd09cd226d930cb10f3ec30
01ced91b4182f5a12999460d6ec5ed694a36d049
48f91ea17e4aa85c30724e800a9976a9a2ecb2b1
8ebb54e275186eb07b4ba0bfc1e1b2384311e35e
3735a0e69eb455896484c5c26737cc4f792d47fa
c9e2a7fe7fe7c3488ca82de5091d8c4954129192
a585f0a52a9ce8c6413b9feb993af4609a2c3109
b5cdc594492295a91c9daf57bf000a977ff760ee
d42e44640b186de75e31e4a4e04461863a32fadf
d18ae621339235ef623398b0cb749c03bd50ac39
da0a5cd48b4be8f6626badea911252fc76910689
13dc8099fa77c59442d682be86bee0552f488bf9
edee30d4910c85c41f200f860b0a5a059345bed2
464e94377fdc0478cca4851bdcb5d5d192085fa8
ae25234e6d128c38de5252bdc51500f61aa4ff95
9e4ee99dfd231633fbae90d60d36c8930aac17d0
75ccd668655bdff15480fa0cc715a3d14a00791e
0f4f5a2a19b7ff6f69904cc1e5e2ca86e3136786
435f4fa2d77bd50f7c6ee5a7d7c5e222f11d0d11
1faff4b0424e6b32fcd2312a3e162b4220d93ab5
b3ebfa5de4c709c9b7ddb51212c3b9b83218f182
1443cdeaf5ccbf71ee9aafccdcd9392fe80ff1af
3b7be045ea46b3a5f40035e460ebbde2cde21463
7958ebc7f818f373087fbac3b334c877cfcbc6b2
446585ba0fa5cdef27c98a4d7743df9d2017c922
51c55dd5753460404e0da5f4c46549dabbd664e7
41f7dbcf05d22abd1226b0c49a1d875e98e4547c
f9a6515ac55766f862124f27b2804abfaaaad121
060b330ce7e8e6be1dc0bcfd4acb969bd2223ec0
c7766d10d4fe2338c4d17f5cc0005de376b132a6
611488581c6d45aa9de2c61471c3caa02540b2fc
e84fee9e25554209ae0c84be9e4d3ce74afe69a7
20dda3357e3a4778d4f344f8897aac4cca0147c8
5fb8ce3598a6f9f0514b2418d7f1922252da4537
ade4bbf0acd187361bb789fefb16f34471892403
f753c3dbc7d4790354472e1f5a536f29eb63d9a7
a89eb3c71fa688b7b61dd78172dde8e90d59872e
ac7fd15bff558ca29ade41f2ce7249e41d836344
5657bc71ae24e9ab284c607ae347db9b0f01c5a4
d29f52ce8ae5d55fad564ef24a877e36959fecc3
83876563cc044fb00dda224b0f5fd1df8973ddd9
4c759d96e7442ef16d0e462b45c0da8891904b7a
4833e5043cfb0d93fac5dcacde6a5584df5e13ef
6a24966043abf86f4607a8c1f8e6e35389c3fd6a
03a76e30059c9d467ee470600d3471f8bf6ba4fa
59c726efc69189d7048f5f31899cde25d70bc515
2e1b96ee26541380a397ebef3b11ec5050948e9c
6be0b72740c8e40efc809e64727c141a1735ec85
04b9e8210b088eba82afc8d4967c3604e1fcc10b
1f1b0447c467a842b2880b15d4e3eb65e013c4f2
a4f91e825588eff8a05df53643e5a678bb1728df
c9366d360fabc9b08efab15ac6f93a04eec0caec
9e423ff201cd1ee9008e307e1ef1b845476625a1
1040ee8f83ea9bc7de7bb47a9c52651fe38abe00
6046974cc4167050e8a28d83ba6af899bd96c400
316f57e05f4a4524d00f69f8484e7d881af4defe
ddfb1ab7cd65f91bb52d0b502cb4d261088101a4
04836dbf9377731539c697b4a10311e39fc83690
b45f6cf73975ad7fca932df1789667129257adcc
3ea4eb4406a0db0cf588f005cdb591a7fbc70a5d
b006a055d13ce793a98e0d59d96ffd156374c6b8
c5befecdf1714cf3fc69c2cdeb0f8105c53bb07f
37af4d734df6aaf103cbe3c5406020893dd9aacc
bc614598dcd4c35b06e2862715f7523661ec0139
adf6c09a8fd2e022f16921b67cfe769ea6895f19
fdf7229d974466d7c30eeb381626ab06d67c17f6
d3d545c3467a63d0c314f1eb7d016a8ecc6e2653
fa3a2814391c6f4850dc3f648c279eb2989bf81b
f9da6a5e82da5ccd7c692f47704015be27f7ba6e
e4f3ad94ce351c958455896b145c6ff6c016e873
b294059ec2d872e58d0b8f65ec7a292f5c4913af
6f3c1d62df52c8626e7a10cce823d8a792f9cfce
f7f6dfe3c6ce8b5f25296eb1be0d7eee386dcc20
d940ce34cf2f41004d057fc3c8cb57f6737731a1
6435e5b06008a39a0c7373c7f0b3b613a796d333
790ec1caa9fc79942655c6621505796f1094d137
304e47dc345bd1fa87b3ca16e37cb73b4aca1adc
e843409f896981185ca31d6b4a4c939f27d975de
c6d1e07522b37c8b3cfaba4b9cf9e374707807a5
a8da4fcf73593324542e6db738639fc8a2dde6f6
2d8d52a52c96e67bcd37cb1e8060ffc0b5a31c18
94bd73ec86d96bc3112bed3259a49357463723d2
020e516e036d58ae5637f5a0de9d8031b014f129
bc04ec77632c685e777428e26d03fc9fa9a2163d
e490b54fa88ff0d4861f183f6fd913d873685366
15e928d78439aea2e1fb6138504e473736b59f1e
aa979f27a021e4d87e2bf2926344833042f400c3
edb9142488209920cac7bb4b2fc9c06ecd27598d
f1d4282d6255865c878ca4eecf28af2993a4869f
40acdc30e3d2bc8c81f73a650b9f418758e0ffd9
a7b849ce0b32b68312a025958f34e4484a8d94cb
6c11ec8f0e0030819adfd8ebf669aa72cefe9024
942691fa3c7ebf9e9f69214ca3169a929e755ca4
5e1b7bc02bf51ca024fdec9ca344427e3d9c8bba
9765463ab28091dfcb2fe84c99179516e93403c4
ead5f99f306576a2b8fb659e8c5d584b4cc24373
225dcc8237e8e43e3d57ad08d78b9fa400ee3b3f
f494bdc35d80419a2e48f1b26becc859ea4d86c2
d0e5793f6c561555873709f294a5801b312f1596
e185705fc28e489c3841524901d435dc7f2c7f10
0d346736bfe8f612444ef06ccc72fbe44f40ffe2
1cff4e64fe213bcdc1bbf7bceb9da85eebb85123
72afeba886476049dace3e9bb39e66703a1e26aa
5563ae10c14a971647e48b8d8f3a816f73e3ad36
acf63a926ddc6ff40b6bbc58535cd95c834e9293
4f2a7601268df1ba1453e300751771b15c69fc3e
1274b053827d26dfa5ef4fe36a4a8fc4de26f8bf
649a5c6dd4367699e5c0fe76ad3adbb750dee1be
bdc13ed25f62c06f7f58c8a8e7b89a0ee7373424
85ad9d4d53c8a9448984efe23e72f59f249abf84
88b64a1c777df08731163704d7783105d4ea3699
7bb617016f359b3eb2c0176c6ab630306b2364a3
3944724c735293a6da5db1f52cf582c95d5bfad3
fd8ead66d6e6d3bbff4a5a613abf6605635ebaeb
c5299b4e742908eeee934052eb8e262dc89dfcd4
c99a8bc9bb061e69dab9f5b40c67b031fc2457bb
ff37e097b6cdad039e1df89d8887eb67436e8b32
f085b86626793adde3657c8136034c4e5154fa58
b426c8f8ba038b494ccbc960ac12ed650b2a0ed2
6be4c90817366a6348fd0ebef2cec3e3fbc0214f
bb2e24bcac540b9a5e59c04a6cd25b1df38106e8
6e3a83d9f2ab341ad4dc0565a0d151e68e5199da
244677ad628cd15df07ae8ac51f11c99fbb8f3aa
5adbc2d5e066d5a82bff3dfd69c4676f12d2f3a3
7f7c1b562c55e53591fbff25037bb6b7b40bde14
243218065bc9fb601b1da6208a355ea8b62268fe
9fc12dcddbf48d5a9c6749bf6e7f31b13ae56c50
45f49d9f2ecdef82f2cc79cbc722e414d12b79d8
1cd7bdd73d2a3d833e857e9b04cd419f98c743e5
4a0b011a5c2ac8e0b106f4863850761f805a5916
5a7bedf05cb574a7825608561192d35b535abb9c
6d7fe655ddecba2497cab1abbe3b1d3a772571cd
ad847ce89fd7452b80ba66f1c7bc8c376a4620b2
82ed0727734d5d0d44a8080ae1e3ca88f7dd65d3
ad2579d97c6af7b65aa251e8dfb375d8206b8d36
ffad0adaf9085c504cb08b8369afb2210abb1a74
87de68f2cf49eda58177ef89e05df748335d50d7
23ef7e54814e36680d36f5c649b9ff47dec5859c
f6de74114149e0bbb809f8737af0acda3284559a
e80d4802838ed59c9100fa102e3433915834771c
c0d09b2beae22774c418a357d5ce2e1cb12e84d0
e90c6504387dbe653585e47e4f35af3e923bf3c1
f2f5c9b95870d3dff45dcedc1382e1491d4c6968
d4ba8743322f8ec6c4699da0dbcf604f1243cc36
b34932607c76848a8710cc62b1d7e476e352b74e
9e3562d6c6c5dea9471f6cb2523765a38aef3224
214c0d7b10ec09df9b638a63b4b4472c203a396d
28ede51fdaf6a95e878d6dff244660893232d7b4
4f666e4af22e5cc465d91739f025e5a30c564e52
09459f72be89d1da91f1a065255fa1fa81f6284d
735f16abf2a2ed0915c33c92007b2ffcddd3b9d0
32143ef9bce121d753df5904a829150e0540c6ac
86766a9f651bfda752decded44e16afc5f067810
bba95ac11805b479eb7de8f7ae5405182e2b0ad7
fac05587942ea4added3927d4e825341c02a4a5d
fc0a458d16bf9c7e377680a59dbd18e6bbf165a5
e5e73b539501f058dcd5796d10804d09de16a4a0
b6738e612d0fb307faae36f650ff0c3cdd88dac0
527a5d8de57edf28cd5f3f2eec51895ab7d6e547
6be8d6f4366bc5d9a533b71239e4d65208ff575e
5cf2dbdbc5ef9e07147eb6ff998798b92b4224b2
7efb212f5a17cf08b2d4260819132386749b2a54
8abcd6d8838101a9d6a39487027b51a1f0f95bc9
b27fdafb97fc7b40b3c61085bef9ac0540674590
53b643a4c11f34277f0aa0adbda8b0261b066dab
5be0efc04f0f7b44f8c55329e037d16bbf72c91f
e5a8201e433be79fa2493a5b8125ee0faa6efec9
e0fd9dea24bee297d6ff036334843cbca6185239
2056f2fb2be94fa720617dffe994b3f103ae51bf
f981465676db1fcc54f81dcda9e01a92fd298e2c
55c9b435d0e180beb24c6322b956730d80f43e57
d71f5f097819a43e549def7821556b5ffb5aa62d
55ebfc34f3342567ed2541232cecd36dfde22748
e0f3732bbd5b57f16903ea5acc0b0f1fa1e31882
1cf1ec4a1effd9340fe7370ab45b173a4979dc8f
4ee9c1129cf743c2727bf3461b305bae2f06efaa
edaee997aec4390b0dbb62f2c09274007a761199
b9b11aae33fe293e2b19a7d2f8cc781e1b130547
835d14998450b46b383daac848639dc733d3f08c
8875972b3a888b99b0c0695ba9ea6c7128cefeb2
db93854615376d44a45a88f6a3e44fd39f754c4d
6c7c5c69be0a21e1c42944ecdd55d1cd3e0c1600
7d0982b50fc9d3bc44ac9becd3910af32755bf5d
9faa72dab7fef49b908df7dd746dc6df2b73f543
e2bd780ed4f7c1045bc26f4752963680242d7ac9
59dc2ea6cb64985527bc199691d6f4d0ee74f9aa
7cc71a1e4bdd1c1b9fadd64d44376682cc9e91da
4b049939e18f0ba735735c41ac3fa9f828cd5236
8d4a40f6e6c86bba0a50452ee38b71f336a81d63
189c0a0278650128448c8ad041df0345ca437a18
a2760bed0f09f6a2533338686e718a47d6cec6c5
2f3e9dd27347650580a57a196d7d3f77be047a31
cluster-api-provider-azure $
```

I gotta do a binary search I guess!

`752728db490b719f2f935b042dde0defe29c246c`

```bash
cluster-api-provider-azure $ g bisect
usage: git bisect [help|start|bad|good|new|old|terms|skip|next|reset|visualize|view|replay|log|run]
cluster-api-provider-azure $ g bisect start
cluster-api-provider-azure $ gst
On branch fix-1760
Your branch and 'origin/fix-1760' have diverged,
and have 22 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)

You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

nothing to commit, working tree clean
cluster-api-provider-azure $ git bisect --help
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ gst
On branch fix-1760
Your branch and 'origin/fix-1760' have diverged,
and have 22 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)

You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

nothing to commit, working tree clean
cluster-api-provider-azure $ git bisect bad
cluster-api-provider-azure $ gst
On branch fix-1760
Your branch and 'origin/fix-1760' have diverged,
and have 22 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)

You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

nothing to commit, working tree clean
cluster-api-provider-azure $ g bisect good 752728db490b719f2f935b042dde0defe29c246c
Bisecting: 745 revisions left to test after this (roughly 10 steps)
[5cbe35262bafffbe533cec53b58d1e61c35a509b] Merge pull request #1081 from shysank/refactor-1047/part2
cluster-api-provider-azure $ gst
HEAD detached at 5cbe3526
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect bad
Bisecting: 372 revisions left to test after this (roughly 9 steps)
[1109ed7d01d1a3d0dcbb700c2418798e749170d0] Merge pull request #866 from nader-ziada/capi-tests-2
cluster-api-provider-azure $ gst
HEAD detached at 1109ed7d
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect good
Bisecting: 185 revisions left to test after this (roughly 8 steps)
[c613c3bef6e3619ec31c17f7c4aa71697175602d] Merge pull request #1012 from dkorzuno/encryption-at-host
cluster-api-provider-azure $ gst
HEAD detached at c613c3be
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect good
Bisecting: 92 revisions left to test after this (roughly 7 steps)
[6783e86e73a7c6f3c1c5cd0479a684f2add9afab] Merge pull request #1072 from craiglpeters/master
cluster-api-provider-azure $ gst
HEAD detached at 6783e86e
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect good
Bisecting: 45 revisions left to test after this (roughly 6 steps)
[c3ec13f5f22927cdf6b41ab164157f6a188ab30e] Merge pull request #1101 from cpanato/update-tools
cluster-api-provider-azure $ gst
HEAD detached at c3ec13f5
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco
M	api/v1alpha3/azurecluster_webhook_test.go
cluster-api-provider-azure $ gst
HEAD detached at c3ec13f5
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect good
Bisecting: 22 revisions left to test after this (roughly 5 steps)
[c0d8e366f12de60733dcf8d20ac456ef79ef3a71] temporarily disable ILB test for VMSS
cluster-api-provider-azure $ gst
HEAD detached at c0d8e366
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect bad
Bisecting: 10 revisions left to test after this (roughly 4 steps)
[9cbfb3371a78c800684e3a92a3b22ef57b2cf11d] Merge pull request #1098 from Nordix/azCluster-validation-furkat
cluster-api-provider-azure $ gst
HEAD detached at 9cbfb337
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gd
diff --git a/api/v1alpha3/azurecluster_webhook_test.go b/api/v1alpha3/azurecluster_webhook_test.go
index 03bd2e9a..91befb05 100644
--- a/api/v1alpha3/azurecluster_webhook_test.go
+++ b/api/v1alpha3/azurecluster_webhook_test.go
@@ -202,6 +202,7 @@ func TestAzureCluster_ValidateUpdate(t *testing.T) {
                },
        }
        for _, tc := range tests {
+               tc := tc
                t.Run(tc.name, func(t *testing.T) {
                        t.Parallel()
                        err := tc.cluster.ValidateUpdate(tc.oldCluster)
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect bad
Bisecting: 5 revisions left to test after this (roughly 3 steps)
[e7ebdf3bef11fcb5a6e001b2860ae8d6654e0202] Merge pull request #1122 from mboersma/fix-gpu-book-typo
cluster-api-provider-azure $ gst
HEAD detached at e7ebdf3b
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect good
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[f1430845a22e952edb20b55f2be198eb4795bdc8] Merge pull request #1123 from devigned/lb-test
cluster-api-provider-azure $ gst
HEAD detached at f1430845
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect good
Bisecting: 1 revision left to test after this (roughly 1 step)
[fd959a87b2f8feca2f25754f315dc1afad6b138e] Merge pull request #1099 from shysank/feature/657
cluster-api-provider-azure $ gst
HEAD detached at fd959a87
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect good
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[9c0af5b747a4da506c0b55db44c501ff03754a4b] Add validations for AzureCluster Updates
cluster-api-provider-azure $ g show
commit 9c0af5b747a4da506c0b55db44c501ff03754a4b (HEAD)
Author: Furkat Gofurov <furkat.gofurov@est.tech>
Date:   Wed Dec 23 22:12:47 2020 +0200

    Add validations for AzureCluster Updates

diff --git a/api/v1alpha3/azurecluster_webhook.go b/api/v1alpha3/azurecluster_webhook.go
commit 9c0af5b747a4da506c0b55db44c501ff03754a4b (HEAD)
Author: Furkat Gofurov <furkat.gofurov@est.tech>
Date:   Wed Dec 23 22:12:47 2020 +0200

    Add validations for AzureCluster Updates

diff --git a/api/v1alpha3/azurecluster_webhook.go b/api/v1alpha3/azurecluster_webhook.go
index c6f351a4..a6d73138 100644
--- a/api/v1alpha3/azurecluster_webhook.go
+++ b/api/v1alpha3/azurecluster_webhook.go
@@ -17,7 +17,11 @@ limitations under the License.
 package v1alpha3

 import (
+       "reflect"
+
+       apierrors "k8s.io/apimachinery/pkg/api/errors"
        "k8s.io/apimachinery/pkg/runtime"
+       "k8s.io/apimachinery/pkg/util/validation/field"
        ctrl "sigs.k8s.io/controller-runtime"
        logf "sigs.k8s.io/controller-runtime/pkg/runtime/log"
        "sigs.k8s.io/controller-runtime/pkg/webhook"
@@ -56,8 +60,35 @@ func (c *AzureCluster) ValidateCreate() error {
 // ValidateUpdate implements webhook.Validator so a webhook will be registered for the type
 func (c *AzureCluster) ValidateUpdate(oldRaw runtime.Object) error {
        clusterlog.Info("validate update", "name", c.Name)
+       var allErrs field.ErrorList
        old := oldRaw.(*AzureCluster)
-       return c.validateCluster(old)
+
+       if !reflect.DeepEqual(c.Spec.ResourceGroup, old.Spec.ResourceGroup) {
+               allErrs = append(allErrs,
+                       field.Invalid(field.NewPath("spec", "ResourceGroup"),
 import (
+       "reflect"
+
+       apierrors "k8s.io/apimachinery/pkg/api/errors"
        "k8s.io/apimachinery/pkg/runtime"
+       "k8s.io/apimachinery/pkg/util/validation/field"
        ctrl "sigs.k8s.io/controller-runtime"
        logf "sigs.k8s.io/controller-runtime/pkg/runtime/log"
        "sigs.k8s.io/controller-runtime/pkg/webhook"
@@ -56,8 +60,35 @@ func (c *AzureCluster) ValidateCreate() error {
 // ValidateUpdate implements webhook.Validator so a webhook will be registered for the type
 func (c *AzureCluster) ValidateUpdate(oldRaw runtime.Object) error {
        clusterlog.Info("validate update", "name", c.Name)
+       var allErrs field.ErrorList
        old := oldRaw.(*AzureCluster)
-       return c.validateCluster(old)
+
+       if !reflect.DeepEqual(c.Spec.ResourceGroup, old.Spec.ResourceGroup) {
+               allErrs = append(allErrs,
+                       field.Invalid(field.NewPath("spec", "ResourceGroup"),
+                               c.Spec.ResourceGroup, "field is immutable"),
+               )
+       }
+
+       if !reflect.DeepEqual(c.Spec.SubscriptionID, old.Spec.SubscriptionID) {
+               allErrs = append(allErrs,
+                       field.Invalid(field.NewPath("spec", "SubscriptionID"),
+                               c.Spec.SubscriptionID, "field is immutable"),
+               )
+       }
+
+       if !reflect.DeepEqual(c.Spec.Location, old.Spec.Location) {
+               allErrs = append(allErrs,
+                       field.Invalid(field.NewPath("spec", "Location"),
+                               c.Spec.Location, "field is immutable"),
+               )
+       }
+
+       if len(allErrs) == 0 {
+               return c.validateCluster(old)
+       }
+
+       return apierrors.NewInvalid(GroupVersion.WithKind("AzureCluster").GroupKind(), c.Name, allErrs)
 }

 // ValidateDelete implements webhook.Validator so a webhook will be registered for the type
diff --git a/api/v1alpha3/azurecluster_webhook_test.go b/api/v1alpha3/azurecluster_webhook_test.go
index ee25a804..03bd2e9a 100644
--- a/api/v1alpha3/azurecluster_webhook_test.go
+++ b/api/v1alpha3/azurecluster_webhook_test.go
@@ -100,9 +100,10 @@ func TestAzureCluster_ValidateUpdate(t *testing.T) {
        g := NewWithT(t)

        tests := []struct {
-               name    string
-               cluster *AzureCluster
-               wantErr bool
+               name       string
+               oldCluster *AzureCluster
+               cluster    *AzureCluster
+               wantErr    bool
cluster-api-provider-azure $ gst
HEAD detached at 9c0af5b7
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

nothing to commit, working tree clean
cluster-api-provider-azure $ gst
HEAD detached at 9c0af5b7
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/azurecluster_webhook_test.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 1 path from the index
cluster-api-provider-azure $ g bisect bad
9c0af5b747a4da506c0b55db44c501ff03754a4b is the first bad commit
commit 9c0af5b747a4da506c0b55db44c501ff03754a4b
Author: Furkat Gofurov <furkat.gofurov@est.tech>
Date:   Wed Dec 23 22:12:47 2020 +0200

    Add validations for AzureCluster Updates

 api/v1alpha3/azurecluster_webhook.go      | 33 +++++++++++++++++++-
 api/v1alpha3/azurecluster_webhook_test.go | 52 ++++++++++++++++++++++++++++---
 2 files changed, 80 insertions(+), 5 deletions(-)
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ g bisect terms
Your current terms are good for the old state
and bad for the new state.
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ gst
HEAD detached at 9c0af5b7
You are currently bisecting, started from branch 'fix-1760'.
  (use "git bisect reset" to get back to the original branch)

nothing to commit, working tree clean
cluster-api-provider-azure $ g bisect reset
cluster-api-provider-azure $ cat .git/refs/bisect/
bad                                            good-c613c3bef6e3619ec31c17f7c4aa71697175602d
good-1109ed7d01d1a3d0dcbb700c2418798e749170d0  good-e7ebdf3bef11fcb5a6e001b2860ae8d6654e0202
good-6783e86e73a7c6f3c1c5cd0479a684f2add9afab  good-f1430845a22e952edb20b55f2be198eb4795bdc8
good-752728db490b719f2f935b042dde0defe29c246c  good-fd959a87b2f8feca2f25754f315dc1afad6b138e
good-c3ec13f5f22927cdf6b41ab164157f6a188ab30e
cluster-api-provider-azure $ cat .git/refs/bisect/bad
9c0af5b747a4da506c0b55db44c501ff03754a4b
cluster-api-provider-azure $ g bisect reset
Previous HEAD position was 9c0af5b7 Add validations for AzureCluster Updates
Switched to branch 'fix-1760'
Your branch and 'origin/fix-1760' have diverged,
and have 22 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)
cluster-api-provider-azure $ gst
On branch fix-1760
Your branch and 'origin/fix-1760' have diverged,
and have 22 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)

nothing to commit, working tree clean
cluster-api-provider-azure $
```
