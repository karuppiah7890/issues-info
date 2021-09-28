https://github.com/pingcap/tidb/issues/28413

TODO
- Ensure `"github.com/pingcap/check"` import is not present [DONE]
- Ensure `"github.com/pingcap/tidb/util/testleak"` import is not present [DONE]
- Migrate all tests to golang tests using Testify [DONE]
- Parallelize all the tests using `t.Parallel()` [DONE]

---

Low Level TODO - migrate the following tests
- TestListPartitionPushDown
- TestListColVariousTypes
- TestListPartitionPruning
- TestListPartitionFunctions
- TestListPartitionOrderLimit
- TestListPartitionAgg
- TestListPartitionDML
- TestListPartitionCreation
- TestListPartitionDDL
- TestListPartitionOperations
- TestListPartitionPrivilege
- TestListPartitionShardBits
- TestListPartitionSplitRegion
- TestListPartitionView
- TestListPartitionAutoIncre
- TestListPartitionAutoRandom
- TestListPartitionInvisibleIdx
- TestListPartitionCTE
- TestListPartitionTempTable
- TestListPartitionAlterPK
- TestListPartitionRandomTransaction
- TestIssue27018
- TestIssue27017
- TestIssue27544
- TestIssue27012
- TestIssue27030
- TestIssue27070
- TestIssue27031
- TestIssue27493

---

`planner/core: migrate TestListPartitionPushDown to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionPushDown$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListColVariousTypes to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListColVariousTypes$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionPruning to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionPruning$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionFunctions to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionFunctions$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionOrderLimit to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionOrderLimit$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionAgg to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionAgg$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionDML to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionDML$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionCreation to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionCreation$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionDDL to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionDDL$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionOperations to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionOperations$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionPrivilege to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionPrivilege$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionShardBits to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionShardBits$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionSplitRegion to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionSplitRegion$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionView to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionView$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionAutoIncre to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionAutoIncre$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionAutoRandom to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionAutoRandom$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionInvisibleIdx to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionInvisibleIdx$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionCTE to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionCTE$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionTempTable to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionTempTable$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionAlterPK to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionAlterPK$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestListPartitionRandomTransaction to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestListPartitionRandomTransaction$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestIssue27018 to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue27018$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestIssue27017 to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue27017$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestIssue27544 to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue27544$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestIssue27012 to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue27012$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestIssue27030 to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue27030$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestIssue27070 to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue27070$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestIssue27031 to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue27031$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

`planner/core: migrate TestIssue27493 to testify (#28413)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue27493$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

```bash
{ make failpoint-enable; go test -v github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

---

I was thinking about how to migrate `GetTestCases` present in `util/testutil/testutil.go`, but it's already migrated thankfully in `testkit/testdata/testdata.go`

I didn't realize it until I started digging up a bit. Initially I thought `GetTestCases` was being used in that file. Should have checked all searches, anyways, glad it's migrated

```bash
$ rg GetTestCases -l
session/clustered_index_test.go
executor/aggregate_test.go
executor/point_get_test.go
executor/prepared_test.go
executor/partition_table_test.go
expression/flag_simplify_test.go
executor/join_test.go
expression/constant_propagation_test.go
executor/executor_test.go
testkit/testdata/testdata.go
planner/cascades/stringer_test.go
planner/cascades/integration_test.go
planner/core/indexmerge_test.go
planner/core/stats_test.go
planner/core/integration_partition_test.go
planner/core/integration_test.go
planner/core/plan_test.go
planner/core/point_get_plan_test.go
planner/core/physical_plan_test.go
planner/core/cbo_test.go
planner/core/rule_result_reorder_test.go
planner/core/partition_pruner_test.go
planner/core/enforce_mpp_test.go
planner/core/expression_rewriter_test.go
planner/core/logical_plan_test.go
planner/cascades/transformation_rules_test.go
util/testutil/testutil.go
util/ranger/ranger_test.go
statistics/integration_test.go
statistics/selectivity_test.go
```

---

I was checking out about the test setup and how to migrate it

Looks like a similar thing has been done here `planner/cascades/main_test.go`. The `github.com/pingcap/tidb/testkit/testdata` package is being used and the setup of the whole test suite is being done in the `TestMain` instead of every test

For now I'll just load one test suite data, but I think there will be more in the future

```bash
tidb $ rg LoadTestSuiteData planner/core -l
planner/core/enforce_mpp_test.go
planner/core/expression_rewriter_test.go
planner/core/indexmerge_test.go
planner/core/stats_test.go
planner/core/integration_partition_test.go
planner/core/integration_test.go
planner/core/plan_test.go
planner/core/point_get_plan_test.go
planner/core/physical_plan_test.go
planner/core/cbo_test.go
planner/core/rule_result_reorder_test.go
planner/core/partition_pruner_test.go
planner/core/logical_plan_test.go
tidb $ rg LoadTestSuiteData planner/core
planner/core/logical_plan_test.go
68:	s.testData, err = testutil.LoadTestSuiteData("testdata", "plan_suite_unexported")

planner/core/indexmerge_test.go
47:	s.testdata, err = testutil.LoadTestSuiteData("testdata", "index_merge_suite")

planner/core/stats_test.go
41:	s.testData, err = testutil.LoadTestSuiteData("testdata", "stats_suite")

planner/core/integration_partition_test.go
45:	s.testData, err = testutil.LoadTestSuiteData("testdata", "integration_partition_suite")

planner/core/integration_test.go
55:	s.testData, err = testutil.LoadTestSuiteData("testdata", "integration_suite")
83:	s.testData, err = testutil.LoadTestSuiteData("testdata", "integration_serial_suite")

planner/core/plan_test.go
51:	s.testData, err = testutil.LoadTestSuiteData("testdata", "plan_normalized_suite")

planner/core/point_get_plan_test.go
55:	s.testData, err = testutil.LoadTestSuiteData("testdata", "point_get_plan")

planner/core/cbo_test.go
54:	s.testData, err = testutil.LoadTestSuiteData("testdata", "analyze_suite")

planner/core/rule_result_reorder_test.go
127:	s.testData, err = testutil.LoadTestSuiteData("testdata", "ordered_result_mode_suite")

planner/core/physical_plan_test.go
69:	s.testData, err = testutil.LoadTestSuiteData("testdata", "plan_suite")

planner/core/partition_pruner_test.go
47:	s.testData, err = testutil.LoadTestSuiteData("testdata", "partition_pruner")

planner/core/enforce_mpp_test.go
40:	s.testData, err = testutil.LoadTestSuiteData("testdata", "enforce_mpp_suite")

planner/core/expression_rewriter_test.go
36:	s.testData, err = testutil.LoadTestSuiteData("testdata", "expression_rewriter_suite")
tidb $ 
```
