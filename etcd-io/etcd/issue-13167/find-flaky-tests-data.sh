#!/bin/bash

set -e
set -o pipefail

if [[ -z ${GITHUB_TOKEN} ]]
then
    echo "Please set the \$GITHUB_TOKEN environment variable for the script to work"
    exit 1
fi

curl --fail --show-error --silent -H "Authorization: token ${GITHUB_TOKEN}" \
    -X POST \
    -d '{
    "query": "query { repository(owner: \"etcd-io\", name: \"etcd\") { defaultBranchRef { target { ... on Commit { history(first: 100) { edges { node { ... on Commit { commitUrl statusCheckRollup { state } } } } } } } } } }"
}' \
    https://api.github.com/graphql | jq . > commit-and-check-data.json

failure_percentage=$(cat commit-and-check-data.json | jq '.data.repository.defaultBranchRef.target.history.edges | reduce .[] as $item (0; if $item.node.statusCheckRollup.state == "FAILURE" then (. + 1) else . end)')

echo "Commit status failure percentage is - ${failure_percentage} %"
