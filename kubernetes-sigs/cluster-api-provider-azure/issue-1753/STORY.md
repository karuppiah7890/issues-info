https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1753

Fixes #1753

This PR fixes some of the tests in `bastion_hosts_test.go` file

https://github.com/kubernetes-sigs/cluster-api-provider-azure/commits/f7376856cf2d8f26cd60fee4ca2d395580665c9f commit made some changes to how `bastionhosts` service `Reconcile` method works and removed the creation of public IP from the `bastionhosts` service's `Reconcile` logic and moved it into `publicips` service `Reconcile` logic by just defining a public ip spec for the bastion host in the cluster scope. The tests were not changed to as part of this commit though, to reflect the changed code. And for some reason the tests passed, though the tests should have ideally failed due to the code change but no test change. This shows there's some shady behavior that we are yet to uncover, leading to false results, in this case false passing tests when the tests should have failed

This PR does the following

- Remove `create publicip fails` test in bastion host `Reconcile` test as we don't create public IP as part of bastion host `Reconcile`
- Remove unnecessary / wrong method call expectations using mocks
  - `mPublicIP.CreateOrUpdate` method call expectations
  - `m.Delete(gomockinternal.AContext(), "my-rg", "my-bastionhost1")` expectation
- Fix the order of method call expectations using mocks
  - `mPublicIP.Get` gets called before `mSubnet.Get`
- Comment out `t.Parallel` temporarily with details about the removal of parallelization - tldr; enabling parallel tests seems to give wrong test results
- Fix the expected error messages
