# issue 37

https://github.com/kubernetes-sigs/depstat/issues/37



Steps
- Add goreleaser config
- Add GitHub Actions workflow for releasing depstat on git tags

Features we are looking for
- Binaries for multiple OSes and architectures



Questions
- What OSes and architectures to consider for binaries? Check the existing releases page. Currently we only have MacOS binary in the releases page -

https://github.com/kubernetes-sigs/depstat/releases/download/v0.6.1/depstat

```bash
$ file ~/Downloads/depstat 
/Users/karuppiahn/Downloads/depstat: Mach-O 64-bit executable arm64
```

- Release with GitHub Actions? On git tags? I guess so. Confirm it! Also check existing release workflows if any. And CI being used currently is GitHub Actions, we can use it for CD too!
- What about godownloader install.sh ? To install it with a bash script
- We just need binaries? Or do we need Docker images too?
- Do we want to document anything about the release process? It will most probably be too simple to describe it. Just use goreleaser and GitHub Actions, that's it I guess? And use GITHUB_TOKEN for access. - There's already a release.md file - https://github.com/kubernetes-sigs/depstat/blob/main/RELEASE.md

---

Reading -

https://goreleaser.com/

https://goreleaser.com/ci/actions/#workflow

https://github.com/kubernetes-sigs/depstat/issues/37#issuecomment-840483630
- https://github.com/kubernetes-sigs/depstat/blob/main/cmd/root.go#L26
- https://github.com/kubernetes-sigs/depstat/pull/40#pullrequestreview-657818605
- https://github.com/kubernetes-sigs/depstat/blob/main/RELEASE.md

---

Goals
- Keep it small, simple and straightforward
- Keep it readable, understandable. Should not break head to understand code and release process

---

Can the goreleaser workflow create a GitHub release with the default GITHUB_TOKEN it gets? Will it have enough access?

Well, looks like it asks for enough access -

https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#permissions

using

```yaml
permissions:
  contents: write
```

https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token

I think `contents` is for releases / release artifacts, not able to find the doc for it

Ah, I found it now

https://docs.github.com/en/rest/reference/permissions-required-for-github-apps#permission-on-contents

It has a lot of write access, including `Releases` related write access in a subsection, hmm

https://goreleaser.com/ci/actions/#token-permissions

---

What golang version to use?

Both go.mod and existing golang CI workflow use `1.16` so let's go with that? For now atleast. Ask in PR about this [PR-Question] or in issue

---

https://goreleaser.com/intro/

https://goreleaser.com/install/

```bash
$ brew info goreleaser
$ brew install goreleaser
```

https://goreleaser.com/quick-start/

```bash
depstat $ goreleaser init

   • Generating .goreleaser.yml file
   • config created; please edit accordingly to your needs file=.goreleaser.yml
```

```bash
depstat $ goreleaser 
   • releasing...     
   • loading config file       file=.goreleaser.yml
   • loading environment variables
   ⨯ release failed after 0.00s error=missing GITHUB_TOKEN, GITLAB_TOKEN and GITEA_TOKEN
depstat $ goreleaser release -h
Releases the current project

Usage:
  goreleaser release [flags]

Aliases:
  release, r

Flags:
      --auto-snapshot                Automatically sets --snapshot if the repo is dirty
  -f, --config string                Load configuration from file
  -h, --help                         help for release
  -p, --parallelism int              Amount tasks to run concurrently (default: number of CPUs)
      --release-footer string        Load custom release notes footer from a markdown file
      --release-footer-tmpl string   Load custom release notes footer from a templated markdown file (overrides --release-footer)
      --release-header string        Load custom release notes header from a markdown file
      --release-header-tmpl string   Load custom release notes header from a templated markdown file (overrides --release-header)
      --release-notes string         Load custom release notes from a markdown file
      --release-notes-tmpl string    Load custom release notes from a templated markdown file (overrides --release-notes)
      --rm-dist                      Remove the dist folder before building
      --skip-announce                Skips announcing releases (implies --skip-validate)
      --skip-publish                 Skips publishing artifacts
      --skip-sign                    Skips signing the artifacts
      --skip-validate                Skips several sanity checks
      --snapshot                     Generate an unversioned snapshot release, skipping all validations and without publishing any artifacts (implies --skip-publish, --skip-announce and --skip-validate)
      --timeout duration             Timeout to the entire release process (default 30m0s)

Global Flags:
      --debug   Enable debug mode
depstat $ goreleaser release --snapshot
   • releasing...     
   • loading config file       file=.goreleaser.yml
   • loading environment variables
   • getting and validating git state
      • building...               commit=9ccb09c297f63a11d438ec559cb37121572d23f3 latest tag=v0.6.1
      • pipe skipped              error=disabled during snapshot mode
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
         • DEPRECATED: skipped windows/arm64 build on Go < 1.17 for compatibility, check https://goreleaser.com/deprecations/#builds-for-windowsarm64 for more info.
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
      • building snapshot...      version=0.6.2-next
   • checking ./dist  
   • loading go mod information
   • writing effective config file
      • writing                   config=dist/config.yaml
   • generating changelog
      • pipe skipped              error=not available for snapshots
   • building binaries
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_darwin_arm64/depstat
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_linux_386/depstat
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_windows_386/depstat.exe
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_darwin_amd64/depstat
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_linux_arm64/depstat
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_windows_amd64/depstat.exe
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_linux_amd64/depstat
   • archives         
      • creating                  archive=dist/depstat_0.6.2-next_Darwin_x86_64.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Windows_x86_64.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Linux_x86_64.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Linux_i386.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Linux_arm64.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Windows_i386.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Darwin_arm64.tar.gz
   • creating source archive
   • linux packages   
   • snapcraft packages
   • calculating checksums
      • checksumming              file=depstat_0.6.2-next_Darwin_x86_64.tar.gz
      • checksumming              file=depstat_0.6.2-next_Linux_arm64.tar.gz
      • checksumming              file=depstat_0.6.2-next_Linux_i386.tar.gz
      • checksumming              file=depstat_0.6.2-next_Windows_i386.tar.gz
      • checksumming              file=depstat_0.6.2-next_Darwin_arm64.tar.gz
      • checksumming              file=depstat_0.6.2-next_Windows_x86_64.tar.gz
      • checksumming              file=depstat_0.6.2-next_Linux_x86_64.tar.gz
   • signing artifacts
   • docker images    
   • publishing       
      • blobs            
      • http upload      
      • custom publisher 
      • artifactory      
      • docker images    
         • pipe skipped              error=publishing is disabled
      • docker manifests 
         • pipe skipped              error=publishing is disabled
      • snapcraft packages
         • pipe skipped              error=publishing is disabled
      • github/gitlab/gitea releases
         • pipe skipped              error=publishing is disabled
      • homebrew tap formula
      • scoop manifests  
      • milestones       
         • pipe skipped              error=publishing is disabled
   • signing docker images
      • pipe skipped              error=artifact signing is disabled
   • announcing       
      • twitter          
         • pipe skipped              error=announcing is disabled
   • release succeeded after 11.55s
depstat $ ls
CONTRIBUTING.md		RELEASE.md		code-of-conduct.md	go.sum
LICENSE			SECURITY.md		depstat			main.go
Makefile		SECURITY_CONTACTS	depstat-demo.gif
OWNERS			bin			dist
README.md		cmd			go.mod
depstat $ ls dist/
checksums.txt					depstat_0.6.2-next_Windows_x86_64.tar.gz
config.yaml					depstat_darwin_amd64
depstat_0.6.2-next_Darwin_arm64.tar.gz		depstat_darwin_arm64
depstat_0.6.2-next_Darwin_x86_64.tar.gz		depstat_linux_386
depstat_0.6.2-next_Linux_arm64.tar.gz		depstat_linux_amd64
depstat_0.6.2-next_Linux_i386.tar.gz		depstat_linux_arm64
depstat_0.6.2-next_Linux_x86_64.tar.gz		depstat_windows_386
depstat_0.6.2-next_Windows_i386.tar.gz		depstat_windows_amd64
depstat $ ls dist/depstat_darwin_amd64/
depstat
depstat $ ls dist/depstat_darwin_amd64/depstat 
dist/depstat_darwin_amd64/depstat
depstat $ ./dist/depstat_darwin_amd64/depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.
depstat $ ./dist/depstat_darwin_amd64/depstat version
Error: unknown command "version" for "depstat"
Run 'depstat --help' for usage.
unknown command "version" for "depstat"
depstat $ ./dist/depstat_darwin_amd64/depstat --version
Error: unknown flag: --version
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown flag: --version
depstat $ ./dist/depstat_darwin_amd64/depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.
depstat $ ./dist/depstat_darwin_amd64/depstat -v
Error: unknown shorthand flag: 'v' in -v
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown shorthand flag: 'v' in -v
depstat $ ./dist/depstat_darwin_amd64/depstat --version
Error: unknown flag: --version
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown flag: --version
depstat $ ls
CONTRIBUTING.md		RELEASE.md		code-of-conduct.md	go.sum
LICENSE			SECURITY.md		depstat			main.go
Makefile		SECURITY_CONTACTS	depstat-demo.gif
OWNERS			bin			dist
README.md		cmd			go.mod
depstat $ 
```

https://goreleaser.com/quick-start/#build-only-mode

https://goreleaser.com/quick-start/#release-flags

I didn't inject the `var DepstatVersion string` previously and now too in goreleaser build through `ldflags` go build flags

`go build -ldflags "-X main.DepstatVersion=<version-number>"`

```go
var DepstatVersion string

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:     "depstat",
	Short:   "Analyze your Go project's dependencies",
	Long:    `depstat will help you get details about the dependencies of your Go modules enabled project`,
	Version: DepstatVersion,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	//	Run: func(cmd *cobra.Command, args []string) { },
}
```

```go
// Version defines the version for this command. If this value is non-empty and the command does not
// define a "version" flag, a "version" boolean flag will be added to the command and, if specified,
// will print content of the "Version" variable. A shorthand "v" flag will also be added if the
// command does not define one.
Version string
```

Currently `DepstatVersion` is empty, hmm

Let's customize ldflags

https://goreleaser.com/customization/build/

```yaml
    # Custom ldflags templates.
    # Default is `-s -w -X main.version={{.Version}} -X main.commit={{.Commit}} -X main.date={{.Date}} -X main.builtBy=goreleaser`.
    ldflags:
      - -s -w -X main.build={{.Version}}
      - ./usemsan=-msan
```

```yaml
builds:
  - env:
      - CGO_ENABLED=0
    goos:
      - linux
      - windows
      - darwin
    ldflags:
      - -X main.DepstatVersion={{.Version}}
```

```bash
depstat $ goreleaser release --snapshot
   • releasing...     
   • loading config file       file=.goreleaser.yml
   • loading environment variables
   • getting and validating git state
      • building...               commit=9ccb09c297f63a11d438ec559cb37121572d23f3 latest tag=v0.6.1
      • pipe skipped              error=disabled during snapshot mode
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
         • DEPRECATED: skipped windows/arm64 build on Go < 1.17 for compatibility, check https://goreleaser.com/deprecations/#builds-for-windowsarm64 for more info.
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
      • building snapshot...      version=0.6.2-next
   • checking ./dist  
   ⨯ release failed after 0.43s error=dist is not empty, remove it before running goreleaser or use the --rm-dist flag
depstat $ rm -rfv dist/
dist//depstat_0.6.2-next_Darwin_arm64.tar.gz
dist//depstat_0.6.2-next_Linux_x86_64.tar.gz
dist//depstat_linux_amd64/depstat
dist//depstat_linux_amd64
dist//depstat_0.6.2-next_Darwin_x86_64.tar.gz
dist//depstat_0.6.2-next_Linux_arm64.tar.gz
dist//depstat_darwin_amd64/depstat
dist//depstat_darwin_amd64
dist//config.yaml
dist//depstat_windows_386/depstat.exe
dist//depstat_windows_386
dist//depstat_linux_386/depstat
dist//depstat_linux_386
dist//checksums.txt
dist//depstat_linux_arm64/depstat
dist//depstat_linux_arm64
dist//depstat_windows_amd64/depstat.exe
dist//depstat_windows_amd64
dist//depstat_0.6.2-next_Linux_i386.tar.gz
dist//depstat_0.6.2-next_Windows_x86_64.tar.gz
dist//depstat_darwin_arm64/depstat
dist//depstat_darwin_arm64
dist//depstat_0.6.2-next_Windows_i386.tar.gz
dist/
depstat $ goreleaser release --snapshot
   • releasing...     
   • loading config file       file=.goreleaser.yml
   • loading environment variables
   • getting and validating git state
      • building...               commit=9ccb09c297f63a11d438ec559cb37121572d23f3 latest tag=v0.6.1
      • pipe skipped              error=disabled during snapshot mode
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
         • DEPRECATED: skipped windows/arm64 build on Go < 1.17 for compatibility, check https://goreleaser.com/deprecations/#builds-for-windowsarm64 for more info.
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
      • building snapshot...      version=0.6.2-next
   • checking ./dist  
   • loading go mod information
   • writing effective config file
      • writing                   config=dist/config.yaml
   • generating changelog
      • pipe skipped              error=not available for snapshots
   • building binaries
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_darwin_arm64/depstat
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_windows_amd64/depstat.exe
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_windows_386/depstat.exe
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_linux_amd64/depstat
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_darwin_amd64/depstat
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_linux_386/depstat
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_linux_arm64/depstat
   • archives         
      • creating                  archive=dist/depstat_0.6.2-next_Windows_i386.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Linux_i386.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Darwin_arm64.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Linux_x86_64.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Linux_arm64.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Darwin_x86_64.tar.gz
      • creating                  archive=dist/depstat_0.6.2-next_Windows_x86_64.tar.gz
   • creating source archive
   • linux packages   
   • snapcraft packages
   • calculating checksums
      • checksumming              file=depstat_0.6.2-next_Linux_x86_64.tar.gz
      • checksumming              file=depstat_0.6.2-next_Darwin_arm64.tar.gz
      • checksumming              file=depstat_0.6.2-next_Linux_i386.tar.gz
      • checksumming              file=depstat_0.6.2-next_Windows_i386.tar.gz
      • checksumming              file=depstat_0.6.2-next_Darwin_x86_64.tar.gz
      • checksumming              file=depstat_0.6.2-next_Linux_arm64.tar.gz
      • checksumming              file=depstat_0.6.2-next_Windows_x86_64.tar.gz
   • signing artifacts
   • docker images    
   • publishing       
      • blobs            
      • http upload      
      • custom publisher 
      • artifactory      
      • docker images    
         • pipe skipped              error=publishing is disabled
      • docker manifests 
         • pipe skipped              error=publishing is disabled
      • snapcraft packages
         • pipe skipped              error=publishing is disabled
      • github/gitlab/gitea releases
         • pipe skipped              error=publishing is disabled
      • homebrew tap formula
      • scoop manifests  
      • milestones       
         • pipe skipped              error=publishing is disabled
   • signing docker images
      • pipe skipped              error=artifact signing is disabled
   • announcing       
      • twitter          
         • pipe skipped              error=announcing is disabled
   • release succeeded after 3.40s
depstat $ ./dist/depstat_
depstat_darwin_amd64/  depstat_linux_386/     depstat_linux_arm64/   depstat_windows_amd64/ 
depstat_darwin_arm64/  depstat_linux_amd64/   depstat_windows_386/   
depstat $ ./dist/depstat_darwin_a
depstat_darwin_amd64/ depstat_darwin_arm64/ 
depstat $ ./dist/depstat_darwin_a
depstat_darwin_amd64/ depstat_darwin_arm64/ 
depstat $ ./dist/depstat_darwin_amd64/depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.
depstat $ ./dist/depstat_darwin_amd64/depstat -v
Error: unknown shorthand flag: 'v' in -v
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown shorthand flag: 'v' in -v
depstat $ ./dist/depstat_darwin_amd64/depstat --version
Error: unknown flag: --version
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown flag: --version
depstat $ 
```

```bash
depstat $ goreleaser -h
GoReleaser is a release automation tool for Go projects.
Its goal is to simplify the build, release and publish steps while providing
variant customization options for all steps.

GoReleaser is built for CI tools, you only need to download and execute it
in your build script. Of course, you can also install it locally if you wish.

You can also customize your entire release process through a
single .goreleaser.yml file.

Usage:
  goreleaser [command]

Available Commands:
  build       Builds the current project
  check       Checks if configuration is valid
  completion  generate the autocompletion script for the specified shell
  help        Help about any command
  init        Generates a .goreleaser.yml file
  release     Releases the current project

Flags:
      --debug     Enable debug mode
  -h, --help      help for goreleaser
  -v, --version   version for goreleaser

Use "goreleaser [command] --help" for more information about a command.
depstat $ goreleaser build --help
The build command allows you to execute only a subset of the pipeline, i.e. only the build step with its dependencies.

It allows you to quickly check if your GoReleaser build configurations are doing what you expect.

Finally, it allows you to generate a local build for your current machine only using the `--single-target` option, and specific build IDs using the `--id` option.

Usage:
  goreleaser build [flags]

Aliases:
  build, b

Flags:
  -f, --config string      Load configuration from file
  -h, --help               help for build
      --id string          Builds only the specified build id
  -p, --parallelism int    Amount tasks to run concurrently (default: number of CPUs)
      --rm-dist            Remove the dist folder before building
      --single-target      Builds only for current GOOS and GOARCH
      --skip-post-hooks    Skips all post-build hooks
      --skip-validate      Skips several sanity checks
      --snapshot           Generate an unversioned snapshot build, skipping all validations
      --timeout duration   Timeout to the entire build process (default 30m0s)

Global Flags:
      --debug   Enable debug mode
depstat $ goreleaser build --single-target --snapshot
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=9ccb09c297f63a11d438ec559cb37121572d23f3 latest tag=v0.6.1
      • pipe skipped              error=disabled during snapshot mode
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
      • building snapshot...      version=0.6.2-next
   • checking ./dist  
   ⨯ build failed after 0.43s error=dist is not empty, remove it before running goreleaser or use the --rm-dist flag
depstat $ rm -rfv dist/
dist//depstat_0.6.2-next_Darwin_arm64.tar.gz
dist//depstat_0.6.2-next_Linux_x86_64.tar.gz
dist//depstat_linux_amd64/depstat
dist//depstat_linux_amd64
dist//depstat_0.6.2-next_Darwin_x86_64.tar.gz
dist//depstat_0.6.2-next_Linux_arm64.tar.gz
dist//depstat_darwin_amd64/depstat
dist//depstat_darwin_amd64
dist//config.yaml
dist//depstat_windows_386/depstat.exe
dist//depstat_windows_386
dist//depstat_linux_386/depstat
dist//depstat_linux_386
dist//checksums.txt
dist//depstat_linux_arm64/depstat
dist//depstat_linux_arm64
dist//depstat_windows_amd64/depstat.exe
dist//depstat_windows_amd64
dist//depstat_0.6.2-next_Linux_i386.tar.gz
dist//depstat_0.6.2-next_Windows_x86_64.tar.gz
dist//depstat_darwin_arm64/depstat
dist//depstat_darwin_arm64
dist//depstat_0.6.2-next_Windows_i386.tar.gz
dist/
depstat $ goreleaser build --single-target --snapshot
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=9ccb09c297f63a11d438ec559cb37121572d23f3 latest tag=v0.6.1
      • pipe skipped              error=disabled during snapshot mode
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
      • building snapshot...      version=0.6.2-next
   • checking ./dist  
   • loading go mod information
   • writing effective config file
      • writing                   config=dist/config.yaml
   • generating changelog
      • pipe skipped              error=not available for snapshots
   • building binaries
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_darwin_amd64/depstat
   • build succeeded after 0.91s
depstat $ ls dist/
config.yaml		depstat_darwin_amd64
depstat $ ls dist/depstat_darwin_amd64/depstat 
dist/depstat_darwin_amd64/depstat
depstat $ ./dist/depstat_darwin_amd64/depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.
depstat $ ./dist/depstat_darwin_amd64/depstat -v
Error: unknown shorthand flag: 'v' in -v
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown shorthand flag: 'v' in -v
depstat $ ./dist/depstat_darwin_amd64/depstat --version
Error: unknown flag: --version
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown flag: --version
depstat $ 
```

Version doesn't seem to work at all, hmm

```bash
depstat $ g tag
0.5.2
v0.5.0
v0.5.1
v0.5.2
v0.5.3
v0.6
v0.6.0
v0.6.1
depstat $ gco v0.6.1
M	.gitignore
Note: switching to 'v0.6.1'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at a316b79 allowing specifying of multiple mainModules (#48)
depstat $ gst
HEAD detached at v0.6.1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   .gitignore

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.github/workflows/release.yml
	.goreleaser.yml

no changes added to commit (use "git add" and/or "git commit -a")
depstat $ goreleaser build --single-target --snapshot
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=a316b794ffb9b92b5715659152ac48564c04dd28 latest tag=v0.6.1
      • pipe skipped              error=disabled during snapshot mode
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
      • building snapshot...      version=0.6.2-next
   • checking ./dist  
   ⨯ build failed after 0.41s error=dist is not empty, remove it before running goreleaser or use the --rm-dist flag
depstat $ rm -rfv dist/
dist//depstat_darwin_amd64/depstat
dist//depstat_darwin_amd64
dist//config.yaml
dist/
depstat $ goreleaser build --single-target --snapshot
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=a316b794ffb9b92b5715659152ac48564c04dd28 latest tag=v0.6.1
      • pipe skipped              error=disabled during snapshot mode
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
      • building snapshot...      version=0.6.2-next
   • checking ./dist  
   • loading go mod information
   • writing effective config file
      • writing                   config=dist/config.yaml
   • generating changelog
      • pipe skipped              error=not available for snapshots
   • building binaries
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_darwin_amd64/depstat
   • build succeeded after 0.88s
depstat $ ./dist/depstat_darwin_amd64/depstat --version
Error: unknown flag: --version
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown flag: --version
depstat $ goreleaser build --single-target 
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=a316b794ffb9b92b5715659152ac48564c04dd28 latest tag=v0.6.1
   ⨯ build failed after 0.14s error=git is currently in a dirty state, please check in your pipeline what can be changing the following files:
 M .gitignore
?? .github/workflows/release.yml
?? .goreleaser.yml

depstat $ goreleaser build --single-target --help
The build command allows you to execute only a subset of the pipeline, i.e. only the build step with its dependencies.

It allows you to quickly check if your GoReleaser build configurations are doing what you expect.

Finally, it allows you to generate a local build for your current machine only using the `--single-target` option, and specific build IDs using the `--id` option.

Usage:
  goreleaser build [flags]

Aliases:
  build, b

Flags:
  -f, --config string      Load configuration from file
  -h, --help               help for build
      --id string          Builds only the specified build id
  -p, --parallelism int    Amount tasks to run concurrently (default: number of CPUs)
      --rm-dist            Remove the dist folder before building
      --single-target      Builds only for current GOOS and GOARCH
      --skip-post-hooks    Skips all post-build hooks
      --skip-validate      Skips several sanity checks
      --snapshot           Generate an unversioned snapshot build, skipping all validations
      --timeout duration   Timeout to the entire build process (default 30m0s)

Global Flags:
      --debug   Enable debug mode
depstat $ goreleaser build --single-target --skip-validate
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=a316b794ffb9b92b5715659152ac48564c04dd28 latest tag=v0.6.1
      • pipe skipped              error=validation is disabled
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
   • checking ./dist  
   ⨯ build failed after 0.41s error=dist is not empty, remove it before running goreleaser or use the --rm-dist flag
depstat $ rm -rfv dist/
dist//depstat_darwin_amd64/depstat
dist//depstat_darwin_amd64
dist//config.yaml
dist/
depstat $ goreleaser build --single-target --skip-validate
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=a316b794ffb9b92b5715659152ac48564c04dd28 latest tag=v0.6.1
      • pipe skipped              error=validation is disabled
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
   • checking ./dist  
   • loading go mod information
   • writing effective config file
      • writing                   config=dist/config.yaml
   • generating changelog
      • writing                   changelog=dist/CHANGELOG.md
   • building binaries
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_darwin_amd64/depstat
   • build succeeded after 0.90s
depstat $ ./dist/depstat_darwin_amd64/depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.
depstat $ ./dist/depstat_darwin_amd64/depstat --version
Error: unknown flag: --version
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown flag: --version
depstat $ go build -ldflags "-X main.DepstatVersion=v0.6.1"
depstat $ ./depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.
depstat $ ./depstat --version
Error: unknown flag: --version
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown flag: --version
depstat $ 
```

```bash
depstat $ ./depstat version
Error: unknown command "version" for "depstat"
Run 'depstat --help' for usage.
unknown command "version" for "depstat"
depstat $ ./depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.
depstat $ ./depstat -v
Error: unknown shorthand flag: 'v' in -v
Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.

unknown shorthand flag: 'v' in -v
depstat $ 
```

OOPS. I was using the wrong path for `DepstatVersion` variable. RIGHT.

Let's try `-X cmd.root.DepstatVersion={{.Version}}` or I need to use full go module path to set it I guess

Oops, it's actually just `-X cmd.DepstatVersion={{.Version}}` since it's a golang package thing and not a file level scope thing. No file level scopes usually in Golang.

```bash
depstat $ go build -ldflags "-X cmd.DepstatVersion=v0.6.1"
depstat $ ./depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help   help for depstat

Use "depstat [command] --help" for more information about a command.
```

Actually yeah, it won't work. I don't know how I imagined it to work. Let's try the go module full path thing!

Yup!! Worked!! :D :)

```bash
depstat $ go build -ldflags "-X github.com/kubernetes-sigs/depstat/cmd.DepstatVersion=v0.6.1"
depstat $ ./depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help      help for depstat
  -v, --version   version for depstat

Use "depstat [command] --help" for more information about a command.
depstat $ ./depstat -v
depstat version v0.6.1
depstat $ ./depstat --version
depstat version v0.6.1
depstat $ 
```

```bash
depstat $ goreleaser build --single-target --skip-validate
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=a316b794ffb9b92b5715659152ac48564c04dd28 latest tag=v0.6.1
      • pipe skipped              error=validation is disabled
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
   • checking ./dist  
   ⨯ build failed after 0.41s error=dist is not empty, remove it before running goreleaser or use the --rm-dist flag
depstat $ rm -rfv dist/
dist//CHANGELOG.md
dist//depstat_darwin_amd64/depstat
dist//depstat_darwin_amd64
dist//config.yaml
dist/
depstat $ goreleaser build --single-target --skip-validate --rm-dist
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=a316b794ffb9b92b5715659152ac48564c04dd28 latest tag=v0.6.1
      • pipe skipped              error=validation is disabled
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
   • checking ./dist  
   • loading go mod information
   • writing effective config file
      • writing                   config=dist/config.yaml
   • generating changelog
      • writing                   changelog=dist/CHANGELOG.md
   • building binaries
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_darwin_amd64/depstat
   • build succeeded after 0.94s
depstat $ ./dist/depstat_darwin_amd64/depstat 
depstat will help you get details about the dependencies of your Go modules enabled project

Usage:
  depstat [command]

Available Commands:
  cycles      Prints cycles in dependency chains.
  graph       Generate a .dot file to be used with Graphviz's dot command.
  help        Help about any command
  list        Lists all project dependencies
  stats       Shows metrics about dependency chains

Flags:
  -h, --help      help for depstat
  -v, --version   version for depstat

Use "depstat [command] --help" for more information about a command.
depstat $ ./dist/depstat_darwin_amd64/depstat -v
depstat version 0.6.1
depstat $ goreleaser build --single-target --skip-validate --rm-dist --snapshot
   • building...      
   • loading config file       file=.goreleaser.yml
   • building only for darwin/amd64
   • loading environment variables
   • getting and validating git state
      • building...               commit=a316b794ffb9b92b5715659152ac48564c04dd28 latest tag=v0.6.1
      • pipe skipped              error=disabled during snapshot mode
   • parsing tag      
   • running before hooks
      • running                   hook=go mod tidy
   • setting defaults 
      • snapshotting     
      • github/gitlab/gitea releases
      • project name     
      • loading go mod information
      • building binaries
      • creating source archive
      • archives         
      • linux packages   
      • snapcraft packages
      • calculating checksums
      • signing artifacts
      • signing docker images
      • docker images    
      • docker manifests 
      • artifactory      
      • blobs            
      • homebrew tap formula
      • scoop manifests  
      • twitter          
      • milestones       
   • snapshotting     
      • building snapshot...      version=0.6.2-next
   • checking ./dist  
      • --rm-dist is set, cleaning it up
   • loading go mod information
   • writing effective config file
      • writing                   config=dist/config.yaml
   • generating changelog
      • pipe skipped              error=not available for snapshots
   • building binaries
      • building                  binary=/Users/karuppiahn/projects/github.com/kubernetes-sigs/depstat/dist/depstat_darwin_amd64/depstat
   • build succeeded after 0.90s
depstat $ ./dist/depstat_darwin_amd64/depstat -v
depstat version 0.6.2-next
depstat $ 
```

---

TODO
- Update RELEASE.md with what someone has to do to publish a release automatically - just tag with git and push
- workflow should run only if the tag is in the main branch

---

Taking inspiration from https://github.com/gojekfarm/stevedore/pull/24

https://github.com/gojekfarm/stevedore/pull/24#discussion_r511482026

https://github.community/t/run-workflow-on-push-tag-on-specific-branch/17519

https://github.com/gojekfarm/stevedore/blob/master/.github/workflows/release.yml#L10

---

RELEASE.md file

It can talk about how one has to just tag a git commit in `main` branch using git, like `git tag` and push and that's it

It can talk about what and all GitHub Actions and goreleaser do when the tag is pushed

Link to goreleaser docs like https://goreleaser.com/cmd/goreleaser_release/ , https://goreleaser.com in general


