#!/bin/bash

curl -H "Authorization: token $GITHUB_TOKEN" \
    -X POST \
    -d '{
    "query": "query { repository(owner: \"etcd-io\", name: \"etcd\") { defaultBranchRef { target { ... on Commit { history(first: 100) { edges { node { ... on Commit { commitUrl statusCheckRollup { state } } } } } } } } } }"
}' \
    https://api.github.com/graphql | jq . > commit-and-check-data.json

cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if $item.node.statusCheckRollup.state == "SUCCESS" then (. + 1) else . end)'
