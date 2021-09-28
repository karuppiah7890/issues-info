https://github.com/pingcap/tidb/issues/28386

https://github.com/pingcap/tidb/issues/26857

TODO
- Ensure `"github.com/pingcap/check"` import is not present [DONE]
- Ensure `"github.com/pingcap/tidb/util/testleak"` import is not present [DONE]
- Migrate all tests to golang tests using Testify [DONE]
- Parallelize all the tests using `t.Parallel()` [DONE]

---

Low Level TODO - migrate the following tests
- TestCacheKey [DONE]

---

To put data in https://github.com/pingcap/tidb/issues/26857

```bash
tidb $ fd test.go planner/core/
planner/core/cache_test.go
planner/core/cacheable_checker_test.go
planner/core/cbo_test.go
planner/core/enforce_mpp_test.go
planner/core/errors_test.go
planner/core/exhaust_physical_plans_test.go
planner/core/expression_rewriter_test.go
planner/core/expression_test.go
planner/core/find_best_task_test.go
planner/core/indexmerge_test.go
planner/core/integration_partition_test.go
planner/core/integration_test.go
planner/core/logical_plan_test.go
planner/core/logical_plans_test.go
planner/core/main_test.go
planner/core/memtable_predicate_extractor_test.go
planner/core/optimizer_test.go
planner/core/partition_pruner_test.go
planner/core/partition_pruning_test.go
planner/core/physical_plan_test.go
planner/core/plan_test.go
planner/core/plan_to_pb_test.go
planner/core/planbuilder_test.go
planner/core/point_get_plan_test.go
planner/core/prepare_test.go
planner/core/preprocess_test.go
planner/core/rule_inject_extra_projection_test.go
planner/core/rule_join_reorder_dp_test.go
planner/core/rule_result_reorder_test.go
planner/core/stats_test.go
tidb $ 
```

Removing `main_test.go` from the list we get -

```markdown
- `planner/core/cache_test.go`
- `planner/core/cacheable_checker_test.go`
- `planner/core/cbo_test.go`
- `planner/core/enforce_mpp_test.go`
- `planner/core/errors_test.go`
- `planner/core/exhaust_physical_plans_test.go`
- `planner/core/expression_rewriter_test.go`
- `planner/core/expression_test.go`
- `planner/core/find_best_task_test.go`
- `planner/core/indexmerge_test.go`
- `planner/core/integration_partition_test.go`
- `planner/core/integration_test.go`
- `planner/core/logical_plan_test.go`
- `planner/core/logical_plans_test.go`
- `planner/core/memtable_predicate_extractor_test.go`
- `planner/core/optimizer_test.go`
- `planner/core/partition_pruner_test.go`
- `planner/core/partition_pruning_test.go`
- `planner/core/physical_plan_test.go`
- `planner/core/plan_test.go`
- `planner/core/plan_to_pb_test.go`
- `planner/core/planbuilder_test.go`
- `planner/core/point_get_plan_test.go`
- `planner/core/prepare_test.go`
- `planner/core/preprocess_test.go`
- `planner/core/rule_inject_extra_projection_test.go`
- `planner/core/rule_join_reorder_dp_test.go`
- `planner/core/rule_result_reorder_test.go`
- `planner/core/stats_test.go`
```

---

`planner/core: migrate TestCacheKey to testify (#28386)`

```bash
{ make failpoint-enable; go test -v -run ^TestCacheKey$ github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```

```bash
{ make failpoint-enable; go test -v github.com/pingcap/tidb/planner/core; make failpoint-disable; }
```
