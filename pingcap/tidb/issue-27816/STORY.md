https://github.com/pingcap/tidb/issues/27816

TODO
- migrate test-infra to testify for util/encrypt pkg


Low Level TODO
- 

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
- Migrate from `github.com/pingcap/check` to `github.com/stretchr/testify`
- Ensure all tests are in separate Golang Test functions
- Ensure there is no usage of `github.com/pingcap/tidb/util/testleak`
- Ensure there's a separate MainTest file
    - Have goleak present there
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
- Migrate TestAESDecryptWithCFB
- Migrate TestDeriveKeyMySQL

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
