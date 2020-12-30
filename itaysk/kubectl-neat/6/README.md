# Issue 6

https://github.com/itaysk/kubectl-neat/issues/6

I have raised a PR for now. It just releases to Windows. I have to run the test
in windows environment too in the CI. May be the release can be done only after
the tests pass in both linux and windows? Currently the make file invokes
goreleaser to release the artifacts

https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions

```
No runner matching the specified labels was found: ubuntu-latest, windows-latest
```

```yaml
name: CI
on: 
  push:
    branches:
      - main
      - master
  pull_request:
jobs:

  build:
    name: build
    runs-on: [ubuntu-latest, windows-latest]
    steps:

      - name: Setup Go
        uses: actions/setup-go@v1
        with:
          go-version: 1.12
        id: go

      - name: Check out code
        uses: actions/checkout@v1

      - name: Check gofmt
        run: test -z "$(gofmt -s -d .)"
      
      - name: Build
        run: make build

      - name: Test
        run: make test-unit
```

So, that was wrong. Hmm

https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#example-running-with-more-than-one-operating-system

```yaml
name: CI
on: 
  push:
    branches:
      - main
      - master
  pull_request:
jobs:

  build:
    name: build
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
    steps:

      - name: Setup Go
        uses: actions/setup-go@v1
        with:
          go-version: 1.12
        id: go

      - name: Check out code
        uses: actions/checkout@v1

      - name: Check gofmt
        run: test -z "$(gofmt -s -d .)"
      
      - name: Build
        run: make build

      - name: Test
        run: make test-unit
```

It worked this time, but the CI job failed

```
Run test -z "$(gofmt -s -d .)"
  test -z "$(gofmt -s -d .)"
  shell: C:\Program Files\PowerShell\7\pwsh.EXE -command ". '{0}'"
  env:
    GOROOT: C:\hostedtoolcache\windows\go\1.12.17\x64
ResourceUnavailable: D:\a\_temp\de55254d-8aa3-4bec-bf59-2ee110b89294.ps1:2
Line |
   2 |  test -z "$(gofmt -s -d .)"
     |             ~~~~~~~~~~~~~
     | Program 'test.exe' failed to run: The filename or extension is too long.At
     | D:\a\_temp\de55254d-8aa3-4bec-bf59-2ee110b89294.ps1:2 char:1 + test -z "$(gofmt -s -d .)" +
     | ~~~~~~~~~~~~~~~~~~~~~~~~~~.

Error: Process completed with exit code 1.
```

I don't think `test` is a command available in windows. Hmm.

https://duckduckgo.com/?t=ffab&q=test+command+in+windows&ia=web

https://duckduckgo.com/?t=ffab&q=fail+when+go+format&ia=web

https://duckduckgo.com/?q=fail+when+golang+format&t=ffab&ia=web

https://duckduckgo.com/?t=ffab&q=gofmt+check&ia=web

https://github.com/marketplace/actions/check-code-formatting-using-gofmt

https://github.com/Jerome1337/gofmt-action

https://seesparkbox.com/foundry/go_vet_gofmt_golint_to_code_check_in_Go

https://stackoverflow.com/questions/47735678/goland-how-to-use-gofmt

https://duckduckgo.com/?t=ffab&q=shell+script+for+windows&ia=web

https://www.howtogeek.com/261591/how-to-create-and-run-bash-shell-scripts-on-windows-10/

---

https://www.computerhope.com/unix/test.htm

---

https://duckduckgo.com/?t=ffab&q=windows+server+2019+scripts&ia=web

---

Maybe we don't need to run format twice. We can just compile and test twice -
in ubuntu and windows. That's enough. Even that, we can try to run build in
ubuntu itself, in a cross platform manner.

https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsif

https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions

```
Run make build
  make build
  shell: C:\Program Files\PowerShell\7\pwsh.EXE -command ". '{0}'"
  env:
    GOROOT: C:\hostedtoolcache\windows\go\1.12.17\x64
GOOS=mingw64_nt-10.0-17763 go build -o dist/kubectl-neat_mingw64_nt-10.0-17763
cmd/go: unsupported GOOS/GOARCH pair mingw64_nt-10.0-17763/amd64
Error: mingw32-make: *** [Makefile:28: dist/kubectl-neat_mingw64_nt-10.0-17763] Error 2
Error: Process completed with exit code 1.
```

---

https://duckduckgo.com/?q=test+command+in+windows+like+linux&t=ffab&ia=web

https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions#contexts

https://duckduckgo.com/?q=cross+testing+golang&t=ffab&ia=web

---

```bash
go: error loading module requirements
```

https://duckduckgo.com/?t=ffab&q=go%3A+error+loading+module+requirements&ia=web

---

https://duckduckgo.com/?t=ffab&q=bats+github&ia=web

https://github.com/sstephenson/bats (original)

https://github.com/bats-core/bats-core (fork)

https://duckduckgo.com/?t=ffab&q=github+actions+bats&ia=web

https://github.com/mig4/setup-bats

https://github.com/marketplace/actions/setup-bats-testing-framework

---

```bash
Error:     cmd_test.go:186: error assertion: have: &errors.errorString{s:"Error invoking kubectl as [..\\test\\kubectl-stub get -o json pods] exec: \"..\\\\test\\\\kubectl-stub\": file does not exist"}
        test case: {[pods] 0x10a8990 apiVersion }
Error:     cmd_test.go:189: stdout assertion: have: 
        want: apiVersion
        test case: {[pods] 0x10a8990 apiVersion }
Error:     cmd_test.go:186: error assertion: have: &errors.errorString{s:"Error invoking kubectl as [..\\test\\kubectl-stub get -o json pods mypod] exec: \"..\\\\test\\\\kubectl-stub\": file does not exist"}
        test case: {[pods mypod] 0x10a8990 apiVersion }
Error:     cmd_test.go:189: stdout assertion: have: 
        want: apiVersion
        test case: {[pods mypod] 0x10a8990 apiVersion }
Error:     cmd_test.go:186: error assertion: have: &errors.errorString{s:"Error invoking kubectl as [..\\test\\kubectl-stub get -o json pods mypod -o yaml] exec: \"..\\\\test\\\\kubectl-stub\": file does not exist"}
        test case: {[pods mypod -o yaml] 0x10a8990 apiVersion }
Error:     cmd_test.go:189: stdout assertion: have: 
        want: apiVersion
        test case: {[pods mypod -o yaml] 0x10a8990 apiVersion }
Error:     cmd_test.go:186: error assertion: have: &errors.errorString{s:"Error invoking kubectl as [..\\test\\kubectl-stub get -o json pods mypod -o json] exec: \"..\\\\test\\\\kubectl-stub\": file does not exist"}
        test case: {[pods mypod -o json] 0x10a8990 apiVersion }
Error:     cmd_test.go:189: stdout assertion: have: 
        want: apiVersion
        test case: {[pods mypod -o json] 0x10a8990 apiVersion }
```

https://duckduckgo.com/?t=ffab&q=windows+execute+command&ia=web

https://duckduckgo.com/?q=golang%3A+windows+execute+command&t=ffab&ia=web

https://tutorialedge.net/golang/executing-system-commands-with-golang/

https://stackoverflow.com/questions/13008255/how-to-execute-a-simple-windows-command-in-golang

http://zetcode.com/golang/exec-command/

https://medium.com/rungo/executing-shell-commands-script-files-and-executables-in-go-894814f1c0f7

---

https://duckduckgo.com/?t=ffab&q=golang+windows%3A+exec+file+does+not+exist&ia=web

https://stackoverflow.com/questions/60023400/why-is-my-golang-program-having-this-error-exec-lib-synonyms-file-does-not

```go
executable, err := os.Executable()
	if err != nil {
		t.Errorf("could not get path to executable: %v", err)
	}
	executableDir := filepath.Dir(executable);
  kubectl = filepath.Join(executableDir, "test", "kubectl-stub")
```

That didn't work. That ran the script from the temp directory. Hmm

https://duckduckgo.com/?q=golang%3A+execute+command+in+windows&t=ffab&ia=web

https://golang.org/pkg/os/exec/

---

modules issue that occurred before 
https://duckduckgo.com/?q=windows%3A+go%3A+error+loading+module+requirements&t=ffab&ia=web

---

https://duckduckgo.com/?t=ffab&q=golang%3A+windows+execute+bash+scripts+in+tests&ia=web

https://duckduckgo.com/?t=ffab&q=golang+windows%3A+exec.Command+file+not+found&ia=web

https://duckduckgo.com/?t=ffab&q=golang%3A+get+absolute+path+of+current+test&ia=web

https://stackoverflow.com/questions/47261719/how-can-i-resolve-a-relative-path-to-absolute-path-in-golang

https://golangbot.com/read-files/

https://duckduckgo.com/?q=golang%3A+get+absolute+path+of+current+file&t=ffab&ia=web

https://duckduckgo.com/?q=golang%3A+get+absolute+path+of+current+file&t=ffab&ia=web&iax=qa

https://ispycode.com/GO/Path-and-Filepath/Absolute-path-from-relative-path


