
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

- 