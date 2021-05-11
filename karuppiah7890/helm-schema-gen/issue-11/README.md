# Issue 11

https://github.com/karuppiah7890/helm-schema-gen/issues/11

This is an issue about helm-schema-gen producing values.schema.json in UTF-16
format

Apparently Helm is not able to understand it - I guess helm can't understand
UTF-8 schema json? The library it uses or something like that

The ask is can the schema json be UTF-8 or be set to whatever format values.yaml
is in

But if values.yaml is in UTF-16, and if schema json is also in UTF-16, how will
Helm understand schema json then alone? Hmm

I was checking what's the standard for schema json

https://json-schema.org/

https://json-schema.org/specification.html

https://json-schema.org/draft/2020-12/json-schema-core.html

It says

"Encoding considerations: Encoding considerations are identical to those specified for the "application/json" media type. See JSON."

and refers to the link

https://json-schema.org/draft/2020-12/json-schema-core.html#RFC8259

Which in turn refers to

https://tools.ietf.org/html/rfc8259

Which talks about UTF-8 and about UTF-16. I didn't understand too much of it
though.

There's a section regarding encoding though, called as Character Encoding

https://tools.ietf.org/html/rfc8259#section-8.1

Apparently when there's exchange between two systems, it MUST be encoded in
UTF-8 it seems

"JSON text exchanged between systems that are not part of a closed
ecosystem MUST be encoded using UTF-8 [RFC3629]."

I didn't get this part though

"However, the ABNF in this specification allows member names and
string values to contain bit sequences that cannot encode Unicode
characters; for example, "\uDEAD" (a single unpaired UTF-16
surrogate). Instances of this have been observed, for example, when
a library truncates a UTF-16 string without checking whether the
truncation split a surrogate pair. The behavior of software that
receives JSON texts containing such values is unpredictable; for
example, implementations might return different values for the length
of a string value or even suffer fatal runtime exceptions."

But anyways, I need to do the following

- Reproduce issue in local first, by using some special character like the one
  mentioned in the issue - `ÿ`
- Check what Helm does in it's codebase maybe
- Check what I can do as part of helm-schema-gen codebase
- Check how to find the encoding of content
- Check how to fix the encoding to UTF-8 if Helm can ONLY understand UTF-8

---

Not able to reproduce the issue mentioned by the user now.

I can see the following data about the files though

```bash
$ file values.schema.json
values.schema.json: ASCII text

$ file values.yaml
values.yaml: UTF-8 Unicode text
```

What did I do?

1. Create dummy chart

```bash
$ helm create dummy-chart
```

2. Modify values.yaml to include the following values with some interesting
   characters

```yaml
randomValue: happÿ

anotherRandomValue: ÿay
```

3. Try helm template

```bash
$ cd dummy-chart
$ helm template .
```

All was good

4. Modify `service.yaml` template like this

```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ include "dummy-chart.fullname" . }}
  labels:
    {{- include "dummy-chart.labels" . | nindent 4 }}
  annotations:
    something: {{ .Values.anotherRandomValue }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: http
      protocol: TCP
      name: http
  selector:
    {{- include "dummy-chart.selectorLabels" . | nindent 4 }}
```

Now I have used the extra value that I added

5. Ran helm template and all was good

```bash
$ helm template .
---
# Source: dummy-chart/templates/serviceaccount.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: RELEASE-NAME-dummy-chart
  labels:
    helm.sh/chart: dummy-chart-0.1.0
    app.kubernetes.io/name: dummy-chart
    app.kubernetes.io/instance: RELEASE-NAME
    app.kubernetes.io/version: "1.16.0"
    app.kubernetes.io/managed-by: Helm
---
# Source: dummy-chart/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: RELEASE-NAME-dummy-chart
  labels:
    helm.sh/chart: dummy-chart-0.1.0
    app.kubernetes.io/name: dummy-chart
    app.kubernetes.io/instance: RELEASE-NAME
    app.kubernetes.io/version: "1.16.0"
    app.kubernetes.io/managed-by: Helm
  annotations:
    something: ÿay
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: dummy-chart
    app.kubernetes.io/instance: RELEASE-NAME
---
# Source: dummy-chart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: RELEASE-NAME-dummy-chart
  labels:
    helm.sh/chart: dummy-chart-0.1.0
    app.kubernetes.io/name: dummy-chart
    app.kubernetes.io/instance: RELEASE-NAME
    app.kubernetes.io/version: "1.16.0"
    app.kubernetes.io/managed-by: Helm
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: dummy-chart
      app.kubernetes.io/instance: RELEASE-NAME
  template:
    metadata:
      labels:
        app.kubernetes.io/name: dummy-chart
        app.kubernetes.io/instance: RELEASE-NAME
    spec:
      serviceAccountName: RELEASE-NAME-dummy-chart
      securityContext:
        {}
      containers:
        - name: dummy-chart
          securityContext:
            {}
          image: "nginx:1.16.0"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http
          resources:
            {}
---
# Source: dummy-chart/templates/tests/test-connection.yaml
apiVersion: v1
kind: Pod
metadata:
  name: "RELEASE-NAME-dummy-chart-test-connection"
  labels:
    helm.sh/chart: dummy-chart-0.1.0
    app.kubernetes.io/name: dummy-chart
    app.kubernetes.io/instance: RELEASE-NAME
    app.kubernetes.io/version: "1.16.0"
    app.kubernetes.io/managed-by: Helm
  annotations:
    "helm.sh/hook": test
spec:
  containers:
    - name: wget
      image: busybox
      command: ['wget']
      args: ['RELEASE-NAME-dummy-chart:80']
  restartPolicy: Never
```

---

Checking encoding of file

https://duckduckgo.com/?t=ffab&q=check+encoding+of+file&ia=web&iax=qa

https://duckduckgo.com/?q=linux%3A+check+encoding+of+file&t=ffab&ia=web

http://stackoverflow.com/questions/805418/ddg#805474

```bash
$ file -I values.yaml 
values.yaml: text/plain; charset=utf-8

$ file -I values.schema.json 
values.schema.json: text/plain; charset=us-ascii
```

Looks like I have ascii encoding. Hmm. How did I end up with this? Well, I used
this to create the schema json -

```bash
$ helm schema-gen values.yaml > values.schema.json
```

---

I'm asking the OP's help on reproducing the issue.

In the mean time I'm checking what Golang does in terms of encoding.

I actually use the `fmt` package to output the JSON using famous `Println`
function.

https://duckduckgo.com/?t=ffab&q=golang+fmt+encoding&ia=web



