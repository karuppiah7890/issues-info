https://github.com/Homebrew/homebrew-core/pull/81111

https://github.com/Homebrew/homebrew-core/pull/81111/files

https://github.com/Homebrew/homebrew-core/commits/ee80847090dd7cc56196bdd1fdaf0a895eebb541/Formula/go.rb

https://duckduckgo.com/?t=ffab&q=homebrew+bump-forumala-pr&ia=web

https://docs.brew.sh/How-To-Open-a-Homebrew-Pull-Request

https://github.com/Homebrew/homebrew-core/blob/master/Formula/go.rb

https://github.com/Homebrew/homebrew-core/pull/82758

---

```bash
karuppiahn-a01:homebrew-core karuppiahn$ code .
karuppiahn-a01:homebrew-core karuppiahn$ brew bump-formula-pr
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 2 taps (homebrew/core and homebrew/cask).
==> Updated Formulae
Updated 22 formulae.
==> Updated Casks
Updated 1 cask.

Warning: bump-formula-pr is a developer command, so
Homebrew's developer mode has been automatically turned on.
To turn developer mode off, run brew developer off

Usage: brew bump-formula-pr [options] [formula]

Create a pull request to update formula with a new URL or a new tag.

If a URL is specified, the SHA-256 checksum of the new download should also
be specified. A best effort to determine the SHA-256 and formula name will
be made if either or both values are not supplied by the user.

If a tag is specified, the Git commit revision corresponding to that tag
should also be specified. A best effort to determine the revision will be made
if the value is not supplied by the user.

If a version is specified, a best effort to determine the URL and SHA-256
or the tag and revision will be made if both values are not supplied by the
user.

Note: this command cannot be used to transition a formula from a
URL-and-SHA-256 style specification into a tag-and-revision style specification,
nor vice versa. It must use whichever style specification the formula already
uses.

  -n, --dry-run                    Print what would be done rather than doing
                                   it.
      --write                      Make the expected file modifications
                                   without taking any Git actions.
      --commit                     When passed with --write, generate a new
                                   commit after writing changes to the formula
                                   file.
      --no-audit                   Don't run brew audit before opening the
                                   PR.
      --strict                     Run brew audit --strict before opening
                                   the PR.
      --online                     Run brew audit --online before opening
                                   the PR.
      --no-browse                  Print the pull request URL instead of
                                   opening in a browser.
      --no-fork                    Don't try to fork the repository.
      --mirror                     Use the specified URL as a mirror URL. If
                                   URL is a comma-separated list of URLs,
                                   multiple mirrors will be added.
      --fork-org                   Use the specified GitHub organization for
                                   forking.
      --version                    Use the specified version to override the
                                   value parsed from the URL or tag. Note that
                                   --version=0 can be used to delete an
                                   existing version override from a formula if
                                   it has become redundant.
      --message                    Append message to the default pull
                                   request message.
      --url                        Specify the URL for the new download. If
                                   a URL is specified, the SHA-256
                                   checksum of the new download should also be
                                   specified.
      --sha256                     Specify the SHA-256 checksum of the new
                                   download.
      --tag                        Specify the new git commit tag for the
                                   formula.
      --revision                   Specify the new commit revision
                                   corresponding to the specified git tag or
                                   specified version.
  -f, --force                      Ignore duplicate open PRs. Remove all
                                   mirrors if --mirror was not specified.
  -d, --debug                      Display any debugging information.
  -q, --quiet                      Make some output more quiet.
  -v, --verbose                    Make some output more verbose.
  -h, --help                       Show this message.

Error: Invalid usage: this command requires a formula argument
karuppiahn-a01:homebrew-core karuppiahn$ brew bump-formula-pr Formula/go.rb 
Error: This formula is not in a tap!
karuppiahn-a01:homebrew-core karuppiahn$ brew bump-formula-pr go
==> Installing 'bundler' gem
Fetching bundler-1.17.3.gem
Fetching gem metadata from https://rubygems.org/.........
Fetching concurrent-ruby 1.1.9
Fetching zeitwerk 2.4.2
Fetching minitest 5.14.4
Installing zeitwerk 2.4.2
Installing minitest 5.14.4
Installing concurrent-ruby 1.1.9
Fetching public_suffix 4.0.6
Installing public_suffix 4.0.6
Fetching ast 2.4.2
Installing ast 2.4.2
Fetching bindata 2.4.10
Fetching msgpack 1.4.2
Installing bindata 2.4.10
Installing msgpack 1.4.2 with native extensions
Using bundler 1.17.3
Fetching byebug 11.1.3
Installing byebug 11.1.3 with native extensions
Fetching connection_pool 2.2.5
Installing connection_pool 2.2.5
Fetching did_you_mean 1.5.0
Installing did_you_mean 1.5.0
Fetching diff-lcs 1.4.4
Installing diff-lcs 1.4.4
Fetching docile 1.4.0
Installing docile 1.4.0
Fetching unf_ext 0.0.7.7
Installing unf_ext 0.0.7.7 with native extensions
Fetching hpricot 0.8.6
Installing hpricot 0.8.6 with native extensions
Fetching mime-types-data 3.2021.0704
Installing mime-types-data 3.2021.0704
Fetching net-http-digest_auth 1.4.1
Installing net-http-digest_auth 1.4.1
Fetching mini_portile2 2.5.3
Installing mini_portile2 2.5.3
Fetching racc 1.5.2
Installing racc 1.5.2 with native extensions
Fetching rubyntlm 0.6.3
Installing rubyntlm 0.6.3
Fetching webrick 1.7.0
Installing webrick 1.7.0
Fetching webrobots 0.1.2
Installing webrobots 0.1.2
Fetching mustache 1.1.1
Installing mustache 1.1.1
Fetching parallel 1.20.1
Installing parallel 1.20.1
Fetching plist 3.6.0
Installing plist 3.6.0
Fetching rack 2.2.3
Installing rack 2.2.3
Fetching rainbow 3.0.0
Installing rainbow 3.0.0
Fetching rdiscount 2.2.0.2
Installing rdiscount 2.2.0.2 with native extensions
Fetching regexp_parser 2.1.1
Installing regexp_parser 2.1.1
Fetching rexml 3.2.5
Installing rexml 3.2.5
Fetching rspec-support 3.10.2
Installing rspec-support 3.10.2
Fetching ruby-progressbar 1.11.0
Installing ruby-progressbar 1.11.0
Fetching unicode-display_width 2.0.0
Installing unicode-display_width 2.0.0
Fetching ruby-macho 2.5.1
Installing ruby-macho 2.5.1
Fetching simplecov-html 0.12.3
Installing simplecov-html 0.12.3
Fetching simplecov_json_formatter 0.1.3
Installing simplecov_json_formatter 0.1.3
Fetching sorbet-runtime-stub 0.2.0
Installing sorbet-runtime-stub 0.2.0
Fetching warning 1.2.0
Installing warning 1.2.0
Fetching parser 3.0.2.0
Installing parser 3.0.2.0
Fetching addressable 2.8.0
Installing addressable 2.8.0
Fetching elftools 1.1.3
Installing elftools 1.1.3
Fetching i18n 1.8.10
Installing i18n 1.8.10
Fetching tzinfo 2.0.4
Installing tzinfo 2.0.4
Fetching net-http-persistent 4.0.1
Installing net-http-persistent 4.0.1
Fetching bootsnap 1.7.7
Installing bootsnap 1.7.7 with native extensions
Fetching mime-types 3.3.1
Installing mime-types 3.3.1
Fetching unf 0.1.4
Installing unf 0.1.4
Fetching parallel_tests 3.7.0
Installing parallel_tests 3.7.0
Fetching nokogiri 1.11.7 (x86_64-darwin)
Installing nokogiri 1.11.7 (x86_64-darwin)
Fetching rspec-core 3.10.1
Installing rspec-core 3.10.1
Fetching rspec-expectations 3.10.1
Installing rspec-expectations 3.10.1
Fetching rspec-mocks 3.10.2
Installing rspec-mocks 3.10.2
Fetching simplecov 0.21.2
Installing simplecov 0.21.2
Fetching rubocop-ast 1.8.0
Installing rubocop-ast 1.8.0
Fetching patchelf 1.3.0
Installing patchelf 1.3.0
Fetching activesupport 6.1.4
Installing activesupport 6.1.4
Fetching domain_name 0.5.20190701
Installing domain_name 0.5.20190701
Fetching rspec-github 2.3.1
Installing rspec-github 2.3.1
Fetching rspec-retry 0.6.2
Installing rspec-retry 0.6.2
Fetching rspec_junit_formatter 0.4.1
Installing rspec_junit_formatter 0.4.1
Fetching rspec-its 1.3.0
Installing rspec-its 1.3.0
Fetching rspec 3.10.0
Installing rspec 3.10.0
Fetching simplecov-cobertura 1.4.2
Installing simplecov-cobertura 1.4.2
Fetching rubocop 1.18.4
Installing rubocop 1.18.4
Fetching http-cookie 1.0.4
Installing http-cookie 1.0.4
Fetching rspec-wait 0.0.9
Installing rspec-wait 0.0.9
Fetching rubocop-performance 1.11.4
Installing rubocop-performance 1.11.4
Fetching rubocop-rails 2.11.3
Installing rubocop-rails 2.11.3
Fetching rubocop-rspec 2.4.0
Installing rubocop-rspec 2.4.0
Fetching rubocop-sorbet 0.6.2
Installing rubocop-sorbet 0.6.2
Fetching mechanize 2.8.1
Installing mechanize 2.8.1
Fetching ronn 0.7.3
Installing ronn 0.7.3
Bundle complete! 32 Gemfile dependencies, 72 gems now installed.
Bundled gems are installed into `../../../../../../usr/local/Homebrew/Library/Homebrew/vendor/bundle`
Error: These pull requests may be duplicates:
go 1.16.7 https://github.com/Homebrew/homebrew-core/pull/82758
go 1.17rc1 - testing only https://github.com/Homebrew/homebrew-core/pull/81919
Duplicate PRs should not be opened. Use --force to override this error.
karuppiahn-a01:homebrew-core karuppiahn$ brew --repository
/usr/local/Homebrew
karuppiahn-a01:homebrew-core karuppiahn$ brew --repository homebrew/core
/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core
karuppiahn-a01:homebrew-core karuppiahn$ gst
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
karuppiahn-a01:homebrew-core karuppiahn$ brew bump-formula-pr --dry-run go
Error: These pull requests may be duplicates:
go 1.16.7 https://github.com/Homebrew/homebrew-core/pull/82758
go 1.17rc1 - testing only https://github.com/Homebrew/homebrew-core/pull/81919
Duplicate PRs should not be opened. Use --force to override this error.
karuppiahn-a01:homebrew-core karuppiahn$ brew bump-formula-pr --dry-run --sha256 1a9f2894d3d878729f7045072f30becebe243524cf2fce4e0a7b248b1e0654ac --url https://golang.org/dl/go1.16.7.src.tar.gz --mirror https://fossies.org/linux/misc/go1.16.7.src.tar.gz go
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/core).
==> Updated Formulae
Updated 1 formula.

Error: These pull requests may be duplicates:
go 1.16.7 https://github.com/Homebrew/homebrew-core/pull/82758
go 1.17rc1 - testing only https://github.com/Homebrew/homebrew-core/pull/81919
Duplicate PRs should not be opened. Use --force to override this error.
karuppiahn-a01:homebrew-core karuppiahn$ 
```

https://golang.org/dl/


