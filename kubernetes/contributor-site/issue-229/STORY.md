```bash
kubernetes $ g clone git@github.com:karuppiah7890/contributor-site.git
Cloning into 'contributor-site'...
remote: Enumerating objects: 1980, done.
remote: Counting objects: 100% (334/334), done.
remote: Compressing objects: 100% (185/185), done.
remote: Total 1980 (delta 130), reused 282 (delta 101), pack-reused 1646
Receiving objects: 100% (1980/1980), 14.22 MiB | 4.14 MiB/s, done.
Resolving deltas: 100% (742/742), done.

kubernetes $ cd contributor-site/

contributor-site $ g remote add upstream git@github.com:kubernetes/contributor-site.git

contributor-site $ git remote set-url upstream --push no_push

contributor-site $ gst
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean

contributor-site $ g remote -v
origin	git@github.com:karuppiah7890/contributor-site.git (fetch)
origin	git@github.com:karuppiah7890/contributor-site.git (push)
upstream	git@github.com:kubernetes/contributor-site.git (fetch)
upstream	no_push (push)

contributor-site $ 
```

```bash
contributor-site $ code .
contributor-site $ gst
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   content/en/welcome/_index.md

no changes added to commit (use "git add" and/or "git commit -a")
contributor-site $ make
help                 Show this help text.
gen-content          Generates content from external sources.
render               Build the site using Hugo on the host.
server               Run Hugo locally (if Hugo "extended" is installed locally)
container-image      Build container image for use with container-* targets.
container-gen-content Generates content from external sources within a container (equiv to gen-content).
container-render     Build the site using Hugo within a container (equiv to render).
container-server     Run Hugo locally within a container, available at http://localhost:1313/
clean                Cleans build artifacts.
clean-all            Cleans both build artifacts and files sycned to content directory
production-build     Builds the production site (this command used only by Netlify).
preview-build        Builds a deploy preview of the site (this command used only by Netlify).
contributor-site $ make render
git submodule update --init --recursive --depth 1
Submodule 'themes/docsy' (https://github.com/google/docsy.git) registered for path 'themes/docsy'
Cloning into '/Users/karuppiahn/projects/github.com/kubernetes/contributor-site/themes/docsy'...
remote: Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Enumerating objects: 210, done.
remote: Counting objects: 100% (210/210), done.
remote: Compressing objects: 100% (98/98), done.
remote: Total 106 (delta 79), reused 21 (delta 2), pack-reused 0
Receiving objects: 100% (106/106), 19.56 KiB | 1.15 MiB/s, done.
Resolving deltas: 100% (79/79), completed with 76 local objects.
From https://github.com/google/docsy
 * branch            25f73360dc4b72c7606531b37edace0417b40858 -> FETCH_HEAD
Submodule path 'themes/docsy': checked out '25f73360dc4b72c7606531b37edace0417b40858'
Submodule 'assets/vendor/Font-Awesome' (https://github.com/FortAwesome/Font-Awesome.git) registered for path 'themes/docsy/assets/vendor/Font-Awesome'
Submodule 'assets/vendor/bootstrap' (https://github.com/twbs/bootstrap.git) registered for path 'themes/docsy/assets/vendor/bootstrap'
Cloning into '/Users/karuppiahn/projects/github.com/kubernetes/contributor-site/themes/docsy/assets/vendor/Font-Awesome'...
Cloning into '/Users/karuppiahn/projects/github.com/kubernetes/contributor-site/themes/docsy/assets/vendor/bootstrap'...
remote: Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Enumerating objects: 3289, done.
remote: Counting objects: 100% (3289/3289), done.
remote: Compressing objects: 100% (1653/1653), done.
remote: Total 1719 (delta 1550), reused 217 (delta 65), pack-reused 0
Receiving objects: 100% (1719/1719), 1.28 MiB | 2.35 MiB/s, done.
Resolving deltas: 100% (1550/1550), completed with 1478 local objects.
From https://github.com/FortAwesome/Font-Awesome
 * branch            951a0d011f8c832991750c16136f8e260efa60b5 -> FETCH_HEAD
Submodule path 'themes/docsy/assets/vendor/Font-Awesome': checked out '951a0d011f8c832991750c16136f8e260efa60b5'
remote: Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Enumerating objects: 699, done.
remote: Counting objects: 100% (699/699), done.
remote: Compressing objects: 100% (510/510), done.
remote: Total 528 (delta 120), reused 205 (delta 14), pack-reused 0
Receiving objects: 100% (528/528), 2.20 MiB | 4.51 MiB/s, done.
Resolving deltas: 100% (120/120), completed with 84 local objects.
From https://github.com/twbs/bootstrap
 * branch            7a6da5e3e7ad7c749dde806546a35d4d4259d965 -> FETCH_HEAD
Submodule path 'themes/docsy/assets/vendor/bootstrap': checked out '7a6da5e3e7ad7c749dde806546a35d4d4259d965'
hugo --verbose --ignoreCache --minify
Start building sites … 
hugo v0.87.0+extended darwin/amd64 BuildDate=unknown
INFO 2021/08/20 11:23:55 syncing static files to /Users/karuppiahn/projects/github.com/kubernetes/contributor-site/public/
Error: Error building site: POSTCSS: failed to transform "scss/main.css" (text/css). Check your PostCSS installation; install with "npm install postcss-cli". See https://gohugo.io/hugo-pipes/postcss/
Total in 1121 ms
make: *** [render] Error 255
contributor-site $ tig content/en/
_index.md                docs/                    resources/               
blog/                    events/                  search.md                
community/               featured-background.jpg  welcome/                 
contributor-site $ tig content/en/welcome/
_index.md                featured-background.jpg  
contributor-site $ tig content/en/welcome/_index.md 
contributor-site $ 
```

```bash
contributor-site $ npm install postcss-cli
npm WARN old lockfile 
npm WARN old lockfile The package-lock.json file was created with an old version of npm,
npm WARN old lockfile so supplemental metadata must be fetched from the registry.
npm WARN old lockfile 
npm WARN old lockfile This is a one-time fix-up, please be patient...
npm WARN old lockfile 
npm WARN deprecated fsevents@2.1.2: "Please update to latest v2.3 or v2.2"

added 121 packages, and audited 122 packages in 4s

12 packages are looking for funding
  run `npm fund` for details

4 vulnerabilities (2 moderate, 2 high)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
npm notice 
npm notice New minor version of npm available! 7.19.1 -> 7.21.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v7.21.0
npm notice Run npm install -g npm@7.21.0 to update!
npm notice 
contributor-site $ gst
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   content/en/welcome/_index.md
	modified:   package-lock.json
	modified:   package.json

no changes added to commit (use "git add" and/or "git commit -a")
contributor-site $ gco package*
Updated 2 paths from the index
contributor-site $ gst
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   content/en/welcome/_index.md

no changes added to commit (use "git add" and/or "git commit -a")
contributor-site $ npm install -g postcss-cli

added 78 packages, and audited 79 packages in 3s

11 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
contributor-site $ npm i -g npm

removed 7 packages, changed 36 packages, and audited 257 packages in 2s

10 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
contributor-site $ npm version
{
  'contributor-site': '0.0.1',
  npm: '7.21.0',
  node: '16.1.0',
  v8: '9.0.257.24-node.11',
  uv: '1.41.0',
  zlib: '1.2.11',
  brotli: '1.0.9',
  ares: '1.17.1',
  modules: '93',
  nghttp2: '1.42.0',
  napi: '8',
  llhttp: '6.0.1',
  openssl: '1.1.1k+quic',
  cldr: '39.0',
  icu: '69.1',
  tz: '2021a',
  unicode: '13.0',
  ngtcp2: '0.1.0-DEV',
  nghttp3: '0.1.0-DEV'
}
contributor-site $ npm -v
7.21.0
contributor-site $ 
```

```bash
contributor-site $ gst
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   content/en/welcome/_index.md

no changes added to commit (use "git add" and/or "git commit -a")
contributor-site $ npm uninstall -g postcss-cli

removed 74 packages, and audited 1 package in 369ms

found 0 vulnerabilities
contributor-site $ po
pod2html         pod2readme       pod2usage5.18    podselect5.30    postdrop         postmaster
pod2html5.18     pod2readme5.18   pod2usage5.30    policytool       postfix          postmulti
pod2html5.30     pod2readme5.30   podchecker       popd             postgres         postqueue
pod2latex        pod2text         podchecker5.18   post-grohtml     postkick         postsuper
pod2man          pod2text5.18     podchecker5.30   postalias        postlock         power_report.sh
pod2man5.18      pod2text5.30     podselect        postcat          postlog          powermetrics
pod2man5.30      pod2usage        podselect5.18    postconf         postmap          
contributor-site $ post
post-grohtml  postcat       postdrop      postgres      postlock      postmap       postmulti     postsuper
postalias     postconf      postfix       postkick      postlog       postmaster    postqueue     
contributor-site $ postc
postcat   postconf  
contributor-site $ npm i
npm WARN old lockfile 
npm WARN old lockfile The package-lock.json file was created with an old version of npm,
npm WARN old lockfile so supplemental metadata must be fetched from the registry.
npm WARN old lockfile 
npm WARN old lockfile This is a one-time fix-up, please be patient...
npm WARN old lockfile 

added 15 packages, removed 2 packages, changed 22 packages, and audited 135 packages in 2s

7 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (3 moderate, 2 high)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
contributor-site $ 
```

```bash
contributor-site $ gst
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   content/en/welcome/_index.md
	modified:   package-lock.json

no changes added to commit (use "git add" and/or "git commit -a")
contributor-site $ gd package-lock.json 
diff --git a/package-lock.json b/package-lock.json
index 4c0dc4b..c7781cb 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -1,8 +1,1448 @@
 {
   "name": "contributor-site",
   "version": "0.0.1",
-  "lockfileVersion": 1,
+  "lockfileVersion": 2,
   "requires": true,
+  "packages": {
+    "": {
+      "name": "contributor-site",
+      "version": "0.0.1",
+      "license": "ISC",
+      "devDependencies": {
+        "autoprefixer": "^9.7.6",
+        "postcss-cli": "^7.1.0"
+      }
+    },
+    "node_modules/@nodelib/fs.scandir": {
+      "version": "2.1.3",
+      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.3.tgz",
+      "integrity": "sha512-eGmwYQn3gxo4r7jdQnkrrN6bY478C3P+a/y72IJukF8LjB6ZHeB3c+Ehacj3sYeSmUXGlnA67/PmbM9CVwL7Dw==",
+      "dev": true,
+      "dependencies": {
+        "@nodelib/fs.stat": "2.0.3",
+        "run-parallel": "^1.1.9"
+      },
+      "engines": {
+        "node": ">= 8"
+      }
contributor-site $ gco package-lock.json 
Updated 1 path from the index
contributor-site $ 
```

```bash
contributor-site $ make
help                 Show this help text.
gen-content          Generates content from external sources.
render               Build the site using Hugo on the host.
server               Run Hugo locally (if Hugo "extended" is installed locally)
container-image      Build container image for use with container-* targets.
container-gen-content Generates content from external sources within a container (equiv to gen-content).
container-render     Build the site using Hugo within a container (equiv to render).
container-server     Run Hugo locally within a container, available at http://localhost:1313/
clean                Cleans build artifacts.
clean-all            Cleans both build artifacts and files sycned to content directory
production-build     Builds the production site (this command used only by Netlify).
preview-build        Builds a deploy preview of the site (this command used only by Netlify).
contributor-site $ make render
git submodule update --init --recursive --depth 1
hugo --verbose --ignoreCache --minify
Start building sites … 
hugo v0.87.0+extended darwin/amd64 BuildDate=unknown
INFO 2021/08/20 12:17:57 syncing static files to /Users/karuppiahn/projects/github.com/kubernetes/contributor-site/public/
INFO 2021/08/20 12:17:57 postcss: use config file /Users/karuppiahn/projects/github.com/kubernetes/contributor-site/themes/docsy/postcss.config.js
INFO 2021/08/20 12:17:58 postcss: Browserslist: caniuse-lite is outdated. Please run:
npx browserslist@latest --update-db

                   | EN  
-------------------+-----
  Pages            | 45  
  Paginator pages  |  0  
  Non-page files   | 23  
  Static files     | 41  
  Processed images |  5  
  Aliases          | 12  
  Sitemaps         |  1  
  Cleaned          |  0  

Total in 1721 ms
contributor-site $ make server
git submodule update --init --recursive --depth 1
hugo server \
		--verbose \
		--buildDrafts \
		--buildFuture \
		--disableFastRender \
		--ignoreCache
Start building sites … 
hugo v0.87.0+extended darwin/amd64 BuildDate=unknown
INFO 2021/08/20 12:18:14 syncing static files to /

                   | EN  
-------------------+-----
  Pages            | 45  
  Paginator pages  |  0  
  Non-page files   | 23  
  Static files     | 41  
  Processed images |  5  
  Aliases          | 12  
  Sitemaps         |  1  
  Cleaned          |  0  

Built in 737 ms
Watching for changes in /Users/karuppiahn/projects/github.com/kubernetes/contributor-site/{assets,content,layouts,package.json,static,themes}
Watching for config changes in /Users/karuppiahn/projects/github.com/kubernetes/contributor-site/config.toml, /Users/karuppiahn/projects/github.com/kubernetes/contributor-site/themes/docsy/config.toml
Environment: "development"
Serving pages from memory
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
^C
contributor-site $ 
```

Tried

http://localhost:1313/

http://localhost:1313/welcome/

And it linked to http://localhost:1313/community/code-of-conduct/ :)

Finally raised the PR ! :D

https://github.com/kubernetes/contributor-site/pull/237
