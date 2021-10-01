https://github.com/pingcap/tidb/issues/28413

TODO

- Ensure `"github.com/pingcap/check"` import is not present
- Ensure `"github.com/pingcap/tidb/util/testleak"` import is not present
- Migrate all tests to golang tests using Testify

---

Low Level TODO - migrate the following tests

- TestListPartitionPushDown [DONE]
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

---

```bash
tidb $ { make failpoint-enable; go test -v -run ^TestListPartitionPushDown$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
=== RUN   TestListPartitionPushDown
[2021/10/01 09:30:00.761 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=59ac33e1-c2a1-4ad2-97ac-f4d73a53446a] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/01 09:30:00.773 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=f7616425-09a9-46ac-b784-ffb48ac296e8] [runWorker=true]
[2021/10/01 09:30:00.773 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/01 09:30:00.773 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/01 09:30:00.773 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 1, tp general"]
[2021/10/01 09:30:00.773 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 2, tp add index"]
[2021/10/01 09:30:00.774 +05:30] [INFO] [domain.go:163] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=0] ["start time"=1.256043ms]
[2021/10/01 09:30:00.774 +05:30] [INFO] [domain.go:386] ["full load and reset schema validator"]
[2021/10/01 09:30:00.775 +05:30] [INFO] [tidb.go:246] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/10/01 09:30:00.775 +05:30] [WARN] [session.go:1579] ["run statement failed"] [schemaVersion=0] [error="[schema:1049]Unknown database 'mysql'"] [errorVerbose="[schema:1049]Unknown database 'mysql'\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.(*Error).GenWithStackByArgs\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/normalize.go:159\ngithub.com/pingcap/tidb/executor.(*SimpleExec).executeUse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:556\ngithub.com/pingcap/tidb/executor.(*SimpleExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:126\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:584\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:465\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:414\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1682\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1576\ngithub.com/pingcap/tidb/session.(*session).ExecuteInternal\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1286\ngithub.com/pingcap/tidb/session.checkBootstrapped\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:604\ngithub.com/pingcap/tidb/session.bootstrap\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:358\ngithub.com/pingcap/tidb/session.runInBootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2579\ngithub.com/pingcap/tidb/session.BootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2432\ngithub.com/pingcap/tidb/planner/core_test.newStoreWithBootstrap\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/cbo_test.go:614\ngithub.com/pingcap/tidb/planner/core_test.SetUpTest\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/integration_partition_test.go:64\ngithub.com/pingcap/tidb/planner/core_test.TestListPartitionPushDown\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/integration_partition_test.go:82\ntesting.tRunner\n\t/usr/local/Cellar/go/1.17.1/libexec/src/testing/testing.go:1259\nruntime.goexit\n\t/usr/local/Cellar/go/1.17.1/libexec/src/runtime/asm_amd64.s:1581"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 0,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/10/01 09:30:00.775 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=0] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS test"] [user=]
[2021/10/01 09:30:00.777 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.776 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.777 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.776 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS test"]
[2021/10/01 09:30:00.777 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.776 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.777 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:synced, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.776 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.778 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=2]
[2021/10/01 09:30:00.778 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.779 +05:30] [INFO] [domain.go:163] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=1] ["start time"=1.171635ms]
[2021/10/01 09:30:00.779 +05:30] [INFO] [domain.go:386] ["full load and reset schema validator"]
[2021/10/01 09:30:00.779 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=1] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS `mysql`"] [user=]
[2021/10/01 09:30:00.780 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.779 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.780 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.779 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS `mysql`"]
[2021/10/01 09:30:00.780 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.779 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.780 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:synced, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.779 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.781 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=4]
[2021/10/01 09:30:00.781 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.781 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=1] [neededSchemaVersion=2] ["start time"=110.819µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/10/01 09:30:00.781 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=2] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"] [user=]
[2021/10/01 09:30:00.783 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.782 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.783 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.782 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"]
[2021/10/01 09:30:00.783 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.782 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.786 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.782 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.787 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=6]
[2021/10/01 09:30:00.787 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.788 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=2] [neededSchemaVersion=3] ["start time"=506.055µs] [phyTblIDs="[5]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.788 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=3] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"] [user=]
[2021/10/01 09:30:00.788 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.788 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.788 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.788 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"]
[2021/10/01 09:30:00.789 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.788 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.789 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.788 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.790 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=8]
[2021/10/01 09:30:00.790 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.790 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=3] [neededSchemaVersion=4] ["start time"=182.896µs] [phyTblIDs="[7]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.790 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=4] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"] [user=]
[2021/10/01 09:30:00.791 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.791 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.791 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.791 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"]
[2021/10/01 09:30:00.792 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.791 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.794 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.791 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.794 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=10]
[2021/10/01 09:30:00.794 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.795 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=4] [neededSchemaVersion=5] ["start time"=364.85µs] [phyTblIDs="[9]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.795 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=5] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"] [user=]
[2021/10/01 09:30:00.796 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.795 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.796 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.795 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"]
[2021/10/01 09:30:00.796 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.795 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.797 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.795 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.798 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=12]
[2021/10/01 09:30:00.798 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.798 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=5] [neededSchemaVersion=6] ["start time"=244.987µs] [phyTblIDs="[11]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.798 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=6] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"] [user=]
[2021/10/01 09:30:00.799 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.798 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.799 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.798 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"]
[2021/10/01 09:30:00.799 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.798 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.800 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.798 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.800 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=14]
[2021/10/01 09:30:00.800 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.801 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=6] [neededSchemaVersion=7] ["start time"=245.249µs] [phyTblIDs="[13]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.801 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=7] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"] [user=]
[2021/10/01 09:30:00.801 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.801 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.801 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.801 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"]
[2021/10/01 09:30:00.802 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.801 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.802 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.801 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.803 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=16]
[2021/10/01 09:30:00.803 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.803 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=7] [neededSchemaVersion=8] ["start time"=142.811µs] [phyTblIDs="[15]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.803 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=8] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"] [user=]
[2021/10/01 09:30:00.803 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.803 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.803 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.803 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"]
[2021/10/01 09:30:00.804 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.803 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.804 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.803 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.805 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=18]
[2021/10/01 09:30:00.805 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.805 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=8] [neededSchemaVersion=9] ["start time"=165.567µs] [phyTblIDs="[17]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.805 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=9] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"] [user=]
[2021/10/01 09:30:00.806 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.805 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.806 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.805 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"]
[2021/10/01 09:30:00.806 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.805 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.807 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.805 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.807 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=20]
[2021/10/01 09:30:00.807 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.807 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=9] [neededSchemaVersion=10] ["start time"=219.797µs] [phyTblIDs="[19]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.808 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=10] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"] [user=]
[2021/10/01 09:30:00.808 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.808 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.808 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.808 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"]
[2021/10/01 09:30:00.808 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.808 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.809 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.808 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.810 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=22]
[2021/10/01 09:30:00.810 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.810 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=10] [neededSchemaVersion=11] ["start time"=188.305µs] [phyTblIDs="[21]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.810 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=11] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/01 09:30:00.810 +05:30] [INFO] [ddl_api.go:596] ["Automatically convert BLOB(6291456) to MEDIUMBLOB"]
[2021/10/01 09:30:00.811 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.81 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.811 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.81 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/01 09:30:00.811 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.81 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.812 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.81 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.813 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=24]
[2021/10/01 09:30:00.813 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.813 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=11] [neededSchemaVersion=12] ["start time"=226.204µs] [phyTblIDs="[23]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.813 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=12] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"] [user=]
[2021/10/01 09:30:00.814 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.813 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.814 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.813 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"]
[2021/10/01 09:30:00.814 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.813 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.815 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.813 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.815 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=26]
[2021/10/01 09:30:00.815 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.816 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=12] [neededSchemaVersion=13] ["start time"=221.693µs] [phyTblIDs="[25]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.816 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=13] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"] [user=]
[2021/10/01 09:30:00.816 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.816 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.817 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.816 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"]
[2021/10/01 09:30:00.817 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.816 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.818 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.816 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.818 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=28]
[2021/10/01 09:30:00.818 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.818 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=13] [neededSchemaVersion=14] ["start time"=178.224µs] [phyTblIDs="[27]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.818 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=14] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"] [user=]
[2021/10/01 09:30:00.819 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.819 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"]
[2021/10/01 09:30:00.819 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.820 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.820 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=30]
[2021/10/01 09:30:00.820 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.821 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=14] [neededSchemaVersion=15] ["start time"=190.11µs] [phyTblIDs="[29]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.821 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=15] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/01 09:30:00.821 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.821 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.821 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.821 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"]
[2021/10/01 09:30:00.822 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.821 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.822 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.821 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.823 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=32]
[2021/10/01 09:30:00.823 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.823 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=15] [neededSchemaVersion=16] ["start time"=167.754µs] [phyTblIDs="[31]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.823 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=16] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"] [user=]
[2021/10/01 09:30:00.824 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.823 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.824 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.823 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"]
[2021/10/01 09:30:00.824 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.823 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.825 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.823 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.825 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=34]
[2021/10/01 09:30:00.825 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.825 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=16] [neededSchemaVersion=17] ["start time"=202.226µs] [phyTblIDs="[33]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.825 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=17] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"] [user=]
[2021/10/01 09:30:00.826 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.826 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.826 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.826 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"]
[2021/10/01 09:30:00.826 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.826 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.827 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.826 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.827 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=36]
[2021/10/01 09:30:00.827 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.828 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=17] [neededSchemaVersion=18] ["start time"=180.515µs] [phyTblIDs="[35]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.828 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=18] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"] [user=]
[2021/10/01 09:30:00.828 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.828 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.828 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.828 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"]
[2021/10/01 09:30:00.829 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.828 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.830 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.828 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.830 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=38]
[2021/10/01 09:30:00.830 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.830 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=18] [neededSchemaVersion=19] ["start time"=215.915µs] [phyTblIDs="[37]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.832 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=19] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/01 09:30:00.832 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.832 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.832 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.832 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/01 09:30:00.832 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.832 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.833 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.832 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.834 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=40]
[2021/10/01 09:30:00.834 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.834 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=19] [neededSchemaVersion=20] ["start time"=196.259µs] [phyTblIDs="[39]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.834 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=20] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"] [user=]
[2021/10/01 09:30:00.834 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.834 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.834 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.834 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"]
[2021/10/01 09:30:00.835 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.834 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.835 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.834 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.836 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=42]
[2021/10/01 09:30:00.836 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.836 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=20] [neededSchemaVersion=21] ["start time"=160.334µs] [phyTblIDs="[41]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.836 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=21] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"] [user=]
[2021/10/01 09:30:00.836 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.836 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.836 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.836 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"]
[2021/10/01 09:30:00.837 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.836 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.837 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.836 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.838 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=44]
[2021/10/01 09:30:00.838 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.838 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=21] [neededSchemaVersion=22] ["start time"=126.616µs] [phyTblIDs="[43]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.838 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=22] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"] [user=]
[2021/10/01 09:30:00.838 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.838 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.838 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.838 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"]
[2021/10/01 09:30:00.839 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.838 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.840 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.838 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.840 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=46]
[2021/10/01 09:30:00.840 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.840 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=22] [neededSchemaVersion=23] ["start time"=195.565µs] [phyTblIDs="[45]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.840 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=23] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"] [user=]
[2021/10/01 09:30:00.841 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.841 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.841 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.841 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"]
[2021/10/01 09:30:00.841 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.841 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.842 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.841 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.842 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=48]
[2021/10/01 09:30:00.842 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.843 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=23] [neededSchemaVersion=24] ["start time"=218.898µs] [phyTblIDs="[47]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.843 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=24] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/01 09:30:00.843 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.843 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.843 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.843 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/01 09:30:00.844 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.843 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.844 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.843 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.845 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=50]
[2021/10/01 09:30:00.845 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.845 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=24] [neededSchemaVersion=25] ["start time"=151.714µs] [phyTblIDs="[49]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.845 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=25] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"] [user=]
[2021/10/01 09:30:00.846 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.845 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.846 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.845 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"]
[2021/10/01 09:30:00.846 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.845 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.846 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.845 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.847 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=52]
[2021/10/01 09:30:00.847 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.847 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=25] [neededSchemaVersion=26] ["start time"=167.384µs] [phyTblIDs="[51]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.847 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=26] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"] [user=]
[2021/10/01 09:30:00.848 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.847 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.848 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.847 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"]
[2021/10/01 09:30:00.848 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.847 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.849 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.847 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.849 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=54]
[2021/10/01 09:30:00.849 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.849 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=26] [neededSchemaVersion=27] ["start time"=165.948µs] [phyTblIDs="[53]"] [actionTypes="[8]"]
[2021/10/01 09:30:00.868 +05:30] [INFO] [bootstrap.go:375] ["bootstrap successful"] ["take time"=93.395063ms]
[2021/10/01 09:30:00.868 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 1, tp general"] ["take time"=555ns]
[2021/10/01 09:30:00.868 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 2, tp add index"] ["take time"=323ns]
[2021/10/01 09:30:00.868 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/01 09:30:00.868 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/01 09:30:00.868 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=f7616425-09a9-46ac-b784-ffb48ac296e8] ["take time"=504.359µs]
[2021/10/01 09:30:00.869 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=f7616425-09a9-46ac-b784-ffb48ac296e8]
[2021/10/01 09:30:00.869 +05:30] [INFO] [domain.go:436] ["topNSlowQueryLoop exited."]
[2021/10/01 09:30:00.869 +05:30] [INFO] [domain.go:493] ["topologySyncerKeeper exited."]
[2021/10/01 09:30:00.869 +05:30] [INFO] [domain.go:649] ["domain closed"] ["take time"=571.927µs]
[2021/10/01 09:30:00.869 +05:30] [INFO] [domain.go:465] ["infoSyncerKeeper exited."]
[2021/10/01 09:30:00.869 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=59ac33e1-c2a1-4ad2-97ac-f4d73a53446a] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/01 09:30:00.869 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=d5622351-1c17-464c-a27d-2770c36fc17a] [runWorker=true]
[2021/10/01 09:30:00.869 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/01 09:30:00.869 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/01 09:30:00.869 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 3, tp general"]
[2021/10/01 09:30:00.869 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 4, tp add index"]
[2021/10/01 09:30:00.872 +05:30] [INFO] [domain.go:163] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=27] ["start time"=2.920831ms]
[2021/10/01 09:30:00.872 +05:30] [INFO] [domain.go:386] ["full load and reset schema validator"]
[2021/10/01 09:30:00.876 +05:30] [WARN] [sysvar_cache.go:51] ["sysvar cache is empty, triggering rebuild"]
[2021/10/01 09:30:00.884 +05:30] [INFO] [telemetry.go:174] ["Telemetry configuration"] [endpoint=https://telemetry.pingcap.com/api/v1/tidb/report] [report_interval=6h0m0s] [enabled=true]
[2021/10/01 09:30:00.885 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=27] [cur_db=] [sql="create database list_push_down"] [user=]
[2021/10/01 09:30:00.885 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:56, Type:create schema, State:none, SchemaState:queueing, SchemaID:55, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.885 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.885 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:56, Type:create schema, State:none, SchemaState:queueing, SchemaID:55, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.885 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create database list_push_down"]
[2021/10/01 09:30:00.886 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:56, Type:create schema, State:none, SchemaState:queueing, SchemaID:55, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.885 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.886 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:56, Type:create schema, State:synced, SchemaState:public, SchemaID:55, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.885 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.886 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=56]
[2021/10/01 09:30:00.886 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.886 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=27] [neededSchemaVersion=28] ["start time"=66.397µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/10/01 09:30:00.887 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=28] [cur_db=list_push_down] [sql="drop table if exists tlist"] [user=]
[2021/10/01 09:30:00.887 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=28] [cur_db=list_push_down] [sql="create table tlist (a int) partition by list (a) (\n    partition p0 values in (0, 1, 2),\n    partition p1 values in (3, 4, 5))"] [user=]
[2021/10/01 09:30:00.888 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:60, Type:create table, State:none, SchemaState:queueing, SchemaID:55, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.888 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.888 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:60, Type:create table, State:none, SchemaState:queueing, SchemaID:55, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.888 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table tlist (a int) partition by list (a) (\n    partition p0 values in (0, 1, 2),\n    partition p1 values in (3, 4, 5))"]
[2021/10/01 09:30:00.888 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:60, Type:create table, State:none, SchemaState:queueing, SchemaID:55, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.888 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.889 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:60, Type:create table, State:synced, SchemaState:public, SchemaID:55, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.888 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.889 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=60]
[2021/10/01 09:30:00.889 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.890 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=28] [neededSchemaVersion=29] ["start time"=392.676µs] [phyTblIDs="[57,58,59]"] [actionTypes="[8,8,8]"]
[2021/10/01 09:30:00.890 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=29] [cur_db=list_push_down] [sql="create table tcollist (a int) partition by list columns(a) (\n    partition p0 values in (0, 1, 2),\n    partition p1 values in (3, 4, 5))"] [user=]
[2021/10/01 09:30:00.891 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:64, Type:create table, State:none, SchemaState:queueing, SchemaID:55, TableID:61, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.891 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/01 09:30:00.891 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:64, Type:create table, State:none, SchemaState:queueing, SchemaID:55, TableID:61, RowCount:0, ArgLen:1, start time: 2021-10-01 09:30:00.891 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table tcollist (a int) partition by list columns(a) (\n    partition p0 values in (0, 1, 2),\n    partition p1 values in (3, 4, 5))"]
[2021/10/01 09:30:00.891 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:64, Type:create table, State:none, SchemaState:queueing, SchemaID:55, TableID:61, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.891 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.892 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:64, Type:create table, State:synced, SchemaState:public, SchemaID:55, TableID:61, RowCount:0, ArgLen:0, start time: 2021-10-01 09:30:00.891 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/01 09:30:00.892 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=64]
[2021/10/01 09:30:00.892 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/01 09:30:00.893 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=29] [neededSchemaVersion=30] ["start time"=386.594µs] [phyTblIDs="[61,62,63]"] [actionTypes="[8,8,8]"]
[2021/10/01 09:30:00.895 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 3, tp general"] ["take time"=2.273µs]
[2021/10/01 09:30:00.895 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 4, tp add index"] ["take time"=100ns]
[2021/10/01 09:30:00.895 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/01 09:30:00.895 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/01 09:30:00.895 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=d5622351-1c17-464c-a27d-2770c36fc17a] ["take time"=45.809µs]
[2021/10/01 09:30:00.895 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=d5622351-1c17-464c-a27d-2770c36fc17a]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:436] ["topNSlowQueryLoop exited."]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:898] ["loadPrivilegeInLoop exited."]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:493] ["topologySyncerKeeper exited."]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:1025] ["globalBindHandleWorkerLoop exited."]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:465] ["infoSyncerKeeper exited."]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:1129] ["TelemetryRotateSubWindowLoop exited."]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:1066] ["handleEvolvePlanTasksLoop exited."]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:1099] ["TelemetryReportLoop exited."]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:649] ["domain closed"] ["take time"=123.031µs]
[2021/10/01 09:30:00.895 +05:30] [INFO] [domain.go:947] ["LoadSysVarCacheLoop exited."]
[2021/10/01 09:30:00.915 +05:30] [INFO] [db.go:567] ["Closing database"]
[2021/10/01 09:30:00.915 +05:30] [INFO] [db.go:592] ["Memtable flushed"]
[2021/10/01 09:30:00.915 +05:30] [INFO] [db.go:596] ["Compaction finished"]
[2021/10/01 09:30:00.915 +05:30] [INFO] [db.go:615] ["BlobManager finished"]
[2021/10/01 09:30:00.915 +05:30] [INFO] [db.go:619] ["ResourceManager finished"]
[2021/10/01 09:30:00.915 +05:30] [INFO] [db.go:625] ["Waiting for closer"]
--- PASS: TestListPartitionPushDown (0.27s)
PASS
ok  	github.com/pingcap/tidb/planner/core	1.154s
tidb $ 
```


