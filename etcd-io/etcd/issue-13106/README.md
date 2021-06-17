# issue-13106

```bash
rm -rfv s1.etcd s2.etcd
```

```bash
etcd --name s1 --listen-peer-urls 'http://localhost:2380' --listen-client-urls 'http://localhost:2379' --advertise-client-urls 'http://localhost:2379' --initial-cluster 's1=http://localhost:2380,s2=http://localhost:3380'
```

```bash
etcd --name s2 --listen-peer-urls 'http://localhost:3380' --listen-client-urls 'http://localhost:3379' --advertise-client-urls 'http://localhost:3379' --initial-advertise-peer-urls 'http://localhost:3380' --initial-cluster 's1=http://localhost:2380,s2=http://localhost:3380'
```

```bash
etcdctl member list
```

```bash
etcdctl member list --endpoints localhost:3379
```

```bash
haproxy -f haproxy.cfg
```

```bash
etcdctl member list --endpoints localhost:9000
```
