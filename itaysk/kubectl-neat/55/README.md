# Issue 55

https://github.com/itaysk/kubectl-neat/issues/55

https://duckduckgo.com/?q=golang+modules+cache+github+actions&t=ffab&ia=web

https://duckduckgo.com/?t=ffab&q=github+actions+cache+golang+dependencies&ia=web

https://github.com/actions/cache

https://github.com/mvdan/github-actions-golang

```yaml
- uses: actions/cache@v2
  with:
    path: |
      ~/go/pkg/mod              # Module download cache
      ~/.cache/go-build         # Build cache (Linux)
      ~/Library/Caches/go-build # Build cache (Mac)
      '%LocalAppData%\go-build' # Build cache (Windows)
    key: ${{ runner.os }}-go-${{ hashFiles('**/go.sum') }}
    restore-keys: |
      ${{ runner.os }}-go-
```

---


