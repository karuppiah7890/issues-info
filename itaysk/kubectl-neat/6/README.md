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

---

https://duckduckgo.com/?t=ffab&q=running+bash+script+in+windows&ia=web

https://techviral.net/run-bash-windows-10/

https://stackoverflow.com/questions/6413377/is-there-a-way-to-run-bash-scripts-on-windows

https://www.howtogeek.com/261591/how-to-create-and-run-bash-shell-scripts-on-windows-10/

---

https://duckduckgo.com/?q=running+bash+script+in+windows+server+2019&t=ffab&ia=web

---

https://duckduckgo.com/?t=ffab&q=bash+script+arguments&ia=web

---

https://golang.org/ref/mod#module-path

---

https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun

---

https://duckduckgo.com/?t=ffab&q=golang+windows%3A+exec+file+does+not+exist&ia=web

https://github.com/golang/go/issues/6224

https://duckduckgo.com/?t=ffab&q=windows+PATHEXT&ia=web

---

https://duckduckgo.com/?t=ffab&q=file+links+in+git+in+linux+and+windows&ia=web

https://duckduckgo.com/?t=ffab&q=linux+symbolic+link&ia=web

https://linuxhandbook.com/symbolic-link-linux/

https://linuxhandbook.com/hard-link/

https://www.howtogeek.com/287014/how-to-create-and-use-symbolic-links-aka-symlinks-on-linux/

---

https://duckduckgo.com/?t=ffab&q=github+actions+windows+environment&ia=web

https://github.com/actions/virtual-environments

https://github.com/actions/virtual-environments/blob/main/images/win/Windows2019-Readme.md

---

https://duckduckgo.com/?t=ffab&q=run+bash+scripts+in+mingw+in+windows

https://duckduckgo.com/?t=ffab&q=run+bash+scripts+in+mingw+in+windows&ia=web&iax=qa

---

https://medium.com/@rkttu/write-your-github-actions-workflow-for-build-windows-application-94e5a989f477

---

https://duckduckgo.com/?q=run+bash+scripts+in+github+actions+in+windows&t=ffab&ia=web

https://duckduckgo.com/?q=github+actions+bash+script+windows&t=ffab&ia=web

https://github.community/t/how-to-make-the-script-executable-on-windows-to-proceed-the-github-actions-lab-course/13295/15

https://github.community/t/how-to-execute-a-script-file-using-github-action/16830/4

---

https://duckduckgo.com/?t=ffab&q=bash+script+in+windows&ia=web

---

https://duckduckgo.com/?q=github+actions+windows%3A+No+application+is+associated+with+the+specified+file+for+this&t=ffab&ia=web

https://stackoverflow.com/questions/21032151/no-application-is-associated-with-the-specified-file-for-this-operation-vb-net

https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell

---

https://duckduckgo.com/?q=windows+server%3A+No+application+is+associated+with+the+specified+file+for+this&t=ffab&ia=web&iax=qa

https://stackoverflow.com/questions/51806352/no-application-is-associated-with-the-specified-file-for-this-operation-exceptio

https://social.msdn.microsoft.com/Forums/windows/en-US/c2a5dc79-d384-490a-8c2c-2a0ae12fc342/no-application-is-associated-with-the-specified-file-for-this-operation

---

https://duckduckgo.com/?t=ffab&q=bash+script+extension+in+windows&ia=web&iax=qa

https://duckduckgo.com/?t=ffab&q=golang+exec+command+shell&ia=web

---

https://duckduckgo.com/?t=ffab&q=convert+bash+script+to+batch&ia=web

https://stackoverflow.com/questions/26190258/batch-to-bash-shell-script-converter

https://stackoverflow.com/questions/3200018/how-do-i-convert-a-bash-shell-script-to-a-bat-file

https://github.com/daniel-sc/bash-shell-to-bat-converter

https://batsh.org/
https://github.com/batsh-dev-team/Batsh

---

https://duckduckgo.com/?t=ffab&q=generator+for+bash+and+bat&ia=web

https://stackoverflow.com/questions/25834277/executing-a-bash-script-from-golang

https://duckduckgo.com/?t=ffab&q=run+go+build+from+go+code&ia=web

---

https://pkg.go.dev/strings?utm_source=gopls#Join

---

https://gist.github.com/posener/73ffd326d88483df6b1cb66e8ed1e0bd

---

https://duckduckgo.com/?t=ffab&q=bash+alternative+in+windows&ia=web

---

https://www.tutorialspoint.com/powershell/powershell_special_variables.htm

$ARGS in powershell
