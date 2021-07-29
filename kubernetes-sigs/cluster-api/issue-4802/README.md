https://github.com/kubernetes-sigs/cluster-api/issues/4802

```bash
$ cd /Users/karuppiahn/Library/Caches/Homebrew/clusterctl--git/$ pwd
/Users/karuppiahn/Library/Caches/Homebrew/clusterctl--git$ ls
CONTRIBUTING.md		Tiltfile		controlplane		main.go
Dockerfile		VERSIONING.md		docs			metadata.yaml
LICENSE			api			errors			netlify.toml
Makefile		bootstrap		exp			scripts
OWNERS			cloudbuild-nightly.yaml	feature			test
OWNERS_ALIASES		cloudbuild.yaml		go.mod			third_party
PROJECT			cmd			go.sum			tilt_modules
README.md		code-of-conduct.md	hack			util
REVIEWING.md		config			internal		version
SECURITY_CONTACTS	controllers		logos$ gst
Not currently on any branch.
nothing to commit, working tree clean$ make clusterctl
go build -ldflags "-X 'sigs.k8s.io/cluster-api/version.buildDate=2021-07-29T15:25:53Z' -X 'sigs.k8s.io/cluster-api/version.gitCommit=7f879be68d15737e335b6cb39d380d1d163e06e6' -X 'sigs.k8s.io/cluster-api/version.gitTreeState=clean' -X 'sigs.k8s.io/cluster-api/version.gitMajor=0' -X 'sigs.k8s.io/cluster-api/version.gitMinor=4' -X 'sigs.k8s.io/cluster-api/version.gitVersion=v0.4.0' -X 'sigs.k8s.io/cluster-api/version.gitReleaseCommit=7f879be68d15737e335b6cb39d380d1d163e06e6'" -o bin/clusterctl sigs.k8s.io/cluster-api/cmd/clusterctl$ ./bin/clusterctl version
clusterctl version: &version.Info{Major:"0", Minor:"4", GitVersion:"v0.4.0", GitCommit:"7f879be68d15737e335b6cb39d380d1d163e06e6", GitTreeState:"clean", BuildDate:"2021-07-29T15:25:53Z", GoVersion:"go1.16.6", Compiler:"gc", Platform:"darwin/amd64"}
```

```bash
karuppiahn-a01:homebrew-core karuppiahn$ gst
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   Formula/clusterctl.rb

no changes added to commit (use "git add" and/or "git commit -a")
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
karuppiahn-a01:homebrew-core karuppiahn$ brew remove clusterctl
Uninstalling /usr/local/Cellar/clusterctl/0.4.0... (5 files, 50.6MB)
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: Failed to load cask: Formula/clusterctl.rb
Cask 'clusterctl' is unreadable: wrong constant name #<Class:0x00007f9ffdaa0a38>
Warning: Treating Formula/clusterctl.rb as a formula.
==> Downloading /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api.git
curl: (3) URL using bad/illegal format or missing URL
Error: Failed to download resource "clusterctl"
Download failed: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api.git
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: Failed to load cask: Formula/clusterctl.rb
Cask 'clusterctl' is unreadable: wrong constant name #<Class:0x00007fd0360d8898>
Warning: Treating Formula/clusterctl.rb as a formula.
==> Downloading file:///Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api.git
curl: (37) Couldn't open file /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api.git
Error: Failed to download resource "clusterctl"
File does not exist: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api.git
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: Failed to load cask: Formula/clusterctl.rb
Cask 'clusterctl' is unreadable: wrong constant name #<Class:0x00007f7f561e07d0>
Warning: Treating Formula/clusterctl.rb as a formula.
==> Downloading file:///Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api

Error: SHA256 mismatch
Expected: af60c8aa1b21eccc7f272c0135ffaf1a8e0ecdffb4173075efac52509ce0eeb0
  Actual: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
    File: /Users/karuppiahn/Library/Caches/Homebrew/downloads/31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com
To retry an incomplete download, remove the file above.
karuppiahn-a01:homebrew-core karuppiahn$ ls /Users/karuppiahn/Library/Caches/Homebrew/downloads/31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com 
/Users/karuppiahn/Library/Caches/Homebrew/downloads/31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com
karuppiahn-a01:homebrew-core karuppiahn$ less /Users/karuppiahn/Library/Caches/Homebrew/downloads/31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com 
karuppiahn-a01:homebrew-core karuppiahn$ cat /Users/karuppiahn/Library/Caches/Homebrew/downloads/31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com 
karuppiahn-a01:homebrew-core karuppiahn$ rm -rfv /Users/karuppiahn/Library/Caches/Homebrew/downloads/31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com
/Users/karuppiahn/Library/Caches/Homebrew/downloads/31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: Failed to load cask: Formula/clusterctl.rb
Cask 'clusterctl' is unreadable: wrong constant name #<Class:0x00007f85cf87c740>
Warning: Treating Formula/clusterctl.rb as a formula.
==> Downloading file:///Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api

Warning: Cannot verify integrity of '31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com'.
No checksum was provided for this resource.
For your reference, the checksum is:
  sha256 "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
==> make clusterctl
Last 15 lines from /Users/karuppiahn/Library/Logs/Homebrew/clusterctl/01.make:
2021-07-29 21:06:16 +0530

make
clusterctl

make: *** No rule to make target `clusterctl'.  Stop.

Do not report this issue to Homebrew/brew or Homebrew/core!

Traceback (most recent call last):
	25: from /usr/local/Homebrew/Library/Homebrew/build.rb:229:in `<main>'
	24: from /usr/local/Homebrew/Library/Homebrew/build.rb:133:in `install'
	23: from /usr/local/Homebrew/Library/Homebrew/utils.rb:550:in `with_env'
	22: from /usr/local/Homebrew/Library/Homebrew/build.rb:138:in `block in install'
	21: from /usr/local/Homebrew/Library/Homebrew/formula.rb:1274:in `brew'
	20: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2394:in `stage'
	19: from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/forwardable.rb:230:in `stage'
	18: from /usr/local/Homebrew/Library/Homebrew/resource.rb:91:in `stage'
	17: from /usr/local/Homebrew/Library/Homebrew/resource.rb:116:in `unpack'
	16: from /usr/local/Homebrew/Library/Homebrew/resource.rb:199:in `mktemp'
	15: from /usr/local/Homebrew/Library/Homebrew/mktemp.rb:63:in `run'
	14: from /usr/local/Homebrew/Library/Homebrew/mktemp.rb:63:in `chdir'
	13: from /usr/local/Homebrew/Library/Homebrew/mktemp.rb:63:in `block in run'
	12: from /usr/local/Homebrew/Library/Homebrew/resource.rb:117:in `block in unpack'
	11: from /usr/local/Homebrew/Library/Homebrew/download_strategy.rb:102:in `stage'
	10: from /usr/local/Homebrew/Library/Homebrew/download_strategy.rb:117:in `chdir'
	 9: from /usr/local/Homebrew/Library/Homebrew/resource.rb:121:in `block (2 levels) in unpack'
	 8: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2414:in `block in stage'
	 7: from /usr/local/Homebrew/Library/Homebrew/utils.rb:550:in `with_env'
	 6: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2415:in `block (2 levels) in stage'
	 5: from /usr/local/Homebrew/Library/Homebrew/formula.rb:1281:in `block in brew'
	 4: from /usr/local/Homebrew/Library/Homebrew/build.rb:178:in `block (2 levels) in install'
	 3: from /Users/karuppiahn/projects/github.com/Homebrew/homebrew-core/Formula/clusterctl.rb:33:in `install'
	 2: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2185:in `system'
	 1: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2185:in `open'
/usr/local/Homebrew/Library/Homebrew/formula.rb:2249:in `block in system': Failed executing: make clusterctl (BuildError)
	5: from /usr/local/Homebrew/Library/Homebrew/brew.rb:164:in `<main>'
	4: from /usr/local/Homebrew/Library/Homebrew/brew.rb:176:in `rescue in <main>'
	3: from /usr/local/Homebrew/Library/Homebrew/exceptions.rb:509:in `dump'
	2: from /usr/local/Homebrew/Library/Homebrew/exceptions.rb:455:in `issues'
	1: from /usr/local/Homebrew/Library/Homebrew/exceptions.rb:459:in `fetch_issues'
/usr/local/Homebrew/Library/Homebrew/utils/github.rb:60:in `issues_for_formula': undefined method `full_name' for nil:NilClass (NoMethodError)
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: Failed to load cask: Formula/clusterctl.rb
Cask 'clusterctl' is unreadable: wrong constant name #<Class:0x00007f94d09bc9d8>
Warning: Treating Formula/clusterctl.rb as a formula.
==> Downloading file:///Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api
Already downloaded: /Users/karuppiahn/Library/Caches/Homebrew/downloads/31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com
Warning: Cannot verify integrity of '31b623da1a4708bd0e17717130e1d1bedbee79e06326096f377eabbba0a94ab3--github.com'.
No checksum was provided for this resource.
For your reference, the checksum is:
  sha256 "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
==> make clusterctl
Last 15 lines from /Users/karuppiahn/Library/Logs/Homebrew/clusterctl/01.make:
2021-07-29 21:06:59 +0530

make
clusterctl

make: *** No rule to make target `clusterctl'.  Stop.

Do not report this issue to Homebrew/brew or Homebrew/core!

Traceback (most recent call last):
	25: from /usr/local/Homebrew/Library/Homebrew/build.rb:229:in `<main>'
	24: from /usr/local/Homebrew/Library/Homebrew/build.rb:133:in `install'
	23: from /usr/local/Homebrew/Library/Homebrew/utils.rb:550:in `with_env'
	22: from /usr/local/Homebrew/Library/Homebrew/build.rb:138:in `block in install'
	21: from /usr/local/Homebrew/Library/Homebrew/formula.rb:1274:in `brew'
	20: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2394:in `stage'
	19: from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/forwardable.rb:230:in `stage'
	18: from /usr/local/Homebrew/Library/Homebrew/resource.rb:91:in `stage'
	17: from /usr/local/Homebrew/Library/Homebrew/resource.rb:116:in `unpack'
	16: from /usr/local/Homebrew/Library/Homebrew/resource.rb:199:in `mktemp'
	15: from /usr/local/Homebrew/Library/Homebrew/mktemp.rb:63:in `run'
	14: from /usr/local/Homebrew/Library/Homebrew/mktemp.rb:63:in `chdir'
	13: from /usr/local/Homebrew/Library/Homebrew/mktemp.rb:63:in `block in run'
	12: from /usr/local/Homebrew/Library/Homebrew/resource.rb:117:in `block in unpack'
	11: from /usr/local/Homebrew/Library/Homebrew/download_strategy.rb:102:in `stage'
	10: from /usr/local/Homebrew/Library/Homebrew/download_strategy.rb:117:in `chdir'
	 9: from /usr/local/Homebrew/Library/Homebrew/resource.rb:121:in `block (2 levels) in unpack'
	 8: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2414:in `block in stage'
	 7: from /usr/local/Homebrew/Library/Homebrew/utils.rb:550:in `with_env'
	 6: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2415:in `block (2 levels) in stage'
	 5: from /usr/local/Homebrew/Library/Homebrew/formula.rb:1281:in `block in brew'
	 4: from /usr/local/Homebrew/Library/Homebrew/build.rb:178:in `block (2 levels) in install'
	 3: from /Users/karuppiahn/projects/github.com/Homebrew/homebrew-core/Formula/clusterctl.rb:33:in `install'
	 2: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2185:in `system'
	 1: from /usr/local/Homebrew/Library/Homebrew/formula.rb:2185:in `open'
/usr/local/Homebrew/Library/Homebrew/formula.rb:2249:in `block in system': Failed executing: make clusterctl (BuildError)
	5: from /usr/local/Homebrew/Library/Homebrew/brew.rb:164:in `<main>'
	4: from /usr/local/Homebrew/Library/Homebrew/brew.rb:176:in `rescue in <main>'
	3: from /usr/local/Homebrew/Library/Homebrew/exceptions.rb:509:in `dump'
	2: from /usr/local/Homebrew/Library/Homebrew/exceptions.rb:455:in `issues'
	1: from /usr/local/Homebrew/Library/Homebrew/exceptions.rb:459:in `fetch_issues'
/usr/local/Homebrew/Library/Homebrew/utils/github.rb:60:in `issues_for_formula': undefined method `full_name' for nil:NilClass (NoMethodError)
karuppiahn-a01:homebrew-core karuppiahn$ less /Users/karuppiahn/Library/Logs/Homebrew/clusterctl/01.make
karuppiahn-a01:homebrew-core karuppiahn$ 
```


https://duckduckgo.com/?t=ffab&q=find+sha256+sum+of+directory&ia=web

https://duckduckgo.com/?t=ffab&q=local+git+server&ia=web

https://www.godo.dev/tutorials/local-git-server/

https://duckduckgo.com/?t=ffab&q=sshd+re-exec+requires+execution+with+an+absolute+path&ia=web&iax=qa

```bash
karuppiahn-a01:kubernetes-sigs karuppiahn$ sha
shar        sharing     shasum      shasum5.18  shasum5.30  
karuppiahn-a01:kubernetes-sigs karuppiahn$ sha
shar        sharing     shasum      shasum5.18  shasum5.30  
karuppiahn-a01:kubernetes-sigs karuppiahn$ shasum
ok
92a949fd41844e1bb8c6812cdea102708fde23a4  -
karuppiahn-a01:kubernetes-sigs karuppiahn$ shasum -h
Usage: shasum [OPTION]... [FILE]...
Print or check SHA checksums.
With no FILE, or when FILE is -, read standard input.

  -a, --algorithm   1 (default), 224, 256, 384, 512, 512224, 512256
  -b, --binary      read in binary mode
  -c, --check       read SHA sums from the FILEs and check them
      --tag         create a BSD-style checksum
  -t, --text        read in text mode (default)
  -U, --UNIVERSAL   read in Universal Newlines mode
                        produces same digest on Windows/Unix/Mac
  -0, --01          read in BITS mode
                        ASCII '0' interpreted as 0-bit,
                        ASCII '1' interpreted as 1-bit,
                        all other characters ignored

The following five options are useful only when verifying checksums:
      --ignore-missing  don't fail or report status for missing files
  -q, --quiet           don't print OK for each successfully verified file
  -s, --status          don't output anything, status code shows success
      --strict          exit non-zero for improperly formatted checksum lines
  -w, --warn            warn about improperly formatted checksum lines

  -h, --help        display this help and exit
  -v, --version     output version information and exit

When verifying SHA-512/224 or SHA-512/256 checksums, indicate the
algorithm explicitly using the -a option, e.g.

  shasum -a 512224 -c checksumfile

The sums are computed as described in FIPS PUB 180-4.  When checking,
the input should be a former output of this program.  The default
mode is to print a line with checksum, a character indicating type
(`*' for binary, ` ' for text, `U' for UNIVERSAL, `^' for BITS),
and name for each FILE.  The line starts with a `\' character if the
FILE name contains either newlines or backslashes, which are then
replaced by the two-character sequences `\n' and `\\' respectively.

Report shasum bugs to mshelor@cpan.org
karuppiahn-a01:kubernetes-sigs karuppiahn$ shasum -a 256 cluster-api
shasum: cluster-api: Is a directory
karuppiahn-a01:kubernetes-sigs karuppiahn$ shasum -a 256 cluster-api 
shasum: cluster-api: Is a directory
karuppiahn-a01:kubernetes-sigs karuppiahn$ gst
fatal: not a git repository (or any of the parent directories): .git
karuppiahn-a01:kubernetes-sigs karuppiahn$ cd cluster-api
karuppiahn-a01:cluster-api karuppiahn$ gst
HEAD detached at 7f879be68
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   hack/version.sh

no changes added to commit (use "git add" and/or "git commit -a")
karuppiahn-a01:cluster-api karuppiahn$ g remote -v
origin	git@github.com:kubernetes-sigs/cluster-api.git (fetch)
origin	git@github.com:kubernetes-sigs/cluster-api.git (push)
karuppiahn-a01:cluster-api karuppiahn$ g remote rename origin
usage: git remote rename <old> <new>

karuppiahn-a01:cluster-api karuppiahn$ g remote rename origin upstream
karuppiahn-a01:cluster-api karuppiahn$ g remote add origin github.com:karuppiah7890/clusterctl
karuppiahn-a01:cluster-api karuppiahn$ sshd 
sshd re-exec requires execution with an absolute path
karuppiahn-a01:cluster-api karuppiahn$ sshd -h
sshd: option requires an argument -- h
OpenSSH_8.1p1, LibreSSL 2.7.3
usage: sshd [-46DdeiqTt] [-C connection_spec] [-c host_cert_file]
            [-E log_file] [-f config_file] [-g login_grace_time]
            [-h host_key_file] [-o option] [-p port] [-u len]
karuppiahn-a01:cluster-api karuppiahn$ man sshd
karuppiahn-a01:cluster-api karuppiahn$ sshd -p 2222
sshd re-exec requires execution with an absolute path
karuppiahn-a01:cluster-api karuppiahn$ sshd -p 2222 .
sshd re-exec requires execution with an absolute path
karuppiahn-a01:cluster-api karuppiahn$ man sshd
karuppiahn-a01:cluster-api karuppiahn$ which sshd
/usr/sbin/sshd
karuppiahn-a01:cluster-api karuppiahn$ /usr/sbin/sshd -p 2222
sshd: no hostkeys available -- exiting.
karuppiahn-a01:cluster-api karuppiahn$ 
```

---

```ruby
url "https://github.com/karuppiah7890/cluster-api.git"
      # branch: "v0.4.0-verbose-make-log",
      # revision: "03880298e2dd723057a03ddcf03a93889819f26d"
  head "https://github.com/karuppiah7890/cluster-api.git",
      # branch: "v0.4.0-verbose-make-log",
      :revision => "03880298e2dd723057a03ddcf03a93889819f26d"
  # sha256 "af60c8aa1b21eccc7f272c0135ffaf1a8e0ecdffb4173075efac52509ce0eeb0"
```

---

```bash
karuppiahn-a01:homebrew-core karuppiahn$ brew remove clusterctl
Error: No available formula or cask with the name "clusterctl". Did you mean clutter?
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: invalid attribute for formula 'clusterctl': version (nil)
Please report this issue:
  https://docs.brew.sh/Troubleshooting
/usr/local/Homebrew/Library/Homebrew/formula.rb:286:in `validate_attributes!'
/usr/local/Homebrew/Library/Homebrew/formula.rb:215:in `initialize'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:181:in `new'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:181:in `get_formula'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:412:in `factory'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:636:in `block in formulae'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:632:in `map'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:632:in `formulae'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:311:in `parse'
/usr/local/Homebrew/Library/Homebrew/cmd/install.rb:131:in `install'
/usr/local/Homebrew/Library/Homebrew/brew.rb:131:in `<main>'
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: invalid attribute for formula 'clusterctl': version (nil)
Please report this issue:
  https://docs.brew.sh/Troubleshooting
/usr/local/Homebrew/Library/Homebrew/formula.rb:286:in `validate_attributes!'
/usr/local/Homebrew/Library/Homebrew/formula.rb:215:in `initialize'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:181:in `new'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:181:in `get_formula'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:412:in `factory'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:636:in `block in formulae'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:632:in `map'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:632:in `formulae'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:311:in `parse'
/usr/local/Homebrew/Library/Homebrew/cmd/install.rb:131:in `install'
/usr/local/Homebrew/Library/Homebrew/brew.rb:131:in `<main>'
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: invalid attribute for formula 'clusterctl': version (nil)
Please report this issue:
  https://docs.brew.sh/Troubleshooting
/usr/local/Homebrew/Library/Homebrew/formula.rb:286:in `validate_attributes!'
/usr/local/Homebrew/Library/Homebrew/formula.rb:215:in `initialize'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:181:in `new'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:181:in `get_formula'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:412:in `factory'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:636:in `block in formulae'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:632:in `map'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:632:in `formulae'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:311:in `parse'
/usr/local/Homebrew/Library/Homebrew/cmd/install.rb:131:in `install'
/usr/local/Homebrew/Library/Homebrew/brew.rb:131:in `<main>'
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: invalid attribute for formula 'clusterctl': version (nil)
Please report this issue:
  https://docs.brew.sh/Troubleshooting
/usr/local/Homebrew/Library/Homebrew/formula.rb:286:in `validate_attributes!'
/usr/local/Homebrew/Library/Homebrew/formula.rb:215:in `initialize'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:181:in `new'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:181:in `get_formula'
/usr/local/Homebrew/Library/Homebrew/formulary.rb:412:in `factory'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:636:in `block in formulae'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:632:in `map'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:632:in `formulae'
/usr/local/Homebrew/Library/Homebrew/cli/parser.rb:311:in `parse'
/usr/local/Homebrew/Library/Homebrew/cmd/install.rb:131:in `install'
/usr/local/Homebrew/Library/Homebrew/brew.rb:131:in `<main>'
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: clusterctl: /Users/karuppiahn/projects/github.com/Homebrew/homebrew-core/Formula/clusterctl.rb:5: syntax error, unexpected ':', expecting end
      tag: "v0.4.0-karuppiah-1",
         ^
/Users/karuppiahn/projects/github.com/Homebrew/homebrew-core/Formula/clusterctl.rb:5: syntax error, unexpected ',', expecting end
...     tag: "v0.4.0-karuppiah-1",
...                              ^
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: Failed to load cask: Formula/clusterctl.rb
Cask 'clusterctl' is unreadable: wrong constant name #<Class:0x00007fbdf49188b8>
Warning: Treating Formula/clusterctl.rb as a formula.
==> Cloning https://github.com/karuppiah7890/cluster-api.git
Updating /Users/karuppiahn/Library/Caches/Homebrew/clusterctl--git
From https://github.com/karuppiah7890/cluster-api
 * [new tag]             v0.4.0-karuppiah-1 -> v0.4.0-karuppiah-1
==> Checking out tag v0.4.0-karuppiah-1
Previous HEAD position was 7f879be68 Merge pull request #4791 from anusha94/gt_one_infra_provider
HEAD is now at 03880298e add verbose make logs
HEAD is now at 03880298e add verbose make logs
==> make clusterctl
Error: The `brew link` step did not complete successfully
The formula built, but is not symlinked into /usr/local
Could not symlink bin/clusterctl
Target /usr/local/bin/clusterctl
already exists. You may want to remove it:
  rm '/usr/local/bin/clusterctl'

To force the link and overwrite all conflicting files:
  brew link --overwrite clusterctl

To list all files that would be deleted:
  brew link --overwrite --dry-run clusterctl

Possible conflicting files are:
/usr/local/bin/clusterctl
==> Summary
🍺  /usr/local/Cellar/clusterctl/1: 5 files, 50.6MB, built in 12 seconds
karuppiahn-a01:homebrew-core karuppiahn$ less /Users/karuppiahn/Library/Logs/Homebrew/clusterctl/01.make
karuppiahn-a01:homebrew-core karuppiahn$ cd /Users/karuppiahn/Library/Caches/Homebrew/clusterctl--git/
karuppiahn-a01:clusterctl--git karuppiahn$ ls brew_home
ls: brew_home: No such file or directory
karuppiahn-a01:clusterctl--git karuppiahn$ ls .brew_home
ls: .brew_home: No such file or directory
karuppiahn-a01:clusterctl--git karuppiahn$ 
```

```bash
karuppiahn-a01:clusterctl--git karuppiahn$ cat /Users/karuppiahn/Library/Logs/Homebrew/clusterctl/01.make
2021-07-29 21:24:08 +0530

make
clusterctl

+ version::ldflags
+ version::get_version_vars
++ git rev-parse 'HEAD^{commit}'
+ GIT_COMMIT=03880298e2dd723057a03ddcf03a93889819f26d
++ git status --porcelain
+ git_status='?? .brew_home/'
+ [[ -z ?? .brew_home/ ]]
+ GIT_TREE_STATE=dirty
++ git describe --tags --abbrev=14
+ GIT_VERSION=v0.4.0-karuppiah-1
++ echo v0.4.0-karuppiah-1
++ sed 's/[^-]//g'
+ DASHES_IN_VERSION=--
+ [[ -- == \-\-\- ]]
+ [[ -- == \-\- ]]
++ echo v0.4.0-karuppiah-1
++ sed 's/-g\([0-9a-f]\{14\}\)$/-\1/'
+ GIT_VERSION=v0.4.0-karuppiah-1
+ [[ dirty == \d\i\r\t\y ]]
+ GIT_VERSION+=-dirty
+ [[ v0.4.0-karuppiah-1-dirty =~ ^v([0-9]+)\.([0-9]+)(\.[0-9]+)?([-].*)?([+].*)?$ ]]
+ GIT_MAJOR=0
+ GIT_MINOR=4
+ [[ v0.4.0-karuppiah-1-dirty =~ ^v([0-9]+)\.([0-9]+)(\.[0-9]+)?(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$ ]]
++ git describe --abbrev=0 --tags
+ GIT_RELEASE_TAG=v0.4.0-karuppiah-1
++ git rev-list -n 1 v0.4.0-karuppiah-1
+ GIT_RELEASE_COMMIT=03880298e2dd723057a03ddcf03a93889819f26d
+ local -a ldflags
++ date --date=@1627573666 -u +%Y-%m-%dT%H:%M:%SZ
date: illegal option -- -
usage: date [-jnRu] [-d dst] [-r seconds] [-t west] [-v[+|-]val[ymwdHMS]] ... 
            [-f fmt date | [[[mm]dd]HH]MM[[cc]yy][.ss]] [+format]
+ add_ldflag buildDate ''
+ local key=buildDate
+ local val=
+ ldflags+=("-X 'sigs.k8s.io/cluster-api/version.${key}=${val}'")
+ add_ldflag gitCommit 03880298e2dd723057a03ddcf03a93889819f26d
+ local key=gitCommit
+ local val=03880298e2dd723057a03ddcf03a93889819f26d
+ ldflags+=("-X 'sigs.k8s.io/cluster-api/version.${key}=${val}'")
+ add_ldflag gitTreeState dirty
+ local key=gitTreeState
+ local val=dirty
+ ldflags+=("-X 'sigs.k8s.io/cluster-api/version.${key}=${val}'")
+ add_ldflag gitMajor 0
+ local key=gitMajor
+ local val=0
+ ldflags+=("-X 'sigs.k8s.io/cluster-api/version.${key}=${val}'")
+ add_ldflag gitMinor 4
+ local key=gitMinor
+ local val=4
+ ldflags+=("-X 'sigs.k8s.io/cluster-api/version.${key}=${val}'")
+ add_ldflag gitVersion v0.4.0-karuppiah-1-dirty
+ local key=gitVersion
+ local val=v0.4.0-karuppiah-1-dirty
+ ldflags+=("-X 'sigs.k8s.io/cluster-api/version.${key}=${val}'")
+ add_ldflag gitReleaseCommit 03880298e2dd723057a03ddcf03a93889819f26d
+ local key=gitReleaseCommit
+ local val=03880298e2dd723057a03ddcf03a93889819f26d
+ ldflags+=("-X 'sigs.k8s.io/cluster-api/version.${key}=${val}'")
+ echo '-X '\''sigs.k8s.io/cluster-api/version.buildDate='\'' -X '\''sigs.k8s.io/cluster-api/version.gitCommit=03880298e2dd723057a03ddcf03a93889819f26d'\'' -X '\''sigs.k8s.io/cluster-api/version.gitTreeState=dirty'\'' -X '\''sigs.k8s.io/cluster-api/version.gitMajor=0'\'' -X '\''sigs.k8s.io/cluster-api/version.gitMinor=4'\'' -X '\''sigs.k8s.io/cluster-api/version.gitVersion=v0.4.0-karuppiah-1-dirty'\'' -X '\''sigs.k8s.io/cluster-api/version.gitReleaseCommit=03880298e2dd723057a03ddcf03a93889819f26d'\'''
go build -ldflags "-X 'sigs.k8s.io/cluster-api/version.buildDate=' -X 'sigs.k8s.io/cluster-api/version.gitCommit=03880298e2dd723057a03ddcf03a93889819f26d' -X 'sigs.k8s.io/cluster-api/version.gitTreeState=dirty' -X 'sigs.k8s.io/cluster-api/version.gitMajor=0' -X 'sigs.k8s.io/cluster-api/version.gitMinor=4' -X 'sigs.k8s.io/cluster-api/version.gitVersion=v0.4.0-karuppiah-1-dirty' -X 'sigs.k8s.io/cluster-api/version.gitReleaseCommit=03880298e2dd723057a03ddcf03a93889819f26d'" -o bin/clusterctl sigs.k8s.io/cluster-api/cmd/clusterctl
karuppiahn-a01:clusterctl--git karuppiahn$ 
```

the issue is because of - git_status='?? .brew_home/'

kubernetes does this

https://github.com/Homebrew/homebrew-core/blob/master/Formula/kubernetes-cli.rb#L30-L31

```ruby
# Don't dirty the git tree
rm_rf ".brew_home"
```

```bash
karuppiahn-a01:homebrew-core karuppiahn$ brew remove clusterctl
Uninstalling /usr/local/Cellar/clusterctl/1... (5 files, 50.6MB)
karuppiahn-a01:homebrew-core karuppiahn$ brew install --build-from-source Formula/clusterctl.rb
Error: Failed to load cask: Formula/clusterctl.rb
Cask 'clusterctl' is unreadable: wrong constant name #<Class:0x00007fb2e41b45d8>
Warning: Treating Formula/clusterctl.rb as a formula.
==> Cloning https://github.com/karuppiah7890/cluster-api.git
Updating /Users/karuppiahn/Library/Caches/Homebrew/clusterctl--git
==> Checking out tag v0.4.0-karuppiah-1
HEAD is now at 03880298e add verbose make logs
HEAD is now at 03880298e add verbose make logs
==> make clusterctl
Error: The `brew link` step did not complete successfully
The formula built, but is not symlinked into /usr/local
Could not symlink bin/clusterctl
Target /usr/local/bin/clusterctl
already exists. You may want to remove it:
  rm '/usr/local/bin/clusterctl'

To force the link and overwrite all conflicting files:
  brew link --overwrite clusterctl

To list all files that would be deleted:
  brew link --overwrite --dry-run clusterctl

Possible conflicting files are:
/usr/local/bin/clusterctl
==> Summary
🍺  /usr/local/Cellar/clusterctl/1: 5 files, 50.6MB, built in 12 seconds
karuppiahn-a01:homebrew-core karuppiahn$ brew link --overwrite clusterctl
Linking /usr/local/Cellar/clusterctl/1... 1 symlinks created.
karuppiahn-a01:homebrew-core karuppiahn$ clusterctl version
clusterctl version: &version.Info{Major:"0", Minor:"4", GitVersion:"v0.4.0-karuppiah-1", GitCommit:"03880298e2dd723057a03ddcf03a93889819f26d", GitTreeState:"clean", BuildDate:"", GoVersion:"go1.16.6", Compiler:"gc", Platform:"darwin/amd64"}
karuppiahn-a01:homebrew-core karuppiahn$ 
```

```bash
karuppiahn-a01:homebrew-core karuppiahn$ gd
diff --git a/Formula/clusterctl.rb b/Formula/clusterctl.rb
index fbf4101854..6dce0ce232 100644
--- a/Formula/clusterctl.rb
+++ b/Formula/clusterctl.rb
@@ -1,7 +1,10 @@
 class Clusterctl < Formula
   desc "Home for the Cluster Management API work, a subproject of sig-cluster-lifecycle"
   homepage "https://cluster-api.sigs.k8s.io"
-  url "https://github.com/kubernetes-sigs/cluster-api/archive/refs/tags/v0.4.0.tar.gz"
+  url "https://github.com/kubernetes-sigs/cluster-api.git",
+      tag: "v0.4.0",
+      revision: "7f879be68d15737e335b6cb39d380d1d163e06e6"
+  head "https://github.com/kubernetes-sigs/cluster-api.git"
   sha256 "af60c8aa1b21eccc7f272c0135ffaf1a8e0ecdffb4173075efac52509ce0eeb0"
   license "Apache-2.0"
 
@@ -27,6 +30,9 @@ class Clusterctl < Formula
   depends_on "go" => :build
 
   def install
+    # Don't dirty the git tree
+    rm_rf ".brew_home"
+
     system "make", "clusterctl"
     prefix.install "bin"
   end
karuppiahn-a01:homebrew-core karuppiahn$ 
```

