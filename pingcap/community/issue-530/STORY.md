https://github.com/pingcap/community/issues/530

```bash
pingcap $ g clone git@github.com:karuppiah7890/community.git
Cloning into 'community'...
remote: Enumerating objects: 2898, done.
remote: Counting objects: 100% (390/390), done.
remote: Compressing objects: 100% (200/200), done.
remote: Total 2898 (delta 228), reused 329 (delta 188), pack-reused 2508
Receiving objects: 100% (2898/2898), 8.68 MiB | 3.14 MiB/s, done.
Resolving deltas: 100% (1676/1676), done.
pingcap $ cd 
community/ tidb/      
pingcap $ cd community/
community $ g add upstream git@github.com:pingcap/community.git
fatal: pathspec 'upstream' did not match any files
community $ g remote add upstream git@github.com:pingcap/community.git
community $ g remote -0v
error: unknown switch \`0\'
usage: git remote [-v | --verbose]
   or: git remote add [-t <branch>] [-m <master>] [-f] [--tags | --no-tags] [--mirror=<fetch|push>] <name> <url>
   or: git remote rename <old> <new>
   or: git remote remove <name>
   or: git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
   or: git remote [-v | --verbose] show [-n] <name>
   or: git remote prune [-n | --dry-run] <name>
   or: git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)...]
   or: git remote set-branches [--add] <name> <branch>...
   or: git remote get-url [--push] [--all] <name>
   or: git remote set-url [--push] <name> <newurl> [<oldurl>]
   or: git remote set-url --add <name> <newurl>
   or: git remote set-url --delete <name> <url>

    -v, --verbose         be verbose; must be placed before a subcommand

community $ g remote -v
origin	git@github.com:karuppiah7890/community.git (fetch)
origin	git@github.com:karuppiah7890/community.git (push)
upstream	git@github.com:pingcap/community.git (fetch)
upstream	git@github.com:pingcap/community.git (push)
community $ g remote set-url upstream --push no_push
community $ g remote -v
origin	git@github.com:karuppiah7890/community.git (fetch)
origin	git@github.com:karuppiah7890/community.git (push)
upstream	git@github.com:pingcap/community.git (fetch)
upstream	no_push (push)
community $ 
```

https://pingcap.github.io/tidb-dev-guide/contribute-to-tidb/contribute-code.html#looking-for-what-to-contribute

https://github.com/pingcap/community/issues/525

https://pingcap.github.io/tidb-dev-guide/contribute-to-tidb/

https://pingcap.github.io/tidb-dev-guide/

https://pingcap.github.io/tidb-dev-guide/contribute-to-tidb/introduction.html

https://allcontributors.org/docs/en/emoji-key

https://github.com/pingcap/tidb-dev-guide

https://forms.pingcap.com/f/tidb-contribution-swag

Signed the CLA again for this particular repo https://cla-assistant.io/pingcap/community?pullRequest=531

Looks like Prow is used for the automation in TiDB, hmm, interesting!!

https://book.prow.tidb.io/#/en/workflows/pr

https://prow.tidb.io/tichi/repos/pingcap/community/pulls/531/owners

I cced tisonkun as he was commenting on the issues I created

`/cc @tisonkun`



