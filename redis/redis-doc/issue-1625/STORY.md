# issue-1625

https://github.com/redis/redis-doc

https://github.com/redis/redis-doc/issues/1625

https://github.com/karuppiah7890/redis-doc

```bash
$ mkdir redis
$ cd redis
$ g clone git@github.com:karuppiah7890/redis-doc.git
$ cd redis-doc
$ g remote add upstream git@github.com:redis/redis-doc.git
$ g remote set-url upstream --push no_push

$ g remote -v
origin	git@github.com:karuppiah7890/redis-doc.git (fetch)
origin	git@github.com:karuppiah7890/redis-doc.git (push)
upstream	git@github.com:redis/redis-doc.git (fetch)
upstream	no_push (push)

redis-doc $ rake format:cached 
redis-doc $ 

redis-doc $ rake format:cached -v
redis-doc $ 

redis-doc $ rake format:cached --verbose
redis-doc $ 

redis-doc $ rake format:cached -h
rake [-f rakefile] {options} targets...

Options are ...
        --backtrace=[OUT]            Enable full backtrace.  OUT can be stderr (default) or stdout.
        --comments                   Show commented tasks only
        --job-stats [LEVEL]          Display job statistics. LEVEL=history displays a complete job list
        --rules                      Trace the rules resolution.
        --suppress-backtrace PATTERN Suppress backtrace lines matching regexp PATTERN. Ignored if --trace is on.
    -A, --all                        Show all tasks, even uncommented ones (in combination with -T or -D)
    -B, --build-all                  Build all prerequisites, including those which are up-to-date.
    -D, --describe [PATTERN]         Describe the tasks (matching optional PATTERN), then exit.
    -e, --execute CODE               Execute some Ruby code and exit.
    -E, --execute-continue CODE      Execute some Ruby code, then continue with normal task processing.
    -f, --rakefile [FILENAME]        Use FILENAME as the rakefile to search for.
    -G, --no-system, --nosystem      Use standard project Rakefile search paths, ignore system wide rakefiles.
    -g, --system                     Using system wide (global) rakefiles (usually '~/.rake/*.rake').
    -I, --libdir LIBDIR              Include LIBDIR in the search path for required modules.
    -j, --jobs [NUMBER]              Specifies the maximum number of tasks to execute in parallel. (default is number of CPU cores + 4)
    -m, --multitask                  Treat all tasks as multitasks.
    -n, --dry-run                    Do a dry run without executing actions.
    -N, --no-search, --nosearch      Do not search parent directories for the Rakefile.
    -P, --prereqs                    Display the tasks and dependencies, then exit.
    -p, --execute-print CODE         Execute some Ruby code, print the result, then exit.
    -q, --quiet                      Do not log messages to standard output.
    -r, --require MODULE             Require MODULE before executing rakefile.
    -R, --rakelibdir RAKELIBDIR,     Auto-import any .rake files in RAKELIBDIR. (default is 'rakelib')
        --rakelib
    -s, --silent                     Like --quiet, but also suppresses the 'in directory' announcement.
    -t, --trace=[OUT]                Turn on invoke/execute tracing, enable full backtrace. OUT can be stderr (default) or stdout.
    -T, --tasks [PATTERN]            Display the tasks (matching optional PATTERN) with descriptions, then exit. -AT combination displays all of tasks contained no description.
    -v, --verbose                    Log message to standard output.
    -V, --version                    Display the program version.
    -W, --where [PATTERN]            Describe the tasks (matching optional PATTERN), then exit.
    -X, --no-deprecation-warnings    Disable the deprecation warnings.
    -h, -H, --help                   Display this help message.
redis-doc $ 

redis-doc $ gem install redcarpet nokogiri batch
Fetching redcarpet-3.5.1.gem
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory.
redis-doc $ ls /Library/Ruby/Gems/2.6.0
build_info	cache		doc		extensions	gems		specifications
redis-doc $ ls /Library/Ruby/Gems/
2.6.0
redis-doc $ ls -al /Library/Ruby/Gems/
total 0
drwxr-xr-x  3 root  wheel   96 Jan  1  2020 .
drwxr-xr-x  4 root  wheel  128 Jan  1  2020 ..
drwxr-xr-x  8 root  wheel  256 Jan  1  2020 2.6.0
redis-doc $ whoami
karuppiahn
redis-doc $ chown karuppiahn /Library/Ruby/Gems/2.6.0
chown: /Library/Ruby/Gems/2.6.0: Operation not permitted
redis-doc $ sudo chown karuppiahn /Library/Ruby/Gems/2.6.0
Password:
redis-doc $ gem install redcarpet nokogiri batch
Fetching redcarpet-3.5.1.gem
#<Thread:0x00007f8e63848b10@/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/request_set.rb:168 run> terminated with exception (report_on_exception is true):
Traceback (most recent call last):
	7: from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/request_set.rb:174:in `block (2 levels) in install'
	6: from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/resolver/specification.rb:101:in `download'
	5: from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/source.rb:206:in `download'
	4: from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/remote_fetcher.rb:158:in `download'
	3: from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/remote_fetcher.rb:305:in `cache_update_path'
	2: from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems.rb:876:in `write_binary'
	1: from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems.rb:876:in `open'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems.rb:876:in `initialize': Permission denied @ rb_sysopen - /Library/Ruby/Gems/2.6.0/cache/redcarpet-3.5.1.gem (Errno::EACCES)
ERROR:  While executing gem ... (Errno::EACCES)
    Permission denied @ rb_sysopen - /Library/Ruby/Gems/2.6.0/cache/redcarpet-3.5.1.gem
redis-doc $ ls -al /Library/Ruby/Gems/
total 0
drwxr-xr-x  3 root        wheel   96 Jan  1  2020 .
drwxr-xr-x  4 root        wheel  128 Jan  1  2020 ..
drwxr-xr-x  8 karuppiahn  wheel  256 Jan  1  2020 2.6.0
redis-doc $ ls -al /Library/Ruby/Gems/2.6.0/
total 0
drwxr-xr-x   8 karuppiahn  wheel  256 Jan  1  2020 .
drwxr-xr-x   3 root        wheel   96 Jan  1  2020 ..
drwxr-xr-x   2 root        wheel   64 Jan  1  2020 build_info
drwxr-xr-x  10 root        wheel  320 Aug  5 20:24 cache
drwxr-xr-x   3 root        wheel   96 Aug  5 20:24 doc
drwxr-xr-x   2 root        wheel   64 Jan  1  2020 extensions
drwxr-xr-x  13 root        wheel  416 Aug  5 20:24 gems
drwxr-xr-x  11 root        wheel  352 Aug  5 20:24 specifications
redis-doc $ sudo chown karuppiahn -R /Library/Ruby/Gems/2.6.0
chown: -R: No such file or directory
redis-doc $ sudo chown -R karuppiahn /Library/Ruby/Gems/2.6.0
redis-doc $ gem install redcarpet nokogiri batch
Fetching redcarpet-3.5.1.gem
Building native extensions. This could take a while...
Successfully installed redcarpet-3.5.1
Parsing documentation for redcarpet-3.5.1
Installing ri documentation for redcarpet-3.5.1
Done installing documentation for redcarpet after 0 seconds
Fetching nokogiri-1.12.3-arm64-darwin.gem
Fetching racc-1.5.2.gem
Building native extensions. This could take a while...
Successfully installed racc-1.5.2
Successfully installed nokogiri-1.12.3-arm64-darwin
Parsing documentation for racc-1.5.2
Installing ri documentation for racc-1.5.2
Parsing documentation for nokogiri-1.12.3-arm64-darwin
Installing ri documentation for nokogiri-1.12.3-arm64-darwin
Done installing documentation for racc, nokogiri after 2 seconds
Fetching batch-1.0.4.gem
Successfully installed batch-1.0.4
Parsing documentation for batch-1.0.4
Installing ri documentation for batch-1.0.4
Done installing documentation for batch after 0 seconds
4 gems installed
redis-doc $ 
```


