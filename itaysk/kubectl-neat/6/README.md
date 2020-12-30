# Issue 6

https://github.com/itaysk/kubectl-neat/issues/6

I have raised a PR for now. It just releases to Windows. I have to run the test
in windows environment too in the CI. May be the release can be done only after
the tests pass in both linux and windows? Currently the make file invokes
goreleaser to release the artifacts
