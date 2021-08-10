
test.sh file which runs some tests in my MacOS

I found this in `.github/workflows/tests.yaml` in etcd repo

And just ran the unit tests using

```bash
GOARCH=amd64 PASSES='unit' RACE='true' CPU='4' ./test.sh -p=2
```

and got the below output and error

```bash
$ GOARCH=amd64 PASSES='unit' RACE='true' CPU='4' ./test.sh -p=2
go: downloading go.etcd.io/bbolt v1.3.6
go: downloading github.com/soheilhy/cmux v0.1.5
go: downloading github.com/grpc-ecosystem/go-grpc-middleware v1.3.0
go: downloading golang.org/x/crypto v0.0.0-20210513164829-c07d793c2f9a
go: downloading gopkg.in/cheggaaa/pb.v1 v1.0.28
go: downloading golang.org/x/sys v0.0.0-20210603125802-9665404d3644
go: downloading go.opentelemetry.io/contrib v0.20.0
go: downloading github.com/jonboulle/clockwork v0.2.2
go: downloading go.uber.org/multierr v1.7.0
go: downloading golang.org/x/net v0.0.0-20210525063256-abc453219eb5
go: downloading github.com/tmc/grpc-websocket-proxy v0.0.0-20201229170055-e5319fda7802
go: downloading go.opentelemetry.io/otel v0.20.0
go: downloading github.com/golang-jwt/jwt v3.2.2+incompatible
go: downloading go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc v0.20.0
go: downloading github.com/google/btree v1.0.1
go: downloading go.opentelemetry.io/otel/exporters/otlp v0.20.0
go: downloading go.opentelemetry.io/otel/sdk v0.20.0
go: downloading go.opentelemetry.io/otel/trace v0.20.0
go: downloading go.opentelemetry.io/otel/metric v0.20.0
go: downloading go.opentelemetry.io/proto/otlp v0.7.0
go: downloading go.opentelemetry.io/otel/sdk/export/metric v0.20.0
go: downloading go.opentelemetry.io/otel/sdk/metric v0.20.0
% 'env' 'GO111MODULE=off' 'go' 'get' 'github.com/myitcv/gobin'
Running with --race=true --cpu=4
Starting at: Tue Aug 10 20:59:23 IST 2021

'unit' started at Tue Aug 10 20:59:23 IST 2021
% (cd api && 'env' 'go' 'test' '-short' '-timeout=3m' '--race=true' '--cpu=4' './...' '-p=2')
?   	go.etcd.io/etcd/api/v3/authpb	[no test files]
ok  	go.etcd.io/etcd/api/v3/etcdserverpb	0.444s
?   	go.etcd.io/etcd/api/v3/etcdserverpb/gw	[no test files]
?   	go.etcd.io/etcd/api/v3/membershippb	[no test files]
?   	go.etcd.io/etcd/api/v3/mvccpb	[no test files]
ok  	go.etcd.io/etcd/api/v3/v3rpc/rpctypes	0.365s
?   	go.etcd.io/etcd/api/v3/version	[no test files]
?   	go.etcd.io/etcd/api/v3/versionpb	[no test files]
% (cd pkg && 'env' 'go' 'test' '-short' '-timeout=3m' '--race=true' '--cpu=4' './...' '-p=2')
stderr: go: downloading github.com/golang/protobuf v1.5.1
stderr: go: downloading golang.org/x/net v0.0.0-20190620200207-3b0461eec859
stderr: go: downloading google.golang.org/genproto v0.0.0-20200526211855-cb27e3aa2013
ok  	go.etcd.io/etcd/pkg/v3/adt	0.320s
?   	go.etcd.io/etcd/pkg/v3/cobrautl	[no test files]
?   	go.etcd.io/etcd/pkg/v3/contention	[no test files]
?   	go.etcd.io/etcd/pkg/v3/cpuutil	[no test files]
ok  	go.etcd.io/etcd/pkg/v3/crc	0.355s
?   	go.etcd.io/etcd/pkg/v3/debugutil	[no test files]
ok  	go.etcd.io/etcd/pkg/v3/expect	0.737s
ok  	go.etcd.io/etcd/pkg/v3/flags	0.338s
?   	go.etcd.io/etcd/pkg/v3/grpc_testing	[no test files]
ok  	go.etcd.io/etcd/pkg/v3/httputil	0.435s
ok  	go.etcd.io/etcd/pkg/v3/idutil	0.315s
ok  	go.etcd.io/etcd/pkg/v3/ioutil	0.349s
ok  	go.etcd.io/etcd/pkg/v3/netutil	1.471s
ok  	go.etcd.io/etcd/pkg/v3/osutil	0.336s
ok  	go.etcd.io/etcd/pkg/v3/pbutil	0.320s
ok  	go.etcd.io/etcd/pkg/v3/proxy	4.696s
ok  	go.etcd.io/etcd/pkg/v3/report	0.403s
?   	go.etcd.io/etcd/pkg/v3/runtime	[no test files]
ok  	go.etcd.io/etcd/pkg/v3/schedule	0.417s
ok  	go.etcd.io/etcd/pkg/v3/stringutil	0.321s
ok  	go.etcd.io/etcd/pkg/v3/traceutil	0.348s
ok  	go.etcd.io/etcd/pkg/v3/wait	0.362s
% (cd raft && 'env' 'go' 'test' '-short' '-timeout=3m' '--race=true' '--cpu=4' './...' '-p=2')
stderr: go: downloading github.com/cockroachdb/datadriven v0.0.0-20200714090401-bf6692d28da5
stderr: go: downloading github.com/cockroachdb/errors v1.2.4
stderr: go: downloading github.com/getsentry/raven-go v0.2.0
stderr: go: downloading github.com/cockroachdb/logtags v0.0.0-20190617123548-eb05cc24525f
stderr: go: downloading github.com/certifi/gocertifi v0.0.0-20200922220541-2c3bb06c6054
ok  	go.etcd.io/etcd/raft/v3	1.316s
ok  	go.etcd.io/etcd/raft/v3/confchange	0.701s
ok  	go.etcd.io/etcd/raft/v3/quorum	1.330s
ok  	go.etcd.io/etcd/raft/v3/raftpb	0.342s
ok  	go.etcd.io/etcd/raft/v3/rafttest	1.025s
ok  	go.etcd.io/etcd/raft/v3/tracker	0.558s
% (cd client/pkg && 'env' 'go' 'test' '-short' '-timeout=3m' '--race=true' '--cpu=4' './...' '-p=2')
ok  	go.etcd.io/etcd/client/pkg/v3/fileutil	0.514s
ok  	go.etcd.io/etcd/client/pkg/v3/logutil	0.423s
ok  	go.etcd.io/etcd/client/pkg/v3/pathutil	0.321s
ok  	go.etcd.io/etcd/client/pkg/v3/srv	1.100s
?   	go.etcd.io/etcd/client/pkg/v3/systemd	[no test files]
ok  	go.etcd.io/etcd/client/pkg/v3/testutil	0.562s
ok  	go.etcd.io/etcd/client/pkg/v3/tlsutil	0.404s
ok  	go.etcd.io/etcd/client/pkg/v3/transport	4.312s
ok  	go.etcd.io/etcd/client/pkg/v3/types	0.493s
% (cd client/v2 && 'env' 'go' 'test' '-short' '-timeout=3m' '--race=true' '--cpu=4' './...' '-p=2')
stderr: go: downloading github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421
ok  	go.etcd.io/etcd/client/v2	0.472s
% (cd client/v3 && 'env' 'go' 'test' '-short' '-timeout=3m' '--race=true' '--cpu=4' './...' '-p=2')
--- FAIL: TestAuthTokenBundleNoOverwrite (0.00s)
    client_test.go:210: listen unix /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/TestAuthTokenBundleNoOverwrite3739800120/001/etcd-auth-test:0: bind: invalid argument
FAIL
FAIL	go.etcd.io/etcd/client/v3	3.579s
ok  	go.etcd.io/etcd/client/v3/clientv3util	0.479s [no tests to run]
ok  	go.etcd.io/etcd/client/v3/concurrency	0.419s
?   	go.etcd.io/etcd/client/v3/credentials	[no test files]
?   	go.etcd.io/etcd/client/v3/experimental/recipes	[no test files]
ok  	go.etcd.io/etcd/client/v3/internal/endpoint	0.328s
?   	go.etcd.io/etcd/client/v3/internal/resolver	[no test files]
?   	go.etcd.io/etcd/client/v3/leasing	[no test files]
?   	go.etcd.io/etcd/client/v3/mirror	[no test files]
?   	go.etcd.io/etcd/client/v3/mock/mockserver	[no test files]
ok  	go.etcd.io/etcd/client/v3/namespace	0.428s
?   	go.etcd.io/etcd/client/v3/naming	[no test files]
?   	go.etcd.io/etcd/client/v3/naming/endpoints	[no test files]
?   	go.etcd.io/etcd/client/v3/naming/endpoints/internal	[no test files]
?   	go.etcd.io/etcd/client/v3/naming/resolver	[no test files]
ok  	go.etcd.io/etcd/client/v3/ordering	0.399s
?   	go.etcd.io/etcd/client/v3/snapshot	[no test files]
ok  	go.etcd.io/etcd/client/v3/yaml	0.445s
FAIL
FAIL: (code:1):
  % (cd client/v3 && 'env' 'go' 'test' '-short' '-timeout=3m' '--race=true' '--cpu=4' './...' '-p=2')
FAIL: 'unit' failed at Tue Aug 10 21:00:29 IST 2021
etcd $ bind
etcd $ bind -h
-bash: bind: -h: invalid option
bind: usage: bind [-lpvsPVS] [-m keymap] [-f filename] [-q name] [-u name] [-r keyseq] [-x keyseq:shell-command] [keyseq:readline-function or readline-command]
```

The test `TestAuthTokenBundleNoOverwrite` is failing. Hmm. This just doesn't seem to work in my Mac I guess. Something to do with `bind` CLI tool I guess. Gotta check more later. The test is in `client/v3/client_test.go:206`

Error is

```bash
--- FAIL: TestAuthTokenBundleNoOverwrite (0.00s)
    client_test.go:210: listen unix /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/TestAuthTokenBundleNoOverwrite3739800120/001/etcd-auth-test:0: bind: invalid argument
```

When running just that test in VS code, I saw this same error -

```bash
Running tool: /usr/local/bin/go test -timeout 30s -run ^TestAuthTokenBundleNoOverwrite$ go.etcd.io/etcd/client/v3

--- FAIL: TestAuthTokenBundleNoOverwrite (0.00s)
    /Users/karuppiahn/projects/github.com/etcd-io/etcd/client/v3/client_test.go:210: listen unix /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/TestAuthTokenBundleNoOverwrite2427644703/001/etcd-auth-test:0: bind: invalid argument
FAIL
FAIL	go.etcd.io/etcd/client/v3	0.480s
FAIL
```

---

Following

https://github.com/etcd-io/etcd/issues/13167

I'm checking some flaky test stuff

https://github.com/etcd-io/etcd/issues?q=is%3Aissue+is%3Aopen+flaky

my current PR has some flaky tests I think

https://github.com/etcd-io/etcd/pull/13175

https://github.com/etcd-io/etcd/pull/13175/checks?check_run_id=3191066005

Now I'm going to run the functional tests that I found in here - `.github/workflows/functional.yaml`

using

```bash
GO_BUILD_FLAGS='-v -mod=readonly' ./build.sh && GOARCH=amd64 PASSES='functional' ./test.sh
```

```bash
etcd $ GO_BUILD_FLAGS='-v -mod=readonly' ./build.sh && GOARCH=amd64 PASSES='functional' ./test.sh
% 'rm' '-f' 'bin/etcd'
% (cd server && 'env' 'CGO_ENABLED=0' 'GO_BUILD_FLAGS=-v -mod=readonly' 'GOOS=' 'GOARCH=' 'go' 'build' '-v' '-mod=readonly' '-installsuffix=cgo' '-ldflags=-X=go.etcd.io/etcd/api/v3/version.GitSHA=ea24fb850' '-o=../bin/etcd' '.')
stderr: internal/unsafeheader
stderr: crypto/internal/subtle
stderr: internal/race
stderr: crypto/subtle
stderr: unicode/utf16
stderr: runtime/internal/sys
stderr: unicode/utf8
stderr: math/bits
stderr: container/list
stderr: vendor/golang.org/x/crypto/internal/subtle
stderr: internal/nettrace
stderr: vendor/golang.org/x/crypto/cryptobyte/asn1
stderr: unicode
stderr: sync/atomic
stderr: runtime/internal/atomic
stderr: internal/cpu
stderr: encoding
stderr: runtime/internal/math
stderr: go.opentelemetry.io/contrib
stderr: go.opentelemetry.io/otel/sdk/instrumentation
stderr: go.opentelemetry.io/otel/unit
stderr: go.etcd.io/etcd/client/v3/naming/endpoints/internal
stderr: internal/bytealg
stderr: math
stderr: runtime
stderr: go.opentelemetry.io/otel/internal
stderr: internal/reflectlite
stderr: sync
stderr: internal/singleflight
stderr: internal/testlog
stderr: math/rand
stderr: errors
stderr: sort
stderr: internal/oserror
stderr: path
stderr: io
stderr: vendor/golang.org/x/net/dns/dnsmessage
stderr: strconv
stderr: container/heap
stderr: syscall
stderr: go.etcd.io/etcd/client/pkg/v3/pathutil
stderr: text/tabwriter
stderr: crypto/internal/randutil
stderr: hash
stderr: bytes
stderr: strings
stderr: hash/fnv
stderr: crypto/hmac
stderr: hash/crc32
stderr: crypto/rc4
stderr: crypto
stderr: golang.org/x/crypto/blowfish
stderr: reflect
stderr: vendor/golang.org/x/crypto/hkdf
stderr: vendor/golang.org/x/text/transform
stderr: bufio
stderr: html
stderr: regexp/syntax
stderr: go.etcd.io/etcd/pkg/v3/crc
stderr: internal/syscall/execenv
stderr: internal/syscall/unix
stderr: time
stderr: regexp
stderr: go.etcd.io/etcd/pkg/v3/idutil
stderr: go.opentelemetry.io/otel/sdk/metric/controller/time
stderr: go.etcd.io/etcd/pkg/v3/contention
stderr: github.com/jonboulle/clockwork
stderr: context
stderr: io/fs
stderr: internal/poll
stderr: internal/fmtsort
stderr: encoding/binary
stderr: crypto/x509/internal/macos
stderr: golang.org/x/net/context
stderr: go.etcd.io/etcd/pkg/v3/schedule
stderr: os
stderr: encoding/base64
stderr: crypto/md5
stderr: crypto/sha512
stderr: crypto/sha1
stderr: crypto/ed25519/internal/edwards25519
stderr: vendor/golang.org/x/crypto/poly1305
stderr: crypto/cipher
stderr: crypto/sha256
stderr: encoding/pem
stderr: vendor/golang.org/x/crypto/chacha20
stderr: crypto/des
stderr: crypto/aes
stderr: os/signal
stderr: vendor/golang.org/x/sys/cpu
stderr: runtime/debug
stderr: fmt
stderr: path/filepath
stderr: vendor/golang.org/x/net/route
stderr: go.etcd.io/etcd/server/v3/storage/datadir
stderr: io/ioutil
stderr: vendor/golang.org/x/crypto/chacha20poly1305
stderr: github.com/grpc-ecosystem/grpc-gateway/utilities
stderr: net
stderr: log
stderr: encoding/hex
stderr: net/url
stderr: flag
stderr: mime/quotedprintable
stderr: vendor/golang.org/x/crypto/curve25519
stderr: net/http/internal
stderr: vendor/golang.org/x/net/http2/hpack
stderr: mime
stderr: compress/flate
stderr: encoding/json
stderr: vendor/golang.org/x/text/unicode/norm
stderr: math/big
stderr: go/token
stderr: vendor/golang.org/x/text/unicode/bidi
stderr: golang.org/x/net/internal/timeseries
stderr: text/template/parse
stderr: encoding/csv
stderr: golang.org/x/net/http2/hpack
stderr: runtime/trace
stderr: go.opentelemetry.io/otel/metric/number
stderr: go.etcd.io/etcd/pkg/v3/runtime
stderr: golang.org/x/net/idna
stderr: go.etcd.io/etcd/pkg/v3/pbutil
stderr: compress/gzip
stderr: vendor/golang.org/x/text/secure/bidirule
stderr: go.etcd.io/bbolt
stderr: go.opentelemetry.io/otel/codes
stderr: google.golang.org/protobuf/internal/encoding/json
stderr: go.etcd.io/etcd/pkg/v3/wait
stderr: go.opentelemetry.io/otel/attribute
stderr: go.etcd.io/etcd/raft/v3/quorum
stderr: github.com/sirupsen/logrus
stderr: go.uber.org/multierr
stderr: vendor/golang.org/x/net/idna
stderr: internal/profile
stderr: go.etcd.io/etcd/pkg/v3/adt
stderr: runtime/pprof
stderr: golang.org/x/time/rate
stderr: github.com/google/btree
stderr: text/template
stderr: google.golang.org/protobuf/encoding/protojson
stderr: go.opentelemetry.io/otel/trace
stderr: go.uber.org/zap/zapcore
stderr: go.opentelemetry.io/otel/metric
stderr: go.opentelemetry.io/otel/internal/baggage
stderr: go.opentelemetry.io/otel/sdk/export/metric/aggregation
stderr: encoding/asn1
stderr: crypto/rand
stderr: crypto/elliptic
stderr: crypto/dsa
stderr: github.com/coreos/go-systemd/v22/daemon
stderr: vendor/golang.org/x/net/http/httpproxy
stderr: net/textproto
stderr: google.golang.org/grpc/internal/syscall
stderr: google.golang.org/grpc/stats
stderr: github.com/coreos/go-systemd/v22/journal
stderr: go.etcd.io/etcd/client/pkg/v3/systemd
stderr: crypto/ed25519
stderr: crypto/rsa
stderr: github.com/prometheus/procfs
stderr: go.etcd.io/etcd/client/v3/internal/endpoint
stderr: go.etcd.io/etcd/client/pkg/v3/types
stderr: go.opentelemetry.io/otel/internal/trace/noop
stderr: go.opentelemetry.io/otel/metric/registry
stderr: html/template
stderr: go.opentelemetry.io/otel/baggage
stderr: github.com/spf13/pflag
stderr: vendor/golang.org/x/net/http/httpguts
stderr: mime/multipart
stderr: vendor/golang.org/x/crypto/cryptobyte
stderr: crypto/x509/pkix
stderr: golang.org/x/net/http/httpguts
stderr: github.com/golang/protobuf/protoc-gen-go/descriptor
stderr: google.golang.org/protobuf/types/known/wrapperspb
stderr: github.com/golang/protobuf/jsonpb
stderr: github.com/grpc-ecosystem/grpc-gateway/internal
stderr: google.golang.org/genproto/googleapis/api/httpbody
stderr: google.golang.org/protobuf/types/known/fieldmaskpb
stderr: go.etcd.io/etcd/client/pkg/v3/srv
stderr: go.etcd.io/etcd/raft/v3/raftpb
stderr: github.com/dustin/go-humanize
stderr: golang.org/x/crypto/bcrypt
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/snap/snappb
stderr: github.com/golang/protobuf/descriptor
stderr: github.com/golang/protobuf/ptypes/wrappers
stderr: crypto/ecdsa
stderr: go.opentelemetry.io/proto/otlp/common/v1
stderr: google.golang.org/grpc/encoding/gzip
stderr: os/user
stderr: google.golang.org/genproto/protobuf/field_mask
stderr: gopkg.in/natefinch/lumberjack.v2
stderr: go.opentelemetry.io/proto/otlp/resource/v1
stderr: crypto/x509
stderr: go.etcd.io/etcd/server/v3/storage/wal/walpb
stderr: go.etcd.io/etcd/raft/v3/tracker
stderr: github.com/spf13/cobra
stderr: go.opentelemetry.io/proto/otlp/trace/v1
stderr: go.opentelemetry.io/proto/otlp/metrics/v1
stderr: go.etcd.io/etcd/raft/v3/confchange
stderr: go.etcd.io/etcd/raft/v3
stderr: github.com/golang-jwt/jwt
stderr: crypto/tls
stderr: net/http/httptrace
stderr: go.etcd.io/etcd/client/pkg/v3/tlsutil
stderr: google.golang.org/grpc/internal/credentials
stderr: google.golang.org/grpc/credentials
stderr: net/http
stderr: google.golang.org/grpc/resolver
stderr: go.etcd.io/etcd/client/v3/credentials
stderr: google.golang.org/grpc/peer
stderr: google.golang.org/grpc/internal/channelz
stderr: google.golang.org/grpc/internal/transport/networktype
stderr: google.golang.org/grpc/resolver/manual
stderr: google.golang.org/grpc/internal/resolver/passthrough
stderr: google.golang.org/grpc/internal
stderr: google.golang.org/grpc/balancer/grpclb/state
stderr: google.golang.org/grpc/internal/metadata
stderr: google.golang.org/grpc/internal/grpcutil
stderr: google.golang.org/grpc/internal/resolver/unix
stderr: go.etcd.io/etcd/client/v3/internal/resolver
stderr: google.golang.org/grpc/internal/resolver/dns
stderr: google.golang.org/grpc/balancer
stderr: google.golang.org/grpc/internal/binarylog
stderr: google.golang.org/grpc/internal/serviceconfig
stderr: google.golang.org/grpc/balancer/base
stderr: google.golang.org/grpc/internal/resolver
stderr: google.golang.org/grpc/balancer/roundrobin
stderr: go.etcd.io/etcd/pkg/v3/httputil
stderr: net/http/pprof
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v2error
stderr: golang.org/x/net/trace
stderr: github.com/xiang90/probing
stderr: go.opentelemetry.io/otel/propagation
stderr: net/http/httputil
stderr: github.com/prometheus/common/expfmt
stderr: expvar
stderr: go.opentelemetry.io/otel/semconv
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v2http/httptypes
stderr: go.etcd.io/etcd/client/v2
stderr: github.com/gorilla/websocket
stderr: go.uber.org/zap
stderr: github.com/grpc-ecosystem/grpc-gateway/runtime
stderr: golang.org/x/net/http2
stderr: go.etcd.io/etcd/pkg/v3/debugutil
stderr: go.opentelemetry.io/otel/internal/global
stderr: go.opentelemetry.io/otel
stderr: github.com/prometheus/client_golang/prometheus
stderr: go.opentelemetry.io/otel/internal/metric
stderr: go.opentelemetry.io/otel/sdk/internal
stderr: go.opentelemetry.io/otel/sdk/resource
stderr: github.com/tmc/grpc-websocket-proxy/wsproxy
stderr: go.uber.org/zap/zapgrpc
stderr: go.etcd.io/etcd/pkg/v3/traceutil
stderr: go.etcd.io/etcd/server/v3/proxy/tcpproxy
stderr: go.etcd.io/etcd/pkg/v3/netutil
stderr: go.etcd.io/etcd/pkg/v3/osutil
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v2stats
stderr: go.etcd.io/etcd/client/pkg/v3/logutil
stderr: go.etcd.io/etcd/pkg/v3/flags
stderr: go.etcd.io/etcd/client/pkg/v3/fileutil
stderr: go.opentelemetry.io/otel/sdk/export/metric
stderr: go.opentelemetry.io/otel/sdk/trace
stderr: go.opentelemetry.io/otel/sdk/metric/processor/basic
stderr: go.opentelemetry.io/otel/sdk/metric/aggregator
stderr: go.etcd.io/etcd/pkg/v3/ioutil
stderr: go.opentelemetry.io/otel/sdk/metric/aggregator/exact
stderr: go.opentelemetry.io/otel/sdk/metric/aggregator/histogram
stderr: go.opentelemetry.io/otel/sdk/metric/aggregator/sum
stderr: go.opentelemetry.io/otel/sdk/metric/aggregator/lastvalue
stderr: go.opentelemetry.io/otel/sdk/metric/aggregator/minmaxsumcount
stderr: go.etcd.io/etcd/client/pkg/v3/transport
stderr: go.opentelemetry.io/otel/sdk/metric
stderr: go.opentelemetry.io/otel/exporters/otlp/internal/transform
stderr: github.com/prometheus/client_golang/prometheus/promhttp
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/snap
stderr: go.etcd.io/etcd/server/v3/storage/backend
stderr: go.etcd.io/etcd/server/v3/storage/wal
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v2store
stderr: go.opentelemetry.io/otel/sdk/metric/selector/simple
stderr: go.opentelemetry.io/otel/sdk/metric/controller/basic
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v2discovery
stderr: github.com/soheilhy/cmux
stderr: go.etcd.io/etcd/server/v3/proxy/httpproxy
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/rafthttp
stderr: google.golang.org/grpc/internal/transport
stderr: go.opentelemetry.io/otel/exporters/otlp
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/membership
stderr: go.etcd.io/etcd/server/v3/etcdserver/version
stderr: go.etcd.io/etcd/server/v3/etcdserver/api
stderr: google.golang.org/grpc
stderr: go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc
stderr: google.golang.org/grpc/health/grpc_health_v1
stderr: go.opentelemetry.io/otel/exporters/otlp/internal/otlpconfig
stderr: go.opentelemetry.io/proto/otlp/collector/metrics/v1
stderr: github.com/grpc-ecosystem/go-grpc-middleware
stderr: go.opentelemetry.io/proto/otlp/collector/trace/v1
stderr: github.com/grpc-ecosystem/go-grpc-prometheus
stderr: go.etcd.io/etcd/api/v3/etcdserverpb
stderr: google.golang.org/grpc/health
stderr: go.etcd.io/etcd/server/v3/config
stderr: go.opentelemetry.io/otel/exporters/otlp/otlpgrpc
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3alarm
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3election/v3electionpb
stderr: go.etcd.io/etcd/server/v3/lease/leasepb
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3lock/v3lockpb
stderr: go.etcd.io/etcd/server/v3/proxy/grpcproxy/cache
stderr: go.etcd.io/etcd/api/v3/etcdserverpb/gw
stderr: go.etcd.io/etcd/server/v3/auth
stderr: go.etcd.io/etcd/client/v3
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3lock/v3lockpb/gw
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3election/v3electionpb/gw
stderr: go.etcd.io/etcd/server/v3/proxy/grpcproxy/adapter
stderr: go.etcd.io/etcd/server/v3/storage/schema
stderr: go.etcd.io/etcd/server/v3/etcdserver/cindex
stderr: go.etcd.io/etcd/server/v3/verify
stderr: go.etcd.io/etcd/server/v3/lease
stderr: go.etcd.io/etcd/server/v3/storage
stderr: go.etcd.io/etcd/server/v3/lease/leasehttp
stderr: go.etcd.io/etcd/server/v3/storage/mvcc
stderr: go.etcd.io/etcd/client/v3/ordering
stderr: go.etcd.io/etcd/client/v3/naming/endpoints
stderr: go.etcd.io/etcd/client/v3/concurrency
stderr: go.etcd.io/etcd/client/v3/namespace
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3election
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3lock
stderr: go.etcd.io/etcd/client/v3/leasing
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3compactor
stderr: go.etcd.io/etcd/server/v3/etcdserver
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v2auth
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v2v3
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3rpc
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/etcdhttp
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v2http
stderr: go.etcd.io/etcd/server/v3/etcdserver/api/v3client
stderr: go.etcd.io/etcd/server/v3/proxy/grpcproxy
stderr: go.etcd.io/etcd/server/v3/embed
stderr: go.etcd.io/etcd/server/v3/etcdmain
stderr: go.etcd.io/etcd/server/v3
% 'rm' '-f' 'bin/etcdutl'
% (cd etcdutl && 'env' 'GO_BUILD_FLAGS=-v -mod=readonly' 'CGO_ENABLED=0' 'GO_BUILD_FLAGS=-v -mod=readonly' 'GOOS=' 'GOARCH=' 'go' 'build' '-v' '-mod=readonly' '-installsuffix=cgo' '-ldflags=-X=go.etcd.io/etcd/api/v3/version.GitSHA=ea24fb850' '-o=../bin/etcdutl' '.')
stderr: github.com/olekukonko/tablewriter
stderr: go.etcd.io/etcd/pkg/v3/cobrautl
stderr: go.etcd.io/etcd/client/v3/snapshot
stderr: go.etcd.io/etcd/etcdutl/v3/snapshot
stderr: go.etcd.io/etcd/etcdutl/v3/etcdutl
stderr: go.etcd.io/etcd/etcdutl/v3
% 'rm' '-f' 'bin/etcdctl'
% (cd etcdctl && 'env' 'GO_BUILD_FLAGS=-v -mod=readonly' 'CGO_ENABLED=0' 'GO_BUILD_FLAGS=-v -mod=readonly' 'GOOS=' 'GOARCH=' 'go' 'build' '-v' '-mod=readonly' '-installsuffix=cgo' '-ldflags=-X=go.etcd.io/etcd/api/v3/version.GitSHA=ea24fb850' '-o=../bin/etcdctl' '.')
stderr: go: downloading github.com/urfave/cli v1.22.4
stderr: os/exec
stderr: github.com/bgentry/speakeasy
stderr: github.com/urfave/cli
stderr: go.etcd.io/etcd/pkg/v3/report
stderr: gopkg.in/cheggaaa/pb.v1
stderr: go.etcd.io/etcd/client/v3/mirror
stderr: go.etcd.io/etcd/etcdctl/v3/ctlv2/command
stderr: go.etcd.io/etcd/etcdctl/v3/ctlv3/command
stderr: go.etcd.io/etcd/etcdctl/v3/ctlv2
stderr: go.etcd.io/etcd/etcdctl/v3/ctlv3
stderr: go.etcd.io/etcd/etcdctl/v3
SUCCESS: etcd_build (GOARCH=)
Running with --race
Starting at: Tue Aug 10 21:16:52 IST 2021

'functional' started at Tue Aug 10 21:16:52 IST 2021
% './tests/functional/build.sh'
stderr: go.etcd.io/etcd/pkg/v3/proxy
stderr: go.etcd.io/etcd/tests/v3/functional/rpcpb
stderr: go.etcd.io/etcd/tests/v3/functional/agent
stderr: go.etcd.io/etcd/tests/v3/functional/cmd/etcd-agent
stderr: go.etcd.io/etcd/tests/v3/functional/cmd/etcd-proxy
stderr: go.etcd.io/etcd/pkg/v3/stringutil
stderr: go.etcd.io/etcd/tests/v3/functional/runner
stderr: go.etcd.io/etcd/tests/v3/functional/cmd/etcd-runner
Waiting for 'etcd-agent' on 19027...
2021-08-10T21:17:09.578+0530	INFO	agent	agent/server.go:99	gRPC server started	{"address": "127.0.0.1:29027", "address": "127.0.0.1:29027", "listener-address": "127.0.0.1:29027"}
2021-08-10T21:17:09.578+0530	INFO	agent	agent/server.go:99	gRPC server started	{"address": "127.0.0.1:19027", "address": "127.0.0.1:19027", "listener-address": "127.0.0.1:19027"}
2021-08-10T21:17:09.578+0530	INFO	agent	agent/server.go:99	gRPC server started	{"address": "127.0.0.1:39027", "address": "127.0.0.1:39027", "listener-address": "127.0.0.1:39027"}
Connection to localhost port 19027 [tcp/*] succeeded!
Waiting for 'etcd-agent' on 29027...
Connection to localhost port 29027 [tcp/*] succeeded!
Waiting for 'etcd-agent' on 39027...
Connection to localhost port 39027 [tcp/*] succeeded!
functional test START!
% './bin/etcd-tester' '--config' './tests/functional/functional.yaml' '-test.v'
=== RUN   TestFunctional
    logger.go:130: 2021-08-10T21:17:10.591+0530	INFO	tester	opened configuration file	{"path": "./tests/functional/functional.yaml"}
    logger.go:130: 2021-08-10T21:17:10.592+0530	INFO	tester	creating members
    logger.go:130: 2021-08-10T21:17:10.592+0530	INFO	tester	connected	{"agent-address": "127.0.0.1:19027"}
    logger.go:130: 2021-08-10T21:17:10.592+0530	INFO	tester	created stream	{"agent-address": "127.0.0.1:19027"}
    logger.go:130: 2021-08-10T21:17:10.592+0530	INFO	tester	connected	{"agent-address": "127.0.0.1:29027"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	created stream	{"agent-address": "127.0.0.1:29027"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	connected	{"agent-address": "127.0.0.1:39027"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	created stream	{"agent-address": "127.0.0.1:39027"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	agents configured.
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	tester server started
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_WRITE_SMALL", "weight": 0.35, "endpoint": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_WRITE_LARGE", "weight": 0.002, "endpoint": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	started tester HTTP server	{"tester-address": "127.0.0.1:9028"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_READ_ONE_KEY", "weight": 0.07, "endpoint": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_READ_RANGE", "weight": 0.07, "endpoint": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_DELETE_ONE_KEY", "weight": 0.07, "endpoint": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_DELETE_RANGE", "weight": 0.07, "endpoint": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_TXN_WRITE_DELETE", "weight": 0.35, "endpoint": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "LEASE", "weight": 0, "endpoint": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	added lease stresser	{"endpoint": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_WRITE_SMALL", "weight": 0.35, "endpoint": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_WRITE_LARGE", "weight": 0.002, "endpoint": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_READ_ONE_KEY", "weight": 0.07, "endpoint": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_READ_RANGE", "weight": 0.07, "endpoint": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_DELETE_ONE_KEY", "weight": 0.07, "endpoint": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_DELETE_RANGE", "weight": 0.07, "endpoint": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.593+0530	INFO	tester	creating stresser	{"type": "KV_TXN_WRITE_DELETE", "weight": 0.35, "endpoint": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	creating stresser	{"type": "LEASE", "weight": 0, "endpoint": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	added lease stresser	{"endpoint": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	creating stresser	{"type": "KV_WRITE_SMALL", "weight": 0.35, "endpoint": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	creating stresser	{"type": "KV_WRITE_LARGE", "weight": 0.002, "endpoint": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	creating stresser	{"type": "KV_READ_ONE_KEY", "weight": 0.07, "endpoint": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	creating stresser	{"type": "KV_READ_RANGE", "weight": 0.07, "endpoint": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	creating stresser	{"type": "KV_DELETE_ONE_KEY", "weight": 0.07, "endpoint": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	creating stresser	{"type": "KV_DELETE_RANGE", "weight": 0.07, "endpoint": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	creating stresser	{"type": "KV_TXN_WRITE_DELETE", "weight": 0.35, "endpoint": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	creating stresser	{"type": "LEASE", "weight": 0, "endpoint": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	added lease stresser	{"endpoint": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	updated stressers
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	sent request	{"operation": "INITIAL_START_ETCD", "to": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	sent request	{"operation": "INITIAL_START_ETCD", "to": "127.0.0.1:2379"}
    logger.go:130: 2021-08-10T21:17:10.594+0530	INFO	tester	sent request	{"operation": "INITIAL_START_ETCD", "to": "127.0.0.1:1379"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:481	created base directory	{"address": "127.0.0.1:39027", "path": "/tmp/etcd-functional-3"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:481	created base directory	{"address": "127.0.0.1:29027", "path": "/tmp/etcd-functional-2"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:481	created base directory	{"address": "127.0.0.1:19027", "path": "/tmp/etcd-functional-1"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:94	created etcd log file	{"address": "127.0.0.1:39027", "path": "/tmp/etcd-functional-3/etcd.log"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:94	created etcd log file	{"address": "127.0.0.1:29027", "path": "/tmp/etcd-functional-2/etcd.log"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:108	creating etcd command	{"address": "127.0.0.1:39027", "etcd-exec": "./bin/etcd", "etcd-flags": ["--name=s3", "--data-dir=/tmp/etcd-functional-3/etcd.data", "--wal-dir=/tmp/etcd-functional-3/etcd.data/member/wal", "--heartbeat-interval=100", "--election-timeout=1000", "--listen-client-urls=https://127.0.0.1:3379", "--advertise-client-urls=https://127.0.0.1:3379", "--auto-tls=true", "--client-cert-auth=false", "--listen-peer-urls=https://127.0.0.1:3380", "--initial-advertise-peer-urls=https://127.0.0.1:3381", "--peer-auto-tls=true", "--peer-client-cert-auth=false", "--initial-cluster=s1=https://127.0.0.1:1381,s2=https://127.0.0.1:2381,s3=https://127.0.0.1:3381", "--initial-cluster-state=new", "--initial-cluster-token=tkn", "--snapshot-count=2000", "--quota-backend-bytes=10740000000", "--pre-vote=true", "--experimental-initial-corrupt-check=true", "--logger=zap", "--log-outputs=/tmp/etcd-functional-3/etcd.log", "--log-level=info", "--socket-reuse-address=true", "--socket-reuse-port=true"], "GOFAIL_FAILPOINTS": "", "failpoint-http-addr": "http://127.0.0.1:7383", "failpoint-addr": "127.0.0.1:7383"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:108	creating etcd command	{"address": "127.0.0.1:29027", "etcd-exec": "./bin/etcd", "etcd-flags": ["--name=s2", "--data-dir=/tmp/etcd-functional-2/etcd.data", "--wal-dir=/tmp/etcd-functional-2/etcd.data/member/wal", "--heartbeat-interval=100", "--election-timeout=1000", "--listen-client-urls=https://127.0.0.1:2379", "--advertise-client-urls=https://127.0.0.1:2379", "--auto-tls=true", "--client-cert-auth=false", "--listen-peer-urls=https://127.0.0.1:2380", "--initial-advertise-peer-urls=https://127.0.0.1:2381", "--peer-auto-tls=true", "--peer-client-cert-auth=false", "--initial-cluster=s1=https://127.0.0.1:1381,s2=https://127.0.0.1:2381,s3=https://127.0.0.1:3381", "--initial-cluster-state=new", "--initial-cluster-token=tkn", "--snapshot-count=2000", "--quota-backend-bytes=10740000000", "--pre-vote=true", "--experimental-initial-corrupt-check=true", "--logger=zap", "--log-outputs=/tmp/etcd-functional-2/etcd.log", "--log-level=info", "--socket-reuse-address=true", "--socket-reuse-port=true"], "GOFAIL_FAILPOINTS": "", "failpoint-http-addr": "http://127.0.0.1:7382", "failpoint-addr": "127.0.0.1:7382"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:94	created etcd log file	{"address": "127.0.0.1:19027", "path": "/tmp/etcd-functional-1/etcd.log"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:137	starting etcd command	{"address": "127.0.0.1:39027", "command-path": "./bin/etcd"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:137	starting etcd command	{"address": "127.0.0.1:29027", "command-path": "./bin/etcd"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:108	creating etcd command	{"address": "127.0.0.1:19027", "etcd-exec": "./bin/etcd", "etcd-flags": ["--name=s1", "--data-dir=/tmp/etcd-functional-1/etcd.data", "--wal-dir=/tmp/etcd-functional-1/etcd.data/member/wal", "--heartbeat-interval=100", "--election-timeout=1000", "--listen-client-urls=https://127.0.0.1:1379", "--advertise-client-urls=https://127.0.0.1:1379", "--auto-tls=true", "--client-cert-auth=false", "--listen-peer-urls=https://127.0.0.1:1380", "--initial-advertise-peer-urls=https://127.0.0.1:1381", "--peer-auto-tls=true", "--peer-client-cert-auth=false", "--initial-cluster=s1=https://127.0.0.1:1381,s2=https://127.0.0.1:2381,s3=https://127.0.0.1:3381", "--initial-cluster-state=new", "--initial-cluster-token=tkn", "--snapshot-count=2000", "--quota-backend-bytes=10740000000", "--pre-vote=true", "--experimental-initial-corrupt-check=true", "--logger=zap", "--log-outputs=/tmp/etcd-functional-1/etcd.log", "--log-level=info", "--socket-reuse-address=true", "--socket-reuse-port=true"], "GOFAIL_FAILPOINTS": "", "failpoint-http-addr": "http://127.0.0.1:7381", "failpoint-addr": "127.0.0.1:7381"}
2021-08-10T21:17:10.595+0530	INFO	agent	agent/handler.go:137	starting etcd command	{"address": "127.0.0.1:19027", "command-path": "./bin/etcd"}
2021-08-10T21:17:15.599+0530	INFO	agent	agent/handler.go:248	starting proxy on peer traffic	{"address": "127.0.0.1:29027", "url": "https://127.0.0.1:2381"}
2021-08-10T21:17:15.599+0530	INFO	agent	agent/handler.go:248	starting proxy on peer traffic	{"address": "127.0.0.1:39027", "url": "https://127.0.0.1:3381"}
2021-08-10T21:17:15.599+0530	INFO	agent	agent/handler.go:248	starting proxy on peer traffic	{"address": "127.0.0.1:19027", "url": "https://127.0.0.1:1381"}
2021-08-10T21:17:15.599+0530	INFO	agent	proxy/server.go:279	started proxying	{"address": "127.0.0.1:19027", "from": "tcp://127.0.0.1:1381", "to": "tcp://127.0.0.1:1380"}
2021-08-10T21:17:15.599+0530	INFO	agent	proxy/server.go:279	started proxying	{"address": "127.0.0.1:29027", "from": "tcp://127.0.0.1:2381", "to": "tcp://127.0.0.1:2380"}
2021-08-10T21:17:15.599+0530	INFO	agent	proxy/server.go:279	started proxying	{"address": "127.0.0.1:39027", "from": "tcp://127.0.0.1:3381", "to": "tcp://127.0.0.1:3380"}
2021-08-10T21:17:15.599+0530	INFO	agent	proxy/server.go:300	proxy is listening on	{"address": "127.0.0.1:39027", "from": "tcp://127.0.0.1:3381"}
2021-08-10T21:17:15.599+0530	INFO	agent	proxy/server.go:300	proxy is listening on	{"address": "127.0.0.1:19027", "from": "tcp://127.0.0.1:1381"}
2021-08-10T21:17:15.599+0530	INFO	agent	proxy/server.go:300	proxy is listening on	{"address": "127.0.0.1:29027", "from": "tcp://127.0.0.1:2381"}
2021-08-10T21:17:17.604+0530	INFO	agent	agent/handler.go:258	started proxy on peer traffic	{"address": "127.0.0.1:19027", "url": "https://127.0.0.1:1381"}
2021-08-10T21:17:17.605+0530	INFO	agent	agent/handler.go:143	started etcd command	{"address": "127.0.0.1:19027", "command-path": "./bin/etcd", "command-args": ["./bin/etcd", "--name=s1", "--data-dir=/tmp/etcd-functional-1/etcd.data", "--wal-dir=/tmp/etcd-functional-1/etcd.data/member/wal", "--heartbeat-interval=100", "--election-timeout=1000", "--listen-client-urls=https://127.0.0.1:1379", "--advertise-client-urls=https://127.0.0.1:1379", "--auto-tls=true", "--client-cert-auth=false", "--listen-peer-urls=https://127.0.0.1:1380", "--initial-advertise-peer-urls=https://127.0.0.1:1381", "--peer-auto-tls=true", "--peer-client-cert-auth=false", "--initial-cluster=s1=https://127.0.0.1:1381,s2=https://127.0.0.1:2381,s3=https://127.0.0.1:3381", "--initial-cluster-state=new", "--initial-cluster-token=tkn", "--snapshot-count=2000", "--quota-backend-bytes=10740000000", "--pre-vote=true", "--experimental-initial-corrupt-check=true", "--logger=zap", "--log-outputs=/tmp/etcd-functional-1/etcd.log", "--log-level=info", "--s2021-08-10T21:17:17.605+0530	INFO	agent	agent/handler.go:258	started proxy on peer traffic	{"address": "127.0.0.1:39027", "url": "https://127.0.0.1:3381"}
ocket-reuse-address=true", "--socket-reuse-port=true"], "errors": []}
2021-08-10T21:17:17.605+0530	INFO	agent	agent/handler.go:258	started proxy on peer traffic	{"address": "127.0.0.1:29027", "url": "https://127.0.0.1:2381"}
2021-08-10T21:17:17.605+0530	INFO	agent	agent/handler.go:143	started etcd command	{"address": "127.0.0.1:39027", "command-path": "./bin/etcd", "command-args": ["./bin/etcd", "--name=s3", "--data-dir=/tmp/etcd-functional-3/etcd.data", "--wal-dir=/tmp/etcd-functional-3/etcd.data/member/wal", "--heartbeat-interval=100", "--election-timeout=1000", "--listen-client-urls=https://127.0.0.1:3379", "--advertise-client-urls=https://127.0.0.1:3379", "--auto-tls=true", "--client-cert-auth=false", "--listen-peer-urls=https://127.0.0.1:3380", "--initial-advertise-peer-urls=https://127.0.0.1:3381", "--peer-auto-tls=true", "--peer-client-cert-auth=false", "--initial-cluster=s1=https://127.0.0.1:1381,s2=https://127.0.0.1:2381,s3=https://127.0.0.1:3381", "--initial-cluster-state=new", "--initial-cluster-token=tkn", "--snapshot-count=2000", "--quota-backend-bytes=10740000000", "--pre-vote=true", "--experimental-initial-corrupt-check=true", "--logger=zap", "--log-outputs=/tmp/etcd-functional-3/etcd.log", "--log-level=info", "--socket-reuse-address=true", "--socket-reuse-port=true"], "errors": []}
2021-08-10T21:17:17.605+0530	INFO	agent	agent/handler.go:143	started etcd command	{"address": "127.0.0.1:29027", "command-path": "./bin/etcd", "command-args": ["./bin/etcd", "--name=s2", "--data-dir=/tmp/etcd-functional-2/etcd.data", "--wal-dir=/tmp/etcd-functional-2/etcd.data/member/wal", "--heartbeat-interval=100", "--election-timeout=1000", "--listen-client-urls=https://127.0.0.1:2379", "--advertise-client-urls=https://127.0.0.1:2379", "--auto-tls=true", "--client-cert-auth=false", "--listen-peer-urls=https://127.0.0.1:2380", "--initial-advertise-peer-urls=https://127.0.0.1:2381", "--peer-auto-tls=true", "--peer-client-cert-auth=false", "--initial-cluster=s1=https://127.0.0.1:1381,s2=https://127.0.0.1:2381,s3=https://127.0.0.1:3381", "--initial-cluster-state=new", "--initial-cluster-token=tkn", "--snapshot-count=2000", "--quota-backend-bytes=10740000000", "--pre-vote=true", "--experimental-initial-corrupt-check=true", "--logger=zap", "--log-outputs=/tmp/etcd-functional-2/etcd.log", "--log-level=info", "--socket-reuse-address=true", "--socket-reuse-port=true"], "errors": []}
2021-08-10T21:17:18.609+0530	INFO	agent	agent/handler.go:389	loading peer auto TLS assets	{"address": "127.0.0.1:39027", "dir": "/tmp/etcd-functional-3/etcd.data/fixtures/peer", "endpoint": "127.0.0.1:3379"}
2021-08-10T21:17:18.609+0530	INFO	agent	agent/handler.go:389	loading peer auto TLS assets	{"address": "127.0.0.1:29027", "dir": "/tmp/etcd-functional-2/etcd.data/fixtures/peer", "endpoint": "127.0.0.1:2379"}
2021-08-10T21:17:18.609+0530	INFO	agent	agent/handler.go:389	loading peer auto TLS assets	{"address": "127.0.0.1:19027", "dir": "/tmp/etcd-functional-1/etcd.data/fixtures/peer", "endpoint": "127.0.0.1:1379"}
2021-08-10T21:17:18.610+0530	INFO	agent	agent/handler.go:415	loaded peer auto TLS assets	{"address": "127.0.0.1:39027", "peer-cert-path": "/tmp/etcd-functional-3/etcd.data/fixtures/peer/cert.pem", "peer-cert-length": 725, "peer-key-path": "/tmp/etcd-functional-3/etcd.data/fixtures/peer/key.pem", "peer-key-length": 365}
2021-08-10T21:17:18.610+0530	INFO	agent	agent/handler.go:415	loaded peer auto TLS assets	{"address": "127.0.0.1:29027", "peer-cert-path": "/tmp/etcd-functional-2/etcd.data/fixtures/peer/cert.pem", "peer-cert-length": 725, "peer-key-path": "/tmp/etcd-functional-2/etcd.data/fixtures/peer/key.pem", "peer-key-length": 365}
2021-08-10T21:17:18.610+0530	INFO	agent	agent/handler.go:415	loaded peer auto TLS assets	{"address": "127.0.0.1:19027", "peer-cert-path": "/tmp/etcd-functional-1/etcd.data/fixtures/peer/cert.pem", "peer-cert-length": 725, "peer-key-path": "/tmp/etcd-functional-1/etcd.data/fixtures/peer/key.pem", "peer-key-length": 365}
2021-08-10T21:17:19.615+0530	INFO	agent	agent/handler.go:430	loading client TLS assets	{"address": "127.0.0.1:39027", "dir": "/tmp/etcd-functional-3/etcd.data/fixtures/client", "endpoint": "127.0.0.1:3379"}
2021-08-10T21:17:19.615+0530	INFO	agent	agent/handler.go:430	loading client TLS assets	{"address": "127.0.0.1:19027", "dir": "/tmp/etcd-functional-1/etcd.data/fixtures/client", "endpoint": "127.0.0.1:1379"}
2021-08-10T21:17:19.615+0530	INFO	agent	agent/handler.go:430	loading client TLS assets	{"address": "127.0.0.1:29027", "dir": "/tmp/etcd-functional-2/etcd.data/fixtures/client", "endpoint": "127.0.0.1:2379"}
2021-08-10T21:17:19.616+0530	INFO	agent	agent/handler.go:456	loaded client TLS assets	{"address": "127.0.0.1:19027", "client-cert-path": "/tmp/etcd-functional-1/etcd.data/fixtures/client/cert.pem", "client-cert-length": 725, "client-key-path": "/tmp/etcd-functional-1/etcd.data/fixtures/client/key.pem", "client-key-length": 365}
2021-08-10T21:17:19.616+0530	INFO	agent	agent/handler.go:41	handler success	{"address": "127.0.0.1:19027", "operation": "INITIAL_START_ETCD"}
2021-08-10T21:17:19.616+0530	INFO	agent	agent/handler.go:456	loaded client TLS assets	{"address": "127.0.0.1:39027", "client-cert-path": "/tmp/etcd-functional-3/etcd.data/fixtures/client/cert.pem", "client-cert-length": 725, "client-key-path": "/tmp/etcd-functional-3/etcd.data/fixtures/client/key.pem", "client-key-length": 365}
2021-08-10T21:17:19.616+0530	INFO	agent	agent/handler.go:456	loaded client TLS assets	{"address": "127.0.0.1:29027", "client-cert-path": "/tmp/etcd-functional-2/etcd.data/fixtures/client/cert.pem", "client-cert-length": 725, "client-key-path": "/tmp/etcd-functional-2/etcd.data/fixtures/client/key.pem", "client-key-length": 365}
2021-08-10T21:17:19.616+0530	INFO	agent	agent/handler.go:41	handler success	{"address": "127.0.0.1:39027", "operation": "INITIAL_START_ETCD"}
2021-08-10T21:17:19.616+0530	INFO	agent	agent/handler.go:41	handler success	{"address": "127.0.0.1:29027", "operation": "INITIAL_START_ETCD"}
    logger.go:130: 2021-08-10T21:17:19.617+0530	INFO	tester	received response	{"operation": "INITIAL_START_ETCD", "from": "127.0.0.1:2379", "success": true, "status": "start etcd PASS"}
    logger.go:130: 2021-08-10T21:17:19.618+0530	INFO	tester	received response	{"operation": "INITIAL_START_ETCD", "from": "127.0.0.1:3379", "success": true, "status": "start etcd PASS"}
    logger.go:130: 2021-08-10T21:17:19.617+0530	INFO	tester	received response	{"operation": "INITIAL_START_ETCD", "from": "127.0.0.1:1379", "success": true, "status": "start etcd PASS"}
    logger.go:130: 2021-08-10T21:17:19.620+0530	INFO	tester	saved client cert file	{"path": "/tmp/etcd-tester-data/s3/fixtures/client/cert.pem"}
    logger.go:130: 2021-08-10T21:17:19.620+0530	INFO	tester	saved client cert file	{"path": "/tmp/etcd-tester-data/s2/fixtures/client/cert.pem"}
    logger.go:130: 2021-08-10T21:17:19.620+0530	INFO	tester	saved client cert file	{"path": "/tmp/etcd-tester-data/s1/fixtures/client/cert.pem"}
    logger.go:130: 2021-08-10T21:17:19.620+0530	INFO	tester	saved client key file	{"path": "/tmp/etcd-tester-data/s3/fixtures/client/key.pem"}
    logger.go:130: 2021-08-10T21:17:19.620+0530	INFO	tester	saved client key file	{"path": "/tmp/etcd-tester-data/s2/fixtures/client/key.pem"}
    logger.go:130: 2021-08-10T21:17:19.620+0530	INFO	tester	saved client key file	{"path": "/tmp/etcd-tester-data/s1/fixtures/client/key.pem"}
    etcd_tester_test.go:47: wait health after bootstrap
    logger.go:130: 2021-08-10T21:17:24.634+0530	WARN	tester	health check FAIL	{"retries": 0, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:30.650+0530	WARN	tester	health check FAIL	{"retries": 1, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:36.662+0530	WARN	tester	health check FAIL	{"retries": 2, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:42.676+0530	WARN	tester	health check FAIL	{"retries": 3, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:48.690+0530	WARN	tester	health check FAIL	{"retries": 4, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:54.709+0530	WARN	tester	health check FAIL	{"retries": 5, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:00.726+0530	WARN	tester	health check FAIL	{"retries": 6, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:06.744+0530	WARN	tester	health check FAIL	{"retries": 7, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:12.759+0530	WARN	tester	health check FAIL	{"retries": 8, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:18.776+0530	WARN	tester	health check FAIL	{"retries": 9, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:24.793+0530	WARN	tester	health check FAIL	{"retries": 10, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:30.810+0530	WARN	tester	health check FAIL	{"retries": 11, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:36.822+0530	WARN	tester	health check FAIL	{"retries": 12, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:42.842+0530	WARN	tester	health check FAIL	{"retries": 13, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:48.857+0530	WARN	tester	health check FAIL	{"retries": 14, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:54.876+0530	WARN	tester	health check FAIL	{"retries": 15, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:00.884+0530	WARN	tester	health check FAIL	{"retries": 16, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:06.900+0530	WARN	tester	health check FAIL	{"retries": 17, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:12.917+0530	WARN	tester	health check FAIL	{"retries": 18, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:18.925+0530	WARN	tester	health check FAIL	{"retries": 19, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:24.943+0530	WARN	tester	health check FAIL	{"retries": 20, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:30.959+0530	WARN	tester	health check FAIL	{"retries": 21, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:36.976+0530	WARN	tester	health check FAIL	{"retries": 22, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:42.991+0530	WARN	tester	health check FAIL	{"retries": 23, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:49.009+0530	WARN	tester	health check FAIL	{"retries": 24, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:55.026+0530	WARN	tester	health check FAIL	{"retries": 25, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:01.043+0530	WARN	tester	health check FAIL	{"retries": 26, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:07.059+0530	WARN	tester	health check FAIL	{"retries": 27, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:13.076+0530	WARN	tester	health check FAIL	{"retries": 28, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:19.089+0530	WARN	tester	health check FAIL	{"retries": 29, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:25.108+0530	WARN	tester	health check FAIL	{"retries": 30, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:31.124+0530	WARN	tester	health check FAIL	{"retries": 31, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:37.139+0530	WARN	tester	health check FAIL	{"retries": 32, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:43.155+0530	WARN	tester	health check FAIL	{"retries": 33, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:49.173+0530	WARN	tester	health check FAIL	{"retries": 34, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:55.191+0530	WARN	tester	health check FAIL	{"retries": 35, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:01.209+0530	WARN	tester	health check FAIL	{"retries": 36, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:07.224+0530	WARN	tester	health check FAIL	{"retries": 37, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:13.242+0530	WARN	tester	health check FAIL	{"retries": 38, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:19.254+0530	WARN	tester	health check FAIL	{"retries": 39, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:25.272+0530	WARN	tester	health check FAIL	{"retries": 40, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:31.287+0530	WARN	tester	health check FAIL	{"retries": 41, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:37.303+0530	WARN	tester	health check FAIL	{"retries": 42, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:43.321+0530	WARN	tester	health check FAIL	{"retries": 43, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:49.332+0530	WARN	tester	health check FAIL	{"retries": 44, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:55.351+0530	WARN	tester	health check FAIL	{"retries": 45, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:01.370+0530	WARN	tester	health check FAIL	{"retries": 46, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:07.388+0530	WARN	tester	health check FAIL	{"retries": 47, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:13.406+0530	WARN	tester	health check FAIL	{"retries": 48, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:19.420+0530	WARN	tester	health check FAIL	{"retries": 49, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:25.431+0530	WARN	tester	health check FAIL	{"retries": 50, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:31.450+0530	WARN	tester	health check FAIL	{"retries": 51, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:37.471+0530	WARN	tester	health check FAIL	{"retries": 52, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:43.490+0530	WARN	tester	health check FAIL	{"retries": 53, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:49.505+0530	WARN	tester	health check FAIL	{"retries": 54, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:55.520+0530	WARN	tester	health check FAIL	{"retries": 55, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:23:01.537+0530	WARN	tester	health check FAIL	{"retries": 56, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:23:07.555+0530	WARN	tester	health check FAIL	{"retries": 57, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:23:13.571+0530	WARN	tester	health check FAIL	{"retries": 58, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:23:19.588+0530	WARN	tester	health check FAIL	{"retries": 59, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    etcd_tester_test.go:50: WaitHealth failed {error 26 0  context deadline exceeded ("127.0.0.1:1379")}
    logger.go:130: 2021-08-10T21:23:20.589+0530	INFO	tester	sent request	{"operation": "SIGQUIT_ETCD_AND_REMOVE_DATA_AND_STOP_AGENT", "to": "127.0.0.1:3379"}
    logger.go:130: 2021-08-10T21:23:20.589+0530	INFO	tester	sent request	{"operation": "SIGQUIT_ETCD_AND_REMOVE_DATA_AND_STOP_AGENT", "to": "127.0.0.1:1379"}
    logger.go:130: 2021-08-10T21:23:20.589+0530	INFO	tester	sent request	{"operation": "SIGQUIT_ETCD_AND_REMOVE_DATA_AND_STOP_AGENT", "to": "127.0.0.1:2379"}
2021-08-10T21:23:20.589+0530	INFO	agent	proxy/server.go:646	closed proxy listener	{"address": "127.0.0.1:39027", "from": "tcp://127.0.0.1:3381", "to": "tcp://127.0.0.1:3380"}
2021-08-10T21:23:20.589+0530	INFO	agent	proxy/server.go:646	closed proxy listener	{"address": "127.0.0.1:19027", "from": "tcp://127.0.0.1:1381", "to": "tcp://127.0.0.1:1380"}
2021-08-10T21:23:20.589+0530	INFO	agent	proxy/server.go:646	closed proxy listener	{"address": "127.0.0.1:29027", "from": "tcp://127.0.0.1:2381", "to": "tcp://127.0.0.1:2380"}
2021-08-10T21:23:21.590+0530	INFO	agent	agent/handler.go:297	closed proxy	{"address": "127.0.0.1:39027", "port": 3381, "from": "tcp://127.0.0.1:3381", "to": "tcp://127.0.0.1:3380"}
2021-08-10T21:23:21.590+0530	INFO	agent	agent/handler.go:170	stopping etcd command	{"address": "127.0.0.1:39027", "command-path": "./bin/etcd", "signal": "quit"}
2021-08-10T21:23:21.590+0530	INFO	agent	agent/handler.go:297	closed proxy	{"address": "127.0.0.1:29027", "port": 2381, "from": "tcp://127.0.0.1:2381", "to": "tcp://127.0.0.1:2380"}
2021-08-10T21:23:21.590+0530	INFO	agent	agent/handler.go:297	closed proxy	{"address": "127.0.0.1:19027", "port": 1381, "from": "tcp://127.0.0.1:1381", "to": "tcp://127.0.0.1:1380"}
2021-08-10T21:23:21.590+0530	INFO	agent	agent/handler.go:170	stopping etcd command	{"address": "127.0.0.1:29027", "command-path": "./bin/etcd", "signal": "quit"}
2021-08-10T21:23:21.590+0530	INFO	agent	agent/handler.go:170	stopping etcd command	{"address": "127.0.0.1:19027", "command-path": "./bin/etcd", "signal": "quit"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/handler.go:700	removed base directory	{"address": "127.0.0.1:29027", "dir": "/tmp/etcd-functional-2"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/server.go:123	gRPC server stopping	{"address": "127.0.0.1:29027", "address": "127.0.0.1:29027"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/handler.go:700	removed base directory	{"address": "127.0.0.1:19027", "dir": "/tmp/etcd-functional-1"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/handler.go:700	removed base directory	{"address": "127.0.0.1:39027", "dir": "/tmp/etcd-functional-3"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/server.go:125	gRPC server stopped	{"address": "127.0.0.1:29027", "address": "127.0.0.1:29027"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/server.go:123	gRPC server stopping	{"address": "127.0.0.1:19027", "address": "127.0.0.1:19027"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/server.go:123	gRPC server stopping	{"address": "127.0.0.1:39027", "address": "127.0.0.1:39027"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/handler.go:41	handler success	{"address": "127.0.0.1:29027", "operation": "SIGQUIT_ETCD_AND_REMOVE_DATA_AND_STOP_AGENT"}
2021-08-10T21:23:21.615+0530	WARN	agent	agent/server.go:112	gRPC server returned with error	{"address": "127.0.0.1:29027", "address": "127.0.0.1:29027"}
go.etcd.io/etcd/tests/v3/functional/agent.(*Server).StartServe
	/Users/karuppiahn/projects/github.com/etcd-io/etcd/tests/functional/agent/server.go:112
main.main
	/Users/karuppiahn/projects/github.com/etcd-io/etcd/tests/functional/cmd/etcd-agent/main.go:46
runtime.main
	/usr/local/Cellar/go/1.16.6/libexec/src/runtime/proc.go:225
2021-08-10T21:23:21.615+0530	INFO	agent	etcd-agent/main.go:47	agent exiting	{"address": "127.0.0.1:29027"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/server.go:125	gRPC server stopped	{"address": "127.0.0.1:39027", "address": "127.0.0.1:39027"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/server.go:125	gRPC server stopped	{"address": "127.0.0.1:19027", "address": "127.0.0.1:19027"}
2021-08-10T21:23:21.615+0530	INFO	agent	agent/handler.go:41	handler success	{"address": "127.0.0.1:39027", "operation": "SIGQUIT_ETCD_AND_REMOVE_DATA_AND_STOP_AGENT"}
    logger.go:130: 2021-08-10T21:23:21.615+0530	INFO	tester	received empty response	{"operation": "SIGQUIT_ETCD_AND_REMOVE_DATA_AND_STOP_AGENT", "from": "127.0.0.1:2379", "error": "rpc error: code = Unavailable desc = error reading from server: EOF"}
2021-08-10T21:23:21.615+0530	WARN	agent	agent/server.go:112	gRPC server returned with error	{"address": "127.0.0.1:39027", "address": "127.0.0.1:39027"}
go.etcd.io/etcd/tests/v3/functional/agent.(*Server).StartServe
	/Users/karuppiahn/projects/github.com/etcd-io/etcd/tests/functional/agent/server.go:112
main.main
	/Users/karuppiahn/projects/github.com/etcd-io/etcd/tests/functional/cmd/etcd-agent/main.go:46
runtime.main
	/usr/local/Cellar/go/1.16.6/libexec/src/runtime/proc.go:225
2021-08-10T21:23:21.615+0530	INFO	agent	agent/handler.go:41	handler success	{"address"2021-08-10T21:23:21.615+0530	INFO	agent	etcd-agent/main.go:47	agent exiting	{"address": "127.0.0.1:39027"}
: "127.0.0.1:19027", "operation": "SIGQUIT_ETCD_AND_REMOVE_DATA_AND_STOP_AGENT"}
2021-08-10T21:23:21.615+0530	WARN	agent	agent/server.go:112	gRPC server returned with error	{"address": "127.0.0.1:19027", "address": "127.0.0.1:19027"}
go.etcd.io/etcd/tests/v3/functional/agent.(*Server).StartServe
	/Users/karuppiahn/projects/github.com/etcd-io/etcd/tests/functional/agent/server.go:112
main.main
	/Users/karuppiahn/projects/github.com/etcd-io/etcd/tests/functional/cmd/etcd-agent/main.go:46
runtime.main
	/usr/local/Cellar/go/1.16.6/libexec/src/runtime/proc.go:225
    logger.go:130: 2021-08-10T21:23:21.615+0530	INFO	tester	received empty response	{"operation": "SIGQUIT_ETCD_AND_REMOVE_DATA_AND_STOP_AGENT", "from": "127.0.0.1:3379", "error": "rpc error: code = Unavailable desc = error reading from server: EOF"}
2021-08-10T21:23:21.615+0530	INFO	agent	etcd-agent/main.go:47	agent exiting	{"address": "127.0.0.1:19027"}
    logger.go:130: 2021-08-10T21:23:21.615+0530	INFO	tester	received empty response	{"operation": "SIGQUIT_ETCD_AND_REMOVE_DATA_AND_STOP_AGENT", "from": "127.0.0.1:1379", "error": "rpc error: code = Unavailable desc = error reading from server: EOF"}
    logger.go:130: 2021-08-10T21:23:21.615+0530	WARN	tester	destroying etcd/agents FAIL	{"error": "rpc error: code = Unavailable desc = error reading from server: EOF, rpc error: code = Unavailable desc = error reading from server: EOF, rpc error: code = Unavailable desc = error reading from server: EOF"}
    logger.go:130: 2021-08-10T21:23:21.615+0530	INFO	tester	closed connection to agent	{"agent-address": "127.0.0.1:19027"}
    logger.go:130: 2021-08-10T21:23:21.615+0530	INFO	tester	closed connection to agent	{"agent-address": "127.0.0.1:29027"}
    logger.go:130: 2021-08-10T21:23:21.616+0530	INFO	tester	closed connection to agent	{"agent-address": "127.0.0.1:39027"}
    logger.go:130: 2021-08-10T21:23:21.616+0530	INFO	tester	tester HTTP server returned	{"tester-address": "127.0.0.1:9028", "error": "http: Server closed"}
    logger.go:130: 2021-08-10T21:23:21.617+0530	INFO	tester	closed tester HTTP server	{"tester-address": "127.0.0.1:9028"}
--- FAIL: TestFunctional (371.03s)
FAIL
FAIL: (code:1):
  % './bin/etcd-tester' '--config' './tests/functional/functional.yaml' '-test.v'
ETCD_TESTER_EXIT_CODE: 1
etcd $ 
```

Some related files that I noticed

`tests/functional/build.sh`

`tests/functional/cmd/etcd-tester/etcd_tester_test.go`

`tests/functional/functional.yaml`

Of all this, I missed the most important one - `test.sh`, which is what the GitHub Actions Workflow runs, but I overlooked that and started looking into `tests/functional/build.sh` when I saw that in the logs

But when I couldn't understand what's going on, I started searching the logs I saw and noticed that `functional test START!` is actually present in `test.sh` and it comes up in the logs :)

Now, we have a failure in this functional test! It says `--- FAIL: TestFunctional (371.03s)`

and it also says 

```bash
FAIL: (code:1):
  % './bin/etcd-tester' '--config' './tests/functional/functional.yaml' '-test.v'
```

I can see the log line `WaitHealth failed` in the logs which I just noticed in the code

`tests/functional/cmd/etcd-tester/etcd_tester_test.go:50`

and that's what fails the test! :)

So, we need to understand what went wrong with `err = clus.WaitHealth()` in `tests/functional/cmd/etcd-tester/etcd_tester_test.go:48` and find out why it errored out!!

The error we now currently see is `{error 26 0  context deadline exceeded ("127.0.0.1:1379")}`

And I can see the same `context deadline exceeded` error in the logs in other parts too previously, like this

```bash
etcd_tester_test.go:47: wait health after bootstrap
    logger.go:130: 2021-08-10T21:17:24.634+0530	WARN	tester	health check FAIL	{"retries": 0, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:30.650+0530	WARN	tester	health check FAIL	{"retries": 1, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:36.662+0530	WARN	tester	health check FAIL	{"retries": 2, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:42.676+0530	WARN	tester	health check FAIL	{"retries": 3, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:48.690+0530	WARN	tester	health check FAIL	{"retries": 4, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:17:54.709+0530	WARN	tester	health check FAIL	{"retries": 5, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:00.726+0530	WARN	tester	health check FAIL	{"retries": 6, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:06.744+0530	WARN	tester	health check FAIL	{"retries": 7, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:12.759+0530	WARN	tester	health check FAIL	{"retries": 8, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:18.776+0530	WARN	tester	health check FAIL	{"retries": 9, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:24.793+0530	WARN	tester	health check FAIL	{"retries": 10, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:30.810+0530	WARN	tester	health check FAIL	{"retries": 11, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:36.822+0530	WARN	tester	health check FAIL	{"retries": 12, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:42.842+0530	WARN	tester	health check FAIL	{"retries": 13, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:48.857+0530	WARN	tester	health check FAIL	{"retries": 14, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:18:54.876+0530	WARN	tester	health check FAIL	{"retries": 15, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:00.884+0530	WARN	tester	health check FAIL	{"retries": 16, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:06.900+0530	WARN	tester	health check FAIL	{"retries": 17, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:12.917+0530	WARN	tester	health check FAIL	{"retries": 18, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:18.925+0530	WARN	tester	health check FAIL	{"retries": 19, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:24.943+0530	WARN	tester	health check FAIL	{"retries": 20, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:30.959+0530	WARN	tester	health check FAIL	{"retries": 21, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:36.976+0530	WARN	tester	health check FAIL	{"retries": 22, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:42.991+0530	WARN	tester	health check FAIL	{"retries": 23, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:49.009+0530	WARN	tester	health check FAIL	{"retries": 24, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:19:55.026+0530	WARN	tester	health check FAIL	{"retries": 25, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:01.043+0530	WARN	tester	health check FAIL	{"retries": 26, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:07.059+0530	WARN	tester	health check FAIL	{"retries": 27, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:13.076+0530	WARN	tester	health check FAIL	{"retries": 28, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:19.089+0530	WARN	tester	health check FAIL	{"retries": 29, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:25.108+0530	WARN	tester	health check FAIL	{"retries": 30, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:31.124+0530	WARN	tester	health check FAIL	{"retries": 31, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:37.139+0530	WARN	tester	health check FAIL	{"retries": 32, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:43.155+0530	WARN	tester	health check FAIL	{"retries": 33, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:49.173+0530	WARN	tester	health check FAIL	{"retries": 34, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:20:55.191+0530	WARN	tester	health check FAIL	{"retries": 35, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:01.209+0530	WARN	tester	health check FAIL	{"retries": 36, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:07.224+0530	WARN	tester	health check FAIL	{"retries": 37, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:13.242+0530	WARN	tester	health check FAIL	{"retries": 38, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:19.254+0530	WARN	tester	health check FAIL	{"retries": 39, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:25.272+0530	WARN	tester	health check FAIL	{"retries": 40, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:31.287+0530	WARN	tester	health check FAIL	{"retries": 41, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:37.303+0530	WARN	tester	health check FAIL	{"retries": 42, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:43.321+0530	WARN	tester	health check FAIL	{"retries": 43, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:49.332+0530	WARN	tester	health check FAIL	{"retries": 44, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:21:55.351+0530	WARN	tester	health check FAIL	{"retries": 45, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:01.370+0530	WARN	tester	health check FAIL	{"retries": 46, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:07.388+0530	WARN	tester	health check FAIL	{"retries": 47, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:13.406+0530	WARN	tester	health check FAIL	{"retries": 48, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:19.420+0530	WARN	tester	health check FAIL	{"retries": 49, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:25.431+0530	WARN	tester	health check FAIL	{"retries": 50, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:31.450+0530	WARN	tester	health check FAIL	{"retries": 51, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:37.471+0530	WARN	tester	health check FAIL	{"retries": 52, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:43.490+0530	WARN	tester	health check FAIL	{"retries": 53, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:49.505+0530	WARN	tester	health check FAIL	{"retries": 54, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:22:55.520+0530	WARN	tester	health check FAIL	{"retries": 55, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:23:01.537+0530	WARN	tester	health check FAIL	{"retries": 56, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:23:07.555+0530	WARN	tester	health check FAIL	{"retries": 57, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:23:13.571+0530	WARN	tester	health check FAIL	{"retries": 58, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
    logger.go:130: 2021-08-10T21:23:19.588+0530	WARN	tester	health check FAIL	{"retries": 59, "endpoint": "127.0.0.1:1379", "error": "context deadline exceeded (\"127.0.0.1:1379\")"}
```

That's a lot of them. It tried 60 times!! Wow. From 0 to 59. Hmm


