
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
        - `azurecluster azureEnvironment is immutable` - two duplicate tests with the same name too!
    - When commenting out all the tests which did not contain the `oldCluster` field, the `TestAzureCluster_ValidateUpdate` test passed with all uncommented sub tests passing!

- Fix `TestReconcileBastionHosts` test - there's a fix in https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1754
- Fix `TestDeleteBastionHost` test - there's a fix in https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1754


----


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

