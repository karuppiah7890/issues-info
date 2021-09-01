Remaining [DONE] -

- TestHalfwayCancelOperations [DONE]
- TestInitializeOffsetAndState [DONE]
- TestUpdateHandleFailed [DONE]
- TestAddIndexFailed [DONE]
- TestFailSchemaSyncer [DONE]

Also, finally, I need to remove all of those tests and also [DONE] -
- Remove SerialSuites [DONE]
- Remove SetUpSuite [DONE]
- Remove TearDownSuite [DONE]
- Remove TestT [DONE]
- Remove `. "github.com/pingcap/check"` [DONE]
- Rename `CopyXyz` entities and `MyXyz` entities [DONE]
- Remove `"github.com/pingcap/tidb/util/testkit"` [DONE]
    - Change `testkit.Rows` to use other testkit package [DONE]
- Remove package rename newtestkit so as to use testkit [DONE]
- Copy the comment on top of the tests too. I missed that!! Check old commits of migration and ensure test comments are good! [DONE]
    - Looking at the git diff `g diff da7b00124b35dbe5cdb044224209857498879df5 HEAD`, looks like I didn't delete any comments, hmm. Let me check each commit! Looks like the comments that I removed were all `TODO` that I had put initially. So, no problems! [DONE]
- Raise PR and ask for comments! :) [TODO]

---

I migrated `TestFailSchemaSyncer`

```bash
tidb $ { make failpoint-enable; go test -run ^TestTCopy$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; }
ok  	github.com/pingcap/tidb/ddl/failtest	68.401s
tidb $ 
```

It did take a lot of time to run the tests, hmm

I think it's mainly because I'm running the tests in a sequence. I tried to run them in parallel actually

```bash
tidb $ { make failpoint-enable; go test -run ^TestTCopy$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; }
[2021/09/01 21:18:25.387 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=e116e7b9-54a6-439f-981e-5b472cc489b3] ["ddl lease"=200ms] ["stats lease"=3s] ["index usage sync lease"=0s]
[2021/09/01 21:18:25.391 +05:30] [INFO] [ddl.go:345] ["[ddl] start DDL"] [ID=e2dcc37f-7623-4683-802e-dcece5a55a2d] [runWorker=true]
[2021/09/01 21:18:25.391 +05:30] [INFO] [ddl.go:334] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/09/01 21:18:25.391 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/09/01 21:18:25.391 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 2, tp add index"]
[2021/09/01 21:18:25.391 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 1, tp general"]
[2021/09/01 21:18:25.392 +05:30] [INFO] [domain.go:156] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=0] ["start time"=695.998µs]
[2021/09/01 21:18:25.392 +05:30] [INFO] [domain.go:371] ["full load and reset schema validator"]
[2021/09/01 21:18:25.393 +05:30] [INFO] [tidb.go:243] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/09/01 21:18:25.393 +05:30] [WARN] [session.go:1571] ["run statement failed"] [schemaVersion=0] [error="[schema:1049]Unknown database 'mysql'"] [errorVerbose="[schema:1049]Unknown database 'mysql'\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.(*Error).GenWithStackByArgs\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/normalize.go:159\ngithub.com/pingcap/tidb/executor.(*SimpleExec).executeUse\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:556\ngithub.com/pingcap/tidb/executor.(*SimpleExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/simple.go:126\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568\ngithub.com/pingcap/tidb/session.(*session).ExecuteInternal\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1278\ngithub.com/pingcap/tidb/session.checkBootstrapped\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:598\ngithub.com/pingcap/tidb/session.bootstrap\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/bootstrap.go:358\ngithub.com/pingcap/tidb/session.runInBootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2565\ngithub.com/pingcap/tidb/session.BootstrapSession\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:2418\ngithub.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).SetUpSuiteCopy\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:144\ngithub.com/pingcap/tidb/ddl/failtest_test.TestTCopy\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:64\ntesting.tRunner\n\t/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259\nruntime.goexit\n\t/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 0,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/09/01 21:18:25.393 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=0] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS test"] [user=]
[2021/09/01 21:18:25.394 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.394 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS test"]
[2021/09/01 21:18:25.394 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.396 +05:30] [INFO] [domain.go:156] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=1] ["start time"=996.38µs]
[2021/09/01 21:18:25.396 +05:30] [INFO] [domain.go:371] ["full load and reset schema validator"]
[2021/09/01 21:18:25.397 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=1] ["take time"=2.391821ms] [job="ID:2, Type:create schema, State:done, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.398 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:synced, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.398 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=2]
[2021/09/01 21:18:25.398 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.398 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=1] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS `mysql`"] [user=]
[2021/09/01 21:18:25.399 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.399 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS `mysql`"]
[2021/09/01 21:18:25.399 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.399 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=1] [neededSchemaVersion=2] ["start time"=65.027µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/09/01 21:18:25.401 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=2] ["take time"=2.086245ms] [job="ID:4, Type:create schema, State:done, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.402 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:synced, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.398 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.402 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=4]
[2021/09/01 21:18:25.402 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.402 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=2] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"] [user=]
[2021/09/01 21:18:25.403 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.403 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"]
[2021/09/01 21:18:25.404 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.405 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=2] [neededSchemaVersion=3] ["start time"=490.273µs] [phyTblIDs="[5]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.407 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=3] ["take time"=2.508668ms] [job="ID:6, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.409 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.403 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.410 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=6]
[2021/09/01 21:18:25.410 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.410 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=3] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(60) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"] [user=]
[2021/09/01 21:18:25.410 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.41 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.410 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.41 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(60) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"]
[2021/09/01 21:18:25.410 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.41 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.411 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=3] [neededSchemaVersion=4] ["start time"=123.307µs] [phyTblIDs="[7]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.413 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=4] ["take time"=2.15711ms] [job="ID:8, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.41 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.413 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.41 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.414 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=8]
[2021/09/01 21:18:25.414 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.414 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=4] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(60),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"] [user=]
[2021/09/01 21:18:25.415 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.414 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.415 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.414 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(60),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"]
[2021/09/01 21:18:25.415 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.414 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.417 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=4] [neededSchemaVersion=5] ["start time"=406.6µs] [phyTblIDs="[9]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.419 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=5] ["take time"=2.525961ms] [job="ID:10, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.414 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.420 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.414 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.421 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=10]
[2021/09/01 21:18:25.421 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.421 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=5] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(60),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"] [user=]
[2021/09/01 21:18:25.422 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.422 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(60),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"]
[2021/09/01 21:18:25.422 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.423 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=5] [neededSchemaVersion=6] ["start time"=317.705µs] [phyTblIDs="[11]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.425 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=6] ["take time"=2.509067ms] [job="ID:12, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.426 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.426 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=12]
[2021/09/01 21:18:25.426 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.426 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=6] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(60),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"] [user=]
[2021/09/01 21:18:25.427 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.427 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.427 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.427 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(60),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"]
[2021/09/01 21:18:25.427 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.427 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.428 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=6] [neededSchemaVersion=7] ["start time"=191.02µs] [phyTblIDs="[13]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.430 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=7] ["take time"=2.080346ms] [job="ID:14, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.427 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.430 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.427 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.431 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=14]
[2021/09/01 21:18:25.431 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.431 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=7] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"] [user=]
[2021/09/01 21:18:25.432 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.431 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.432 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.431 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"]
[2021/09/01 21:18:25.432 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.431 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.433 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=7] [neededSchemaVersion=8] ["start time"=159.555µs] [phyTblIDs="[15]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.435 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=8] ["take time"=2.22006ms] [job="ID:16, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.431 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.435 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.431 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.435 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=16]
[2021/09/01 21:18:25.435 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.435 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=8] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"] [user=]
[2021/09/01 21:18:25.436 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.436 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.436 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.436 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"]
[2021/09/01 21:18:25.436 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.436 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.437 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=8] [neededSchemaVersion=9] ["start time"=138.544µs] [phyTblIDs="[17]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.439 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=9] ["take time"=2.326872ms] [job="ID:18, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.436 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.439 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.436 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.440 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=18]
[2021/09/01 21:18:25.440 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.440 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=9] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"] [user=]
[2021/09/01 21:18:25.441 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.441 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.441 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.441 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"]
[2021/09/01 21:18:25.441 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.441 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.442 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=9] [neededSchemaVersion=10] ["start time"=159.066µs] [phyTblIDs="[19]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.444 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=10] ["take time"=2.493205ms] [job="ID:20, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.441 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.445 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.441 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.445 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=20]
[2021/09/01 21:18:25.445 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.445 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=10] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"] [user=]
[2021/09/01 21:18:25.446 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.446 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.446 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.446 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"]
[2021/09/01 21:18:25.446 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.446 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.447 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=10] [neededSchemaVersion=11] ["start time"=156.104µs] [phyTblIDs="[21]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.449 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=11] ["take time"=2.023203ms] [job="ID:22, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.446 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.449 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.446 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.449 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=22]
[2021/09/01 21:18:25.449 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.450 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=11] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/09/01 21:18:25.450 +05:30] [INFO] [ddl_api.go:568] ["Automatically convert BLOB(6291456) to MEDIUMBLOB"]
[2021/09/01 21:18:25.451 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.45 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.451 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.45 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/09/01 21:18:25.451 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.45 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.452 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=11] [neededSchemaVersion=12] ["start time"=217.892µs] [phyTblIDs="[23]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.454 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=12] ["take time"=2.031132ms] [job="ID:24, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.45 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.454 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.45 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.455 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=24]
[2021/09/01 21:18:25.455 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.455 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=12] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"] [user=]
[2021/09/01 21:18:25.455 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.455 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.455 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.455 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"]
[2021/09/01 21:18:25.456 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.455 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.456 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=12] [neededSchemaVersion=13] ["start time"=185.17µs] [phyTblIDs="[25]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.458 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=13] ["take time"=2.331383ms] [job="ID:26, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.455 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.459 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.455 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.459 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=26]
[2021/09/01 21:18:25.459 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.460 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=13] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"] [user=]
[2021/09/01 21:18:25.460 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.460 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"]
[2021/09/01 21:18:25.460 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.461 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=13] [neededSchemaVersion=14] ["start time"=210.197µs] [phyTblIDs="[27]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.463 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=14] ["take time"=2.511417ms] [job="ID:28, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.464 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.46 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.464 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=28]
[2021/09/01 21:18:25.464 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.464 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=14] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"] [user=]
[2021/09/01 21:18:25.465 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.465 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"]
[2021/09/01 21:18:25.465 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.466 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=14] [neededSchemaVersion=15] ["start time"=140.015µs] [phyTblIDs="[29]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.468 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=15] ["take time"=2.075369ms] [job="ID:30, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.468 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.464 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.469 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=30]
[2021/09/01 21:18:25.469 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.469 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=15] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/09/01 21:18:25.469 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.469 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.469 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.469 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"]
[2021/09/01 21:18:25.469 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.469 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.470 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=15] [neededSchemaVersion=16] ["start time"=215.426µs] [phyTblIDs="[31]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.472 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=16] ["take time"=2.188142ms] [job="ID:32, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.469 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.473 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.469 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.473 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=32]
[2021/09/01 21:18:25.473 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.473 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=16] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"] [user=]
[2021/09/01 21:18:25.474 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.473 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.474 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.473 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"]
[2021/09/01 21:18:25.474 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.473 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.475 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=16] [neededSchemaVersion=17] ["start time"=167.365µs] [phyTblIDs="[33]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.477 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=17] ["take time"=2.524228ms] [job="ID:34, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.473 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.478 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.473 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.478 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=34]
[2021/09/01 21:18:25.478 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.478 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=17] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"] [user=]
[2021/09/01 21:18:25.479 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.479 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"]
[2021/09/01 21:18:25.479 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.480 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=17] [neededSchemaVersion=18] ["start time"=212.52µs] [phyTblIDs="[35]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.482 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=18] ["take time"=2.043282ms] [job="ID:36, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.483 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.479 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.483 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=36]
[2021/09/01 21:18:25.483 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.484 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=18] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"] [user=]
[2021/09/01 21:18:25.485 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.485 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"]
[2021/09/01 21:18:25.485 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.486 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=18] [neededSchemaVersion=19] ["start time"=279.891µs] [phyTblIDs="[37]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.488 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=19] ["take time"=2.284418ms] [job="ID:38, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.489 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.484 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.490 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=38]
[2021/09/01 21:18:25.490 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.491 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=19] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/09/01 21:18:25.492 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.492 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/09/01 21:18:25.493 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.494 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=19] [neededSchemaVersion=20] ["start time"=254.849µs] [phyTblIDs="[39]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.495 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=20] ["take time"=2.045161ms] [job="ID:40, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.496 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.492 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.497 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=40]
[2021/09/01 21:18:25.497 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.497 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=20] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"] [user=]
[2021/09/01 21:18:25.498 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.497 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.498 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.497 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"]
[2021/09/01 21:18:25.498 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.497 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.499 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=20] [neededSchemaVersion=21] ["start time"=206.508µs] [phyTblIDs="[41]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.501 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=21] ["take time"=2.380501ms] [job="ID:42, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.497 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.502 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.497 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.502 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=42]
[2021/09/01 21:18:25.502 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.503 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=21] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"] [user=]
[2021/09/01 21:18:25.503 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.503 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.503 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.503 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"]
[2021/09/01 21:18:25.504 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.503 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.504 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=21] [neededSchemaVersion=22] ["start time"=173.402µs] [phyTblIDs="[43]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.506 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=22] ["take time"=2.063588ms] [job="ID:44, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.503 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.507 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.503 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.507 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=44]
[2021/09/01 21:18:25.507 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.508 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=22] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"] [user=]
[2021/09/01 21:18:25.508 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.508 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"]
[2021/09/01 21:18:25.509 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.510 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=22] [neededSchemaVersion=23] ["start time"=321.904µs] [phyTblIDs="[45]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.512 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=23] ["take time"=2.086305ms] [job="ID:46, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.512 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.508 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.513 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=46]
[2021/09/01 21:18:25.513 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.513 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=23] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"] [user=]
[2021/09/01 21:18:25.514 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.514 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.514 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.514 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"]
[2021/09/01 21:18:25.515 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.514 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.516 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=23] [neededSchemaVersion=24] ["start time"=351.686µs] [phyTblIDs="[47]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.518 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=24] ["take time"=2.036228ms] [job="ID:48, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.514 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.518 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.514 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.519 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=48]
[2021/09/01 21:18:25.519 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.519 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=24] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/09/01 21:18:25.520 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.519 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.520 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.519 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/09/01 21:18:25.520 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.519 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.521 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=24] [neededSchemaVersion=25] ["start time"=175.105µs] [phyTblIDs="[49]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.523 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=25] ["take time"=2.50004ms] [job="ID:50, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.519 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.524 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.519 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.524 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=50]
[2021/09/01 21:18:25.524 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.524 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=25] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"] [user=]
[2021/09/01 21:18:25.525 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.525 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.525 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.525 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"]
[2021/09/01 21:18:25.525 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.525 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.528 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=25] [neededSchemaVersion=26] ["start time"=198.04µs] [phyTblIDs="[51]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.530 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=26] ["take time"=2.57677ms] [job="ID:52, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.525 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.530 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.525 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.531 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=52]
[2021/09/01 21:18:25.531 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.531 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=26] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"] [user=]
[2021/09/01 21:18:25.532 +05:30] [INFO] [ddl_worker.go:319] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.531 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/09/01 21:18:25.532 +05:30] [INFO] [ddl.go:549] ["[ddl] start DDL job"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.531 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"]
[2021/09/01 21:18:25.532 +05:30] [INFO] [ddl_worker.go:728] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.531 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.533 +05:30] [INFO] [domain.go:130] ["diff load InfoSchema success"] [currentSchemaVersion=26] [neededSchemaVersion=27] ["start time"=140.619µs] [phyTblIDs="[53]"] [actionTypes="[8]"]
[2021/09/01 21:18:25.535 +05:30] [INFO] [ddl_worker.go:919] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=27] ["take time"=2.506164ms] [job="ID:54, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-09-01 21:18:25.531 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.535 +05:30] [INFO] [ddl_worker.go:424] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-09-01 21:18:25.531 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/09/01 21:18:25.536 +05:30] [INFO] [ddl.go:604] ["[ddl] DDL job is finished"] [jobID=54]
[2021/09/01 21:18:25.536 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/09/01 21:18:25.551 +05:30] [INFO] [bootstrap.go:375] ["bootstrap successful"] ["take time"=158.418774ms]
[2021/09/01 21:18:25.551 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 1, tp general"] ["take time"=305ns]
[2021/09/01 21:18:25.551 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 2, tp add index"] ["take time"=70ns]
[2021/09/01 21:18:25.551 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/09/01 21:18:25.551 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/09/01 21:18:25.551 +05:30] [INFO] [ddl.go:413] ["[ddl] DDL closed"] [ID=e2dcc37f-7623-4683-802e-dcece5a55a2d] ["take time"=99.945µs]
[2021/09/01 21:18:25.551 +05:30] [INFO] [ddl.go:326] ["[ddl] stop DDL"] [ID=e2dcc37f-7623-4683-802e-dcece5a55a2d]
[2021/09/01 21:18:25.551 +05:30] [INFO] [domain.go:421] ["topNSlowQueryLoop exited."]
[2021/09/01 21:18:25.551 +05:30] [INFO] [domain.go:509] ["loadSchemaInLoop exited."]
[2021/09/01 21:18:25.551 +05:30] [INFO] [domain.go:478] ["topologySyncerKeeper exited."]
[2021/09/01 21:18:25.551 +05:30] [INFO] [domain.go:630] ["domain closed"] ["take time"=152.607µs]
[2021/09/01 21:18:25.551 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=e116e7b9-54a6-439f-981e-5b472cc489b3] ["ddl lease"=200ms] ["stats lease"=3s] ["index usage sync lease"=0s]
[2021/09/01 21:18:25.551 +05:30] [INFO] [domain.go:450] ["infoSyncerKeeper exited."]
[2021/09/01 21:18:25.551 +05:30] [INFO] [ddl.go:345] ["[ddl] start DDL"] [ID=17f1b435-8785-4922-9d5b-367ea335fb41] [runWorker=true]
[2021/09/01 21:18:25.552 +05:30] [INFO] [ddl.go:334] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/09/01 21:18:25.552 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 3, tp general"]
[2021/09/01 21:18:25.552 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 4, tp add index"]
[2021/09/01 21:18:25.552 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/09/01 21:18:25.555 +05:30] [INFO] [domain.go:156] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=27] ["start time"=3.535227ms]
[2021/09/01 21:18:25.555 +05:30] [INFO] [domain.go:371] ["full load and reset schema validator"]
[2021/09/01 21:18:25.557 +05:30] [WARN] [sysvar_cache.go:55] ["sysvar cache is empty, triggering rebuild"]
[2021/09/01 21:18:25.565 +05:30] [INFO] [telemetry.go:174] ["Telemetry configuration"] [endpoint=https://telemetry.pingcap.com/api/v1/tidb/report] [report_interval=6h0m0s] [enabled=true]
[2021/09/01 21:18:25.566 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=27] [cur_db=] [sql="drop database if exists test_db_state"] [user=]
[2021/09/01 21:18:25.566 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 3, tp general"] ["take time"=8.825µs]
[2021/09/01 21:18:25.566 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 4, tp add index"] ["take time"=112ns]
[2021/09/01 21:18:25.566 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/09/01 21:18:25.566 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/09/01 21:18:25.566 +05:30] [INFO] [ddl.go:413] ["[ddl] DDL closed"] [ID=17f1b435-8785-4922-9d5b-367ea335fb41] ["take time"=54.953µs]
[2021/09/01 21:18:25.566 +05:30] [INFO] [ddl.go:326] ["[ddl] stop DDL"] [ID=17f1b435-8785-4922-9d5b-367ea335fb41]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:421] ["topNSlowQueryLoop exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:878] ["loadPrivilegeInLoop exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:1079] ["TelemetryReportLoop exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:927] ["LoadSysVarCacheLoop exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:1344] ["autoAnalyzeWorker exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:509] ["loadSchemaInLoop exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:1046] ["handleEvolvePlanTasksLoop exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:1005] ["globalBindHandleWorkerLoop exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:450] ["infoSyncerKeeper exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:1109] ["TelemetryRotateSubWindowLoop exited."]
[2021/09/01 21:18:25.566 +05:30] [INFO] [domain.go:478] ["topologySyncerKeeper exited."]
[2021/09/01 21:18:25.569 +05:30] [INFO] [domain.go:1223] ["init stats info time"] ["take time"=3.921022ms]
[2021/09/01 21:18:25.569 +05:30] [INFO] [domain.go:1215] ["loadStatsWorker exited."]
[2021/09/01 21:18:25.569 +05:30] [INFO] [domain.go:1291] ["updateStatsWorker exited."]
[2021/09/01 21:18:25.569 +05:30] [INFO] [domain.go:630] ["domain closed"] ["take time"=3.053002ms]
[2021/09/01 21:18:25.592 +05:30] [INFO] [db.go:567] ["Closing database"]
[2021/09/01 21:18:25.592 +05:30] [INFO] [db.go:592] ["Memtable flushed"]
[2021/09/01 21:18:25.592 +05:30] [INFO] [db.go:596] ["Compaction finished"]
[2021/09/01 21:18:25.592 +05:30] [INFO] [db.go:615] ["BlobManager finished"]
[2021/09/01 21:18:25.592 +05:30] [INFO] [db.go:619] ["ResourceManager finished"]
[2021/09/01 21:18:25.592 +05:30] [INFO] [db.go:625] ["Waiting for closer"]
[2021/09/01 21:18:25.631 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=1] [schemaVersion=27] [cur_db=] [sql="create database if not exists test_db"] [user=]
[2021/09/01 21:18:25.631 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=5] [schemaVersion=27] [cur_db=] [sql="create database if not exists gen_global_id_fail"] [user=]
[2021/09/01 21:18:25.631 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=4] [schemaVersion=27] [cur_db=test] [sql="drop table if exists t;"] [user=]
[2021/09/01 21:18:25.631 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=27] [cur_db=test] [sql="drop table if exists t;"] [user=]
[2021/09/01 21:18:25.631 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=7] [schemaVersion=27] [cur_db=test] [sql="drop table if exists t"] [user=]
[2021/09/01 21:18:25.632 +05:30] [INFO] [tidb.go:243] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/09/01 21:18:25.632 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=6] [schemaVersion=27] [cur_db=test] [sql="drop table if exists t"] [user=]
[2021/09/01 21:18:25.632 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=7] [schemaVersion=27] [cur_db=test] [sql="create table t(c1 int, c2 int)"] [user=]
[2021/09/01 21:18:25.632 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=3] [schemaVersion=27] [cur_db=test] [sql="create table partition_add_idx (\n\tid int not null,\n\thired date not null\n\t)\n\tpartition by range( year(hired) ) (\n\tpartition p1 values less than (1991),\n\tpartition p5 values less than (2008),\n\tpartition p7 values less than (2018)\n\t);"] [user=]
[2021/09/01 21:18:25.632 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=4] [schemaVersion=27] [cur_db=test] [sql="create table t (a int not null default 1, b int default 2, c int not null default 0, primary key(c), index idx(b), index idx1(a), index idx2(b, c))"] [user=]
[2021/09/01 21:18:25.632 +05:30] [INFO] [tidb.go:243] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/09/01 21:18:25.632 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=6] [schemaVersion=27] [cur_db=test] [sql="create table t(a int)"] [user=]
[2021/09/01 21:18:25.632 +05:30] [INFO] [session.go:2834] ["CRUCIAL OPERATION"] [conn=2] [schemaVersion=27] [cur_db=test] [sql="create table t (a int) partition by range(a) (partition p0 values less than (10));"] [user=]
[2021/09/01 21:18:25.632 +05:30] [INFO] [tidb.go:243] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/09/01 21:18:25.632 +05:30] [WARN] [session.go:1571] ["run statement failed"] [schemaVersion=27] [error="context canceled"] [errorVerbose="context canceled\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465\ngithub.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102\ngithub.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155\ngithub.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117\ngithub.com/pingcap/tidb/kv.IncInt64\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26\ngithub.com/pingcap/tidb/structure.(*TxStructure).Inc\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63\ngithub.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444\ngithub.com/pingcap/tidb/kv.RunInNewTxn\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateSchemaWithInfo\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:120\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateSchema\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:88\ngithub.com/pingcap/tidb/executor.(*DDLExec).executeCreateDatabase\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:337\ngithub.com/pingcap/tidb/executor.(*DDLExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:196\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568\ngithub.com/pingcap/tidb/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130\ngithub.com/pingcap/tidb/testkit.(*TestKit).MustExec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62\ngithub.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestAddIndexWorkerNum\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:465\ngithub.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func4\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:77\ntesting.tRunner\n\t/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 1,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/09/01 21:18:25.632 +05:30] [INFO] [tidb.go:243] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/09/01 21:18:25.632 +05:30] [WARN] [session.go:1571] ["run statement failed"] [schemaVersion=27] [error="context canceled"] [errorVerbose="context canceled\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465\ngithub.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102\ngithub.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155\ngithub.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117\ngithub.com/pingcap/tidb/kv.IncInt64\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26\ngithub.com/pingcap/tidb/structure.(*TxStructure).Inc\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63\ngithub.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444\ngithub.com/pingcap/tidb/kv.RunInNewTxn\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435\ngithub.com/pingcap/tidb/ddl.(*ddl).assignTableID\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847\ngithub.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352\ngithub.com/pingcap/tidb/executor.(*DDLExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568\ngithub.com/pingcap/tidb/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130\ngithub.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestRunDDLJobPanic\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:553\ngithub.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func5\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:81\ntesting.tRunner\n\t/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259"] [session="{\n  \"currDBName\": \"test\",\n  \"id\": 7,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/09/01 21:18:25.632 +05:30] [INFO] [tidb.go:243] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/09/01 21:18:25.632 +05:30] [WARN] [session.go:1571] ["run statement failed"] [schemaVersion=27] [error="context canceled"] [errorVerbose="context canceled\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465\ngithub.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102\ngithub.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155\ngithub.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117\ngithub.com/pingcap/tidb/kv.IncInt64\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26\ngithub.com/pingcap/tidb/structure.(*TxStructure).Inc\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63\ngithub.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444\ngithub.com/pingcap/tidb/kv.RunInNewTxn\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateSchemaWithInfo\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:120\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateSchema\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:88\ngithub.com/pingcap/tidb/executor.(*DDLExec).executeCreateDatabase\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:337\ngithub.com/pingcap/tidb/executor.(*DDLExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:196\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568\ngithub.com/pingcap/tidb/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130\ngithub.com/pingcap/tidb/testkit.(*TestKit).MustExec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62\ngithub.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestGenGlobalIDFail\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:409\ngithub.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func3\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:73\ntesting.tRunner\n\t/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 5,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/09/01 21:18:25.632 +05:30] [WARN] [session.go:1571] ["run statement failed"] [schemaVersion=27] [error="context canceled"] [errorVerbose="context canceled\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465\ngithub.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102\ngithub.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155\ngithub.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117\ngithub.com/pingcap/tidb/kv.IncInt64\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26\ngithub.com/pingcap/tidb/structure.(*TxStructure).Inc\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63\ngithub.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444\ngithub.com/pingcap/tidb/kv.RunInNewTxn\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435\ngithub.com/pingcap/tidb/ddl.(*ddl).assignTableID\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847\ngithub.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352\ngithub.com/pingcap/tidb/executor.(*DDLExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568\ngithub.com/pingcap/tidb/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130\ngithub.com/pingcap/tidb/testkit.(*TestKit).MustExec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62\ngithub.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestModifyColumn\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:584\ngithub.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func7\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:89"] [session="{\n  \"currDBName\": \"test\",\n  \"id\": 4,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/09/01 21:18:25.632 +05:30] [INFO] [tidb.go:243] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/09/01 21:18:25.632 +05:30] [INFO] [tidb.go:243] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/09/01 21:18:25.632 +05:30] [WARN] [session.go:1571] ["run statement failed"] [schemaVersion=27] [error="context canceled"] [errorVerbose="context canceled\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465\ngithub.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102\ngithub.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155\ngithub.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117\ngithub.com/pingcap/tidb/kv.IncInt64\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26\ngithub.com/pingcap/tidb/structure.(*TxStructure).Inc\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63\ngithub.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444\ngithub.com/pingcap/tidb/kv.RunInNewTxn\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435\ngithub.com/pingcap/tidb/ddl.(*ddl).assignTableID\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847\ngithub.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352\ngithub.com/pingcap/tidb/executor.(*DDLExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568\ngithub.com/pingcap/tidb/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130\ngithub.com/pingcap/tidb/testkit.(*TestKit).MustExec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62\ngithub.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestFailSchemaSyncer\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:365\ngithub.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func2\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:68"] [session="{\n  \"currDBName\": \"test\",\n  \"id\": 6,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/09/01 21:18:25.632 +05:30] [WARN] [session.go:1571] ["run statement failed"] [schemaVersion=27] [error="context canceled"] [errorVerbose="context canceled\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465\ngithub.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102\ngithub.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155\ngithub.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117\ngithub.com/pingcap/tidb/kv.IncInt64\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26\ngithub.com/pingcap/tidb/structure.(*TxStructure).Inc\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63\ngithub.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444\ngithub.com/pingcap/tidb/kv.RunInNewTxn\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435\ngithub.com/pingcap/tidb/ddl.(*ddl).assignTableID\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847\ngithub.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352\ngithub.com/pingcap/tidb/executor.(*DDLExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568\ngithub.com/pingcap/tidb/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130\ngithub.com/pingcap/tidb/testkit.(*TestKit).MustExec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62\ngithub.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestPartitionAddIndexGC\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:561\ngithub.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func6\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:85"] [session="{\n  \"currDBName\": \"test\",\n  \"id\": 3,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/09/01 21:18:25.632 +05:30] [WARN] [session.go:1571] ["run statement failed"] [schemaVersion=27] [error="context canceled"] [errorVerbose="context canceled\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.Trace\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119\ngithub.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542\ngithub.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465\ngithub.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102\ngithub.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get\n\t/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155\ngithub.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117\ngithub.com/pingcap/tidb/kv.IncInt64\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26\ngithub.com/pingcap/tidb/structure.(*TxStructure).Inc\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63\ngithub.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444\ngithub.com/pingcap/tidb/kv.RunInNewTxn\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47\ngithub.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435\ngithub.com/pingcap/tidb/ddl.(*ddl).assignTableID\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847\ngithub.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352\ngithub.com/pingcap/tidb/executor.(*DDLExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568\ngithub.com/pingcap/tidb/testkit.(*TestKit).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130\ngithub.com/pingcap/tidb/testkit.(*TestKit).MustExec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62\ngithub.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestPartitionAddPanicCopy\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:682\ngithub.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func8\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:93"] [session="{\n  \"currDBName\": \"test\",\n  \"id\": 2,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
--- FAIL: TestTCopy (0.34s)
    --- FAIL: TestTCopy/TestRunDDLJobPanic (0.00s)
        fail_db_test.go:555: 
            	Error Trace:	fail_db_test.go:555
            	            				fail_db_test.go:81
            	Error:      	Error message not equal:
            	            	expected: "[ddl:8214]Cancelled DDL job"
            	            	actual  : "context canceled"
            	Test:       	TestTCopy/TestRunDDLJobPanic
    --- FAIL: TestTCopy/TestAddIndexWorkerNum (0.00s)
        testkit.go:64: 
            	Error Trace:	testkit.go:64
            	            				fail_db_test.go:465
            	            				fail_db_test.go:77
            	Error:      	Received unexpected error:
            	            	context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateSchemaWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:120
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateSchema
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:88
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateDatabase
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:337
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:196
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestAddIndexWorkerNum
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:465
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func4
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:77
            	            	testing.tRunner
            	            		/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259
            	Test:       	TestTCopy/TestAddIndexWorkerNum
            	Messages:   	sql:create database if not exists test_db, [], error stack context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateSchemaWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:120
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateSchema
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:88
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateDatabase
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:337
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:196
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestAddIndexWorkerNum
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:465
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func4
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:77
            	            	testing.tRunner
            	            		/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259
    --- FAIL: TestTCopy/TestModifyColumn (0.00s)
        testkit.go:64: 
            	Error Trace:	testkit.go:64
            	            				fail_db_test.go:584
            	            				fail_db_test.go:89
            	Error:      	Received unexpected error:
            	            	context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).assignTableID
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestModifyColumn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:584
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func7
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:89
            	Test:       	TestTCopy/TestModifyColumn
            	Messages:   	sql:create table t (a int not null default 1, b int default 2, c int not null default 0, primary key(c), index idx(b), index idx1(a), index idx2(b, c)), [], error stack context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).assignTableID
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestModifyColumn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:584
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func7
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:89
    --- FAIL: TestTCopy/TestFailSchemaSyncer (0.00s)
        testkit.go:64: 
            	Error Trace:	testkit.go:64
            	            				fail_db_test.go:365
            	            				fail_db_test.go:68
            	Error:      	Received unexpected error:
            	            	context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).assignTableID
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestFailSchemaSyncer
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:365
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func2
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:68
            	Test:       	TestTCopy/TestFailSchemaSyncer
            	Messages:   	sql:create table t(a int), [], error stack context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).assignTableID
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestFailSchemaSyncer
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:365
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func2
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:68
    --- FAIL: TestTCopy/TestGenGlobalIDFail (0.00s)
        testkit.go:64: 
            	Error Trace:	testkit.go:64
            	            				fail_db_test.go:409
            	            				fail_db_test.go:73
            	Error:      	Received unexpected error:
            	            	context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateSchemaWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:120
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateSchema
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:88
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateDatabase
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:337
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:196
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestGenGlobalIDFail
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:409
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func3
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:73
            	            	testing.tRunner
            	            		/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259
            	Test:       	TestTCopy/TestGenGlobalIDFail
            	Messages:   	sql:create database if not exists gen_global_id_fail, [], error stack context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateSchemaWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:120
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateSchema
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:88
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateDatabase
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:337
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:196
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestGenGlobalIDFail
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:409
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func3
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:73
            	            	testing.tRunner
            	            		/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259
        fail_db_test.go:406: 
            	Error Trace:	fail_db_test.go:406
            	            				panic.go:642
            	            				testing.go:756
            	            				testkit.go:64
            	            				fail_db_test.go:409
            	            				fail_db_test.go:73
            	Error:      	Received unexpected error:
            	            	failpoint: failpoint is disabled
            	            	error on github.com/pingcap/tidb/ddl/mockGenGlobalIDFail
            	            	github.com/pingcap/failpoint.(*Failpoints).Disable
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/failpoint@v0.0.0-20210316064728-7acb0f0a3dfd/failpoints.go:142
            	            	github.com/pingcap/failpoint.Disable
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/failpoint@v0.0.0-20210316064728-7acb0f0a3dfd/failpoints.go:237
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestGenGlobalIDFail.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:406
            	            	runtime.Goexit
            	            		/usr/local/Cellar/go/1.17/libexec/src/runtime/panic.go:642
            	            	testing.(*common).FailNow
            	            		/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:756
            	            	github.com/stretchr/testify/require.NoError
            	            		/Users/karuppiahn/go/pkg/mod/github.com/stretchr/testify@v1.7.0/require/require.go:1234
            	            	github.com/stretchr/testify/require.(*Assertions).NoError
            	            		/Users/karuppiahn/go/pkg/mod/github.com/stretchr/testify@v1.7.0/require/require_forward.go:967
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:64
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestGenGlobalIDFail
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:409
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func3
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:73
            	            	testing.tRunner
            	            		/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259
            	            	runtime.goexit
            	            		/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581
            	Test:       	TestTCopy/TestGenGlobalIDFail
    --- FAIL: TestTCopy/TestPartitionAddIndexGC (0.00s)
        testkit.go:64: 
            	Error Trace:	testkit.go:64
            	            				fail_db_test.go:561
            	            				fail_db_test.go:85
            	Error:      	Received unexpected error:
            	            	context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).assignTableID
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestPartitionAddIndexGC
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:561
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func6
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:85
            	Test:       	TestTCopy/TestPartitionAddIndexGC
            	Messages:   	sql:create table partition_add_idx (
            	            		id int not null,
            	            		hired date not null
            	            		)
            	            		partition by range( year(hired) ) (
            	            		partition p1 values less than (1991),
            	            		partition p5 values less than (2008),
            	            		partition p7 values less than (2018)
            	            		);, [], error stack context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).assignTableID
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestPartitionAddIndexGC
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:561
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func6
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:85
    --- FAIL: TestTCopy/TestPartitionAddPanicCopy (0.00s)
        testkit.go:64: 
            	Error Trace:	testkit.go:64
            	            				fail_db_test.go:682
            	            				fail_db_test.go:93
            	Error:      	Received unexpected error:
            	            	context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).assignTableID
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestPartitionAddPanicCopy
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:682
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func8
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:93
            	Test:       	TestTCopy/TestPartitionAddPanicCopy
            	Messages:   	sql:create table t (a int) partition by range(a) (partition p0 values less than (10));, [], error stack context canceled
            	            	github.com/pingcap/errors.AddStack
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174
            	            	github.com/pingcap/errors.Trace
            	            		/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/juju_adaptor.go:15
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).onSendFail
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1157
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).sendReqToRegion
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:1119
            	            	github.com/tikv/client-go/v2/internal/locate.(*RegionRequestSender).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/locate/region_request.go:899
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*ClientHelper).SendReqCtx
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/client_helper.go:108
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:542
            	            	github.com/tikv/client-go/v2/txnkv/txnsnapshot.(*KVSnapshot).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/txnsnapshot/snapshot.go:465
            	            	github.com/tikv/client-go/v2/internal/unionstore.(*KVUnionStore).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/internal/unionstore/union_store.go:102
            	            	github.com/tikv/client-go/v2/txnkv/transaction.(*KVTxn).Get
            	            		/Users/karuppiahn/go/pkg/mod/github.com/tikv/client-go/v2@v2.0.0-alpha.0.20210824090536-16d902a3c7e5/txnkv/transaction/txn.go:155
            	            	github.com/pingcap/tidb/store/driver/txn.(*tikvTxn).Get
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/store/driver/txn/txn_driver.go:117
            	            	github.com/pingcap/tidb/kv.IncInt64
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/utils.go:26
            	            	github.com/pingcap/tidb/structure.(*TxStructure).Inc
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/structure/string.go:63
            	            	github.com/pingcap/tidb/meta.(*Meta).GenGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/meta/meta.go:156
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs.func1
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:444
            	            	github.com/pingcap/tidb/kv.RunInNewTxn
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/kv/txn.go:47
            	            	github.com/pingcap/tidb/ddl.(*ddl).genGlobalIDs
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl.go:435
            	            	github.com/pingcap/tidb/ddl.(*ddl).assignTableID
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1787
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTableWithInfo
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1906
            	            	github.com/pingcap/tidb/ddl.(*ddl).CreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1847
            	            	github.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:352
            	            	github.com/pingcap/tidb/executor.(*DDLExec).Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:198
            	            	github.com/pingcap/tidb/executor.Next
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:581
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:462
            	            	github.com/pingcap/tidb/executor.(*ExecStmt).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:411
            	            	github.com/pingcap/tidb/session.runStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1674
            	            	github.com/pingcap/tidb/session.(*session).ExecuteStmt
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1568
            	            	github.com/pingcap/tidb/testkit.(*TestKit).Exec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:130
            	            	github.com/pingcap/tidb/testkit.(*TestKit).MustExec
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/testkit/testkit.go:62
            	            	github.com/pingcap/tidb/ddl/failtest_test.(*testFailDBSuite).MyTestPartitionAddPanicCopy
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:682
            	            	github.com/pingcap/tidb/ddl/failtest_test.TestTCopy.func8
            	            		/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/failtest/fail_db_test.go:93
FAIL
FAIL	github.com/pingcap/tidb/ddl/failtest	1.297s
FAIL
tidb $ 
```

Like this

```go
t.Run("TestFailSchemaSyncer", func(t *testing.T) {
    t.Parallel()
    s.MyTestFailSchemaSyncer(t)
})

t.Run("TestGenGlobalIDFail", func(t *testing.T) {
    t.Parallel()
    s.MyTestGenGlobalIDFail(t)
})
t.Run("TestAddIndexWorkerNum", func(t *testing.T) {
    t.Parallel()
    s.MyTestAddIndexWorkerNum(t)
})
t.Run("TestRunDDLJobPanic", func(t *testing.T) {
    t.Parallel()
    s.MyTestRunDDLJobPanic(t)
})
t.Run("TestPartitionAddIndexGC", func(t *testing.T) {
    t.Parallel()
    s.MyTestPartitionAddIndexGC(t)
})
t.Run("TestModifyColumn", func(t *testing.T) {
    t.Parallel()
    s.MyTestModifyColumn(t)
})
t.Run("TestPartitionAddPanicCopy", func(t *testing.T) {
    t.Parallel()
    s.MyTestPartitionAddPanicCopy(t)
})
```

But it failed, hmm

Not sure why the `context cancelled` errors, hmm

https://duckduckgo.com/?t=ffab&q=golang+test+context+cancelled+error&ia=web&iax=qa

Looks like only some tests are meant to be run within a few seconds as per `tools/check/check-timeout.go` and `Makefile`'s `gotest` target that uses that check-timeout code to do a time check by parsing the golang test logs

```Makefile
gotest: failpoint-enable
ifeq ("$(TRAVIS_COVERAGE)", "1")
	@echo "Running in TRAVIS_COVERAGE mode."
	$(GO) get github.com/go-playground/overalls
	@export log_level=info; \
	$(OVERALLS) -project=github.com/pingcap/tidb \
			-covermode=count \
			-ignore='.git,br,vendor,cmd,docs,tests,LICENSES' \
			-concurrency=4 \
			-- -coverpkg=./... \
			|| { $(FAILPOINT_DISABLE); exit 1; }
else
	@echo "Running in native mode."
	@export log_level=info; export TZ='Asia/Shanghai'; \
	$(GOTEST) -ldflags '$(TEST_LDFLAGS)' $(EXTRA_TEST_ARGS) -v -cover $(PACKAGES_WITHOUT_BR) -check.p true > gotest.log || { $(FAILPOINT_DISABLE); cat 'gotest.log'; exit 1; }
	@echo "timeout-check"
	grep 'PASS:' gotest.log | go run tools/check/check-timeout.go || { $(FAILPOINT_DISABLE); exit 1; }
endif
	@$(FAILPOINT_DISABLE)
```

Looks like two tests from testFailDBSuite are like that

testFailDBSuite.TestAddIndexFailed
testFailDBSuite.TestAddIndexWorkerNum

I think others just take time and we can't help it. check-timeout checks timeout only for some of the tests, it's not for all tests

```bash
tidb $ { make failpoint-enable; go test -run ^TestTCopy$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; }
ok  	github.com/pingcap/tidb/ddl/failtest	65.858s
tidb $ 
```

I just removed `t.Parallel` for now!

I just finished migrating `TestAddIndexFailed`!!

3 more to go!!

```bash
tidb $ { make failpoint-enable; go test -run ^TestTCopy$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; }
ok  	github.com/pingcap/tidb/ddl/failtest	118.568s
tidb $ 
```

Wow, that does take a lot of time! Hmm

Let's try `TestHalfwayCancelOperations` test now! ;)

I have migrated `TestHalfwayCancelOperations` now. Checking how the tests run! It will take more than 2 minutes I suppose!

```bash
tidb $ { make failpoint-enable; go test -run ^TestTCopy$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; } 
ok  	github.com/pingcap/tidb/ddl/failtest	122.280s
tidb $ 
```

Yup! Worked! :D

I migrated `TestInitializeOffsetAndState` too now! ;)

Last one is `TestUpdateHandleFailed` ;)

Let me run tests for checking if everything is good with `TestInitializeOffsetAndState`

Yup, it worked!

```bash
tidb $ { make failpoint-enable; go test -run ^TestTCopy$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; } 
ok  	github.com/pingcap/tidb/ddl/failtest	120.545s
tidb $ 
```

Now `TestUpdateHandleFailed`!

I migrated that too! Now running tests! :D

It worked!

```bash
tidb $ { make failpoint-enable; go test -run ^TestTCopy$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; } 
ok  	github.com/pingcap/tidb/ddl/failtest	134.869s
tidb $ 
```

---

Everything works now!! After all the small renames etc

```bash
tidb $ { make failpoint-enable; go test -run ^TestTCopy$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; } 
ok  	github.com/pingcap/tidb/ddl/failtest	1.102s [no tests to run]
tidb $ { make failpoint-enable; go test -run ^TestT$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; } 
ok  	github.com/pingcap/tidb/ddl/failtest	127.568s
tidb $ 
```

- I need to rebase branch with latest master [DONE]
- I need to run the golang tests of this one package alone once [DONE]
- I then need to run all the golang tests once [DONE]
- Have a separate copy of the branch since I'll be force pushing to this one for review comments, squashing commits etc and don't want to lose anything by mistake, given it's a big change [DONE]
- Raise PR and ask for comments! Mention that I'll squash commits later! and that separate commits can help for review!

```bash
tidb $ { make failpoint-enable; go test -run ^TestT$ github.com/pingcap/tidb/ddl/failtest; make failpoint-disable; } 
ok  	github.com/pingcap/tidb/ddl/failtest	126.994s
tidb $ 
```

Running all the tests I'm seeing some errors

```bash
$ make gotest
Running in native mode.
# github.com/pingcap/tidb/ddl_test [github.com/pingcap/tidb/ddl.test]
ddl/db_partition_test.go:2633:33: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".SessionExecInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, chan error)
ddl/db_test.go:1352:36: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".SessionExecInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, chan error)
ddl/db_test.go:1546:36: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".SessionExecInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, chan error)
ddl/db_test.go:1724:36: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".SessionExecInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, chan error)
ddl/db_test.go:2343:36: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".SessionExecInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, chan error)
ddl/db_test.go:2489:36: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".SessionExecInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, chan error)
ddl/db_test.go:2555:37: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".ExecMultiSQLInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, []string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, []string, chan error)
ddl/db_test.go:2557:38: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".ExecMultiSQLInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, []string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, []string, chan error)
ddl/db_test.go:3790:36: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".SessionExecInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, chan error)
```

It's interesting because VS Code showed me only one reference for `SessionExecInGoroutine` in terms of usage. But there are actually more, hmm. I can fix them though, no problem!

Apart from that failure, there are some more interesting failures!

```bash
...
FAIL	github.com/pingcap/tidb/ddl [build failed]
...

FAIL: integration_test.go:91: testIntegrationSerialSuite.SetUpTest

integration_test.go:94:
    c.Assert(err, IsNil)
... value *errors.withStack = Error while opening blob files: fcntl /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2751969540/kv: too many open files ("Error while opening blob files: fcntl /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2751969540/kv: too many open files")


----------------------------------------------------------------------
PANIC: integration_test.go:97: testIntegrationSerialSuite.TearDownTest

... Panic: runtime error: invalid memory address or nil pointer dereference (PC=0x4037674)
...
----------------------------------------------------------------------
FAIL: prepare_test.go:895: testPlanSerialSuite.TestIssue18066

prepare_test.go:898:
    c.Assert(err, IsNil)
... value *errors.withStack = While opening directory: /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3732352425/kv.: open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3732352425/kv: too many open files ("While opening directory: /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3732352425/kv.: open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3732352425/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:1175: testPlanSerialSuite.TestIssue23671

prepare_test.go:1177:
    c.Assert(err, IsNil)
... value *errors.withStack = Cannot write pid file "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1110488686/kv/LOCK": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1110488686/kv/LOCK: too many open files ("Cannot write pid file \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1110488686/kv/LOCK\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1110488686/kv/LOCK: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:1205: testPlanSerialSuite.TestPartitionTable

prepare_test.go:1212:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2188367512/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2188367512/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2188367512/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2188367512/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:1347: testPlanSerialSuite.TestPartitionWithVariedDatasources

prepare_test.go:1354:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3624045067/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3624045067/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3624045067/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3624045067/kv: too many open files")


----------------------------------------------------------------------
SKIP: prepare_test.go:817: testPlanSerialSuite.TestPlanCacheHitInfo (unstable, skip it and fix it before 20210705)

----------------------------------------------------------------------
FAIL: prepare_test.go:1081: testPlanSerialSuite.TestPlanCachePointGetAndTableDual

prepare_test.go:1083:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1672961791/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1672961791/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1672961791/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1672961791/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:1029: testPlanSerialSuite.TestPlanCacheSnapshot

prepare_test.go:1031:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1843549237/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1843549237/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1843549237/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1843549237/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:713: testPlanSerialSuite.TestPlanCacheUnionScan

prepare_test.go:715:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3715476300/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3715476300/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3715476300/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3715476300/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:861: testPlanSerialSuite.TestPlanCacheUnsignedHandleOverflow

prepare_test.go:864:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1062991286/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1062991286/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1062991286/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1062991286/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:170: testPlanSerialSuite.TestPrepareCacheDeferredFunction

prepare_test.go:173:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3243320692/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3243320692/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3243320692/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3243320692/kv: too many open files")


----------------------------------------------------------------------
FAIL: point_get_plan_test.go:49: testPointGetSuite.SetUpSuite

point_get_plan_test.go:52:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/point_get_plan_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp4105400036/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp4105400036/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp4105400036/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp4105400036/kv: too many open files")

....
----------------------------------------------------------------------
PANIC: point_get_plan_test.go:59: testPointGetSuite.TearDownSuite

... Panic: runtime error: invalid memory address or nil pointer dereference (PC=0x4037674)

/usr/local/Cellar/go/1.17/libexec/src/runtime/panic.go:1038
  in gopanic
/usr/local/Cellar/go/1.17/libexec/src/runtime/panic.go:221
  in panicmem
/usr/local/Cellar/go/1.17/libexec/src/runtime/signal_unix.go:735
  in sigpanic
point_get_plan_test.go:61
  in testPointGetSuite.TearDownSuite
/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339
  in Value.Call
/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:799
  in suiteRunner.runFixture.func1
/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739
  in suiteRunner.forkCall.func1
/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581
  in goexit

----------------------------------------------------------------------
FAIL: prepare_test.go:606: testPrepareSerialSuite.TestConstPropAndPPDWithCache

prepare_test.go:609:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1894236426/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1894236426/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1894236426/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1894236426/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:54: testPrepareSerialSuite.TestPrepareCache

prepare_test.go:57:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3383912292/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3383912292/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3383912292/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp3383912292/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:468: testPrepareSerialSuite.TestPrepareCacheForPartition

prepare_test.go:471:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2033610263/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2033610263/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2033610263/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp2033610263/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:141: testPrepareSerialSuite.TestPrepareCacheIndexScan

prepare_test.go:144:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp4025238344/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp4025238344/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp4025238344/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp4025238344/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:227: testPrepareSerialSuite.TestPrepareCacheNow

prepare_test.go:230:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp370526589/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp370526589/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp370526589/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp370526589/kv: too many open files")


----------------------------------------------------------------------
FAIL: prepare_test.go:1000: testPrepareSerialSuite.TestPrepareCacheWithJoinTable

prepare_test.go:1003:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/prepare_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp35294711/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp35294711/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp35294711/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp35294711/kv: too many open files")


----------------------------------------------------------------------
SKIP: prepare_test.go:256: testPrepareSerialSuite.TestPrepareOverMaxPreparedStmtCount (unstable, skip it and fix it before 20210705)
SKIP: prepare_test.go:306: testPrepareSerialSuite.TestPrepareTableAsNameOnGroupByWithCache (unstable, skip it and fix it before 20210702)

----------------------------------------------------------------------
FAIL: rule_result_reorder_test.go:41: testRuleReorderResultsSerial.SetUpTest

rule_result_reorder_test.go:44:
    ...open /Users/karuppiahn/projects/github.com/pingcap/tidb/planner/core/rule_result_reorder_test.go: too many open files
... value *errors.withStack = cannot open directory "/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1325289095/kv": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1325289095/kv: too many open files ("cannot open directory \"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1325289095/kv\": open /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/tidb-unistore-temp1325289095/kv: too many open files")


----------------------------------------------------------------------
PANIC: rule_result_reorder_test.go:47: testRuleReorderResultsSerial.TearDownTest

... Panic: runtime error: invalid memory address or nil pointer dereference (PC=0x4037674)

/usr/local/Cellar/go/1.17/libexec/src/runtime/panic.go:1038
  in gopanic
/usr/local/Cellar/go/1.17/libexec/src/runtime/panic.go:221
  in panicmem
/usr/local/Cellar/go/1.17/libexec/src/runtime/signal_unix.go:735
  in sigpanic
rule_result_reorder_test.go:49
  in testRuleReorderResultsSerial.TearDownTest
/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339
  in Value.Call
/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:799
  in suiteRunner.runFixture.func1
/Users/karuppiahn/go/pkg/mod/github.com/pingcap/check@v0.0.0-20200212061837-5e12011dc712/check.go:739
  in suiteRunner.forkCall.func1
/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_amd64.s:1581
  in goexit

----------------------------------------------------------------------
PANIC: rule_result_reorder_test.go:100: testRuleReorderResultsSerial.TestClusteredIndex

... Panic: Fixture has panicked (see related PANIC)

----------------------------------------------------------------------
MISS: rule_result_reorder_test.go:52: testRuleReorderResultsSerial.TestPlanCache
MISS: rule_result_reorder_test.go:77: testRuleReorderResultsSerial.TestSQLBinding
OOPS: 344 passed, 3 skipped, 18 FAILED, 3 FIXTURE-PANICKED, 71 MISSED
--- FAIL: TestT (60.58s)
FAIL
coverage: 75.2% of statements
FAIL	github.com/pingcap/tidb/planner/core	62.161s
```

I fixed the errors, also increased the `ulimit` for many open files issue, let's see how it goes this time!

Oh wait. I also didn't run failpoint-enable before the gotest. Hmm. Oh wait, it's not needed. `make gotest` automatically does it!

Another problem that I missed!

```bash
tidb $ make gotest
Running in native mode.
# github.com/pingcap/tidb/ddl_test [github.com/pingcap/tidb/ddl.test]
ddl/db_test.go:2555:37: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".ExecMultiSQLInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, []string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, []string, chan error)
ddl/db_test.go:2557:38: too many arguments in call to "github.com/pingcap/tidb/ddl/testutil".ExecMultiSQLInGoroutine
	have (*check.C, "github.com/pingcap/tidb/kv".Storage, string, []string, chan error)
	want ("github.com/pingcap/tidb/kv".Storage, string, []string, chan error)
```

`ExecMultiSQLInGoroutine` function!

Just one failure now, just build failure

```bash
FAIL	github.com/pingcap/tidb/ddl [build failed]
```

I fixed build error and it again failed for timeout issues, hmm

```bash
tidb $ make gotest
Running in native mode.
timeout-check
grep 'PASS:' gotest.log | go run tools/check/check-timeout.go || { $(find $PWD/ -type d | grep -vE "(\.git|tools)" | xargs tools/bin/failpoint-ctl disable); exit 1; }
The following test cases take too long to finish:
    --- PASS: TestT/TestAddIndexFailed (71.08s)
    --- PASS: TestT/TestAddIndexWorkerNum (55.20s)
PASS: builtin_time_vec_generated_test.go:6727: testVectorizeSuite1.TestVectorizedBuiltinTimeEvalOneVecGenerated	8.240s
PASS: builtin_time_vec_test.go:575: testVectorizeSuite2.TestVectorizedBuiltinTimeEvalOneVec	9.063s
--- PASS: TestClusterConfigInfoschema (6.09s)
--- PASS: TestCTEPreviewAndReport (6.78s)
exit status 252
make: *** [gotest] Error 1
tidb $ 
```

I gotta get help with that to understand why it takes time etc

Saw an error in CI pipeline, hmm

It checks if a test suite is enabled or not, interesting

```bash
tidb $ make check
gofmt (simplify)
br/pkg/lightning/web/res.go
br/pkg/lightning/web/res_vfsdata.go
br/pkg/lightning/sigusr1_other.go
br/pkg/lightning/sigusr1_unix.go
br/pkg/lightning/backend/local/local_freebsd.go
br/pkg/lightning/backend/local/local_unix.go
br/pkg/lightning/backend/local/local_unix_generic.go
br/pkg/lightning/backend/local/local_windows.go
br/pkg/lightning/common/storage_windows.go
br/pkg/lightning/common/storage_unix.go
br/pkg/lightning/manual/manual_nocgo.go
br/pkg/lightning/lightning_test.go
br/pkg/storage/local_unix.go
br/pkg/storage/local_windows.go
br/pkg/utils/dyn_pprof_other.go
br/pkg/utils/dyn_pprof_unix.go
ddl/restart_test.go
expression/generator/control_vec.go
expression/generator/other_vec.go
expression/generator/time_vec.go
expression/generator/string_vec.go
expression/generator/compare_vec.go
server/tidb_test.go
testkit/testdata/testdata.go
testkit/mockstore.go
testkit/asynctestkit.go
testkit/testkit.go
testkit/handle.go
testkit/result.go
util/testbridge/bridge.go
util/localpool/localpool_test.go
util/localpool/localpool_norace.go
util/localpool/localpool_race.go
util/testleak/fake.go
util/testleak/leaktest.go
util/testkit/fake.go
util/testkit/testkit.go
util/israce/israce.go
util/israce/norace.go
util/sys/storage/sys_windows.go
util/sys/storage/sys_posix.go
util/sys/storage/sys_other.go
util/sys/linux/sys_linux.go
util/sys/linux/sys_other.go
util/testutil/testutil.go
util/signal/signal_windows.go
util/signal/signal_posix.go
make: *** [fmt] Error 1
tidb $ echo $?
2
tidb $ echo $?
0
tidb $ make check
gofmt (simplify)
cd tools/check; \
	GO111MODULE=on go build -o ../bin/unconvert github.com/mdempsky/unconvert
go: downloading github.com/mdempsky/unconvert v0.0.0-20200228143138-95ecdbfc0b5f
go: downloading golang.org/x/tools v0.0.0-20200225230052-807dcd883420
unconvert check(skip check the genenrated or copied code in lightning)
/Users/karuppiahn/projects/github.com/pingcap/tidb/types/convert.go:538:10: constant  overflow
/Users/karuppiahn/projects/github.com/pingcap/tidb/statistics/scalar.go:85:10: constant  overflow
/Users/karuppiahn/projects/github.com/pingcap/tidb/statistics/scalar.go:85:10: constant  overflow
/Users/karuppiahn/projects/github.com/pingcap/tidb/types/convert.go:538:10: constant  overflow
/Users/karuppiahn/projects/github.com/pingcap/tidb/types/convert_test.go:485:30: constant  overflow
/Users/karuppiahn/projects/github.com/pingcap/tidb/types/convert_test.go:486:30: constant  overflow
cd tools/check; \
	GO111MODULE=on go build -o ../bin/revive github.com/mgechev/revive
go: downloading github.com/mgechev/revive v0.0.0-20181210140514-b4cc152955fb
go: downloading github.com/BurntSushi/toml v0.3.0
go: downloading github.com/mgechev/dots v0.0.0-20180605013149-8e09d8ea2757
go: downloading github.com/olekukonko/tablewriter v0.0.0-20180912035003-be2c049b30cc
go: downloading github.com/fatih/structtag v1.0.0
go: downloading github.com/mattn/go-runewidth v0.0.3
linting
go mod tidy
./tools/check/check-tidy.sh
go: downloading github.com/cakturk/go-netstat v0.0.0-20200220111822-e5b49efee7a5
go: downloading gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c
go: downloading google.golang.org/appengine v1.6.5
go: downloading github.com/shurcooL/vfsgen v0.0.0-20181202132449-6a9ea43bcacd
go: downloading github.com/StackExchange/wmi v0.0.0-20190523213315-cbe66965904d
go: downloading github.com/eknkc/amber v0.0.0-20171010120322-cdade1c07385
go: downloading github.com/HdrHistogram/hdrhistogram-go v1.1.0
go: downloading cloud.google.com/go/bigquery v1.4.0
go: downloading cloud.google.com/go/pubsub v1.2.0
go: downloading github.com/cockroachdb/datadriven v1.0.0
go: downloading github.com/shurcooL/httpfs v0.0.0-20190707220628-8d4bc4ba7749
go: downloading github.com/onsi/ginkgo v1.13.0
go: downloading github.com/go-ole/go-ole v1.2.4
go: downloading github.com/tklauser/numcpus v0.2.1
go: downloading github.com/go-errors/errors v1.0.1
testSuite
./tools/check/check_testSuite.sh
testFailDBSuite in ./ddl/failtest is not enabled
make: *** [testSuite] Error 1
```

```bash
tidb $ make testSuite
testSuite
./tools/check/check_testSuite.sh
testFailDBSuite in ./ddl/failtest is not enabled
make: *** [testSuite] Error 1
tidb $ 
```

Looking at the script `./tools/check/check_testSuite.sh`, it looks if the `SerialSuites` function from `check` package is called with the test suite or if there's a Test method on the test suite, hmm
