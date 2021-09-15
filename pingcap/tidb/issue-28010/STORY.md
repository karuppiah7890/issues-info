https://github.com/pingcap/tidb/issues/28010

TODO
- Ensure `"github.com/pingcap/check"` import is not present
- Migrate all tests to golang tests using Testify
- Ensure `"github.com/pingcap/tidb/util/testleak"` import is not present

---

Low Level TODO - migrate the following tests
- TestTimeEncoding [DONE]
- TestDateTime
- TestTimestamp
- TestDate
- TestTime
- TestDurationAdd
- TestDurationSub
- TestTimeFsp
- TestYear
- TestCodec
- TestParseTimeFromNum
- TestToNumber
- TestParseTimeFromFloatString
- TestParseFrac
- TestRoundFrac
- TestConvert
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

{ make failpoint-enable; go test -run ^TestTimeEncoding$ github.com/pingcap/tidb/types; make failpoint-disable; }

`types: migrate TestTimeEncoding to testify (#28010)`

---

Migrating TestDateTime now

{ make failpoint-enable; go test -run ^TestDateTime$ github.com/pingcap/tidb/types; make failpoint-disable; }

`types: migrate TestDateTime to testify (#28010)`

---

{ make failpoint-enable; go test -run github.com/pingcap/tidb/types; make failpoint-disable; }

---
