# Issue 39

https://github.com/itaysk/kubectl-neat/issues/39

https://twitter.com/Aguay_val/status/1287298579355381760

---

I have forked the repo in github
I have cloned the repo in local

I have run the build and it works
I ran test (unit and e2e), but e2e test failed. Trying e2e separately now

I checked the code a bit - there's root command and another get command.

I think I'll start with root command first.

I started reading the code a bit and skimming it. Noticed that the error from
the reading of standard input is not handled properly.

E2E tests pass separately. But when I do this alone, it fails

```bash
$ bats ./test/e2e-kubectl.bats
 ✗ plugin - json
   (in test file test/e2e-kubectl.bats, line 22)
     `[ "$status" -eq 0 ]' failed
 ✗ plugin - yaml
   (in test file test/e2e-kubectl.bats, line 28)
     `[ "$status" -eq 0 ]' failed

```

Have to check what that is later. Hmm.

Anyways, let's get back to this thing. Some tasks to do

- Add flag for `--color`. Is it okay to have `color` or have `colour` too? Hmm
- Check `yh` package. There seems to be a `highlight` sub package in it
- Import `yh` package. Seems like that's the only Golang package for yaml
  syntax highlighting.
- Check how to highlight with `yh` only when `color` is enabled :)
- Check the output
- Think about how to test this feature
  - Check how existing tests are done - unit tests
  - Check e2e tests

https://pkg.go.dev/github.com/andreazorzetto/yh

https://pkg.go.dev/github.com/andreazorzetto/yh#section-documentation

https://pkg.go.dev/github.com/andreazorzetto/yh@v0.4.0/highlight

https://github.com/andreazorzetto/yh/blob/v0.4.0/highlight/highlight.go

https://pkg.go.dev/github.com/andreazorzetto/yh@v0.4.0/highlight#Highlight

So, `Highlight` is the function to use :)

Since YAML is a superset of JSON, I think it can highlight both YAML and JSON
which is supported by Kubectl Neat! :D

```go.mod
# go.mod
github.com/andreazorzetto/yh v0.4.0
```

https://duckduckgo.com/?t=ffab&q=golang+bytes+to+reader&ia=web

http://stackoverflow.com/questions/29746123/ddg#29747410

```go
r := bytes.NewReader(byteData)
```

I finally raised a PR asking for feedback. I need to add tests to start off with

---

Writing tests to check if color shows up :)

https://duckduckgo.com/?q=print+text+in+red+color+in+bash&t=ffab&ia=web&iax=qa

It's done now :D

---

Checking alternate syntax highlighting packages in Golang

https://duckduckgo.com/?t=ffab&q=golang+yaml+syntax+highlight&ia=web

https://github.com/alecthomas/chroma - generic with YAML support

https://github.com/zyedidia/highlight

https://github.com/andreazorzetto/yh - specifically for YAML which I had already tried out


---

Features we are looking for in the highlighter Golang package
- Of course it has to be a Golang package - written in Golang and we should be able to use it's package (library) with ease
- Support YAML and hence JSON too
- Support syntax highlight in CLI / Terminal UI - which means we need ANSI colors


ANSI colors -

https://duckduckgo.com/?t=ffab&q=terminal+ansi+colors&ia=web

https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences#4842446

https://stackoverflow.com/a/33206814/4772008

---

[TODO]
- Check Chroma library and try it out
- Incorporate the changes from the maintainer
- Run everything and check once manually
- Check if we can add some basic tests
- Push all changes to the PR branch
- Convert draft PR to ready for review PR and ask to review
- Ask any questions that you have
  - Commit message
  - No of commits
  - code
  - etc
