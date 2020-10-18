https://github.com/mattermost/mattermost-server/issues/15466

Readme has wrong link for contribution guidelines...

```markdown
- [Contribute Code](http://docs.mattermost.com/developer/contribution-guide.html)
```

```bash
found 52 vulnerabilities (6 low, 46 high)
  run `npm audit fix` to fix them, or `npm audit` for details
```

```bash
$ gd
diff --git a/package-lock.json b/package-lock.json
index a340046f7..e12036d20 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -12582,15 +12582,11 @@
       "resolved": "https://registry.npmjs.org/full-icu/-/full-icu-1.3.1.tgz",
       "integrity": "sha512-VMtK//85QJomhk3cXOCksNwOYaw1KWnYTS37GYGgyf7A3ajdBoPGhaJuJWAH2S2kq8GZeXkdKn+3Mfmgy11cVw==",
       "dev": true,
-      "requires": {
-        "icu4c-data": "0.64.2"
-      },
       "dependencies": {
         "icu4c-data": {
           "version": "0.64.2",
           "resolved": "https://registry.npmjs.org/icu4c-data/-/icu4c-data-0.64.2.tgz",
-          "integrity": "sha512-BPuTfkRTkplmK1pNrqgyOLJ0qB2UcQ12EotVLwiWh4ErtZR1tEYoRZk/LBLmlDfK5v574/lQYLB4jT9vApBiBQ==",
-          "dev": true
+          "integrity": "sha512-BPuTfkRTkplmK1pNrqgyOLJ0qB2UcQ12EotVLwiWh4ErtZR1tEYoRZk/LBLmlDfK5v574/lQYLB4jT9vApBiBQ=="
         }
       }
     },
```

Finally debugged the issue with respect to tests failing and passed the tests.
VS Code debugger for nodejs helped!! :)
