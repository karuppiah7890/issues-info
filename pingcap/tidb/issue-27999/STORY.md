https://github.com/pingcap/tidb/issues/27999

TODO
- Ensure `"github.com/pingcap/check"` import is not present [DONE]
- Migrate all tests to golang tests using Testify [DONE]
- Parallelize all the tests using `t.Parallel()` [DONE]

---

Low Level TODO - migrate the following tests
- TestDatum [DONE]
- TestToBool [DONE]
- TestToInt64 [DONE]
- TestToFloat32 [DONE]
- TestToFloat64 [DONE]
- TestToJSON [DONE]
- TestIsNull [DONE]
- TestToBytes [DONE]
- TestComputePlusAndMinus [DONE]
- TestCloneDatum [DONE]
- TestEstimatedMemUsage [DONE]
- TestChangeReverseResultByUpperLowerBound [DONE]
- TestStringToMysqlBit [DONE]

---

```bash
{ make failpoint-enable; go test -run ^TestDatum$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestDatum to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestToBool$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestToBool to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestToInt64$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestToInt64 to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestToFloat32$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestToFloat32 to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestToFloat64$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestToFloat64 to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestToJSON$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestToJSON to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestIsNull$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestIsNull to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestToBytes$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestToBytes to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestComputePlusAndMinus$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestComputePlusAndMinus to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestCloneDatum$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestCloneDatum to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestEstimatedMemUsage$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestEstimatedMemUsage to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestChangeReverseResultByUpperLowerBound$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestChangeReverseResultByUpperLowerBound to testify (#27999)`

----

```bash
{ make failpoint-enable; go test -run ^TestStringToMysqlBit$ github.com/pingcap/tidb/types; make failpoint-disable; }
```

`types: migrate TestStringToMysqlBit to testify (#27999)`

---

```bash
{ make failpoint-enable; go test github.com/pingcap/tidb/types; make failpoint-disable; }
```
