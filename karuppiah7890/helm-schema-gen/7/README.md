# Issue 7

https://github.com/karuppiah7890/helm-schema-gen/issues/7

I'm trying to do a small benchmark of how much CPU and RAM the whole tool
takes.

For now I'm just planning to execute the root command's execution alone and
check it out

https://blog.golang.org/pprof

https://golang.org/pkg/testing/#hdr-Benchmarks

https://golang.org/cmd/go/#hdr-Testing_flags

```bash
$ go test -v -bench . ./...
...
BenchmarkRootCommandExecution-8             2358            510503 ns/op
...
```

```bash
$ go test -v -bench . -benchtime 10s ./...
...
BenchmarkRootCommandExecution-8            23386            458685 ns/op
...
```

That's cool! :D

Not so bad :P Though I have seen way way faster of course.

510503 nanoseconds is 0.000510503 seconds

Let's see some memory benchmark

```bash
$ go test -v -bench . -benchmem ./...
...
BenchmarkRootCommandExecution-8             2271            471182 ns/op           53775 B/op        629 allocs/op
...
```

Hmm, so, that's like, 53775 Bytes per execution - which is like, 53.775
Kilo Bytes. Hmm

The values.yaml file that was read was around 2 Kilo Bytes

```bash
$ ls -lh testdata/values.yaml
-rw-r--r--  1 karuppiahn  staff   1.8K Jan  1 23:51 testdata/values.yaml
```

Anyways. I think this is okay. The number of allocations does look a lot. Hmm.
Not sure where how much memory and CPU is being used. Gotta get the profile to
check that out :)
