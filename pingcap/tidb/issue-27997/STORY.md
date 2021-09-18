https://github.com/pingcap/tidb/issues/27997

TODO
- Ensure `"github.com/pingcap/check"` import is not present [DONE]
- Ensure `"github.com/pingcap/tidb/util/testleak"` import is not present [DONE]
- Migrate all tests to golang tests using Testify [DONE]
- Parallelize all the tests using `t.Parallel()` [DONE]

---

Low Level TODO - migrate the following tests
- TestConvertType [DONE]
- TestConvertToString [DONE]
- TestStrToNum [DONE]
- TestFieldTypeToStr [DONE]
- TestConvert [DONE]
- TestRoundIntStr [DONE]
- TestGetValidInt [DONE]
- TestGetValidFloat [DONE]
- TestConvertTime [DONE]
- TestConvertJSONToInt [DONE]
- TestConvertJSONToFloat [DONE]
- TestConvertJSONToDecimal [DONE]
- TestNumberToDuration [DONE]
- TestStrToDuration [DONE]
- TestConvertScientificNotation [DONE]
- TestConvertDecimalStrToUint [DONE]


---

```bash
{ make failpoint-enable; go test -run ^TestConvertType$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvertType to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestConvertToString$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvertToString to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestStrToNum$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestStrToNum to testify (#27997)`

---

{ make failpoint-enable; go test -v -run ^TestConvertToString$ github.com/pingcap/tidb/types; go test -v -run ^TestStrToNum$ github.com/pingcap/tidb/types; make failpoint-disable; }

---

```bash
{ make failpoint-enable; go test -run ^TestFieldTypeToStr$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestFieldTypeToStr to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestConvert$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvert to testify (#27997)`

---

{ make failpoint-enable; go test -v -run ^TestFieldTypeToStr$ github.com/pingcap/tidb/types; go test -v -run ^TestConvert$ github.com/pingcap/tidb/types; make failpoint-disable; }


---

```bash
{ make failpoint-enable; go test -run ^TestRoundIntStr$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestRoundIntStr to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestGetValidInt$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestGetValidInt to testify (#27997)`

---

{ make failpoint-enable; go test -v -run ^TestRoundIntStr$ github.com/pingcap/tidb/types; go test -v -run ^TestGetValidInt$ github.com/pingcap/tidb/types; make failpoint-disable; }

---

```bash
{ make failpoint-enable; go test -run ^TestGetValidFloat$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestGetValidFloat to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestConvertTime$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvertTime to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestConvertJSONToInt$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvertJSONToInt to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -v -run ^TestGetValidFloat$ github.com/pingcap/tidb/types; go test -v -run ^TestConvertTime$ github.com/pingcap/tidb/types; go test -v -run ^TestConvertJSONToInt$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

---

```bash
{ make failpoint-enable; go test -run ^TestConvertJSONToFloat$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvertJSONToFloat to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestConvertJSONToDecimal$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvertJSONToDecimal to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestNumberToDuration$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestNumberToDuration to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestStrToDuration$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestStrToDuration to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestConvertScientificNotation$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvertScientificNotation to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestConvertDecimalStrToUint$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestConvertDecimalStrToUint to testify (#27997)`

---

```bash
{ make failpoint-enable; go test -run ^TestConvertJSONToFloat$ github.com/pingcap/tidb/types; go test -run ^TestConvertJSONToDecimal$ github.com/pingcap/tidb/types; go test -run ^TestNumberToDuration$ github.com/pingcap/tidb/types; go test -run ^TestStrToDuration$ github.com/pingcap/tidb/types; go test -run ^TestConvertScientificNotation$ github.com/pingcap/tidb/types; go test -run ^TestConvertDecimalStrToUint$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

---

```bash
{
    make failpoint-enable;
    go test -v -run "^TestConvertJSONToFloat|TestConvertJSONToDecimal|TestNumberToDuration|TestStrToDuration|TestConvertScientificNotation|TestConvertDecimalStrToUint$" github.com/pingcap/tidb/types;
    make failpoint-disable;
}
```

---

```bash
tidb $ {
>     make failpoint-enable;
>     go test -run -v ^TestConvertJSONToFloat|TestConvertJSONToDecimal|TestNumberToDuration|TestStrToDuration|TestConvertScientificNotation|TestConvertDecimalStrToUint$ github.com/pingcap/tidb/types;
>     make failpoint-disable;
> }
-bash: TestConvertJSONToDecimal: command not found
-bash: TestNumberToDuration: command not found
-bash: TestStrToDuration: command not found
-bash: TestConvertScientificNotation: command not found
-bash: TestConvertDecimalStrToUint$: command not found
malformed import path "^TestConvertJSONToFloat": invalid char '^'
tidb $ {
>     make failpoint-enable;
>     go test -v -run ^TestConvertJSONToFloat|TestConvertJSONToDecimal|TestNumberToDuration|TestStrToDuration|TestConvertScientificNotation|TestConvertDecimalStrToUint$ github.com/pingcap/tidb/types;
>     make failpoint-disable;
> }
-bash: TestConvertJSONToDecimal: command not found
-bash: TestNumberToDuration: command not found
-bash: TestStrToDuration: command not found
-bash: TestConvertScientificNotation: command not found
-bash: TestConvertDecimalStrToUint$: command not found
no Go files in /Users/karuppiahn/projects/github.com/pingcap/tidb
tidb $ gst
On branch migrate-convert_test-to-testify
Your branch is ahead of 'origin/migrate-convert_test-to-testify' by 5 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
tidb $ {
>     make failpoint-enable;
>     go test -v -run "^TestConvertJSONToFloat|TestConvertJSONToDecimal|TestNumberToDuration|TestStrToDuration|TestConvertScientificNotation|TestConvertDecimalStrToUint$" github.com/pingcap/tidb/types;
>     make failpoint-disable;
> }
=== RUN   TestConvertJSONToFloat
=== PAUSE TestConvertJSONToFloat
=== RUN   TestConvertJSONToDecimal
=== PAUSE TestConvertJSONToDecimal
=== RUN   TestNumberToDuration
=== PAUSE TestNumberToDuration
=== RUN   TestStrToDuration
=== PAUSE TestStrToDuration
=== RUN   TestConvertScientificNotation
=== PAUSE TestConvertScientificNotation
=== RUN   TestConvertDecimalStrToUint
=== PAUSE TestConvertDecimalStrToUint
=== CONT  TestConvertJSONToFloat
=== CONT  TestStrToDuration
=== CONT  TestNumberToDuration
=== CONT  TestConvertDecimalStrToUint
=== CONT  TestConvertJSONToDecimal
=== CONT  TestConvertScientificNotation
--- PASS: TestConvertJSONToFloat (0.00s)
--- PASS: TestConvertDecimalStrToUint (0.00s)
--- PASS: TestStrToDuration (0.00s)
--- PASS: TestNumberToDuration (0.00s)
--- PASS: TestConvertScientificNotation (0.00s)
--- PASS: TestConvertJSONToDecimal (0.00s)
PASS
ok  	github.com/pingcap/tidb/types	0.823s
tidb $ 
```

---

```bash
{ make failpoint-enable; go test github.com/pingcap/tidb/types; make failpoint-disable; }
```
