Actually, as part of this issue, I want to review a PR

Why? I noticed a PR today for it

https://kubernetes.slack.com/archives/C3HD8ARJ5/p1630123857008400

https://github.com/etcd-io/etcd/pull/13307

It fixes https://github.com/etcd-io/etcd/issues/11555

```bash
/usr/local/bin/etcd \
    --data-dir=/var/etcd/data \
    --name=etcd-boka410001nkm6q6gomg-qbjxcbfm8s \
    --initial-advertise-peer-urls=https://etcd-boka410001nkm6q6gomg-qbjxcbfm8s.etcd-boka410001nkm6q6gomg.master-boka410001nkm6q6gomg.svc:2380 \
    --listen-peer-urls=https://0.0.0.0:2380 \
    --listen-client-urls=https://0.0.0.0:2379 \
    --advertise-client-urls=https://etcd-boka410001nkm6q6gomg-qbjxcbfm8s.etcd-boka410001nkm6q6gomg.master-boka410001nkm6q6gomg.svc:2379 \
    --initial-cluster=etcd-boka410001nkm6q6gomg-qbjxcbfm8s=https://etcd-boka410001nkm6q6gomg-qbjxcbfm8s.etcd-boka410001nkm6q6gomg.master-boka410001nkm6q6gomg.svc:2380,etcd-boka410001nkm6q6gomg-wjcb49jdt9=https://etcd-boka410001nkm6q6gomg-wjcb49jdt9.etcd-boka410001nkm6q6gomg.master-boka410001nkm6q6gomg.svc:2380,etcd-boka410001nkm6q6gomg-xq2d55qxxc=https://etcd-boka410001nkm6q6gomg-xq2d55qxxc.etcd-boka410001nkm6q6gomg.master-boka410001nkm6q6gomg.svc:2380 \
    --initial-cluster-state=existing \
    --strict-reconfig-check=true \
    --listen-metrics-urls=http://0.0.0.0:2381 \
    --peer-client-cert-auth=true \
    --peer-trusted-ca-file=/etc/etcdtls/member/peer-tls/peer-ca.crt \
    --peer-cert-file=/etc/etcdtls/member/peer-tls/peer.crt \
    --peer-key-file=/etc/etcdtls/member/peer-tls/peer.key \
    --client-cert-auth=true \
    --trusted-ca-file=/etc/etcdtls/member/server-tls/server-ca.crt \
    --cert-file=/etc/etcdtls/member/server-tls/server.crt \
    --key-file=/etc/etcdtls/member/server-tls/server.key \
```

`peer-trusted-ca-file` and `trusted-ca-file`

need to understand the issue properly first. Looks like the user wants to do some CA rotation / change CA certs, but without downtime

What they propose is - first let servers support certificates signed by old CA and new CA. Clients can then start resigning certificates signed by old CA and start using certificates signed by new CA. Finally when all certificates signed by old CA are resigned and decomissioned and not in use, the server can resign and decomission the old CA in the server side, have only the new CA (cert, key)

For this to be possible etcd has to automatically pickup CA certs when it's changed and should support CA bundle. Currently it does support CA bundle, but it doesn't automatically pickup the CA certs, instead an etcd restart is required. To take care of this there's a PR now

https://github.com/etcd-io/etcd/pull/13307


