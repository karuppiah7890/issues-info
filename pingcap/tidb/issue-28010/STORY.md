https://github.com/pingcap/tidb/issues/28010

TODO
- Ensure `"github.com/pingcap/check"` import is not present
- Migrate all tests to golang tests using Testify
- Ensure `"github.com/pingcap/tidb/util/testleak"` import is not present
- Parallelize all the tests using `t.Parallel()`

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
- TestCompare
- TestDurationClock
- TestParseDateFormat
- TestTimestampDiff
- TestDateFSP
- TestConvertTimeZone
- TestTimeAdd
- TestTruncateOverflowMySQLTime
- TestCheckTimestamp
- TestExtractDurationValue
- TestCurrentTime
- TestInvalidZero
- TestGetFsp
- TestExtractDatetimeNum
- TestExtractDurationNum
- TestParseDurationValue
- TestIsClockUnit
- TestIsDateFormat
- TestParseTimeFromInt64
- TestGetFormatType
- TestgetFracIndex
- TestTimeOverflow
- TestTruncateFrac
- TestTimeSub
- TestCheckMonthDay
- TestFormatIntWidthN
- TestFromGoTime
- TestGetTimezone
- TestParseWithTimezone

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

{ make failpoint-enable; go test -run github.com/pingcap/tidb/types; make failpoint-disable; }

---
