I am attending the etcd community meeting through Google Meet - meet.google.com/umg-nrxn-qvs

https://docs.google.com/document/d/16XEGyPBisZvmmoIHSZzv__LoyOeluC5a4x353CX0SIM

I noticed some issues and proposals being mentioned. It was pretty cool to hear but I didn't understand it all and it's pretty late now - 12 am IST and I'm dizzy :P

Among the things being discussed, a cool thing that came up was - 

https://github.com/etcd-io/etcd/issues/13167

Which talks about flaky tests and they were talking about how the community could help with stuff

I decided to try my hand at this issue and write some automation scripts to start off with finding the percentage of flakiness / flakyness ;)

I was reading through the issues and I'm planning to write bash scripts and also try my hand at some basic golang tool to do this thing of analyzing the last 100 runs and see how much is flaky

Ideas? Well, for starters, I think I'll need a GitHub Access Token and access the GitHub API and work with some JSON data - data where I can get a list of CI/CD runs - GitHub Actions runs and their results. Also, ideally, I would need the commit sha for the failed GitHub Actions or even the non failed ones and then also be able to track the PR that lead the commit in the main branch so that we can also probably analyze the PR and more

I think it would be good to get the above data in the format of a JSON or something so that it can be processed by something else later. Or used to convert to some human readable content too, or for any analysis basically. Hmm. Anyways, let's get this going now! :D

I'll start with a basic bash script first and then we can move to golang, even write some tests if needed :P or I "guess" we "surely" need it :P ;)

---

- Get GitHub Token - DONE
- Checkout GitHub API and look for API to list last few commits and check their CI/CD status. Or look for API to list last few CI/CD runs and their status and for which commit they were run run
- Call the GitHub API using curl and the GitHub token and see if it works at all
- Set the GitHub token in the shell environment using environment variables
- Give error when the token is not set
- Later, instead of error, ask the user to type / paste the GitHub token if it's not available :) Maybe mask the token so that no one sees it ;)
- Output data in JSON or put the JSON data in a file?
- Show some human readable data too maybe? :)



https://duckduckgo.com/?t=ffab&q=github+api&ia=web

https://docs.github.com/en/rest

https://docs.github.com/en/rest/overview

https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api

```bash
$ curl https://api.github.com/zen
Non-blocking is better than blocking.
```

Lol :D

```bash
$ curl https://api.github.com/users/defunkt
{
  "login": "defunkt",
  "id": 2,
  "node_id": "MDQ6VXNlcjI=",
  "avatar_url": "https://avatars.githubusercontent.com/u/2?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/defunkt",
  "html_url": "https://github.com/defunkt",
  "followers_url": "https://api.github.com/users/defunkt/followers",
  "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
  "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
  "organizations_url": "https://api.github.com/users/defunkt/orgs",
  "repos_url": "https://api.github.com/users/defunkt/repos",
  "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
  "received_events_url": "https://api.github.com/users/defunkt/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Chris Wanstrath",
  "company": null,
  "blog": "http://chriswanstrath.com/",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": "🍔",
  "twitter_username": null,
  "public_repos": 107,
  "public_gists": 273,
  "followers": 21220,
  "following": 210,
  "created_at": "2007-10-20T05:24:19Z",
  "updated_at": "2019-11-01T21:56:00Z"
}
```

```bash
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/users/defunkt
```

```bash
$ ./find-flaky-tests-data.sh 
{
  "login": "defunkt",
  "id": 2,
  "node_id": "MDQ6VXNlcjI=",
  "avatar_url": "https://avatars.githubusercontent.com/u/2?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/defunkt",
  "html_url": "https://github.com/defunkt",
  "followers_url": "https://api.github.com/users/defunkt/followers",
  "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
  "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
  "organizations_url": "https://api.github.com/users/defunkt/orgs",
  "repos_url": "https://api.github.com/users/defunkt/repos",
  "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
  "received_events_url": "https://api.github.com/users/defunkt/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Chris Wanstrath",
  "company": null,
  "blog": "http://chriswanstrath.com/",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": "🍔",
  "twitter_username": null,
  "public_repos": 107,
  "public_gists": 273,
  "followers": 21220,
  "following": 210,
  "created_at": "2007-10-20T05:24:19Z",
  "updated_at": "2019-11-01T21:56:00Z"
}
```

That worked! And bad credentials are shown here, hmm

```bash
$ ./find-flaky-tests-data.sh 
{
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest"
}
```

Nice!

https://docs.github.com/en/rest/overview/resources-in-the-rest-api

https://docs.github.com/en/rest/overview/openapi-description

https://github.com/github/rest-api-description/

https://github.com/github/rest-api-description/tree/main/descriptions

https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/ghes-3.1/ghes-3.1.yaml

That's enterprise edition I guess, looking at the endpoints I saw

There was also some `se` - standard edition? Idk

Looks like this is the thing I'm looking for? -

https://github.com/github/rest-api-description/blob/main/descriptions/api.github.com/api.github.com.yaml

https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.yaml

I'm seeing this thingy here after searching for `actions` and `/actions`

```
"/repos/{owner}/{repo}/actions/runs":
    get:
      summary: List workflow runs for a repository
      description: |-
        Lists all workflow runs for a repository. You can use parameters to narrow the list of results. For more information about using parameters, see [Parameters](https://docs.github.com/rest/overview/resources-in-the-rest-api#parameters).

        Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
      tags:
      - actions
```

Looking at the https://github.com/etcd-io/etcd/actions it says the number of runs if 4486 and it matches with the API call I just made

```bash
$  ./find-flaky-tests-data.sh 
{
  "total_count": 4486,
  "workflow_runs": [
    {
      "id": 990758164,
      "name": "Linux ARM64 Graviton2",
      "node_id": "WFR_lAHOAoB0OM4Aq0e2zjsNxRQ",
      "head_branch": "main",
      "head_sha": "57a489670474bffc47762372a6f54ca840285b41",
      "run_number": 726,
      "event": "push",
      "status": "completed",
      "conclusion": "success",
      "workflow_id": 8876815,
      "check_suite_id": 3136008910,
      "check_suite_node_id": "MDEwOkNoZWNrU3VpdGUzMTM2MDA4OTEw",
      "url": "https://api.github.com/repos/etcd-io/etcd/actions/runs/990758164",
      "html_url": "https://github.com/etcd-io/etcd/actions/runs/990758164",
      "pull_requests": [

      ],
      "created_at": "2021-07-01T16:12:35Z",
      "updated_at": "2021-07-01T16:25:18Z",
      "jobs_url": "https://api.github.com/repos/etcd-io/etcd/actions/runs/990758164/jobs",
      "logs_url": "https://api.github.com/repos/etcd-io/etcd/actions/runs/990758164/logs",
      "check_suite_url": "https://api.github.com/repos/etcd-io/etcd/check-suites/3136008910",
      "artifacts_url": "https://api.github.com/repos/etcd-io/etcd/actions/runs/990758164/artifacts",
      "cancel_url": "https://api.github.com/repos/etcd-io/etcd/actions/runs/990758164/cancel",
      "rerun_url": "https://api.github.com/repos/etcd-io/etcd/actions/runs/990758164/rerun",
      "workflow_url": "https://api.github.com/repos/etcd-io/etcd/actions/workflows/8876815",
      "head_commit": {
        "id": "57a489670474bffc47762372a6f54ca840285b41",
        "tree_id": "7f103e4573a79f22dbcc21304ad22b50027ff0f1",
        "message": "Merge pull request #13170 from gyuho/maintainers\n\nREADME: explain \"MAINTAINERS\"",
        "timestamp": "2021-07-01T16:12:30Z",
        "author": {
          "name": "Gyuho Lee",
          "email": "leegyuho@amazon.com"
        },
        "committer": {
          "name": "GitHub",
          "email": "noreply@github.com"
        }
      },
      "repository": {
        "id": 11225014,
        "node_id": "MDEwOlJlcG9zaXRvcnkxMTIyNTAxNA==",
        "name": "etcd",
        "full_name": "etcd-io/etcd",
        "private": false,
        "owner": {
          "login": "etcd-io",
          "id": 41972792,
          "node_id": "MDEyOk9yZ2FuaXphdGlvbjQxOTcyNzky",
          "avatar_url": "https://avatars.githubusercontent.com/u/41972792?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/etcd-io",
          "html_url": "https://github.com/etcd-io",
          "followers_url": "https://api.github.com/users/etcd-io/followers",
          "following_url": "https://api.github.com/users/etcd-io/following{/other_user}",
          "gists_url": "https://api.github.com/users/etcd-io/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/etcd-io/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/etcd-io/subscriptions",
          "organizations_url": "https://api.github.com/users/etcd-io/orgs",
          "repos_url": "https://api.github.com/users/etcd-io/repos",
          "events_url": "https://api.github.com/users/etcd-io/events{/privacy}",
          "received_events_url": "https://api.github.com/users/etcd-io/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "html_url": "https://github.com/etcd-io/etcd",
        "description": "Distributed reliable key-value store for the most critical data of a distributed system",
        "fork": false,
        "url": "https://api.github.com/repos/etcd-io/etcd",
        "forks_url": "https://api.github.com/repos/etcd-io/etcd/forks",
        "keys_url": "https://api.github.com/repos/etcd-io/etcd/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/etcd-io/etcd/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/etcd-io/etcd/teams",
        "hooks_url": "https://api.github.com/repos/etcd-io/etcd/hooks",
        "issue_events_url": "https://api.github.com/repos/etcd-io/etcd/issues/events{/number}",
        "events_url": "https://api.github.com/repos/etcd-io/etcd/events",
        "assignees_url": "https://api.github.com/repos/etcd-io/etcd/assignees{/user}",
        "branches_url": "https://api.github.com/repos/etcd-io/etcd/branches{/branch}",
        "tags_url": "https://api.github.com/repos/etcd-io/etcd/tags",
        "blobs_url": "https://api.github.com/repos/etcd-io/etcd/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/etcd-io/etcd/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/etcd-io/etcd/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/etcd-io/etcd/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/etcd-io/etcd/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/etcd-io/etcd/languages",
        "stargazers_url": "https://api.github.com/repos/etcd-io/etcd/stargazers",
        "contributors_url": "https://api.github.com/repos/etcd-io/etcd/contributors",
        "subscribers_url": "https://api.github.com/repos/etcd-io/etcd/subscribers",
        "subscription_url": "https://api.github.com/repos/etcd-io/etcd/subscription",
        "commits_url": "https://api.github.com/repos/etcd-io/etcd/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/etcd-io/etcd/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/etcd-io/etcd/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/etcd-io/etcd/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/etcd-io/etcd/contents/{+path}",
        "compare_url": "https://api.github.com/repos/etcd-io/etcd/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/etcd-io/etcd/merges",
        "archive_url": "https://api.github.com/repos/etcd-io/etcd/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/etcd-io/etcd/downloads",
        "issues_url": "https://api.github.com/repos/etcd-io/etcd/issues{/number}",
        "pulls_url": "https://api.github.com/repos/etcd-io/etcd/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/etcd-io/etcd/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/etcd-io/etcd/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/etcd-io/etcd/labels{/name}",
        "releases_url": "https://api.github.com/repos/etcd-io/etcd/releases{/id}",
        "deployments_url": "https://api.github.com/repos/etcd-io/etcd/deployments"
      },
      "head_repository": {
        "id": 11225014,
        "node_id": "MDEwOlJlcG9zaXRvcnkxMTIyNTAxNA==",
        "name": "etcd",
        "full_name": "etcd-io/etcd",
        "private": false,
        "owner": {
          "login": "etcd-io",
          "id": 41972792,
          "node_id": "MDEyOk9yZ2FuaXphdGlvbjQxOTcyNzky",
          "avatar_url": "https://avatars.githubusercontent.com/u/41972792?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/etcd-io",
          "html_url": "https://github.com/etcd-io",
          "followers_url": "https://api.github.com/users/etcd-io/followers",
          "following_url": "https://api.github.com/users/etcd-io/following{/other_user}",
          "gists_url": "https://api.github.com/users/etcd-io/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/etcd-io/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/etcd-io/subscriptions",
          "organizations_url": "https://api.github.com/users/etcd-io/orgs",
          "repos_url": "https://api.github.com/users/etcd-io/repos",
          "events_url": "https://api.github.com/users/etcd-io/events{/privacy}",
          "received_events_url": "https://api.github.com/users/etcd-io/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "html_url": "https://github.com/etcd-io/etcd",
        "description": "Distributed reliable key-value store for the most critical data of a distributed system",
        "fork": false,
        "url": "https://api.github.com/repos/etcd-io/etcd",
        "forks_url": "https://api.github.com/repos/etcd-io/etcd/forks",
        "keys_url": "https://api.github.com/repos/etcd-io/etcd/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/etcd-io/etcd/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/etcd-io/etcd/teams",
        "hooks_url": "https://api.github.com/repos/etcd-io/etcd/hooks",
        "issue_events_url": "https://api.github.com/repos/etcd-io/etcd/issues/events{/number}",
        "events_url": "https://api.github.com/repos/etcd-io/etcd/events",
        "assignees_url": "https://api.github.com/repos/etcd-io/etcd/assignees{/user}",
        "branches_url": "https://api.github.com/repos/etcd-io/etcd/branches{/branch}",
        "tags_url": "https://api.github.com/repos/etcd-io/etcd/tags",
        "blobs_url": "https://api.github.com/repos/etcd-io/etcd/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/etcd-io/etcd/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/etcd-io/etcd/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/etcd-io/etcd/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/etcd-io/etcd/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/etcd-io/etcd/languages",
        "stargazers_url": "https://api.github.com/repos/etcd-io/etcd/stargazers",
        "contributors_url": "https://api.github.com/repos/etcd-io/etcd/contributors",
        "subscribers_url": "https://api.github.com/repos/etcd-io/etcd/subscribers",
        "subscription_url": "https://api.github.com/repos/etcd-io/etcd/subscription",
        "commits_url": "https://api.github.com/repos/etcd-io/etcd/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/etcd-io/etcd/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/etcd-io/etcd/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/etcd-io/etcd/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/etcd-io/etcd/contents/{+path}",
        "compare_url": "https://api.github.com/repos/etcd-io/etcd/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/etcd-io/etcd/merges",
        "archive_url": "https://api.github.com/repos/etcd-io/etcd/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/etcd-io/etcd/downloads",
        "issues_url": "https://api.github.com/repos/etcd-io/etcd/issues{/number}",
        "pulls_url": "https://api.github.com/repos/etcd-io/etcd/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/etcd-io/etcd/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/etcd-io/etcd/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/etcd-io/etcd/labels{/name}",
        "releases_url": "https://api.github.com/repos/etcd-io/etcd/releases{/id}",
        "deployments_url": "https://api.github.com/repos/etcd-io/etcd/deployments"
      }
    },
....
...
```

```bash
$ ./find-flaky-tests-data.sh | jq '.workflow_runs | length'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  328k  100  328k    0     0   249k      0  0:00:01  0:00:01 --:--:--  249k
30
```

That's a lot of runs actually though. I mean, https://github.com/etcd-io/etcd/actions shows multiple runs for each commit, hmm

For example

```
 Merge pull request #13170 from gyuho/maintainers Linux ARM64 Graviton2 #726: Commit 57a4896 pushed by gyuho
main

Merge pull request #13170 from gyuho/maintainers CodeQL #1308: Commit 57a4896 pushed by gyuho
main

Merge pull request #13170 from gyuho/maintainers E2E #638: Commit 57a4896 pushed by gyuho
main

Merge pull request #13170 from gyuho/maintainers grpcProxy-tests #585: Commit 57a4896 pushed by gyuho
main

Merge pull request #13170 from gyuho/maintainers Tests #716: Commit 57a4896 pushed by gyuho
main

Merge pull request #13170 from gyuho/maintainers functional-tests #592: Commit 57a4896 pushed by gyuho 
main
```

It's all for `57a4896`, hmm

I'm gonna check out commits endpoint

```
"/repos/{owner}/{repo}/commits":
    get:
      summary: List commits
      description: |-
        **Signature verification object**

        The response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object:

        | Name | Type | Description |
        | ---- | ---- | ----------- |
        | `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. |
        | `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. |
        | `signature` | `string` | The signature that was extracted from the commit. |
        | `payload` | `string` | The value that was signed. |

        These are the possible values for `reason` in the `verification` object:

        | Value | Description |
        | ----- | ----------- |
        | `expired_key` | The key that made the signature is expired. |
        | `not_signing_key` | The "signing" flag is not among the usage flags in the GPG key that made the signature. |
        | `gpgverify_error` | There was an error communicating with the signature verification service. |
        | `gpgverify_unavailable` | The signature verification service is currently unavailable. |
        | `unsigned` | The object does not include a signature. |
        | `unknown_signature_type` | A non-PGP signature was found in the commit. |
        | `no_user` | No user was associated with the `committer` email address in the commit. |
        | `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. |
        | `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. |
        | `unknown_key` | The key that made the signature has not been registered with any user's account. |
        | `malformed_signature` | There was an error parsing the signature. |
        | `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. |
        | `valid` | None of the above errors applied, so the signature is considered to be verified. |
```

```bash
 $ ./find-flaky-tests-data.sh 
[
  {
    "sha": "57a489670474bffc47762372a6f54ca840285b41",
    "node_id": "MDY6Q29tbWl0MTEyMjUwMTQ6NTdhNDg5NjcwNDc0YmZmYzQ3NzYyMzcyYTZmNTRjYTg0MDI4NWI0MQ==",
    "commit": {
      "author": {
        "name": "Gyuho Lee",
        "email": "leegyuho@amazon.com",
        "date": "2021-07-01T16:12:30Z"
      },
      "committer": {
        "name": "GitHub",
        "email": "noreply@github.com",
        "date": "2021-07-01T16:12:30Z"
      },
      "message": "Merge pull request #13170 from gyuho/maintainers\n\nREADME: explain \"MAINTAINERS\"",
      "tree": {
        "sha": "7f103e4573a79f22dbcc21304ad22b50027ff0f1",
        "url": "https://api.github.com/repos/etcd-io/etcd/git/trees/7f103e4573a79f22dbcc21304ad22b50027ff0f1"
      },
      "url": "https://api.github.com/repos/etcd-io/etcd/git/commits/57a489670474bffc47762372a6f54ca840285b41",
      "comment_count": 0,
      "verification": {
        "verified": true,
        "reason": "valid",
        "signature": "-----BEGIN PGP SIGNATURE-----\n\nwsBcBAABCAAQBQJg3eluCRBK7hj4Ov3rIwAA3XQIAF2zKc4W0JxNStWPrwWHcX+w\nmnAP2h03DMD+LMQNAI2T0UBrLWQRDRwukSG2ci8XIlIPlZhOE4NaV3ibp88jHgfU\n4XjBAUueaiLoImB2S+h4Db5IS2WU0Qlqjj5eQ8qPWjhi9f5dY1uqC6ODUTQfDsb3\nFZObyUDrhGm1BmGPHnnMWhztzZH7eU+HqJmyiF2+/Bd7NZLVDNty3RU2cmtdo9Jf\nGvAUtnF6+rEFpnv3F6wpEJ5OFWvEdf9w/oMYEpwcuh3mYBeothxG/8S8ztAQsvsO\nP3dzDxiLhzepyznGbuNqQdaN1VISXtWDRFHFl0LH8VCIneer6QltJX1ddf+V+o8=\n=IL2D\n-----END PGP SIGNATURE-----\n",
        "payload": "tree 7f103e4573a79f22dbcc21304ad22b50027ff0f1\nparent 40da254d687abfd3561f3cd9a0e3ef47afc5dadf\nparent 1b84b5e8dfd5fb0f29963d5e3f53a6f813619996\nauthor Gyuho Lee <leegyuho@amazon.com> 1625155950 -0700\ncommitter GitHub <noreply@github.com> 1625155950 -0700\n\nMerge pull request #13170 from gyuho/maintainers\n\nREADME: explain \"MAINTAINERS\""
      }
    },
    "url": "https://api.github.com/repos/etcd-io/etcd/commits/57a489670474bffc47762372a6f54ca840285b41",
    "html_url": "https://github.com/etcd-io/etcd/commit/57a489670474bffc47762372a6f54ca840285b41",
    "comments_url": "https://api.github.com/repos/etcd-io/etcd/commits/57a489670474bffc47762372a6f54ca840285b41/comments",
    "author": {
      "login": "gyuho",
      "id": 6799218,
      "node_id": "MDQ6VXNlcjY3OTkyMTg=",
      "avatar_url": "https://avatars.githubusercontent.com/u/6799218?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/gyuho",
      "html_url": "https://github.com/gyuho",
      "followers_url": "https://api.github.com/users/gyuho/followers",
      "following_url": "https://api.github.com/users/gyuho/following{/other_user}",
      "gists_url": "https://api.github.com/users/gyuho/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/gyuho/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/gyuho/subscriptions",
      "organizations_url": "https://api.github.com/users/gyuho/orgs",
      "repos_url": "https://api.github.com/users/gyuho/repos",
      "events_url": "https://api.github.com/users/gyuho/events{/privacy}",
      "received_events_url": "https://api.github.com/users/gyuho/received_events",
      "type": "User",
      "site_admin": false
    },

...
```

Commits don't seem to have much info I guess

I'm checking docs now, to be able to get data that we have here -

https://github.com/etcd-io/etcd/commits/main - commits with CI/CD run status - green or red - considering all workflows and jobs put together as a whole

https://docs.github.com/en/rest/reference/actions

Sounds interesting - 

https://docs.github.com/en/rest/reference/checks#list-check-runs-for-a-git-reference

Maybe I could use graphql to get it like a graph instead of making multiple API calls? Hmm

https://duckduckgo.com/?t=ffab&q=github+graphql&ia=web

https://graphql.github.com/

https://docs.github.com/en/graphql

https://docs.github.com/en/graphql/overview

https://docs.github.com/en/graphql/reference

https://docs.github.com/en/graphql/reference/objects

https://docs.github.com/en/graphql/reference/objects#commit

https://docs.github.com/en/graphql/reference/objects#status

https://docs.github.com/en/graphql/reference/objects#statuscheckrollupcontextconnection

https://docs.github.com/en/graphql/reference/enums#statusstate

https://docs.github.com/en/graphql/reference/interfaces#gitobject

https://docs.github.com/en/graphql/reference/interfaces#node

https://docs.github.com/en/graphql/reference/objects#repository

https://duckduckgo.com/?t=ffab&q=list+repo+commits+with+github+graphql+api&ia=web

http://stackoverflow.com/questions/48285888/ddg#48286191

https://docs.github.com/en/graphql/reference/objects#statuscheckrollup

I think I got what I was looking for. I think it was this -

```
Represents the rollup for both the check runs and status for a commit.
```

```
Check and Status rollup information for this commit.
```

`StatusCheckRollup`

```
{
  repository(owner: "etcd-io", name: "etcd") {
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 10) {
            edges {
              node {
                ... on Commit {
                  commitUrl
                  statusCheckRollup {
                    state
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

Gives an output like

```json
{
  "data": {
    "repository": {
      "defaultBranchRef": {
        "target": {
          "history": {
            "edges": [
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/57a489670474bffc47762372a6f54ca840285b41",
                  "statusCheckRollup": {
                    "state": "FAILURE"
                  }
                }
              },
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/1b84b5e8dfd5fb0f29963d5e3f53a6f813619996",
                  "statusCheckRollup": {
                    "state": "FAILURE"
                  }
                }
              },
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/40da254d687abfd3561f3cd9a0e3ef47afc5dadf",
                  "statusCheckRollup": {
                    "state": "FAILURE"
                  }
                }
              },
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/7271adecc593412258698f402c9da78def5fe106",
                  "statusCheckRollup": {
                    "state": "SUCCESS"
                  }
                }
              },
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/0d0b6f06fa36cabd440efda19a6023b11f139a84",
                  "statusCheckRollup": {
                    "state": "SUCCESS"
                  }
                }
              },
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/2fb919bef908f4cdf9a841a7d9494614566335e0",
                  "statusCheckRollup": {
                    "state": "SUCCESS"
                  }
                }
              },
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/a6317392f4e436402e4d6fed8620619e286d6f73",
                  "statusCheckRollup": {
                    "state": "SUCCESS"
                  }
                }
              },
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/86f68b9374a8b0393745cdb1b5bebb858bee63b7",
                  "statusCheckRollup": {
                    "state": "SUCCESS"
                  }
                }
              },
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/164a1c80f00c49a499f12908059dd9efc15dd758",
                  "statusCheckRollup": {
                    "state": "SUCCESS"
                  }
                }
              },
              {
                "node": {
                  "commitUrl": "https://github.com/etcd-io/etcd/commit/6ef7629ec69734679c0d040f3b279e7e7ac12b33",
                  "statusCheckRollup": {
                    "state": "FAILURE"
                  }
                }
              }
            ]
          }
        }
      }
    }
  }
}
```

Which is pretty cool! :D

For last 100 commits it would be like 

```
{
  repository(owner: "etcd-io", name: "etcd") {
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 100) {
            edges {
              node {
                ... on Commit {
                  commitUrl
                  statusCheckRollup {
                    state
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#the-graphql-endpoint

messed up with some JSON stuff I guess

```bash
$ ./find-flaky-tests-data.sh 
{
  "message": "Problems parsing JSON",
  "documentation_url": "https://docs.github.com/graphql"
}
```

```bash
#!/bin/bash

curl -H "Authorization: token $GITHUB_TOKEN" \
    -X POST \
    -d '{
  repository(owner: "etcd-io", name: "etcd") {
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 100) {
            edges {
              node {
                ... on Commit {
                  commitUrl
                  statusCheckRollup {
                    state
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}' \
    https://api.github.com/graphql
```

Gotta fix that with lot of double quotes now

https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#communicating-with-graphql

https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#example-query

```bash
#!/bin/bash

curl -H "Authorization: token $GITHUB_TOKEN" \
    -X POST \
    -d '{
    "query": "repository: (owner: \"etcd-io\", name: \"etcd\") { defaultBranchRef { target { ... on Commit { history(first: 10) { edges { node { ... on Commit { commitUrl statusCheckRollup { state } } } } } } } } }"
}' \
    https://api.github.com/graphql

```

```bash
$ ./find-flaky-tests-data.sh 
{"errors":[{"message":"Parse error on \"repository\" (IDENTIFIER) at [1, 1]","locations":[{"line":1,"column":1}]}]}
```

Gonna sleep and continue on this later :P I need to understand how to put in the graphql query in the POST body

```bash
#!/bin/bash

curl -H "Authorization: token $GITHUB_TOKEN" \
    -X POST \
    -d "\
{ \
    \"query\": \"query { repository(owner: \"etcd-io\", name: \"etcd\") { defaultBranchRef { target { ... on Commit { history(first: 10) { edges { node { ... on Commit { commitUrl \n statusCheckRollup { state } } } } } } } } } }\" \
} \
" \
    https://api.github.com/graphql

```

https://duckduckgo.com/?t=ffab&q=graphql+github+api+curl&ia=web

http://stackoverflow.com/questions/42021113/ddg#42021388


```bash
#!/bin/bash

curl -H "Authorization: token $GITHUB_TOKEN" \
    -X POST \
    -d '{
    "query": "query { repository: (owner: \"etcd-io\", name: \"etcd\") { defaultBranchRef { target { ... on Commit { history(first: 10) { edges { node { ... on Commit { commitUrl statusCheckRollup { state } } } } } } } } } }"
}' \
    https://api.github.com/graphql

```

```bash
$ ./find-flaky-tests-data.sh 
{"errors":[{"message":"Parse error on \"(\" (LPAREN) at [1, 21]","locations":[{"line":1,"column":21}]}]}
```

```bash
#!/bin/bash

curl -H "Authorization: token $GITHUB_TOKEN" \
    -X POST \
    -d '{
    "query": "query { repository(owner: \"etcd-io\", name: \"etcd\") { defaultBranchRef { target { ... on Commit { history(first: 10) { edges { node { ... on Commit { commitUrl statusCheckRollup { state } } } } } } } } } }"
}' \
    https://api.github.com/graphql

```

```bash
$ ./find-flaky-tests-data.sh 
{"data":{"repository":{"defaultBranchRef":{"target":{"history":{"edges":[{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/57a489670474bffc47762372a6f54ca840285b41","statusCheckRollup":{"state":"FAILURE"}}},{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/1b84b5e8dfd5fb0f29963d5e3f53a6f813619996","statusCheckRollup":{"state":"FAILURE"}}},{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/40da254d687abfd3561f3cd9a0e3ef47afc5dadf","statusCheckRollup":{"state":"FAILURE"}}},{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/7271adecc593412258698f402c9da78def5fe106","statusCheckRollup":{"state":"SUCCESS"}}},{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/0d0b6f06fa36cabd440efda19a6023b11f139a84","statusCheckRollup":{"state":"SUCCESS"}}},{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/2fb919bef908f4cdf9a841a7d9494614566335e0","statusCheckRollup":{"state":"SUCCESS"}}},{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/a6317392f4e436402e4d6fed8620619e286d6f73","statusCheckRollup":{"state":"SUCCESS"}}},{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/86f68b9374a8b0393745cdb1b5bebb858bee63b7","statusCheckRollup":{"state":"SUCCESS"}}},{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/164a1c80f00c49a499f12908059dd9efc15dd758","statusCheckRollup":{"state":"SUCCESS"}}},{"node":{"commitUrl":"https://github.com/etcd-io/etcd/commit/6ef7629ec69734679c0d040f3b279e7e7ac12b33","statusCheckRollup":{"state":"FAILURE"}}}]}}}}}}
```

WOW! That just worked!! :D

```bash
$ ./find-flaky-tests-data.sh 
$ cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges' | less
```

```bash
$ cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges[] | .node' | less
```

```bash
$ cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges[] | .node' | jq -s
```

https://duckduckgo.com/?t=ffab&q=jq+manual&ia=web

https://stedolan.github.io/jq/manual/

I need to count the number of successes and failures :P

Or I could just write a Golang program and loop through it, hmm :)

```
reduce .[] as $item (0; . + $item)
```

https://stedolan.github.io/jq/manual/#ConditionalsandComparisons

```bash
 cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges | reduce .[]'
jq: error: syntax error, unexpected $end, expecting FIELD or as or '.' or '[' (Unix shell quoting issues?) at <top-level>, line 1:
.data.repository.defaultBranchRef.target.history.edges | reduce .[]                                                                  
jq: 1 compile error
 ✘  issue-13167  main ✘  $ cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.state=="SUCCESS" then . + 1 end)'
jq: error: syntax error, unexpected end (Unix shell quoting issues?) at <top-level>, line 1:
.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.state=="SUCCESS" then . + 1 end)                                                                                                                      
jq: error: Possibly unterminated 'if' statement at <top-level>, line 1:
.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.state=="SUCCESS" then . + 1 end)                                                                                 
jq: 2 compile errors
 ✘  issue-13167  main ✘  $ cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.state == "SUCCESS" then . + 1 end)'
jq: error: syntax error, unexpected end (Unix shell quoting issues?) at <top-level>, line 1:
.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.state == "SUCCESS" then . + 1 end)                                                                                                                        
jq: error: Possibly unterminated 'if' statement at <top-level>, line 1:
.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.state == "SUCCESS" then . + 1 end)                                                                                 
jq: 2 compile errors
 ✘  issue-13167  main ✘  $ cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.state == "SUCCESS" then (. + 1) end)'
jq: error: syntax error, unexpected end (Unix shell quoting issues?) at <top-level>, line 1:
.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.state == "SUCCESS" then (. + 1) end)                                                                                                                          
jq: error: Possibly unterminated 'if' statement at <top-level>, line 1:
.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.state == "SUCCESS" then (. + 1) end)                                                                                 
jq: 2 compile errors
```

```bash
$ cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.statusCheckRollup.state == "SUCCESS" then (. + 1) end)'
jq: error: syntax error, unexpected end (Unix shell quoting issues?) at <top-level>, line 1:
.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.statusCheckRollup.state == "SUCCESS" then (. + 1) end)                                                                                                                                            
jq: error: Possibly unterminated 'if' statement at <top-level>, line 1:
.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.statusCheckRollup.state == "SUCCESS" then (. + 1) end)                                                                                 
jq: 2 compile errors
```

```bash
$ cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if .node.statusCheckRollup.state == "SUCCESS" then (. + 1) else . end)'
jq: error (at <stdin>:796): Cannot index number with string "node"
```

```bash
$ cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if $item.node.statusCheckRollup.state == "SUCCESS" then (. + 1) else . end)'
58
```

And THAT is the right value :D :D

So, 58% success, hmm

---

I need to do some math for finding the difference in case I'm finding successes.

or I could find number of failures and I know the total commits is 100, so just the number of failures
would be the percentage

But if I find number of successes alone and have total, or have a total other than 100, then I need to find

failure percentage = (number of failures / total number of runs) * 100

For `number of failures`, it's directly the number if we have it or if we have `number of successes`, then

number of failures = total number of runs - number of successes

https://duckduckgo.com/?t=ffab&q=maths+in+bash&ia=web

https://www.shell-tips.com/bash/math-arithmetic-calculation/

There are some ways to do math ;) :D

I'm gonna start with the easiest thing! :D

---

Things to note -
- A check for checking if the GitHub Token environment variable is set has been done
- We can't have verbose logging with `set -x` as that exposes the GitHub tokens which is part of the curl code or the token existence check code
- We have added `-Ss` options for curl for showing error and for being silent
- We have also added `-f` for failing curl when things go wrong in the http request
- We have expanded all the options actually - `--fail --show-error --silent` to keep it clear

---

TODO:
- Show the error percentage in a echo / print statement
- Can we make the POST request body more neat? Hmm

---

Questions
- Should we consider commits that don't have any status (multiple commits in a PR)? That is they have null status. Should we count them as part of the last 100 commits? The 100 commits currently have three statuses - success, null, failure. We count failures and then do calculation say that's the percentage, though it assumes that the ones with null are all runs and are all successes

---

https://duckduckgo.com/?t=ffab&q=bash+pipe+failures&ia=web&iax=qa

http://stackoverflow.com/questions/32684119/ddg#32684221

---

PR Description:

This PR is a part of the fix for the issue #13167

## What this PR does -
It tries to get the last 100 etcd commits and their commit status data from the GitHub GraphQL API and count the number of failures and shows the failure percentage

It uses the following tools
- bash
- curl
- cat
- jq

## What this PR does not do -

- This PR does not introduce any GitHub Actions Workflow to run the script automatically weekly once as mentioned in #13167 . Let me know if we need to do it as part of this PR, I could add a GitHub Action Workflow config Yaml for it with cron schedule
- This PR does **not** analyze PRs of the commits with failure status and identify flaky tests

## Secrets

This PR introduces a script which needs a GitHub Token to access the GitHub API and get etcd repo commit data

## Documentation

This script does not have any documentation as of now. Let me know if I need to add any details in some docs. Like what it does, it's purpose in some README and any other details

## Questions
- Should we consider commits that don't have any status (multiple commits in a PR)? That is they have null status. Should we count them as part of the last 100 commits? The 100 commits currently have three statuses - success, null, failure. We count failures and then do calculation and say that's the percentage, so it assumes that the ones with null are all successes
- Should we add documentation for this script? If yes, where should we add it?
- Should we parameterize the number of commits we want to choose from the history? Currently it's hard coded as 100 last commits
- Does the script name look okay? Let me know if I need to change it
- The script creates a JSON file to dump all the GitHub API data about the repo commits and then does processing on it. Is that okay? Also, I have git ignored that file too
- Does the message `Commit status failure percentage is 31 %` make sense? Or we want to give some other message talking about test flayness directly?
- Is the commit message okay?
- I put `Fixes #13167` in the commit message but this is only part of fixing #13167. I think it might close #13167 with the merge of this PR. If it does, we can reopen the issue, yeah?

---

Commit message:

scripts: add script to measure percentage of commits with failed status

This is to start measuring the test flakyness and see the numbers improving once we improve and deflake flaky tests

Fixes #13167

---

I'm going to use `mktemp` and store the json file in a `/tmp` directory

```bash
 issues-info  main ✔  $ mktemp 
/var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.u0Kilg5u
$ mktemp -h
mktemp: illegal option -- h
usage: mktemp [-d] [-q] [-t prefix] [-u] template ...
       mktemp [-d] [-q] [-u] -t prefix 
 ✘ $ ls /var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.u0Kilg5u
/var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.u0Kilg5u
$ ls /var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.u0Kilg5u 
/var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.u0Kilg5u
$ ls -al /var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.u0Kilg5u 
-rw-------  1 karuppiahn  staff  0 Jul  6 20:28 /var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.u0Kilg5u
$ cat /var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.u0Kilg5u 
$ man mktemp
$ mktemp -d
/var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.YjgAI02u
$ ls -alh /var/folders/fg/55xcrj215gs2n9gnpz4077y40000gq/T/tmp.YjgAI02u
total 0
drwx------   2 karuppiahn  staff    64B Jul  6 20:29 .
drwx------@ 86 karuppiahn  staff   2.7K Jul  6 20:29 ..
$ 
```

Okay, I fixed the bash script to use `/tmp` directory to store the temporary json file ;) :D

---

https://crontab.guru/#0_0_*_*_0

---

Commit message:

workflow: add workflow to invoke script that measures percentage of commits with failed status
    
The workflow runs on a cron schedule

Fixes #13167

---

The script currently looks like this - 

```bash
$ ./scripts/measure-test-flakiness.sh 
Commit status failure percentage is - 30 %
```

Should we add a `make` target in the `Makefile` for running this? And use that in the GitHub Action Workflow config?
