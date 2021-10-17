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

- TestPessimisticSelectForUpdate
- TestBind
- TestChangePumpAndDrainer
- TestLoadStats
- TestPlanRecreator
- TestShow
- TestAdmin
- TestAdminShowDDLJobs
- TestAdminChecksumOfPartitionedTable
- TestSelectWithoutFrom
- TestSelectBackslashN
- TestSelectNull
- TestSelectStringLiteral
- TestSelectLimit
- TestSelectOrderBy
- TestOrderBy
- TestSelectErrorRow
- TestIssue2612
- TestIssue345
- TestIssue5055
- TestSetOperation
- TestSetOperationOnDiffColType
- TestIndexScanWithYearCol
- TestUnion
- TestUnionLimit
- TestNeighbouringProj
- TestIn
- TestTablePKisHandleScan
- TestIndexScan
- TestIndexReverseOrder
- TestTableReverseOrder
- TestDefaultNull
- TestUnsignedPKColumn
- TestJSON
- TestMultiUpdate
- TestGeneratedColumnWrite
- TestGeneratedColumnRead
- TestGeneratedColumnPointGet
- TestToPBExpr
- TestDatumXAPI
- TestSQLMode
- TestTableDual
- TestTableScan
- TestAdapterStatement
- TestIsPointGet
- TestClusteredIndexIsPointGet
- TestPointGetRepeatableRead
- TestBatchPointGetRepeatableRead
- TestSplitRegionTimeout
- TestRow
- TestColumnName
- TestSelectVar
- TestHistoryRead
- TestLowResolutionTSORead
- TestStaleReadFutureTime
- TestScanControlSelection
- TestSimpleDAG
- TestTimestampTimeZone
- TestTimestampDefaultValueTimeZone
- TestTiDBCurrentTS
- TestTiDBLastTxnInfo
- TestTiDBLastTxnInfoCommitMode
- TestTiDBLastQueryInfo
- TestSelectForUpdate
- TestEmptyEnum
- TestIssue4024
- TestAddIndexPriority
- TestAlterTableComment
- TestTimezonePushDown
- TestNotFillCacheFlag
- TestSyncLog
- TestHandleTransfer
- TestBit
- TestEnum
- TestSet
- TestSubqueryInValues
- TestEnhancedRangeAccess
- TestMaxInt64Handle
- TestTableScanWithPointRanges
- TestUnsignedPk
- TestSignedCommonHandle
- TestIssue5666
- TestIssue5341
- TestContainDotColumn
- TestCheckIndex
- TestCheckTable
- TestCheckTableClusterIndex
- TestCoprocessorStreamingFlag
- TestIncorrectLimitArg
- TestLimit
- TestCoprocessorStreamingWarning
- TestYearTypeDeleteIndex
- TestForSelectScopeInUnion
- TestUnsignedDecimalOverflow
- TestIndexJoinTableDualPanic
- TestSortLeftJoinWithNullColumnInRightChildPanic
- TestUnionAutoSignedCast
- TestUpdateClustered
- TestUpdateJoin
- TestMaxOneRow
- TestCurrentTimestampValueSelection
- TestRowID
- TestDoSubquery
- TestSubqueryTableAlias
- TestTSOFail
- TestSelectHashPartitionTable
- TestSelectPartition
- TestDeletePartition
- TestSelectView
- TestStrToDateBuiltin
- TestAddDateBuiltinWithWarnings
- TestIssue27232
- TestStrToDateBuiltinWithWarnings
- TestReadPartitionedTable
- TestSplitRegion
- TestSplitRegionEdgeCase
- TestClusterIndexSplitTableIntegration
- TestClusterIndexShowTableRegion
- TestClusterIndexOuterJoinElimination
- TestShowTableRegion
- TestIssue10435
- TestUnsignedFeedback
- TestCharsetFeature
- TestIssue23567
- TestSummaryFailedUpdate
- TestOOMPanicAction
- TestRecoverTable
- TestFlashbackTable
- TestRecoverTempTable
- TestPointGetPreparedPlan
- TestPointGetPreparedPlanWithCommitMode
- TestPointUpdatePreparedPlan
- TestPointUpdatePreparedPlanWithCommitMode
- TestPartitionHashCode
- TestAlterDefaultValue
- TestPrepareLoadData
- TestSlowQuery
- TestIssue20236
- TestSQLDigestTextRetriever
- TestFunctionDecodeSQLDigests
- TestFunctionDecodeSQLDigestsPrivilege
- TestIssue15718
- TestIssue15767
- TestIssue16025
- TestIssue16854
- TestIssue16921
- TestIssue19100
- TestInsertValuesWithSubQuery
- TestDIVZeroInPartitionExpr
- TestInsertIntoGivenPartitionSet
- TestUpdateGivenPartitionSet
- TestApplyCache
- TestGenerateColumnReplace
- TestSlowQueryWithoutSlowLog
- TestSlowQuerySensitiveQuery
- TestSlowQueryPrepared
- TestLogSlowLogIndex
- TestSlowQuery
- TestKillTableReader
- TestPrevStmtDesensitization
- TestIssue19372
- TestCollectCopRuntimeStats
- TestIndexLookupRuntimeStats
- TestHashAggRuntimeStats
- TestIndexMergeRuntimeStats
- TestCollectDMLRuntimeStats
- TestIssue13758
- TestIntegrationCopCache
- TestCoprocessorOOMTicase
- TestIssue20237
- TestIssue19148
- TestIssue19667
- TestIssue20975UpdateNoChange
- TestIssue20975SelectForUpdate
- TestIssue20975SelectForUpdatePointGet
- TestIssue20975SelectForUpdateBatchPointGet
- TestIssue20975UpdateNoChangeWithPartitionTable
- TestIssue20975SelectForUpdateWithPartitionTable
- TestIssue20975SelectForUpdatePointGetWithPartitionTable
- TestIssue20975SelectForUpdateBatchPointGetWithPartitionTable
- TestIssue20305
- TestIssue22817
- TestIssue13953
- TestZeroDateTimeCompatibility
- TestInvalidDateValueInCreateTable
- TestOOMActionPriority
- TestIssue21441
- Test17780
- TestIssue9918
- Test13004
- Test12178
- Test11883
- Test15492
- TestTrackAggMemoryUsage
- Test12201
- TestIssue21451
- TestIssue15563
- TestIssue22231
- TestIssue22201
- TestIssue22941
- TestTxnWriteThroughputSLI
- TestIssue23993
- TestProjectionBitType
- TestIssue23609
- TestIssue24091
- TestIssue24210
- TestDeadlocksTable
- TestExprBlackListForEnum
- TestResourceGroupTag
- TestIssue24933
- TestInvalidReadTemporaryTable
- TestEmptyTableSampleTemporaryTable
- TestIssue25506
- TestIssue26348
- TestIssue26532
- TestIssue25447
- TestIssue23602
- TestCTEWithIndexLookupJoinDeadLock

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

`testSuiteP1` contains `` which has three methods which we need to checkout and migrate

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

`executor: migrate TestPessimisticSelectForUpdate to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestPessimisticSelectForUpdate$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestBind to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestBind$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestChangePumpAndDrainer to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestChangePumpAndDrainer$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestLoadStats to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestLoadStats$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestPlanRecreator to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestPlanRecreator$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestShow to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestShow$ github.com/pingcap/tidb/executor; make failpoint-disable; }
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
{ make failpoint-enable; go test -v -run ^TestSelectWithoutFrom$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectBackslashN to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectBackslashN$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectNull to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectNull$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectStringLiteral to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectStringLiteral$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectLimit to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectLimit$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectOrderBy to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectOrderBy$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestOrderBy to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestOrderBy$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestSelectErrorRow to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestSelectErrorRow$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue2612 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue2612$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue345 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue345$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIssue5055 to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIssue5055$ github.com/pingcap/tidb/executor; make failpoint-disable; }
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
{ make failpoint-enable; go test -v -run ^TestNeighbouringProj$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIn to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIn$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTablePKisHandleScan to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTablePKisHandleScan$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIndexScan to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIndexScan$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestIndexReverseOrder to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestIndexReverseOrder$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestTableReverseOrder to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestTableReverseOrder$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestDefaultNull to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestDefaultNull$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestUnsignedPKColumn to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestUnsignedPKColumn$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestJSON to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestJSON$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestMultiUpdate to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestMultiUpdate$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestGeneratedColumnWrite to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestGeneratedColumnWrite$ github.com/pingcap/tidb/executor; make failpoint-disable; }
```

---

`executor: migrate TestGeneratedColumnRead to testify (#28577)`

```bash
{ make failpoint-enable; go test -v -run ^TestGeneratedColumnRead$ github.com/pingcap/tidb/executor; make failpoint-disable; }
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
{ make failpoint-enable; go test -v -run ^TestDeletePartition$ github.com/pingcap/tidb/executor; make failpoint-disable; }
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
{ make failpoint-enable; go test -v -run ^TestPrepareLoadData$ github.com/pingcap/tidb/executor; make failpoint-disable; }
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
{ make failpoint-enable; go test -v -run ^TestIssue22941$ github.com/pingcap/tidb/executor; make failpoint-disable; }
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
