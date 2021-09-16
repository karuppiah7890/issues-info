https://github.com/pingcap/tidb/issues/28010

TODO
- Ensure `"github.com/pingcap/check"` import is not present [DONE]
- Migrate all tests to golang tests using Testify [DONE]
- Ensure `"github.com/pingcap/tidb/util/testleak"` import is not present [DONE]
- Parallelize all the tests using `t.Parallel()` [DONE]

---

Low Level TODO - migrate the following tests
- TestTimeEncoding [DONE]
- TestDateTime [DONE]
- TestTimestamp [DONE]
- TestDate [DONE]
- TestTime [DONE]
- TestDurationAdd [DONE]
- TestDurationSub [DONE]
- TestTimeFsp [DONE]
- TestYear [DONE]
- TestCodec [DONE]
- TestParseTimeFromNum [DONE]
- TestToNumber [DONE]
- TestParseTimeFromFloatString [DONE]
- TestParseFrac [DONE]
- TestRoundFrac [DONE]
- TestConvert [DONE]
- TestCompare [DONE]
- TestDurationClock [DONE]
- TestParseDateFormat [DONE]
- TestTimestampDiff [DONE]
- TestDateFSP [DONE]
- TestConvertTimeZone [DONE]
- TestTimeAdd [DONE]
- TestTruncateOverflowMySQLTime [DONE]
- TestCheckTimestamp [DONE]
- TestExtractDurationValue [DONE]
- TestCurrentTime [DONE]
- TestInvalidZero [DONE]
- TestGetFsp [DONE]
- TestExtractDatetimeNum [DONE]
- TestExtractDurationNum [DONE]
- TestParseDurationValue [DONE]
- TestIsClockUnit [DONE]
- TestIsDateFormat [DONE]
- TestParseTimeFromInt64 [DONE]
- TestGetFormatType [DONE]
- TestgetFracIndex [DONE]
- TestTimeOverflow [DONE]
- TestTruncateFrac [DONE]
- TestTimeSub [DONE]
- TestCheckMonthDay [DONE]
- TestFormatIntWidthN [DONE]
- TestFromGoTime [DONE]
- TestGetTimezone [DONE]
- TestParseWithTimezone [DONE]

---

Migrating TestTimeEncoding now

``bash
{ make failpoint-enable; go test -run ^TestTimeEncoding$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTimeEncoding to testify (#28010)`

---

Migrating TestDateTime now

```bash
{ make failpoint-enable; go test -run ^TestDateTime$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestDateTime to testify (#28010)`

---

```bash
{ make failpoint-enable; go test -run ^TestTimestamp$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTimestamp to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestDate$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestDate to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestTime$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTime to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestDurationAdd$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestDurationAdd to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestDurationSub$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestDurationSub to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestTimeFsp$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTimeFsp to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestYear$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestYear to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestCodec$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestCodec to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestParseTimeFromNum$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestParseTimeFromNum to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestToNumber$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestToNumber to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestParseTimeFromFloatString$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestParseTimeFromFloatString to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestParseFrac$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestParseFrac to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestRoundFrac$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestRoundFrac to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestConvert$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvert to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestCompare$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestCompare to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestDurationClock$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestDurationClock to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestParseDateFormat$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestParseDateFormat to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestTimestampDiff$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTimestampDiff to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestDateFSP$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestDateFSP to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestConvertTimeZone$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvertTimeZone to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestTimeAdd$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTimeAdd to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestTruncateOverflowMySQLTime$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTruncateOverflowMySQLTime to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestCheckTimestamp$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestCheckTimestamp to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestExtractDurationValue$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestExtractDurationValue to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestCurrentTime$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestCurrentTime to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestInvalidZero$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestInvalidZero to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestGetFsp$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestGetFsp to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestExtractDatetimeNum$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestExtractDatetimeNum to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestExtractDurationNum$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestExtractDurationNum to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestParseDurationValue$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestParseDurationValue to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestIsClockUnit$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestIsClockUnit to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestIsDateFormat$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestIsDateFormat to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestParseTimeFromInt64$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestParseTimeFromInt64 to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestGetFormatType$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestGetFormatType to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestgetFracIndex$ github.com/pingcap/tidb/types; make failpoint-disable; }

{ make failpoint-enable; go test -run ^TestGetFracIndex$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestgetFracIndex to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestTimeOverflow$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTimeOverflow to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestTruncateFrac$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTruncateFrac to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestTimeSub$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestTimeSub to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestCheckMonthDay$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestCheckMonthDay to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestFormatIntWidthN$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestFormatIntWidthN to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestFromGoTime$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestFromGoTime to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestGetTimezone$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestGetTimezone to testify (#28010)`

```bash
{ make failpoint-enable; go test -run ^TestParseWithTimezone$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestParseWithTimezone to testify (#28010)`

---

```bash
{ make failpoint-enable; go test -run github.com/pingcap/tidb/types; make failpoint-disable; }
```

```bash
tidb $ { make failpoint-enable; go test -v github.com/pingcap/tidb/types; make failpoint-disable; }

=== RUN   TestBinaryLiteral
=== RUN   TestBinaryLiteral/TestTrimLeadingZeroBytes
=== PAUSE TestBinaryLiteral/TestTrimLeadingZeroBytes
=== RUN   TestBinaryLiteral/TestParseBitStr
=== PAUSE TestBinaryLiteral/TestParseBitStr
=== RUN   TestBinaryLiteral/TestParseBitStr#01
=== PAUSE TestBinaryLiteral/TestParseBitStr#01
=== RUN   TestBinaryLiteral/TestParseHexStr
=== PAUSE TestBinaryLiteral/TestParseHexStr
=== RUN   TestBinaryLiteral/TestParseHexStr#01
=== PAUSE TestBinaryLiteral/TestParseHexStr#01
=== RUN   TestBinaryLiteral/TestString
=== PAUSE TestBinaryLiteral/TestString
=== RUN   TestBinaryLiteral/TestToBitLiteralString
=== PAUSE TestBinaryLiteral/TestToBitLiteralString
=== RUN   TestBinaryLiteral/TestToInt
=== PAUSE TestBinaryLiteral/TestToInt
=== RUN   TestBinaryLiteral/TestNewBinaryLiteralFromUint
=== PAUSE TestBinaryLiteral/TestNewBinaryLiteralFromUint
=== RUN   TestBinaryLiteral/TestCompare
=== PAUSE TestBinaryLiteral/TestCompare
=== RUN   TestBinaryLiteral/TestToString
=== PAUSE TestBinaryLiteral/TestToString
=== CONT  TestBinaryLiteral/TestTrimLeadingZeroBytes
=== CONT  TestBinaryLiteral/TestToBitLiteralString
=== CONT  TestBinaryLiteral/TestParseHexStr
=== CONT  TestBinaryLiteral/TestCompare
=== CONT  TestBinaryLiteral/TestParseBitStr#01
=== CONT  TestBinaryLiteral/TestString
=== CONT  TestBinaryLiteral/TestParseBitStr
=== CONT  TestBinaryLiteral/TestParseHexStr#01
=== CONT  TestBinaryLiteral/TestToString
=== CONT  TestBinaryLiteral/TestNewBinaryLiteralFromUint
=== CONT  TestBinaryLiteral/TestToInt
--- PASS: TestBinaryLiteral (0.00s)
    --- PASS: TestBinaryLiteral/TestCompare (0.00s)
    --- PASS: TestBinaryLiteral/TestParseBitStr#01 (0.00s)
    --- PASS: TestBinaryLiteral/TestToBitLiteralString (0.00s)
    --- PASS: TestBinaryLiteral/TestTrimLeadingZeroBytes (0.00s)
    --- PASS: TestBinaryLiteral/TestString (0.00s)
    --- PASS: TestBinaryLiteral/TestParseHexStr#01 (0.00s)
    --- PASS: TestBinaryLiteral/TestParseHexStr (0.00s)
    --- PASS: TestBinaryLiteral/TestToString (0.00s)
    --- PASS: TestBinaryLiteral/TestNewBinaryLiteralFromUint (0.00s)
    --- PASS: TestBinaryLiteral/TestToInt (0.00s)
    --- PASS: TestBinaryLiteral/TestParseBitStr (0.00s)
=== RUN   TestCompare
=== PAUSE TestCompare
=== RUN   TestCompareDatum
=== PAUSE TestCompareDatum
=== RUN   TestVecCompareIntAndUint
=== PAUSE TestVecCompareIntAndUint
=== RUN   TestEnum
=== RUN   TestEnum/ParseEnum
=== RUN   TestEnum/ParseEnum_ci
=== RUN   TestEnum/ParseEnumValue
--- PASS: TestEnum (0.00s)
    --- PASS: TestEnum/ParseEnum (0.00s)
    --- PASS: TestEnum/ParseEnum_ci (0.00s)
    --- PASS: TestEnum/ParseEnumValue (0.00s)
=== RUN   TestError
=== PAUSE TestError
=== RUN   TestT
[2021/09/16 20:40:21.261 +05:30] [WARN] [time.go:1479] ["use gotime.local because sc.timezone is nil"]
[2021/09/16 20:40:21.266 +05:30] [ERROR] [terror.go:291] ["encountered error"] [error="[types:8029]Bad Number"] [errorVerbose="[types:8029]Bad Number\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/tidb/types.NewMaxOrMinDec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/mydecimal.go:2389\ngithub.com/pingcap/tidb/types.(*testMyDecimalSuite).TestMaxOrMin\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/mydecimal_test.go:975\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [stack="github.com/pingcap/parser/terror.Log\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/terror/terror.go:291\ngithub.com/pingcap/tidb/types.NewMaxOrMinDec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/mydecimal.go:2389\ngithub.com/pingcap/tidb/types.(*testMyDecimalSuite).TestMaxOrMin\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/mydecimal_test.go:975\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739"] [stack="github.com/pingcap/parser/terror.Log\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/terror/terror.go:291\ngithub.com/pingcap/tidb/types.NewMaxOrMinDec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/mydecimal.go:2389\ngithub.com/pingcap/tidb/types.(*testMyDecimalSuite).TestMaxOrMin\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/mydecimal_test.go:975\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739"]
[2021/09/16 20:40:21.372 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=5c53dcb6-18a4-480b-a6f7-ef389aa56244] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/09/16 20:40:21.375 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=f7d6bd2b-9f6e-43a1-a72f-de3f95018f79] [runWorker=true]
[2021/09/16 20:40:21.375 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/09/16 20:40:21.375 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/09/16 20:40:21.375 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 1, tp general"]
[2021/09/16 20:40:21.375 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 2, tp add index"]
[2021/09/16 20:40:21.376 +05:30] [INFO] [domain.go:158] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=0] ["start time"=743.78µs]
[2021/09/16 20:40:21.376 +05:30] [INFO] [domain.go:373] ["full load and reset schema validator"]
[2021/09/16 20:40:21.376 +05:30] [INFO] [tidb.go:246] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/09/16 20:40:21.376 +05:30] [WARN] [session.go:1579] ["run statement failed"] [schemaVersion=0] [error="[schema:1049]Unknown database 'mysql'"] [errorVerbose="[schema:1049]Unknown database 'mysql'\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.(*Error).GenWithStackByArgs\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/normalize.go:159\ngithub.com/pingcap/tidb/executor.(*SimpleExec).executeUse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:556\ngithub.com/pingcap/tidb/executor.(*SimpleExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:126\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:580\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:461\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:410\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1682\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1576\ngithub.com/pingcap/tidb/session.(*session).ExecuteInternal\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1286\ngithub.com/pingcap/tidb/session.checkBootstrapped\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:604\ngithub.com/pingcap/tidb/session.bootstrap\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:358\ngithub.com/pingcap/tidb/session.runInBootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2576\ngithub.com/pingcap/tidb/session.BootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2429\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).SetUpSuite\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:61\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).runFixture.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:799\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 0,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/09/16 20:40:21.377 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=0] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS test"] [user=]
[2021/09/16 20:40:21.378 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.377 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.378 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.377 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS test"]
[2021/09/16 20:40:21.378 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.377 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.379 +05:30] [INFO] [domain.go:158] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=1] ["start time"=904.595µs]
[2021/09/16 20:40:21.379 +05:30] [INFO] [domain.go:373] ["full load and reset schema validator"]
[2021/09/16 20:40:21.380 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:synced, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.377 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.380 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=2]
[2021/09/16 20:40:21.380 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.381 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=1] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS `mysql`"] [user=]
[2021/09/16 20:40:21.381 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.381 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.381 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.381 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS `mysql`"]
[2021/09/16 20:40:21.381 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.381 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.382 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=1] [neededSchemaVersion=2] ["start time"=75.877µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.382 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:synced, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.381 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.382 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=4]
[2021/09/16 20:40:21.382 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.383 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=2] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"] [user=]
[2021/09/16 20:40:21.384 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.383 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.384 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.383 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"]
[2021/09/16 20:40:21.384 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.383 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.386 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=2] [neededSchemaVersion=3] ["start time"=360.175µs] [phyTblIDs="[5]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.387 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.383 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.388 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=6]
[2021/09/16 20:40:21.388 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.388 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=3] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"] [user=]
[2021/09/16 20:40:21.389 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.389 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.389 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.389 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"]
[2021/09/16 20:40:21.389 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.389 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.390 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=3] [neededSchemaVersion=4] ["start time"=152.32µs] [phyTblIDs="[7]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.390 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.389 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.391 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=8]
[2021/09/16 20:40:21.391 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.391 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=4] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"] [user=]
[2021/09/16 20:40:21.392 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.391 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.392 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.391 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"]
[2021/09/16 20:40:21.392 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.391 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.393 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=4] [neededSchemaVersion=5] ["start time"=281.167µs] [phyTblIDs="[9]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.394 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.391 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.395 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=10]
[2021/09/16 20:40:21.395 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.395 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=5] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"] [user=]
[2021/09/16 20:40:21.396 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.395 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.396 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.395 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"]
[2021/09/16 20:40:21.396 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.395 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.397 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=5] [neededSchemaVersion=6] ["start time"=207.19µs] [phyTblIDs="[11]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.397 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.395 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.398 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=12]
[2021/09/16 20:40:21.398 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.398 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=6] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"] [user=]
[2021/09/16 20:40:21.398 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.398 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"]
[2021/09/16 20:40:21.399 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.400 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=6] [neededSchemaVersion=7] ["start time"=168.253µs] [phyTblIDs="[13]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.400 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.400 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=14]
[2021/09/16 20:40:21.400 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.401 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=7] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"] [user=]
[2021/09/16 20:40:21.401 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.401 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.401 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.401 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"]
[2021/09/16 20:40:21.402 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.401 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.402 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=7] [neededSchemaVersion=8] ["start time"=119.314µs] [phyTblIDs="[15]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.402 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.401 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.403 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=16]
[2021/09/16 20:40:21.403 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.403 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=8] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"] [user=]
[2021/09/16 20:40:21.404 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.404 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"]
[2021/09/16 20:40:21.404 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.404 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=8] [neededSchemaVersion=9] ["start time"=127.706µs] [phyTblIDs="[17]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.405 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.405 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=18]
[2021/09/16 20:40:21.405 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.406 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=9] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"] [user=]
[2021/09/16 20:40:21.406 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.406 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.406 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.406 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"]
[2021/09/16 20:40:21.407 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.406 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.407 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=9] [neededSchemaVersion=10] ["start time"=159.49µs] [phyTblIDs="[19]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.408 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.406 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.408 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=20]
[2021/09/16 20:40:21.408 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.408 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=10] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"] [user=]
[2021/09/16 20:40:21.409 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.409 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.409 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.409 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"]
[2021/09/16 20:40:21.409 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.409 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.410 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=10] [neededSchemaVersion=11] ["start time"=161.667µs] [phyTblIDs="[21]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.410 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.409 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.411 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=22]
[2021/09/16 20:40:21.411 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.411 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=11] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/09/16 20:40:21.411 +05:30] [INFO] [ddl_api.go:567] ["Automatically convert BLOB(6291456) to MEDIUMBLOB"]
[2021/09/16 20:40:21.412 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.411 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.412 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.411 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/09/16 20:40:21.412 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.411 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.414 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=11] [neededSchemaVersion=12] ["start time"=348.387µs] [phyTblIDs="[23]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.415 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.411 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.415 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=24]
[2021/09/16 20:40:21.415 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.416 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=12] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"] [user=]
[2021/09/16 20:40:21.417 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.416 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.417 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.416 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"]
[2021/09/16 20:40:21.417 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.416 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.418 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=12] [neededSchemaVersion=13] ["start time"=378.401µs] [phyTblIDs="[25]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.419 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.416 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.420 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=26]
[2021/09/16 20:40:21.420 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.420 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=13] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"] [user=]
[2021/09/16 20:40:21.421 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.42 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.421 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.42 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"]
[2021/09/16 20:40:21.421 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.42 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.422 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=13] [neededSchemaVersion=14] ["start time"=261.803µs] [phyTblIDs="[27]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.423 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.42 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.424 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=28]
[2021/09/16 20:40:21.424 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.424 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=14] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"] [user=]
[2021/09/16 20:40:21.425 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.425 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"]
[2021/09/16 20:40:21.425 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.426 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=14] [neededSchemaVersion=15] ["start time"=293.878µs] [phyTblIDs="[29]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.427 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.427 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=30]
[2021/09/16 20:40:21.427 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.428 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=15] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/09/16 20:40:21.428 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.429 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"]
[2021/09/16 20:40:21.429 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.430 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=15] [neededSchemaVersion=16] ["start time"=261.034µs] [phyTblIDs="[31]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.430 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.431 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=32]
[2021/09/16 20:40:21.431 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.431 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=16] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"] [user=]
[2021/09/16 20:40:21.432 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.432 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.432 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.432 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"]
[2021/09/16 20:40:21.433 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.432 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.434 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=16] [neededSchemaVersion=17] ["start time"=325.407µs] [phyTblIDs="[33]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.434 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.432 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.435 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=34]
[2021/09/16 20:40:21.435 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.435 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=17] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"] [user=]
[2021/09/16 20:40:21.436 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.436 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.436 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.436 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"]
[2021/09/16 20:40:21.437 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.436 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.438 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=17] [neededSchemaVersion=18] ["start time"=265.479µs] [phyTblIDs="[35]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.438 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.436 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.439 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=36]
[2021/09/16 20:40:21.439 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.439 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=18] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"] [user=]
[2021/09/16 20:40:21.440 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.44 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.440 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.44 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"]
[2021/09/16 20:40:21.441 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.44 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.442 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=18] [neededSchemaVersion=19] ["start time"=481.835µs] [phyTblIDs="[37]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.443 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.44 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.443 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=38]
[2021/09/16 20:40:21.443 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.445 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=19] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/09/16 20:40:21.446 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.446 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.446 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.446 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/09/16 20:40:21.446 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.446 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.448 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=19] [neededSchemaVersion=20] ["start time"=349.245µs] [phyTblIDs="[39]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.448 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.446 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.449 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=40]
[2021/09/16 20:40:21.449 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.449 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=20] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"] [user=]
[2021/09/16 20:40:21.450 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.45 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.450 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.45 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"]
[2021/09/16 20:40:21.451 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.45 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.452 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=20] [neededSchemaVersion=21] ["start time"=210.709µs] [phyTblIDs="[41]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.452 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.45 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.453 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=42]
[2021/09/16 20:40:21.453 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.453 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=21] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"] [user=]
[2021/09/16 20:40:21.454 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.454 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.454 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.454 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"]
[2021/09/16 20:40:21.454 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.454 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.455 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=21] [neededSchemaVersion=22] ["start time"=245.936µs] [phyTblIDs="[43]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.456 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.454 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.456 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=44]
[2021/09/16 20:40:21.456 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.457 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=22] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"] [user=]
[2021/09/16 20:40:21.457 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.457 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.457 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.457 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"]
[2021/09/16 20:40:21.458 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.457 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.459 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=22] [neededSchemaVersion=23] ["start time"=297.105µs] [phyTblIDs="[45]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.460 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.457 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.460 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=46]
[2021/09/16 20:40:21.460 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.461 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=23] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"] [user=]
[2021/09/16 20:40:21.462 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.461 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.462 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.461 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"]
[2021/09/16 20:40:21.462 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.461 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.463 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=23] [neededSchemaVersion=24] ["start time"=261.251µs] [phyTblIDs="[47]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.464 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.461 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.465 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=48]
[2021/09/16 20:40:21.465 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.465 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=24] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/09/16 20:40:21.466 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.466 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/09/16 20:40:21.466 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.466 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.467 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.466 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.468 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=24] [neededSchemaVersion=25] ["start time"=238.787µs] [phyTblIDs="[49]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.469 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.466 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.469 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=50]
[2021/09/16 20:40:21.470 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.470 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=25] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"] [user=]
[2021/09/16 20:40:21.471 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.47 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.471 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.47 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"]
[2021/09/16 20:40:21.471 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.47 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.472 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=25] [neededSchemaVersion=26] ["start time"=304.351µs] [phyTblIDs="[51]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.473 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.47 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.473 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=52]
[2021/09/16 20:40:21.473 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.474 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=26] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"] [user=]
[2021/09/16 20:40:21.474 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.474 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.474 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.474 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"]
[2021/09/16 20:40:21.475 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.474 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.476 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=26] [neededSchemaVersion=27] ["start time"=213.765µs] [phyTblIDs="[53]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.477 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.474 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.477 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=54]
[2021/09/16 20:40:21.477 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.498 +05:30] [INFO] [bootstrap.go:375] ["bootstrap successful"] ["take time"=122.604597ms]
[2021/09/16 20:40:21.499 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 1, tp general"] ["take time"=460ns]
[2021/09/16 20:40:21.499 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 2, tp add index"] ["take time"=203ns]
[2021/09/16 20:40:21.499 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/09/16 20:40:21.499 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/09/16 20:40:21.499 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=f7d6bd2b-9f6e-43a1-a72f-de3f95018f79] ["take time"=115.139µs]
[2021/09/16 20:40:21.499 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=f7d6bd2b-9f6e-43a1-a72f-de3f95018f79]
[2021/09/16 20:40:21.499 +05:30] [INFO] [domain.go:423] ["topNSlowQueryLoop exited."]
[2021/09/16 20:40:21.499 +05:30] [INFO] [domain.go:480] ["topologySyncerKeeper exited."]
[2021/09/16 20:40:21.499 +05:30] [INFO] [domain.go:452] ["infoSyncerKeeper exited."]
[2021/09/16 20:40:21.499 +05:30] [INFO] [domain.go:636] ["domain closed"] ["take time"=207.566µs]
[2021/09/16 20:40:21.499 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=5c53dcb6-18a4-480b-a6f7-ef389aa56244] ["ddl lease"=0s] ["stats lease"=-1ns] ["index usage sync lease"=0s]
[2021/09/16 20:40:21.499 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=6e9819f6-a668-46c6-ad6c-284aceae10cd] [runWorker=true]
[2021/09/16 20:40:21.499 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/09/16 20:40:21.499 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 3, tp general"]
[2021/09/16 20:40:21.499 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/09/16 20:40:21.499 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 4, tp add index"]
[2021/09/16 20:40:21.504 +05:30] [INFO] [domain.go:158] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=27] ["start time"=5.114338ms]
[2021/09/16 20:40:21.505 +05:30] [INFO] [domain.go:373] ["full load and reset schema validator"]
[2021/09/16 20:40:21.510 +05:30] [WARN] [sysvar_cache.go:55] ["sysvar cache is empty, triggering rebuild"]
[2021/09/16 20:40:21.521 +05:30] [INFO] [telemetry.go:174] ["Telemetry configuration"] [endpoint=https://telemetry.pingcap.com/api/v1/tidb/report] [report_interval=6h0m0s] [enabled=true]
[2021/09/16 20:40:21.522 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=27] [cur_db=test] [sql="drop table if exists t1"] [user=]
[2021/09/16 20:40:21.522 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=27] [cur_db=test] [sql="create table t1 (a int);"] [user=]
[2021/09/16 20:40:21.523 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:55, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.523 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.523 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:55, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.523 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table t1 (a int);"]
[2021/09/16 20:40:21.523 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:55, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.523 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.524 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=27] [neededSchemaVersion=28] ["start time"=193.209µs] [phyTblIDs="[55]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.525 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:56, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:55, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.523 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.525 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=56]
[2021/09/16 20:40:21.525 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.526 +05:30] [WARN] [2pc.go:1601] ["schemaLeaseChecker is not set for this transaction"] [sessionID=1] [startTS=427767895562649606] [commitTS=427767895562911744]
[2021/09/16 20:40:21.529 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=28] [cur_db=test] [sql="CREATE TABLE COUNT (a bigint);"] [user=]
[2021/09/16 20:40:21.530 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.529 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.530 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.529 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE COUNT (a bigint);"]
[2021/09/16 20:40:21.530 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.529 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.531 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=28] [neededSchemaVersion=29] ["start time"=127.694µs] [phyTblIDs="[57]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.531 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.529 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.531 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=58]
[2021/09/16 20:40:21.531 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.532 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=29] [cur_db=test] [sql="DROP TABLE COUNT;"] [user=]
[2021/09/16 20:40:21.532 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:59, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.532 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.532 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:59, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.532 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE COUNT;"]
[2021/09/16 20:40:21.532 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:59, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.532 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.533 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=29] [neededSchemaVersion=30] ["start time"=106.396µs] [phyTblIDs="[57]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.533 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:59, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.532 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.534 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=30] [neededSchemaVersion=31] ["start time"=82.063µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.534 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:59, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.532 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.535 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=31] [neededSchemaVersion=32] ["start time"=74.01µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.535 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=59] [elementID=57]
[2021/09/16 20:40:21.536 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=59] [jobType="drop table"]
[2021/09/16 20:40:21.536 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:59, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.532 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.537 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=59]
[2021/09/16 20:40:21.537 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.537 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=32] [cur_db=test] [sql="CREATE TABLE `COUNT` (a bigint);"] [user=]
[2021/09/16 20:40:21.537 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:61, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:60, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.537 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.537 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:61, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:60, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.537 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE `COUNT` (a bigint);"]
[2021/09/16 20:40:21.537 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:61, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:60, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.537 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.538 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=32] [neededSchemaVersion=33] ["start time"=132.147µs] [phyTblIDs="[60]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.538 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=59] [elementID=57] [startKey=748000000000000039] [endKey=74800000000000003a]
[2021/09/16 20:40:21.538 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:61, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:60, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.537 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.539 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=61]
[2021/09/16 20:40:21.539 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.539 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=33] [cur_db=test] [sql="DROP TABLE COUNT;"] [user=]
[2021/09/16 20:40:21.539 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:62, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:60, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.539 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.539 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:62, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:60, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.539 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE COUNT;"]
[2021/09/16 20:40:21.539 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:62, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:60, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.539 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.540 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=33] [neededSchemaVersion=34] ["start time"=28.196µs] [phyTblIDs="[60]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.540 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:62, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:60, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.539 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.540 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=34] [neededSchemaVersion=35] ["start time"=38.917µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.540 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:62, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:60, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.539 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.541 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=35] [neededSchemaVersion=36] ["start time"=36.412µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.541 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=62] [elementID=60]
[2021/09/16 20:40:21.541 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=62] [jobType="drop table"]
[2021/09/16 20:40:21.541 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:62, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:60, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.539 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.542 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=62]
[2021/09/16 20:40:21.542 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.542 +05:30] [WARN] [session.go:1338] ["parse SQL failed"] [error="line 1 column 18 near \"COUNT(a bigint);\" "] [errorVerbose="line 1 column 18 near \"COUNT(a bigint);\" \ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/parser.(*Parser).Parse\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/yy_parser.go:163\ngithub.com/pingcap/tidb/session.(*session).ParseSQL\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1175\ngithub.com/pingcap/tidb/session.(*session).Parse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1328\ngithub.com/pingcap/tidb/util/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/util/testkit/testkit.go:190\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).TestIgnoreSpaceMode\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:371\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [SQL="CREATE TABLE COUNT(a bigint);"]
[2021/09/16 20:40:21.542 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=36] [cur_db=test] [sql="CREATE TABLE test.COUNT(a bigint);"] [user=]
[2021/09/16 20:40:21.544 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:64, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:63, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.543 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.544 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:64, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:63, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.543 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE test.COUNT(a bigint);"]
[2021/09/16 20:40:21.545 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:64, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:63, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.543 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.545 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=62] [elementID=60] [startKey=74800000000000003c] [endKey=74800000000000003d]
[2021/09/16 20:40:21.546 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=36] [neededSchemaVersion=37] ["start time"=166.03µs] [phyTblIDs="[63]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.546 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:64, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:63, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.543 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.546 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=64]
[2021/09/16 20:40:21.546 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.546 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=37] [cur_db=test] [sql="DROP TABLE COUNT;"] [user=]
[2021/09/16 20:40:21.547 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:65, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:63, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.547 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.547 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:65, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:63, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.547 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE COUNT;"]
[2021/09/16 20:40:21.547 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:65, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:63, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.547 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.548 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=37] [neededSchemaVersion=38] ["start time"=49.937µs] [phyTblIDs="[63]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.548 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:65, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:63, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.547 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.549 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=38] [neededSchemaVersion=39] ["start time"=55.312µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.549 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:65, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:63, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.547 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.549 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=39] [neededSchemaVersion=40] ["start time"=48.718µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.550 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=65] [elementID=63]
[2021/09/16 20:40:21.550 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=65] [jobType="drop table"]
[2021/09/16 20:40:21.551 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:65, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:63, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.547 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.551 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=65]
[2021/09/16 20:40:21.551 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.551 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=40] [cur_db=test] [sql="CREATE TABLE BIT_AND (a bigint);"] [user=]
[2021/09/16 20:40:21.552 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:67, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:66, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.552 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.552 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:67, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:66, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.552 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE BIT_AND (a bigint);"]
[2021/09/16 20:40:21.552 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:67, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:66, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.552 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.553 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=65] [elementID=63] [startKey=74800000000000003f] [endKey=748000000000000040]
[2021/09/16 20:40:21.553 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=40] [neededSchemaVersion=41] ["start time"=140.611µs] [phyTblIDs="[66]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.554 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:67, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:66, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.552 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.554 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=67]
[2021/09/16 20:40:21.554 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.554 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=41] [cur_db=test] [sql="DROP TABLE BIT_AND;"] [user=]
[2021/09/16 20:40:21.555 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:68, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:66, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.554 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.555 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:68, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:66, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.554 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE BIT_AND;"]
[2021/09/16 20:40:21.555 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:68, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:66, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.554 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.556 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=41] [neededSchemaVersion=42] ["start time"=35.951µs] [phyTblIDs="[66]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.556 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:68, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:66, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.554 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.556 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=42] [neededSchemaVersion=43] ["start time"=51.725µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.557 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:68, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:66, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.554 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.557 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=43] [neededSchemaVersion=44] ["start time"=51.41µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.558 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=68] [elementID=66]
[2021/09/16 20:40:21.558 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=68] [jobType="drop table"]
[2021/09/16 20:40:21.558 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:68, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:66, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.554 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.559 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=68]
[2021/09/16 20:40:21.559 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.559 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=44] [cur_db=test] [sql="CREATE TABLE `BIT_AND` (a bigint);"] [user=]
[2021/09/16 20:40:21.560 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:70, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:69, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.559 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.560 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:70, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:69, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.559 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE `BIT_AND` (a bigint);"]
[2021/09/16 20:40:21.560 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:70, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:69, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.559 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.561 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=68] [elementID=66] [startKey=748000000000000042] [endKey=748000000000000043]
[2021/09/16 20:40:21.561 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=44] [neededSchemaVersion=45] ["start time"=160.766µs] [phyTblIDs="[69]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.562 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:70, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:69, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.559 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.562 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=70]
[2021/09/16 20:40:21.562 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.563 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=45] [cur_db=test] [sql="DROP TABLE BIT_AND;"] [user=]
[2021/09/16 20:40:21.563 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:71, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:69, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.563 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.563 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:71, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:69, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.563 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE BIT_AND;"]
[2021/09/16 20:40:21.563 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:71, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:69, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.563 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.564 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=45] [neededSchemaVersion=46] ["start time"=62.023µs] [phyTblIDs="[69]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.564 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:71, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:69, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.563 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.565 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=46] [neededSchemaVersion=47] ["start time"=50.412µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.565 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:71, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:69, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.563 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.565 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=47] [neededSchemaVersion=48] ["start time"=63.195µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.566 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=71] [elementID=69]
[2021/09/16 20:40:21.566 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=71] [jobType="drop table"]
[2021/09/16 20:40:21.566 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:71, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:69, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.563 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.567 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=71]
[2021/09/16 20:40:21.567 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.567 +05:30] [WARN] [session.go:1338] ["parse SQL failed"] [error="line 1 column 20 near \"BIT_AND(a bigint);\" "] [errorVerbose="line 1 column 20 near \"BIT_AND(a bigint);\" \ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/parser.(*Parser).Parse\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/yy_parser.go:163\ngithub.com/pingcap/tidb/session.(*session).ParseSQL\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1175\ngithub.com/pingcap/tidb/session.(*session).Parse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1328\ngithub.com/pingcap/tidb/util/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/util/testkit/testkit.go:190\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).TestIgnoreSpaceMode\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:380\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [SQL="CREATE TABLE BIT_AND(a bigint);"]
[2021/09/16 20:40:21.567 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=48] [cur_db=test] [sql="CREATE TABLE test.BIT_AND(a bigint);"] [user=]
[2021/09/16 20:40:21.568 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:73, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:72, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.568 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.568 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:73, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:72, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.568 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE test.BIT_AND(a bigint);"]
[2021/09/16 20:40:21.568 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:73, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:72, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.568 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.569 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=71] [elementID=69] [startKey=748000000000000045] [endKey=748000000000000046]
[2021/09/16 20:40:21.569 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=48] [neededSchemaVersion=49] ["start time"=188.968µs] [phyTblIDs="[72]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.570 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:73, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:72, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.568 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.570 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=73]
[2021/09/16 20:40:21.570 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.570 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=49] [cur_db=test] [sql="DROP TABLE BIT_AND;"] [user=]
[2021/09/16 20:40:21.571 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:74, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:72, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.571 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.571 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:74, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:72, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.571 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE BIT_AND;"]
[2021/09/16 20:40:21.571 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:74, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:72, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.571 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.572 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=49] [neededSchemaVersion=50] ["start time"=61.441µs] [phyTblIDs="[72]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.572 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:74, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:72, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.571 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.573 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=50] [neededSchemaVersion=51] ["start time"=49.845µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.573 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:74, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:72, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.571 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.574 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=51] [neededSchemaVersion=52] ["start time"=89.257µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.574 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=74] [elementID=72]
[2021/09/16 20:40:21.574 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=74] [jobType="drop table"]
[2021/09/16 20:40:21.575 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:74, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:72, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.571 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.575 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=74]
[2021/09/16 20:40:21.575 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.576 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=52] [cur_db=test] [sql="CREATE TABLE NOW (a bigint);"] [user=]
[2021/09/16 20:40:21.577 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:76, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:75, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.576 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.577 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:76, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:75, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.576 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE NOW (a bigint);"]
[2021/09/16 20:40:21.577 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:76, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:75, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.576 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.577 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=74] [elementID=72] [startKey=748000000000000048] [endKey=748000000000000049]
[2021/09/16 20:40:21.578 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=52] [neededSchemaVersion=53] ["start time"=197.46µs] [phyTblIDs="[75]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.578 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:76, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:75, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.576 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.579 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=76]
[2021/09/16 20:40:21.579 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.579 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=53] [cur_db=test] [sql="DROP TABLE NOW;"] [user=]
[2021/09/16 20:40:21.579 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:77, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:75, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.579 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.580 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:77, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:75, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.579 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE NOW;"]
[2021/09/16 20:40:21.580 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:77, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:75, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.579 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.580 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=53] [neededSchemaVersion=54] ["start time"=31.313µs] [phyTblIDs="[75]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.580 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:77, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:75, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.579 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.581 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=54] [neededSchemaVersion=55] ["start time"=119.229µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.581 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:77, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:75, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.579 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.582 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=55] [neededSchemaVersion=56] ["start time"=50.704µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.582 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=77] [elementID=75]
[2021/09/16 20:40:21.583 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=77] [jobType="drop table"]
[2021/09/16 20:40:21.583 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:77, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:75, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.579 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.583 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=77]
[2021/09/16 20:40:21.583 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.584 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=56] [cur_db=test] [sql="CREATE TABLE `NOW` (a bigint);"] [user=]
[2021/09/16 20:40:21.584 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:79, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:78, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.584 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.584 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:79, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:78, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.584 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE `NOW` (a bigint);"]
[2021/09/16 20:40:21.585 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:79, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:78, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.584 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.585 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=77] [elementID=75] [startKey=74800000000000004b] [endKey=74800000000000004c]
[2021/09/16 20:40:21.585 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=56] [neededSchemaVersion=57] ["start time"=159.276µs] [phyTblIDs="[78]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.585 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:79, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:78, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.584 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.586 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=79]
[2021/09/16 20:40:21.586 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.586 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=57] [cur_db=test] [sql="DROP TABLE NOW;"] [user=]
[2021/09/16 20:40:21.586 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:80, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:78, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.586 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.586 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:80, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:78, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.586 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE NOW;"]
[2021/09/16 20:40:21.587 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:80, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:78, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.586 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.587 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=57] [neededSchemaVersion=58] ["start time"=71.921µs] [phyTblIDs="[78]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.587 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:80, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:78, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.586 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.588 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=58] [neededSchemaVersion=59] ["start time"=33.077µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.588 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:80, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:78, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.586 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.589 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=59] [neededSchemaVersion=60] ["start time"=60.215µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.589 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=80] [elementID=78]
[2021/09/16 20:40:21.589 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=80] [jobType="drop table"]
[2021/09/16 20:40:21.590 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:80, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:78, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.586 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.590 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=80]
[2021/09/16 20:40:21.590 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.590 +05:30] [WARN] [session.go:1338] ["parse SQL failed"] [error="line 1 column 16 near \"NOW(a bigint);\" "] [errorVerbose="line 1 column 16 near \"NOW(a bigint);\" \ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/parser.(*Parser).Parse\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/yy_parser.go:163\ngithub.com/pingcap/tidb/session.(*session).ParseSQL\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1175\ngithub.com/pingcap/tidb/session.(*session).Parse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1328\ngithub.com/pingcap/tidb/util/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/util/testkit/testkit.go:190\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).TestIgnoreSpaceMode\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:389\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [SQL="CREATE TABLE NOW(a bigint);"]
[2021/09/16 20:40:21.590 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=60] [cur_db=test] [sql="CREATE TABLE test.NOW(a bigint);"] [user=]
[2021/09/16 20:40:21.591 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:82, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:81, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.591 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.591 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:82, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:81, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.591 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE test.NOW(a bigint);"]
[2021/09/16 20:40:21.591 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:82, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:81, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.591 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.591 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=80] [elementID=78] [startKey=74800000000000004e] [endKey=74800000000000004f]
[2021/09/16 20:40:21.592 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=60] [neededSchemaVersion=61] ["start time"=116.481µs] [phyTblIDs="[81]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.592 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:82, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:81, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.591 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.592 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=82]
[2021/09/16 20:40:21.592 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.592 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=61] [cur_db=test] [sql="DROP TABLE NOW;"] [user=]
[2021/09/16 20:40:21.593 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:83, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:81, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.593 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.593 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:83, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:81, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.593 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE NOW;"]
[2021/09/16 20:40:21.593 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:83, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:81, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.593 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.593 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=61] [neededSchemaVersion=62] ["start time"=41.695µs] [phyTblIDs="[81]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.593 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:83, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:81, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.593 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.594 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=62] [neededSchemaVersion=63] ["start time"=32.249µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.594 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:83, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:81, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.593 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.595 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=63] [neededSchemaVersion=64] ["start time"=65.026µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.595 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=83] [elementID=81]
[2021/09/16 20:40:21.595 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=83] [jobType="drop table"]
[2021/09/16 20:40:21.596 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:83, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:81, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.593 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.596 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=83]
[2021/09/16 20:40:21.596 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.596 +05:30] [WARN] [session.go:1338] ["parse SQL failed"] [error="line 1 column 19 near \"COUNT (a bigint);\" "] [errorVerbose="line 1 column 19 near \"COUNT (a bigint);\" \ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/parser.(*Parser).Parse\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/yy_parser.go:163\ngithub.com/pingcap/tidb/session.(*session).ParseSQL\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1175\ngithub.com/pingcap/tidb/session.(*session).Parse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1328\ngithub.com/pingcap/tidb/util/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/util/testkit/testkit.go:190\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).TestIgnoreSpaceMode\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:395\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [SQL="CREATE TABLE COUNT (a bigint);"]
[2021/09/16 20:40:21.596 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=64] [cur_db=test] [sql="CREATE TABLE `COUNT` (a bigint);"] [user=]
[2021/09/16 20:40:21.597 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:85, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:84, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.597 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.597 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:85, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:84, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.597 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE `COUNT` (a bigint);"]
[2021/09/16 20:40:21.597 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=83] [elementID=81] [startKey=748000000000000051] [endKey=748000000000000052]
[2021/09/16 20:40:21.597 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:85, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:84, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.597 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.598 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=64] [neededSchemaVersion=65] ["start time"=175.322µs] [phyTblIDs="[84]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.598 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:85, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:84, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.597 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.599 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=85]
[2021/09/16 20:40:21.599 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.599 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=65] [cur_db=test] [sql="DROP TABLE COUNT;"] [user=]
[2021/09/16 20:40:21.599 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:86, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:84, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.599 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.599 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:86, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:84, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.599 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE COUNT;"]
[2021/09/16 20:40:21.599 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:86, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:84, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.599 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.600 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=65] [neededSchemaVersion=66] ["start time"=34.947µs] [phyTblIDs="[84]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.600 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:86, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:84, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.599 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.600 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=66] [neededSchemaVersion=67] ["start time"=29.978µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.600 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:86, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:84, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.599 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.601 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=67] [neededSchemaVersion=68] ["start time"=31.299µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.601 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=86] [elementID=84]
[2021/09/16 20:40:21.601 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=86] [jobType="drop table"]
[2021/09/16 20:40:21.601 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:86, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:84, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.599 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.602 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=86]
[2021/09/16 20:40:21.602 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.602 +05:30] [WARN] [session.go:1338] ["parse SQL failed"] [error="line 1 column 18 near \"COUNT(a bigint);\" "] [errorVerbose="line 1 column 18 near \"COUNT(a bigint);\" \ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/parser.(*Parser).Parse\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/yy_parser.go:163\ngithub.com/pingcap/tidb/session.(*session).ParseSQL\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1175\ngithub.com/pingcap/tidb/session.(*session).Parse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1328\ngithub.com/pingcap/tidb/util/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/util/testkit/testkit.go:190\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).TestIgnoreSpaceMode\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:399\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [SQL="CREATE TABLE COUNT(a bigint);"]
[2021/09/16 20:40:21.602 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=68] [cur_db=test] [sql="CREATE TABLE test.COUNT(a bigint);"] [user=]
[2021/09/16 20:40:21.602 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:88, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:87, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.602 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.602 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:88, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:87, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.602 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE test.COUNT(a bigint);"]
[2021/09/16 20:40:21.603 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:88, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:87, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.602 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.603 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=86] [elementID=84] [startKey=748000000000000054] [endKey=748000000000000055]
[2021/09/16 20:40:21.603 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=68] [neededSchemaVersion=69] ["start time"=101.76µs] [phyTblIDs="[87]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.603 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:88, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:87, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.602 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.604 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=88]
[2021/09/16 20:40:21.604 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.604 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=69] [cur_db=test] [sql="DROP TABLE COUNT;"] [user=]
[2021/09/16 20:40:21.604 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:89, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:87, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.604 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.604 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:89, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:87, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.604 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE COUNT;"]
[2021/09/16 20:40:21.604 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:89, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:87, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.604 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.604 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=69] [neededSchemaVersion=70] ["start time"=26.546µs] [phyTblIDs="[87]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.604 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:89, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:87, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.604 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.605 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=70] [neededSchemaVersion=71] ["start time"=28.107µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.605 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:89, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:87, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.604 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.605 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=71] [neededSchemaVersion=72] ["start time"=35.26µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.606 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=89] [elementID=87]
[2021/09/16 20:40:21.606 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=89] [jobType="drop table"]
[2021/09/16 20:40:21.606 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:89, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:87, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.604 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.606 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=89]
[2021/09/16 20:40:21.606 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.606 +05:30] [WARN] [session.go:1338] ["parse SQL failed"] [error="line 1 column 21 near \"BIT_AND (a bigint);\" "] [errorVerbose="line 1 column 21 near \"BIT_AND (a bigint);\" \ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/parser.(*Parser).Parse\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/yy_parser.go:163\ngithub.com/pingcap/tidb/session.(*session).ParseSQL\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1175\ngithub.com/pingcap/tidb/session.(*session).Parse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1328\ngithub.com/pingcap/tidb/util/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/util/testkit/testkit.go:190\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).TestIgnoreSpaceMode\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:404\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [SQL="CREATE TABLE BIT_AND (a bigint);"]
[2021/09/16 20:40:21.607 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=72] [cur_db=test] [sql="CREATE TABLE `BIT_AND` (a bigint);"] [user=]
[2021/09/16 20:40:21.607 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:91, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:90, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.607 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.607 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:91, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:90, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.607 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE `BIT_AND` (a bigint);"]
[2021/09/16 20:40:21.607 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:91, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:90, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.607 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.607 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=89] [elementID=87] [startKey=748000000000000057] [endKey=748000000000000058]
[2021/09/16 20:40:21.608 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=72] [neededSchemaVersion=73] ["start time"=95.805µs] [phyTblIDs="[90]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.608 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:91, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:90, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.607 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.608 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=91]
[2021/09/16 20:40:21.608 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.608 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=73] [cur_db=test] [sql="DROP TABLE BIT_AND;"] [user=]
[2021/09/16 20:40:21.608 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:92, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:90, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.608 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.608 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:92, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:90, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.608 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE BIT_AND;"]
[2021/09/16 20:40:21.609 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:92, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:90, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.608 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.609 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=73] [neededSchemaVersion=74] ["start time"=31.03µs] [phyTblIDs="[90]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.609 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:92, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:90, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.608 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.609 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=74] [neededSchemaVersion=75] ["start time"=38.327µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.609 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:92, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:90, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.608 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.610 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=75] [neededSchemaVersion=76] ["start time"=35.046µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.610 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=92] [elementID=90]
[2021/09/16 20:40:21.610 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=92] [jobType="drop table"]
[2021/09/16 20:40:21.611 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:92, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:90, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.608 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.611 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=92]
[2021/09/16 20:40:21.611 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.611 +05:30] [WARN] [session.go:1338] ["parse SQL failed"] [error="line 1 column 20 near \"BIT_AND(a bigint);\" "] [errorVerbose="line 1 column 20 near \"BIT_AND(a bigint);\" \ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/parser.(*Parser).Parse\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/yy_parser.go:163\ngithub.com/pingcap/tidb/session.(*session).ParseSQL\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1175\ngithub.com/pingcap/tidb/session.(*session).Parse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1328\ngithub.com/pingcap/tidb/util/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/util/testkit/testkit.go:190\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).TestIgnoreSpaceMode\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:408\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [SQL="CREATE TABLE BIT_AND(a bigint);"]
[2021/09/16 20:40:21.611 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=76] [cur_db=test] [sql="CREATE TABLE test.BIT_AND(a bigint);"] [user=]
[2021/09/16 20:40:21.611 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:94, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:93, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.611 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.611 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:94, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:93, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.611 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE test.BIT_AND(a bigint);"]
[2021/09/16 20:40:21.612 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:94, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:93, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.611 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.612 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=92] [elementID=90] [startKey=74800000000000005a] [endKey=74800000000000005b]
[2021/09/16 20:40:21.612 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=76] [neededSchemaVersion=77] ["start time"=121.706µs] [phyTblIDs="[93]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.612 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:94, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:93, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.611 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.613 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=94]
[2021/09/16 20:40:21.613 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.613 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=77] [cur_db=test] [sql="DROP TABLE BIT_AND;"] [user=]
[2021/09/16 20:40:21.613 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:95, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:93, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.613 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.613 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:95, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:93, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.613 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE BIT_AND;"]
[2021/09/16 20:40:21.613 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:95, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:93, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.613 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.614 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=77] [neededSchemaVersion=78] ["start time"=38.554µs] [phyTblIDs="[93]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.614 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:95, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:93, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.613 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.614 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=78] [neededSchemaVersion=79] ["start time"=30.79µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.614 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:95, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:93, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.613 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.615 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=79] [neededSchemaVersion=80] ["start time"=31.997µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.615 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=95] [elementID=93]
[2021/09/16 20:40:21.615 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=95] [jobType="drop table"]
[2021/09/16 20:40:21.615 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:95, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:93, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.613 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.616 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=95]
[2021/09/16 20:40:21.616 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.616 +05:30] [WARN] [session.go:1338] ["parse SQL failed"] [error="line 1 column 17 near \"NOW (a bigint);\" "] [errorVerbose="line 1 column 17 near \"NOW (a bigint);\" \ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/parser.(*Parser).Parse\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/yy_parser.go:163\ngithub.com/pingcap/tidb/session.(*session).ParseSQL\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1175\ngithub.com/pingcap/tidb/session.(*session).Parse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1328\ngithub.com/pingcap/tidb/util/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/util/testkit/testkit.go:190\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).TestIgnoreSpaceMode\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:413\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [SQL="CREATE TABLE NOW (a bigint);"]
[2021/09/16 20:40:21.616 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=80] [cur_db=test] [sql="CREATE TABLE `NOW` (a bigint);"] [user=]
[2021/09/16 20:40:21.617 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:97, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:96, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.616 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.617 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:97, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:96, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.616 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE `NOW` (a bigint);"]
[2021/09/16 20:40:21.617 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:97, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:96, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.616 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.617 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=95] [elementID=93] [startKey=74800000000000005d] [endKey=74800000000000005e]
[2021/09/16 20:40:21.617 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=80] [neededSchemaVersion=81] ["start time"=99.236µs] [phyTblIDs="[96]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.617 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:97, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:96, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.616 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.618 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=97]
[2021/09/16 20:40:21.618 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.618 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=81] [cur_db=test] [sql="DROP TABLE NOW;"] [user=]
[2021/09/16 20:40:21.618 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:98, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:96, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.618 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:98, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:96, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE NOW;"]
[2021/09/16 20:40:21.618 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:98, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:96, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.619 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=81] [neededSchemaVersion=82] ["start time"=37.749µs] [phyTblIDs="[96]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.619 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:98, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:96, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.619 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=82] [neededSchemaVersion=83] ["start time"=31.8µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.619 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:98, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:96, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.620 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=83] [neededSchemaVersion=84] ["start time"=30.49µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.620 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=98] [elementID=96]
[2021/09/16 20:40:21.620 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=98] [jobType="drop table"]
[2021/09/16 20:40:21.620 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:98, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:96, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.618 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.621 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=98]
[2021/09/16 20:40:21.621 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.621 +05:30] [WARN] [session.go:1338] ["parse SQL failed"] [error="line 1 column 16 near \"NOW(a bigint);\" "] [errorVerbose="line 1 column 16 near \"NOW(a bigint);\" \ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/pingcap/parser.(*Parser).Parse\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/parser@v0.0.0-20210907051057-948434fa20e4/yy_parser.go:163\ngithub.com/pingcap/tidb/session.(*session).ParseSQL\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1175\ngithub.com/pingcap/tidb/session.(*session).Parse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1328\ngithub.com/pingcap/tidb/util/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/util/testkit/testkit.go:190\ngithub.com/pingcap/tidb/types_test.(*testMySQLConstSuite).TestIgnoreSpaceMode\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/types/const_test.go:417\nreflect.Value.call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543\nreflect.Value.Call\n\t/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339\ngithub.com/pingcap/check.(*suiteRunner).forkTest.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:850\ngithub.com/pingcap/check.(*suiteRunner).forkCall.func1\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [SQL="CREATE TABLE NOW(a bigint);"]
[2021/09/16 20:40:21.621 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=84] [cur_db=test] [sql="CREATE TABLE test.NOW(a bigint);"] [user=]
[2021/09/16 20:40:21.621 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:100, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:99, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.621 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.622 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:100, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:99, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.621 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE test.NOW(a bigint);"]
[2021/09/16 20:40:21.622 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:100, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:99, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.621 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.622 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=98] [elementID=96] [startKey=748000000000000060] [endKey=748000000000000061]
[2021/09/16 20:40:21.622 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=84] [neededSchemaVersion=85] ["start time"=108.836µs] [phyTblIDs="[99]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.623 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:100, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:99, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.621 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.623 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=100]
[2021/09/16 20:40:21.623 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.623 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=85] [cur_db=test] [sql="DROP TABLE NOW;"] [user=]
[2021/09/16 20:40:21.624 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:101, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:99, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.623 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.624 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:101, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:99, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.623 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE NOW;"]
[2021/09/16 20:40:21.624 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:101, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:99, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.623 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.624 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=85] [neededSchemaVersion=86] ["start time"=37.477µs] [phyTblIDs="[99]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.624 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:101, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:99, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.623 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.625 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=86] [neededSchemaVersion=87] ["start time"=66.163µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.625 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:101, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:99, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.623 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.626 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=87] [neededSchemaVersion=88] ["start time"=33.745µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.626 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=101] [elementID=99]
[2021/09/16 20:40:21.626 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=101] [jobType="drop table"]
[2021/09/16 20:40:21.626 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:101, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:99, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.623 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.627 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=101]
[2021/09/16 20:40:21.627 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.629 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=4] [schemaVersion=88] [cur_db=test] [sql="DROP TABLE IF EXISTS tb5"] [user=]
[2021/09/16 20:40:21.629 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=101] [elementID=99] [startKey=748000000000000063] [endKey=748000000000000064]
[2021/09/16 20:40:21.629 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=4] [schemaVersion=88] [cur_db=test] [sql="create table tb5(a bigint, b bigint);"] [user=]
[2021/09/16 20:40:21.630 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:103, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:102, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.63 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.630 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:103, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:102, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.63 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table tb5(a bigint, b bigint);"]
[2021/09/16 20:40:21.630 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:103, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:102, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.63 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.631 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=88] [neededSchemaVersion=89] ["start time"=158.361µs] [phyTblIDs="[102]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.631 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:103, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:102, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.63 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.632 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=103]
[2021/09/16 20:40:21.632 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.632 +05:30] [WARN] [2pc.go:1601] ["schemaLeaseChecker is not set for this transaction"] [sessionID=4] [startTS=427767895590699010] [commitTS=427767895590699011]
[2021/09/16 20:40:21.634 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=5] [schemaVersion=89] [cur_db=test] [sql="DROP TABLE IF EXISTS tb5"] [user=]
[2021/09/16 20:40:21.634 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:104, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:102, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.634 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.634 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:104, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:102, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.634 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="DROP TABLE IF EXISTS tb5"]
[2021/09/16 20:40:21.635 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:104, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:102, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.634 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.635 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=89] [neededSchemaVersion=90] ["start time"=40.586µs] [phyTblIDs="[102]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.635 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:104, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:102, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.634 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.636 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=90] [neededSchemaVersion=91] ["start time"=61.132µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.636 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:104, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:102, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.634 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.637 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=91] [neededSchemaVersion=92] ["start time"=70.25µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.637 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=104] [elementID=102]
[2021/09/16 20:40:21.637 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=104] [jobType="drop table"]
[2021/09/16 20:40:21.638 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:104, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:102, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.634 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.638 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=104]
[2021/09/16 20:40:21.638 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.638 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=5] [schemaVersion=92] [cur_db=test] [sql="create table tb5(a bigint, b bigint);"] [user=]
[2021/09/16 20:40:21.639 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:106, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:105, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.639 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.639 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:106, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:105, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.639 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table tb5(a bigint, b bigint);"]
[2021/09/16 20:40:21.639 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:106, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:105, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.639 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.640 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=92] [neededSchemaVersion=93] ["start time"=111.093µs] [phyTblIDs="[105]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.640 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:106, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:105, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.639 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.641 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=106]
[2021/09/16 20:40:21.641 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.641 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=104] [elementID=102] [startKey=748000000000000066] [endKey=748000000000000067]
[2021/09/16 20:40:21.641 +05:30] [WARN] [2pc.go:1601] ["schemaLeaseChecker is not set for this transaction"] [sessionID=5] [startTS=427767895593058307] [commitTS=427767895593058308]
[2021/09/16 20:40:21.651 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=14] [schemaVersion=93] [cur_db=test] [sql="drop table if exists t;"] [user=]
[2021/09/16 20:40:21.652 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=14] [schemaVersion=93] [cur_db=test] [sql="create table t (a real);"] [user=]
[2021/09/16 20:40:21.652 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:108, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:107, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.652 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.652 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:108, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:107, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.652 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table t (a real);"]
[2021/09/16 20:40:21.652 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:108, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:107, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.652 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.653 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=93] [neededSchemaVersion=94] ["start time"=173.26µs] [phyTblIDs="[107]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.653 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:108, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:107, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.652 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.654 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=108]
[2021/09/16 20:40:21.654 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.654 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=14] [schemaVersion=94] [cur_db=test] [sql="drop table if exists t;"] [user=]
[2021/09/16 20:40:21.654 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:109, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:107, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.654 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.654 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:109, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:107, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.654 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="drop table if exists t;"]
[2021/09/16 20:40:21.654 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:109, Type:drop table, State:none, SchemaState:queueing, SchemaID:1, TableID:107, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.654 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.655 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=94] [neededSchemaVersion=95] ["start time"=37.065µs] [phyTblIDs="[107]"] [actionTypes="[16]"]
[2021/09/16 20:40:21.655 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:109, Type:drop table, State:running, SchemaState:write only, SchemaID:1, TableID:107, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.654 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.655 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=95] [neededSchemaVersion=96] ["start time"=32.796µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.655 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:109, Type:drop table, State:running, SchemaState:delete only, SchemaID:1, TableID:107, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.654 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.656 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=96] [neededSchemaVersion=97] ["start time"=27.611µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/16 20:40:21.656 +05:30] [INFO] [delete_range.go:451] ["[ddl] insert into delete-range table"] [jobID=109] [elementID=107]
[2021/09/16 20:40:21.656 +05:30] [INFO] [delete_range.go:107] ["[ddl] add job into delete-range table"] [jobID=109] [jobType="drop table"]
[2021/09/16 20:40:21.656 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:109, Type:drop table, State:synced, SchemaState:queueing, SchemaID:1, TableID:107, RowCount:0, ArgLen:3, start time: 2021-09-16 20:40:21.654 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.657 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=109]
[2021/09/16 20:40:21.657 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.657 +05:30] [INFO] [session.go:2845] ["CRUCIAL OPERATION"] [conn=14] [schemaVersion=97] [cur_db=test] [sql="create table t (a real)"] [user=]
[2021/09/16 20:40:21.657 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:111, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:110, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.657 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/16 20:40:21.657 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:111, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:110, RowCount:0, ArgLen:1, start time: 2021-09-16 20:40:21.657 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="create table t (a real)"]
[2021/09/16 20:40:21.658 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:111, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:110, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.657 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.658 +05:30] [INFO] [delete_range.go:238] ["[ddl] delRange emulator complete task"] [jobID=109] [elementID=107] [startKey=74800000000000006b] [endKey=74800000000000006c]
[2021/09/16 20:40:21.658 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=97] [neededSchemaVersion=98] ["start time"=101.945µs] [phyTblIDs="[110]"] [actionTypes="[8]"]
[2021/09/16 20:40:21.658 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:111, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:110, RowCount:0, ArgLen:0, start time: 2021-09-16 20:40:21.657 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/16 20:40:21.659 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=111]
[2021/09/16 20:40:21.659 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/16 20:40:21.659 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 3, tp general"] ["take time"=266ns]
[2021/09/16 20:40:21.659 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 4, tp add index"] ["take time"=99ns]
[2021/09/16 20:40:21.659 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/09/16 20:40:21.659 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/09/16 20:40:21.659 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=6e9819f6-a668-46c6-ad6c-284aceae10cd] ["take time"=54.213µs]
[2021/09/16 20:40:21.659 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=6e9819f6-a668-46c6-ad6c-284aceae10cd]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:423] ["topNSlowQueryLoop exited."]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:885] ["loadPrivilegeInLoop exited."]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:1116] ["TelemetryRotateSubWindowLoop exited."]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:480] ["topologySyncerKeeper exited."]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:1012] ["globalBindHandleWorkerLoop exited."]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:452] ["infoSyncerKeeper exited."]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:1086] ["TelemetryReportLoop exited."]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:934] ["LoadSysVarCacheLoop exited."]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:1053] ["handleEvolvePlanTasksLoop exited."]
[2021/09/16 20:40:21.659 +05:30] [INFO] [domain.go:636] ["domain closed"] ["take time"=142.588µs]
[2021/09/16 20:40:21.679 +05:30] [INFO] [db.go:567] ["Closing database"]
[2021/09/16 20:40:21.680 +05:30] [INFO] [db.go:592] ["Memtable flushed"]
[2021/09/16 20:40:21.680 +05:30] [INFO] [db.go:596] ["Compaction finished"]
[2021/09/16 20:40:21.680 +05:30] [INFO] [db.go:615] ["BlobManager finished"]
[2021/09/16 20:40:21.680 +05:30] [INFO] [db.go:619] ["ResourceManager finished"]
[2021/09/16 20:40:21.680 +05:30] [INFO] [db.go:625] ["Waiting for closer"]
OK: 105 passed
--- PASS: TestT (0.47s)
=== RUN   TestCheckFsp
=== PAUSE TestCheckFsp
=== RUN   TestParseFrac
=== PAUSE TestParseFrac
=== RUN   TestAlignFrac
=== PAUSE TestAlignFrac
=== RUN   TestAdd
=== PAUSE TestAdd
=== RUN   TestSub
=== PAUSE TestSub
=== RUN   TestMul
=== PAUSE TestMul
=== RUN   TestDiv
=== PAUSE TestDiv
=== RUN   TestSet
=== RUN   TestSet/ParseSet
=== RUN   TestSet/ParseSet_ci
=== RUN   TestSet/ParseSetValue
=== RUN   TestSet/ParseSet_err
=== RUN   TestSet/ParseSetValue_err
--- PASS: TestSet (0.00s)
    --- PASS: TestSet/ParseSet (0.00s)
    --- PASS: TestSet/ParseSet_ci (0.00s)
    --- PASS: TestSet/ParseSetValue (0.00s)
    --- PASS: TestSet/ParseSet_err (0.00s)
    --- PASS: TestSet/ParseSetValue_err (0.00s)
=== RUN   TestTimeFormatMethod
=== PAUSE TestTimeFormatMethod
=== RUN   TestStrToDate
=== PAUSE TestStrToDate
=== RUN   TestTimeEncoding
=== PAUSE TestTimeEncoding
=== RUN   TestDateTime
=== PAUSE TestDateTime
=== RUN   TestTimestamp
=== PAUSE TestTimestamp
=== RUN   TestDate
=== PAUSE TestDate
=== RUN   TestTime
=== PAUSE TestTime
=== RUN   TestDurationAdd
=== PAUSE TestDurationAdd
=== RUN   TestDurationSub
=== PAUSE TestDurationSub
=== RUN   TestTimeFsp
=== PAUSE TestTimeFsp
=== RUN   TestYear
=== PAUSE TestYear
=== RUN   TestCodec
=== PAUSE TestCodec
=== RUN   TestParseTimeFromNum
=== PAUSE TestParseTimeFromNum
=== RUN   TestToNumber
=== PAUSE TestToNumber
=== RUN   TestParseTimeFromFloatString
=== PAUSE TestParseTimeFromFloatString
=== RUN   TestParseFrac
=== PAUSE TestParseFrac
=== RUN   TestRoundFrac
=== PAUSE TestRoundFrac
=== RUN   TestConvert
=== PAUSE TestConvert
=== RUN   TestCompare
=== PAUSE TestCompare
=== RUN   TestDurationClock
=== PAUSE TestDurationClock
=== RUN   TestParseDateFormat
=== PAUSE TestParseDateFormat
=== RUN   TestTimestampDiff
=== PAUSE TestTimestampDiff
=== RUN   TestDateFSP
=== PAUSE TestDateFSP
=== RUN   TestConvertTimeZone
=== PAUSE TestConvertTimeZone
=== RUN   TestTimeAdd
=== PAUSE TestTimeAdd
=== RUN   TestTruncateOverflowMySQLTime
=== PAUSE TestTruncateOverflowMySQLTime
=== RUN   TestCheckTimestamp
=== PAUSE TestCheckTimestamp
=== RUN   TestExtractDurationValue
=== PAUSE TestExtractDurationValue
=== RUN   TestCurrentTime
=== PAUSE TestCurrentTime
=== RUN   TestInvalidZero
=== PAUSE TestInvalidZero
=== RUN   TestGetFsp
=== PAUSE TestGetFsp
=== RUN   TestExtractDatetimeNum
=== PAUSE TestExtractDatetimeNum
=== RUN   TestExtractDurationNum
=== PAUSE TestExtractDurationNum
=== RUN   TestParseDurationValue
=== PAUSE TestParseDurationValue
=== RUN   TestIsClockUnit
=== PAUSE TestIsClockUnit
=== RUN   TestIsDateFormat
=== PAUSE TestIsDateFormat
=== RUN   TestParseTimeFromInt64
=== PAUSE TestParseTimeFromInt64
=== RUN   TestGetFormatType
=== PAUSE TestGetFormatType
=== RUN   TestGetFracIndex
=== PAUSE TestGetFracIndex
=== RUN   TestTimeOverflow
=== PAUSE TestTimeOverflow
=== RUN   TestTruncateFrac
=== PAUSE TestTruncateFrac
=== RUN   TestTimeSub
=== PAUSE TestTimeSub
=== RUN   TestCheckMonthDay
=== PAUSE TestCheckMonthDay
=== RUN   TestFormatIntWidthN
=== PAUSE TestFormatIntWidthN
=== RUN   TestFromGoTime
=== PAUSE TestFromGoTime
=== RUN   TestGetTimezone
=== PAUSE TestGetTimezone
=== RUN   TestParseWithTimezone
=== PAUSE TestParseWithTimezone
=== CONT  TestCompare
=== CONT  TestCompare
=== CONT  TestParseDurationValue
=== CONT  TestTruncateFrac
=== CONT  TestTimestamp
--- PASS: TestTruncateFrac (0.00s)
=== CONT  TestParseWithTimezone
--- PASS: TestCompare (0.00s)
=== CONT  TestGetTimezone
=== CONT  TestFormatIntWidthN
=== CONT  TestCodec
=== CONT  TestCurrentTime
=== CONT  TestCheckTimestamp
=== CONT  TestExtractDurationValue
=== CONT  TestTruncateOverflowMySQLTime
=== CONT  TestTimeAdd
=== CONT  TestConvertTimeZone
=== CONT  TestConvert
=== CONT  TestDateFSP
=== CONT  TestTimestampDiff
=== CONT  TestParseDateFormat
=== CONT  TestDurationClock
=== CONT  TestCheckMonthDay
=== CONT  TestIsDateFormat
=== CONT  TestRoundFrac
=== CONT  TestTimeOverflow
=== CONT  TestParseFrac
=== CONT  TestFromGoTime
=== CONT  TestDurationSub
=== CONT  TestExtractDurationNum
=== CONT  TestIsClockUnit
=== CONT  TestYear
=== CONT  TestTimeFsp
=== CONT  TestSub
=== CONT  TestDateTime
=== CONT  TestGetFracIndex
=== CONT  TestTimeSub
=== CONT  TestCheckFsp
=== CONT  TestAdd
=== CONT  TestAlignFrac
=== CONT  TestTimeEncoding
=== CONT  TestParseFrac
=== CONT  TestDiv
=== CONT  TestDurationAdd
=== CONT  TestVecCompareIntAndUint
=== CONT  TestTime
=== CONT  TestError
=== CONT  TestParseTimeFromFloatString
=== CONT  TestDate
=== CONT  TestCompareDatum
=== CONT  TestStrToDate
=== CONT  TestTimeFormatMethod
=== CONT  TestMul
=== CONT  TestExtractDatetimeNum
=== CONT  TestToNumber
=== CONT  TestGetFsp
=== CONT  TestParseTimeFromNum
--- PASS: TestTimestamp (0.00s)
--- PASS: TestFormatIntWidthN (0.00s)
=== CONT  TestInvalidZero
=== CONT  TestParseTimeFromInt64
--- PASS: TestGetTimezone (0.00s)
--- PASS: TestParseWithTimezone (0.00s)
--- PASS: TestCurrentTime (0.00s)
--- PASS: TestTruncateOverflowMySQLTime (0.00s)
--- PASS: TestCodec (0.00s)
--- PASS: TestTimeAdd (0.00s)
--- PASS: TestStrToDate (0.00s)
=== CONT  TestGetFormatType
--- PASS: TestDateFSP (0.00s)
--- PASS: TestTimestampDiff (0.00s)
--- PASS: TestParseDurationValue (0.00s)
--- PASS: TestInvalidZero (0.00s)
--- PASS: TestGetFormatType (0.00s)
--- PASS: TestDurationClock (0.00s)
--- PASS: TestParseDateFormat (0.00s)
--- PASS: TestIsDateFormat (0.00s)
--- PASS: TestExtractDurationValue (0.00s)
--- PASS: TestCheckMonthDay (0.00s)
--- PASS: TestCompare (0.00s)
--- PASS: TestFromGoTime (0.00s)
--- PASS: TestParseFrac (0.00s)
--- PASS: TestTimeOverflow (0.00s)
--- PASS: TestIsClockUnit (0.00s)
--- PASS: TestDurationSub (0.00s)
--- PASS: TestYear (0.00s)
--- PASS: TestTimeFsp (0.00s)
--- PASS: TestSub (0.00s)
--- PASS: TestGetFracIndex (0.00s)
--- PASS: TestTimeSub (0.00s)
--- PASS: TestParseTimeFromInt64 (0.00s)
--- PASS: TestCheckFsp (0.00s)
--- PASS: TestAlignFrac (0.00s)
--- PASS: TestAdd (0.00s)
--- PASS: TestExtractDurationNum (0.00s)
--- PASS: TestTimeEncoding (0.00s)
--- PASS: TestParseFrac (0.00s)
--- PASS: TestDurationAdd (0.00s)
--- PASS: TestDiv (0.00s)
--- PASS: TestError (0.00s)
--- PASS: TestTime (0.00s)
--- PASS: TestCompareDatum (0.00s)
--- PASS: TestParseTimeFromFloatString (0.00s)
--- PASS: TestVecCompareIntAndUint (0.00s)
--- PASS: TestMul (0.00s)
--- PASS: TestTimeFormatMethod (0.00s)
--- PASS: TestDateTime (0.00s)
--- PASS: TestGetFsp (0.00s)
--- PASS: TestDate (0.00s)
--- PASS: TestExtractDatetimeNum (0.00s)
--- PASS: TestParseTimeFromNum (0.00s)
--- PASS: TestConvertTimeZone (0.00s)
--- PASS: TestConvert (0.00s)
--- PASS: TestRoundFrac (0.00s)
--- PASS: TestToNumber (0.00s)
--- PASS: TestCheckTimestamp (0.01s)
PASS
ok  	github.com/pingcap/tidb/types	1.353s

tidb $ 
tidb $ 
tidb $ 
```
