https://github.com/pingcap/tidb/issues/28577

As part of https://github.com/pingcap/tidb/issues/28542 , I figured - let me migrate the tests to testify to easily run one test at at time in my editor with ease with Golang tests. That's why I'm going to migrate the whole executor_test.go file

[TODO] [Level-1]

- Ensure `github.com/pingcap/check` import is not present
- Migrate all tests to golang tests using Testify
- Parallelize test that can be parallelized, but not all are like that so beware!!
- Remove dependency on `github.com/pingcap/tidb/util/testutil` package and ensure the import is not present. This is because it depends on `github.com/pingcap/check`
- Remove dependency on `github.com/pingcap/tidb/util/testkit` package and ensure the import is not present. This is because it depends on `github.com/pingcap/check`

---

[TODO] [Level-2]

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/.*$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

- testSuiteP1 > TestPessimisticSelectForUpdate [DONE]
- testSuiteP1 > TestBind [DONE]
- testSuiteP1 > TestChangePumpAndDrainer [DONE]
- testSuiteP1 > TestLoadStats [DONE]
- testSuiteP1 > TestPlanReplayer [DONE]
- testSuiteP1 > TestShow [DONE]
- testSuiteP1 > TestSelectWithoutFrom [DONE]
- testSuiteP1 > TestSelectBackslashN [DONE]
- testSuiteP1 > TestSelectNull [DONE]
- testSuiteP1 > TestSelectStringLiteral [DONE]
- testSuiteP1 > TestSelectLimit [DONE]
- testSuiteP1 > TestSelectOrderBy [DONE]
- testSuiteP1 > TestOrderBy [DONE]
- testSuiteP1 > TestSelectErrorRow [DONE]
- testSuiteP1 > TestIssue2612 [DONE]
- testSuiteP1 > TestIssue345 [DONE]
- testSuiteP1 > TestIssue5055 [DONE]
- testSuiteP1 > TestNeighbouringProj [DONE]
- testSuiteP1 > TestIn [DONE]
- testSuiteP1 > TestTablePKisHandleScan [DONE]
- testSuiteP1 > TestIndexReverseOrder [DONE]
- testSuiteP1 > TestTableReverseOrder [DONE]
- testSuiteP1 > TestDefaultNull [DONE]
- testSuiteP1 > TestUnsignedPKColumn [DONE]
- testSuiteP1 > TestJSON [DONE]
- testSuiteP1 > TestMultiUpdate [DONE]
- testSuiteP1 > TestGeneratedColumnWrite [DONE]
- testSuiteP1 > TestGeneratedColumnRead [DONE]
- testSuiteP1 > TestGeneratedColumnPointGet [DONE]
- testSuiteP1 > TestUnionAutoSignedCast [DONE]
- testSuiteP1 > TestUpdateClustered [DONE]
- testSuiteP1 > TestSelectPartition [DONE]
- testSuiteP1 > TestDeletePartition [DONE]
- testSuiteP1 > TestPrepareLoadData [DONE]
- testSuiteP1 > TestIssue22941 [DONE]
- testSuiteP1 > TestIssue28935 [DONE]

- testSuite3 > TestAdmin
- testSuite3 > TestYearTypeDeleteIndex
- testSuite3 > TestForSelectScopeInUnion
- testSuite3 > TestUnsignedDecimalOverflow
- testSuite3 > TestIndexJoinTableDualPanic
- testSuite3 > TestSortLeftJoinWithNullColumnInRightChildPanic
- testSuite3 > TestMaxOneRow
- testSuite3 > TestRowID
- testSuite3 > TestDoSubquery
- testSuite3 > TestSubqueryTableAlias
- testSuite3 > TestSelectHashPartitionTable

- testSuite > TestScanControlSelection
- testSuite > TestSimpleDAG
- testSuite > TestTimestampTimeZone
- testSuite > TestTimestampDefaultValueTimeZone
- testSuite > TestTiDBCurrentTS
- testSuite > TestTiDBLastTxnInfo
- testSuite > TestTiDBLastQueryInfo
- testSuite > TestSelectForUpdate
- testSuite > TestSelectForUpdateOf
- testSuite > TestEmptyEnum
- testSuite > TestIssue4024
- testSuite > TestTimezonePushDown
- testSuite > TestNotFillCacheFlag
- testSuite > TestHandleTransfer
- testSuite > TestBit
- testSuite > TestEnum
- testSuite > TestSet
- testSuite > TestSubqueryInValues
- testSuite > TestEnhancedRangeAccess
- testSuite > TestMaxInt64Handle
- testSuite > TestTableScanWithPointRanges
- testSuite > TestUnsignedPk
- testSuite > TestSignedCommonHandle
- testSuite > TestIssue5666
- testSuite > TestIssue5341
- testSuite > TestContainDotColumn
- testSuite > TestCheckIndex
- testSuite > TestCheckTable
- testSuite > TestCheckTableClusterIndex
- testSuite > TestCoprocessorStreamingFlag
- testSuite > TestIncorrectLimitArg
- testSuite > TestLimit
- testSuite > TestCoprocessorStreamingWarning
- testSuite > TestSelectView
- testSuite > TestSummaryFailedUpdate
- testSuite > TestOOMPanicAction
- testSuite > TestIssue16921
- testSuite > TestIssue19100
- testSuite > TestGenerateColumnReplace
- testSuite > TestIssue19372
- testSuite > TestCollectDMLRuntimeStats
- testSuite > TestIssue13758
- testSuite > TestIssue20237
- testSuite > TestIssue19667
- testSuite > TestIssue20975UpdateNoChange
- testSuite > TestIssue20975SelectForUpdate
- testSuite > TestIssue20975SelectForUpdatePointGet
- testSuite > TestIssue20975SelectForUpdateBatchPointGet
- testSuite > TestIssue20975UpdateNoChangeWithPartitionTable
- testSuite > TestIssue20975SelectForUpdateWithPartitionTable
- testSuite > TestIssue20975SelectForUpdatePointGetWithPartitionTable
- testSuite > TestIssue20975SelectForUpdateBatchPointGetWithPartitionTable
- testSuite > TestIssue20305
- testSuite > TestIssue22817
- testSuite > TestIssue13953
- testSuite > TestZeroDateTimeCompatibility
- testSuite > TestInvalidDateValueInCreateTable
- testSuite > TestOOMActionPriority
- testSuite > Test17780
- testSuite > TestIssue9918
- testSuite > Test13004
- testSuite > Test12178
- testSuite > Test11883
- testSuite > Test15492
- testSuite > TestTrackAggMemoryUsage
- testSuite > Test12201
- testSuite > TestIssue21451
- testSuite > TestIssue15563
- testSuite > TestIssue22231
- testSuite > TestIssue22201
- testSuite > TestIssue23993
- testSuite > TestIssue23609
- testSuite > TestIssue24933
- testSuite > TestTableSampleTemporaryTable
- testSuite > TestIssue25506
- testSuite > TestIssue26348
- testSuite > TestIssue26532
- testSuite > TestIssue25447
- testSuite > TestIssue23602
- testSuite > TestCTEWithIndexLookupJoinDeadLock
- testSuite > TestGetResultRowsCount

- testSuiteP2 > TestAdminShowDDLJobs
- testSuiteP2 > TestAdminChecksumOfPartitionedTable
- testSuiteP2 > TestUnion
- testSuiteP2 > TestToPBExpr
- testSuiteP2 > TestDatumXAPI
- testSuiteP2 > TestSQLMode
- testSuiteP2 > TestTableDual
- testSuiteP2 > TestTableScan
- testSuiteP2 > TestAdapterStatement
- testSuiteP2 > TestIsPointGet
- testSuiteP2 > TestClusteredIndexIsPointGet
- testSuiteP2 > TestRow
- testSuiteP2 > TestColumnName
- testSuiteP2 > TestSelectVar
- testSuiteP2 > TestHistoryRead
- testSuiteP2 > TestCurrentTimestampValueSelection
- testSuiteP2 > TestStrToDateBuiltin
- testSuiteP2 > TestAddDateBuiltinWithWarnings
- testSuiteP2 > TestIssue27232
- testSuiteP2 > TestStrToDateBuiltinWithWarnings
- testSuiteP2 > TestReadPartitionedTable
- testSuiteP2 > TestIssue10435
- testSuiteP2 > TestPointGetPreparedPlan
- testSuiteP2 > TestPointGetPreparedPlanWithCommitMode
- testSuiteP2 > TestPointUpdatePreparedPlan
- testSuiteP2 > TestPointUpdatePreparedPlanWithCommitMode
- testSuiteP2 > TestApplyCache
- testSuiteP2 > TestProjectionBitType

- testSuiteWithData > TestSetOperation
- testSuiteWithData > TestSetOperationOnDiffColType
- testSuiteWithData > TestIndexScanWithYearCol
- testSuiteWithData > TestClusterIndexOuterJoinElimination

- testSuite2 > TestUnionLimit
- testSuite2 > TestLowResolutionTSORead
- testSuite2 > TestStaleReadFutureTime
- testSuite2 > TestAddIndexPriority

- testSuite8 > TestIndexScan

- testSerialSuite > TestPointGetRepeatableRead
- testSerialSuite > TestBatchPointGetRepeatableRead
- testSerialSuite > TestSplitRegionTimeout
- testSerialSuite > TestTiDBLastTxnInfoCommitMode
- testSerialSuite > TestTSOFail
- testSerialSuite > TestKillTableReader
- testSerialSuite > TestPrevStmtDesensitization
- testSerialSuite > TestCoprocessorOOMTicase
- testSerialSuite > TestIssue19148
- testSerialSuite > TestIssue21441
- testSerialSuite > TestTxnWriteThroughputSLI
- testSerialSuite > TestIssue24210
- testSerialSuite > TestDeadlocksTable
- testSerialSuite > TestExprBlackListForEnum

- testSuite1 > TestAlterTableComment
- testSuite1 > TestSyncLog
- testSuite1 > TestPartitionHashCode
- testSuite1 > TestAlterDefaultValue
- testSuite1 > TestIssue15718
- testSuite1 > TestIssue15767
- testSuite1 > TestIssue16025
- testSuite1 > TestIssue16854
- testSuite1 > TestInsertValuesWithSubQuery
- testSuite1 > TestDIVZeroInPartitionExpr
- testSuite1 > TestInsertIntoGivenPartitionSet
- testSuite1 > TestUpdateGivenPartitionSet
- testSuite1 > TestIssue24091

- testSuite6 > TestUpdateJoin

- testSplitTable > TestSplitRegion
- testSplitTable > TestSplitRegionEdgeCase
- testSplitTable > TestClusterIndexSplitTableIntegration
- testSplitTable > TestClusterIndexShowTableRegion
- testSplitTable > TestShowTableRegion

- testSerialSuite2 > TestUnsignedFeedback
- testSerialSuite2 > TestIssue23567

- testSuiteWithCliBaseCharset > TestCharsetFeature
- testSuiteWithCliBaseCharset > TestCharsetFeatureCollation

- testRecoverTable > TestRecoverTable
- testRecoverTable > TestFlashbackTable
- testRecoverTable > TestRecoverTempTable

- testClusterTableSuite > TestSlowQuery
- testClusterTableSuite > TestIssue20236
- testClusterTableSuite > TestSQLDigestTextRetriever
- testClusterTableSuite > TestFunctionDecodeSQLDigests
- testClusterTableSuite > TestFunctionDecodeSQLDigestsPrivilege

- testSlowQuery > TestSlowQueryWithoutSlowLog
- testSlowQuery > TestSlowQuerySensitiveQuery
- testSlowQuery > TestSlowQueryPrepared
- testSlowQuery > TestLogSlowLogIndex
- testSlowQuery > TestSlowQuery

- testSerialSuite1 > TestCollectCopRuntimeStats
- testSerialSuite1 > TestIndexLookupRuntimeStats
- testSerialSuite1 > TestHashAggRuntimeStats
- testSerialSuite1 > TestIndexMergeRuntimeStats

- testCoprCache > TestIntegrationCopCache

- testResourceTagSuite > TestResourceGroupTag

- testStaleTxnSuite > TestInvalidReadTemporaryTable



---

[TODO] [Level-3]

- Think about how to migrate the test setup
  - The setup is at suite level - so more like before all the tests run, so it has to move to `main_test.go` I guess
- Think about how the different test suites are related within the file. Also, some test suite structs are used in other test files too, so beware to NOT delete them or else other tests will fail. Also, check if the test suite setup on the struct can be removed or not, for example, if removed can it affect other tests? Or do other tests have appropriate test setup? It's a weird thing though since it's a single package and all tests in the package would run together so setup would ideally be in one place only, hmm
- Beware of using the `t.Parallel()` in the proper test functions
- Ask if we want to split the test file into multiple test files! :)

---

All test suites and which are parallel and which are serial

- testSuite [Parallel]
- testSuiteP1 [Parallel]
- testSuiteP2 [Parallel]
- testSuite2 [Parallel]
- testSuite3 [Parallel]
- testSuite4 [Parallel]
- testSuite5 [Parallel]
- testSuiteJoin1 [Parallel]
- testSuiteJoin2 [Parallel]
- testSuiteJoin3 [Parallel]
- testSuiteAgg [Parallel]
- testSuite6 [Parallel]
- testSuite7 [Parallel]
- testSuite8 [Parallel]
- testBypassSuit [Parallel]
- testUpdateSuit [Parallel]
- testPointGetSuit [Parallel]
- testBatchPointGetSuit [Parallel]
- testSuiteWithData [Parallel]
- partitionTableSuite [Parallel]
- testStaleTxnSuite [Parallel]

- testSerialSuite2 [Serial]
- testSuiteWithCliBaseCharset [Serial]
- testSuiteJoinSerial [Serial]
- testShowStatsSuite [Serial]
- testRecoverTable [Serial]
- testMemTableReaderSuite [Serial]
- testFlushSuite [Serial]
- testAutoRandomSuite [Serial]
- testClusterTableSuite [Serial]
- testPrepareSerialSuite [Serial]
- testSplitTable [Serial]
- testSerialSuite1 [Serial]
- testSlowQuery [Serial]
- tiflashTestSuite [Serial]
- globalIndexSuite [Serial]
- testSerialSuite [Serial]
- testStaleTxnSerialSuite [Serial]
- testCoprCache [Serial]
- testPrepareSuite [Serial]
- testResourceTagSuite [Serial]

---

Migrating `TestPessimisticSelectForUpdate` which is part of `testSuiteP1` test suite

`testSuiteP1` contains `baseTestSuite` which has three methods which we might need to checkout and migrate

- `SetUpSuite`
- `TearDownSuite`
- `fillData`

Previously in [one PR](https://github.com/pingcap/tidb/pull/28543) [I was told that there are some existing helper utils for tests, like this one](https://github.com/pingcap/tidb/pull/28543#discussion_r725760406) -

```go
store, clean := testkit.CreateMockStore(t)
defer clean()
```

instead of using same custom defined functions again and again, like this one

```go
func SetUpTest(t *testing.T) (kv.Storage, *domain.Domain) {
	var err error
	store, dom, err := newStoreWithBootstrap()
	require.NoError(t, err)
	return store, dom
}

func TearDownTest(t *testing.T, store kv.Storage, dom *domain.Domain) {
	dom.Close()
	err := store.Close()
	require.NoError(t, err)
}
```

Also, this is setup suite! That is, run once before all the tests, hmm. I need to put it in `main_test.go` I guess, let's see. But there's already on main test file in executor package directory and also, I can't put the setup test suite code there - that would do the setup for all the tests in different test files and not just `executor_test.go`, hmm

---

Looking at https://github.com/pingcap/tidb/pull/28300 based on - https://github.com/pingcap/tidb/issues/28577#issuecomment-946348647

I'm going to try to migrate things slowly without changing too much!

---

`executor: migrate TestPessimisticSelectForUpdate to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestPessimisticSelectForUpdate$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

For all `TestSuiteP1` sub tests -

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/.*$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestBind to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestBind$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestChangePumpAndDrainer to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestChangePumpAndDrainer$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestLoadStats to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestLoadStats$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPlanReplayer to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestPlanReplayer$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestShow to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestShow$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestAdmin to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestAdmin$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestAdminShowDDLJobs to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestAdminShowDDLJobs$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestAdminChecksumOfPartitionedTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestAdminChecksumOfPartitionedTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectWithoutFrom to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestSelectWithoutFrom$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectBackslashN to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestSelectBackslashN$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectNull to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestSelectNull$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectStringLiteral to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestSelectStringLiteral$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectLimit to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestSelectLimit$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectOrderBy to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestSelectOrderBy$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestOrderBy to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestOrderBy$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectErrorRow to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestSelectErrorRow$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue2612 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestIssue2612$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue345 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestIssue345$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue5055 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestIssue5055$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSetOperation to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSetOperation$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSetOperationOnDiffColType to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSetOperationOnDiffColType$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIndexScanWithYearCol to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIndexScanWithYearCol$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUnion to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUnion$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUnionLimit to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUnionLimit$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestNeighbouringProj to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestNeighbouringProj$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIn to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestIn$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTablePKisHandleScan to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestTablePKisHandleScan$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIndexScan to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIndexScan$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIndexReverseOrder to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestIndexReverseOrder$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTableReverseOrder to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestTableReverseOrder$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestDefaultNull to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestDefaultNull$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUnsignedPKColumn to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestUnsignedPKColumn$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestJSON to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestJSON$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestMultiUpdate to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestMultiUpdate$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestGeneratedColumnWrite to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestGeneratedColumnWrite$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestGeneratedColumnRead to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestGeneratedColumnRead$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestGeneratedColumnPointGet to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestGeneratedColumnPointGet$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestToPBExpr to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestToPBExpr$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestDatumXAPI to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestDatumXAPI$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSQLMode to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSQLMode$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTableDual to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTableDual$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTableScan to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTableScan$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestAdapterStatement to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestAdapterStatement$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIsPointGet to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIsPointGet$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestClusteredIndexIsPointGet to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestClusteredIndexIsPointGet$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPointGetRepeatableRead to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestPointGetRepeatableRead$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestBatchPointGetRepeatableRead to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestBatchPointGetRepeatableRead$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSplitRegionTimeout to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSplitRegionTimeout$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestRow to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestRow$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestColumnName to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestColumnName$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectVar to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectVar$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestHistoryRead to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestHistoryRead$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestLowResolutionTSORead to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestLowResolutionTSORead$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestStaleReadFutureTime to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestStaleReadFutureTime$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestScanControlSelection to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestScanControlSelection$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSimpleDAG to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSimpleDAG$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTimestampTimeZone to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTimestampTimeZone$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTimestampDefaultValueTimeZone to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTimestampDefaultValueTimeZone$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTiDBCurrentTS to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTiDBCurrentTS$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTiDBLastTxnInfo to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTiDBLastTxnInfo$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTiDBLastTxnInfoCommitMode to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTiDBLastTxnInfoCommitMode$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTiDBLastQueryInfo to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTiDBLastQueryInfo$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectForUpdate to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectForUpdate$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestEmptyEnum to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestEmptyEnum$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue4024 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue4024$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestAddIndexPriority to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestAddIndexPriority$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestAlterTableComment to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestAlterTableComment$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTimezonePushDown to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTimezonePushDown$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestNotFillCacheFlag to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestNotFillCacheFlag$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSyncLog to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSyncLog$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestHandleTransfer to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestHandleTransfer$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestBit to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestBit$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestEnum to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestEnum$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSet to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSet$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSubqueryInValues to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSubqueryInValues$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestEnhancedRangeAccess to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestEnhancedRangeAccess$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestMaxInt64Handle to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestMaxInt64Handle$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTableScanWithPointRanges to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTableScanWithPointRanges$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUnsignedPk to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUnsignedPk$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSignedCommonHandle to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSignedCommonHandle$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue5666 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue5666$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue5341 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue5341$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestContainDotColumn to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestContainDotColumn$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCheckIndex to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCheckIndex$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCheckTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCheckTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCheckTableClusterIndex to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCheckTableClusterIndex$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCoprocessorStreamingFlag to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCoprocessorStreamingFlag$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIncorrectLimitArg to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIncorrectLimitArg$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestLimit to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestLimit$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCoprocessorStreamingWarning to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCoprocessorStreamingWarning$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestYearTypeDeleteIndex to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestYearTypeDeleteIndex$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestForSelectScopeInUnion to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestForSelectScopeInUnion$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUnsignedDecimalOverflow to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUnsignedDecimalOverflow$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIndexJoinTableDualPanic to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIndexJoinTableDualPanic$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSortLeftJoinWithNullColumnInRightChildPanic to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSortLeftJoinWithNullColumnInRightChildPanic$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUnionAutoSignedCast to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUnionAutoSignedCast$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUpdateClustered to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUpdateClustered$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUpdateJoin to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUpdateJoin$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestMaxOneRow to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestMaxOneRow$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCurrentTimestampValueSelection to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCurrentTimestampValueSelection$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestRowID to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestRowID$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestDoSubquery to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestDoSubquery$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSubqueryTableAlias to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSubqueryTableAlias$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTSOFail to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTSOFail$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectHashPartitionTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectHashPartitionTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectPartition to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectPartition$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestDeletePartition to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestDeletePartition$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectView to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectView$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestStrToDateBuiltin to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestStrToDateBuiltin$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestAddDateBuiltinWithWarnings to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestAddDateBuiltinWithWarnings$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue27232 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue27232$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestStrToDateBuiltinWithWarnings to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestStrToDateBuiltinWithWarnings$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestReadPartitionedTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestReadPartitionedTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSplitRegion to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSplitRegion$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSplitRegionEdgeCase to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSplitRegionEdgeCase$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestClusterIndexSplitTableIntegration to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestClusterIndexSplitTableIntegration$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestClusterIndexShowTableRegion to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestClusterIndexShowTableRegion$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestClusterIndexOuterJoinElimination to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestClusterIndexOuterJoinElimination$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestShowTableRegion to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestShowTableRegion$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue10435 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue10435$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUnsignedFeedback to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUnsignedFeedback$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCharsetFeature to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCharsetFeature$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue23567 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue23567$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSummaryFailedUpdate to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSummaryFailedUpdate$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestOOMPanicAction to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestOOMPanicAction$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestRecoverTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestRecoverTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestFlashbackTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestFlashbackTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestRecoverTempTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestRecoverTempTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPointGetPreparedPlan to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestPointGetPreparedPlan$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPointGetPreparedPlanWithCommitMode to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestPointGetPreparedPlanWithCommitMode$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPointUpdatePreparedPlan to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestPointUpdatePreparedPlan$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPointUpdatePreparedPlanWithCommitMode to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestPointUpdatePreparedPlanWithCommitMode$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPartitionHashCode to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestPartitionHashCode$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestAlterDefaultValue to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestAlterDefaultValue$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPrepareLoadData to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestPrepareLoadData$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSlowQuery to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSlowQuery$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20236 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20236$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSQLDigestTextRetriever to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSQLDigestTextRetriever$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestFunctionDecodeSQLDigests to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestFunctionDecodeSQLDigests$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestFunctionDecodeSQLDigestsPrivilege to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestFunctionDecodeSQLDigestsPrivilege$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue15718 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue15718$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue15767 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue15767$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue16025 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue16025$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue16854 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue16854$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue16921 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue16921$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue19100 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue19100$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestInsertValuesWithSubQuery to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestInsertValuesWithSubQuery$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestDIVZeroInPartitionExpr to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestDIVZeroInPartitionExpr$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestInsertIntoGivenPartitionSet to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestInsertIntoGivenPartitionSet$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUpdateGivenPartitionSet to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUpdateGivenPartitionSet$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestApplyCache to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestApplyCache$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestGenerateColumnReplace to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestGenerateColumnReplace$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSlowQueryWithoutSlowLog to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSlowQueryWithoutSlowLog$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSlowQuerySensitiveQuery to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSlowQuerySensitiveQuery$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSlowQueryPrepared to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSlowQueryPrepared$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestLogSlowLogIndex to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestLogSlowLogIndex$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSlowQuery to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSlowQuery$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestKillTableReader to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestKillTableReader$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPrevStmtDesensitization to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestPrevStmtDesensitization$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue19372 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue19372$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCollectCopRuntimeStats to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCollectCopRuntimeStats$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIndexLookupRuntimeStats to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIndexLookupRuntimeStats$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestHashAggRuntimeStats to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestHashAggRuntimeStats$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIndexMergeRuntimeStats to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIndexMergeRuntimeStats$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCollectDMLRuntimeStats to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCollectDMLRuntimeStats$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue13758 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue13758$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIntegrationCopCache to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIntegrationCopCache$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCoprocessorOOMTicase to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCoprocessorOOMTicase$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20237 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20237$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue19148 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue19148$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue19667 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue19667$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20975UpdateNoChange to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20975UpdateNoChange$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20975SelectForUpdate to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20975SelectForUpdate$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20975SelectForUpdatePointGet to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20975SelectForUpdatePointGet$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20975SelectForUpdateBatchPointGet to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20975SelectForUpdateBatchPointGet$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20975UpdateNoChangeWithPartitionTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20975UpdateNoChangeWithPartitionTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20975SelectForUpdateWithPartitionTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20975SelectForUpdateWithPartitionTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20975SelectForUpdatePointGetWithPartitionTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20975SelectForUpdatePointGetWithPartitionTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20975SelectForUpdateBatchPointGetWithPartitionTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20975SelectForUpdateBatchPointGetWithPartitionTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue20305 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue20305$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue22817 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue22817$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue13953 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue13953$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestZeroDateTimeCompatibility to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestZeroDateTimeCompatibility$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestInvalidDateValueInCreateTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestInvalidDateValueInCreateTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestOOMActionPriority to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestOOMActionPriority$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue21441 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue21441$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate Test17780 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^Test17780$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue9918 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue9918$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate Test13004 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^Test13004$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate Test12178 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^Test12178$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate Test11883 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^Test11883$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate Test15492 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^Test15492$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTrackAggMemoryUsage to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTrackAggMemoryUsage$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate Test12201 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^Test12201$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue21451 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue21451$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue15563 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue15563$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue22231 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue22231$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue22201 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue22201$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue22941 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestIssue22941$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue28935 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestIssue28935$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTxnWriteThroughputSLI to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTxnWriteThroughputSLI$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue23993 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue23993$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestProjectionBitType to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestProjectionBitType$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue23609 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue23609$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue24091 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue24091$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue24210 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue24210$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestDeadlocksTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestDeadlocksTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestExprBlackListForEnum to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestExprBlackListForEnum$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestResourceGroupTag to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestResourceGroupTag$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue24933 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue24933$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestInvalidReadTemporaryTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestInvalidReadTemporaryTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestEmptyTableSampleTemporaryTable to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestEmptyTableSampleTemporaryTable$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue25506 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue25506$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue26348 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue26348$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue26532 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue26532$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue25447 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue25447$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue23602 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue23602$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestCTEWithIndexLookupJoinDeadLock to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestCTEWithIndexLookupJoinDeadLock$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

```bash
tidb $ { make failpoint-enable; go test -v -run ^TestSuiteP1/TestPessimisticSelectForUpdate$ github.com/pingcap/tidb/executor; make failpoint-disable; }
# github.com/shirou/gopsutil/cpu
../../../../../go/pkg/mod/github.com/shirou/gopsutil@v3.21.2+incompatible/cpu/cpu_darwin_cgo.go:13:5: warning: 'TARGET_OS_MAC' is not defined, evaluates to 0 [-Wundef-prefix=TARGET_OS_]
=== RUN   TestSuiteP1
[2021/10/23 15:46:06.337 +05:30] [INFO] [tidb.go:72] ["new domain"] [store=984b97da-29fe-413e-aff3-c13b035a5d04] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/23 15:46:06.341 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=0] ["start time"=977.956µs]
[2021/10/23 15:46:06.341 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 15:46:06.341 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=c09b1a86-61d9-45d4-8b4b-5167422ab835] [runWorker=true]
[2021/10/23 15:46:06.341 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/23 15:46:06.342 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/23 15:46:06.342 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 1, tp general"]
[2021/10/23 15:46:06.342 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 2, tp add index"]
[2021/10/23 15:46:06.342 +05:30] [INFO] [tidb.go:260] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/10/23 15:46:06.342 +05:30] [WARN] [session.go:1580] ["run statement failed"] [schemaVersion=0] [error="[schema:1049]Unknown database 'mysql'"] [errorVerbose="[schema:1049]Unknown database 'mysql'\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.(*Error).GenWithStackByArgs\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/normalize.go:159\ngithub.com/pingcap/tidb/executor.(*SimpleExec).executeUse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:556\ngithub.com/pingcap/tidb/executor.(*SimpleExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:126\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:584\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:465\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:414\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1683\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1577\ngithub.com/pingcap/tidb/session.(*session).ExecuteInternal\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1289\ngithub.com/pingcap/tidb/session.checkBootstrapped\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:618\ngithub.com/pingcap/tidb/session.bootstrap\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:366\ngithub.com/pingcap/tidb/session.runInBootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2587\ngithub.com/pingcap/tidb/session.BootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2433\ngithub.com/pingcap/tidb/executor_test.(*baseTestSuite).NewSetUpSuite\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:215\ngithub.com/pingcap/tidb/executor_test.TestSuiteP1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:267\ntesting.tRunner\n\t/Users/karuppiahn/.go/src/testing/testing.go:1193\nruntime.goexit\n\t/Users/karuppiahn/.go/src/runtime/asm_amd64.s:1371"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 0,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/10/23 15:46:06.342 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=0] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS test"] [user=]
[2021/10/23 15:46:06.344 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.343 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.344 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.343 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS test"]
[2021/10/23 15:46:06.345 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.343 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.346 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:synced, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.343 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.346 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=2]
[2021/10/23 15:46:06.346 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.347 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=1] ["start time"=1.196623ms]
[2021/10/23 15:46:06.348 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 15:46:06.348 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=1] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS `mysql`"] [user=]
[2021/10/23 15:46:06.349 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.348 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.349 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.348 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS `mysql`"]
[2021/10/23 15:46:06.349 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.348 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.350 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:synced, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.348 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.351 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=4]
[2021/10/23 15:46:06.351 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.351 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=1] [neededSchemaVersion=2] ["start time"=261.029µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/10/23 15:46:06.351 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=2] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"] [user=]
[2021/10/23 15:46:06.353 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.352 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"]
[2021/10/23 15:46:06.353 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.352 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.354 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.352 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.357 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.352 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.358 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=6]
[2021/10/23 15:46:06.358 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.358 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=2] [neededSchemaVersion=3] ["start time"=698.13µs] [phyTblIDs="[5]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.359 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=3] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"] [user=]
[2021/10/23 15:46:06.360 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.359 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.360 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.359 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"]
[2021/10/23 15:46:06.360 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.359 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.361 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.359 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.362 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=8]
[2021/10/23 15:46:06.362 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.362 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=3] [neededSchemaVersion=4] ["start time"=366.168µs] [phyTblIDs="[7]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.363 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=4] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"] [user=]
[2021/10/23 15:46:06.364 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.363 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.364 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.363 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"]
[2021/10/23 15:46:06.364 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.363 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.367 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.363 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.368 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=10]
[2021/10/23 15:46:06.368 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.369 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=4] [neededSchemaVersion=5] ["start time"=595.348µs] [phyTblIDs="[9]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.369 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=5] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"] [user=]
[2021/10/23 15:46:06.370 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.369 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.370 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.369 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"]
[2021/10/23 15:46:06.370 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.369 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.372 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.369 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.373 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=12]
[2021/10/23 15:46:06.373 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.373 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=5] [neededSchemaVersion=6] ["start time"=452.337µs] [phyTblIDs="[11]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.373 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=6] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"] [user=]
[2021/10/23 15:46:06.374 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.374 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.374 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.374 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"]
[2021/10/23 15:46:06.375 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.374 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.376 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.374 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.377 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=14]
[2021/10/23 15:46:06.377 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.378 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=6] [neededSchemaVersion=7] ["start time"=418.826µs] [phyTblIDs="[13]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.378 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=7] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"] [user=]
[2021/10/23 15:46:06.379 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.378 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.379 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.378 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"]
[2021/10/23 15:46:06.379 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.378 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.381 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.378 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.381 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=16]
[2021/10/23 15:46:06.381 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.382 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=7] [neededSchemaVersion=8] ["start time"=420.507µs] [phyTblIDs="[15]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.382 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=8] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"] [user=]
[2021/10/23 15:46:06.383 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.382 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.383 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.382 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"]
[2021/10/23 15:46:06.383 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.382 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.384 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.382 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.385 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=18]
[2021/10/23 15:46:06.385 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.386 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=8] [neededSchemaVersion=9] ["start time"=376.561µs] [phyTblIDs="[17]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.386 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=9] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"] [user=]
[2021/10/23 15:46:06.387 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.386 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.387 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.386 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"]
[2021/10/23 15:46:06.387 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.386 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.389 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.386 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.389 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=20]
[2021/10/23 15:46:06.389 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.390 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=9] [neededSchemaVersion=10] ["start time"=414.155µs] [phyTblIDs="[19]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.390 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=10] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"] [user=]
[2021/10/23 15:46:06.392 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.391 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.392 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.391 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"]
[2021/10/23 15:46:06.392 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.391 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.394 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.391 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.395 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=22]
[2021/10/23 15:46:06.395 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.396 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=10] [neededSchemaVersion=11] ["start time"=460.361µs] [phyTblIDs="[21]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.396 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=11] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 15:46:06.396 +05:30] [INFO] [ddl_api.go:672] ["Automatically convert BLOB(6291456) to MEDIUMBLOB"]
[2021/10/23 15:46:06.397 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.397 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.397 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.397 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 15:46:06.398 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.397 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.400 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.397 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.400 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=24]
[2021/10/23 15:46:06.400 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.401 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=11] [neededSchemaVersion=12] ["start time"=548.132µs] [phyTblIDs="[23]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.401 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=12] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"] [user=]
[2021/10/23 15:46:06.402 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.402 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.402 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.402 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"]
[2021/10/23 15:46:06.403 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.402 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.405 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.402 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.405 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=26]
[2021/10/23 15:46:06.405 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.406 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=12] [neededSchemaVersion=13] ["start time"=496.525µs] [phyTblIDs="[25]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.406 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=13] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"] [user=]
[2021/10/23 15:46:06.407 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.407 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.407 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.407 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"]
[2021/10/23 15:46:06.408 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.407 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.409 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.407 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.410 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=28]
[2021/10/23 15:46:06.410 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.411 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=13] [neededSchemaVersion=14] ["start time"=451.268µs] [phyTblIDs="[27]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.411 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=14] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"] [user=]
[2021/10/23 15:46:06.412 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.411 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.412 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.411 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"]
[2021/10/23 15:46:06.412 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.411 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.414 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.411 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.414 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=30]
[2021/10/23 15:46:06.414 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.415 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=14] [neededSchemaVersion=15] ["start time"=387.03µs] [phyTblIDs="[29]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.415 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=15] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 15:46:06.416 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.416 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.416 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.416 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 15:46:06.417 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.416 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.418 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.416 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.419 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=32]
[2021/10/23 15:46:06.419 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.419 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=15] [neededSchemaVersion=16] ["start time"=371.285µs] [phyTblIDs="[31]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.419 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=16] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"] [user=]
[2021/10/23 15:46:06.420 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.42 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.420 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.42 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"]
[2021/10/23 15:46:06.421 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.42 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.422 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.42 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.423 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=34]
[2021/10/23 15:46:06.423 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.423 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=16] [neededSchemaVersion=17] ["start time"=400.087µs] [phyTblIDs="[33]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.423 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=17] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"] [user=]
[2021/10/23 15:46:06.425 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.425 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"]
[2021/10/23 15:46:06.425 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.427 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.427 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=36]
[2021/10/23 15:46:06.427 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.428 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=17] [neededSchemaVersion=18] ["start time"=428.341µs] [phyTblIDs="[35]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.428 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=18] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"] [user=]
[2021/10/23 15:46:06.429 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.429 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"]
[2021/10/23 15:46:06.429 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.431 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.432 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=38]
[2021/10/23 15:46:06.432 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.433 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=18] [neededSchemaVersion=19] ["start time"=449.237µs] [phyTblIDs="[37]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.435 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=19] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 15:46:06.436 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.435 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.436 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.435 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 15:46:06.436 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.435 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.438 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.435 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.438 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=40]
[2021/10/23 15:46:06.438 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.439 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=19] [neededSchemaVersion=20] ["start time"=398.138µs] [phyTblIDs="[39]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.439 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=20] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"] [user=]
[2021/10/23 15:46:06.440 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.44 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.440 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.44 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"]
[2021/10/23 15:46:06.440 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.44 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.442 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.44 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.442 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=42]
[2021/10/23 15:46:06.442 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.443 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=20] [neededSchemaVersion=21] ["start time"=348.134µs] [phyTblIDs="[41]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.443 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=21] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"] [user=]
[2021/10/23 15:46:06.444 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.444 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.444 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.444 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"]
[2021/10/23 15:46:06.445 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.444 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.446 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.444 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.447 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=44]
[2021/10/23 15:46:06.447 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.447 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=21] [neededSchemaVersion=22] ["start time"=348.85µs] [phyTblIDs="[43]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.448 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=22] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"] [user=]
[2021/10/23 15:46:06.449 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.448 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.449 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.448 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"]
[2021/10/23 15:46:06.449 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.448 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.451 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.448 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.454 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=46]
[2021/10/23 15:46:06.454 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.455 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=22] [neededSchemaVersion=23] ["start time"=517.243µs] [phyTblIDs="[45]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.455 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=23] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"] [user=]
[2021/10/23 15:46:06.457 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.456 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.457 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.456 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"]
[2021/10/23 15:46:06.457 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.456 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.459 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.456 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.460 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=48]
[2021/10/23 15:46:06.460 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.460 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=23] [neededSchemaVersion=24] ["start time"=357.021µs] [phyTblIDs="[47]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.461 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=24] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 15:46:06.462 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.462 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.462 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.462 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 15:46:06.463 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.462 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.465 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.462 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.465 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=50]
[2021/10/23 15:46:06.466 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.466 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=24] [neededSchemaVersion=25] ["start time"=413.695µs] [phyTblIDs="[49]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.466 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=25] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"] [user=]
[2021/10/23 15:46:06.467 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.467 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.467 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.467 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"]
[2021/10/23 15:46:06.468 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.467 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.469 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.467 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.470 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=52]
[2021/10/23 15:46:06.470 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.470 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=25] [neededSchemaVersion=26] ["start time"=376.043µs] [phyTblIDs="[51]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.470 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=26] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"] [user=]
[2021/10/23 15:46:06.472 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.471 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.472 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.471 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"]
[2021/10/23 15:46:06.472 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.471 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.473 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.471 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.474 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=54]
[2021/10/23 15:46:06.474 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.474 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=26] [neededSchemaVersion=27] ["start time"=386.208µs] [phyTblIDs="[53]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.475 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=27] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.column_stats_usage (\n\t\ttable_id BIGINT(64) NOT NULL,\n\t\tcolumn_id BIGINT(64) NOT NULL,\n\t\tlast_used_at TIMESTAMP,\n\t\tlast_analyzed_at TIMESTAMP,\n\t\tPRIMARY KEY (table_id, column_id) CLUSTERED\n\t);"] [user=]
[2021/10/23 15:46:06.476 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.475 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:46:06.476 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-23 15:46:06.475 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.column_stats_usage (\n\t\ttable_id BIGINT(64) NOT NULL,\n\t\tcolumn_id BIGINT(64) NOT NULL,\n\t\tlast_used_at TIMESTAMP,\n\t\tlast_analyzed_at TIMESTAMP,\n\t\tPRIMARY KEY (table_id, column_id) CLUSTERED\n\t);"]
[2021/10/23 15:46:06.476 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.475 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.477 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:56, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-23 15:46:06.475 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:46:06.478 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=56]
[2021/10/23 15:46:06.478 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:46:06.479 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=27] [neededSchemaVersion=28] ["start time"=379.208µs] [phyTblIDs="[55]"] [actionTypes="[8]"]
[2021/10/23 15:46:06.498 +05:30] [INFO] [bootstrap.go:383] ["bootstrap successful"] ["take time"=156.864807ms]
[2021/10/23 15:46:06.499 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 1, tp general"] ["take time"=388ns]
[2021/10/23 15:46:06.499 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 2, tp add index"] ["take time"=63ns]
[2021/10/23 15:46:06.499 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/23 15:46:06.499 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/23 15:46:06.499 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=c09b1a86-61d9-45d4-8b4b-5167422ab835] ["take time"=48.788µs]
[2021/10/23 15:46:06.499 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=c09b1a86-61d9-45d4-8b4b-5167422ab835]
[2021/10/23 15:46:06.499 +05:30] [INFO] [domain.go:437] ["topNSlowQueryLoop exited."]
[2021/10/23 15:46:06.499 +05:30] [INFO] [domain.go:650] ["domain closed"] ["take time"=105.342µs]
[2021/10/23 15:46:06.499 +05:30] [INFO] [domain.go:466] ["infoSyncerKeeper exited."]
[2021/10/23 15:46:06.499 +05:30] [INFO] [domain.go:494] ["topologySyncerKeeper exited."]
[2021/10/23 15:46:06.499 +05:30] [INFO] [tidb.go:72] ["new domain"] [store=984b97da-29fe-413e-aff3-c13b035a5d04] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/23 15:46:06.503 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=28] ["start time"=3.832792ms]
[2021/10/23 15:46:06.503 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 15:46:06.503 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=54216c46-f63a-4dd7-b1af-88e3a63c88d5] [runWorker=true]
[2021/10/23 15:46:06.503 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/23 15:46:06.503 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/23 15:46:06.503 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 3, tp general"]
[2021/10/23 15:46:06.504 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 4, tp add index"]
[2021/10/23 15:46:06.508 +05:30] [WARN] [sysvar_cache.go:51] ["sysvar cache is empty, triggering rebuild"]
[2021/10/23 15:46:06.515 +05:30] [INFO] [telemetry.go:174] ["Telemetry configuration"] [endpoint=https://telemetry.pingcap.com/api/v1/tidb/report] [report_interval=6h0m0s] [enabled=true]
=== RUN   TestSuiteP1/TestPessimisticSelectForUpdate
=== PAUSE TestSuiteP1/TestPessimisticSelectForUpdate
[2021/10/23 15:46:06.515 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 3, tp general"] ["take time"=6.143µs]
[2021/10/23 15:46:06.516 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 4, tp add index"] ["take time"=174ns]
[2021/10/23 15:46:06.516 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/23 15:46:06.516 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/23 15:46:06.516 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=54216c46-f63a-4dd7-b1af-88e3a63c88d5] ["take time"=72.013µs]
[2021/10/23 15:46:06.516 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=54216c46-f63a-4dd7-b1af-88e3a63c88d5]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:437] ["topNSlowQueryLoop exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:1066] ["handleEvolvePlanTasksLoop exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:898] ["loadPrivilegeInLoop exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:466] ["infoSyncerKeeper exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:1151] ["PlanReplayerLoop exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:1099] ["TelemetryReportLoop exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:1129] ["TelemetryRotateSubWindowLoop exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:494] ["topologySyncerKeeper exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:947] ["LoadSysVarCacheLoop exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:1025] ["globalBindHandleWorkerLoop exited."]
[2021/10/23 15:46:06.516 +05:30] [INFO] [domain.go:650] ["domain closed"] ["take time"=144.635µs]
[2021/10/23 15:46:06.536 +05:30] [INFO] [db.go:567] ["Closing database"]
[2021/10/23 15:46:06.537 +05:30] [INFO] [db.go:592] ["Memtable flushed"]
[2021/10/23 15:46:06.537 +05:30] [INFO] [db.go:596] ["Compaction finished"]
[2021/10/23 15:46:06.537 +05:30] [INFO] [db.go:615] ["BlobManager finished"]
[2021/10/23 15:46:06.537 +05:30] [INFO] [db.go:619] ["ResourceManager finished"]
[2021/10/23 15:46:06.537 +05:30] [INFO] [db.go:625] ["Waiting for closer"]
=== CONT  TestSuiteP1/TestPessimisticSelectForUpdate
[2021/10/23 15:46:06.560 +05:30] [INFO] [tidb.go:72] ["new domain"] [store=984b97da-29fe-413e-aff3-c13b035a5d04] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
--- FAIL: TestSuiteP1 (0.60s)
    --- FAIL: TestSuiteP1/TestPessimisticSelectForUpdate (0.00s)
panic: runtime error: invalid memory address or nil pointer dereference [recovered]
	panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x54dc457]

goroutine 510 [running]:
testing.tRunner.func1.2(0x69ac940, 0x914a5c0)
	/Users/karuppiahn/.go/src/testing/testing.go:1143 +0x332
testing.tRunner.func1(0xc000169500)
	/Users/karuppiahn/.go/src/testing/testing.go:1146 +0x4b6
panic(0x69ac940, 0x914a5c0)
	/Users/karuppiahn/.go/src/runtime/panic.go:965 +0x1b9
github.com/pingcap/tidb/ddl.(*ddl).close(0xc00563c460)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:398 +0x77
github.com/pingcap/tidb/ddl.(*ddl).Stop(0xc00563c460, 0x0, 0x0)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:327 +0x8a
github.com/pingcap/tidb/domain.(*Domain).Close(0xc004eb2a20)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/domain/domain.go:631 +0x35f
github.com/pingcap/tidb/session.(*domainMap).Get.func1(0x60, 0x34, 0xc000ceebf0)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/session/tidb.go:86 +0x69e
github.com/pingcap/tidb/util.RunWithRetry(0x1e, 0x1f4, 0xc00627fbe8, 0x24, 0x92211c0)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/util/misc.go:65 +0x7f
github.com/pingcap/tidb/session.(*domainMap).Get(0x91e45a0, 0x75021d8, 0xc000bfa900, 0xc004eb2a20, 0x0, 0x0)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/session/tidb.go:71 +0x1f0
github.com/pingcap/tidb/session.createSessionWithOpt(0x75021d8, 0xc000bfa900, 0x0, 0xc005273520, 0xc000ceee00, 0x40f95f1)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2601 +0x59
github.com/pingcap/tidb/session.CreateSessionWithOpt(0x75021d8, 0xc000bfa900, 0x0, 0x10, 0x6a47520, 0xc000ceee18, 0xc0e1f4f41e)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2336 +0x45
github.com/pingcap/tidb/session.CreateSession4TestWithOpt(0x75021d8, 0xc000bfa900, 0x0, 0x0, 0xc000ceee90, 0x400f8d8, 0x10)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2318 +0x45
github.com/pingcap/tidb/session.CreateSession4Test(...)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2308
github.com/pingcap/tidb/testkit.newSession(0xc000169500, 0x75021d8, 0xc000bfa900, 0xc000ceeed8, 0x1)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:187 +0x45
github.com/pingcap/tidb/testkit.NewTestKit(0xc000169500, 0x75021d8, 0xc000bfa900, 0x100000001)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:54 +0xb2
github.com/pingcap/tidb/executor_test.SubTestPessimisticSelectForUpdate.func1(0xc000169500)
	/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:275 +0x68
testing.tRunner(0xc000169500, 0xc000b9e500)
	/Users/karuppiahn/.go/src/testing/testing.go:1193 +0xef
created by testing.(*T).Run
	/Users/karuppiahn/.go/src/testing/testing.go:1238 +0x2b3
FAIL	github.com/pingcap/tidb/executor	1.323s
FAIL
tidb $

```

https://pkg.go.dev/testing#hdr-Subtests_and_Sub_benchmarks

```bash
tidb $ { make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestPessimisticSelectForUpdate$ github.com/pingcap/tidb/executor; make failpoint-disable; }
# github.com/shirou/gopsutil/cpu
../../../../../go/pkg/mod/github.com/shirou/gopsutil@v3.21.2+incompatible/cpu/cpu_darwin_cgo.go:13:5: warning: 'TARGET_OS_MAC' is not defined, evaluates to 0 [-Wundef-prefix=TARGET_OS_]
=== RUN   TestSuiteP1
[2021/10/23 15:55:35.885 +05:30] [INFO] [tidb.go:72] ["new domain"] [store=acf09ab5-f3f3-4c1d-8b10-0cfcfc1b353a] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/23 15:55:35.896 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=0] ["start time"=1.721516ms]
[2021/10/23 15:55:35.896 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 15:55:35.896 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=87b51d59-89b6-4f7f-9222-2c3a77533db1] [runWorker=true]
[2021/10/23 15:55:35.897 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/23 15:55:35.897 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/23 15:55:35.897 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 2, tp add index"]
[2021/10/23 15:55:35.897 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 1, tp general"]
[2021/10/23 15:55:35.897 +05:30] [INFO] [tidb.go:260] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/10/23 15:55:35.898 +05:30] [WARN] [session.go:1580] ["run statement failed"] [schemaVersion=0] [error="[schema:1049]Unknown database 'mysql'"] [errorVerbose="[schema:1049]Unknown database 'mysql'\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.(*Error).GenWithStackByArgs\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/normalize.go:159\ngithub.com/pingcap/tidb/executor.(*SimpleExec).executeUse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:556\ngithub.com/pingcap/tidb/executor.(*SimpleExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:126\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:584\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:465\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:414\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1683\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1577\ngithub.com/pingcap/tidb/session.(*session).ExecuteInternal\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1289\ngithub.com/pingcap/tidb/session.checkBootstrapped\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:618\ngithub.com/pingcap/tidb/session.bootstrap\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:366\ngithub.com/pingcap/tidb/session.runInBootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2587\ngithub.com/pingcap/tidb/session.BootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2433\ngithub.com/pingcap/tidb/executor_test.(*baseTestSuite).NewSetUpSuite\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:215\ngithub.com/pingcap/tidb/executor_test.TestSuiteP1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:267\ntesting.tRunner\n\t/Users/karuppiahn/.go/src/testing/testing.go:1193\nruntime.goexit\n\t/Users/karuppiahn/.go/src/runtime/asm_amd64.s:1371"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 0,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/10/23 15:55:35.898 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=0] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS test"] [user=]
[2021/10/23 15:55:35.902 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.9 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:35.902 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.9 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS test"]
[2021/10/23 15:55:35.903 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.9 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.905 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:synced, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.9 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.906 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=2]
[2021/10/23 15:55:35.906 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:35.909 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=1] ["start time"=2.280949ms]
[2021/10/23 15:55:35.909 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 15:55:35.909 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=1] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS `mysql`"] [user=]
[2021/10/23 15:55:35.911 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.91 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:35.911 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.91 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS `mysql`"]
[2021/10/23 15:55:35.912 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.91 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.914 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:synced, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.91 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.915 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=4]
[2021/10/23 15:55:35.915 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:35.916 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=1] [neededSchemaVersion=2] ["start time"=503.05µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/10/23 15:55:35.916 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=2] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"] [user=]
[2021/10/23 15:55:35.919 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.918 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:35.919 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.918 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"]
[2021/10/23 15:55:35.921 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.918 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.928 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.918 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.930 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=6]
[2021/10/23 15:55:35.930 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:35.932 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=2] [neededSchemaVersion=3] ["start time"=1.476338ms] [phyTblIDs="[5]"] [actionTypes="[8]"]
[2021/10/23 15:55:35.932 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=3] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"] [user=]
[2021/10/23 15:55:35.935 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.933 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:35.935 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.933 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"]
[2021/10/23 15:55:35.935 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.933 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.939 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.933 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.940 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=8]
[2021/10/23 15:55:35.940 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:35.941 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=3] [neededSchemaVersion=4] ["start time"=1.097004ms] [phyTblIDs="[7]"] [actionTypes="[8]"]
[2021/10/23 15:55:35.942 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=4] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"] [user=]
[2021/10/23 15:55:35.944 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.943 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:35.944 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.943 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"]
[2021/10/23 15:55:35.946 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.943 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.951 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.943 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.953 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=10]
[2021/10/23 15:55:35.953 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:35.955 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=4] [neededSchemaVersion=5] ["start time"=1.902438ms] [phyTblIDs="[9]"] [actionTypes="[8]"]
[2021/10/23 15:55:35.956 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=5] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"] [user=]
[2021/10/23 15:55:35.960 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.959 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:35.960 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.959 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"]
[2021/10/23 15:55:35.961 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.959 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.964 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.959 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.966 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=12]
[2021/10/23 15:55:35.966 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:35.967 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=5] [neededSchemaVersion=6] ["start time"=831.819µs] [phyTblIDs="[11]"] [actionTypes="[8]"]
[2021/10/23 15:55:35.967 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=6] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"] [user=]
[2021/10/23 15:55:35.970 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.969 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:35.970 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.969 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"]
[2021/10/23 15:55:35.971 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.969 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.974 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.969 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.976 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=14]
[2021/10/23 15:55:35.976 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:35.977 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=6] [neededSchemaVersion=7] ["start time"=864.967µs] [phyTblIDs="[13]"] [actionTypes="[8]"]
[2021/10/23 15:55:35.977 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=7] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"] [user=]
[2021/10/23 15:55:35.980 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.979 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:35.980 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.979 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"]
[2021/10/23 15:55:35.981 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.979 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.985 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.979 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.987 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=16]
[2021/10/23 15:55:35.987 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:35.989 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=7] [neededSchemaVersion=8] ["start time"=1.189737ms] [phyTblIDs="[15]"] [actionTypes="[8]"]
[2021/10/23 15:55:35.989 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=8] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"] [user=]
[2021/10/23 15:55:35.992 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.991 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:35.992 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:35.991 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"]
[2021/10/23 15:55:35.993 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.991 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:35.998 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:35.991 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.000 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=18]
[2021/10/23 15:55:36.000 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.001 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=8] [neededSchemaVersion=9] ["start time"=1.259563ms] [phyTblIDs="[17]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.002 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=9] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"] [user=]
[2021/10/23 15:55:36.006 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.004 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.006 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.004 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"]
[2021/10/23 15:55:36.007 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.004 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.012 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.004 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.018 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=20]
[2021/10/23 15:55:36.018 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.019 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=9] [neededSchemaVersion=10] ["start time"=1.15359ms] [phyTblIDs="[19]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.019 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=10] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"] [user=]
[2021/10/23 15:55:36.023 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.021 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.023 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.021 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"]
[2021/10/23 15:55:36.024 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.021 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.029 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.021 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.032 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=22]
[2021/10/23 15:55:36.032 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.033 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=10] [neededSchemaVersion=11] ["start time"=1.430137ms] [phyTblIDs="[21]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.034 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=11] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 15:55:36.034 +05:30] [INFO] [ddl_api.go:672] ["Automatically convert BLOB(6291456) to MEDIUMBLOB"]
[2021/10/23 15:55:36.038 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.036 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.038 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.036 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 15:55:36.039 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.036 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.045 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.036 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.048 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=24]
[2021/10/23 15:55:36.048 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.050 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=11] [neededSchemaVersion=12] ["start time"=1.549624ms] [phyTblIDs="[23]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.050 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=12] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"] [user=]
[2021/10/23 15:55:36.054 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.052 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.054 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.052 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"]
[2021/10/23 15:55:36.055 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.052 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.060 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.052 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.062 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=26]
[2021/10/23 15:55:36.063 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.064 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=12] [neededSchemaVersion=13] ["start time"=1.480205ms] [phyTblIDs="[25]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.065 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=13] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"] [user=]
[2021/10/23 15:55:36.068 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.067 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.068 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.067 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"]
[2021/10/23 15:55:36.069 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.067 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.075 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.067 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.077 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=28]
[2021/10/23 15:55:36.077 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.079 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=13] [neededSchemaVersion=14] ["start time"=1.417058ms] [phyTblIDs="[27]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.079 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=14] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"] [user=]
[2021/10/23 15:55:36.083 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.081 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.083 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.081 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"]
[2021/10/23 15:55:36.084 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.081 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.089 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.081 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.091 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=30]
[2021/10/23 15:55:36.092 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.093 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=14] [neededSchemaVersion=15] ["start time"=1.369392ms] [phyTblIDs="[29]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.094 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=15] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 15:55:36.097 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.095 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.097 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.095 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 15:55:36.098 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.095 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.101 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.095 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.102 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=32]
[2021/10/23 15:55:36.102 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.103 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=15] [neededSchemaVersion=16] ["start time"=809.801µs] [phyTblIDs="[31]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.104 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=16] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"] [user=]
[2021/10/23 15:55:36.107 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.106 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.107 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.106 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"]
[2021/10/23 15:55:36.109 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.106 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.113 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.106 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.115 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=34]
[2021/10/23 15:55:36.115 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.116 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=16] [neededSchemaVersion=17] ["start time"=978.722µs] [phyTblIDs="[33]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.117 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=17] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"] [user=]
[2021/10/23 15:55:36.119 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.118 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.119 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.118 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"]
[2021/10/23 15:55:36.120 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.118 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.123 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.118 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.124 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=36]
[2021/10/23 15:55:36.124 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.126 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=17] [neededSchemaVersion=18] ["start time"=952.087µs] [phyTblIDs="[35]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.126 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=18] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"] [user=]
[2021/10/23 15:55:36.128 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.127 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.128 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.127 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"]
[2021/10/23 15:55:36.129 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.127 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.133 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.127 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.134 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=38]
[2021/10/23 15:55:36.134 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.135 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=18] [neededSchemaVersion=19] ["start time"=982.741µs] [phyTblIDs="[37]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.139 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=19] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 15:55:36.141 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.14 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.141 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.14 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 15:55:36.142 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.14 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.145 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.14 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.147 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=40]
[2021/10/23 15:55:36.147 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.148 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=19] [neededSchemaVersion=20] ["start time"=851.811µs] [phyTblIDs="[39]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.148 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=20] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"] [user=]
[2021/10/23 15:55:36.151 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.149 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"]
[2021/10/23 15:55:36.151 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.149 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.152 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.149 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.154 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.149 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.156 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=42]
[2021/10/23 15:55:36.156 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.157 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=20] [neededSchemaVersion=21] ["start time"=968.85µs] [phyTblIDs="[41]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.157 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=21] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"] [user=]
[2021/10/23 15:55:36.160 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.159 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.160 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.159 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"]
[2021/10/23 15:55:36.161 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.159 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.164 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.159 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.165 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=44]
[2021/10/23 15:55:36.165 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.166 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=21] [neededSchemaVersion=22] ["start time"=824.467µs] [phyTblIDs="[43]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.167 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=22] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"] [user=]
[2021/10/23 15:55:36.169 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.168 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.169 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.168 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"]
[2021/10/23 15:55:36.170 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.168 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.173 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.168 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.174 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=46]
[2021/10/23 15:55:36.174 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.176 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=22] [neededSchemaVersion=23] ["start time"=908.534µs] [phyTblIDs="[45]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.176 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=23] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"] [user=]
[2021/10/23 15:55:36.178 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.177 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.178 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.177 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"]
[2021/10/23 15:55:36.179 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.177 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.182 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.177 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.183 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=48]
[2021/10/23 15:55:36.183 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.184 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=23] [neededSchemaVersion=24] ["start time"=794.93µs] [phyTblIDs="[47]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.184 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=24] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 15:55:36.186 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.186 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 15:55:36.187 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.190 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.192 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=50]
[2021/10/23 15:55:36.192 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.194 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=24] [neededSchemaVersion=25] ["start time"=1.278729ms] [phyTblIDs="[49]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.194 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=25] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"] [user=]
[2021/10/23 15:55:36.197 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.196 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.197 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.196 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"]
[2021/10/23 15:55:36.198 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.196 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.201 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.196 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.202 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=52]
[2021/10/23 15:55:36.202 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.203 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=25] [neededSchemaVersion=26] ["start time"=906.485µs] [phyTblIDs="[51]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.203 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=26] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"] [user=]
[2021/10/23 15:55:36.206 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.205 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.206 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.205 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"]
[2021/10/23 15:55:36.206 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.205 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.209 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.205 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.210 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=54]
[2021/10/23 15:55:36.211 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.212 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=26] [neededSchemaVersion=27] ["start time"=824.778µs] [phyTblIDs="[53]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.212 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=27] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.column_stats_usage (\n\t\ttable_id BIGINT(64) NOT NULL,\n\t\tcolumn_id BIGINT(64) NOT NULL,\n\t\tlast_used_at TIMESTAMP,\n\t\tlast_analyzed_at TIMESTAMP,\n\t\tPRIMARY KEY (table_id, column_id) CLUSTERED\n\t);"] [user=]
[2021/10/23 15:55:36.214 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.213 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.214 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.213 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.column_stats_usage (\n\t\ttable_id BIGINT(64) NOT NULL,\n\t\tcolumn_id BIGINT(64) NOT NULL,\n\t\tlast_used_at TIMESTAMP,\n\t\tlast_analyzed_at TIMESTAMP,\n\t\tPRIMARY KEY (table_id, column_id) CLUSTERED\n\t);"]
[2021/10/23 15:55:36.215 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.213 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.218 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:56, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.213 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.220 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=56]
[2021/10/23 15:55:36.220 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.221 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=27] [neededSchemaVersion=28] ["start time"=782.145µs] [phyTblIDs="[55]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.255 +05:30] [INFO] [bootstrap.go:383] ["bootstrap successful"] ["take time"=357.862156ms]
[2021/10/23 15:55:36.255 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 1, tp general"] ["take time"=629ns]
[2021/10/23 15:55:36.256 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 2, tp add index"] ["take time"=159ns]
[2021/10/23 15:55:36.256 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/23 15:55:36.256 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/23 15:55:36.256 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=87b51d59-89b6-4f7f-9222-2c3a77533db1] ["take time"=90.483µs]
[2021/10/23 15:55:36.256 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=87b51d59-89b6-4f7f-9222-2c3a77533db1]
[2021/10/23 15:55:36.256 +05:30] [INFO] [domain.go:437] ["topNSlowQueryLoop exited."]
[2021/10/23 15:55:36.256 +05:30] [INFO] [domain.go:466] ["infoSyncerKeeper exited."]
[2021/10/23 15:55:36.256 +05:30] [INFO] [domain.go:494] ["topologySyncerKeeper exited."]
[2021/10/23 15:55:36.256 +05:30] [INFO] [domain.go:650] ["domain closed"] ["take time"=210.02µs]
[2021/10/23 15:55:36.256 +05:30] [INFO] [tidb.go:72] ["new domain"] [store=acf09ab5-f3f3-4c1d-8b10-0cfcfc1b353a] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/23 15:55:36.263 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=28] ["start time"=6.976049ms]
[2021/10/23 15:55:36.263 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 15:55:36.263 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=f22edec8-d620-41ee-b0cc-2aafb65fd357] [runWorker=true]
[2021/10/23 15:55:36.263 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/23 15:55:36.263 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/23 15:55:36.263 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 4, tp add index"]
[2021/10/23 15:55:36.263 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 3, tp general"]
[2021/10/23 15:55:36.270 +05:30] [WARN] [sysvar_cache.go:51] ["sysvar cache is empty, triggering rebuild"]
[2021/10/23 15:55:36.287 +05:30] [INFO] [telemetry.go:174] ["Telemetry configuration"] [endpoint=https://telemetry.pingcap.com/api/v1/tidb/report] [report_interval=6h0m0s] [enabled=true]
=== RUN   TestSuiteP1/Tests
=== RUN   TestSuiteP1/Tests/TestPessimisticSelectForUpdate
=== PAUSE TestSuiteP1/Tests/TestPessimisticSelectForUpdate
=== CONT  TestSuiteP1/Tests/TestPessimisticSelectForUpdate
[2021/10/23 15:55:36.288 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=28] [cur_db=test] [sql="drop table if exists t"] [user=]
[2021/10/23 15:55:36.288 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=28] [cur_db=test] [sql="create table t(id int primary key, a int)"] [user=]
[2021/10/23 15:55:36.290 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.289 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 15:55:36.290 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-23 15:55:36.289 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table t(id int primary key, a int)"]
[2021/10/23 15:55:36.291 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.289 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.293 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 15:55:36.289 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 15:55:36.294 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=58]
[2021/10/23 15:55:36.294 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 15:55:36.295 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=28] [neededSchemaVersion=29] ["start time"=645.585µs] [phyTblIDs="[57]"] [actionTypes="[8]"]
[2021/10/23 15:55:36.299 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 3, tp general"] ["take time"=530ns]
[2021/10/23 15:55:36.299 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 4, tp add index"] ["take time"=253ns]
[2021/10/23 15:55:36.299 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/23 15:55:36.299 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/23 15:55:36.299 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=f22edec8-d620-41ee-b0cc-2aafb65fd357] ["take time"=106.293µs]
[2021/10/23 15:55:36.299 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=f22edec8-d620-41ee-b0cc-2aafb65fd357]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:437] ["topNSlowQueryLoop exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:1066] ["handleEvolvePlanTasksLoop exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:898] ["loadPrivilegeInLoop exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:494] ["topologySyncerKeeper exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:1151] ["PlanReplayerLoop exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:1025] ["globalBindHandleWorkerLoop exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:1129] ["TelemetryRotateSubWindowLoop exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:466] ["infoSyncerKeeper exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:1099] ["TelemetryReportLoop exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:947] ["LoadSysVarCacheLoop exited."]
[2021/10/23 15:55:36.299 +05:30] [INFO] [domain.go:650] ["domain closed"] ["take time"=330.484µs]
[2021/10/23 15:55:36.320 +05:30] [INFO] [db.go:567] ["Closing database"]
[2021/10/23 15:55:36.320 +05:30] [INFO] [db.go:592] ["Memtable flushed"]
[2021/10/23 15:55:36.320 +05:30] [INFO] [db.go:596] ["Compaction finished"]
[2021/10/23 15:55:36.320 +05:30] [INFO] [db.go:615] ["BlobManager finished"]
[2021/10/23 15:55:36.320 +05:30] [INFO] [db.go:619] ["ResourceManager finished"]
[2021/10/23 15:55:36.321 +05:30] [INFO] [db.go:625] ["Waiting for closer"]
--- PASS: TestSuiteP1 (0.59s)
    --- PASS: TestSuiteP1/Tests (0.00s)
        --- PASS: TestSuiteP1/Tests/TestPessimisticSelectForUpdate (0.01s)
PASS
ok  	github.com/pingcap/tidb/executor	2.335s

tidb $
tidb $
```

```bash
tidb $ { make failpoint-enable; go test -v -run ^TestSuiteP1/Tests/TestBind$ github.com/pingcap/tidb/executor; make failpoint-disable; }
# github.com/shirou/gopsutil/cpu
../../../../../go/pkg/mod/github.com/shirou/gopsutil@v3.21.2+incompatible/cpu/cpu_darwin_cgo.go:13:5: warning: 'TARGET_OS_MAC' is not defined, evaluates to 0 [-Wundef-prefix=TARGET_OS_]
=== RUN   TestSuiteP1
[2021/10/23 16:01:49.604 +05:30] [INFO] [tidb.go:72] ["new domain"] [store=b7253836-eb8b-4658-8e75-0f396bf686e8] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/23 16:01:49.614 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=0] ["start time"=1.860949ms]
[2021/10/23 16:01:49.614 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 16:01:49.614 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=6c43584e-1cbb-4c69-9e38-79b2618297d1] [runWorker=true]
[2021/10/23 16:01:49.614 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/23 16:01:49.615 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/23 16:01:49.615 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 2, tp add index"]
[2021/10/23 16:01:49.615 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 1, tp general"]
[2021/10/23 16:01:49.615 +05:30] [INFO] [tidb.go:260] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/10/23 16:01:49.615 +05:30] [WARN] [session.go:1580] ["run statement failed"] [schemaVersion=0] [error="[schema:1049]Unknown database 'mysql'"] [errorVerbose="[schema:1049]Unknown database 'mysql'\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.(*Error).GenWithStackByArgs\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/normalize.go:159\ngithub.com/pingcap/tidb/executor.(*SimpleExec).executeUse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:556\ngithub.com/pingcap/tidb/executor.(*SimpleExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:126\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:584\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:465\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:414\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1683\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1577\ngithub.com/pingcap/tidb/session.(*session).ExecuteInternal\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1289\ngithub.com/pingcap/tidb/session.checkBootstrapped\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:618\ngithub.com/pingcap/tidb/session.bootstrap\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:366\ngithub.com/pingcap/tidb/session.runInBootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2587\ngithub.com/pingcap/tidb/session.BootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2433\ngithub.com/pingcap/tidb/executor_test.(*baseTestSuite).NewSetUpSuite\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:218\ngithub.com/pingcap/tidb/executor_test.TestSuiteP1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:270\ntesting.tRunner\n\t/Users/karuppiahn/.go/src/testing/testing.go:1193\nruntime.goexit\n\t/Users/karuppiahn/.go/src/runtime/asm_amd64.s:1371"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 0,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/10/23 16:01:49.616 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=0] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS test"] [user=]
[2021/10/23 16:01:49.620 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.620 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS test"]
[2021/10/23 16:01:49.621 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.623 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:synced, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.624 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=2]
[2021/10/23 16:01:49.624 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.627 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=1] ["start time"=2.542685ms]
[2021/10/23 16:01:49.627 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 16:01:49.627 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=1] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS `mysql`"] [user=]
[2021/10/23 16:01:49.629 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.628 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.629 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.628 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS `mysql`"]
[2021/10/23 16:01:49.630 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.628 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.632 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:synced, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.628 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.633 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=4]
[2021/10/23 16:01:49.633 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.634 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=1] [neededSchemaVersion=2] ["start time"=460.098µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/10/23 16:01:49.635 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=2] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"] [user=]
[2021/10/23 16:01:49.638 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.636 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.638 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.636 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"]
[2021/10/23 16:01:49.640 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.636 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.646 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.636 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.649 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=6]
[2021/10/23 16:01:49.649 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.651 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=2] [neededSchemaVersion=3] ["start time"=1.665012ms] [phyTblIDs="[5]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.651 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=3] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"] [user=]
[2021/10/23 16:01:49.654 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.653 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.654 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.653 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"]
[2021/10/23 16:01:49.655 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.653 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.658 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.653 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.659 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=8]
[2021/10/23 16:01:49.659 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.660 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=3] [neededSchemaVersion=4] ["start time"=996.926µs] [phyTblIDs="[7]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.661 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=4] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"] [user=]
[2021/10/23 16:01:49.663 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.662 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.663 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.662 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"]
[2021/10/23 16:01:49.665 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.662 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.670 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.662 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.671 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=10]
[2021/10/23 16:01:49.671 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.673 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=4] [neededSchemaVersion=5] ["start time"=1.112001ms] [phyTblIDs="[9]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.673 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=5] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"] [user=]
[2021/10/23 16:01:49.675 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.674 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.675 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.674 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"]
[2021/10/23 16:01:49.676 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.674 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.680 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.674 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.681 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=12]
[2021/10/23 16:01:49.681 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.682 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=5] [neededSchemaVersion=6] ["start time"=828.797µs] [phyTblIDs="[11]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.683 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=6] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"] [user=]
[2021/10/23 16:01:49.685 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.684 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.685 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.684 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"]
[2021/10/23 16:01:49.686 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.684 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.689 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.684 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.691 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=14]
[2021/10/23 16:01:49.691 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.692 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=6] [neededSchemaVersion=7] ["start time"=831.852µs] [phyTblIDs="[13]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.692 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=7] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"] [user=]
[2021/10/23 16:01:49.694 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.693 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.694 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.693 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"]
[2021/10/23 16:01:49.695 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.693 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.698 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.693 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.700 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=16]
[2021/10/23 16:01:49.700 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.701 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=7] [neededSchemaVersion=8] ["start time"=816.958µs] [phyTblIDs="[15]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.701 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=8] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"] [user=]
[2021/10/23 16:01:49.704 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.702 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.704 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.702 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"]
[2021/10/23 16:01:49.704 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.702 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.707 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.702 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.709 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=18]
[2021/10/23 16:01:49.709 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.710 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=8] [neededSchemaVersion=9] ["start time"=795.934µs] [phyTblIDs="[17]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.710 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=9] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"] [user=]
[2021/10/23 16:01:49.713 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.711 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.713 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.711 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"]
[2021/10/23 16:01:49.714 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.711 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.717 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.711 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.718 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=20]
[2021/10/23 16:01:49.718 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.719 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=9] [neededSchemaVersion=10] ["start time"=833.33µs] [phyTblIDs="[19]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.720 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=10] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"] [user=]
[2021/10/23 16:01:49.722 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.721 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.722 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.721 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"]
[2021/10/23 16:01:49.723 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.721 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.726 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.721 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.727 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=22]
[2021/10/23 16:01:49.727 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.729 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=10] [neededSchemaVersion=11] ["start time"=832.321µs] [phyTblIDs="[21]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.729 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=11] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 16:01:49.729 +05:30] [INFO] [ddl_api.go:672] ["Automatically convert BLOB(6291456) to MEDIUMBLOB"]
[2021/10/23 16:01:49.735 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.734 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.735 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.734 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 16:01:49.736 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.734 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.740 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.734 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.741 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=24]
[2021/10/23 16:01:49.742 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.743 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=11] [neededSchemaVersion=12] ["start time"=952.009µs] [phyTblIDs="[23]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.743 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=12] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"] [user=]
[2021/10/23 16:01:49.745 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.744 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.745 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.744 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"]
[2021/10/23 16:01:49.746 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.744 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.750 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.744 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.751 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=26]
[2021/10/23 16:01:49.751 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.752 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=12] [neededSchemaVersion=13] ["start time"=868.94µs] [phyTblIDs="[25]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.752 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=13] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"] [user=]
[2021/10/23 16:01:49.755 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.754 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.755 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.754 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"]
[2021/10/23 16:01:49.755 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.754 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.758 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.754 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.760 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=28]
[2021/10/23 16:01:49.760 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.762 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=13] [neededSchemaVersion=14] ["start time"=1.065912ms] [phyTblIDs="[27]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.762 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=14] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"] [user=]
[2021/10/23 16:01:49.764 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.763 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.764 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.763 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"]
[2021/10/23 16:01:49.765 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.763 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.768 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.763 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.770 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=30]
[2021/10/23 16:01:49.770 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.771 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=14] [neededSchemaVersion=15] ["start time"=796.999µs] [phyTblIDs="[29]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.771 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=15] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 16:01:49.773 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.772 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.773 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.772 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 16:01:49.774 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.772 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.777 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.772 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.778 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=32]
[2021/10/23 16:01:49.778 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.779 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=15] [neededSchemaVersion=16] ["start time"=859.082µs] [phyTblIDs="[31]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.780 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=16] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"] [user=]
[2021/10/23 16:01:49.782 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.781 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.782 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.781 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"]
[2021/10/23 16:01:49.783 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.781 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.786 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.781 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.788 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=34]
[2021/10/23 16:01:49.788 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.789 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=16] [neededSchemaVersion=17] ["start time"=831.327µs] [phyTblIDs="[33]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.789 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=17] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"] [user=]
[2021/10/23 16:01:49.791 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.79 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.791 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.79 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"]
[2021/10/23 16:01:49.792 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.79 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.795 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.79 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.796 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=36]
[2021/10/23 16:01:49.796 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.797 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=17] [neededSchemaVersion=18] ["start time"=837.57µs] [phyTblIDs="[35]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.797 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=18] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"] [user=]
[2021/10/23 16:01:49.800 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.799 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.800 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.799 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"]
[2021/10/23 16:01:49.801 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.799 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.804 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.799 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.805 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=38]
[2021/10/23 16:01:49.806 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.807 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=18] [neededSchemaVersion=19] ["start time"=882.572µs] [phyTblIDs="[37]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.810 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=19] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 16:01:49.812 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.811 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.812 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.811 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 16:01:49.813 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.811 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.816 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.811 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.817 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=40]
[2021/10/23 16:01:49.817 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.818 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=19] [neededSchemaVersion=20] ["start time"=795.716µs] [phyTblIDs="[39]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.818 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=20] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"] [user=]
[2021/10/23 16:01:49.820 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.820 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"]
[2021/10/23 16:01:49.821 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.824 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.825 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=42]
[2021/10/23 16:01:49.825 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.826 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=20] [neededSchemaVersion=21] ["start time"=743.608µs] [phyTblIDs="[41]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.826 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=21] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"] [user=]
[2021/10/23 16:01:49.828 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.827 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.828 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.827 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"]
[2021/10/23 16:01:49.829 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.827 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.832 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.827 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.833 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=44]
[2021/10/23 16:01:49.833 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.834 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=21] [neededSchemaVersion=22] ["start time"=793.553µs] [phyTblIDs="[43]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.834 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=22] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"] [user=]
[2021/10/23 16:01:49.837 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.836 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.837 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.836 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"]
[2021/10/23 16:01:49.838 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.836 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.841 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.836 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.842 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=46]
[2021/10/23 16:01:49.842 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.844 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=22] [neededSchemaVersion=23] ["start time"=1.050279ms] [phyTblIDs="[45]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.844 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=23] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"] [user=]
[2021/10/23 16:01:49.847 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.846 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.847 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.846 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"]
[2021/10/23 16:01:49.848 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.846 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.851 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.846 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.852 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=48]
[2021/10/23 16:01:49.852 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.853 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=23] [neededSchemaVersion=24] ["start time"=795.315µs] [phyTblIDs="[47]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.854 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=24] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 16:01:49.856 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.855 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.856 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.855 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 16:01:49.857 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.855 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.859 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.855 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.861 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=50]
[2021/10/23 16:01:49.861 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.862 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=24] [neededSchemaVersion=25] ["start time"=796.784µs] [phyTblIDs="[49]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.862 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=25] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"] [user=]
[2021/10/23 16:01:49.864 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.863 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.864 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.863 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"]
[2021/10/23 16:01:49.865 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.863 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.868 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.863 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.869 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=52]
[2021/10/23 16:01:49.869 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.870 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=25] [neededSchemaVersion=26] ["start time"=809.627µs] [phyTblIDs="[51]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.870 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=26] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"] [user=]
[2021/10/23 16:01:49.872 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.871 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.872 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.871 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"]
[2021/10/23 16:01:49.873 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.871 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.879 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.871 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.881 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=54]
[2021/10/23 16:01:49.881 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.882 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=26] [neededSchemaVersion=27] ["start time"=771.621µs] [phyTblIDs="[53]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.882 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=27] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.column_stats_usage (\n\t\ttable_id BIGINT(64) NOT NULL,\n\t\tcolumn_id BIGINT(64) NOT NULL,\n\t\tlast_used_at TIMESTAMP,\n\t\tlast_analyzed_at TIMESTAMP,\n\t\tPRIMARY KEY (table_id, column_id) CLUSTERED\n\t);"] [user=]
[2021/10/23 16:01:49.884 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.883 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.884 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.883 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.column_stats_usage (\n\t\ttable_id BIGINT(64) NOT NULL,\n\t\tcolumn_id BIGINT(64) NOT NULL,\n\t\tlast_used_at TIMESTAMP,\n\t\tlast_analyzed_at TIMESTAMP,\n\t\tPRIMARY KEY (table_id, column_id) CLUSTERED\n\t);"]
[2021/10/23 16:01:49.886 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.883 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.890 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:56, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.883 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:49.893 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=56]
[2021/10/23 16:01:49.893 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:49.895 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=27] [neededSchemaVersion=28] ["start time"=1.229904ms] [phyTblIDs="[55]"] [actionTypes="[8]"]
[2021/10/23 16:01:49.942 +05:30] [INFO] [bootstrap.go:383] ["bootstrap successful"] ["take time"=327.050517ms]
[2021/10/23 16:01:49.943 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 1, tp general"] ["take time"=708ns]
[2021/10/23 16:01:49.943 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 2, tp add index"] ["take time"=443ns]
[2021/10/23 16:01:49.943 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/23 16:01:49.943 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/23 16:01:49.943 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=6c43584e-1cbb-4c69-9e38-79b2618297d1] ["take time"=130.376µs]
[2021/10/23 16:01:49.943 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=6c43584e-1cbb-4c69-9e38-79b2618297d1]
[2021/10/23 16:01:49.943 +05:30] [INFO] [domain.go:437] ["topNSlowQueryLoop exited."]
[2021/10/23 16:01:49.943 +05:30] [INFO] [domain.go:650] ["domain closed"] ["take time"=252.616µs]
[2021/10/23 16:01:49.943 +05:30] [INFO] [tidb.go:72] ["new domain"] [store=b7253836-eb8b-4658-8e75-0f396bf686e8] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/23 16:01:49.943 +05:30] [INFO] [domain.go:466] ["infoSyncerKeeper exited."]
[2021/10/23 16:01:49.943 +05:30] [INFO] [domain.go:494] ["topologySyncerKeeper exited."]
[2021/10/23 16:01:49.955 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=28] ["start time"=11.714742ms]
[2021/10/23 16:01:49.955 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 16:01:49.955 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=c9c9a7f2-c8fe-4812-9561-9d3677ba99da] [runWorker=true]
[2021/10/23 16:01:49.956 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/23 16:01:49.957 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/23 16:01:49.957 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 3, tp general"]
[2021/10/23 16:01:49.957 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 4, tp add index"]
[2021/10/23 16:01:49.965 +05:30] [WARN] [sysvar_cache.go:51] ["sysvar cache is empty, triggering rebuild"]
[2021/10/23 16:01:49.990 +05:30] [INFO] [telemetry.go:174] ["Telemetry configuration"] [endpoint=https://telemetry.pingcap.com/api/v1/tidb/report] [report_interval=6h0m0s] [enabled=true]
=== RUN   TestSuiteP1/Tests
=== RUN   TestSuiteP1/Tests/TestBind
=== PAUSE TestSuiteP1/Tests/TestBind
=== CONT  TestSuiteP1/Tests/TestBind
[2021/10/23 16:01:49.993 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=28] [cur_db=test] [sql="drop table if exists testbind"] [user=]
[2021/10/23 16:01:49.994 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=28] [cur_db=test] [sql="create table testbind(i int, s varchar(20))"] [user=]
[2021/10/23 16:01:49.997 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.995 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:49.997 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-23 16:01:49.995 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table testbind(i int, s varchar(20))"]
[2021/10/23 16:01:49.999 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.995 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:50.003 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:49.995 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:50.005 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=58]
[2021/10/23 16:01:50.005 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:50.007 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=28] [neededSchemaVersion=29] ["start time"=1.982779ms] [phyTblIDs="[57]"] [actionTypes="[8]"]
[2021/10/23 16:01:50.007 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=29] [cur_db=test] [sql="create index index_t on testbind(i,s)"] [user=]
[2021/10/23 16:01:50.011 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:59, Type:add index, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:6, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:01:50.011 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:59, Type:add index, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:6, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create index index_t on testbind(i,s)"]
[2021/10/23 16:01:50.012 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:59, Type:add index, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:50.012 +05:30] [INFO] [index.go:507] ["[ddl] run add index job"] [job="ID:59, Type:add index, State:running, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:6, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [indexInfo="{\"id\":1,\"idx_name\":{\"O\":\"index_t\",\"L\":\"index_t\"},\"tbl_name\":{\"O\":\"\",\"L\":\"\"},\"idx_cols\":[{\"name\":{\"O\":\"i\",\"L\":\"i\"},\"offset\":0,\"length\":-1},{\"name\":{\"O\":\"s\",\"L\":\"s\"},\"offset\":1,\"length\":-1}],\"state\":0,\"comment\":\"\",\"index_type\":1,\"is_unique\":false,\"is_primary\":false,\"is_invisible\":false,\"is_global\":false}"]
[2021/10/23 16:01:50.014 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:59, Type:add index, State:running, SchemaState:delete only, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:50.019 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:59, Type:add index, State:running, SchemaState:write only, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:50.021 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:59, Type:add index, State:running, SchemaState:write reorganization, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:01:50.023 +05:30] [INFO] [reorg.go:562] ["[ddl] get table range, endHandle < startHandle"] [table=] ["table/partition ID"=57] [endHandle="key: "] [startHandle="key: "]
[2021/10/23 16:01:50.024 +05:30] [INFO] [reorg.go:622] ["[ddl] job get table range"] [jobID=59] [physicalTableID=57] [startHandle="key: "] [endHandle="key: "]
[2021/10/23 16:01:50.026 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:59, Type:add index, State:running, SchemaState:write reorganization, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:428601536681607168"]
[2021/10/23 16:01:50.027 +05:30] [INFO] [index.go:1349] ["[ddl] start to add table index"] [job="ID:59, Type:add index, State:running, SchemaState:write reorganization, SchemaID:1, TableID:57, RowCount:0, ArgLen:6, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:428601536681607168"] [reorgInfo="CurrElementType:_idx_,CurrElementID:1,StartHandle:key: ,EndHandle:key: ,First:false,PhysicalTableID:57"]
[2021/10/23 16:01:50.027 +05:30] [INFO] [reorg.go:240] ["[ddl] run reorg job done"] ["handled rows"=0]
[2021/10/23 16:01:50.031 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 4, tp add index"] [job="ID:59, Type:add index, State:synced, SchemaState:public, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:01:50.008 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:428601536681607168"]
[2021/10/23 16:01:50.033 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=59]
[2021/10/23 16:01:50.033 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:01:50.036 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=29] [neededSchemaVersion=33] ["start time"=2.810254ms] [phyTblIDs="[57,57,57,57]"] [actionTypes="[128,128,128,128]"]
[2021/10/23 16:01:50.045 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 3, tp general"] ["take time"=587ns]
[2021/10/23 16:01:50.045 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 4, tp add index"] ["take time"=225ns]
[2021/10/23 16:01:50.045 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/23 16:01:50.045 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/23 16:01:50.045 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=c9c9a7f2-c8fe-4812-9561-9d3677ba99da] ["take time"=104.96µs]
[2021/10/23 16:01:50.045 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=c9c9a7f2-c8fe-4812-9561-9d3677ba99da]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:437] ["topNSlowQueryLoop exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:898] ["loadPrivilegeInLoop exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:1129] ["TelemetryRotateSubWindowLoop exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:1066] ["handleEvolvePlanTasksLoop exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:1025] ["globalBindHandleWorkerLoop exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:947] ["LoadSysVarCacheLoop exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:1099] ["TelemetryReportLoop exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:1151] ["PlanReplayerLoop exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:494] ["topologySyncerKeeper exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:466] ["infoSyncerKeeper exited."]
[2021/10/23 16:01:50.045 +05:30] [INFO] [domain.go:650] ["domain closed"] ["take time"=288.274µs]
[2021/10/23 16:01:50.066 +05:30] [INFO] [db.go:567] ["Closing database"]
[2021/10/23 16:01:50.066 +05:30] [INFO] [db.go:592] ["Memtable flushed"]
[2021/10/23 16:01:50.066 +05:30] [INFO] [db.go:596] ["Compaction finished"]
[2021/10/23 16:01:50.066 +05:30] [INFO] [db.go:615] ["BlobManager finished"]
[2021/10/23 16:01:50.066 +05:30] [INFO] [db.go:619] ["ResourceManager finished"]
[2021/10/23 16:01:50.066 +05:30] [INFO] [db.go:625] ["Waiting for closer"]
--- PASS: TestSuiteP1 (0.60s)
    --- PASS: TestSuiteP1/Tests (0.00s)
        --- PASS: TestSuiteP1/Tests/TestBind (0.05s)
PASS
ok  	github.com/pingcap/tidb/executor	2.327s

tidb $
tidb $
```

```bash
tidb $ { make failpoint-enable; go test -v -run ^TestSuiteP1/.*$ github.com/pingcap/tidb/executor; make failpoint-disable; }
# github.com/shirou/gopsutil/cpu
../../../../../go/pkg/mod/github.com/shirou/gopsutil@v3.21.2+incompatible/cpu/cpu_darwin_cgo.go:13:5: warning: 'TARGET_OS_MAC' is not defined, evaluates to 0 [-Wundef-prefix=TARGET_OS_]
=== RUN   TestSuiteP1
[2021/10/23 16:05:18.688 +05:30] [INFO] [tidb.go:72] ["new domain"] [store=280518d3-0909-43ea-8b93-bab999332500] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/23 16:05:18.700 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=0] ["start time"=1.895618ms]
[2021/10/23 16:05:18.700 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 16:05:18.700 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=6e1e5d67-676a-43c4-892e-fdd7a82f1983] [runWorker=true]
[2021/10/23 16:05:18.700 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/23 16:05:18.700 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 1, tp general"]
[2021/10/23 16:05:18.700 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/23 16:05:18.700 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 2, tp add index"]
[2021/10/23 16:05:18.701 +05:30] [INFO] [tidb.go:260] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/10/23 16:05:18.701 +05:30] [WARN] [session.go:1580] ["run statement failed"] [schemaVersion=0] [error="[schema:1049]Unknown database 'mysql'"] [errorVerbose="[schema:1049]Unknown database 'mysql'\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.(*Error).GenWithStackByArgs\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/normalize.go:159\ngithub.com/pingcap/tidb/executor.(*SimpleExec).executeUse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:556\ngithub.com/pingcap/tidb/executor.(*SimpleExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:126\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:584\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:465\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:414\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1683\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1577\ngithub.com/pingcap/tidb/session.(*session).ExecuteInternal\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1289\ngithub.com/pingcap/tidb/session.checkBootstrapped\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:618\ngithub.com/pingcap/tidb/session.bootstrap\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:366\ngithub.com/pingcap/tidb/session.runInBootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2587\ngithub.com/pingcap/tidb/session.BootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2433\ngithub.com/pingcap/tidb/executor_test.(*baseTestSuite).NewSetUpSuite\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:218\ngithub.com/pingcap/tidb/executor_test.TestSuiteP1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:270\ntesting.tRunner\n\t/Users/karuppiahn/.go/src/testing/testing.go:1193\nruntime.goexit\n\t/Users/karuppiahn/.go/src/runtime/asm_amd64.s:1371"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 0,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/10/23 16:05:18.702 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=0] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS test"] [user=]
[2021/10/23 16:05:18.705 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.703 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.705 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.703 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS test"]
[2021/10/23 16:05:18.706 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.703 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.708 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:synced, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.703 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.709 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=2]
[2021/10/23 16:05:18.709 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.712 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=1] ["start time"=2.359834ms]
[2021/10/23 16:05:18.712 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 16:05:18.712 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=1] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS `mysql`"] [user=]
[2021/10/23 16:05:18.714 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.713 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.714 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.713 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS `mysql`"]
[2021/10/23 16:05:18.715 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.713 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.717 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:synced, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.713 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.719 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=4]
[2021/10/23 16:05:18.719 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.720 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=1] [neededSchemaVersion=2] ["start time"=694.151µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/10/23 16:05:18.721 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=2] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"] [user=]
[2021/10/23 16:05:18.725 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.723 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.725 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.723 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"]
[2021/10/23 16:05:18.727 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.723 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.736 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.723 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.740 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=6]
[2021/10/23 16:05:18.740 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.742 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=2] [neededSchemaVersion=3] ["start time"=2.253255ms] [phyTblIDs="[5]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.743 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=3] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"] [user=]
[2021/10/23 16:05:18.746 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.745 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.746 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.745 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"]
[2021/10/23 16:05:18.748 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.745 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.752 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.745 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.754 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=8]
[2021/10/23 16:05:18.754 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.755 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=3] [neededSchemaVersion=4] ["start time"=1.121018ms] [phyTblIDs="[7]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.756 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=4] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"] [user=]
[2021/10/23 16:05:18.760 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.758 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.760 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.758 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"]
[2021/10/23 16:05:18.762 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.758 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.769 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.758 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.771 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=10]
[2021/10/23 16:05:18.772 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.774 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=4] [neededSchemaVersion=5] ["start time"=1.674769ms] [phyTblIDs="[9]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.774 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=5] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"] [user=]
[2021/10/23 16:05:18.778 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.776 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.778 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.776 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"]
[2021/10/23 16:05:18.779 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.776 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.784 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.776 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.786 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=12]
[2021/10/23 16:05:18.786 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.788 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=5] [neededSchemaVersion=6] ["start time"=1.2469ms] [phyTblIDs="[11]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.788 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=6] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"] [user=]
[2021/10/23 16:05:18.792 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.79 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.792 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.79 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"]
[2021/10/23 16:05:18.793 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.79 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.799 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.79 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.801 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=14]
[2021/10/23 16:05:18.801 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.803 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=6] [neededSchemaVersion=7] ["start time"=1.491524ms] [phyTblIDs="[13]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.803 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=7] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"] [user=]
[2021/10/23 16:05:18.807 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.805 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.807 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.805 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"]
[2021/10/23 16:05:18.808 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.805 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.813 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.805 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.815 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=16]
[2021/10/23 16:05:18.815 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.816 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=7] [neededSchemaVersion=8] ["start time"=1.27684ms] [phyTblIDs="[15]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.817 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=8] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"] [user=]
[2021/10/23 16:05:18.820 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.820 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"]
[2021/10/23 16:05:18.822 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.826 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.819 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.828 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=18]
[2021/10/23 16:05:18.828 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.830 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=8] [neededSchemaVersion=9] ["start time"=1.386644ms] [phyTblIDs="[17]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.831 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=9] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"] [user=]
[2021/10/23 16:05:18.835 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.833 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.835 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.833 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"]
[2021/10/23 16:05:18.836 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.833 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.841 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.833 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.844 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=20]
[2021/10/23 16:05:18.844 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.846 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=9] [neededSchemaVersion=10] ["start time"=1.440497ms] [phyTblIDs="[19]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.846 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=10] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"] [user=]
[2021/10/23 16:05:18.850 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.848 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.850 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.848 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"]
[2021/10/23 16:05:18.851 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.848 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.858 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.848 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.860 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=22]
[2021/10/23 16:05:18.860 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.862 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=10] [neededSchemaVersion=11] ["start time"=1.5717ms] [phyTblIDs="[21]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.863 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=11] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 16:05:18.863 +05:30] [INFO] [ddl_api.go:672] ["Automatically convert BLOB(6291456) to MEDIUMBLOB"]
[2021/10/23 16:05:18.867 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.865 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.867 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.865 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 16:05:18.868 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.865 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.875 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.865 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.877 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=24]
[2021/10/23 16:05:18.877 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.880 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=11] [neededSchemaVersion=12] ["start time"=1.887078ms] [phyTblIDs="[23]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.880 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=12] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"] [user=]
[2021/10/23 16:05:18.884 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.882 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.884 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.882 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"]
[2021/10/23 16:05:18.885 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.882 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.891 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.882 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.893 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=26]
[2021/10/23 16:05:18.893 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.895 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=12] [neededSchemaVersion=13] ["start time"=1.354876ms] [phyTblIDs="[25]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.896 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=13] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"] [user=]
[2021/10/23 16:05:18.900 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.898 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.900 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.898 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"]
[2021/10/23 16:05:18.901 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.898 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.906 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.898 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.908 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=28]
[2021/10/23 16:05:18.908 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.910 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=13] [neededSchemaVersion=14] ["start time"=1.451633ms] [phyTblIDs="[27]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.910 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=14] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"] [user=]
[2021/10/23 16:05:18.914 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.912 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.914 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.912 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"]
[2021/10/23 16:05:18.916 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.912 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.921 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.912 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.923 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=30]
[2021/10/23 16:05:18.923 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.925 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=14] [neededSchemaVersion=15] ["start time"=1.544665ms] [phyTblIDs="[29]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.926 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=15] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 16:05:18.930 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.928 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.930 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.928 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 16:05:18.931 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.928 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.936 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.928 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.938 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=32]
[2021/10/23 16:05:18.938 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.940 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=15] [neededSchemaVersion=16] ["start time"=1.297036ms] [phyTblIDs="[31]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.940 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=16] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"] [user=]
[2021/10/23 16:05:18.944 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.942 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.944 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.942 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"]
[2021/10/23 16:05:18.945 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.942 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.950 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.942 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.952 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=34]
[2021/10/23 16:05:18.952 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.954 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=16] [neededSchemaVersion=17] ["start time"=1.462149ms] [phyTblIDs="[33]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.955 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=17] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"] [user=]
[2021/10/23 16:05:18.958 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.956 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.958 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.956 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"]
[2021/10/23 16:05:18.959 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.956 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.964 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.956 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.966 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=36]
[2021/10/23 16:05:18.966 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.968 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=17] [neededSchemaVersion=18] ["start time"=1.55241ms] [phyTblIDs="[35]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.969 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=18] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"] [user=]
[2021/10/23 16:05:18.972 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.971 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.972 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.971 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"]
[2021/10/23 16:05:18.974 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.971 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.979 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.971 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:18.982 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=38]
[2021/10/23 16:05:18.982 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:18.984 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=18] [neededSchemaVersion=19] ["start time"=1.567778ms] [phyTblIDs="[37]"] [actionTypes="[8]"]
[2021/10/23 16:05:18.990 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=19] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 16:05:18.993 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.992 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:18.993 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:18.992 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 16:05:18.995 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.992 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.000 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:18.992 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.002 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=40]
[2021/10/23 16:05:19.003 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.004 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=19] [neededSchemaVersion=20] ["start time"=1.455763ms] [phyTblIDs="[39]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.005 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=20] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"] [user=]
[2021/10/23 16:05:19.009 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.007 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.009 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.007 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"]
[2021/10/23 16:05:19.010 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.007 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.015 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.007 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.017 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=42]
[2021/10/23 16:05:19.017 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.019 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=20] [neededSchemaVersion=21] ["start time"=1.308956ms] [phyTblIDs="[41]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.019 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=21] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"] [user=]
[2021/10/23 16:05:19.023 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.021 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.023 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.021 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"]
[2021/10/23 16:05:19.024 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.021 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.029 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.021 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.030 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=44]
[2021/10/23 16:05:19.030 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.031 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=21] [neededSchemaVersion=22] ["start time"=713.352µs] [phyTblIDs="[43]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.031 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=22] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"] [user=]
[2021/10/23 16:05:19.034 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.033 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.035 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.033 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"]
[2021/10/23 16:05:19.036 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.033 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.041 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.033 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.043 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=46]
[2021/10/23 16:05:19.043 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.046 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=22] [neededSchemaVersion=23] ["start time"=1.714156ms] [phyTblIDs="[45]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.046 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=23] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"] [user=]
[2021/10/23 16:05:19.050 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.048 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.050 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.048 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"]
[2021/10/23 16:05:19.051 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.048 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.056 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.048 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.058 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=48]
[2021/10/23 16:05:19.058 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.060 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=23] [neededSchemaVersion=24] ["start time"=1.224537ms] [phyTblIDs="[47]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.060 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=24] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/23 16:05:19.063 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.062 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.064 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.062 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/23 16:05:19.064 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.062 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.068 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.062 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.070 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=50]
[2021/10/23 16:05:19.071 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.072 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=24] [neededSchemaVersion=25] ["start time"=1.420581ms] [phyTblIDs="[49]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.073 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=25] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"] [user=]
[2021/10/23 16:05:19.076 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.075 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.076 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.075 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"]
[2021/10/23 16:05:19.078 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.075 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.083 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.075 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.085 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=52]
[2021/10/23 16:05:19.086 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.088 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=25] [neededSchemaVersion=26] ["start time"=1.761408ms] [phyTblIDs="[51]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.088 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=26] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"] [user=]
[2021/10/23 16:05:19.093 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.091 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.093 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.091 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"]
[2021/10/23 16:05:19.093 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.091 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.096 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.091 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.098 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=54]
[2021/10/23 16:05:19.098 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.099 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=26] [neededSchemaVersion=27] ["start time"=788.996µs] [phyTblIDs="[53]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.099 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=27] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.column_stats_usage (\n\t\ttable_id BIGINT(64) NOT NULL,\n\t\tcolumn_id BIGINT(64) NOT NULL,\n\t\tlast_used_at TIMESTAMP,\n\t\tlast_analyzed_at TIMESTAMP,\n\t\tPRIMARY KEY (table_id, column_id) CLUSTERED\n\t);"] [user=]
[2021/10/23 16:05:19.101 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.1 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.101 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.1 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.column_stats_usage (\n\t\ttable_id BIGINT(64) NOT NULL,\n\t\tcolumn_id BIGINT(64) NOT NULL,\n\t\tlast_used_at TIMESTAMP,\n\t\tlast_analyzed_at TIMESTAMP,\n\t\tPRIMARY KEY (table_id, column_id) CLUSTERED\n\t);"]
[2021/10/23 16:05:19.102 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.1 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.105 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:56, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.1 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.106 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=56]
[2021/10/23 16:05:19.106 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.107 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=27] [neededSchemaVersion=28] ["start time"=780.337µs] [phyTblIDs="[55]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.141 +05:30] [INFO] [bootstrap.go:383] ["bootstrap successful"] ["take time"=440.821ms]
[2021/10/23 16:05:19.142 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 1, tp general"] ["take time"=605ns]
[2021/10/23 16:05:19.142 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 2, tp add index"] ["take time"=182ns]
[2021/10/23 16:05:19.142 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/23 16:05:19.142 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/23 16:05:19.142 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=6e1e5d67-676a-43c4-892e-fdd7a82f1983] ["take time"=100.864µs]
[2021/10/23 16:05:19.142 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=6e1e5d67-676a-43c4-892e-fdd7a82f1983]
[2021/10/23 16:05:19.142 +05:30] [INFO] [domain.go:437] ["topNSlowQueryLoop exited."]
[2021/10/23 16:05:19.142 +05:30] [INFO] [domain.go:650] ["domain closed"] ["take time"=222.076µs]
[2021/10/23 16:05:19.142 +05:30] [INFO] [domain.go:494] ["topologySyncerKeeper exited."]
[2021/10/23 16:05:19.142 +05:30] [INFO] [domain.go:466] ["infoSyncerKeeper exited."]
[2021/10/23 16:05:19.142 +05:30] [INFO] [tidb.go:72] ["new domain"] [store=280518d3-0909-43ea-8b93-bab999332500] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/10/23 16:05:19.149 +05:30] [INFO] [domain.go:164] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=28] ["start time"=6.961779ms]
[2021/10/23 16:05:19.149 +05:30] [INFO] [domain.go:387] ["full load and reset schema validator"]
[2021/10/23 16:05:19.149 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=8358571f-46b9-46ba-816a-38eed5eae4d7] [runWorker=true]
[2021/10/23 16:05:19.150 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/23 16:05:19.150 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 3, tp general"]
[2021/10/23 16:05:19.150 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/23 16:05:19.150 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 4, tp add index"]
[2021/10/23 16:05:19.157 +05:30] [WARN] [sysvar_cache.go:51] ["sysvar cache is empty, triggering rebuild"]
[2021/10/23 16:05:19.172 +05:30] [INFO] [telemetry.go:174] ["Telemetry configuration"] [endpoint=https://telemetry.pingcap.com/api/v1/tidb/report] [report_interval=6h0m0s] [enabled=true]
=== RUN   TestSuiteP1/Tests
=== RUN   TestSuiteP1/Tests/TestPessimisticSelectForUpdate
=== PAUSE TestSuiteP1/Tests/TestPessimisticSelectForUpdate
=== RUN   TestSuiteP1/Tests/TestBind
=== PAUSE TestSuiteP1/Tests/TestBind
=== CONT  TestSuiteP1/Tests/TestPessimisticSelectForUpdate
=== CONT  TestSuiteP1/Tests/TestBind
[2021/10/23 16:05:19.173 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=28] [cur_db=test] [sql="drop table if exists t"] [user=]
[2021/10/23 16:05:19.173 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=28] [cur_db=test] [sql="drop table if exists testbind"] [user=]
[2021/10/23 16:05:19.173 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=28] [cur_db=test] [sql="create table t(id int primary key, a int)"] [user=]
[2021/10/23 16:05:19.173 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=28] [cur_db=test] [sql="create table testbind(i int, s varchar(20))"] [user=]
[2021/10/23 16:05:19.174 +05:30] [INFO] [prewrite.go:329] ["prewrite encounters lock"] [session=0] [lock="key: 6d4e657874476c6f62ff616c494400000000fb0000000000000073, primary: 6d4e657874476c6f62ff616c494400000000fb0000000000000073, txnStartTS: 428601591509286916, lockForUpdateTS:0, minCommitTs:428601591509286917, ttl: 3000, type: Put, UseAsyncCommit: false, txnSize: 0"]
[2021/10/23 16:05:19.175 +05:30] [WARN] [txn.go:66] [RunInNewTxn] ["retry txn"=428601591509286917] ["original txn"=428601591509286917] [error="[kv:9007]Write conflict, txnStartTS=428601591509286917, conflictStartTS=428601591509286916, conflictCommitTS=428601591509549056, key=[]byte{0x6d, 0x4e, 0x65, 0x78, 0x74, 0x47, 0x6c, 0x6f, 0x62, 0xff, 0x61, 0x6c, 0x49, 0x44, 0x0, 0x0, 0x0, 0x0, 0xfb, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x73} primary=[]byte(nil) [try again later]"]
[2021/10/23 16:05:19.175 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.174 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.175 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.174 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table t(id int primary key, a int)"]
[2021/10/23 16:05:19.176 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.174 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.177 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:60, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:59, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.176 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.177 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:60, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:59, RowCount:0, ArgLen:1, start time: 2021-10-23 16:05:19.176 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table testbind(i int, s varchar(20))"]
[2021/10/23 16:05:19.179 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.174 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.180 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:60, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:59, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.176 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.180 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=58]
[2021/10/23 16:05:19.180 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.181 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=28] [neededSchemaVersion=29] ["start time"=650.768µs] [phyTblIDs="[57]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.183 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:60, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:59, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.176 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.184 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=60]
[2021/10/23 16:05:19.184 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.185 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=29] [neededSchemaVersion=30] ["start time"=664.316µs] [phyTblIDs="[59]"] [actionTypes="[8]"]
[2021/10/23 16:05:19.185 +05:30] [INFO] [session.go:2864] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=30] [cur_db=test] [sql="create index index_t on testbind(i,s)"] [user=]
[2021/10/23 16:05:19.186 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:61, Type:add index, State:none, SchemaState:queueing, SchemaID:1, TableID:59, RowCount:0, ArgLen:6, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/23 16:05:19.186 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:61, Type:add index, State:none, SchemaState:queueing, SchemaID:1, TableID:59, RowCount:0, ArgLen:6, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create index index_t on testbind(i,s)"]
[2021/10/23 16:05:19.187 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:61, Type:add index, State:none, SchemaState:queueing, SchemaID:1, TableID:59, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.187 +05:30] [INFO] [index.go:507] ["[ddl] run add index job"] [job="ID:61, Type:add index, State:running, SchemaState:queueing, SchemaID:1, TableID:59, RowCount:0, ArgLen:6, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [indexInfo="{\"id\":1,\"idx_name\":{\"O\":\"index_t\",\"L\":\"index_t\"},\"tbl_name\":{\"O\":\"\",\"L\":\"\"},\"idx_cols\":[{\"name\":{\"O\":\"i\",\"L\":\"i\"},\"offset\":0,\"length\":-1},{\"name\":{\"O\":\"s\",\"L\":\"s\"},\"offset\":1,\"length\":-1}],\"state\":0,\"comment\":\"\",\"index_type\":1,\"is_unique\":false,\"is_primary\":false,\"is_invisible\":false,\"is_global\":false}"]
[2021/10/23 16:05:19.189 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:61, Type:add index, State:running, SchemaState:delete only, SchemaID:1, TableID:59, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.191 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:61, Type:add index, State:running, SchemaState:write only, SchemaID:1, TableID:59, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.193 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:61, Type:add index, State:running, SchemaState:write reorganization, SchemaID:1, TableID:59, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/23 16:05:19.194 +05:30] [INFO] [reorg.go:562] ["[ddl] get table range, endHandle < startHandle"] [table=] ["table/partition ID"=59] [endHandle="key: "] [startHandle="key: "]
[2021/10/23 16:05:19.194 +05:30] [INFO] [reorg.go:622] ["[ddl] job get table range"] [jobID=61] [physicalTableID=59] [startHandle="key: "] [endHandle="key: "]
[2021/10/23 16:05:19.195 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 4, tp add index"] [job="ID:61, Type:add index, State:running, SchemaState:write reorganization, SchemaID:1, TableID:59, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:428601591514529793"]
[2021/10/23 16:05:19.197 +05:30] [INFO] [index.go:1349] ["[ddl] start to add table index"] [job="ID:61, Type:add index, State:running, SchemaState:write reorganization, SchemaID:1, TableID:59, RowCount:0, ArgLen:6, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:428601591514529793"] [reorgInfo="CurrElementType:_idx_,CurrElementID:1,StartHandle:key: ,EndHandle:key: ,First:false,PhysicalTableID:59"]
[2021/10/23 16:05:19.197 +05:30] [INFO] [reorg.go:240] ["[ddl] run reorg job done"] ["handled rows"=0]
[2021/10/23 16:05:19.200 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 4, tp add index"] [job="ID:61, Type:add index, State:synced, SchemaState:public, SchemaID:1, TableID:59, RowCount:0, ArgLen:0, start time: 2021-10-23 16:05:19.185 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:428601591514529793"]
[2021/10/23 16:05:19.201 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=61]
[2021/10/23 16:05:19.201 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/23 16:05:19.204 +05:30] [INFO] [domain.go:133] ["diff load InfoSchema success"] [currentSchemaVersion=30] [neededSchemaVersion=34] ["start time"=2.652774ms] [phyTblIDs="[59,59,59,59]"] [actionTypes="[128,128,128,128]"]
[2021/10/23 16:05:19.213 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 3, tp general"] ["take time"=502ns]
[2021/10/23 16:05:19.213 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 4, tp add index"] ["take time"=157ns]
[2021/10/23 16:05:19.213 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/23 16:05:19.213 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/23 16:05:19.213 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=8358571f-46b9-46ba-816a-38eed5eae4d7] ["take time"=86.102µs]
[2021/10/23 16:05:19.213 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=8358571f-46b9-46ba-816a-38eed5eae4d7]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:437] ["topNSlowQueryLoop exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:1066] ["handleEvolvePlanTasksLoop exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:494] ["topologySyncerKeeper exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:898] ["loadPrivilegeInLoop exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:1129] ["TelemetryRotateSubWindowLoop exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:1151] ["PlanReplayerLoop exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:466] ["infoSyncerKeeper exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:1025] ["globalBindHandleWorkerLoop exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:947] ["LoadSysVarCacheLoop exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:1099] ["TelemetryReportLoop exited."]
[2021/10/23 16:05:19.213 +05:30] [INFO] [domain.go:650] ["domain closed"] ["take time"=279.701µs]
[2021/10/23 16:05:19.238 +05:30] [INFO] [db.go:567] ["Closing database"]
[2021/10/23 16:05:19.238 +05:30] [INFO] [db.go:592] ["Memtable flushed"]
[2021/10/23 16:05:19.238 +05:30] [INFO] [db.go:596] ["Compaction finished"]
[2021/10/23 16:05:19.238 +05:30] [INFO] [db.go:615] ["BlobManager finished"]
[2021/10/23 16:05:19.238 +05:30] [INFO] [db.go:619] ["ResourceManager finished"]
[2021/10/23 16:05:19.238 +05:30] [INFO] [db.go:625] ["Waiting for closer"]
--- PASS: TestSuiteP1 (0.69s)
    --- PASS: TestSuiteP1/Tests (0.00s)
        --- PASS: TestSuiteP1/Tests/TestPessimisticSelectForUpdate (0.01s)
        --- PASS: TestSuiteP1/Tests/TestBind (0.04s)
PASS
ok  	github.com/pingcap/tidb/executor	2.409s
tidb $ 
```

```bash
=== CONT  TestSuiteP1/Tests/TestPessimisticSelectForUpdate
    testkit.go:77: 
        	Error Trace:	testkit.go:77
        	            				executor_test.go:290
        	Error:      	Received unexpected error:
        	            	[schema:1050]Table 't' already exists
        	            	github.com/pingcap/errors.AddStack
        	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
        	            	github.com/pingcap/errors.Trace
        	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
        	            	github.com/pingcap/tidb/ddl.(*ddl).doDDLJob
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:621
        	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:2085
        	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1994
        	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:338
        	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:149
        	            	github.com/pingcap/tidb/executor.Next
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
        	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:584
        	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:465
        	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:414
        	            	github.com/pingcap/tidb/session.runStmt
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1683
        	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1577
        	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:149
        	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:75
        	            	github.com/pingcap/tidb/executor_test.SubTestPessimisticSelectForUpdate.func1
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:290
        	            	testing.tRunner
        	            		/Users/karuppiahn/.go/src/testing/testing.go:1193
        	            	runtime.goexit
        	            		/Users/karuppiahn/.go/src/runtime/asm_amd64.s:1371
        	Test:       	TestSuiteP1/Tests/TestPessimisticSelectForUpdate
        	Messages:   	sql:create table t(id int primary key, a int), [], error stack [schema:1050]Table 't' already exists
        	            	github.com/pingcap/errors.AddStack
        	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
        	            	github.com/pingcap/errors.Trace
        	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
        	            	github.com/pingcap/tidb/ddl.(*ddl).doDDLJob
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:621
        	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:2085
        	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1994
        	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:338
        	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:149
        	            	github.com/pingcap/tidb/executor.Next
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
        	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:584
        	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:465
        	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:414
        	            	github.com/pingcap/tidb/session.runStmt
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1683
        	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1577
        	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:149
        	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:75
        	            	github.com/pingcap/tidb/executor_test.SubTestPessimisticSelectForUpdate.func1
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:290
        	            	testing.tRunner
        	            		/Users/karuppiahn/.go/src/testing/testing.go:1193
        	            	runtime.goexit
```

```bash
=== CONT  TestSuiteP1/Tests/TestOrderBy
    testkit.go:77: 
        	Error Trace:	testkit.go:77
        	            				executor_test.go:1204
        	Error:      	Received unexpected error:
        	            	[planner:1046]No database selected
        	            	github.com/pingcap/errors.AddStack
        	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
        	            	github.com/pingcap/errors.Trace
        	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
        	            	github.com/pingcap/tidb/planner/core.(*preprocessor).handleTableName
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/preprocess.go:1372
        	            	github.com/pingcap/tidb/planner/core.(*preprocessor).Leave
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/preprocess.go:480
        	            	github.com/pingcap/tidb/parser/ast.(*TableName).Accept
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/parser/ast/dml.go:439
        	            	github.com/pingcap/tidb/parser/ast.(*DropTableStmt).Accept
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/parser/ast/ddl.go:1182
        	            	github.com/pingcap/tidb/planner/core.Preprocess
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/preprocess.go:117
        	            	github.com/pingcap/tidb/executor.(*Compiler).Compile
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/compiler.go:60
        	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1555
        	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:149
        	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:75
        	            	github.com/pingcap/tidb/executor_test.SubTestOrderBy.func1
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:1204
        	            	testing.tRunner
        	            		/Users/karuppiahn/.go/src/testing/testing.go:1193
        	            	runtime.goexit
        	            		/Users/karuppiahn/.go/src/runtime/asm_amd64.s:1371
        	Test:       	TestSuiteP1/Tests/TestOrderBy
        	Messages:   	sql:drop table if exists t, [], error stack [planner:1046]No database selected
        	            	github.com/pingcap/errors.AddStack
        	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
        	            	github.com/pingcap/errors.Trace
        	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
        	            	github.com/pingcap/tidb/planner/core.(*preprocessor).handleTableName
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/preprocess.go:1372
        	            	github.com/pingcap/tidb/planner/core.(*preprocessor).Leave
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/preprocess.go:480
        	            	github.com/pingcap/tidb/parser/ast.(*TableName).Accept
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/parser/ast/dml.go:439
        	            	github.com/pingcap/tidb/parser/ast.(*DropTableStmt).Accept
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/parser/ast/ddl.go:1182
        	            	github.com/pingcap/tidb/planner/core.Preprocess
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/preprocess.go:117
        	            	github.com/pingcap/tidb/executor.(*Compiler).Compile
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/compiler.go:60
        	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1555
        	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:149
        	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:75
        	            	github.com/pingcap/tidb/executor_test.SubTestOrderBy.func1
        	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor_test.go:1204
        	            	testing.tRunner
        	            		/Users/karuppiahn/.go/src/testing/testing.go:1193
        	            	runtime.goexit
        	            		/Users/karuppiahn/.go/src/runtime/asm_amd64.s:1371
```
