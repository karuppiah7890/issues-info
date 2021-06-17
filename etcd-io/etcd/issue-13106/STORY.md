# Story

https://github.com/etcd-io/etcd/issues/13106

```markdown
Is it possible to put an etcd cluster just behind a haproxy instance with http frontends ?

Or are there special requirement ?

I have tried to lookup some haproxy examples for etcd and most where not very recent but showed http as frontend. I was wondering if also can do simply tcp mode.

Maybe someone has an example as well that could be useful here.
```

https://duckduckgo.com/?t=ffab&q=haproxy&ia=web

https://www.haproxy.org/

https://www.haproxy.org/#down

That's source code though, hmm

https://duckduckgo.com/?q=install+haproxy&t=ffab&ia=web

```bash
$ brew info haproxy
haproxy: stable 2.4.0 (bottled)
Reliable, high performance TCP/HTTP load balancer
https://www.haproxy.org/
Not installed
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/haproxy.rb
License: GPL-2.0-or-later with openvpn-openssl-exception
==> Dependencies
Required: openssl@1.1 ✔, pcre ✘
==> Caveats
To have launchd start haproxy now and restart at login:
  brew services start haproxy
Or, if you don't want/need a background service you can just run:
  haproxy -f /usr/local/etc/haproxy.cfg
==> Analytics
install: 1,274 (30 days), 4,997 (90 days), 19,424 (365 days)
install-on-request: 1,274 (30 days), 4,989 (90 days), 19,131 (365 days)
build-error: 0 (30 days)
```

```bash
$ brew install haproxy
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 3 taps (homebrew/core, homebrew/cask and vmware-tanzu/carvel).
==> New Formulae
rpg-cli
==> Updated Formulae
Updated 126 formulae.
==> Updated Casks
Updated 82 casks.
==> Deleted Casks
mapillary-uploader

==> Downloading https://ghcr.io/v2/homebrew/core/pcre/manifests/8.44
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/pcre/blobs/sha256:a67dd6141e117f849bbb7d3bde92ffb6485921939c1d64e39a
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:a67dd6141e117f849bbb7d3bde92ffb6
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/haproxy/manifests/2.4.0
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/haproxy/blobs/sha256:4eea98c884ffbb65ad1765a69046d8885e7d50f7cc202a2
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:4eea98c884ffbb65ad1765a69046d888
######################################################################## 100.0%
==> Installing dependencies for haproxy: pcre
==> Installing haproxy dependency: pcre
==> Pouring pcre--8.44.big_sur.bottle.tar.gz
🍺  /usr/local/Cellar/pcre/8.44: 204 files, 5.8MB
==> Installing haproxy
==> Pouring haproxy--2.4.0.big_sur.bottle.tar.gz
==> Caveats
To have launchd start haproxy now and restart at login:
  brew services start haproxy
Or, if you don't want/need a background service you can just run:
  haproxy -f /usr/local/etc/haproxy.cfg
==> Summary
🍺  /usr/local/Cellar/haproxy/2.4.0: 8 files, 3.0MB
==> Caveats
==> haproxy
To have launchd start haproxy now and restart at login:
  brew services start haproxy
Or, if you don't want/need a background service you can just run:
  haproxy -f /usr/local/etc/haproxy.cfg
```

```bash
$ haproxy -f /usr/local/etc/haproxy.cfg
[NOTICE]   (30417) : haproxy version is 2.4.0-6cbbecf
[ALERT]    (30417) : Cannot open configuration file/directory /usr/local/etc/haproxy.cfg : No such file or directory
```

```bash
$ haproxy 
HAProxy version 2.4.0-6cbbecf 2021/05/14 - https://haproxy.org/
Status: long-term supported branch - will stop receiving fixes around Q2 2026.
Known bugs: http://www.haproxy.org/bugs/bugs-2.4.0.html
Running on: Darwin 20.5.0 Darwin Kernel Version 20.5.0: Sat May  8 05:10:33 PDT 2021; root:xnu-7195.121.3~9/RELEASE_X86_64 x86_64
Usage : haproxy [-f <cfgfile|cfgdir>]* [ -vdVD ] [ -n <maxconn> ] [ -N <maxpconn> ]
        [ -p <pidfile> ] [ -m <max megs> ] [ -C <dir> ] [-- <cfgfile>*]
        -v displays version ; -vv shows known build options.
        -d enters debug mode ; -db only disables background mode.
        -dM[<byte>] poisons memory with <byte> (defaults to 0x50)
        -V enters verbose mode (disables quiet mode)
        -D goes daemon ; -C changes to <dir> before loading files.
        -W master-worker mode.
        -q quiet mode : don't display messages
        -c check mode : only check config files and exit
        -n sets the maximum total # of connections (uses ulimit -n)
        -m limits the usable amount of memory (in MB)
        -N sets the default, per-proxy maximum # of connections (0)
        -L set local peer name (default to hostname)
        -p writes pids of all children to this file
        -dk disables kqueue() usage even when available
        -dp disables poll() usage even when available
        -dR disables SO_REUSEPORT usage
        -dr ignores server address resolution failures
        -dV disables SSL verify on servers side
        -dW fails if any warning is emitted
        -dD diagnostic mode : warn about suspicious configuration statements
        -sf/-st [pid ]* finishes/terminates old pids.
        -x <unix_socket> get listening sockets from a unix socket
        -S <bind>[,<bind options>...] new master CLI

```

https://duckduckgo.com/?t=ffab&q=running+haproxy&ia=web

https://hub.docker.com/_/haproxy/

https://cbonte.github.io/haproxy-dconv/

https://cbonte.github.io/haproxy-dconv/2.4/intro.html

https://cbonte.github.io/haproxy-dconv/2.4/intro.html#2

https://cbonte.github.io/haproxy-dconv/2.4/intro.html#3.1

Examples - http://git.haproxy.org/?p=haproxy-2.3.git;a=tree;f=examples

https://duckduckgo.com/?t=ffab&q=haproxy+getting+started&ia=web&iai=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DJjXUH0VORnE&pn=1

https://www.youtube.com/watch?v=JjXUH0VORnE

We need a HAProxy Config file of course, to mention frontend (port/socket to listen at) and the
backends, which HAProxy loadbalances

---

```bash
$ cat haproxy.cfg 
frontend f
    mode http
    
$ haproxy -f haproxy.cfg 
[WARNING]  (44680) : config : frontend 'f' has no 'bind' directive. Please declare it as a backend if this was intended.
[WARNING]  (44680) : config : missing timeouts for frontend 'f'.
   | While not properly invalid, you will certainly encounter various problems
   | with such a configuration. To fix this, please ensure that all following
   | timeouts are set to a non-zero value: 'client', 'connect', 'server'.
[NOTICE]   (44680) : haproxy version is 2.4.0-6cbbecf
[ALERT]    (44680) : [haproxy.main()] No enabled listener found (check for 'bind' directives) ! Exiting.
```

```bash
$ cat haproxy.cfg 
frontend f
    mode http
    bind: *:9000    

$ haproxy -f haproxy.cfg 
[NOTICE]   (44795) : haproxy version is 2.4.0-6cbbecf
[ALERT]    (44795) : parsing [haproxy.cfg:3] : unknown keyword 'bind:' in 'frontend' section; did you mean 'bind' maybe ?
[ALERT]    (44795) : Error(s) found in configuration file : haproxy.cfg
[ALERT]    (44795) : Fatal errors found in configuration.
```

```bash
$ cat haproxy.cfg 
frontend f
    mode http
    bind *:9000    
$ haproxy -f haproxy.cfg 
[WARNING]  (46162) : config : missing timeouts for frontend 'f'.
   | While not properly invalid, you will certainly encounter various problems
   | with such a configuration. To fix this, please ensure that all following
   | timeouts are set to a non-zero value: 'client', 'connect', 'server'.
^C
```

That works!! :)

```bash
$ etcd
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 13:45:44.579722 I | etcdmain: etcd Version: 3.4.16
2021-06-17 13:45:44.579848 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 13:45:44.579851 I | etcdmain: Go Version: go1.16.3
2021-06-17 13:45:44.579854 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 13:45:44.579858 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 13:45:44.579865 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 13:45:44.579870 W | etcdmain: no data-dir provided, using default data-dir ./default.etcd
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 13:45:44.581037 I | embed: name = default
2021-06-17 13:45:44.581046 I | embed: data dir = default.etcd
2021-06-17 13:45:44.581050 I | embed: member dir = default.etcd/member
2021-06-17 13:45:44.581054 I | embed: heartbeat = 100ms
2021-06-17 13:45:44.581057 I | embed: election = 1000ms
2021-06-17 13:45:44.581059 I | embed: snapshot count = 100000
2021-06-17 13:45:44.581089 I | embed: advertise client URLs = http://localhost:2379
2021-06-17 13:45:44.666123 I | etcdserver: starting member 8e9e05c52164694d in cluster cdf818194e3a8c32
raft2021/06/17 13:45:44 INFO: 8e9e05c52164694d switched to configuration voters=()
raft2021/06/17 13:45:44 INFO: 8e9e05c52164694d became follower at term 0
raft2021/06/17 13:45:44 INFO: newRaft 8e9e05c52164694d [peers: [], term: 0, commit: 0, applied: 0, lastindex: 0, lastterm: 0]
raft2021/06/17 13:45:44 INFO: 8e9e05c52164694d became follower at term 1
raft2021/06/17 13:45:44 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 13:45:44.740819 W | auth: simple token is not cryptographically signed
2021-06-17 13:45:44.863491 I | etcdserver: starting server... [version: 3.4.16, cluster version: to_be_decided]
2021-06-17 13:45:44.863690 E | etcdserver: cannot monitor file descriptor usage (cannot get FDUsage on darwin)
2021-06-17 13:45:44.863722 I | etcdserver: 8e9e05c52164694d as single-node; fast-forwarding 9 ticks (election ticks 10)
raft2021/06/17 13:45:44 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 13:45:44.865409 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster cdf818194e3a8c32
2021-06-17 13:45:44.866792 I | embed: listening for peers on 127.0.0.1:2380
raft2021/06/17 13:45:45 INFO: 8e9e05c52164694d is starting a new election at term 1
raft2021/06/17 13:45:45 INFO: 8e9e05c52164694d became candidate at term 2
raft2021/06/17 13:45:45 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 2
raft2021/06/17 13:45:45 INFO: 8e9e05c52164694d became leader at term 2
raft2021/06/17 13:45:45 INFO: raft.node: 8e9e05c52164694d elected leader 8e9e05c52164694d at term 2
2021-06-17 13:45:45.571336 I | etcdserver: setting up the initial cluster version to 3.4
2021-06-17 13:45:45.591045 N | etcdserver/membership: set the initial cluster version to 3.4
2021-06-17 13:45:45.591079 I | etcdserver: published {Name:default ClientURLs:[http://localhost:2379]} to cluster cdf818194e3a8c32
2021-06-17 13:45:45.591098 I | etcdserver/api: enabled capabilities for version 3.4
2021-06-17 13:45:45.591108 I | embed: ready to serve client requests
2021-06-17 13:45:45.591744 N | embed: serving insecure client requests on 127.0.0.1:2379, this is strongly discouraged!
^C2021-06-17 13:45:53.134632 N | pkg/osutil: received interrupt signal, shutting down...
2021-06-17 13:45:53.134753 I | etcdserver: skipped leadership transfer for single voting member cluster
```

```bash
$ etcd --help
Usage:

  etcd [flags]
    Start an etcd server.

  etcd --version
    Show the version of etcd.

  etcd -h | --help
    Show the help information about etcd.

  etcd --config-file
    Path to the server configuration file. Note that if a configuration file is provided, other command line flags and environment variables will be ignored.

  etcd gateway
    Run the stateless pass-through etcd TCP connection forwarding proxy.

  etcd grpc-proxy
    Run the stateless etcd v3 gRPC L7 reverse proxy.


Member:
  --name 'default'
    Human-readable name for this member.
  --data-dir '${name}.etcd'
    Path to the data directory.
  --wal-dir ''
    Path to the dedicated wal directory.
  --snapshot-count '100000'
    Number of committed transactions to trigger a snapshot to disk.
  --heartbeat-interval '100'
    Time (in milliseconds) of a heartbeat interval.
  --election-timeout '1000'
    Time (in milliseconds) for an election to timeout. See tuning documentation for details.
  --initial-election-tick-advance 'true'
    Whether to fast-forward initial election ticks on boot for faster election.
  --listen-peer-urls 'http://localhost:2380'
    List of URLs to listen on for peer traffic.
  --listen-client-urls 'http://localhost:2379'
    List of URLs to listen on for client traffic.
  --max-snapshots '5'
    Maximum number of snapshot files to retain (0 is unlimited).
  --max-wals '5'
    Maximum number of wal files to retain (0 is unlimited).
  --quota-backend-bytes '0'
    Raise alarms when backend size exceeds the given quota (0 defaults to low space quota).
  --backend-batch-interval ''
    BackendBatchInterval is the maximum time before commit the backend transaction.
  --backend-batch-limit '0'
    BackendBatchLimit is the maximum operations before commit the backend transaction.
  --max-txn-ops '128'
    Maximum number of operations permitted in a transaction.
  --max-request-bytes '1572864'
    Maximum client request size in bytes the server will accept.
  --grpc-keepalive-min-time '5s'
    Minimum duration interval that a client should wait before pinging server.
  --grpc-keepalive-interval '2h'
    Frequency duration of server-to-client ping to check if a connection is alive (0 to disable).
  --grpc-keepalive-timeout '20s'
    Additional duration of wait before closing a non-responsive connection (0 to disable).

Clustering:
  --initial-advertise-peer-urls 'http://localhost:2380'
    List of this member's peer URLs to advertise to the rest of the cluster.
  --initial-cluster 'default=http://localhost:2380'
    Initial cluster configuration for bootstrapping.
  --initial-cluster-state 'new'
    Initial cluster state ('new' or 'existing').
  --initial-cluster-token 'etcd-cluster'
    Initial cluster token for the etcd cluster during bootstrap.
    Specifying this can protect you from unintended cross-cluster interaction when running multiple clusters.
  --advertise-client-urls 'http://localhost:2379'
    List of this member's client URLs to advertise to the public.
    The client URLs advertised should be accessible to machines that talk to etcd cluster. etcd client libraries parse these URLs to connect to the cluster.
  --discovery ''
    Discovery URL used to bootstrap the cluster.
  --discovery-fallback 'proxy'
    Expected behavior ('exit' or 'proxy') when discovery services fails.
    "proxy" supports v2 API only.
  --discovery-proxy ''
    HTTP proxy to use for traffic to discovery service.
  --discovery-srv ''
    DNS srv domain used to bootstrap the cluster.
  --discovery-srv-name ''
    Suffix to the dns srv name queried when bootstrapping.
  --strict-reconfig-check 'true'
    Reject reconfiguration requests that would cause quorum loss.
  --pre-vote 'false'
    Enable to run an additional Raft election phase.
  --auto-compaction-retention '0'
    Auto compaction retention length. 0 means disable auto compaction.
  --auto-compaction-mode 'periodic'
    Interpret 'auto-compaction-retention' one of: periodic|revision. 'periodic' for duration based retention, defaulting to hours if no time unit is provided (e.g. '5m'). 'revision' for revision number based retention.
  --enable-v2 'false'
    Accept etcd V2 client requests.

Security:
  --cert-file ''
    Path to the client server TLS cert file.
  --key-file ''
    Path to the client server TLS key file.
  --client-cert-auth 'false'
    Enable client cert authentication.
  --client-crl-file ''
    Path to the client certificate revocation list file.
  --client-cert-allowed-hostname ''
    Allowed TLS hostname for client cert authentication.
  --trusted-ca-file ''
    Path to the client server TLS trusted CA cert file.
  --auto-tls 'false'
    Client TLS using generated certificates.
  --peer-cert-file ''
    Path to the peer server TLS cert file.
  --peer-key-file ''
    Path to the peer server TLS key file.
  --peer-client-cert-auth 'false'
    Enable peer client cert authentication.
  --peer-trusted-ca-file ''
    Path to the peer server TLS trusted CA file.
  --peer-cert-allowed-cn ''
    Required CN for client certs connecting to the peer endpoint.
  --peer-cert-allowed-hostname ''
    Allowed TLS hostname for inter peer authentication.
  --peer-auto-tls 'false'
    Peer TLS using self-generated certificates if --peer-key-file and --peer-cert-file are not provided.
  --peer-crl-file ''
    Path to the peer certificate revocation list file.
  --cipher-suites ''
    Comma-separated list of supported TLS cipher suites between client/server and peers (empty will be auto-populated by Go).
  --cors '*'
    Comma-separated whitelist of origins for CORS, or cross-origin resource sharing, (empty or * means allow all).
  --host-whitelist '*'
    Acceptable hostnames from HTTP client requests, if server is not secure (empty or * means allow all).

Auth:
  --auth-token 'simple'
    Specify a v3 authentication token type and its options ('simple' or 'jwt').
  --bcrypt-cost 10
    Specify the cost / strength of the bcrypt algorithm for hashing auth passwords. Valid values are between 4 and 31.
  --auth-token-ttl 300
    Time (in seconds) of the auth-token-ttl.

Profiling and Monitoring:
  --enable-pprof 'false'
    Enable runtime profiling data via HTTP server. Address is at client URL + "/debug/pprof/"
  --metrics 'basic'
    Set level of detail for exported metrics, specify 'extensive' to include histogram metrics.
  --listen-metrics-urls ''
    List of URLs to listen on for the metrics and health endpoints.

Logging:
  --logger 'capnslog'
    Specify 'zap' for structured logging or 'capnslog'. [WARN] 'capnslog' will be deprecated in v3.5.
  --log-outputs 'default'
    Specify 'stdout' or 'stderr' to skip journald logging even when running under systemd, or list of comma separated output targets.
  --log-level 'info'
    Configures log level. Only supports debug, info, warn, error, panic, or fatal.

v2 Proxy (to be deprecated in v4):
  --proxy 'off'
    Proxy mode setting ('off', 'readonly' or 'on').
  --proxy-failure-wait 5000
    Time (in milliseconds) an endpoint will be held in a failed state.
  --proxy-refresh-interval 30000
    Time (in milliseconds) of the endpoints refresh interval.
  --proxy-dial-timeout 1000
    Time (in milliseconds) for a dial to timeout.
  --proxy-write-timeout 5000
    Time (in milliseconds) for a write to timeout.
  --proxy-read-timeout 0
    Time (in milliseconds) for a read to timeout.

Experimental feature:
  --experimental-initial-corrupt-check 'false'
    Enable to check data corruption before serving any client/peer traffic.
  --experimental-corrupt-check-time '0s'
    Duration of time between cluster corruption check passes.
  --experimental-enable-v2v3 ''
    Serve v2 requests through the v3 backend under a given prefix.
  --experimental-backend-bbolt-freelist-type 'array'
    ExperimentalBackendFreelistType specifies the type of freelist that boltdb backend uses(array and map are supported types).
  --experimental-enable-lease-checkpoint 'false'
    ExperimentalEnableLeaseCheckpoint enables primary lessor to persist lease remainingTTL to prevent indefinite auto-renewal of long lived leases.
  --experimental-compaction-batch-limit 1000
    ExperimentalCompactionBatchLimit sets the maximum revisions deleted in each compaction batch.
  --experimental-peer-skip-client-san-verification 'false'
    Skip verification of SAN field in client certificate for peer connections.
  --experimental-watch-progress-notify-interval '10m'
    Duration of periodical watch progress notification.
  --experimental-warning-apply-duration '100ms'
    Warning is generated if requests take more than this duration.

Unsafe feature:
  --force-new-cluster 'false'
    Force to create a new one-member cluster.

CAUTIOUS with unsafe flag! It may break the guarantees given by the consensus protocol!

TO BE DEPRECATED:

  --debug 'false'
    Enable debug-level logging for etcd. [WARN] Will be deprecated in v3.5. Use '--log-level=debug' instead.
  --log-package-levels ''
    Specify a particular log level for each etcd package (eg: 'etcdmain=CRITICAL,etcdserver=DEBUG').
```

```bash
$ etcd --name s1 --listen-peer-urls 'http://localhost:2380' --listen-client-urls 'http://localhost:2379' 
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 13:56:36.162181 E | etcdmain: error verifying flags, --advertise-client-urls is required when --listen-client-urls is set explicitly. See 'etcd --help'.
2021-06-17 13:56:36.162344 E | etcdmain: When listening on specific address(es), this etcd process must advertise accessible url(s) to each connected client.
```

```bash
$ etcd --name s1 --listen-peer-urls 'http://localhost:2380' --listen-client-urls 'http://localhost:2379' --advertise-client-urls 'http://localhost:2379' 
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 13:58:09.877063 I | etcdmain: etcd Version: 3.4.16
2021-06-17 13:58:09.877213 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 13:58:09.877218 I | etcdmain: Go Version: go1.16.3
2021-06-17 13:58:09.877222 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 13:58:09.877225 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 13:58:09.877236 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 13:58:09.877242 W | etcdmain: no data-dir provided, using default data-dir ./s1.etcd
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 13:58:09.878601 I | embed: name = s1
2021-06-17 13:58:09.878612 I | embed: data dir = s1.etcd
2021-06-17 13:58:09.878617 I | embed: member dir = s1.etcd/member
2021-06-17 13:58:09.878622 I | embed: heartbeat = 100ms
2021-06-17 13:58:09.878627 I | embed: election = 1000ms
2021-06-17 13:58:09.878630 I | embed: snapshot count = 100000
2021-06-17 13:58:09.878646 I | embed: advertise client URLs = http://localhost:2379
2021-06-17 13:58:09.963904 I | etcdserver: starting member 8e9e05c52164694d in cluster cdf818194e3a8c32
raft2021/06/17 13:58:09 INFO: 8e9e05c52164694d switched to configuration voters=()
raft2021/06/17 13:58:09 INFO: 8e9e05c52164694d became follower at term 0
raft2021/06/17 13:58:09 INFO: newRaft 8e9e05c52164694d [peers: [], term: 0, commit: 0, applied: 0, lastindex: 0, lastterm: 0]
raft2021/06/17 13:58:09 INFO: 8e9e05c52164694d became follower at term 1
raft2021/06/17 13:58:09 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 13:58:10.021946 W | auth: simple token is not cryptographically signed
2021-06-17 13:58:10.138074 I | etcdserver: starting server... [version: 3.4.16, cluster version: to_be_decided]
2021-06-17 13:58:10.138861 E | etcdserver: cannot monitor file descriptor usage (cannot get FDUsage on darwin)
2021-06-17 13:58:10.138987 I | etcdserver: 8e9e05c52164694d as single-node; fast-forwarding 9 ticks (election ticks 10)
raft2021/06/17 13:58:10 WARN: 8e9e05c52164694d cannot campaign at term 1 since there are still 1 pending configuration changes to apply
raft2021/06/17 13:58:10 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 13:58:10.140438 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster cdf818194e3a8c32
2021-06-17 13:58:10.141751 I | embed: listening for peers on 127.0.0.1:2380
raft2021/06/17 13:58:11 INFO: 8e9e05c52164694d is starting a new election at term 1
raft2021/06/17 13:58:11 INFO: 8e9e05c52164694d became candidate at term 2
raft2021/06/17 13:58:11 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 2
raft2021/06/17 13:58:11 INFO: 8e9e05c52164694d became leader at term 2
raft2021/06/17 13:58:11 INFO: raft.node: 8e9e05c52164694d elected leader 8e9e05c52164694d at term 2
2021-06-17 13:58:11.069666 I | etcdserver: setting up the initial cluster version to 3.4
2021-06-17 13:58:11.069784 I | embed: ready to serve client requests
2021-06-17 13:58:11.069838 I | etcdserver: published {Name:s1 ClientURLs:[http://localhost:2379]} to cluster cdf818194e3a8c32
2021-06-17 13:58:11.070771 N | embed: serving insecure client requests on 127.0.0.1:2379, this is strongly discouraged!
2021-06-17 13:58:11.088342 N | etcdserver/membership: set the initial cluster version to 3.4
2021-06-17 13:58:11.159605 I | etcdserver/api: enabled capabilities for version 3.4
```

```bash
$ etcdctl member list
8e9e05c52164694d, started, s1, http://localhost:2380, http://localhost:2379, false

$ etcdctl member list -w table
+------------------+---------+------+-----------------------+-----------------------+------------+
|        ID        | STATUS  | NAME |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+------+-----------------------+-----------------------+------------+
| 8e9e05c52164694d | started |   s1 | http://localhost:2380 | http://localhost:2379 |      false |
+------------------+---------+------+-----------------------+-----------------------+------------+
```

```bash
$ etcd --name s2 --listen-peer-urls 'http://localhost:3380' --listen-client-urls 'http://localhost:3379' --advertise-client-urls 'http://localhost:3379' --initial-advertise-peer-urls 'http://localhost:2380'
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 13:59:58.423755 I | etcdmain: etcd Version: 3.4.16
2021-06-17 13:59:58.423890 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 13:59:58.423894 I | etcdmain: Go Version: go1.16.3
2021-06-17 13:59:58.423897 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 13:59:58.423900 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 13:59:58.423905 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 13:59:58.423910 W | etcdmain: no data-dir provided, using default data-dir ./s2.etcd
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 13:59:58.425118 I | embed: name = s2
2021-06-17 13:59:58.425127 I | embed: data dir = s2.etcd
2021-06-17 13:59:58.425131 I | embed: member dir = s2.etcd/member
2021-06-17 13:59:58.425136 I | embed: heartbeat = 100ms
2021-06-17 13:59:58.425141 I | embed: election = 1000ms
2021-06-17 13:59:58.425144 I | embed: snapshot count = 100000
2021-06-17 13:59:58.425151 I | embed: advertise client URLs = http://localhost:3379
2021-06-17 13:59:58.514948 I | etcdserver: starting member 8e9e05c52164694d in cluster cdf818194e3a8c32
raft2021/06/17 13:59:58 INFO: 8e9e05c52164694d switched to configuration voters=()
raft2021/06/17 13:59:58 INFO: 8e9e05c52164694d became follower at term 0
raft2021/06/17 13:59:58 INFO: newRaft 8e9e05c52164694d [peers: [], term: 0, commit: 0, applied: 0, lastindex: 0, lastterm: 0]
raft2021/06/17 13:59:58 INFO: 8e9e05c52164694d became follower at term 1
raft2021/06/17 13:59:58 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 13:59:58.556889 W | auth: simple token is not cryptographically signed
2021-06-17 13:59:58.675464 I | etcdserver: starting server... [version: 3.4.16, cluster version: to_be_decided]
2021-06-17 13:59:58.675535 I | etcdserver: 8e9e05c52164694d as single-node; fast-forwarding 9 ticks (election ticks 10)
2021-06-17 13:59:58.675925 E | etcdserver: cannot monitor file descriptor usage (cannot get FDUsage on darwin)
raft2021/06/17 13:59:58 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 13:59:58.676617 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster cdf818194e3a8c32
2021-06-17 13:59:58.677403 I | embed: listening for peers on 127.0.0.1:3380
raft2021/06/17 13:59:59 INFO: 8e9e05c52164694d is starting a new election at term 1
raft2021/06/17 13:59:59 INFO: 8e9e05c52164694d became candidate at term 2
raft2021/06/17 13:59:59 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 2
raft2021/06/17 13:59:59 INFO: 8e9e05c52164694d became leader at term 2
raft2021/06/17 13:59:59 INFO: raft.node: 8e9e05c52164694d elected leader 8e9e05c52164694d at term 2
2021-06-17 13:59:59.217190 I | etcdserver: setting up the initial cluster version to 3.4
2021-06-17 13:59:59.217332 I | embed: ready to serve client requests
2021-06-17 13:59:59.217454 I | etcdserver: published {Name:s2 ClientURLs:[http://localhost:3379]} to cluster cdf818194e3a8c32
2021-06-17 13:59:59.218438 N | embed: serving insecure client requests on 127.0.0.1:3379, this is strongly discouraged!
2021-06-17 13:59:59.253060 N | etcdserver/membership: set the initial cluster version to 3.4
2021-06-17 13:59:59.308854 I | etcdserver/api: enabled capabilities for version 3.4
```

```bash
$ etcdctl member list -w table
+------------------+---------+------+-----------------------+-----------------------+------------+
|        ID        | STATUS  | NAME |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+------+-----------------------+-----------------------+------------+
| 8e9e05c52164694d | started |   s1 | http://localhost:2380 | http://localhost:2379 |      false |
+------------------+---------+------+-----------------------+-----------------------+------------+
```

```bash
$ etcdctl member list -w table --endpoints localhost:3379
+------------------+---------+------+-----------------------+-----------------------+------------+
|        ID        | STATUS  | NAME |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+------+-----------------------+-----------------------+------------+
| 8e9e05c52164694d | started |   s2 | http://localhost:2380 | http://localhost:3379 |      false |
+------------------+---------+------+-----------------------+-----------------------+------------+
```

```bash
$ etcd --name s2 --listen-peer-urls 'http://localhost:3380' --listen-client-urls 'http://localhost:3379' --advertise-client-urls 'http://localhost:3379' --initial-advertise-peer-urls 'http://localhost:3380' --initial-cluster 'default=http://localhost:2380'
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:03:37.092884 I | etcdmain: etcd Version: 3.4.16
2021-06-17 14:03:37.093055 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 14:03:37.093060 I | etcdmain: Go Version: go1.16.3
2021-06-17 14:03:37.093064 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 14:03:37.093067 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 14:03:37.093076 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 14:03:37.093083 W | etcdmain: no data-dir provided, using default data-dir ./s2.etcd
2021-06-17 14:03:37.093256 N | etcdmain: the server is already initialized as member before, starting as etcd member...
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:03:37.094803 I | embed: name = s2
2021-06-17 14:03:37.094815 I | embed: data dir = s2.etcd
2021-06-17 14:03:37.094819 I | embed: member dir = s2.etcd/member
2021-06-17 14:03:37.094825 I | embed: heartbeat = 100ms
2021-06-17 14:03:37.094829 I | embed: election = 1000ms
2021-06-17 14:03:37.094832 I | embed: snapshot count = 100000
2021-06-17 14:03:37.094840 I | embed: advertise client URLs = http://localhost:3379
2021-06-17 14:03:37.094845 I | embed: initial advertise peer URLs = http://localhost:3380
2021-06-17 14:03:37.094850 I | embed: initial cluster = 
2021-06-17 14:03:37.098668 I | etcdserver: restarting member 8e9e05c52164694d in cluster cdf818194e3a8c32 at commit index 4
raft2021/06/17 14:03:37 INFO: 8e9e05c52164694d switched to configuration voters=()
raft2021/06/17 14:03:37 INFO: 8e9e05c52164694d became follower at term 2
raft2021/06/17 14:03:37 INFO: newRaft 8e9e05c52164694d [peers: [], term: 2, commit: 4, applied: 0, lastindex: 4, lastterm: 2]
2021-06-17 14:03:37.137698 W | auth: simple token is not cryptographically signed
2021-06-17 14:03:37.250919 I | etcdserver: starting server... [version: 3.4.16, cluster version: to_be_decided]
2021-06-17 14:03:37.251142 E | etcdserver: cannot monitor file descriptor usage (cannot get FDUsage on darwin)
raft2021/06/17 14:03:37 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 14:03:37.253023 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster cdf818194e3a8c32
2021-06-17 14:03:37.253135 N | etcdserver/membership: set the initial cluster version to 3.4
2021-06-17 14:03:37.253194 I | etcdserver/api: enabled capabilities for version 3.4
2021-06-17 14:03:37.254039 I | embed: listening for peers on 127.0.0.1:3380
raft2021/06/17 14:03:38 INFO: 8e9e05c52164694d is starting a new election at term 2
raft2021/06/17 14:03:38 INFO: 8e9e05c52164694d became candidate at term 3
raft2021/06/17 14:03:38 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 3
raft2021/06/17 14:03:38 INFO: 8e9e05c52164694d became leader at term 3
raft2021/06/17 14:03:38 INFO: raft.node: 8e9e05c52164694d elected leader 8e9e05c52164694d at term 3
2021-06-17 14:03:38.543432 I | embed: ready to serve client requests
2021-06-17 14:03:38.543489 I | etcdserver: published {Name:s2 ClientURLs:[http://localhost:3379]} to cluster cdf818194e3a8c32
2021-06-17 14:03:38.544154 N | embed: serving insecure client requests on 127.0.0.1:3379, this is strongly discouraged!
```

```bash
$ etcdctl member list -w table --endpoints localhost:3379
+------------------+---------+------+-----------------------+-----------------------+------------+
|        ID        | STATUS  | NAME |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+------+-----------------------+-----------------------+------------+
| 8e9e05c52164694d | started |   s2 | http://localhost:2380 | http://localhost:3379 |      false |
+------------------+---------+------+-----------------------+-----------------------+------------+
$ etcdctl member list -w table 
+------------------+---------+------+-----------------------+-----------------------+------------+
|        ID        | STATUS  | NAME |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+------+-----------------------+-----------------------+------------+
| 8e9e05c52164694d | started |   s1 | http://localhost:2380 | http://localhost:2379 |      false |
+------------------+---------+------+-----------------------+-----------------------+------------+
```

https://etcd.io/docs/v3.5/op-guide/clustering/

```bash
$ etcd --name s1 --listen-peer-urls 'http://localhost:2380' --listen-client-urls 'http://localhost:2379' --advertise-client-urls 'http://localhost:2379' 
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:05:36.777851 I | etcdmain: etcd Version: 3.4.16
2021-06-17 14:05:36.778012 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 14:05:36.778016 I | etcdmain: Go Version: go1.16.3
2021-06-17 14:05:36.778020 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 14:05:36.778023 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 14:05:36.778030 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 14:05:36.778036 W | etcdmain: no data-dir provided, using default data-dir ./s1.etcd
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:05:36.779443 I | embed: name = s1
2021-06-17 14:05:36.779455 I | embed: data dir = s1.etcd
2021-06-17 14:05:36.779460 I | embed: member dir = s1.etcd/member
2021-06-17 14:05:36.779466 I | embed: heartbeat = 100ms
2021-06-17 14:05:36.779469 I | embed: election = 1000ms
2021-06-17 14:05:36.779477 I | embed: snapshot count = 100000
2021-06-17 14:05:36.779486 I | embed: advertise client URLs = http://localhost:2379
2021-06-17 14:05:36.863743 I | etcdserver: starting member 8e9e05c52164694d in cluster cdf818194e3a8c32
raft2021/06/17 14:05:36 INFO: 8e9e05c52164694d switched to configuration voters=()
raft2021/06/17 14:05:36 INFO: 8e9e05c52164694d became follower at term 0
raft2021/06/17 14:05:36 INFO: newRaft 8e9e05c52164694d [peers: [], term: 0, commit: 0, applied: 0, lastindex: 0, lastterm: 0]
raft2021/06/17 14:05:36 INFO: 8e9e05c52164694d became follower at term 1
raft2021/06/17 14:05:36 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 14:05:36.920776 W | auth: simple token is not cryptographically signed
2021-06-17 14:05:37.034716 I | etcdserver: starting server... [version: 3.4.16, cluster version: to_be_decided]
2021-06-17 14:05:37.035106 I | etcdserver: 8e9e05c52164694d as single-node; fast-forwarding 9 ticks (election ticks 10)
2021-06-17 14:05:37.035342 E | etcdserver: cannot monitor file descriptor usage (cannot get FDUsage on darwin)
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 14:05:37.035789 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster cdf818194e3a8c32
2021-06-17 14:05:37.036832 I | embed: listening for peers on 127.0.0.1:2380
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d is starting a new election at term 1
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d became candidate at term 2
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 2
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d became leader at term 2
raft2021/06/17 14:05:37 INFO: raft.node: 8e9e05c52164694d elected leader 8e9e05c52164694d at term 2
2021-06-17 14:05:37.869965 I | etcdserver: setting up the initial cluster version to 3.4
2021-06-17 14:05:37.889492 N | etcdserver/membership: set the initial cluster version to 3.4
2021-06-17 14:05:37.889545 I | etcdserver: published {Name:s1 ClientURLs:[http://localhost:2379]} to cluster cdf818194e3a8c32
2021-06-17 14:05:37.889560 I | embed: ready to serve client requests
2021-06-17 14:05:37.889613 I | etcdserver/api: enabled capabilities for version 3.4
2021-06-17 14:05:37.890348 N | embed: serving insecure client requests on 127.0.0.1:2379, this is strongly discouraged!
```

```bash
$ etcd --name s2 --listen-peer-urls 'http://localhost:3380' --listen-client-urls 'http://localhost:3379' --advertise-client-urls 'http://localhost:3379' --initial-advertise-peer-urls 'http://localhost:3380' --initial-cluster 's1=http://localhost:2380'
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:05:44.738818 I | etcdmain: etcd Version: 3.4.16
2021-06-17 14:05:44.738969 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 14:05:44.738974 I | etcdmain: Go Version: go1.16.3
2021-06-17 14:05:44.738977 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 14:05:44.738984 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 14:05:44.738990 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 14:05:44.738995 W | etcdmain: no data-dir provided, using default data-dir ./s2.etcd
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:05:44.740412 I | embed: name = s2
2021-06-17 14:05:44.740424 I | embed: data dir = s2.etcd
2021-06-17 14:05:44.740429 I | embed: member dir = s2.etcd/member
2021-06-17 14:05:44.740435 I | embed: heartbeat = 100ms
2021-06-17 14:05:44.740439 I | embed: election = 1000ms
2021-06-17 14:05:44.740442 I | embed: snapshot count = 100000
2021-06-17 14:05:44.740453 I | embed: advertise client URLs = http://localhost:3379
2021-06-17 14:05:44.820029 C | etcdmain: couldn't find local name "s2" in the initial cluster configuration
```

```bash
$ etcd --name s2 --listen-peer-urls 'http://localhost:3380' --listen-client-urls 'http://localhost:3379' --advertise-client-urls 'http://localhost:3379' --initial-advertise-peer-urls 'http://localhost:3380' --initial-cluster 's1=http://localhost:2380,s2=http://localhost:3380'
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:06:40.262711 I | etcdmain: etcd Version: 3.4.16
2021-06-17 14:06:40.262859 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 14:06:40.262864 I | etcdmain: Go Version: go1.16.3
2021-06-17 14:06:40.262867 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 14:06:40.262871 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 14:06:40.262879 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 14:06:40.262885 W | etcdmain: no data-dir provided, using default data-dir ./s2.etcd
2021-06-17 14:06:40.263043 N | etcdmain: the server is already initialized as member before, starting as etcd member...
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:06:40.264410 I | embed: name = s2
2021-06-17 14:06:40.264422 I | embed: data dir = s2.etcd
2021-06-17 14:06:40.264426 I | embed: member dir = s2.etcd/member
2021-06-17 14:06:40.264432 I | embed: heartbeat = 100ms
2021-06-17 14:06:40.264435 I | embed: election = 1000ms
2021-06-17 14:06:40.264438 I | embed: snapshot count = 100000
2021-06-17 14:06:40.264446 I | embed: advertise client URLs = http://localhost:3379
2021-06-17 14:06:40.330970 I | etcdserver: starting member 93b71e4d2422e3f2 in cluster 48fb28b28d40c36
raft2021/06/17 14:06:40 INFO: 93b71e4d2422e3f2 switched to configuration voters=()
raft2021/06/17 14:06:40 INFO: 93b71e4d2422e3f2 became follower at term 0
raft2021/06/17 14:06:40 INFO: newRaft 93b71e4d2422e3f2 [peers: [], term: 0, commit: 0, applied: 0, lastindex: 0, lastterm: 0]
raft2021/06/17 14:06:40 INFO: 93b71e4d2422e3f2 became follower at term 1
raft2021/06/17 14:06:40 INFO: 93b71e4d2422e3f2 switched to configuration voters=(10276657743932975437)
raft2021/06/17 14:06:40 INFO: 93b71e4d2422e3f2 switched to configuration voters=(10276657743932975437 10644009560981038066)
2021-06-17 14:06:40.390700 W | auth: simple token is not cryptographically signed
2021-06-17 14:06:40.505915 I | rafthttp: starting peer 8e9e05c52164694d...
2021-06-17 14:06:40.506019 I | rafthttp: started HTTP pipelining with peer 8e9e05c52164694d
2021-06-17 14:06:40.506388 I | rafthttp: started streaming with peer 8e9e05c52164694d (writer)
2021-06-17 14:06:40.506543 I | rafthttp: started streaming with peer 8e9e05c52164694d (writer)
2021-06-17 14:06:40.507628 I | rafthttp: started peer 8e9e05c52164694d
2021-06-17 14:06:40.507673 I | rafthttp: added peer 8e9e05c52164694d
2021-06-17 14:06:40.507713 I | etcdserver: starting server... [version: 3.4.16, cluster version: to_be_decided]
2021-06-17 14:06:40.507783 I | rafthttp: started streaming with peer 8e9e05c52164694d (stream MsgApp v2 reader)
2021-06-17 14:06:40.507810 I | rafthttp: started streaming with peer 8e9e05c52164694d (stream Message reader)
2021-06-17 14:06:40.508061 E | etcdserver: cannot monitor file descriptor usage (cannot get FDUsage on darwin)
raft2021/06/17 14:06:40 INFO: 93b71e4d2422e3f2 switched to configuration voters=(10276657743932975437 10644009560981038066)
2021-06-17 14:06:40.509779 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster 48fb28b28d40c36
raft2021/06/17 14:06:40 INFO: 93b71e4d2422e3f2 switched to configuration voters=(10276657743932975437 10644009560981038066)
2021-06-17 14:06:40.509929 I | etcdserver/membership: added member 93b71e4d2422e3f2 [http://localhost:3380] to cluster 48fb28b28d40c36
2021-06-17 14:06:40.511031 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.511047 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.511124 I | embed: listening for peers on 127.0.0.1:3380
2021-06-17 14:06:40.511937 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.511989 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.612946 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.613052 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.712833 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.712863 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.813385 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.813416 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.914423 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:40.914464 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.014667 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.014698 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.115363 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.115379 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.218931 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.218992 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.317369 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.317433 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.413257 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.413306 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.514547 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.514587 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.615092 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.615121 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
raft2021/06/17 14:06:41 INFO: 93b71e4d2422e3f2 is starting a new election at term 1
raft2021/06/17 14:06:41 INFO: 93b71e4d2422e3f2 became candidate at term 2
raft2021/06/17 14:06:41 INFO: 93b71e4d2422e3f2 received MsgVoteResp from 93b71e4d2422e3f2 at term 2
raft2021/06/17 14:06:41 INFO: 93b71e4d2422e3f2 [logterm: 1, index: 2] sent MsgVote request to 8e9e05c52164694d at term 2
2021-06-17 14:06:41.654946 E | rafthttp: request sent was ignored (cluster ID mismatch: remote[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.715390 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.715415 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.814970 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.814992 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.913119 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:41.913147 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.013484 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.013512 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.112488 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.112516 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.212413 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.212432 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.312842 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.312860 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.415906 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.415950 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.513148 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.513186 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.616407 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.616447 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.714796 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.714831 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.818614 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.818661 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.913471 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:42.913518 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.014317 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.014347 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.115219 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.115243 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.213856 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.213878 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
raft2021/06/17 14:06:43 INFO: 93b71e4d2422e3f2 is starting a new election at term 2
raft2021/06/17 14:06:43 INFO: 93b71e4d2422e3f2 became candidate at term 3
raft2021/06/17 14:06:43 INFO: 93b71e4d2422e3f2 received MsgVoteResp from 93b71e4d2422e3f2 at term 3
raft2021/06/17 14:06:43 INFO: 93b71e4d2422e3f2 [logterm: 1, index: 2] sent MsgVote request to 8e9e05c52164694d at term 3
2021-06-17 14:06:43.254992 E | rafthttp: request sent was ignored (cluster ID mismatch: remote[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.314145 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.314170 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.412645 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.412667 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.512830 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.512910 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.612289 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.612304 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.712712 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.712736 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.812514 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.812537 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.912440 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:43.912468 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.013057 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.013110 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.115562 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.115587 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.212606 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.212621 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.314628 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.314664 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.413292 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.413350 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.513890 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.513939 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.613631 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.613661 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.713990 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.714111 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.813376 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.813402 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.913540 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:44.913571 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.013231 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.013270 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
raft2021/06/17 14:06:45 INFO: 93b71e4d2422e3f2 is starting a new election at term 3
raft2021/06/17 14:06:45 INFO: 93b71e4d2422e3f2 became candidate at term 4
raft2021/06/17 14:06:45 INFO: 93b71e4d2422e3f2 received MsgVoteResp from 93b71e4d2422e3f2 at term 4
raft2021/06/17 14:06:45 INFO: 93b71e4d2422e3f2 [logterm: 1, index: 2] sent MsgVote request to 8e9e05c52164694d at term 4
2021-06-17 14:06:45.056185 E | rafthttp: request sent was ignored (cluster ID mismatch: remote[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.112251 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.112272 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.212643 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.212662 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.313160 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.313184 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.412298 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.412326 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.512594 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.512622 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.615737 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.615792 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.716778 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.716804 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.815181 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.815207 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.916529 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:45.916546 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.016679 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.016708 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.112681 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.112702 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.212739 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.212751 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.313830 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.313849 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.416023 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.416045 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.512360 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.512379 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.615056 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.615085 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
raft2021/06/17 14:06:46 INFO: 93b71e4d2422e3f2 is starting a new election at term 4
raft2021/06/17 14:06:46 INFO: 93b71e4d2422e3f2 became candidate at term 5
raft2021/06/17 14:06:46 INFO: 93b71e4d2422e3f2 received MsgVoteResp from 93b71e4d2422e3f2 at term 5
raft2021/06/17 14:06:46 INFO: 93b71e4d2422e3f2 [logterm: 1, index: 2] sent MsgVote request to 8e9e05c52164694d at term 5
2021-06-17 14:06:46.654138 E | rafthttp: request sent was ignored (cluster ID mismatch: remote[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.712558 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.712577 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.813234 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.813264 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.912177 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:46.912213 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.014103 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.014121 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.114312 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.114374 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.213442 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.213454 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.316195 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.316215 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.412600 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.412625 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.510347 E | etcdserver: publish error: etcdserver: request timed out
2021-06-17 14:06:47.513059 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.513094 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.612265 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.612289 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.715472 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.715486 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.812526 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.812545 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.915594 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:47.915610 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.015558 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.015582 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.116363 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.116392 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.214119 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.214136 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.315094 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.315107 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.416021 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.416043 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.513545 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.513563 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
raft2021/06/17 14:06:48 INFO: 93b71e4d2422e3f2 is starting a new election at term 5
raft2021/06/17 14:06:48 INFO: 93b71e4d2422e3f2 became candidate at term 6
raft2021/06/17 14:06:48 INFO: 93b71e4d2422e3f2 received MsgVoteResp from 93b71e4d2422e3f2 at term 6
raft2021/06/17 14:06:48 INFO: 93b71e4d2422e3f2 [logterm: 1, index: 2] sent MsgVote request to 8e9e05c52164694d at term 6
2021-06-17 14:06:48.559345 E | rafthttp: request sent was ignored (cluster ID mismatch: remote[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.616686 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.616698 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.715209 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.715228 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.816542 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.816564 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.916454 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:48.916472 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.015971 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.016018 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.116031 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.116044 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.212737 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.212783 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.312713 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.312731 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.416287 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.416329 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.513212 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.513271 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.612398 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.612414 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.715771 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.715801 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.816769 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.816798 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.912401 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:49.912416 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.016907 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.016948 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.114628 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.114647 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.214245 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.214266 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
raft2021/06/17 14:06:50 INFO: 93b71e4d2422e3f2 is starting a new election at term 6
raft2021/06/17 14:06:50 INFO: 93b71e4d2422e3f2 became candidate at term 7
raft2021/06/17 14:06:50 INFO: 93b71e4d2422e3f2 received MsgVoteResp from 93b71e4d2422e3f2 at term 7
raft2021/06/17 14:06:50 INFO: 93b71e4d2422e3f2 [logterm: 1, index: 2] sent MsgVote request to 8e9e05c52164694d at term 7
2021-06-17 14:06:50.255842 E | rafthttp: request sent was ignored (cluster ID mismatch: remote[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.315591 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.315622 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.416130 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.416162 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.512951 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.512972 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.612412 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.612469 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.714992 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.715010 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.813565 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.813686 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.912743 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:50.912817 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.013401 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.013442 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.113520 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.113544 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.212404 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.212420 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.313601 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.313659 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
raft2021/06/17 14:06:51 INFO: 93b71e4d2422e3f2 is starting a new election at term 7
raft2021/06/17 14:06:51 INFO: 93b71e4d2422e3f2 became candidate at term 8
raft2021/06/17 14:06:51 INFO: 93b71e4d2422e3f2 received MsgVoteResp from 93b71e4d2422e3f2 at term 8
raft2021/06/17 14:06:51 INFO: 93b71e4d2422e3f2 [logterm: 1, index: 2] sent MsgVote request to 8e9e05c52164694d at term 8
2021-06-17 14:06:51.355880 E | rafthttp: request sent was ignored (cluster ID mismatch: remote[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.412621 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.412650 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.513295 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.513316 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.614939 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.614961 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.715645 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.715660 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.817915 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.817956 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.913422 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:51.913444 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.013479 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.013510 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.116816 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.116854 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.213565 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.213581 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.313925 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.313953 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.413597 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.413623 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.512770 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.512783 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.617286 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.617308 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.716536 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.716566 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.813126 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.813150 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.916261 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:52.916300 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.016411 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.016431 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.112464 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.112478 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
raft2021/06/17 14:06:53 INFO: 93b71e4d2422e3f2 is starting a new election at term 8
raft2021/06/17 14:06:53 INFO: 93b71e4d2422e3f2 became candidate at term 9
raft2021/06/17 14:06:53 INFO: 93b71e4d2422e3f2 received MsgVoteResp from 93b71e4d2422e3f2 at term 9
raft2021/06/17 14:06:53 INFO: 93b71e4d2422e3f2 [logterm: 1, index: 2] sent MsgVote request to 8e9e05c52164694d at term 9
2021-06-17 14:06:53.154999 E | rafthttp: request sent was ignored (cluster ID mismatch: remote[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.213455 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.213495 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.315978 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.315993 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.414717 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.414760 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.516389 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.516411 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.615953 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.615986 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.714112 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
2021-06-17 14:06:53.714149 E | rafthttp: request sent was ignored (cluster ID mismatch: peer[8e9e05c52164694d]=cdf818194e3a8c32, local=48fb28b28d40c36)
^C
$ 
```

```bash
$ etcd --name s1 --listen-peer-urls 'http://localhost:2380' --listen-client-urls 'http://localhost:2379' --advertise-client-urls 'http://localhost:2379' 
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:05:36.777851 I | etcdmain: etcd Version: 3.4.16
2021-06-17 14:05:36.778012 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 14:05:36.778016 I | etcdmain: Go Version: go1.16.3
2021-06-17 14:05:36.778020 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 14:05:36.778023 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 14:05:36.778030 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 14:05:36.778036 W | etcdmain: no data-dir provided, using default data-dir ./s1.etcd
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:05:36.779443 I | embed: name = s1
2021-06-17 14:05:36.779455 I | embed: data dir = s1.etcd
2021-06-17 14:05:36.779460 I | embed: member dir = s1.etcd/member
2021-06-17 14:05:36.779466 I | embed: heartbeat = 100ms
2021-06-17 14:05:36.779469 I | embed: election = 1000ms
2021-06-17 14:05:36.779477 I | embed: snapshot count = 100000
2021-06-17 14:05:36.779486 I | embed: advertise client URLs = http://localhost:2379
2021-06-17 14:05:36.863743 I | etcdserver: starting member 8e9e05c52164694d in cluster cdf818194e3a8c32
raft2021/06/17 14:05:36 INFO: 8e9e05c52164694d switched to configuration voters=()
raft2021/06/17 14:05:36 INFO: 8e9e05c52164694d became follower at term 0
raft2021/06/17 14:05:36 INFO: newRaft 8e9e05c52164694d [peers: [], term: 0, commit: 0, applied: 0, lastindex: 0, lastterm: 0]
raft2021/06/17 14:05:36 INFO: 8e9e05c52164694d became follower at term 1
raft2021/06/17 14:05:36 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 14:05:36.920776 W | auth: simple token is not cryptographically signed
2021-06-17 14:05:37.034716 I | etcdserver: starting server... [version: 3.4.16, cluster version: to_be_decided]
2021-06-17 14:05:37.035106 I | etcdserver: 8e9e05c52164694d as single-node; fast-forwarding 9 ticks (election ticks 10)
2021-06-17 14:05:37.035342 E | etcdserver: cannot monitor file descriptor usage (cannot get FDUsage on darwin)
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
2021-06-17 14:05:37.035789 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster cdf818194e3a8c32
2021-06-17 14:05:37.036832 I | embed: listening for peers on 127.0.0.1:2380
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d is starting a new election at term 1
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d became candidate at term 2
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 2
raft2021/06/17 14:05:37 INFO: 8e9e05c52164694d became leader at term 2
raft2021/06/17 14:05:37 INFO: raft.node: 8e9e05c52164694d elected leader 8e9e05c52164694d at term 2
2021-06-17 14:05:37.869965 I | etcdserver: setting up the initial cluster version to 3.4
2021-06-17 14:05:37.889492 N | etcdserver/membership: set the initial cluster version to 3.4
2021-06-17 14:05:37.889545 I | etcdserver: published {Name:s1 ClientURLs:[http://localhost:2379]} to cluster cdf818194e3a8c32
2021-06-17 14:05:37.889560 I | embed: ready to serve client requests
2021-06-17 14:05:37.889613 I | etcdserver/api: enabled capabilities for version 3.4
2021-06-17 14:05:37.890348 N | embed: serving insecure client requests on 127.0.0.1:2379, this is strongly discouraged!
2021-06-17 14:06:40.510847 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.510895 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.511827 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.511848 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.612739 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.612872 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.712659 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.712709 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.813264 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.813304 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.914294 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:40.914332 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.014520 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.014588 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.115257 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.115291 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.218647 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.218730 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.317175 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.317215 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.413061 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.413137 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.514403 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.514434 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.614944 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.614996 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.654790 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.715236 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.715280 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.814822 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.814842 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.912926 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:41.913004 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.013341 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.013387 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.112384 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.112419 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.212292 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.212335 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.312727 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.312766 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.415690 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.415743 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.512949 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.513025 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.616282 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.616327 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.714636 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.714675 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.818254 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.818353 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.913320 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:42.913375 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.014188 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.014237 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.115056 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.115120 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.213703 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.213733 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.254812 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.313991 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.314024 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.412508 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.412548 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.512646 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.512698 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.612174 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.612196 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.712567 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.712607 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.812385 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.812405 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.912332 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:43.912351 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.012852 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.012915 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.115420 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.115444 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.212470 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.212490 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.314462 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.314514 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.413102 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.413156 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.513750 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.513780 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.613479 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.613545 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.713810 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.713884 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.813205 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.813258 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.913207 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:44.913341 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.013010 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.013077 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.056024 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.112144 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.112173 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.212527 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.212550 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.313000 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.313065 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.412168 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.412214 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.512427 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.512454 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.615597 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.615624 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.716610 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.716639 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.815086 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.815122 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.916375 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:45.916401 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.016543 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.016565 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.112532 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.112572 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.212616 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.212632 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.313641 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.313685 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.415851 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.415902 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.512245 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.512279 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.614927 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.614970 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.654028 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.712394 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.712434 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.813092 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.813136 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.912077 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:46.912119 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.014003 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.014036 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.114188 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.114239 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.213339 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.213360 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.316085 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.316130 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.412482 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.412516 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.512952 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.512989 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.612157 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.612190 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.715358 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.715389 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.812430 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.812469 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.915475 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:47.915507 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.015443 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.015494 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.116241 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.116280 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.214023 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.214057 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.314965 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.314995 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.415921 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.415936 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.513433 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.513458 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.559242 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.616583 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.616614 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.715091 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.715124 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.816431 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.816472 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.916343 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:48.916378 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.015825 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.015869 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.115931 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.115965 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.212599 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.212646 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.312571 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.312616 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.416071 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.416132 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.513019 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.513063 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.612248 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.612295 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.715634 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.715672 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.816631 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.816684 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.912285 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:49.912318 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.016769 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.016822 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.114485 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.114527 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.214145 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.214177 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.255703 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.315412 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.315441 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.415986 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.416042 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.512778 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.512798 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.612272 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.612322 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.714870 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.714888 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.813387 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.813442 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.912608 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:50.912655 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.013198 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.013264 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.113425 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.113460 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.212296 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.212339 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.313410 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.313438 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.355760 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.412470 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.412520 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.513167 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.513208 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.614837 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.614868 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.715531 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.715566 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.817683 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.817752 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.913249 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:51.913276 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.013282 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.013341 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.116726 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.116759 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.213461 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.213493 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.313791 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.313828 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.413455 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.413509 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.512655 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.512679 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.617155 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.617186 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.716432 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.716466 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.812956 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.812983 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.916149 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:52.916188 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.016270 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.016307 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.112339 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.112375 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.154851 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.213310 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.213361 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.315841 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.315860 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.414502 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.414563 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.516211 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.516262 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.615822 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.615864 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.714010 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
2021-06-17 14:06:53.714045 E | rafthttp: request cluster ID mismatch (got 48fb28b28d40c36 want cdf818194e3a8c32)
^C2021-06-17 14:06:58.610947 N | pkg/osutil: received interrupt signal, shutting down...
2021-06-17 14:06:58.611052 I | etcdserver: skipped leadership transfer for single voting member cluster

$ 
```

---

```bash
$ etcd --name s1 --listen-peer-urls 'http://localhost:2380' --listen-client-urls 'http://localhost:2379' --advertise-client-urls 'http://localhost:2379' --initial-cluster 's1=http://localhost:2380,s2=http://localhost:3380'
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:07:58.512154 I | etcdmain: etcd Version: 3.4.16
2021-06-17 14:07:58.512323 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 14:07:58.512328 I | etcdmain: Go Version: go1.16.3
2021-06-17 14:07:58.512332 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 14:07:58.512336 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 14:07:58.512344 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 14:07:58.512350 W | etcdmain: no data-dir provided, using default data-dir ./s1.etcd
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:07:58.513856 I | embed: name = s1
2021-06-17 14:07:58.513869 I | embed: data dir = s1.etcd
2021-06-17 14:07:58.513874 I | embed: member dir = s1.etcd/member
2021-06-17 14:07:58.513880 I | embed: heartbeat = 100ms
2021-06-17 14:07:58.513883 I | embed: election = 1000ms
2021-06-17 14:07:58.513886 I | embed: snapshot count = 100000
2021-06-17 14:07:58.513896 I | embed: advertise client URLs = http://localhost:2379
2021-06-17 14:07:58.607242 I | etcdserver: starting member 8e9e05c52164694d in cluster 48fb28b28d40c36
raft2021/06/17 14:07:58 INFO: 8e9e05c52164694d switched to configuration voters=()
raft2021/06/17 14:07:58 INFO: 8e9e05c52164694d became follower at term 0
raft2021/06/17 14:07:58 INFO: newRaft 8e9e05c52164694d [peers: [], term: 0, commit: 0, applied: 0, lastindex: 0, lastterm: 0]
raft2021/06/17 14:07:58 INFO: 8e9e05c52164694d became follower at term 1
raft2021/06/17 14:07:58 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
raft2021/06/17 14:07:58 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437 10644009560981038066)
2021-06-17 14:07:58.666100 W | auth: simple token is not cryptographically signed
2021-06-17 14:07:58.784199 I | rafthttp: starting peer 93b71e4d2422e3f2...
2021-06-17 14:07:58.784263 I | rafthttp: started HTTP pipelining with peer 93b71e4d2422e3f2
2021-06-17 14:07:58.784877 I | rafthttp: started streaming with peer 93b71e4d2422e3f2 (writer)
2021-06-17 14:07:58.785663 I | rafthttp: started streaming with peer 93b71e4d2422e3f2 (writer)
2021-06-17 14:07:58.785976 I | rafthttp: started peer 93b71e4d2422e3f2
2021-06-17 14:07:58.786006 I | rafthttp: added peer 93b71e4d2422e3f2
2021-06-17 14:07:58.786031 I | etcdserver: starting server... [version: 3.4.16, cluster version: to_be_decided]
2021-06-17 14:07:58.786087 E | etcdserver: cannot monitor file descriptor usage (cannot get FDUsage on darwin)
2021-06-17 14:07:58.786133 I | rafthttp: started streaming with peer 93b71e4d2422e3f2 (stream MsgApp v2 reader)
2021-06-17 14:07:58.786160 I | rafthttp: started streaming with peer 93b71e4d2422e3f2 (stream Message reader)
raft2021/06/17 14:07:58 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437 10644009560981038066)
2021-06-17 14:07:58.786548 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster 48fb28b28d40c36
raft2021/06/17 14:07:58 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437 10644009560981038066)
2021-06-17 14:07:58.786675 I | etcdserver/membership: added member 93b71e4d2422e3f2 [http://localhost:3380] to cluster 48fb28b28d40c36
2021-06-17 14:07:58.789136 I | embed: listening for peers on 127.0.0.1:2380
raft2021/06/17 14:08:00 INFO: 8e9e05c52164694d is starting a new election at term 1
raft2021/06/17 14:08:00 INFO: 8e9e05c52164694d became candidate at term 2
raft2021/06/17 14:08:00 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 2
raft2021/06/17 14:08:00 INFO: 8e9e05c52164694d [logterm: 1, index: 2] sent MsgVote request to 93b71e4d2422e3f2 at term 2
raft2021/06/17 14:08:01 INFO: 8e9e05c52164694d is starting a new election at term 2
raft2021/06/17 14:08:01 INFO: 8e9e05c52164694d became candidate at term 3
raft2021/06/17 14:08:01 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 3
raft2021/06/17 14:08:01 INFO: 8e9e05c52164694d [logterm: 1, index: 2] sent MsgVote request to 93b71e4d2422e3f2 at term 3
raft2021/06/17 14:08:02 INFO: 8e9e05c52164694d is starting a new election at term 3
raft2021/06/17 14:08:02 INFO: 8e9e05c52164694d became candidate at term 4
raft2021/06/17 14:08:02 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 4
raft2021/06/17 14:08:02 INFO: 8e9e05c52164694d [logterm: 1, index: 2] sent MsgVote request to 93b71e4d2422e3f2 at term 4
2021-06-17 14:08:03.789992 W | rafthttp: health check for peer 93b71e4d2422e3f2 could not connect: dial tcp 127.0.0.1:3380: connect: connection refused
2021-06-17 14:08:03.790044 W | rafthttp: health check for peer 93b71e4d2422e3f2 could not connect: dial tcp 127.0.0.1:3380: connect: connection refused
raft2021/06/17 14:08:04 INFO: 8e9e05c52164694d is starting a new election at term 4
raft2021/06/17 14:08:04 INFO: 8e9e05c52164694d became candidate at term 5
raft2021/06/17 14:08:04 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 5
raft2021/06/17 14:08:04 INFO: 8e9e05c52164694d [logterm: 1, index: 2] sent MsgVote request to 93b71e4d2422e3f2 at term 5
2021-06-17 14:08:05.312240 I | rafthttp: peer 93b71e4d2422e3f2 became active
2021-06-17 14:08:05.312263 I | rafthttp: established a TCP streaming connection with peer 93b71e4d2422e3f2 (stream Message writer)
2021-06-17 14:08:05.312300 I | rafthttp: established a TCP streaming connection with peer 93b71e4d2422e3f2 (stream MsgApp v2 writer)
2021-06-17 14:08:05.313299 I | rafthttp: established a TCP streaming connection with peer 93b71e4d2422e3f2 (stream Message reader)
2021-06-17 14:08:05.313315 I | rafthttp: established a TCP streaming connection with peer 93b71e4d2422e3f2 (stream MsgApp v2 reader)
raft2021/06/17 14:08:05 INFO: 8e9e05c52164694d is starting a new election at term 5
raft2021/06/17 14:08:05 INFO: 8e9e05c52164694d became candidate at term 6
raft2021/06/17 14:08:05 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 6
raft2021/06/17 14:08:05 INFO: 8e9e05c52164694d [logterm: 1, index: 2] sent MsgVote request to 93b71e4d2422e3f2 at term 6
raft2021/06/17 14:08:05 INFO: 8e9e05c52164694d received MsgVoteResp from 93b71e4d2422e3f2 at term 6
raft2021/06/17 14:08:05 INFO: 8e9e05c52164694d has received 2 MsgVoteResp votes and 0 vote rejections
raft2021/06/17 14:08:05 INFO: 8e9e05c52164694d became leader at term 6
raft2021/06/17 14:08:05 INFO: raft.node: 8e9e05c52164694d elected leader 8e9e05c52164694d at term 6
2021-06-17 14:08:05.786812 E | etcdserver: publish error: etcdserver: request timed out, possibly due to connection lost
2021-06-17 14:08:05.806691 I | etcdserver: setting up the initial cluster version to 3.4
2021-06-17 14:08:05.861408 I | embed: ready to serve client requests
2021-06-17 14:08:05.861466 I | etcdserver: published {Name:s1 ClientURLs:[http://localhost:2379]} to cluster 48fb28b28d40c36
2021-06-17 14:08:05.861964 N | embed: serving insecure client requests on 127.0.0.1:2379, this is strongly discouraged!
2021-06-17 14:08:05.879910 N | etcdserver/membership: set the initial cluster version to 3.4
2021-06-17 14:08:05.879975 I | etcdserver/api: enabled capabilities for version 3.4

```

```bash
$ etcd --name s2 --listen-peer-urls 'http://localhost:3380' --listen-client-urls 'http://localhost:3379' --advertise-client-urls 'http://localhost:3379' --initial-advertise-peer-urls 'http://localhost:3380' --initial-cluster 's1=http://localhost:2380,s2=http://localhost:3380'
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:08:05.038681 I | etcdmain: etcd Version: 3.4.16
2021-06-17 14:08:05.038831 I | etcdmain: Git SHA: Not provided (use ./build instead of go build)
2021-06-17 14:08:05.038835 I | etcdmain: Go Version: go1.16.3
2021-06-17 14:08:05.038837 I | etcdmain: Go OS/Arch: darwin/amd64
2021-06-17 14:08:05.038840 I | etcdmain: setting maximum number of CPUs to 16, total number of available CPUs is 16
2021-06-17 14:08:05.038847 N | etcdmain: failed to detect default host (default host not supported on darwin_amd64)
2021-06-17 14:08:05.038853 W | etcdmain: no data-dir provided, using default data-dir ./s2.etcd
[WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
2021-06-17 14:08:05.040453 I | embed: name = s2
2021-06-17 14:08:05.040468 I | embed: data dir = s2.etcd
2021-06-17 14:08:05.040472 I | embed: member dir = s2.etcd/member
2021-06-17 14:08:05.040478 I | embed: heartbeat = 100ms
2021-06-17 14:08:05.040482 I | embed: election = 1000ms
2021-06-17 14:08:05.040484 I | embed: snapshot count = 100000
2021-06-17 14:08:05.040494 I | embed: advertise client URLs = http://localhost:3379
2021-06-17 14:08:05.128248 I | etcdserver: starting member 93b71e4d2422e3f2 in cluster 48fb28b28d40c36
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 switched to configuration voters=()
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 became follower at term 0
raft2021/06/17 14:08:05 INFO: newRaft 93b71e4d2422e3f2 [peers: [], term: 0, commit: 0, applied: 0, lastindex: 0, lastterm: 0]
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 became follower at term 1
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 switched to configuration voters=(10276657743932975437)
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 switched to configuration voters=(10276657743932975437 10644009560981038066)
2021-06-17 14:08:05.190775 W | auth: simple token is not cryptographically signed
2021-06-17 14:08:05.307852 I | rafthttp: starting peer 8e9e05c52164694d...
2021-06-17 14:08:05.307937 I | rafthttp: started HTTP pipelining with peer 8e9e05c52164694d
2021-06-17 14:08:05.308235 I | rafthttp: started streaming with peer 8e9e05c52164694d (writer)
2021-06-17 14:08:05.308448 I | rafthttp: started streaming with peer 8e9e05c52164694d (writer)
2021-06-17 14:08:05.310348 I | rafthttp: started peer 8e9e05c52164694d
2021-06-17 14:08:05.310388 I | rafthttp: added peer 8e9e05c52164694d
2021-06-17 14:08:05.310396 I | rafthttp: started streaming with peer 8e9e05c52164694d (stream MsgApp v2 reader)
2021-06-17 14:08:05.310423 I | etcdserver: starting server... [version: 3.4.16, cluster version: to_be_decided]
2021-06-17 14:08:05.310434 I | rafthttp: started streaming with peer 8e9e05c52164694d (stream Message reader)
2021-06-17 14:08:05.311321 E | etcdserver: cannot monitor file descriptor usage (cannot get FDUsage on darwin)
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 switched to configuration voters=(10276657743932975437 10644009560981038066)
2021-06-17 14:08:05.311682 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster 48fb28b28d40c36
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 switched to configuration voters=(10276657743932975437 10644009560981038066)
2021-06-17 14:08:05.311775 I | etcdserver/membership: added member 93b71e4d2422e3f2 [http://localhost:3380] to cluster 48fb28b28d40c36
2021-06-17 14:08:05.312307 I | rafthttp: peer 8e9e05c52164694d became active
2021-06-17 14:08:05.312328 I | rafthttp: established a TCP streaming connection with peer 8e9e05c52164694d (stream Message reader)
2021-06-17 14:08:05.312355 I | rafthttp: established a TCP streaming connection with peer 8e9e05c52164694d (stream MsgApp v2 reader)
2021-06-17 14:08:05.312891 I | embed: listening for peers on 127.0.0.1:3380
2021-06-17 14:08:05.313217 I | rafthttp: established a TCP streaming connection with peer 8e9e05c52164694d (stream Message writer)
2021-06-17 14:08:05.313246 I | rafthttp: established a TCP streaming connection with peer 8e9e05c52164694d (stream MsgApp v2 writer)
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 [term: 1] received a MsgVote message with higher term from 8e9e05c52164694d [term: 6]
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 became follower at term 6
raft2021/06/17 14:08:05 INFO: 93b71e4d2422e3f2 [logterm: 1, index: 2, vote: 0] cast MsgVote for 8e9e05c52164694d [logterm: 1, index: 2] at term 6
raft2021/06/17 14:08:05 INFO: raft.node: 93b71e4d2422e3f2 elected leader 8e9e05c52164694d at term 6
2021-06-17 14:08:05.879991 I | etcdserver: published {Name:s2 ClientURLs:[http://localhost:3379]} to cluster 48fb28b28d40c36
2021-06-17 14:08:05.880020 N | etcdserver/membership: set the initial cluster version to 3.4
2021-06-17 14:08:05.880062 I | embed: ready to serve client requests
2021-06-17 14:08:05.880100 I | etcdserver/api: enabled capabilities for version 3.4
2021-06-17 14:08:05.880950 N | embed: serving insecure client requests on 127.0.0.1:3379, this is strongly discouraged!


```

```bash
$ etcdctl member list
8e9e05c52164694d, started, s1, http://localhost:2380, http://localhost:2379, false
93b71e4d2422e3f2, started, s2, http://localhost:3380, http://localhost:3379, false
$ etcdctl member list -w table
+------------------+---------+------+-----------------------+-----------------------+------------+
|        ID        | STATUS  | NAME |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+------+-----------------------+-----------------------+------------+
| 8e9e05c52164694d | started |   s1 | http://localhost:2380 | http://localhost:2379 |      false |
| 93b71e4d2422e3f2 | started |   s2 | http://localhost:3380 | http://localhost:3379 |      false |
+------------------+---------+------+-----------------------+-----------------------+------------+
$ 
```


Running HAProxy in front of the two etcds

```
frontend f
    bind *:9000
    mode http
    timeout client 10s
    use_backend all

backend all
    timeout connect 10s
    timeout server 60s
    mode http
    server s1 127.0.0.1:2379
    server s2 127.0.0.1:3379
```

```bash
$ etcdctl member list --endpoints localhost:9000
{"level":"warn","ts":"2021-06-17T14:10:08.017+0530","caller":"clientv3/retry_interceptor.go:62","msg":"retrying of unary invoker failed","target":"endpoint://client-5e6ed6d8-c58f-4c16-81b2-5b31546ed6c5/localhost:9000","attempt":0,"error":"rpc error: code = Unimplemented desc = Not Found: HTTP status code 404; transport: received the unexpected content-type \"text/plain; charset=utf-8\""}
Error: rpc error: code = Unimplemented desc = Not Found: HTTP status code 404; transport: received the unexpected content-type "text/plain; charset=utf-8"
```

```bash
$ etcdctl member list --endpoints http://localhost:9000
{"level":"warn","ts":"2021-06-17T14:11:14.986+0530","caller":"clientv3/retry_interceptor.go:62","msg":"retrying of unary invoker failed","target":"endpoint://client-98017b98-a7de-4712-aac6-be570478feaf/localhost:9000","attempt":0,"error":"rpc error: code = Unimplemented desc = Not Found: HTTP status code 404; transport: received the unexpected content-type \"text/plain; charset=utf-8\""}
Error: rpc error: code = Unimplemented desc = Not Found: HTTP status code 404; transport: received the unexpected content-type "text/plain; charset=utf-8"
```

```bash
$ curl localhost:9000
404 page not found
```

https://duckduckgo.com/?t=ffab&q=haproxy+use_backend+all&ia=web

https://duckduckgo.com/?q=haproxy+proxy&t=ffab&ia=web

https://duckduckgo.com/?q=haproxy+load+balancer+config&t=ffab&ia=web

https://www.anblicks.com/blog/haproxy-load-balancer-configuration/

https://duckduckgo.com/?t=ffab&q=haproxy+grpc+loadbalancer&ia=web

https://grpc.io/blog/grpc-load-balancing/

https://gist.github.com/thpham/114d20de8472b2cef966

https://www.inap.com/blog/deploying-kubernetes-on-bare-metal/

```
defaults
  timeout connect 10000ms
  timeout client 60000ms
  timeout server 60000ms

frontend f
  bind *:9000 npn spdy/2 alpn h2,http/1.1
  mode tcp
  default_backend grpc_server

backend grpc_server
  mode tcp
  balance roundrobin
  server s1 127.0.0.1:2379
  server s2 127.0.0.1:3379
```

```bash
$ etcdctl member list --endpoints localhost:3379
8e9e05c52164694d, started, s1, http://localhost:2380, http://localhost:2379, false
93b71e4d2422e3f2, started, s2, http://localhost:3380, http://localhost:3379, false
$ etcdctl member list --endpoints localhost:3379 -w table
+------------------+---------+------+-----------------------+-----------------------+------------+
|        ID        | STATUS  | NAME |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+------+-----------------------+-----------------------+------------+
| 8e9e05c52164694d | started |   s1 | http://localhost:2380 | http://localhost:2379 |      false |
| 93b71e4d2422e3f2 | started |   s2 | http://localhost:3380 | http://localhost:3379 |      false |
+------------------+---------+------+-----------------------+-----------------------+------------+
$ 
```
