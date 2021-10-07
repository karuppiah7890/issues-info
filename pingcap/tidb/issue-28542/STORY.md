https://github.com/pingcap/tidb/issues/28542

This looks like an issue in the DDL commands - Data Definition Language commands, that is, while creating a table in this case

https://pingcap.github.io/tidb-dev-guide/get-started/build-tidb-from-source.html

```bash
tidb $ make
CGO_ENABLED=1 GO111MODULE=on go build  -tags codes  -ldflags '-X "github.com/pingcap/parser/mysql.TiDBReleaseVersion=v5.3.0-alpha-263-g6eb02fbe5" -X "github.com/pingcap/tidb/util/versioninfo.TiDBBuildTS=2021-10-07 09:13:27" -X "github.com/pingcap/tidb/util/versioninfo.TiDBGitHash=6eb02fbe5ed448a2c814dd5563414fb733274329" -X "github.com/pingcap/tidb/util/versioninfo.TiDBGitBranch=master" -X "github.com/pingcap/tidb/util/versioninfo.TiDBEdition=Community" ' -o bin/tidb-server tidb-server/main.go
go: downloading github.com/pingcap/parser v0.0.0-20211004012448-687005894c4e
Build TiDB Server successfully!
tidb $ ./bin/tidb-server

[2021/10/07 19:36:10.256 +05:30] [INFO] [printer.go:34] ["Welcome to TiDB."] ["Release Version"=v5.3.0-alpha-263-g6eb02fbe5] [Edition=Community] ["Git Commit Hash"=6eb02fbe5ed448a2c814dd5563414fb733274329] ["Git Branch"=master] ["UTC Build Time"="2021-10-07 09:13:27"] [GoVersion=go1.16.8] ["Race Enabled"=false] ["Check Table Before Drop"=false] ["TiKV Min Version"=v3.0.0-60965b006877ca7234adaced7890d7b029ed1306]
[2021/10/07 19:36:10.256 +05:30] [INFO] [trackerRecorder.go:29] ["Mem Profile Tracker started"]
[2021/10/07 19:36:10.256 +05:30] [INFO] [printer.go:48] ["loaded config"] [config="{\"host\":\"0.0.0.0\",\"advertise-address\":\"192.168.1.4\",\"port\":4000,\"cors\":\"\",\"store\":\"unistore\",\"path\":\"/tmp/tidb\",\"socket\":\"\",\"lease\":\"45s\",\"run-ddl\":true,\"split-table\":true,\"token-limit\":1000,\"oom-use-tmp-storage\":true,\"tmp-storage-path\":\"/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/501_tidb/MC4wLjAuMDo0MDAwLzAuMC4wLjA6MTAwODA=/tmp-storage\",\"oom-action\":\"cancel\",\"mem-quota-query\":1073741824,\"tmp-storage-quota\":-1,\"enable-batch-dml\":false,\"lower-case-table-names\":2,\"server-version\":\"\",\"log\":{\"level\":\"info\",\"format\":\"text\",\"disable-timestamp\":null,\"enable-timestamp\":null,\"disable-error-stack\":null,\"enable-error-stack\":null,\"file\":{\"filename\":\"\",\"max-size\":300,\"max-days\":0,\"max-backups\":0},\"enable-slow-log\":true,\"slow-query-file\":\"tidb-slow.log\",\"slow-threshold\":300,\"expensive-threshold\":10000,\"query-log-max-len\":4096,\"record-plan-in-slow-log\":1},\"security\":{\"skip-grant-table\":false,\"ssl-ca\":\"\",\"ssl-cert\":\"\",\"ssl-key\":\"\",\"require-secure-transport\":false,\"cluster-ssl-ca\":\"\",\"cluster-ssl-cert\":\"\",\"cluster-ssl-key\":\"\",\"cluster-verify-cn\":null,\"spilled-file-encryption-method\":\"plaintext\",\"enable-sem\":false,\"auto-tls\":true,\"tls-version\":\"\",\"rsa-key-size\":4096},\"status\":{\"status-host\":\"0.0.0.0\",\"metrics-addr\":\"\",\"status-port\":10080,\"metrics-interval\":15,\"report-status\":true,\"record-db-qps\":false},\"performance\":{\"max-procs\":0,\"max-memory\":0,\"server-memory-quota\":0,\"memory-usage-alarm-ratio\":0.8,\"stats-lease\":\"3s\",\"stmt-count-limit\":5000,\"feedback-probability\":0,\"query-feedback-limit\":512,\"pseudo-estimate-ratio\":0.8,\"force-priority\":\"NO_PRIORITY\",\"bind-info-lease\":\"3s\",\"txn-entry-size-limit\":6291456,\"txn-total-size-limit\":104857600,\"tcp-keep-alive\":true,\"tcp-no-delay\":true,\"cross-join\":true,\"run-auto-analyze\":true,\"distinct-agg-push-down\":false,\"committer-concurrency\":128,\"max-txn-ttl\":3600000,\"mem-profile-interval\":\"1m\",\"index-usage-sync-lease\":\"0s\",\"gogc\":100,\"enforce-mpp\":false},\"prepared-plan-cache\":{\"enabled\":false,\"capacity\":100,\"memory-guard-ratio\":0.1},\"opentracing\":{\"enable\":false,\"rpc-metrics\":false,\"sampler\":{\"type\":\"const\",\"param\":1,\"sampling-server-url\":\"\",\"max-operations\":0,\"sampling-refresh-interval\":0},\"reporter\":{\"queue-size\":0,\"buffer-flush-interval\":0,\"log-spans\":false,\"local-agent-host-port\":\"\"}},\"proxy-protocol\":{\"networks\":\"\",\"header-timeout\":5},\"pd-client\":{\"pd-server-timeout\":3},\"tikv-client\":{\"grpc-connection-count\":4,\"grpc-keepalive-time\":10,\"grpc-keepalive-timeout\":3,\"grpc-compression-type\":\"none\",\"commit-timeout\":\"41s\",\"async-commit\":{\"keys-limit\":256,\"total-key-size-limit\":4096,\"safe-window\":2000000000,\"allowed-clock-drift\":500000000},\"max-batch-size\":128,\"overload-threshold\":200,\"max-batch-wait-time\":0,\"batch-wait-size\":8,\"enable-chunk-rpc\":true,\"region-cache-ttl\":600,\"store-limit\":0,\"store-liveness-timeout\":\"1s\",\"copr-cache\":{\"capacity-mb\":1000},\"ttl-refreshed-txn-size\":33554432,\"resolve-lock-lite-threshold\":16},\"binlog\":{\"enable\":false,\"ignore-error\":false,\"write-timeout\":\"15s\",\"binlog-socket\":\"\",\"strategy\":\"range\"},\"compatible-kill-query\":false,\"plugin\":{\"dir\":\"\",\"load\":\"\"},\"pessimistic-txn\":{\"max-retry-count\":256,\"deadlock-history-capacity\":10,\"deadlock-history-collect-retryable\":false},\"check-mb4-value-in-utf8\":true,\"max-index-length\":3072,\"index-limit\":64,\"table-column-count-limit\":1017,\"graceful-wait-before-shutdown\":0,\"alter-primary-key\":false,\"treat-old-version-utf8-as-utf8mb4\":true,\"enable-table-lock\":false,\"delay-clean-table-lock\":0,\"split-region-max-num\":1000,\"stmt-summary\":{\"enable\":true,\"enable-internal-query\":false,\"max-stmt-count\":3000,\"max-sql-length\":4096,\"refresh-interval\":1800,\"history-size\":24},\"top-sql\":{\"receiver-address\":\"\"},\"repair-mode\":false,\"repair-table-list\":[],\"isolation-read\":{\"engines\":[\"tikv\",\"tiflash\",\"tidb\"]},\"max-server-connections\":0,\"new_collations_enabled_on_first_bootstrap\":false,\"experimental\":{},\"enable-collect-execution-info\":true,\"skip-register-to-dashboard\":false,\"enable-telemetry\":true,\"labels\":{},\"enable-global-index\":false,\"deprecate-integer-display-length\":false,\"enable-enum-length-limit\":true,\"stores-refresh-interval\":60,\"enable-tcp4-only\":false,\"enable-forwarding\":false}"]
[2021/10/07 19:36:10.256 +05:30] [INFO] [main.go:337] ["disable Prometheus push client"]
[2021/10/07 19:36:10.256 +05:30] [INFO] [store.go:74] ["new store"] [path=unistore:///tmp/tidb]
[2021/10/07 19:36:10.256 +05:30] [INFO] [systime_mon.go:26] ["start system time monitor"]
[2021/10/07 19:36:10.320 +05:30] [INFO] [store.go:80] ["new store with retry success"]
[2021/10/07 19:36:10.320 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=2ec35b21-fd37-4bc0-b713-2b46092f96e9] ["ddl lease"=45s] ["stats lease"=3s] ["index usage sync lease"=0s]
[2021/10/07 19:36:10.323 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=695dac66-7f23-4ed5-8094-e9bddc300aae] [runWorker=true]
[2021/10/07 19:36:10.323 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/07 19:36:10.323 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 1, tp general"]
[2021/10/07 19:36:10.323 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/07 19:36:10.323 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 2, tp add index"]
[2021/10/07 19:36:10.324 +05:30] [INFO] [domain.go:163] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=0] ["start time"=743.056µs]
[2021/10/07 19:36:10.324 +05:30] [INFO] [domain.go:386] ["full load and reset schema validator"]
[2021/10/07 19:36:10.324 +05:30] [INFO] [tidb.go:246] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/10/07 19:36:10.324 +05:30] [WARN] [session.go:1579] ["run statement failed"] [schemaVersion=0] [error="[schema:1049]Unknown database 'mysql'"] [session="{\n  \"currDBName\": \"\",\n  \"id\": 0,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": null\n}"]
[2021/10/07 19:36:10.324 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=0] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS test"] [user=]
[2021/10/07 19:36:10.325 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.324 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.325 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.324 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS test"]
[2021/10/07 19:36:10.325 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:none, SchemaState:queueing, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.324 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.326 +05:30] [INFO] [domain.go:163] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=1] ["start time"=835.474µs]
[2021/10/07 19:36:10.326 +05:30] [INFO] [domain.go:386] ["full load and reset schema validator"]
[2021/10/07 19:36:10.328 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=1] ["take time"=2.512286ms] [job="ID:2, Type:create schema, State:done, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.324 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.328 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:2, Type:create schema, State:synced, SchemaState:public, SchemaID:1, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.324 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.328 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=2]
[2021/10/07 19:36:10.328 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.328 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=1] [cur_db=] [sql="CREATE DATABASE IF NOT EXISTS `mysql`"] [user=]
[2021/10/07 19:36:10.328 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.328 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.328 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.328 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE DATABASE IF NOT EXISTS `mysql`"]
[2021/10/07 19:36:10.329 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:none, SchemaState:queueing, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.328 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.329 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=1] [neededSchemaVersion=2] ["start time"=46.214µs] [phyTblIDs="[]"] [actionTypes="[]"]
[2021/10/07 19:36:10.331 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=2] ["take time"=2.277722ms] [job="ID:4, Type:create schema, State:done, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.328 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.331 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:4, Type:create schema, State:synced, SchemaState:public, SchemaID:3, TableID:0, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.328 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.332 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=4]
[2021/10/07 19:36:10.332 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.332 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=2] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"] [user=]
[2021/10/07 19:36:10.333 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.332 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.333 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.332 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.user (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tauthentication_string\tTEXT,\n\t\tplugin\t\t\t\t\tCHAR(64),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tProcess_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_db_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tSuper_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_user_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_role_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_role_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAccount_locked\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShutdown_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReload_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tFILE_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tConfig_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_Tablespace_Priv  ENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_slave_priv\t    \tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tRepl_client_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, User));"]
[2021/10/07 19:36:10.333 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.332 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.335 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=2] [neededSchemaVersion=3] ["start time"=522.679µs] [phyTblIDs="[5]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.337 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=3] ["take time"=2.498135ms] [job="ID:6, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.332 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.338 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:6, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:5, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.332 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.339 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=6]
[2021/10/07 19:36:10.339 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.339 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=2] ["first split key"=748000000000000005]
[2021/10/07 19:36:10.339 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=3] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"] [user=]
[2021/10/07 19:36:10.339 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=2] ["first at"=748000000000000005] ["first new region left"="{Id:2 StartKey: EndKey:7480000000000000ff0500000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:3 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.339 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[2]"]
[2021/10/07 19:36:10.339 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.339 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.339 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.339 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_priv (Host CHAR(255) NOT NULL DEFAULT '',User CHAR(80) NOT NULL DEFAULT '',Priv LONGTEXT NOT NULL DEFAULT '',PRIMARY KEY (Host, User))"]
[2021/10/07 19:36:10.340 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.339 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.340 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=3] [neededSchemaVersion=4] ["start time"=100.817µs] [phyTblIDs="[7]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.342 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=4] ["take time"=2.097528ms] [job="ID:8, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.339 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.342 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:8, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:7, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.339 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.343 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=8]
[2021/10/07 19:36:10.343 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.343 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=4] ["first split key"=748000000000000007]
[2021/10/07 19:36:10.343 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=4] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"] [user=]
[2021/10/07 19:36:10.343 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=4] ["first at"=748000000000000007] ["first new region left"="{Id:4 StartKey:7480000000000000ff0500000000000000f8 EndKey:7480000000000000ff0700000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:5 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.343 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[4]"]
[2021/10/07 19:36:10.344 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.343 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.344 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.343 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.db (\n\t\tHost\t\t\t\t\tCHAR(255),\n\t\tDB\t\t\t\t\t\tCHAR(64),\n\t\tUser\t\t\t\t\tCHAR(32),\n\t\tSelect_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tInsert_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tUpdate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDelete_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tDrop_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tGrant_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tReferences_priv \t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tIndex_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_tmp_table_priv\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tLock_tables_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_view_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tShow_view_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tCreate_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tAlter_routine_priv\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tExecute_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tEvent_priv\t\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tTrigger_priv\t\t\tENUM('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (Host, DB, User));"]
[2021/10/07 19:36:10.344 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.343 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.345 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=4] [neededSchemaVersion=5] ["start time"=226.266µs] [phyTblIDs="[9]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.347 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=5] ["take time"=2.020497ms] [job="ID:10, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.343 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.347 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:10, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:9, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.343 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.348 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=10]
[2021/10/07 19:36:10.348 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.348 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=4] ["first split key"=748000000000000009]
[2021/10/07 19:36:10.348 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=5] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"] [user=]
[2021/10/07 19:36:10.349 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.348 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.349 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.348 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tables_priv (\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tGrantor\t\tCHAR(77),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tTable_priv\tSET('Select','Insert','Update','Delete','Create','Drop','Grant','Index','Alter','Create View','Show View','Trigger','References'),\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name));"]
[2021/10/07 19:36:10.349 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.348 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.349 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=5] [neededSchemaVersion=6] ["start time"=154.307µs] [phyTblIDs="[11]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.351 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=6] ["first at"=748000000000000009] ["first new region left"="{Id:6 StartKey:7480000000000000ff0700000000000000f8 EndKey:7480000000000000ff0900000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:7 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.351 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[6]"]
[2021/10/07 19:36:10.351 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=6] ["take time"=2.117688ms] [job="ID:12, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.348 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.352 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:12, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:11, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.348 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.352 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=12]
[2021/10/07 19:36:10.352 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.352 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=6] ["first split key"=74800000000000000b]
[2021/10/07 19:36:10.352 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=6] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"] [user=]
[2021/10/07 19:36:10.352 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.352 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.352 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.352 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.columns_priv(\n\t\tHost\t\tCHAR(255),\n\t\tDB\t\t\tCHAR(64),\n\t\tUser\t\tCHAR(32),\n\t\tTable_name\tCHAR(64),\n\t\tColumn_name\tCHAR(64),\n\t\tTimestamp\tTIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n\t\tColumn_priv\tSET('Select','Insert','Update','References'),\n\t\tPRIMARY KEY (Host, DB, User, Table_name, Column_name));"]
[2021/10/07 19:36:10.352 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.352 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.353 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=6] [neededSchemaVersion=7] ["start time"=125.405µs] [phyTblIDs="[13]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.354 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=8] ["first at"=74800000000000000b] ["first new region left"="{Id:8 StartKey:7480000000000000ff0900000000000000f8 EndKey:7480000000000000ff0b00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:9 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.354 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[8]"]
[2021/10/07 19:36:10.355 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=7] ["take time"=2.200655ms] [job="ID:14, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.352 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.355 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:14, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:13, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.352 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.356 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=14]
[2021/10/07 19:36:10.356 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.356 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=8] ["first split key"=74800000000000000d]
[2021/10/07 19:36:10.356 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=7] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"] [user=]
[2021/10/07 19:36:10.356 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.356 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.356 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.356 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.GLOBAL_VARIABLES(\n\t\tVARIABLE_NAME  VARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE VARCHAR(1024) DEFAULT NULL);"]
[2021/10/07 19:36:10.356 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.356 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.357 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=7] [neededSchemaVersion=8] ["start time"=118.027µs] [phyTblIDs="[15]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.359 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=10] ["first at"=74800000000000000d] ["first new region left"="{Id:10 StartKey:7480000000000000ff0b00000000000000f8 EndKey:7480000000000000ff0d00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:11 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.359 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[10]"]
[2021/10/07 19:36:10.359 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=8] ["take time"=2.143027ms] [job="ID:16, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.356 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.359 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:16, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:15, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.356 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.360 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=16]
[2021/10/07 19:36:10.360 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.360 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=10] ["first split key"=74800000000000000f]
[2021/10/07 19:36:10.360 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=8] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"] [user=]
[2021/10/07 19:36:10.360 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.36 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.360 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.36 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.tidb(\n\t\tVARIABLE_NAME  \tVARCHAR(64) NOT NULL PRIMARY KEY,\n\t\tVARIABLE_VALUE \tVARCHAR(1024) DEFAULT NULL,\n\t\tCOMMENT \t\tVARCHAR(1024));"]
[2021/10/07 19:36:10.361 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.36 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.361 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=8] [neededSchemaVersion=9] ["start time"=164.45µs] [phyTblIDs="[17]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.362 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=12] ["first at"=74800000000000000f] ["first new region left"="{Id:12 StartKey:7480000000000000ff0d00000000000000f8 EndKey:7480000000000000ff0f00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:13 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.362 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[12]"]
[2021/10/07 19:36:10.363 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=9] ["take time"=2.247116ms] [job="ID:18, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.36 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.364 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:18, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:17, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.36 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.364 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=18]
[2021/10/07 19:36:10.364 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.364 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=12] ["first split key"=748000000000000011]
[2021/10/07 19:36:10.364 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=9] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"] [user=]
[2021/10/07 19:36:10.365 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.365 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.365 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.365 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.help_topic (\n  \t\thelp_topic_id \t\tINT(10) UNSIGNED NOT NULL,\n  \t\tname \t\t\t\tCHAR(64) NOT NULL,\n  \t\thelp_category_id \tSMALLINT(5) UNSIGNED NOT NULL,\n  \t\tdescription \t\tTEXT NOT NULL,\n  \t\texample \t\t\tTEXT NOT NULL,\n  \t\turl \t\t\t\tTEXT NOT NULL,\n  \t\tPRIMARY KEY (help_topic_id) clustered,\n  \t\tUNIQUE KEY name (name)\n\t\t) ENGINE=InnoDB DEFAULT CHARSET=utf8 STATS_PERSISTENT=0 COMMENT='help topics';"]
[2021/10/07 19:36:10.365 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.365 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.366 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=9] [neededSchemaVersion=10] ["start time"=152.448µs] [phyTblIDs="[19]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.367 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=14] ["first at"=748000000000000011] ["first new region left"="{Id:14 StartKey:7480000000000000ff0f00000000000000f8 EndKey:7480000000000000ff1100000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:15 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.367 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[14]"]
[2021/10/07 19:36:10.368 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=10] ["take time"=2.09725ms] [job="ID:20, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.365 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.368 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:20, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:19, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.365 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.368 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=20]
[2021/10/07 19:36:10.368 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.368 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=14] ["first split key"=748000000000000013]
[2021/10/07 19:36:10.368 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=10] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"] [user=]
[2021/10/07 19:36:10.369 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.368 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.369 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.368 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_meta (\n\t\tversion \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\ttable_id \t\tBIGINT(64) NOT NULL,\n\t\tmodify_count\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcount \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tsnapshot        BIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tINDEX idx_ver(version),\n\t\tUNIQUE INDEX tbl(table_id)\n\t);"]
[2021/10/07 19:36:10.369 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.368 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.369 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=10] [neededSchemaVersion=11] ["start time"=112.97µs] [phyTblIDs="[21]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.371 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=16] ["first at"=748000000000000013] ["first new region left"="{Id:16 StartKey:7480000000000000ff1100000000000000f8 EndKey:7480000000000000ff1300000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:17 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.371 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[16]"]
[2021/10/07 19:36:10.371 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=11] ["take time"=2.183334ms] [job="ID:22, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.368 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.372 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:22, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:21, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.368 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.372 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=22]
[2021/10/07 19:36:10.372 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.372 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=16] ["first split key"=748000000000000015]
[2021/10/07 19:36:10.372 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=11] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/07 19:36:10.372 +05:30] [INFO] [ddl_api.go:596] ["Automatically convert BLOB(6291456) to MEDIUMBLOB"]
[2021/10/07 19:36:10.372 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.372 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.372 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.372 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_histograms (\n\t\ttable_id \t\t\tBIGINT(64) NOT NULL,\n\t\tis_index \t\t\tTINYINT(2) NOT NULL,\n\t\thist_id \t\t\tBIGINT(64) NOT NULL,\n\t\tdistinct_count \t\tBIGINT(64) NOT NULL,\n\t\tnull_count \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\ttot_col_size \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tmodify_count \t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tversion \t\t\tBIGINT(64) UNSIGNED NOT NULL DEFAULT 0,\n\t\tcm_sketch \t\t\tBLOB(6291456),\n\t\tstats_ver \t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tflag \t\t\t\tBIGINT(64) NOT NULL DEFAULT 0,\n\t\tcorrelation \t\tDOUBLE NOT NULL DEFAULT 0,\n\t\tlast_analyze_pos \tBLOB DEFAULT NULL,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/07 19:36:10.373 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.372 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.373 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=11] [neededSchemaVersion=12] ["start time"=193.432µs] [phyTblIDs="[23]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.374 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=18] ["first at"=748000000000000015] ["first new region left"="{Id:18 StartKey:7480000000000000ff1300000000000000f8 EndKey:7480000000000000ff1500000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:19 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.374 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[18]"]
[2021/10/07 19:36:10.375 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=12] ["take time"=2.249649ms] [job="ID:24, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.372 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.376 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:24, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:23, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.372 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.376 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=24]
[2021/10/07 19:36:10.377 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.377 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=18] ["first split key"=748000000000000017]
[2021/10/07 19:36:10.377 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=12] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"] [user=]
[2021/10/07 19:36:10.377 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.377 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.377 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.377 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_buckets (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tbucket_id \tBIGINT(64) NOT NULL,\n\t\tcount \t\tBIGINT(64) NOT NULL,\n\t\trepeats \tBIGINT(64) NOT NULL,\n\t\tupper_bound BLOB NOT NULL,\n\t\tlower_bound BLOB ,\n\t\tndv         BIGINT NOT NULL DEFAULT 0,\n\t\tUNIQUE INDEX tbl(table_id, is_index, hist_id, bucket_id)\n\t);"]
[2021/10/07 19:36:10.377 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.377 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.378 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=12] [neededSchemaVersion=13] ["start time"=116.908µs] [phyTblIDs="[25]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.379 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=20] ["first at"=748000000000000017] ["first new region left"="{Id:20 StartKey:7480000000000000ff1500000000000000f8 EndKey:7480000000000000ff1700000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:21 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.379 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[20]"]
[2021/10/07 19:36:10.380 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=13] ["take time"=2.184218ms] [job="ID:26, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.377 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.380 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:26, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:25, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.377 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.380 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=26]
[2021/10/07 19:36:10.381 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.381 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=20] ["first split key"=748000000000000019]
[2021/10/07 19:36:10.381 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=13] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"] [user=]
[2021/10/07 19:36:10.381 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.381 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.381 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.381 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_index (job_id, element_id)\n\t);"]
[2021/10/07 19:36:10.381 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.381 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.382 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=13] [neededSchemaVersion=14] ["start time"=129.385µs] [phyTblIDs="[27]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.383 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=22] ["first at"=748000000000000019] ["first new region left"="{Id:22 StartKey:7480000000000000ff1700000000000000f8 EndKey:7480000000000000ff1900000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:23 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.383 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[22]"]
[2021/10/07 19:36:10.384 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=14] ["take time"=2.180946ms] [job="ID:28, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.381 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.384 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:28, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:27, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.381 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.384 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=28]
[2021/10/07 19:36:10.384 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.384 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=22] ["first split key"=74800000000000001b]
[2021/10/07 19:36:10.384 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=14] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"] [user=]
[2021/10/07 19:36:10.385 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.385 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.385 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.385 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.gc_delete_range_done (\n\t\tjob_id \t\tBIGINT NOT NULL COMMENT \"the DDL job ID\",\n\t\telement_id \tBIGINT NOT NULL COMMENT \"the schema element ID\",\n\t\tstart_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tend_key \tVARCHAR(255) NOT NULL COMMENT \"encoded in hex\",\n\t\tts \t\t\tBIGINT NOT NULL COMMENT \"timestamp in uint64\",\n\t\tUNIQUE KEY delete_range_done_index (job_id, element_id)\n\t);"]
[2021/10/07 19:36:10.385 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.385 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.385 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=14] [neededSchemaVersion=15] ["start time"=130.694µs] [phyTblIDs="[29]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.387 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=24] ["first at"=74800000000000001b] ["first new region left"="{Id:24 StartKey:7480000000000000ff1900000000000000f8 EndKey:7480000000000000ff1b00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:25 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.387 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[24]"]
[2021/10/07 19:36:10.388 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=15] ["take time"=2.164639ms] [job="ID:30, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.385 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.388 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:30, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:29, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.385 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.388 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=30]
[2021/10/07 19:36:10.388 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.388 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=24] ["first split key"=74800000000000001d]
[2021/10/07 19:36:10.389 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=15] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/07 19:36:10.389 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.389 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.389 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.389 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_feedback (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tfeedback \tBLOB NOT NULL,\n\t\tINDEX hist(table_id, is_index, hist_id)\n\t);"]
[2021/10/07 19:36:10.389 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.389 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.390 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=15] [neededSchemaVersion=16] ["start time"=167.67µs] [phyTblIDs="[31]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.391 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=26] ["first at"=74800000000000001d] ["first new region left"="{Id:26 StartKey:7480000000000000ff1b00000000000000f8 EndKey:7480000000000000ff1d00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:27 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.391 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[26]"]
[2021/10/07 19:36:10.392 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=16] ["take time"=2.199758ms] [job="ID:32, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.389 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.392 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:32, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:31, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.389 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.392 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=32]
[2021/10/07 19:36:10.392 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.392 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=26] ["first split key"=74800000000000001f]
[2021/10/07 19:36:10.393 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=16] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"] [user=]
[2021/10/07 19:36:10.393 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.393 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.role_edges (\n\t\tFROM_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tFROM_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_HOST \t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tTO_USER \t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tWITH_ADMIN_OPTION \tENUM('N','Y') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (FROM_HOST,FROM_USER,TO_HOST,TO_USER)\n\t);"]
[2021/10/07 19:36:10.393 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.394 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=16] [neededSchemaVersion=17] ["start time"=107.498µs] [phyTblIDs="[33]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.395 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=28] ["first at"=74800000000000001f] ["first new region left"="{Id:28 StartKey:7480000000000000ff1d00000000000000f8 EndKey:7480000000000000ff1f00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:29 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.395 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[28]"]
[2021/10/07 19:36:10.396 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=17] ["take time"=2.195156ms] [job="ID:34, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.396 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:34, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:33, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.393 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.396 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=34]
[2021/10/07 19:36:10.396 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.396 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=28] ["first split key"=748000000000000021]
[2021/10/07 19:36:10.396 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=17] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"] [user=]
[2021/10/07 19:36:10.397 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.396 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.397 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.396 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.default_roles (\n\t\tHOST \t\t\t\tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tUSER \t\t\t\tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tDEFAULT_ROLE_HOST \tCHAR(60) COLLATE utf8_bin NOT NULL DEFAULT '%',\n\t\tDEFAULT_ROLE_USER \tCHAR(32) COLLATE utf8_bin NOT NULL DEFAULT '',\n\t\tPRIMARY KEY (HOST,USER,DEFAULT_ROLE_HOST,DEFAULT_ROLE_USER)\n\t)"]
[2021/10/07 19:36:10.397 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.396 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.397 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=17] [neededSchemaVersion=18] ["start time"=101.875µs] [phyTblIDs="[35]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.398 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=30] ["first at"=748000000000000021] ["first new region left"="{Id:30 StartKey:7480000000000000ff1f00000000000000f8 EndKey:7480000000000000ff2100000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:31 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.398 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[30]"]
[2021/10/07 19:36:10.399 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=18] ["take time"=2.210715ms] [job="ID:36, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.396 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.400 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:36, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:35, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.396 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.400 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=36]
[2021/10/07 19:36:10.400 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.400 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=30] ["first split key"=748000000000000023]
[2021/10/07 19:36:10.400 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=18] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"] [user=]
[2021/10/07 19:36:10.400 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.4 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.401 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.4 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.bind_info (\n\t\toriginal_sql TEXT NOT NULL,\n\t\tbind_sql TEXT NOT NULL,\n\t\tdefault_db TEXT NOT NULL,\n\t\tstatus TEXT NOT NULL,\n\t\tcreate_time TIMESTAMP(3) NOT NULL,\n\t\tupdate_time TIMESTAMP(3) NOT NULL,\n\t\tcharset TEXT NOT NULL,\n\t\tcollation TEXT NOT NULL,\n\t\tsource VARCHAR(10) NOT NULL DEFAULT 'unknown',\n\t\tINDEX sql_index(original_sql(700),default_db(68)) COMMENT \"accelerate the speed when add global binding query\",\n\t\tINDEX time_index(update_time) COMMENT \"accelerate the speed when querying with last update time\"\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;"]
[2021/10/07 19:36:10.401 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.4 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.401 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=18] [neededSchemaVersion=19] ["start time"=152.85µs] [phyTblIDs="[37]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.402 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=32] ["first at"=748000000000000023] ["first new region left"="{Id:32 StartKey:7480000000000000ff2100000000000000f8 EndKey:7480000000000000ff2300000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:33 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.402 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[32]"]
[2021/10/07 19:36:10.403 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=19] ["take time"=2.235345ms] [job="ID:38, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.4 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.404 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:38, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:37, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.4 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.404 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=38]
[2021/10/07 19:36:10.404 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.404 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=32] ["first split key"=748000000000000025]
[2021/10/07 19:36:10.405 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=19] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/07 19:36:10.405 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.405 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.405 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.405 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_top_n (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tcount \t\tBIGINT(64) UNSIGNED NOT NULL,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/07 19:36:10.405 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.405 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.406 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=19] [neededSchemaVersion=20] ["start time"=118.335µs] [phyTblIDs="[39]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.407 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=34] ["first at"=748000000000000025] ["first new region left"="{Id:34 StartKey:7480000000000000ff2300000000000000f8 EndKey:7480000000000000ff2500000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:35 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.407 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[34]"]
[2021/10/07 19:36:10.408 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=20] ["take time"=2.300105ms] [job="ID:40, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.405 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.408 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:40, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:39, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.405 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.409 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=40]
[2021/10/07 19:36:10.409 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.409 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=34] ["first split key"=748000000000000027]
[2021/10/07 19:36:10.409 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=20] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"] [user=]
[2021/10/07 19:36:10.409 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.409 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.409 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.409 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.expr_pushdown_blacklist (\n\t\tname \t\tCHAR(100) NOT NULL,\n\t\tstore_type \tCHAR(100) NOT NULL DEFAULT 'tikv,tiflash,tidb',\n\t\treason \t\tVARCHAR(200)\n\t);"]
[2021/10/07 19:36:10.409 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.409 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.410 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=20] [neededSchemaVersion=21] ["start time"=102.28µs] [phyTblIDs="[41]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.411 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=36] ["first at"=748000000000000027] ["first new region left"="{Id:36 StartKey:7480000000000000ff2500000000000000f8 EndKey:7480000000000000ff2700000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:37 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.411 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[36]"]
[2021/10/07 19:36:10.412 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=21] ["take time"=2.148129ms] [job="ID:42, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.409 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.412 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:42, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:41, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.409 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.412 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=42]
[2021/10/07 19:36:10.412 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.412 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=36] ["first split key"=748000000000000029]
[2021/10/07 19:36:10.412 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=21] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"] [user=]
[2021/10/07 19:36:10.413 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.413 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.opt_rule_blacklist (\n\t\tname \tCHAR(100) NOT NULL\n\t);"]
[2021/10/07 19:36:10.413 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.414 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=21] [neededSchemaVersion=22] ["start time"=128.054µs] [phyTblIDs="[43]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.415 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=38] ["first at"=748000000000000029] ["first new region left"="{Id:38 StartKey:7480000000000000ff2700000000000000f8 EndKey:7480000000000000ff2900000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:39 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.415 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[38]"]
[2021/10/07 19:36:10.416 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=22] ["take time"=2.200871ms] [job="ID:44, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.416 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:44, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:43, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.413 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.416 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=44]
[2021/10/07 19:36:10.416 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.416 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=38] ["first split key"=74800000000000002b]
[2021/10/07 19:36:10.416 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=22] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"] [user=]
[2021/10/07 19:36:10.417 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.417 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.417 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.417 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_extended (\n\t\tname varchar(32) NOT NULL,\n\t\ttype tinyint(4) NOT NULL,\n\t\ttable_id bigint(64) NOT NULL,\n\t\tcolumn_ids varchar(32) NOT NULL,\n\t\tstats blob DEFAULT NULL,\n\t\tversion bigint(64) unsigned NOT NULL,\n\t\tstatus tinyint(4) NOT NULL,\n\t\tPRIMARY KEY(name, table_id),\n\t\tKEY idx_1 (table_id, status, version),\n\t\tKEY idx_2 (status, version)\n\t);"]
[2021/10/07 19:36:10.417 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.417 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.418 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=22] [neededSchemaVersion=23] ["start time"=156.404µs] [phyTblIDs="[45]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.419 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=40] ["first at"=74800000000000002b] ["first new region left"="{Id:40 StartKey:7480000000000000ff2900000000000000f8 EndKey:7480000000000000ff2b00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:41 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.419 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[40]"]
[2021/10/07 19:36:10.420 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=23] ["take time"=2.297625ms] [job="ID:46, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.417 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.420 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:46, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:45, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.417 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.421 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=46]
[2021/10/07 19:36:10.421 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.421 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=40] ["first split key"=74800000000000002d]
[2021/10/07 19:36:10.421 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=23] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"] [user=]
[2021/10/07 19:36:10.421 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.421 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.schema_index_usage (\n\t\tTABLE_ID bigint(64),\n\t\tINDEX_ID bigint(21),\n\t\tQUERY_COUNT bigint(64),\n\t\tROWS_SELECTED bigint(64),\n\t\tLAST_USED_AT timestamp,\n\t\tPRIMARY KEY(TABLE_ID, INDEX_ID)\n\t);"]
[2021/10/07 19:36:10.421 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.422 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=23] [neededSchemaVersion=24] ["start time"=182.744µs] [phyTblIDs="[47]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.423 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=42] ["first at"=74800000000000002d] ["first new region left"="{Id:42 StartKey:7480000000000000ff2b00000000000000f8 EndKey:7480000000000000ff2d00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:43 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.423 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[42]"]
[2021/10/07 19:36:10.424 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=24] ["take time"=2.20129ms] [job="ID:48, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.424 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:48, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:47, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.421 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.425 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=48]
[2021/10/07 19:36:10.425 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.425 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=42] ["first split key"=74800000000000002f]
[2021/10/07 19:36:10.425 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=24] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"] [user=]
[2021/10/07 19:36:10.425 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.425 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.425 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.425 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.stats_fm_sketch (\n\t\ttable_id \tBIGINT(64) NOT NULL,\n\t\tis_index \tTINYINT(2) NOT NULL,\n\t\thist_id \tBIGINT(64) NOT NULL,\n\t\tvalue \t\tLONGBLOB,\n\t\tINDEX tbl(table_id, is_index, hist_id)\n\t);"]
[2021/10/07 19:36:10.425 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.425 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.426 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=24] [neededSchemaVersion=25] ["start time"=146.358µs] [phyTblIDs="[49]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.427 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=44] ["first at"=74800000000000002f] ["first new region left"="{Id:44 StartKey:7480000000000000ff2d00000000000000f8 EndKey:7480000000000000ff2f00000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:45 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.427 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[44]"]
[2021/10/07 19:36:10.428 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=25] ["take time"=2.165525ms] [job="ID:50, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.425 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.428 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:50, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:49, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.425 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.428 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=50]
[2021/10/07 19:36:10.428 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.428 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=44] ["first split key"=748000000000000031]
[2021/10/07 19:36:10.428 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=25] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"] [user=]
[2021/10/07 19:36:10.429 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.429 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.global_grants (\n\t\tUSER char(32) NOT NULL DEFAULT '',\n\t\tHOST char(255) NOT NULL DEFAULT '',\n\t\tPRIV char(32) NOT NULL DEFAULT '',\n\t\tWITH_GRANT_OPTION enum('N','Y') NOT NULL DEFAULT 'N',\n\t\tPRIMARY KEY (USER,HOST,PRIV)\n\t);"]
[2021/10/07 19:36:10.429 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.429 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=25] [neededSchemaVersion=26] ["start time"=88.195µs] [phyTblIDs="[51]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.431 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=46] ["first at"=748000000000000031] ["first new region left"="{Id:46 StartKey:7480000000000000ff2f00000000000000f8 EndKey:7480000000000000ff3100000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:47 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.431 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[46]"]
[2021/10/07 19:36:10.431 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=26] ["take time"=2.175725ms] [job="ID:52, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.432 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:52, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:51, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.428 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.432 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=52]
[2021/10/07 19:36:10.432 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.432 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=46] ["first split key"=748000000000000033]
[2021/10/07 19:36:10.432 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=0] [schemaVersion=26] [cur_db=] [sql="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"] [user=]
[2021/10/07 19:36:10.432 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.432 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:36:10.432 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.432 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE IF NOT EXISTS mysql.capture_plan_baselines_blacklist (\n\t\tid bigint(64) auto_increment,\n\t\tfilter_type varchar(32) NOT NULL COMMENT \"type of the filter, only db, table and frequency supported now\",\n\t\tfilter_value varchar(32) NOT NULL,\n\t\tkey idx(filter_type),\n\t\tprimary key(id)\n\t);"]
[2021/10/07 19:36:10.433 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:none, SchemaState:queueing, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.432 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.433 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=26] [neededSchemaVersion=27] ["start time"=84.497µs] [phyTblIDs="[53]"] [actionTypes="[8]"]
[2021/10/07 19:36:10.434 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=48] ["first at"=748000000000000033] ["first new region left"="{Id:48 StartKey:7480000000000000ff3100000000000000f8 EndKey:7480000000000000ff3300000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:49 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.434 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[48]"]
[2021/10/07 19:36:10.435 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 1, tp general"] [ver=27] ["take time"=2.217174ms] [job="ID:54, Type:create table, State:done, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:1, start time: 2021-10-07 19:36:10.432 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.435 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 1, tp general"] [job="ID:54, Type:create table, State:synced, SchemaState:public, SchemaID:3, TableID:53, RowCount:0, ArgLen:0, start time: 2021-10-07 19:36:10.432 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:36:10.436 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=54]
[2021/10/07 19:36:10.436 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:36:10.436 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=48] ["first split key"=748000000000000035]
[2021/10/07 19:36:10.438 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=50] ["first at"=748000000000000035] ["first new region left"="{Id:50 StartKey:7480000000000000ff3300000000000000f8 EndKey:7480000000000000ff3500000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:51 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:36:10.438 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[50]"]
[2021/10/07 19:36:10.446 +05:30] [INFO] [bootstrap.go:375] ["bootstrap successful"] ["take time"=122.377056ms]
[2021/10/07 19:36:10.446 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 2, tp add index"] ["take time"=243ns]
[2021/10/07 19:36:10.446 +05:30] [INFO] [ddl_worker.go:149] ["[ddl] DDL worker closed"] [worker="worker 1, tp general"] ["take time"=361ns]
[2021/10/07 19:36:10.446 +05:30] [INFO] [delete_range.go:132] ["[ddl] closing delRange"]
[2021/10/07 19:36:10.446 +05:30] [INFO] [session_pool.go:86] ["[ddl] closing sessionPool"]
[2021/10/07 19:36:10.446 +05:30] [INFO] [ddl.go:417] ["[ddl] DDL closed"] [ID=695dac66-7f23-4ed5-8094-e9bddc300aae] ["take time"=127.893µs]
[2021/10/07 19:36:10.446 +05:30] [INFO] [ddl.go:328] ["[ddl] stop DDL"] [ID=695dac66-7f23-4ed5-8094-e9bddc300aae]
[2021/10/07 19:36:10.446 +05:30] [INFO] [domain.go:436] ["topNSlowQueryLoop exited."]
[2021/10/07 19:36:10.446 +05:30] [INFO] [domain.go:524] ["loadSchemaInLoop exited."]
[2021/10/07 19:36:10.447 +05:30] [INFO] [domain.go:493] ["topologySyncerKeeper exited."]
[2021/10/07 19:36:10.447 +05:30] [INFO] [domain.go:465] ["infoSyncerKeeper exited."]
[2021/10/07 19:36:10.447 +05:30] [INFO] [domain.go:649] ["domain closed"] ["take time"=308.327µs]
[2021/10/07 19:36:10.447 +05:30] [INFO] [tidb.go:71] ["new domain"] [store=2ec35b21-fd37-4bc0-b713-2b46092f96e9] ["ddl lease"=45s] ["stats lease"=3s] ["index usage sync lease"=0s]
[2021/10/07 19:36:10.447 +05:30] [INFO] [ddl.go:347] ["[ddl] start DDL"] [ID=6c209396-b5f8-48b9-a364-fec9ef447f43] [runWorker=true]
[2021/10/07 19:36:10.447 +05:30] [INFO] [ddl.go:336] ["[ddl] start delRangeManager OK"] ["is a emulator"=true]
[2021/10/07 19:36:10.447 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 3, tp general"]
[2021/10/07 19:36:10.447 +05:30] [INFO] [ddl_worker.go:155] ["[ddl] start DDL worker"] [worker="worker 4, tp add index"]
[2021/10/07 19:36:10.447 +05:30] [INFO] [delete_range.go:142] ["[ddl] start delRange emulator"]
[2021/10/07 19:36:10.450 +05:30] [INFO] [domain.go:163] ["full load InfoSchema success"] [currentSchemaVersion=0] [neededSchemaVersion=27] ["start time"=3.209352ms]
[2021/10/07 19:36:10.450 +05:30] [INFO] [domain.go:386] ["full load and reset schema validator"]
[2021/10/07 19:36:10.452 +05:30] [WARN] [sysvar_cache.go:51] ["sysvar cache is empty, triggering rebuild"]
[2021/10/07 19:36:10.459 +05:30] [INFO] [telemetry.go:174] ["Telemetry configuration"] [endpoint=https://telemetry.pingcap.com/api/v1/tidb/report] [report_interval=6h0m0s] [enabled=true]
[2021/10/07 19:36:10.461 +05:30] [INFO] [domain.go:1243] ["init stats info time"] ["take time"=1.891585ms]
[2021/10/07 19:36:11.092 +05:30] [INFO] [misc.go:677] ["TLS Certificates created"] [cert="/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/501_tidb/MC4wLjAuMDo0MDAwLzAuMC4wLjA6MTAwODA=/tmp-storage/cert.pem"] [key="/var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/501_tidb/MC4wLjAuMDo0MDAwLzAuMC4wLjA6MTAwODA=/tmp-storage/key.pem"] [validity=2160h0m0s] [rsaKeySize=4096]
[2021/10/07 19:36:11.093 +05:30] [WARN] [misc.go:488] ["Minimum TLS version allows pre-TLSv1.2 protocols, this is not recommended"]
[2021/10/07 19:36:11.093 +05:30] [INFO] [misc.go:523] ["Disabling weak cipherSuite"] [cipherSuite=TLS_RSA_WITH_3DES_EDE_CBC_SHA]
[2021/10/07 19:36:11.093 +05:30] [INFO] [misc.go:523] ["Disabling weak cipherSuite"] [cipherSuite=TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA]
[2021/10/07 19:36:11.093 +05:30] [INFO] [misc.go:530] ["Enabled ciphersuites"] [cipherNames="[TLS_RSA_WITH_AES_128_CBC_SHA,TLS_RSA_WITH_AES_256_CBC_SHA,TLS_RSA_WITH_AES_128_GCM_SHA256,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_AES_128_GCM_SHA256,TLS_AES_256_GCM_SHA384,TLS_CHACHA20_POLY1305_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256]"]
[2021/10/07 19:36:11.093 +05:30] [INFO] [server.go:227] ["mysql protocol server secure connection is enabled"] ["client verification enabled"=false]
[2021/10/07 19:36:11.093 +05:30] [INFO] [server.go:245] ["server is running MySQL protocol"] [addr=0.0.0.0:4000]
[2021/10/07 19:36:11.093 +05:30] [INFO] [http_status.go:85] ["for status and metrics report"] ["listening on addr"=0.0.0.0:10080]
[2021/10/07 19:36:11.093 +05:30] [INFO] [profile.go:92] ["cpu profiler started"]
[2021/10/07 19:37:00.010 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=3] [schemaVersion=27] [cur_db=test] [sql="DROP TABLE IF EXISTS t1, t2"] [user=root@127.0.0.1]
[2021/10/07 19:37:09.600 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=3] [schemaVersion=27] [cur_db=test] [sql="CREATE TABLE t1 (dt datetime default '2008-02-31 00:00:00')"] [user=root@127.0.0.1]
[2021/10/07 19:37:09.601 +05:30] [INFO] [tidb.go:246] ["rollbackTxn called due to ddl/autocommit failure"]
[2021/10/07 19:37:09.601 +05:30] [WARN] [session.go:1579] ["run statement failed"] [conn=3] [schemaVersion=27] [error="[ddl:1067]Invalid default value for 'dt'"] [session="{\n  \"currDBName\": \"test\",\n  \"id\": 3,\n  \"status\": 2,\n  \"strictMode\": true,\n  \"user\": {\n    \"Username\": \"root\",\n    \"Hostname\": \"127.0.0.1\",\n    \"CurrentUser\": false,\n    \"AuthUsername\": \"root\",\n    \"AuthHostname\": \"%\"\n  }\n}"]
[2021/10/07 19:37:09.601 +05:30] [INFO] [conn.go:1001] ["command dispatched failed"] [conn=3] [connInfo="id:3, addr:127.0.0.1:52206 status:10, collation:utf8mb4_0900_ai_ci, user:root"] [command=Query] [status="inTxn:0, autocommit:1"] [sql="CREATE TABLE t1 (dt datetime default '2008-02-31 00:00:00')"] [txn_mode=OPTIMISTIC] [err="[ddl:1067]Invalid default value for 'dt'\ngithub.com/pingcap/errors.AddStack\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/errors.go:174\ngithub.com/pingcap/errors.(*Error).GenWithStackByArgs\n\t/Users/karuppiahn/go/pkg/mod/github.com/pingcap/errors@v0.11.5-0.20210425183316-da1aaba5fb63/normalize.go:159\ngithub.com/pingcap/tidb/ddl.getDefaultValue\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:747\ngithub.com/pingcap/tidb/ddl.setDefaultValue\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:3813\ngithub.com/pingcap/tidb/ddl.columnDefToCol\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:675\ngithub.com/pingcap/tidb/ddl.buildColumnAndConstraint\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:470\ngithub.com/pingcap/tidb/ddl.buildColumnsAndConstraints\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:337\ngithub.com/pingcap/tidb/ddl.buildTableInfoWithStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1798\ngithub.com/pingcap/tidb/ddl.(*ddl).CreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/ddl/ddl_api.go:1888\ngithub.com/pingcap/tidb/executor.(*DDLExec).executeCreateTable\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:296\ngithub.com/pingcap/tidb/executor.(*DDLExec).Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/ddl.go:148\ngithub.com/pingcap/tidb/executor.Next\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/executor.go:286\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelayExecutor\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:584\ngithub.com/pingcap/tidb/executor.(*ExecStmt).handleNoDelay\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:465\ngithub.com/pingcap/tidb/executor.(*ExecStmt).Exec\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/executor/adapter.go:414\ngithub.com/pingcap/tidb/session.runStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1682\ngithub.com/pingcap/tidb/session.(*session).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/session/session.go:1576\ngithub.com/pingcap/tidb/server.(*TiDBContext).ExecuteStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/server/driver_tidb.go:219\ngithub.com/pingcap/tidb/server.(*clientConn).handleStmt\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/server/conn.go:1841\ngithub.com/pingcap/tidb/server.(*clientConn).handleQuery\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/server/conn.go:1710\ngithub.com/pingcap/tidb/server.(*clientConn).dispatch\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/server/conn.go:1222\ngithub.com/pingcap/tidb/server.(*clientConn).Run\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/server/conn.go:979\ngithub.com/pingcap/tidb/server.(*Server).onConn\n\t/Users/karuppiahn/projects/github.com/pingcap/tidb/server/server.go:536\nruntime.goexit\n\t/Users/karuppiahn/.go/src/runtime/asm_amd64.s:1371"]
[2021/10/07 19:37:23.250 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=3] [schemaVersion=27] [cur_db=test] [sql="DROP TABLE IF EXISTS t1, t2"] [user=root@127.0.0.1]
[2021/10/07 19:37:23.252 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=3] [schemaVersion=27] [cur_db=test] [sql="CREATE TABLE t1 (dt datetime default '2008-02-31 00:00:00') -- permitted because of SQL mode"] [user=root@127.0.0.1]
[2021/10/07 19:37:23.252 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-07 19:37:23.252 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:37:23.252 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-07 19:37:23.252 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE t1 (dt datetime default '2008-02-31 00:00:00') -- permitted because of SQL mode"]
[2021/10/07 19:37:23.252 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:56, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-07 19:37:23.252 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:37:23.253 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=27] [neededSchemaVersion=28] ["start time"=107.783µs] [phyTblIDs="[55]"] [actionTypes="[8]"]
[2021/10/07 19:37:23.255 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 3, tp general"] [ver=28] ["take time"=2.545165ms] [job="ID:56, Type:create table, State:done, SchemaState:public, SchemaID:1, TableID:55, RowCount:0, ArgLen:1, start time: 2021-10-07 19:37:23.252 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:37:23.256 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:56, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:55, RowCount:0, ArgLen:0, start time: 2021-10-07 19:37:23.252 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:37:23.256 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=56]
[2021/10/07 19:37:23.256 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:37:23.256 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=52] ["first split key"=748000000000000037]
[2021/10/07 19:37:23.256 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=52] ["first at"=748000000000000037] ["first new region left"="{Id:52 StartKey:7480000000000000ff3500000000000000f8 EndKey:7480000000000000ff3700000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:53 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:37:23.256 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[52]"]
[2021/10/07 19:37:23.257 +05:30] [INFO] [session.go:2856] ["CRUCIAL OPERATION"] [conn=3] [schemaVersion=28] [cur_db=test] [sql="CREATE TABLE t2 LIKE t1 -- should not be permitted"] [user=root@127.0.0.1]
[2021/10/07 19:37:23.257 +05:30] [INFO] [ddl_worker.go:313] ["[ddl] add DDL jobs"] ["batch count"=1] [jobs="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-07 19:37:23.257 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0; "]
[2021/10/07 19:37:23.257 +05:30] [INFO] [ddl.go:553] ["[ddl] start DDL job"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-07 19:37:23.257 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"] [query="CREATE TABLE t2 LIKE t1 -- should not be permitted"]
[2021/10/07 19:37:23.258 +05:30] [INFO] [ddl_worker.go:718] ["[ddl] run DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:none, SchemaState:queueing, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-07 19:37:23.257 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:37:23.258 +05:30] [INFO] [domain.go:132] ["diff load InfoSchema success"] [currentSchemaVersion=28] [neededSchemaVersion=29] ["start time"=84.09µs] [phyTblIDs="[57]"] [actionTypes="[8]"]
[2021/10/07 19:37:23.260 +05:30] [INFO] [ddl_worker.go:913] ["[ddl] wait latest schema version changed"] [worker="worker 3, tp general"] [ver=29] ["take time"=2.528119ms] [job="ID:58, Type:create table, State:done, SchemaState:public, SchemaID:1, TableID:57, RowCount:0, ArgLen:1, start time: 2021-10-07 19:37:23.257 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:37:23.261 +05:30] [INFO] [ddl_worker.go:418] ["[ddl] finish DDL job"] [worker="worker 3, tp general"] [job="ID:58, Type:create table, State:synced, SchemaState:public, SchemaID:1, TableID:57, RowCount:0, ArgLen:0, start time: 2021-10-07 19:37:23.257 +0530 IST, Err:<nil>, ErrCount:0, SnapshotVersion:0"]
[2021/10/07 19:37:23.261 +05:30] [INFO] [ddl.go:615] ["[ddl] DDL job is finished"] [jobID=58]
[2021/10/07 19:37:23.261 +05:30] [INFO] [callback.go:107] ["performing DDL change, must reload"]
[2021/10/07 19:37:23.261 +05:30] [INFO] [split_region.go:85] ["split batch regions request"] ["split key count"=1] ["batch count"=1] ["first batch, region ID"=52] ["first split key"=748000000000000039]
[2021/10/07 19:37:23.264 +05:30] [INFO] [split_region.go:186] ["batch split regions complete"] ["batch region ID"=54] ["first at"=748000000000000039] ["first new region left"="{Id:54 StartKey:7480000000000000ff3700000000000000f8 EndKey:7480000000000000ff3900000000000000f8 RegionEpoch:{ConfVer:1 Version:2} Peers:[id:55 store_id:1 ] EncryptionMeta:<nil>}"] ["new region count"=1]
[2021/10/07 19:37:23.264 +05:30] [INFO] [split_region.go:235] ["split regions complete"] ["region count"=1] ["region IDs"="[54]"]
```

```bash
database-stuff $ mysql -h 127.0.0.1 -P 4000 -u root -D test --prompt="tidb> " --comments
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.7.25-TiDB-v5.3.0-alpha-263-g6eb02fbe5 TiDB Server (Apache License 2.0) Community Edition, MySQL 5.7 compatible

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

tidb> 
tidb> DROP TABLE IF EXISTS t1, t2;
Query OK, 0 rows affected, 2 warnings (0.00 sec)

tidb> CREATE TABLE t1 (dt datetime default '2008-02-31 00:00:00');
ERROR 1067 (42000): Invalid default value for 'dt'
tidb> DROP TABLE IF EXISTS t1, t2;
Query OK, 0 rows affected, 2 warnings (0.00 sec)

tidb> SET sql_mode='ALLOW_INVALID_DATES';
Query OK, 0 rows affected (0.00 sec)

tidb> CREATE TABLE t1 (dt datetime default '2008-02-31 00:00:00'); -- permitted because of SQL mode
Query OK, 0 rows affected (0.00 sec)

tidb> SET sql_mode=DEFAULT;
Query OK, 0 rows affected (0.00 sec)

tidb> CREATE TABLE t2 LIKE t1; -- should not be permitted
Query OK, 0 rows affected (0.01 sec)

tidb> SELECT tidb_version()
    -> \G
*************************** 1. row ***************************
tidb_version(): Release Version: v5.3.0-alpha-263-g6eb02fbe5
Edition: Community
Git Commit Hash: 6eb02fbe5ed448a2c814dd5563414fb733274329
Git Branch: master
UTC Build Time: 2021-10-07 09:13:27
GoVersion: go1.16.8
Race Enabled: false
TiKV Min Version: v3.0.0-60965b006877ca7234adaced7890d7b029ed1306
Check Table Before Drop: false
1 row in set (0.00 sec)

tidb> SELECT tidb_version();
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| tidb_version()                                                                                                                                                                                                                                                                                                            |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Release Version: v5.3.0-alpha-263-g6eb02fbe5
Edition: Community
Git Commit Hash: 6eb02fbe5ed448a2c814dd5563414fb733274329
Git Branch: master
UTC Build Time: 2021-10-07 09:13:27
GoVersion: go1.16.8
Race Enabled: false
TiKV Min Version: v3.0.0-60965b006877ca7234adaced7890d7b029ed1306
Check Table Before Drop: false |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

tidb> \G
ERROR: 
No query specified

tidb> SELECT tidb_version();
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| tidb_version()                                                                                                                                                                                                                                                                                                            |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Release Version: v5.3.0-alpha-263-g6eb02fbe5
Edition: Community
Git Commit Hash: 6eb02fbe5ed448a2c814dd5563414fb733274329
Git Branch: master
UTC Build Time: 2021-10-07 09:13:27
GoVersion: go1.16.8
Race Enabled: false
TiKV Min Version: v3.0.0-60965b006877ca7234adaced7890d7b029ed1306
Check Table Before Drop: false |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

tidb> SELECT tidb_version()\g
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| tidb_version()                                                                                                                                                                                                                                                                                                            |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Release Version: v5.3.0-alpha-263-g6eb02fbe5
Edition: Community
Git Commit Hash: 6eb02fbe5ed448a2c814dd5563414fb733274329
Git Branch: master
UTC Build Time: 2021-10-07 09:13:27
GoVersion: go1.16.8
Race Enabled: false
TiKV Min Version: v3.0.0-60965b006877ca7234adaced7890d7b029ed1306
Check Table Before Drop: false |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

tidb> SELECT tidb_version()\G
*************************** 1. row ***************************
tidb_version(): Release Version: v5.3.0-alpha-263-g6eb02fbe5
Edition: Community
Git Commit Hash: 6eb02fbe5ed448a2c814dd5563414fb733274329
Git Branch: master
UTC Build Time: 2021-10-07 09:13:27
GoVersion: go1.16.8
Race Enabled: false
TiKV Min Version: v3.0.0-60965b006877ca7234adaced7890d7b029ed1306
Check Table Before Drop: false
1 row in set (0.00 sec)

tidb> 
```

I gotta learn what that `\G` or `\g` means [TODO]

---

[TODO] [Level-1]

- Write test for the issue
- Fix the issue

[TODO] [Level-2]

- Find where the issue occurs


----

Gonna search the error string - `ERROR 1067 (42000): Invalid default value for 'dt'`

[Question] What is `42000`? An error code?

[Question] What is `1067`? An error code?

Found out what `1067` is over here - `errors.toml`, looks like a DDL error code

```toml
["ddl:1067"]
error = '''
Invalid default value for '%-.192s'
'''
```

There's a test to check the error here -

`executor/ddl_test.go` > `TestCheckDefaultFsp`

or https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/executor/ddl_test.go#L1410

`executor/ddl.go` > `Next` method

or https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/executor/ddl.go#L86

`*ast.CreateTableStmt`

https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/executor/ddl.go#L96

```go
case *ast.CreateTableStmt:
    err = e.executeCreateTable(x)
```

https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/executor/ddl.go#L147-L148

```go
func (e *DDLExec) executeCreateTable(s *ast.CreateTableStmt) error {
	err := domain.GetDomain(e.ctx).DDL().CreateTable(e.ctx, s)
	return err
}
```

https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/executor/ddl.go#L295-L298

```go
	CreateTable(ctx sessionctx.Context, stmt *ast.CreateTableStmt) error
```

https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/ddl/ddl.go#L99

```go
func (d *ddl) CreateTable(ctx sessionctx.Context, s *ast.CreateTableStmt) (err error) {
```

https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/ddl/ddl_api.go#L1862

On the side -

```go
// toErr converts the error to the ErrInfoSchemaChanged when the schema is outdated.
func (e *DDLExec) toErr(err error) error {
```

https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/executor/ddl.go#L55-L56

```go
_, schemaInfoErr := checker.Check(txn.StartTS())
```

https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/executor/ddl.go#L65

`domain/schema_checker.go`

```go
// Check checks the validity of the schema version.
func (s *SchemaChecker) Check(txnTS uint64) (*transaction.RelatedSchemaChange, error) {
	return s.CheckBySchemaVer(txnTS, intSchemaVer(s.schemaVer))
}
```

https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/domain/schema_checker.go#L55-L58

---

Looking at existing tests for `CREATE TABLE <TABLE_NAME> LIKE <ANOTHER_TABLE_NAME>`

```bash
tidb $ rg 'create table .* like'
session/clustered_index_test.go
288:	tk.MustExec("create table t2  like t1")
306:	tk.MustExec(`create table t2  like t1;`)
314:	tk.MustExec(`create table t2  like t1;`)

executor/executor_test.go
1203:	tk.MustExec(`create table t2 like t1`)
1204:	tk.MustExec(`create table t3 like t1`)
7393:	tk.MustExec("create table t2 like t1;")

expression/integration_test.go
9360:	tk.MustExec("create table t2  like t1 ;")

executor/show_test.go
126:	testSQL = `create table if not exists show_warnings_2 like show_warnings`

executor/join_test.go
2379:	tk.MustExec("create table t2 like t1")

executor/index_lookup_join_test.go
238:	tk.MustExec(`create table t like i;`)
299:	tk.MustExec("create table t2 like t1")

br/tests/br_incompatible_tidb_config/run.sh
47:run_sql "create table $DB.$INCREMENTAL_TABLE like $DB.$TABLE"

bindinfo/session_handle_serial_test.go
561:	tk.MustExec("create table t1 like t")

bindinfo/bind_serial_test.go
285:	tk.MustExec("create table t1 like t")

bindinfo/capture_serial_test.go
45:	tk.MustExec("create table t1 like t")

ddl/serial_test.go
422:	tk.MustExec("create table t1 like ctwl_db.t")
449:	tk.MustExec("create table t1 like ctwl_db.t")
461:	tk.MustExec("create table ctwl_db1.pt1 like ctwl_db.pt1;")
471:	tk.MustExec("create table t1 like partition_t")
485:	tk.MustExec("create table t2 like t_pre")
508:	failSQL := "create table t1 like test_not_exist.t"
510:	failSQL = "create table t1 like test.t_not_exist"
514:	failSQL = "create table test_not_exis.t1 like ctwl_db.t"
516:	failSQL = "create table t1 like ctwl_db.t"
522:	tk.MustGetErrCode("create table viewTable like v", mysql.ErrWrongObject)
525:	tk.MustGetErrCode("create table sequenceTable like seq", mysql.ErrWrongObject)
540:	_, err := tk.Exec("create table temporary_table_t1 like temporary_table")
622:	tk.MustExec("create table tb2 like tb1")
640:	_, err = tk.Exec("create table tb6 like tb5;")
671:	_, err = tk.Exec("create table tb16 like tb15;")

ddl/db_integration_test.go
202:	tk.MustExec("create table if not exists ct like ct1;")
1605:	tk.MustExec("create table t2 like t")
2186:	tk.MustExec("create table t2 like t1")

ddl/db_test.go
2756:// TestCreateTableWithLike2 tests create table with like when refer table have non-public column/index.
2784:			go backgroundExec(s.store, "create table t2 like t1", doneCh)
2852:	tk.MustExec("create table t2 like t1")

planner/core/logical_plan_test.go
1033:			sql: "create table t1 like t",
tidb $ 
```

---

I was also wondering why `2008-02-31 00:00:00` is an invalid date, if there was some format issues, like time zone data missing, or format being yyyy-dd-mm and month cannot be more than 12 etc. But I think the format is yyyy-mm-dd only, and the issue is that the month is 2 - February and it has only 28 or 29 days depending on the year (leap year or not) and cannot have 30, 31, etc as date. Right! Wow, didn't know this kind of checks would be needed, but it makes sense, no one wants wrong data and it's nice that the database takes care of all this stuff!!

---

```bash
tidb $ rg 'create table .* like' -l
session/clustered_index_test.go
expression/integration_test.go
executor/show_test.go
br/tests/br_incompatible_tidb_config/run.sh
executor/join_test.go
executor/index_lookup_join_test.go
executor/executor_test.go
ddl/db_integration_test.go
ddl/serial_test.go
ddl/db_test.go
planner/core/logical_plan_test.go
bindinfo/session_handle_serial_test.go
bindinfo/bind_serial_test.go
bindinfo/capture_serial_test.go
tidb $ 
```

Those are files that have test for `create table ... like ...`

`errno/errcode.go` has `1067` error code. `ErrInvalidDefault`

https://github.com/pingcap/tidb/blob/463cc34410d8075f41e5a6151170dbe8a5ae4088/errno/errcode.go#L88

---

[TODO] [Level-3]
- Write a test for the issue in `TestCheckDefaultFsp` test maybe. Ensure it fails
- 

---

```bash
{ make failpoint-enable; go test -timeout 30s github.com/pingcap/tidb/executor; make failpoint-disable; }
```

