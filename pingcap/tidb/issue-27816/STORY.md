https://github.com/pingcap/tidb/issues/27816

TODO
- migrate test-infra to testify for util/encrypt pkg [DONE]


Low Level TODO
- Migrate `util/encrypt/aes_test.go` [DONE]
- Migrate `util/encrypt/aes_layer_test.go` [DONE]
- Migrate `util/encrypt/crypt_test.go` [DONE]
- Add main test file and check for leaks using uber package [DONE]
- Get rid of all references to `github.com/pingcap/check` and `github.com/pingcap/tidb/util/testleak` [DONE]

---

Check which test files need migration

```bash
tidb $ rg "github.com/pingcap/check" util/encrypt/
util/encrypt/crypt_test.go
18:	. "github.com/pingcap/check"

util/encrypt/aes_layer_test.go
23:	"github.com/pingcap/check"

util/encrypt/aes_test.go
23:	. "github.com/pingcap/check"

tidb $ rg "github.com/pingcap/check" util/encrypt/ -l
util/encrypt/aes_layer_test.go
util/encrypt/aes_test.go
util/encrypt/crypt_test.go

tidb $
```

So, it's three files

- util/encrypt/aes_layer_test.go
- util/encrypt/aes_test.go
- util/encrypt/crypt_test.go

---

`util/encrypt/aes_test.go` seems to be like the biggest file so we can start from there I guess

MIGRATING `util/encrypt/aes_test.go` NOW

Okay, I see a `testEncryptSuite` being used here. I need to change it and start using individual golang tests similar to what has been done here - https://github.com/pingcap/tidb/pull/27747 by @tisonkun

I need to also add some sort of `TestMain` test function and use `go.uber.org/goleak` package instead of `github.com/pingcap/tidb/util/testleak` being used in `util/encrypt/aes_test.go`, this is again similar to the migration done in https://github.com/pingcap/tidb/pull/27747

TODO
- Migrate from `github.com/pingcap/check` to `github.com/stretchr/testify` [DONE]
- Ensure all tests are in separate Golang Test functions [DONE]
- Ensure there is no usage of `github.com/pingcap/tidb/util/testleak` [DONE]
- Ensure there's a separate MainTest file [DONE]
    - Have goleak present there [DONE]
    - Ask @tikonsun if we need the extra options for the goleak



```bash
{ make failpoint-enable; go test -run ^TestTCopy$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
$ make failpoint-enable;
$ go test -run ^TestTCopy$ github.com/pingcap/tidb/util/encrypt;
ok  	github.com/pingcap/tidb/util/encrypt	0.525s
$ make failpoint-disable;
```

Wow! That worked! I migrated `TestPad`!

Also, previously I had this

```go
func TestTCopy(t *testing.T) {
	s := &testEncryptSuite{}
	s.TestPad(t)
}
...

func (s *testEncryptSuite) TestPad(t *testing.T) {
	...
}
```

But I'm changing it already to

```go
func TestPad(t *testing.T) {
	...
}
```

and removing `TestTCopy`

```bash
tidb $ make failpoint-enable;
tidb $ go test -run ^TestPad$ github.com/pingcap/tidb/util/encrypt;
ok  	github.com/pingcap/tidb/util/encrypt	0.453s
tidb $ make failpoint-disable;
tidb $ 
```

TODO
- Migrate TestPad [DONE]
- Migrate TestUnpad [DONE]
- Migrate TestAESECB [DONE]
- Migrate TestAESEncryptWithECB [DONE]
- Migrate TestAESDecryptWithECB [DONE]
- Migrate TestAESEncryptWithCBC [DONE]
- Migrate TestAESEncryptWithOFB [DONE]
- Migrate TestAESDecryptWithOFB [DONE]
- Migrate TestAESDecryptWithCBC [DONE]
- Migrate TestAESEncryptWithCFB [DONE]
- Migrate TestAESDecryptWithCFB [DONE]
- Migrate TestDeriveKeyMySQL [DONE]

---


```bash
{ make failpoint-enable; go test -run ^TestUnpad$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
tidb $ make failpoint-enable;
tidb $ go test -run ^TestUnpad$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable;
ok  	github.com/pingcap/tidb/util/encrypt	0.397s
tidb $ 
```

```bash
{ make failpoint-enable; go test -run ^TestAESECB$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -run ^TestAESEncryptWithECB$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -run ^TestAESDecryptWithECB$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -run ^TestAESEncryptWithCBC$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -run ^TestAESEncryptWithOFB$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -run ^TestAESDecryptWithOFB$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -run ^TestAESDecryptWithCBC$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -run ^TestAESEncryptWithCFB$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -run ^TestAESDecryptWithCFB$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -run ^TestDeriveKeyMySQL$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

---

There are still some references of `github.com/pingcap/check` in `util/encrypt/aes_test.go` due to `TestingT`, `CustomVerboseFlag` and `Suite`. And `testEncryptSuite` is referenced in `util/encrypt/crypt_test.go`

I'm gonna migrate `util/encrypt/aes_layer_test.go` next as that's the next biggest file and then work on `util/encrypt/crypt_test.go`

Finally we need a main test file too

I simply ran all the tests to see how well it's all doing and noticed this

```bash
tidb $ make gotest

Running in native mode.
timeout-check
grep 'PASS:' gotest.log | go run tools/check/check-timeout.go || { $(find $PWD/ -type d | grep -vE "(\.git|tools)" | xargs tools/bin/failpoint-ctl disable); exit 1; }
The following test cases take too long to finish:
PASS: sort_test.go:92: testSerialSuite1.TestIssue16696	8.710s
PASS: builtin_time_vec_generated_test.go:6727: testVectorizeSuite1.TestVectorizedBuiltinTimeEvalOneVecGenerated	5.729s
PASS: builtin_time_vec_test.go:575: testVectorizeSuite2.TestVectorizedBuiltinTimeEvalOneVec	8.250s
PASS: builtin_cast_vec_test.go:156: testEvaluatorSuite.TestVectorizedBuiltinCastFunc	6.387s
PASS: builtin_time_vec_test.go:579: testVectorizeSuite2.TestVectorizedBuiltinTimeFunc	8.769s
--- PASS: TestClusterConfigInfoschema (5.58s)
--- PASS: TestCTEPreviewAndReport (7.37s)
exit status 252
make: *** [gotest] Error 1
tidb $ 
tidb $ 
```

Seems like unrelated to my code changes, so I'm going to ignore this temporarily and come back to it later when I have time

I'm looking at `util/encrypt/aes_layer_test.go` and it has some tests and benchmarks too

There are some references to the `check` package from `github.com/pingcap/check`

```bash
{ make failpoint-enable; go test -run ^TestReadAt$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

---

Next I'm working on `util/encrypt/crypt_test.go`

- Migrate TestSQLDecode [DONE]
- Migrate TestSQLEncode [DONE]

```bash
{ make failpoint-enable; go test -run ^TestSQLDecode$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```


```bash
{ make failpoint-enable; go test -run ^TestSQLEncode$ github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

---

- PASS: builtin_time_vec_generated_test.go:6727: testVectorizeSuite1.TestVectorizedBuiltinTimeEvalOneVecGenerated	5.729s [reported issue]
- PASS: builtin_time_vec_test.go:575: testVectorizeSuite2.TestVectorizedBuiltinTimeEvalOneVec	8.250s [reported issue]
- PASS: builtin_time_vec_test.go:579: testVectorizeSuite2.TestVectorizedBuiltinTimeFunc	8.769s [reported issue]
- PASS: builtin_cast_vec_test.go:156: testEvaluatorSuite.TestVectorizedBuiltinCastFunc	6.387s [reported issue]

