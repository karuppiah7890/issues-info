https://github.com/pingcap/tidb/issues/28203

```bash
�[0m[2021/09/18 10:08:57.359 +00:00] [FATAL] [terror.go:276] ["unexpected error"] [error="open /sys/fs/cgroup/cpu/cpu.cfs_quota_us: no such file or directory"] [stack="github.com/pingcap/parser/terror.MustNil\n\t/nfs/cache/mod/github.com/pingcap/parser@v0.0.0-20210831085004-b5390aa83f65/terror/terror.go:276\nmain.setGlobalVars\n\t/home/jenkins/agent/workspace/optimization-build-tidb-linux-amd/go/src/github.com/pingcap/tidb/tidb-server/main.go:510\nmain.main\n\t/home/jenkins/agent/workspace/optimization-build-tidb-linux-amd/go/src/github.com/pingcap/tidb/tidb-server/main.go:181\nruntime.main\n\t/usr/local/go/src/runtime/proc.go:225"] [stack="github.com/pingcap/parser/terror.MustNil\n\t/nfs/cache/mod/github.com/pingcap/parser@v0.0.0-20210831085004-b5390aa83f65/terror/terror.go:276\nmain.setGlobalVars\n\t/home/jenkins/agent/workspace/optimization-build-tidb-linux-amd/go/src/github.com/pingcap/tidb/tidb-server/main.go:510\nmain.main\n\t/home/jenkins/agent/workspace/optimization-build-tidb-linux-amd/go/src/github.com/pingcap/tidb/tidb-server/main.go:181\nruntime.main\n\t/usr/local/go/src/runtime/proc.go:225"]
�[31mtidb quit: exit status 1
```

The two `stacks` with `\n` and `\t` converted -

```bash
github.com/pingcap/parser/terror.MustNil
    /nfs/cache/mod/github.com/pingcap/parser@v0.0.0-20210831085004-b5390aa83f65/terror/terror.go:276
main.setGlobalVars
    /home/jenkins/agent/workspace/optimization-build-tidb-linux-amd/go/src/github.com/pingcap/tidb/tidb-server/main.go:510
main.main
    /home/jenkins/agent/workspace/optimization-build-tidb-linux-amd/go/src/github.com/pingcap/tidb/tidb-server/main.go:181
runtime.main
    /usr/local/go/src/runtime/proc.go:225
    
    
github.com/pingcap/parser/terror.MustNil
    /nfs/cache/mod/github.com/pingcap/parser@v0.0.0-20210831085004-b5390aa83f65/terror/terror.go:276
main.setGlobalVars
    /home/jenkins/agent/workspace/optimization-build-tidb-linux-amd/go/src/github.com/pingcap/tidb/tidb-server/main.go:510
main.main
    /home/jenkins/agent/workspace/optimization-build-tidb-linux-amd/go/src/github.com/pingcap/tidb/tidb-server/main.go:181
runtime.main
    /usr/local/go/src/runtime/proc.go:225
```

The main error -

```bash
[terror.go:276] ["unexpected error"] [error="open /sys/fs/cgroup/cpu/cpu.cfs_quota_us: no such file or directory"]
```

https://duckduckgo.com/?t=ffab&q=error+%2Fsys%2Ffs%2Fcgroup%2Fcpu%2Fcpu.cfs_quota_us+directory+in+container&ia=web


