I'm learning about databases, especially distributed databases

In the process I stumbled upon TiKV and TiDB based on some past references to them and pingcap

I'm looking to help with some small issues and also learn in the process! :)

I want to contribte to this issue - https://github.com/pingcap/tidb/issues/27180 and learn in the process about small areas of TiDB, for example tests and what they test and try to see if I can understand them

The issue is part of a bigger issue which has many sub tasks. Bigger issue - https://github.com/pingcap/tidb/issues/26022

```bash
$ mkdir tidb
$ cd tidb
$ g clone git@github.com:karuppiah7890/tidb.git
Cloning into 'tidb'...
remote: Enumerating objects: 173307, done.
remote: Counting objects: 100% (549/549), done.
remote: Compressing objects: 100% (415/415), done.
remote: Total 173307 (delta 218), reused 359 (delta 134), pack-reused 172758
Receiving objects: 100% (173307/173307), 176.00 MiB | 7.76 MiB/s, done.
Resolving deltas: 100% (131291/131291), done.
```

Looks like there are many go.mod files, so many go modules within the repo

```bash
tidb $ cd tidb
tidb $ code .
tidb $ fd go.mod
br/tools/go.mod
br/tools/go_mod_guard.go
br/web/go.mod
go.mod
tests/globalkilltest/go.mod
tests/graceshutdown/go.mod
tests/readonlytest/go.mod
tools/check/go.mod
```

I guess I can't enable Go VS Code extension at the root of the repo, it won't work for all Go modules, maybe it will just work for the root repo even if I enable, hmm

For this issue, I need to deal with ddl package

```bash
tidb $ fd ddl
br/tests/br_full_ddl
br/tests/br_incremental_ddl
br/tests/br_incremental_only_ddl
cmd/ddltest
cmd/ddltest/ddl_test.go
ddl
ddl/ddl.go
ddl/ddl_algorithm.go
ddl/ddl_algorithm_test.go
ddl/ddl_api.go
ddl/ddl_test.go
ddl/ddl_worker.go
ddl/ddl_worker_test.go
docs/design/2018-10-08-online-DDL.md
executor/ddl.go
executor/ddl_test.go
metrics/ddl.go
statistics/handle/ddl.go
statistics/handle/ddl_test.go
```

I believe ddl is the usual DB term DDL - Data Definiton Language, we will know soon when I start reading the code

```bash
tidb $ rg package ddl
ddl/util/syncer_test.go
15:package util_test

ddl/attributes_sql_test.go
15:package ddl_test

ddl/placement/errors.go
15:package placement

ddl/placement/constraints.go
15:package placement

ddl/placement/bundle_test.go
15:package placement

ddl/placement/constraint_test.go
15:package placement

ddl/placement/common.go
15:package placement

ddl/placement/rule_test.go
15:package placement

ddl/placement/common_test.go
15:package placement

ddl/placement/rule.go
15:package placement

ddl/placement/constraint.go
15:package placement

ddl/placement/constraints_test.go
15:package placement

ddl/placement/bundle.go
15:package placement

ddl/util/syncer.go
15:package util

ddl/util/dead_table_lock_checker.go
15:package util

ddl/util/util.go
15:package util

ddl/util/event.go
15:package util

ddl/split_region.go
15:package ddl

ddl/table.go
15:package ddl

ddl/column_type_change_test.go
15:package ddl_test

ddl/table_lock.go
15:package ddl

ddl/db_change_test.go
15:package ddl_test

ddl/stat_test.go
15:package ddl

ddl/rollingback_test.go
15:package ddl_test

ddl/index_change_test.go
15:package ddl

ddl/ddl_test.go
15:package ddl

ddl/column_change_test.go
15:package ddl

ddl/foreign_key.go
15:package ddl

ddl/rollingback.go
15:package ddl

ddl/testutil/testutil.go
15:package testutil

ddl/mock.go
15:package ddl

ddl/schema.go
15:package ddl

ddl/column.go
15:package ddl
1391:// reformatErrors casted error because `convertTo` function couldn't package column name and datum value for some errors.

ddl/db_partition_test.go
15:package ddl_test

ddl/restart_test.go
16:package ddl

ddl/reorg.go
15:package ddl

ddl/reorg_test.go
15:package ddl

ddl/options_test.go
15:package ddl_test

ddl/ddl_worker_test.go
15:package ddl

ddl/column_test.go
15:package ddl

ddl/placement_sql_test.go
15:package ddl_test

ddl/foreign_key_test.go
15:package ddl

ddl/stat.go
15:package ddl

ddl/callback_test.go
15:package ddl

ddl/failtest/fail_db_test.go
15:package ddl_test

ddl/ddl_algorithm.go
15:package ddl

ddl/fail_test.go
15:package ddl

ddl/session_pool.go
15:package ddl

ddl/ddl_algorithm_test.go
15:package ddl_test

ddl/sequence.go
15:package ddl

ddl/ddl_api.go
19:package ddl

ddl/generated_column.go
15:package ddl

ddl/callback.go
15:package ddl

ddl/table_split_test.go
15:package ddl_test

ddl/serial_test.go
15:package ddl_test

ddl/label/rule_test.go
15:package label

ddl/db_integration_test.go
15:package ddl_test

ddl/label/rule.go
15:package label

ddl/db_test.go
15:package ddl_test

ddl/delete_range.go
15:package ddl

ddl/label/attributes_test.go
15:package label

ddl/schema_test.go
15:package ddl

ddl/partition_test.go
15:package ddl

ddl/options.go
15:package ddl

ddl/ddl.go
19:package ddl

ddl/sequence_test.go
15:package ddl_test

ddl/error.go
15:package ddl

ddl/index.go
15:package ddl

ddl/backfilling.go
15:package ddl

ddl/table_test.go
15:package ddl

ddl/label/attributes.go
15:package label

ddl/ddl_worker.go
15:package ddl
90:	sessPool        *sessionPool // sessPool is used to new sessions to execute SQL in ddl package.

ddl/partition.go
15:package ddl
tidb $ 

tidb $ rg "package ddl"
ddl/sequence_test.go
15:package ddl_test

ddl/split_region.go
15:package ddl

ddl/attributes_sql_test.go
15:package ddl_test

ddl/table.go
15:package ddl

ddl/stat_test.go
15:package ddl

ddl/column_type_change_test.go
15:package ddl_test

ddl/db_change_test.go
15:package ddl_test

ddl/rollingback_test.go
15:package ddl_test

ddl/table_lock.go
15:package ddl

ddl/ddl_test.go
15:package ddl

ddl/index_change_test.go
15:package ddl

ddl/foreign_key.go
15:package ddl

ddl/rollingback.go
15:package ddl

ddl/column.go
15:package ddl

ddl/schema.go
15:package ddl

ddl/mock.go
15:package ddl

ddl/reorg.go
15:package ddl

ddl/db_partition_test.go
15:package ddl_test

ddl/column_change_test.go
15:package ddl

ddl/stat.go
15:package ddl

ddl/options_test.go
15:package ddl_test

ddl/restart_test.go
16:package ddl

ddl/reorg_test.go
15:package ddl

ddl/generated_column.go
15:package ddl

ddl/ddl_worker_test.go
15:package ddl

ddl/foreign_key_test.go
15:package ddl

ddl/placement_sql_test.go
15:package ddl_test

ddl/session_pool.go
15:package ddl

ddl/column_test.go
15:package ddl

ddl/sequence.go
15:package ddl

ddl/callback_test.go
15:package ddl

ddl/ddl_api.go
19:package ddl

ddl/failtest/fail_db_test.go
15:package ddl_test

ddl/ddl_algorithm.go
15:package ddl

ddl/ddl_algorithm_test.go
15:package ddl_test

ddl/fail_test.go
15:package ddl

ddl/db_integration_test.go
15:package ddl_test

ddl/serial_test.go
15:package ddl_test

ddl/delete_range.go
15:package ddl

ddl/db_test.go
15:package ddl_test

ddl/callback.go
15:package ddl

ddl/partition_test.go
15:package ddl

ddl/table_split_test.go
15:package ddl_test

ddl/options.go
15:package ddl

ddl/backfilling.go
15:package ddl

ddl/schema_test.go
15:package ddl

ddl/ddl.go
19:package ddl

ddl/partition.go
15:package ddl

ddl/error.go
15:package ddl

ddl/ddl_worker.go
15:package ddl

ddl/index.go
15:package ddl

ddl/table_test.go
15:package ddl

cmd/ddltest/column_test.go
15:package ddltest

cmd/ddltest/ddl_test.go
15:package ddltest

cmd/ddltest/random.go
15:package ddltest

cmd/ddltest/index_test.go
15:package ddltest
tidb $ rg "package ddl" -l
ddl/table_test.go
ddl/attributes_sql_test.go
ddl/table.go
ddl/split_region.go
ddl/column_type_change_test.go
ddl/stat_test.go
ddl/db_change_test.go
ddl/table_lock.go
ddl/rollingback_test.go
ddl/index_change_test.go
ddl/ddl_test.go
ddl/column_change_test.go
ddl/foreign_key.go
ddl/column.go
ddl/rollingback.go
ddl/schema.go
ddl/db_partition_test.go
ddl/mock.go
ddl/reorg.go
ddl/options_test.go
ddl/stat.go
ddl/restart_test.go
ddl/reorg_test.go
ddl/ddl_worker_test.go
ddl/placement_sql_test.go
ddl/generated_column.go
ddl/column_test.go
ddl/foreign_key_test.go
ddl/sequence.go
ddl/ddl_api.go
ddl/session_pool.go
ddl/callback_test.go
ddl/failtest/fail_db_test.go
ddl/ddl_algorithm_test.go
ddl/ddl_algorithm.go
ddl/db_integration_test.go
ddl/fail_test.go
ddl/db_test.go
ddl/delete_range.go
ddl/serial_test.go
ddl/callback.go
ddl/table_split_test.go
ddl/partition_test.go
ddl/options.go
ddl/ddl.go
ddl/partition.go
ddl/sequence_test.go
ddl/backfilling.go
ddl/schema_test.go
ddl/ddl_worker.go
ddl/error.go
ddl/index.go
cmd/ddltest/ddl_test.go
cmd/ddltest/column_test.go
cmd/ddltest/random.go
cmd/ddltest/index_test.go
tidb $ 
```

I have to check about many packages I guess? Maybe for now just the test files in `ddl` directory I guess, let's see

I might have to create more subtasks before I get into the PR, hmm

```bash
tidb $ fd ddl
br/tests/br_full_ddl
br/tests/br_incremental_ddl
br/tests/br_incremental_only_ddl
cmd/ddltest
cmd/ddltest/ddl_test.go
ddl
ddl/ddl.go
ddl/ddl_algorithm.go
ddl/ddl_algorithm_test.go
ddl/ddl_api.go
ddl/ddl_test.go
ddl/ddl_worker.go
ddl/ddl_worker_test.go
docs/design/2018-10-08-online-DDL.md
executor/ddl.go
executor/ddl_test.go
metrics/ddl.go
statistics/handle/ddl.go
statistics/handle/ddl_test.go
tidb $ fd . ddl
ddl/attributes_sql_test.go
ddl/backfilling.go
ddl/callback.go
ddl/callback_test.go
ddl/column.go
ddl/column_change_test.go
ddl/column_test.go
ddl/column_type_change_test.go
ddl/db_change_test.go
ddl/db_integration_test.go
ddl/db_partition_test.go
ddl/db_test.go
ddl/ddl.go
ddl/ddl_algorithm.go
ddl/ddl_algorithm_test.go
ddl/ddl_api.go
ddl/ddl_test.go
ddl/ddl_worker.go
ddl/ddl_worker_test.go
ddl/delete_range.go
ddl/error.go
ddl/fail_test.go
ddl/failtest
ddl/failtest/fail_db_test.go
ddl/foreign_key.go
ddl/foreign_key_test.go
ddl/generated_column.go
ddl/index.go
ddl/index_change_test.go
ddl/label
ddl/label/attributes.go
ddl/label/attributes_test.go
ddl/label/rule.go
ddl/label/rule_test.go
ddl/mock.go
ddl/options.go
ddl/options_test.go
ddl/partition.go
ddl/partition_test.go
ddl/placement
ddl/placement/bundle.go
ddl/placement/bundle_test.go
ddl/placement/common.go
ddl/placement/common_test.go
ddl/placement/constraint.go
ddl/placement/constraint_test.go
ddl/placement/constraints.go
ddl/placement/constraints_test.go
ddl/placement/errors.go
ddl/placement/rule.go
ddl/placement/rule_test.go
ddl/placement_sql_test.go
ddl/reorg.go
ddl/reorg_test.go
ddl/restart_test.go
ddl/rollingback.go
ddl/rollingback_test.go
ddl/schema.go
ddl/schema_test.go
ddl/sequence.go
ddl/sequence_test.go
ddl/serial_test.go
ddl/session_pool.go
ddl/split_region.go
ddl/stat.go
ddl/stat_test.go
ddl/table.go
ddl/table_lock.go
ddl/table_split_test.go
ddl/table_test.go
ddl/testutil
ddl/testutil/testutil.go
ddl/util
ddl/util/dead_table_lock_checker.go
ddl/util/event.go
ddl/util/syncer.go
ddl/util/syncer_test.go
ddl/util/util.go
tidb $ fd . ddl | rg test
ddl/attributes_sql_test.go
ddl/callback_test.go
ddl/column_change_test.go
ddl/column_test.go
ddl/column_type_change_test.go
ddl/db_change_test.go
ddl/db_integration_test.go
ddl/db_partition_test.go
ddl/db_test.go
ddl/ddl_algorithm_test.go
ddl/ddl_test.go
ddl/ddl_worker_test.go
ddl/fail_test.go
ddl/failtest
ddl/failtest/fail_db_test.go
ddl/foreign_key_test.go
ddl/index_change_test.go
ddl/label/attributes_test.go
ddl/label/rule_test.go
ddl/options_test.go
ddl/partition_test.go
ddl/placement/bundle_test.go
ddl/placement/common_test.go
ddl/placement/constraint_test.go
ddl/placement/constraints_test.go
ddl/placement/rule_test.go
ddl/placement_sql_test.go
ddl/reorg_test.go
ddl/restart_test.go
ddl/rollingback_test.go
ddl/schema_test.go
ddl/sequence_test.go
ddl/serial_test.go
ddl/stat_test.go
ddl/table_split_test.go
ddl/table_test.go
ddl/testutil
ddl/testutil/testutil.go
ddl/util/syncer_test.go
tidb $ 
```

Before I do anything, let me go read the `CONTRIBUTING.md` file first!

And also look at other PRs that solve similar issues which are under https://github.com/pingcap/tidb/issues/26022

I just saw the contributing.md which links to https://github.com/pingcap/community/blob/master/contributors/README.md and I'm reading that

I have agreed to the Contributor License Agreement here https://cla-assistant.io/pingcap/tidb

I'm also able to build TiDB

```bash
tidb $ gst
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
tidb $ make
CGO_ENABLED=1 GO111MODULE=on go build  -tags codes  -ldflags '-X "github.com/pingcap/parser/mysql.TiDBReleaseVersion=v5.2.0-alpha-762-g35c27e4b1" -X "github.com/pingcap/tidb/util/versioninfo.TiDBBuildTS=2021-08-29 13:53:18" -X "github.com/pingcap/tidb/util/versioninfo.TiDBGitHash=35c27e4b1c491e1b914d566180be3febc36c335a" -X "github.com/pingcap/tidb/util/versioninfo.TiDBGitBranch=master" -X "github.com/pingcap/tidb/util/versioninfo.TiDBEdition=Community" ' -o bin/tidb-server tidb-server/main.go
go: downloading github.com/pingcap/parser v0.0.0-20210823033705-7a7940986a30
go: downloading github.com/pingcap/tidb-tools v5.0.3+incompatible
go: downloading github.com/pingcap/failpoint v0.0.0-20210316064728-7acb0f0a3dfd
go: downloading github.com/pingcap/errors v0.11.5-0.20210425183316-da1aaba5fb63
go: downloading github.com/pingcap/log v0.0.0-20210818144256-6455d4a4c6f9
go: downloading github.com/tikv/client-go/v2 v2.0.0-alpha.0.20210824090536-16d902a3c7e5
go: downloading github.com/tikv/pd v1.1.0-beta.0.20210818082359-acba1da0018d
go: downloading go.uber.org/automaxprocs v1.4.0
go: downloading go.uber.org/zap v1.19.0
go: downloading github.com/uber/jaeger-client-go v2.22.1+incompatible
go: downloading github.com/ngaut/pools v0.0.0-20180318154953-b7bc8c42aac7
go: downloading github.com/ngaut/sync2 v0.0.0-20141008032647-7a24ed77b2ef
go: downloading go.etcd.io/etcd v0.5.0-alpha.5.0.20200824191128-ae9734ed278b
go: downloading google.golang.org/grpc v1.29.1
go: downloading github.com/coocood/freecache v1.1.1
go: downloading github.com/pingcap/kvproto v0.0.0-20210806074406-317f69fb54b4
go: downloading github.com/pingcap/tipb v0.0.0-20210708040514-0f154bb0dc0f
go: downloading github.com/cznic/mathutil v0.0.0-20181122101859-297441e03548
go: downloading github.com/twmb/murmur3 v1.1.3
go: downloading go.uber.org/atomic v1.9.0
go: downloading github.com/uber-go/atomic v1.4.0
go: downloading github.com/danjacques/gofslock v0.0.0-20191023191349-0a45f885bc37
go: downloading github.com/blacktear23/go-proxyprotocol v0.0.0-20180807104634-af7a81e8dd0d
go: downloading github.com/pingcap/fn v0.0.0-20200306044125-d5540d389059
go: downloading github.com/pingcap/sysutil v0.0.0-20210730114356-fcd8a63f68c5
go: downloading github.com/tiancaiamao/appdash v0.0.0-20181126055449-889f96f722a2
go: downloading sourcegraph.com/sourcegraph/appdash-data v0.0.0-20151005221446-73f23eafcf67
go: downloading github.com/grpc-ecosystem/go-grpc-middleware v1.1.0
go: downloading github.com/cznic/sortutil v0.0.0-20181122101858-f5f958428db8
go: downloading github.com/shirou/gopsutil v3.21.2+incompatible
go: downloading github.com/google/pprof v0.0.0-20210609004039-a478d1d731e9
go: downloading github.com/prometheus/procfs v0.0.8
go: downloading github.com/iancoleman/strcase v0.0.0-20191112232945-16388991a334
go: downloading github.com/uber/jaeger-lib v2.4.1+incompatible
go: downloading github.com/dgryski/go-farm v0.0.0-20190423205320-6a90982ecee2
go: downloading golang.org/x/text v0.3.7
go: downloading github.com/dgraph-io/ristretto v0.0.1
go: downloading golang.org/x/sys v0.0.0-20210630005230-0f9fa26af87c
go: downloading github.com/remyoudompheng/bigfft v0.0.0-20200410134404-eec4a21b6bb0
go: downloading github.com/golang/snappy v0.0.3
go: downloading github.com/wangjohn/quickselect v0.0.0-20161129230411-ed8402a42d5f
go: downloading cloud.google.com/go/storage v1.6.0
go: downloading github.com/aws/aws-sdk-go v1.35.3
go: downloading google.golang.org/api v0.22.0
go: downloading github.com/spf13/cobra v1.0.0
go: downloading github.com/json-iterator/go v1.1.9
go: downloading google.golang.org/genproto v0.0.0-20200305110556-506484158171
go: downloading github.com/tklauser/go-sysconf v0.3.4
go: downloading github.com/pingcap/badger v1.5.1-0.20210828064554-21c3176422cb
go: downloading github.com/pingcap/goleveldb v0.0.0-20191226122134-f82aafb29989
go: downloading github.com/klauspost/compress v1.11.7
go: downloading github.com/ncw/directio v1.0.4
go: downloading github.com/pingcap/errcode v0.3.0
go: downloading github.com/unrolled/render v1.0.1
go: downloading github.com/urfave/negroni v1.0.0
go: downloading github.com/coocood/rtutil v0.0.0-20190304133409-c84515f646f2
go: downloading github.com/coocood/bbloom v0.0.0-20190830030839-58deb6228d64
go: downloading github.com/juju/ratelimit v1.0.1
go: downloading github.com/montanaflynn/stats v0.5.0
go: downloading github.com/klauspost/cpuid v1.2.1
go: downloading github.com/phf/go-queue v0.0.0-20170504031614-9abe38d0371d
go: downloading github.com/syndtr/goleveldb v1.0.1-0.20190318030020-c3a204f8e965
go: downloading github.com/grpc-ecosystem/grpc-gateway v1.12.1
go: downloading golang.org/x/crypto v0.0.0-20200820211705-5c72a883971a
go: downloading github.com/gorilla/websocket v1.4.0
Build TiDB Server successfully!
tidb $ 
```

---

Now checking some dev guide stuff

https://pingcap.github.io/tidb-dev-guide/

https://pingcap.github.io/tidb-dev-guide/get-started/introduction.html

https://pingcap.github.io/tidb-dev-guide/get-started/install-golang.html

I'm gonna keep using go 1.17 and see how it goes!

https://pingcap.github.io/tidb-dev-guide/get-started/build-tidb-from-source.html



```
tidb $ code .
^Ctidb $ brew info mysql
mysql: stable 8.0.26 (bottled)
Open source relational database management system
https://dev.mysql.com/doc/refman/8.0/en/
Conflicts with:
  mariadb (because mysql, mariadb, and percona install the same binaries)
  percona-server (because mysql, mariadb, and percona install the same binaries)
Not installed
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/mysql.rb
License: GPL-2.0-only with Universal-FOSS-exception-1.0
==> Dependencies
Build: cmake ✘, pkg-config ✔
Required: icu4c ✔, libevent ✔, lz4 ✘, openssl@1.1 ✔, protobuf ✘, zstd ✘
==> Caveats
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

To start mysql:
  brew services start mysql
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/mysql/bin/mysqld_safe --datadir=/usr/local/var/mysql
==> Analytics
install: 64,739 (30 days), 204,568 (90 days), 908,371 (365 days)
install-on-request: 64,445 (30 days), 203,560 (90 days), 897,407 (365 days)
build-error: 0 (30 days)
tidb $ per
periodic        perl5.30        perlbug5.30     perldoc5.30     perlivp5.30     perlthanks5.30  
perl            perlbug         perldoc         perlivp         perlthanks      
perl5.18        perlbug5.18     perldoc5.18     perlivp5.18     perlthanks5.18  
tidb $ brew info mariadb
mariadb: stable 10.6.4 (bottled)
Drop-in replacement for MySQL
https://mariadb.org/
Conflicts with:
  mariadb-connector-c (because both install `mariadb_config`)
  mysql (because mariadb, mysql, and percona install the same binaries)
  mytop (because both install `mytop` binaries)
  percona-server (because mariadb, mysql, and percona install the same binaries)
Not installed
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/mariadb.rb
License: GPL-2.0-only
==> Dependencies
Build: bison ✘, cmake ✘, pkg-config ✔
Required: groonga ✘, openssl@1.1 ✔, pcre2 ✔
==> Caveats
A "/etc/my.cnf" from another install may interfere with a Homebrew-built
server starting up correctly.

MySQL is configured to only allow connections from localhost by default

To have launchd start mariadb now and restart at login:
  brew services start mariadb
Or, if you don't want/need a background service you can just run:
  mysql.server start
==> Analytics
install: 13,826 (30 days), 39,096 (90 days), 165,465 (365 days)
install-on-request: 13,803 (30 days), 39,041 (90 days), 164,617 (365 days)
build-error: 0 (30 days)
tidb $ brew info percona-server
percona-server: stable 8.0.25-15 (bottled)
Drop-in MySQL replacement
https://www.percona.com
Conflicts with:
  mariadb (because percona, mariadb, and mysql install the same binaries)
  mysql (because percona, mariadb, and mysql install the same binaries)
Not installed
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/percona-server.rb
License: BSD-3-Clause
==> Dependencies
Build: cmake ✘, pkg-config ✔
Required: icu4c ✔, libevent ✔, lz4 ✘, openssl@1.1 ✔, protobuf ✘, zstd ✘
==> Caveats
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation
MySQL is configured to only allow connections from localhost by default
To connect run:
    mysql -uroot

To have launchd start percona-server now and restart at login:
  brew services start percona-server
Or, if you don't want/need a background service you can just run:
  mysql.server start
==> Analytics
install: 226 (30 days), 723 (90 days), 2,308 (365 days)
install-on-request: 220 (30 days), 701 (90 days), 2,228 (365 days)
build-error: 0 (30 days)
tidb $ 
```

---

Installing MySQL to get the client and the server too. But mainly the client

```bash
tidb $ brew install mysql
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 2 taps (homebrew/core and homebrew/cask).
==> Updated Formulae
Updated 5 formulae.
==> Updated Casks
Updated 9 casks.

==> Downloading https://ghcr.io/v2/homebrew/core/lz4/manifests/1.9.3
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/lz4/blobs/sha256:7024d0b6ee857352cbd3138f752496b87fa27252adbc6daefa4
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:7024d0b6ee857352cbd3138f752496b8
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/protobuf/manifests/3.17.3
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/protobuf/blobs/sha256:d1060a6f73000c9c46a1954397a6375fb41c409d7b3cb7
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:d1060a6f73000c9c46a1954397a6375f
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/zstd/manifests/1.5.0
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/zstd/blobs/sha256:eae17621cfc664d6e527a6d6aa6a000343eced0f60c81b4e2d
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:eae17621cfc664d6e527a6d6aa6a0003
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/mysql/manifests/8.0.26-1
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/mysql/blobs/sha256:5ad5be7141887ef52146e9d8950efdbcf3fbb99ca2dd1f3e3
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:5ad5be7141887ef52146e9d8950efdbc
######################################################################## 100.0%
==> Installing dependencies for mysql: lz4, protobuf and zstd
==> Installing mysql dependency: lz4
==> Pouring lz4--1.9.3.big_sur.bottle.tar.gz
🍺  /usr/local/Cellar/lz4/1.9.3: 22 files, 657.8KB
==> Installing mysql dependency: protobuf
==> Pouring protobuf--3.17.3.big_sur.bottle.tar.gz
🍺  /usr/local/Cellar/protobuf/3.17.3: 210 files, 18.0MB
==> Installing mysql dependency: zstd
==> Pouring zstd--1.5.0.big_sur.bottle.tar.gz
🍺  /usr/local/Cellar/zstd/1.5.0: 31 files, 3.5MB
==> Installing mysql
==> Pouring mysql--8.0.26.big_sur.bottle.1.tar.gz
==> /usr/local/Cellar/mysql/8.0.26/bin/mysqld --initialize-insecure --user=karuppiahn --basedir=/usr/local/Cellar/mys
==> Caveats
We\'ve installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

To start mysql:
  brew services start mysql
Or, if you don\'t want/need a background service you can just run:
  /usr/local/opt/mysql/bin/mysqld_safe --datadir=/usr/local/var/mysql
==> Summary
🍺  /usr/local/Cellar/mysql/8.0.26: 304 files, 296MB
==> Caveats
==> mysql
We\'ve installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

To start mysql:
  brew services start mysql
Or, if you don\'t want/need a background service you can just run:
  /usr/local/opt/mysql/bin/mysqld_safe --datadir=/usr/local/var/mysql
```

I already have TiDB built, so let me run it and connect to it! ;)

```bash
Last login: Sun Aug 29 19:42:57 on ttys003
tidb $ mysql -h 127.0.0.1 -P 4000 -u root -D test --prompt="tidb> " --comments

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.7.25-TiDB-v5.2.0-alpha-762-g35c27e4b1 TiDB Server (Apache License 2.0) Community Edition, MySQL 5.7 compatible

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

tidb> 
tidb> \h

For information about MySQL products and services, visit:
   http://www.mysql.com/
For developer information, including the MySQL Reference Manual, visit:
   http://dev.mysql.com/
To buy MySQL Enterprise support, training, or other products, visit:
   https://shop.mysql.com/

List of all MySQL commands:
Note that all text commands must be first on line and end with ';'
?         (\?) Synonym for `help'.
clear     (\c) Clear the current input statement.
connect   (\r) Reconnect to the server. Optional arguments are db and host.
delimiter (\d) Set statement delimiter.
edit      (\e) Edit command with $EDITOR.
ego       (\G) Send command to mysql server, display result vertically.
exit      (\q) Exit mysql. Same as quit.
go        (\g) Send command to mysql server.
help      (\h) Display this help.
nopager   (\n) Disable pager, print to stdout.
notee     (\t) Don't write into outfile.
pager     (\P) Set PAGER [to_pager]. Print the query results via PAGER.
print     (\p) Print current command.
prompt    (\R) Change your mysql prompt.
quit      (\q) Quit mysql.
rehash    (\#) Rebuild completion hash.
source    (\.) Execute an SQL script file. Takes a file name as an argument.
status    (\s) Get status information from the server.
system    (\!) Execute a system shell command.
tee       (\T) Set outfile [to_outfile]. Append everything into given outfile.
use       (\u) Use another database. Takes database name as argument.
charset   (\C) Switch to another charset. Might be needed for processing binlog with multi-byte charsets.
warnings  (\W) Show warnings after every statement.
nowarning (\w) Don't show warnings after every statement.
resetconnection(\x) Clean session context.
query_attributes Sets string parameters (name1 value1 name2 value2 ...) for the next query to pick up.

For server side help, type 'help contents'

tidb> show tables
    -> ;
Empty set (0.00 sec)

tidb> 
tidb> ^DBye
tidb $ 
```

No idea what to do in MySQL client :P I could create tables, but...meh

Or, I could create a dummy table, hmm

https://duckduckgo.com/?t=ffab&q=dummy+dabatase+table&ia=web

http://filldb.info/

http://filldb.info/dummy

```sql
CREATE TABLE `authors` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',
	`last_name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',
	`email` VARCHAR(100) NOT NULL COLLATE 'utf8_unicode_ci',
	`birthdate` DATE NOT NULL,
	`added` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `email` (`email`)
)
```

and it worked! and `show tables` was right too ;)

```bash
tidb $ mysql -h 127.0.0.1 -P 4000 -u root -D test --prompt="tidb> " --comments
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 5
Server version: 5.7.25-TiDB-v5.2.0-alpha-762-g35c27e4b1 TiDB Server (Apache License 2.0) Community Edition, MySQL 5.7 compatible

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

tidb> CREATE TABLE `authors` (
    -> `id` INT(11) NOT NULL AUTO_INCREMENT,
    -> `first_name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',
    -> `last_name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',
    -> `email` VARCHAR(100) NOT NULL COLLATE 'utf8_unicode_ci',
    -> `birthdate` DATE NOT NULL,
    -> `added` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY (`id`),
    -> UNIQUE INDEX `email` (`email`)
    -> )
    -> ;
Query OK, 0 rows affected (0.01 sec)

tidb> show tables
    -> ;
+----------------+
| Tables_in_test |
+----------------+
| authors        |
+----------------+
1 row in set (0.00 sec)

tidb> 
tidb> ^DBye
tidb $ 
```

Interesting! ;) It worked!!

The TiDB server logs -

```bash
tidb $ ./bin/tidb-server 
[2021/08/29 20:09:05.327 +05:30] [INFO] [printer.go:34] ["Welcome to TiDB."] ["Release Version"=v5.2.0-alpha-762-g35c27e4b1] [Edition=Community] ["Git Commit Hash"=35c27e4b1c491e1b914d566180be3febc36c335a] ["Git Branch"=master] ["UTC Build Time"="2021-08-29 13:53:18"] [GoVersion=go1.17] ["Race Enabled"=false] ["Check Table Before Drop"=false] ["TiKV Min Version"=v3.0.0-60965b006877ca7234adaced7890d7b029ed1306]
[2021/08/29 20:09:05.327 +05:30] [INFO] [trackerRecorder.go:29] ["Mem Profile Tracker started"]
[2021/08/29 20:09:05.328 +05:30] [INFO] [printer.go:48] ["loaded config"] [config="{\"host\":\"0.0.0.0\",\"advertise-address\":\"192.168.1.2\",\"port\":4000,\"cors\":\"\",\"store\":\"unistore\",\"path\":\"/tmp/tidb\",\"socket\":\"\",\"lease\":\"45s\",\"run-ddl\":true,\"split-table\":true,\"token-limit\":1000,\"oom-use-tmp-storage\":true,\"tmp-storage-path\":\"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/501_tidb/MC4wLjAuMDo0MDAwLzAuMC4wLjA6MTAwODA=/tmp-storage\",\"oom-action\":\"cancel\",\"mem-quota-query\":1073741824,\"tmp-storage-quota\":-1,\"enable-batch-dml\":false,\"lower-case-table-names\":2,\"server-version\":\"\",\"log\":{\"level\":\"info\",\"format\":\"text\",\"disable-timestamp\":null,\"enable-timestamp\":null,\"disable-error-stack\":null,\"enable-error-stack\":null,\"file\":{\"filename\":\"\",\"max-size\":300,\"max-days\":0,\"max-backups\":0},\"enable-slow-log\":true,\"slow-query-file\":\"tidb-slow.log\",\"slow-threshold\":300,\"expensive-threshold\":10000,\"query-log-max-len\":4096,\"record-plan-in-slow-log\":1},\"security\":{\"skip-grant-table\":false,\"ssl-ca\":\"\",\"ssl-cert\":\"\",\"ssl-key\":\"\",\"require-secure-transport\":false,\"cluster-ssl-ca\":\"\",\"cluster-ssl-cert\":\"\",\"cluster-ssl-key\":\"\",\"cluster-verify-cn\":null,\"spilled-file-encryption-method\":\"plaintext\",\"enable-sem\":false,\"auto-tls\":true,\"tls-version\":\"\"},\"status\":{\"status-host\":\"0.0.0.0\",\"metrics-addr\":\"\",\"status-port\":10080,\"metrics-interval\":15,\"report-status\":true,\"record-db-qps\":false},\"performance\":{\"max-procs\":0,\"max-memory\":0,\"server-memory-quota\":0,\"memory-usage-alarm-ratio\":0.8,\"stats-lease\":\"3s\",\"stmt-count-limit\":5000,\"feedback-probability\":0,\"query-feedback-limit\":512,\"pseudo-estimate-ratio\":0.8,\"force-priority\":\"NO_PRIORITY\",\"bind-info-lease\":\"3s\",\"txn-entry-size-limit\":6291456,\"txn-total-size-limit\":104857600,\"tcp-keep-alive\":true,\"tcp-no-delay\":true,\"cross-join\":true,\"run-auto-analyze\":true,\"distinct-agg-push-down\":false,\"committer-concurrency\":128,\"max-txn-ttl\":3600000,\"mem-profile-interval\":\"1m\",\"index-usage-sync-lease\":\"0s\",\"gogc\":100,\"enforce-mpp\":false},\"prepared-plan-cache\":{\"enabled\":false,\"capacity\":100,\"memory-guard-ratio\":0.1},\"opentracing\":{\"enable\":false,\"rpc-metrics\":false,\"sampler\":{\"type\":\"const\",\"param\":1,\"sampling-server-url\":\"\",\"max-operations\":0,\"sampling-refresh-interval\":0},\"reporter\":{\"queue-size\":0,\"buffer-flush-interval\":0,\"log-spans\":false,\"local-agent-host-port\":\"\"}},\"proxy-protocol\":{\"networks\":\"\",\"header-timeout\":5},\"pd-client\":{\"pd-server-timeout\":3},\"tikv-client\":{\"grpc-connection-count\":4,\"grpc-keepalive-time\":10,\"grpc-keepalive-timeout\":3,\"grpc-compression-type\":\"none\",\"commit-timeout\":\"41s\",\"async-commit\":{\"keys-limit\":256,\"total-key-size-limit\":4096,\"safe-window\":2000000000,\"allowed-clock-drift\":500000000},\"max-batch-size\":128,\"overload-threshold\":200,\"max-batch-wait-time\":0,\"batch-wait-size\":8,\"enable-chunk-rpc\":true,\"region-cache-ttl\":600,\"store-limit\":0,\"store-liveness-timeout\":\"1s\",\"copr-cache\":{\"capacity-mb\":1000},\"ttl-refreshed-txn-size\":33554432},\"binlog\":{\"enable\":false,\"ignore-error\":false,\"write-timeout\":\"15s\",\"binlog-socket\":\"\",\"strategy\":\"range\"},\"compatible-kill-query\":false,\"plugin\":{\"dir\":\"\",\"load\":\"\"},\"pessimistic-txn\":{\"max-retry-count\":256,\"deadlock-history-capacity\":10,\"deadlock-history-collect-retryable\":false},\"check-mb4-value-in-utf8\":true,\"max-index-length\":3072,\"index-limit\":64,\"table-column-count-limit\":1017,\"graceful-wait-before-shutdown\":0,\"alter-primary-key\":false,\"treat-old-version-utf8-as-utf8mb4\":true,\"enable-table-lock\":false,\"delay-clean-table-lock\":0,\"split-region-max-num\":1000,\"stmt-summary\":{\"enable\":true,\"enable-internal-query\":false,\"max-stmt-count\":3000,\"max-sql-length\":4096,\"refresh-interval\":1800,\"history-size\":24},\"repair-mode\":false,\"repair-table-list\":[],\"isolation-read\":{\"engines\":[\"tikv\",\"tiflash\",\"tidb\"]},\"max-server-connections\":0,\"new_collations_enabled_on_first_bootstrap\":false,\"experimental\":{},\"enable-collect-execution-info\":true,\"skip-register-to-dashboard\":false,\"enable-telemetry\":true,\"labels\":{},\"enable-global-index\":false,\"deprecate-integer-display-length\":false,\"enable-enum-length-limit\":true,\"stores-refresh-interval\":60,\"enable-tcp4-only\":false,\"enable-forwarding\":false}"]
[2021/08/29 20:09:05.328 +05:30] [INFO] [main.go:337] ["disable Prometheus push client"]
[2021/08/29 20:09:05.328 +05:30] [INFO] [store.go:69] ["new store"] [path=unistore:///tmp/tidb]
[2021/08/29 20:09:05.328 +05:30] [INFO] [systime_mon.go:26] ["start system time monitor"]
[2021/08/29 20:09:05.394 +05:30] [INFO] [store.go:75] ["new store with retry success"]
[2021/08/29 20:09:05.394 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=11e0380d-e571-45e3-b06a-12ca4793aafd] ["ddl lease"=45s] ["stats lease"=3s] ["index usage sync lease"=0s]
[2021/08/29 20:09:05.396 +05:30] [INFO] [ddl.go:343] ["[ddl] start DDL"] [ID=a936af8e-1603-4f44-ae26-0e97ffdb5546] [runWorker=true]
[2021/08/29 20:09:05.396 +05:30] [INFO] [ddl.go:332] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/08/29 20:09:05.396 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/08/29 20:09:05.396 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 2, tp add index"]
[2021/08/29 20:09:05.396 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 1, tp general"]
[2021/08/29 20:09:05.397 +05:30] [INFO] [domain.go:156] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=0] ["start time"=869.828µs]
[2021/08/29 20:09:05.397 +05:30] [INFO] [domain.go:371] ["full load and reset schema validator"]
[2021/08/29 20:09:05.397 +05:30] [INFO] [tidb.go:243] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/08/29 20:09:05.398 +05:30] [WARN] [session.go:1571] ["run statement failed"] [schemaVersion=0] [error="[schema:1049]Unknown database 'mysql'"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 0,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/08/29 20:09:05.398 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=0] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS test"] [user=]
[2021/08/29 20:09:05.399 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.399 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS test"]
[2021/08/29 20:09:05.399 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.400 +05:30] [INFO] [domain.go:156] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=1] ["start time"=773.8µs]
[2021/08/29 20:09:05.400 +05:30] [INFO] [domain.go:371] ["full load and reset schema validator"]
[2021/08/29 20:09:05.402 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=1] ["take time"=2.501716ms] [job="ID:2, Type:create schema, State:done, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.402 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:synced, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.402 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=2]
[2021/08/29 20:09:05.402 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.402 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=1] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS `mysql`"] [user=]
[2021/08/29 20:09:05.403 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.403 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS `mysql`"]
[2021/08/29 20:09:05.403 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.403 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=1] [neededSchemaVersion=2] ["start time"=34.009µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/08/29 20:09:05.406 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=2] ["take time"=2.41287ms] [job="ID:4, Type:create schema, State:done, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.406 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:synced, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.406 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=4]
[2021/08/29 20:09:05.406 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.407 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=2] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"] [user=]
[2021/08/29 20:09:05.407 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.407 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.407 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.407 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"]
[2021/08/29 20:09:05.408 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.407 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.409 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=2] [neededSchemaVersion=3] ["start time"=316.026µs] [phyTblIDs="[5]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.411 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=3] ["take time"=2.210119ms] [job="ID:6, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.407 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.412 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.407 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.413 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=6]
[2021/08/29 20:09:05.413 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.413 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=3] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(60) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"] [user=]
[2021/08/29 20:09:05.413 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=2] ["first split key"=748000000000000005]
[2021/08/29 20:09:05.413 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=2] ["first at"=748000000000000005] ["first new region left"="{Id:2 StartKey: EndKey:7480000000000000ff0500000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:3 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.413 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[2]"]
[2021/08/29 20:09:05.414 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.414 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(60) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"]
[2021/08/29 20:09:05.414 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.414 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=3] [neededSchemaVersion=4] ["start time"=119.557µs] [phyTblIDs="[7]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.417 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=4] ["take time"=2.572389ms] [job="ID:8, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.417 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.418 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=8]
[2021/08/29 20:09:05.418 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.418 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=4] ["first split key"=748000000000000007]
[2021/08/29 20:09:05.418 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=4] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(60),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"] [user=]
[2021/08/29 20:09:05.418 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=4] ["first at"=748000000000000007] ["first new region left"="{Id:4 StartKey:7480000000000000ff0500000000000000f8 EndKey:7480000000000000ff0700000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:5 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.418 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[4]"]
[2021/08/29 20:09:05.419 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.418 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.419 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.418 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(60),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"]
[2021/08/29 20:09:05.419 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.418 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.420 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=4] [neededSchemaVersion=5] ["start time"=292.901µs] [phyTblIDs="[9]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.423 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=5] ["take time"=2.508764ms] [job="ID:10, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.418 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.423 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.418 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.424 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=10]
[2021/08/29 20:09:05.424 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.424 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=4] ["first split key"=748000000000000009]
[2021/08/29 20:09:05.424 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=5] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(60),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"] [user=]
[2021/08/29 20:09:05.424 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.424 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(60),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"]
[2021/08/29 20:09:05.424 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.425 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=5] [neededSchemaVersion=6] ["start time"=164.547µs] [phyTblIDs="[11]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.426 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=6] ["first at"=748000000000000009] ["first new region left"="{Id:6 StartKey:7480000000000000ff0700000000000000f8 EndKey:7480000000000000ff0900000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:7 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.426 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[6]"]
[2021/08/29 20:09:05.427 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=6] ["take time"=2.157316ms] [job="ID:12, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.427 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.424 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.428 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=12]
[2021/08/29 20:09:05.428 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.428 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=6] ["first split key"=74800000000000000b]
[2021/08/29 20:09:05.428 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=6] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(60),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"] [user=]
[2021/08/29 20:09:05.429 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.429 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.429 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.429 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(60),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"]
[2021/08/29 20:09:05.429 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.429 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.430 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=6] [neededSchemaVersion=7] ["start time"=159.9µs] [phyTblIDs="[13]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.431 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=8] ["first at"=74800000000000000b] ["first new region left"="{Id:8 StartKey:7480000000000000ff0900000000000000f8 EndKey:7480000000000000ff0b00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:9 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.431 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[8]"]
[2021/08/29 20:09:05.432 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=7] ["take time"=2.239904ms] [job="ID:14, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.429 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.433 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.429 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.434 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=14]
[2021/08/29 20:09:05.434 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.434 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=8] ["first split key"=74800000000000000d]
[2021/08/29 20:09:05.434 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=7] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"] [user=]
[2021/08/29 20:09:05.434 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.434 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.434 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.434 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"]
[2021/08/29 20:09:05.435 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.434 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.435 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=7] [neededSchemaVersion=8] ["start time"=107.48µs] [phyTblIDs="[15]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.436 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=10] ["first at"=74800000000000000d] ["first new region left"="{Id:10 StartKey:7480000000000000ff0b00000000000000f8 EndKey:7480000000000000ff0d00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:11 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.436 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[10]"]
[2021/08/29 20:09:05.438 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=8] ["take time"=2.354047ms] [job="ID:16, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.434 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.438 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.434 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.438 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=16]
[2021/08/29 20:09:05.438 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.438 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=10] ["first split key"=74800000000000000f]
[2021/08/29 20:09:05.438 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=8] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"] [user=]
[2021/08/29 20:09:05.439 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.439 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.439 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.439 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"]
[2021/08/29 20:09:05.439 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.439 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.439 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=8] [neededSchemaVersion=9] ["start time"=102.066µs] [phyTblIDs="[17]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.440 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=12] ["first at"=74800000000000000f] ["first new region left"="{Id:12 StartKey:7480000000000000ff0d00000000000000f8 EndKey:7480000000000000ff0f00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:13 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.440 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[12]"]
[2021/08/29 20:09:05.441 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=9] ["take time"=2.034317ms] [job="ID:18, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.439 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.442 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.439 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.442 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=18]
[2021/08/29 20:09:05.442 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.442 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=12] ["first split key"=748000000000000011]
[2021/08/29 20:09:05.442 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=9] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"] [user=]
[2021/08/29 20:09:05.443 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.442 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.443 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.442 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"]
[2021/08/29 20:09:05.443 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.442 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.444 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=9] [neededSchemaVersion=10] ["start time"=171.702µs] [phyTblIDs="[19]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.444 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=14] ["first at"=748000000000000011] ["first new region left"="{Id:14 StartKey:7480000000000000ff0f00000000000000f8 EndKey:7480000000000000ff1100000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:15 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.444 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[14]"]
[2021/08/29 20:09:05.446 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=10] ["take time"=2.290405ms] [job="ID:20, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.442 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.446 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.442 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.446 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=20]
[2021/08/29 20:09:05.446 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.446 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=14] ["first split key"=748000000000000013]
[2021/08/29 20:09:05.446 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=10] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"] [user=]
[2021/08/29 20:09:05.447 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.447 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.447 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.447 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"]
[2021/08/29 20:09:05.447 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.447 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.447 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=10] [neededSchemaVersion=11] ["start time"=127.659µs] [phyTblIDs="[21]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.449 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=16] ["first at"=748000000000000013] ["first new region left"="{Id:16 StartKey:7480000000000000ff1100000000000000f8 EndKey:7480000000000000ff1300000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:17 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.449 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[16]"]
[2021/08/29 20:09:05.449 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=11] ["take time"=2.145541ms] [job="ID:22, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.447 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.450 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.447 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.450 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=22]
[2021/08/29 20:09:05.450 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.450 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=16] ["first split key"=748000000000000015]
[2021/08/29 20:09:05.450 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=11] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/08/29 20:09:05.451 +05:30] [INFO] [ddl_api.go:567] ["Automatically convert BLOB(6291456) to MEDIUMBLOB"]
[2021/08/29 20:09:05.451 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.451 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.451 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.451 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/08/29 20:09:05.451 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.451 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.452 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=11] [neededSchemaVersion=12] ["start time"=167.074µs] [phyTblIDs="[23]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.452 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=18] ["first at"=748000000000000015] ["first new region left"="{Id:18 StartKey:7480000000000000ff1300000000000000f8 EndKey:7480000000000000ff1500000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:19 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.452 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[18]"]
[2021/08/29 20:09:05.455 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=12] ["take time"=2.423787ms] [job="ID:24, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.451 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.455 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.451 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.455 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=24]
[2021/08/29 20:09:05.455 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.455 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=18] ["first split key"=748000000000000017]
[2021/08/29 20:09:05.456 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=12] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"] [user=]
[2021/08/29 20:09:05.456 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.456 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.456 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.456 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"]
[2021/08/29 20:09:05.456 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.456 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.457 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=12] [neededSchemaVersion=13] ["start time"=178.668µs] [phyTblIDs="[25]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.458 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=20] ["first at"=748000000000000017] ["first new region left"="{Id:20 StartKey:7480000000000000ff1500000000000000f8 EndKey:7480000000000000ff1700000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:21 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.458 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[20]"]
[2021/08/29 20:09:05.459 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=13] ["take time"=2.172862ms] [job="ID:26, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.456 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.459 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.456 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.460 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=26]
[2021/08/29 20:09:05.460 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.460 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=20] ["first split key"=748000000000000019]
[2021/08/29 20:09:05.460 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=13] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"] [user=]
[2021/08/29 20:09:05.460 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.460 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"]
[2021/08/29 20:09:05.460 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.461 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=13] [neededSchemaVersion=14] ["start time"=112.077µs] [phyTblIDs="[27]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.462 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=22] ["first at"=748000000000000019] ["first new region left"="{Id:22 StartKey:7480000000000000ff1700000000000000f8 EndKey:7480000000000000ff1900000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:23 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.462 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[22]"]
[2021/08/29 20:09:05.463 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=14] ["take time"=2.253308ms] [job="ID:28, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.464 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.464 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=28]
[2021/08/29 20:09:05.464 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.464 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=22] ["first split key"=74800000000000001b]
[2021/08/29 20:09:05.464 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=14] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"] [user=]
[2021/08/29 20:09:05.465 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.465 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"]
[2021/08/29 20:09:05.465 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.465 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=14] [neededSchemaVersion=15] ["start time"=103.714µs] [phyTblIDs="[29]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.466 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=24] ["first at"=74800000000000001b] ["first new region left"="{Id:24 StartKey:7480000000000000ff1900000000000000f8 EndKey:7480000000000000ff1b00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:25 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.466 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[24]"]
[2021/08/29 20:09:05.467 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=15] ["take time"=2.192558ms] [job="ID:30, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.468 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.468 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=30]
[2021/08/29 20:09:05.468 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.468 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=24] ["first split key"=74800000000000001d]
[2021/08/29 20:09:05.468 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=15] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/08/29 20:09:05.468 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.468 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.468 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.468 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"]
[2021/08/29 20:09:05.468 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.468 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.469 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=15] [neededSchemaVersion=16] ["start time"=116.442µs] [phyTblIDs="[31]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.470 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=26] ["first at"=74800000000000001d] ["first new region left"="{Id:26 StartKey:7480000000000000ff1b00000000000000f8 EndKey:7480000000000000ff1d00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:27 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.470 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[26]"]
[2021/08/29 20:09:05.471 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=16] ["take time"=2.110535ms] [job="ID:32, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.468 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.471 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.468 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.471 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=32]
[2021/08/29 20:09:05.471 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.471 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=26] ["first split key"=74800000000000001f]
[2021/08/29 20:09:05.471 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=16] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"] [user=]
[2021/08/29 20:09:05.472 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.472 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.472 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.472 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"]
[2021/08/29 20:09:05.472 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.472 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.472 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=16] [neededSchemaVersion=17] ["start time"=106.507µs] [phyTblIDs="[33]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.474 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=28] ["first at"=74800000000000001f] ["first new region left"="{Id:28 StartKey:7480000000000000ff1d00000000000000f8 EndKey:7480000000000000ff1f00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:29 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.474 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[28]"]
[2021/08/29 20:09:05.475 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=17] ["take time"=2.178278ms] [job="ID:34, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.472 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.475 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.472 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.475 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=34]
[2021/08/29 20:09:05.475 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.475 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=28] ["first split key"=748000000000000021]
[2021/08/29 20:09:05.475 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=17] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"] [user=]
[2021/08/29 20:09:05.476 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.475 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.476 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.475 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"]
[2021/08/29 20:09:05.476 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.475 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.476 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=17] [neededSchemaVersion=18] ["start time"=91.228µs] [phyTblIDs="[35]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.477 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=30] ["first at"=748000000000000021] ["first new region left"="{Id:30 StartKey:7480000000000000ff1f00000000000000f8 EndKey:7480000000000000ff2100000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:31 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.477 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[30]"]
[2021/08/29 20:09:05.478 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=18] ["take time"=2.195238ms] [job="ID:36, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.475 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.478 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.475 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.479 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=36]
[2021/08/29 20:09:05.479 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.479 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=30] ["first split key"=748000000000000023]
[2021/08/29 20:09:05.479 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=18] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"] [user=]
[2021/08/29 20:09:05.479 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.479 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"]
[2021/08/29 20:09:05.479 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.480 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=18] [neededSchemaVersion=19] ["start time"=137.58µs] [phyTblIDs="[37]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.481 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=32] ["first at"=748000000000000023] ["first new region left"="{Id:32 StartKey:7480000000000000ff2100000000000000f8 EndKey:7480000000000000ff2300000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:33 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.481 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[32]"]
[2021/08/29 20:09:05.482 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=19] ["take time"=2.240682ms] [job="ID:38, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.483 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.483 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=38]
[2021/08/29 20:09:05.483 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.483 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=32] ["first split key"=748000000000000025]
[2021/08/29 20:09:05.484 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=19] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/08/29 20:09:05.484 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.484 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/08/29 20:09:05.484 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.485 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=19] [neededSchemaVersion=20] ["start time"=118.84µs] [phyTblIDs="[39]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.486 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=34] ["first at"=748000000000000025] ["first new region left"="{Id:34 StartKey:7480000000000000ff2300000000000000f8 EndKey:7480000000000000ff2500000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:35 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.486 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[34]"]
[2021/08/29 20:09:05.487 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=20] ["take time"=2.386327ms] [job="ID:40, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.488 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.488 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=40]
[2021/08/29 20:09:05.488 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.488 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=34] ["first split key"=748000000000000027]
[2021/08/29 20:09:05.488 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=20] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"] [user=]
[2021/08/29 20:09:05.489 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.488 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.489 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.488 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"]
[2021/08/29 20:09:05.489 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.488 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.489 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=20] [neededSchemaVersion=21] ["start time"=75.503µs] [phyTblIDs="[41]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.491 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=36] ["first at"=748000000000000027] ["first new region left"="{Id:36 StartKey:7480000000000000ff2500000000000000f8 EndKey:7480000000000000ff2700000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:37 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.491 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[36]"]
[2021/08/29 20:09:05.491 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=21] ["take time"=2.115468ms] [job="ID:42, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.488 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.491 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.488 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.492 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=42]
[2021/08/29 20:09:05.492 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.492 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=36] ["first split key"=748000000000000029]
[2021/08/29 20:09:05.492 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=21] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"] [user=]
[2021/08/29 20:09:05.492 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.492 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"]
[2021/08/29 20:09:05.492 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.493 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=21] [neededSchemaVersion=22] ["start time"=102.717µs] [phyTblIDs="[43]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.494 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=38] ["first at"=748000000000000029] ["first new region left"="{Id:38 StartKey:7480000000000000ff2700000000000000f8 EndKey:7480000000000000ff2900000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:39 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.494 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[38]"]
[2021/08/29 20:09:05.495 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=22] ["take time"=2.179152ms] [job="ID:44, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.495 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.495 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=44]
[2021/08/29 20:09:05.495 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.495 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=38] ["first split key"=74800000000000002b]
[2021/08/29 20:09:05.495 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=22] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"] [user=]
[2021/08/29 20:09:05.496 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.496 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.496 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.496 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"]
[2021/08/29 20:09:05.496 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.496 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.497 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=22] [neededSchemaVersion=23] ["start time"=163.966µs] [phyTblIDs="[45]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.498 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=40] ["first at"=74800000000000002b] ["first new region left"="{Id:40 StartKey:7480000000000000ff2900000000000000f8 EndKey:7480000000000000ff2b00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:41 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.498 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[40]"]
[2021/08/29 20:09:05.499 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=23] ["take time"=2.06162ms] [job="ID:46, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.496 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.499 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.496 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.500 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=46]
[2021/08/29 20:09:05.500 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.500 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=40] ["first split key"=74800000000000002d]
[2021/08/29 20:09:05.500 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=23] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"] [user=]
[2021/08/29 20:09:05.500 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.5 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.500 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.5 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"]
[2021/08/29 20:09:05.500 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.5 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.501 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=23] [neededSchemaVersion=24] ["start time"=96.413µs] [phyTblIDs="[47]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.502 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=42] ["first at"=74800000000000002d] ["first new region left"="{Id:42 StartKey:7480000000000000ff2b00000000000000f8 EndKey:7480000000000000ff2d00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:43 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.502 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[42]"]
[2021/08/29 20:09:05.503 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=24] ["take time"=2.17241ms] [job="ID:48, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.5 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.503 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.5 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.503 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=48]
[2021/08/29 20:09:05.503 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.503 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=42] ["first split key"=74800000000000002f]
[2021/08/29 20:09:05.503 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=24] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/08/29 20:09:05.504 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.504 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.504 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.504 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/08/29 20:09:05.504 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.504 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.505 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=24] [neededSchemaVersion=25] ["start time"=117.846µs] [phyTblIDs="[49]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.506 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=44] ["first at"=74800000000000002f] ["first new region left"="{Id:44 StartKey:7480000000000000ff2d00000000000000f8 EndKey:7480000000000000ff2f00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:45 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.506 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[44]"]
[2021/08/29 20:09:05.507 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=25] ["take time"=2.130513ms] [job="ID:50, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.504 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.507 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.504 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.507 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=50]
[2021/08/29 20:09:05.507 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.507 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=44] ["first split key"=748000000000000031]
[2021/08/29 20:09:05.507 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=25] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"] [user=]
[2021/08/29 20:09:05.508 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.508 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"]
[2021/08/29 20:09:05.508 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.508 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=25] [neededSchemaVersion=26] ["start time"=106.402µs] [phyTblIDs="[51]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.509 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=46] ["first at"=748000000000000031] ["first new region left"="{Id:46 StartKey:7480000000000000ff2f00000000000000f8 EndKey:7480000000000000ff3100000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:47 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.509 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[46]"]
[2021/08/29 20:09:05.510 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=26] ["take time"=2.218325ms] [job="ID:52, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.511 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.511 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=52]
[2021/08/29 20:09:05.511 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.511 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=46] ["first split key"=748000000000000033]
[2021/08/29 20:09:05.511 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=26] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"] [user=]
[2021/08/29 20:09:05.512 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.511 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:09:05.512 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.511 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"]
[2021/08/29 20:09:05.512 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.511 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.512 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=26] [neededSchemaVersion=27] ["start time"=102.262µs] [phyTblIDs="[53]"] [actionTypes="[8]"]
[2021/08/29 20:09:05.513 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=48] ["first at"=748000000000000033] ["first new region left"="{Id:48 StartKey:7480000000000000ff3100000000000000f8 EndKey:7480000000000000ff3300000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:49 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.513 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[48]"]
[2021/08/29 20:09:05.514 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=27] ["take time"=2.182293ms] [job="ID:54, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-08-29 20:09:05.511 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.514 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-08-29 20:09:05.511 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:09:05.515 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=54]
[2021/08/29 20:09:05.515 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:09:05.515 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=48] ["first split key"=748000000000000035]
[2021/08/29 20:09:05.517 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=50] ["first at"=748000000000000035] ["first new region left"="{Id:50 StartKey:7480000000000000ff3300000000000000f8 EndKey:7480000000000000ff3500000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:51 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:09:05.517 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[50]"]
[2021/08/29 20:09:05.525 +05:30] [INFO] [bootstrap.go:375] ["bootstrap successful"] ["take time"=127.646006ms]
[2021/08/29 20:09:05.525 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 1, tp general"] ["take time"=2.262µs]
[2021/08/29 20:09:05.525 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 2, tp add index"] ["take time"=98ns]
[2021/08/29 20:09:05.525 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/08/29 20:09:05.525 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/08/29 20:09:05.525 +05:30] [INFO] [ddl.go:411] ["[ddl] DDL closed"] [ID=a936af8e-1603-4f44-ae26-0e97ffdb5546] ["take time"=50.803µs]
[2021/08/29 20:09:05.525 +05:30] [INFO] [ddl.go:324] ["[ddl] stop DDL"] [ID=a936af8e-1603-4f44-ae26-0e97ffdb5546]
[2021/08/29 20:09:05.525 +05:30] [INFO] [domain.go:421] ["topNSlowQueryLoop exited."]
[2021/08/29 20:09:05.525 +05:30] [INFO] [domain.go:450] ["infoSyncerKeeper exited."]
[2021/08/29 20:09:05.525 +05:30] [INFO] [domain.go:478] ["topologySyncerKeeper exited."]
[2021/08/29 20:09:05.525 +05:30] [INFO] [domain.go:630] ["domain closed"] ["take time"=110.065µs]
[2021/08/29 20:09:05.525 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=11e0380d-e571-45e3-b06a-12ca4793aafd] ["ddl lease"=45s] ["stats lease"=3s] ["index usage sync lease"=0s]
[2021/08/29 20:09:05.525 +05:30] [INFO] [domain.go:509] ["loadSchemaInLoop exited."]
[2021/08/29 20:09:05.525 +05:30] [INFO] [ddl.go:343] ["[ddl] start DDL"] [ID=732c7402-29fa-49ad-a6fa-b541a8d8a556] [runWorker=true]
[2021/08/29 20:09:05.525 +05:30] [INFO] [ddl.go:332] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/08/29 20:09:05.525 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/08/29 20:09:05.525 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 3, tp general"]
[2021/08/29 20:09:05.525 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 4, tp add index"]
[2021/08/29 20:09:05.529 +05:30] [INFO] [domain.go:156] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=27] ["start time"=3.110034ms]
[2021/08/29 20:09:05.529 +05:30] [INFO] [domain.go:371] ["full load and reset schema validator"]
[2021/08/29 20:09:05.530 +05:30] [WARN] [sysvar_cache.go:55] ["sysvar cache is empty, triggering rebuild"]
[2021/08/29 20:09:05.538 +05:30] [INFO] [telemetry.go:174] ["Telemetry configuration"] [endpoint=https://telemetry.pingcap.com/api/v1/tidb/report] [report_interval=6h0m0s] [enabled=true]
[2021/08/29 20:09:05.540 +05:30] [INFO] [domain.go:1223] ["init stats info time"] ["take time"=2.290543ms]

[2021/08/29 20:09:07.674 +05:30] [INFO] [misc.go:652] ["TLS Certificates created"] [cert="/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/501_tidb/MC4wLjAuMDo0MDAwLzAuMC4wLjA6MTAwODA=/tmp-storage/cert.pem"] [key="/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/501_tidb/MC4wLjAuMDo0MDAwLzAuMC4wLjA6MTAwODA=/tmp-storage/key.pem"] [validity=2160h0m0s]
[2021/08/29 20:09:07.675 +05:30] [WARN] [misc.go:488] ["Minimum TLS version allows pre-TLSv1.2 protocols, this is not recommended"]
[2021/08/29 20:09:07.675 +05:30] [INFO] [server.go:223] ["mysql protocol server secure connection is enabled"] ["client verification enabled"=false]
[2021/08/29 20:09:07.675 +05:30] [INFO] [server.go:241] ["server is running MySQL protocol"] [addr=0.0.0.0:4000]
[2021/08/29 20:09:07.675 +05:30] [INFO] [http_status.go:85] ["for status and metrics report"] ["listening on addr"=0.0.0.0:10080]
[2021/08/29 20:09:07.675 +05:30] [INFO] [profile.go:92] ["cpu profiler started"]
[2021/08/29 20:10:46.757 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=5] [schemaVersion=27] [cur_db=test] [sql="CREATE TABLE `authors` (\n`id` INT(11) NOT NULL AUTO_INCREMENT,\n`first_name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',\n`last_name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',\n`email` VARCHAR(100) NOT NULL COLLATE 'utf8_unicode_ci',\n`birthdate` DATE NOT NULL,\n`added` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\nPRIMARY KEY (`id`),\nUNIQUE INDEX `email` (`email`)\n)"] [user=root@127.0.0.1]
[2021/08/29 20:10:46.758 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:55, RowCount:0, ArgLen:1, start time: 2021-08-29 20:10:46.758 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/08/29 20:10:46.758 +05:30] [INFO] [ddl.go:547] ["[ddl] start DDL job"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:55, RowCount:0, ArgLen:1, start time: 2021-08-29 20:10:46.758 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE `authors` (\n`id` INT(11) NOT NULL AUTO_INCREMENT,\n`first_name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',\n`last_name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',\n`email` VARCHAR(100) NOT NULL COLLATE 'utf8_unicode_ci',\n`birthdate` DATE NOT NULL,\n`added` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\nPRIMARY KEY (`id`),\nUNIQUE INDEX `email` (`email`)\n)"]
[2021/08/29 20:10:46.758 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:55, RowCount:0, ArgLen:0, start time: 2021-08-29 20:10:46.758 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:10:46.759 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=27] [neededSchemaVersion=28] ["start time"=146.123µs] [phyTblIDs="[55]"] [actionTypes="[8]"]
[2021/08/29 20:10:46.762 +05:30] [INFO] [ddl_worker.go:915] ["[ddl] wait latest schema version changed"] [worker="worker 3, tp general"] [ver=28] ["take time"=2.584912ms] [job="ID:56, Type:create table, State:done, SchemaState:public, SchemaID:1, TableID:55, RowCount:0, ArgLen:1, start time: 2021-08-29 20:10:46.758 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:10:46.762 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:56, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:55, RowCount:0, ArgLen:0, start time: 2021-08-29 20:10:46.758 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/08/29 20:10:46.763 +05:30] [INFO] [ddl.go:602] ["[ddl] DDL job is finished"] [jobID=56]
[2021/08/29 20:10:46.763 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/08/29 20:10:46.763 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=52] ["first split key"=748000000000000037]
[2021/08/29 20:10:46.763 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=52] ["first at"=748000000000000037] ["first new region left"="{Id:52 StartKey:7480000000000000ff3500000000000000f8 EndKey:7480000000000000ff3700000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:53 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/08/29 20:10:46.763 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[52]"]
^C[2021/08/29 20:12:05.403 +05:30] [INFO] [signal_posix.go:54] ["got signal to exit"] [signal=interrupt]
[2021/08/29 20:12:05.403 +05:30] [INFO] [server.go:411] ["setting tidb-server to report unhealthy (shutting-down)"]
[2021/08/29 20:12:05.404 +05:30] [ERROR] [http_status.go:373] ["start status/rpc server error"] [error="accept tcp [::]:10080: use of closed network connection"]
[2021/08/29 20:12:05.404 +05:30] [ERROR] [http_status.go:368] ["http server error"] [error="http: Server closed"]
[2021/08/29 20:12:05.404 +05:30] [INFO] [server.go:683] ["[server] graceful shutdown."]
[2021/08/29 20:12:05.404 +05:30] [ERROR] [http_status.go:363] ["grpc server error"] []
[2021/08/29 20:12:05.404 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 3, tp general"] ["take time"=6.785µs]
[2021/08/29 20:12:05.404 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 4, tp add index"] ["take time"=126ns]
[2021/08/29 20:12:05.404 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/08/29 20:12:05.404 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/08/29 20:12:05.404 +05:30] [INFO] [ddl.go:411] ["[ddl] DDL closed"] [ID=732c7402-29fa-49ad-a6fa-b541a8d8a556] ["take time"=59.613µs]
[2021/08/29 20:12:05.404 +05:30] [INFO] [ddl.go:324] ["[ddl] stop DDL"] [ID=732c7402-29fa-49ad-a6fa-b541a8d8a556]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:421] ["topNSlowQueryLoop exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:1046] ["handleEvolvePlanTasksLoop exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:927] ["LoadSysVarCacheLoop exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:450] ["infoSyncerKeeper exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:478] ["topologySyncerKeeper exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:1005] ["globalBindHandleWorkerLoop exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:509] ["loadSchemaInLoop exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:1215] ["loadStatsWorker exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:1344] ["autoAnalyzeWorker exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:1291] ["updateStatsWorker exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:1109] ["TelemetryRotateSubWindowLoop exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:878] ["loadPrivilegeInLoop exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:1079] ["TelemetryReportLoop exited."]
[2021/08/29 20:12:05.404 +05:30] [INFO] [domain.go:630] ["domain closed"] ["take time"=215.947µs]
[2021/08/29 20:12:05.426 +05:30] [INFO] [db.go:567] ["Closing database"]
[2021/08/29 20:12:05.426 +05:30] [INFO] [db.go:584] ["Flushing memtable"]
[2021/08/29 20:12:05.426 +05:30] [INFO] [db.go:931] ["flush memtable storing offset"] [fid=0] [offset=748700]
[2021/08/29 20:12:05.467 +05:30] [INFO] [db.go:592] ["Memtable flushed"]
[2021/08/29 20:12:05.467 +05:30] [INFO] [db.go:596] ["Compaction finished"]
[2021/08/29 20:12:05.498 +05:30] [INFO] [levels.go:546] ["compact send discard stats"] [stats="numSkips:0, skippedBytes:0"]
[2021/08/29 20:12:05.517 +05:30] [INFO] [levels.go:628] ["compaction done"] [def="0 top:[0:1](720008), bot:[0:0](0), skip:0, write_amp:1.00"] [deleted=1] [added=3] [duration=50.409387ms]
[2021/08/29 20:12:05.518 +05:30] [INFO] [db.go:615] ["BlobManager finished"]
[2021/08/29 20:12:05.518 +05:30] [INFO] [db.go:619] ["ResourceManager finished"]
[2021/08/29 20:12:05.518 +05:30] [INFO] [db.go:625] ["Waiting for closer"]
tidb $ 
```

https://pingcap.github.io/tidb-dev-guide/get-started/setup-an-ide.html

They use GoLand for coding, hmm. It's paid

https://www.jetbrains.com/go/download/#section=mac

Can't have that now. Just VS Code is better than a paid subscription for IntelliJ IDEA, however this is open source work and VS Code is mostly good enough if not the best

There's information around unit tests and how to run it! :D

https://pingcap.github.io/tidb-dev-guide/get-started/write-and-run-unit-tests.html

and it mentions about the testify migration too!

https://pingcap.github.io/tidb-dev-guide/get-started/write-and-run-unit-tests.html#how-to-write-unit-tests

https://pkg.go.dev/testing

https://pkg.go.dev/cmd/go#hdr-Testing_flags

https://github.com/stretchr/testify

https://github.com/pingcap/check

https://github.com/go-check/check

https://github.com/pingcap/tidb/issues/26022

https://github.com/uber-go/goleak

https://pingcap.github.io/tidb-dev-guide/get-started/write-and-run-unit-tests.html#assertion

https://pkg.go.dev/github.com/stretchr/testify/require

https://pkg.go.dev/github.com/stretchr/testify/require#hdr-Assertions

https://pingcap.github.io/tidb-dev-guide/get-started/write-and-run-unit-tests.html#parallel

https://pkg.go.dev/testing#hdr-Subtests_and_Sub_benchmarks

https://pingcap.github.io/tidb-dev-guide/get-started/write-and-run-unit-tests.html#testkit

https://pingcap.github.io/tidb-dev-guide/get-started/write-and-run-unit-tests.html#how-to-run-unit-tests

https://pingcap.github.io/tidb-dev-guide/get-started/write-and-run-unit-tests.html#running-all-tests

https://github.com/pingcap/failpoint

https://www.freebsd.org/cgi/man.cgi?query=fail

https://pingcap.github.io/tidb-dev-guide/get-started/write-and-run-unit-tests.html#running-a-single-test

I'm wondering what the failpoint is, hmm

https://code.visualstudio.com/docs/languages/go#_test

https://pingcap.github.io/tidb-dev-guide/get-started/write-and-run-unit-tests.html#running-tests-for-pull-request

I was running the test using a command from the previous section, and it failed

```bash
tidb $ make gotest
cd tools/check; \
	GO111MODULE=on go build -o ../bin/failpoint-ctl github.com/pingcap/failpoint/failpoint-ctl

go: downloading github.com/pingcap/failpoint v0.0.0-20200702092429-9f69995143ce
go: downloading github.com/sergi/go-diff v1.0.1-0.20180205163309-da645544ed44
Running in native mode.
go: downloading github.com/shurcooL/httpgzip v0.0.0-20190720172056-320755c1c1b0
go: downloading modernc.org/mathutil v1.2.2
go: downloading github.com/joho/sqltocsv v0.0.0-20210428211105-a6d6801d59df
go: downloading github.com/golang/mock v1.6.0
go: downloading github.com/cheynewallace/tabby v1.1.1
go: downloading github.com/carlmjohnson/flagext v0.21.0
go: downloading github.com/cockroachdb/pebble v0.0.0-20210719141320-8c3bd06debb5
go: downloading github.com/xitongsys/parquet-go-source v0.0.0-20200817004010-026bad9b25d0
go: downloading github.com/xitongsys/parquet-go v1.5.5-0.20201110004701-b09c49d6d457
go: downloading github.com/jedib0t/go-pretty/v6 v6.2.2
go: downloading github.com/phayes/freeport v0.0.0-20180830031419-95f893ade6f2
go: downloading github.com/pingcap/check v0.0.0-20200212061837-5e12011dc712
go: downloading github.com/apache/thrift v0.13.1-0.20201008052519-daf620915714
go: downloading github.com/cockroachdb/errors v1.8.1
go: downloading github.com/DataDog/zstd v1.4.5
go: downloading github.com/cockroachdb/redact v1.0.8
go: downloading golang.org/x/exp v0.0.0-20200513190911-00229845015e
go: downloading github.com/cockroachdb/sentry-go v0.6.1-cockroachdb.2
go: downloading github.com/Jeffail/gabs/v2 v2.5.1

timeout-check
grep 'PASS:' gotest.log | go run tools/check/check-timeout.go || { $(find $PWD/ -type d | grep -vE "(\.git|tools)" | xargs tools/bin/failpoint-ctl disable); exit 1; }
The following test cases take too long to finish:
PASS: builtin_time_vec_test.go:579: testVectorizeSuite2.TestVectorizedBuiltinTimeFunc	7.478s
--- PASS: TestClusterConfigInfoschema (5.67s)
--- PASS: TestCTEPreviewAndReport (6.81s)
exit status 252
make: *** [gotest] Error 1
tidb $ 
tidb $ 

tidb $ 

```


