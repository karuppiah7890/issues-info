https://github.com/pingcap/tidb/issues/28034

TODO - Run the tests in these files in parallel
- `util/encrypt/aes_test.go`
- `util/encrypt/aes_layer_test.go`
- `util/encrypt/crypt_test.go`

Use `t.Parallel`

```bash
{ make failpoint-enable; go test github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
```

---

```bash
tidb $ go clean -testcache
tidb $ { make failpoint-enable; go test github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
ok  	github.com/pingcap/tidb/util/encrypt	0.984s
tidb $ gst
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
tidb $ { make failpoint-enable; go test github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
ok  	github.com/pingcap/tidb/util/encrypt	(cached)

tidb $ 
tidb $ go clean -testcache
tidb $ { make failpoint-enable; go test github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
ok  	github.com/pingcap/tidb/util/encrypt	0.354s
tidb $ go clean -testcache
tidb $ gco -
Switched to branch 'parallelize-util/encrpyt-package-tests'
tidb $ { make failpoint-enable; go test github.com/pingcap/tidb/util/encrypt; make failpoint-disable; }
ok  	github.com/pingcap/tidb/util/encrypt	0.344s
tidb $ 
```


