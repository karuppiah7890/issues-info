Reviewing https://github.com/kubernetes-sigs/cluster-api-provider-gcp/pull/434

[TODO]

- Install gcloud
- Check the gcloud commands used in the script

---

https://duckduckgo.com/?t=ffab&q=gcloud+install&ia=web

https://cloud.google.com/sdk/docs/install

https://cloud.google.com/sdk/docs/downloads-docker

```bash
$ docker run --rm gcr.io/google.com/cloudsdktool/cloud-sdk:latest gcloud version
Google Cloud SDK 360.0.0
alpha 2021.10.04
app-engine-go 1.9.71
app-engine-java 1.9.91
app-engine-python 1.9.95
app-engine-python-extras 1.9.95
beta 2021.10.04
bigtable
bq 2.0.71
cbt 0.10.1
cloud-datastore-emulator 2.1.0
cloud-firestore-emulator 1.13.0
cloud-spanner-emulator 1.3.0
core 2021.10.04
datalab 20190610
gsutil 5.3
kpt 1.0.0-beta.5
local-extract 1.3.1
pubsub-emulator 0.5.0
```

```bash
tidb $ docker run -it --name gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud auth login
Go to the following link in your browser:

    https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=32555940559.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fappengine.admin+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcompute+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Faccounts.reauth&state=9d1HM2yBp1PjCazq0TjKon3EV6UT5U&prompt=consent&access_type=offline&code_challenge=U-3pj8gcJHKcFa3SP3G-okr0yjDSM2_IlLC0tHMGXtw&code_challenge_method=S256

Enter verification code:
ERROR: There was a problem with web authentication.
ERROR: (gcloud.auth.login) Please supply either code or authorization_response parameters.
tidb $ docker ps -a
CONTAINER ID   IMAGE                                      COMMAND                  CREATED         STATUS                     PORTS                       NAMES
ae347cf0753d   gcr.io/google.com/cloudsdktool/cloud-sdk   "gcloud auth login"      6 seconds ago   Exited (1) 2 seconds ago                               gcloud-config
0b9592d2eda7   kindest/node:v1.21.1                       "/usr/local/bin/entr…"   2 days ago      Up 7 minutes               127.0.0.1:52603->6443/tcp   kind-control-plane
tidb $ docker rm -f a
a
tidb $ docker run -it --name gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud auth login
Go to the following link in your browser:

    https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=32555940559.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fappengine.admin+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcompute+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Faccounts.reauth&state=na5lauZ8svq7lkw1fGqW8qLCl2AVdk&prompt=consent&access_type=offline&code_challenge=rJjkZfsFCgSQf0jaCjHzcFPRBcWV5kW2Ke7z5Q9FXtY&code_challenge_method=S256

Enter verification code: secret-code

You are now logged in as [emai@email.com].
Your current project is [None].  You can change this setting by running:
  $ gcloud config set project PROJECT_ID
tidb $
```

```bash
tidb $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud compute instances list --project your_project
ERROR: (gcloud) The project property must be set to a valid project ID, [your_project] is not a valid project ID.
To set your project, run:

  $ gcloud config set project PROJECT_ID

or to unset it, run:

  $ gcloud config unset project
tidb $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud compute instances list 
ERROR: (gcloud.compute.instances.list) The required property [project] is not currently set.
It can be set on a per-command basis by re-running your command with the [--project] flag.

You may set it for your current workspace by running:

  $ gcloud config set project VALUE

or it can be set temporarily by the environment variable [CLOUDSDK_CORE_PROJECT]
tidb $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud config set project blah-project
Updated property [core/project].
tidb $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud config get project 
ERROR: (gcloud.config) Invalid choice: 'get'.
Maybe you meant:
  gcloud config get-value
  gcloud config configurations describe
  gcloud source project-configs describe
  gcloud projects describe
  gcloud projects get-ancestors
  gcloud projects get-ancestors-iam-policy
  gcloud projects get-iam-policy
  gcloud config configurations activate
  gcloud config configurations create
  gcloud config configurations delete

To search the help text of gcloud commands, run:
  gcloud help -- SEARCH_TERMS
tidb $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud config get-value project 
blah-project
tidb $ 
```

```bash
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud compute instances list 
Listed 0 items.
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud container exists -h
ERROR: (gcloud.container) Invalid choice: 'exists'.
Maybe you meant:
  gcloud compute
  gcloud container

To search the help text of gcloud commands, run:
  gcloud help -- SEARCH_TERMS
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud container -h
Usage: gcloud container [optional flags] <group | command>
  group may be           binauthz | clusters | hub | images | node-pools |
                         operations | subnets
  command may be         get-server-config

For detailed information on this command and its flags, run:
  gcloud container --help
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud container operations -h
Usage: gcloud container operations [optional flags] <command>
  command may be         describe | list | wait

For detailed information on this command and its flags, run:
  gcloud container operations --help
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud container operations list
Listed 0 items.
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud version
Google Cloud SDK 360.0.0
alpha 2021.10.04
app-engine-go 1.9.71
app-engine-java 1.9.91
app-engine-python 1.9.95
app-engine-python-extras 1.9.95
beta 2021.10.04
bigtable 
bq 2.0.71
cbt 0.10.1
cloud-datastore-emulator 2.1.0
cloud-firestore-emulator 1.13.0
cloud-spanner-emulator 1.3.0
core 2021.10.04
datalab 20190610
gsutil 5.3
kpt 1.0.0-beta.5
local-extract 1.3.1
pubsub-emulator 0.5.0
~ $ 
```

```bash
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud containers -h
ERROR: (gcloud) Invalid choice: 'containers'.
Maybe you meant:
  gcloud container get-server-config
  gcloud container operations describe
  gcloud container operations list
  gcloud container operations wait
  gcloud container binauthz create-signature-payload
  gcloud container clusters create
  gcloud container clusters create-auto
  gcloud container clusters delete
  gcloud container clusters describe
  gcloud container clusters get-credentials

To search the help text of gcloud commands, run:
  gcloud help -- SEARCH_TERMS
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud container -h
Usage: gcloud container [optional flags] <group | command>
  group may be           binauthz | clusters | hub | images | node-pools |
                         operations | subnets
  command may be         get-server-config

For detailed information on this command and its flags, run:
  gcloud container --help
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud container --help
NAME
    gcloud container - deploy and manage clusters of machines for running
        containers

SYNOPSIS
    gcloud container GROUP | COMMAND [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The gcloud container command group lets you create and manage Google
    Kubernetes Engine containers and clusters.

    Kubernetes Engine is a cluster manager and orchestration system for running
    your Docker containers. Kubernetes Engine schedules your containers into
    the cluster and manages them automatically based on requirements you
    define, such as CPU and memory.

    More information on Kubernetes Engine can be found here:
    https://cloud.google.com/kubernetes-engine and detailed documentation can
    be found here: https://cloud.google.com/kubernetes-engine/docs/

GCLOUD WIDE FLAGS
    These flags are available to all commands: --help.

    Run $ gcloud help for details.

GROUPS
    GROUP is one of the following:

     binauthz
        Manage attestations for Binary Authorization on Google Cloud Platform.

     clusters
        Deploy and teardown Google Kubernetes Engine clusters.

     hub
        Centrally manage features and services on all your Kubernetes clusters
        with Hub.

     images
        List and manipulate Google Container Registry images.

     node-pools
        Create and delete operations for Google Kubernetes Engine node pools.

     operations
        Get and list operations for Google Kubernetes Engine clusters.

     subnets
        Manage subnets to be used by Google Kubernetes Engine clusters.

COMMANDS
    COMMAND is one of the following:

     get-server-config
        Get Kubernetes Engine server config.

NOTES
    These variants are also available:

        $ gcloud alpha container

        $ gcloud beta container

~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud container operations --help
NAME
    gcloud container operations - get and list operations for Google Kubernetes
        Engine clusters

SYNOPSIS
    gcloud container operations COMMAND
        [--region=REGION | --zone=ZONE, -z ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get and list operations for Google Kubernetes Engine clusters.

FLAGS
     At most one of these may be specified:

       --region=REGION
          Compute region (e.g. us-central1) for the cluster.

       --zone=ZONE, -z ZONE
          Compute zone (e.g. us-central1-a) for the cluster. Overrides the
          default compute/zone property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --help.

    Run $ gcloud help for details.

COMMANDS
    COMMAND is one of the following:

     describe
        Describe an operation.

     list
        List operations for container clusters.

     wait
        Poll an operation for completion.

NOTES
    These variants are also available:

        $ gcloud alpha container operations

        $ gcloud beta container operations
```

```bash
~ $ docker run --rm --volumes-from gcloud-config gcr.io/google.com/cloudsdktool/cloud-sdk gcloud builds --help
NAME
    gcloud builds - create and manage builds for Google Cloud Build

SYNOPSIS
    gcloud builds GROUP | COMMAND [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create and manage builds for Google Cloud Build.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --help.

    Run $ gcloud help for details.

GROUPS
    GROUP is one of the following:

     worker-pools
        Manage worker pools for Google Cloud Build.

COMMANDS
    COMMAND is one of the following:

     cancel
        Cancel an ongoing build.

     describe
        Get information about a particular build.

     list
        List builds.

     log
        Stream the logs for a build.

     submit
        Submit a build using Google Cloud Build.

NOTES
    These variants are also available:

        $ gcloud alpha builds

        $ gcloud beta builds

~ $ 
```
