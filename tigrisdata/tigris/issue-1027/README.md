# issue-1027

https://discord.com/channels/1033842669983633488/1033843208192524348/1095960587806183494

https://github.com/tigrisdata/tigris/issues/1027

```
Its not urgent but will make the code a lot nicer. It will also introduce you to the filter and collection sections of the database. There is plenty of work that can be done at that level once you familiar with it.
```

```markdown
The [Key_builder](https://github.com/tigrisdata/tigris/blob/main/query/filter/key_builder.go) supports generics to allow `schema.Field` or `schema.QueryableField`. This should be removed and `key_builder` should only accept `schema.QueryableField`.

Steps to get this working:

1. Remove generics in key_builder
2. Fix tests to only accept `schema.QueryableField` this could be done by converting the current `schema.Field` options into a `queryableField` before running the test
3. Add a method on `schema.DefaultCollection` to get the primarykeys as a list of queryablefields
```

https://github.com/tigrisdata/tigris/blob/main/query/filter/key_builder.go

Goal:
- Raise a PR
    - Work on the PR review comments
    - Try to understand code you have worked on
- Go to the `main` version of the code and understand key builder tests - the input, expected output
- Index scan vs sequential scan (or full scan)
- Understand Tigris Codebase
- Learn about Golang Generics
- Learn about Tigris
    - What Tigris does. Where it helps
    - What FoundationDB does. Where it helps
    - What kind of data models it allows?
        - Relational?
        - Document?
        - Key value?
        - Time Series?
        - Graph?
    - What kind of features does it have?
        - Filters?
        - Search?
        - Sort?
    - What are indexes?
    - What are primary indexes / indices?
    - What are secondary indexes / indices?
- Understand Tigris Internals
    - filter
    - collection
- Understand what I'm working on
    - Understand what key builder is
        - Understand what key is, what does it refer to? what key?
        - Understand what key builder is
    - Understand what `schema.Field` is
    - Understand what `schema.QueryableField` is, how is it different from `schema.Field`?
    - 


---

Questions
- What is collation?
- What is secondary index?
- What is schema field and schema queryable field?
- What does `filter.Build()` do? Who calls it? What do they call it for?
- What is `Filter`?
- What is `Selector`?

---

Errors to fix
- Compiler errors!
    - With respect to `api` / `github.com/tigrisdata/tigris/api/server/v1` package - auto generated? I think it's related to `schema.Field`. Anything `api` related, it's an error now. After the change in `NewPrimaryKeyEqBuilder` function in key builder source file [FIXED]
        - `server/services/v1/database/base_runner.go` [FIXED]
        - `server/services/v1/database/query_runner.go` [FIXED]


---

References
- https://www.tigrisdata.com/
- https://www.tigrisdata.com/docs/
https://www.tigrisdata.com/docs/quickstarts/
- https://www.tigrisdata.com/docs/quickstarts/quickstart-http/
- https://github.com/tigrisdata/tigris/blob/main/docs/rfcs/001-secondary-indexes.md
- https://www.foundationdb.org/
- https://apple.github.io/foundationdb/
- https://apple.github.io/foundationdb/administration.html#cluster-files
- https://tech.marksblogg.com/minimalist-guide-tutorial-foundationdb.html
- https://apple.github.io/foundationdb/flow.html
- https://apple.github.io/foundationdb/administration.html#administration-running-foundationdb
- https://apple.github.io/foundationdb/getting-started-mac.html
- https://apple.github.io/foundationdb/developer-guide.html#developer-guide-sub-keyspaces
- https://apple.github.io/foundationdb/class-scheduling.html
- https://apple.github.io/foundationdb/class-scheduling-go.html

---

Filter JSON representation -

```json
[
    {
        "f1": 10
    },
    {
        "f2": 10
    },
    {
        "$or": [
            {
                "f3": 20
            },
            {
                "$and": [
                    {
                        "f4": 5
                    },
                    {
                        "f5": 6
                    }
                ]
            }
        ]
    }
]
```

in human readable form -

```
((f4=5 AND f5=6) OR (f3=20)) AND f1=10 AND f2=10
```

Why not use `a` for `$and`, `o` for `$or` or similar short forms? The JSON would be shorter. But what's the advantage of having a smaller JSON? There are way more smaller wire formats

Questions
- Where is this JSON used? The filter JSON
    - Can something else be used?
