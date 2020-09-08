https://github.com/pandas-dev/pandas/issues/20432

I'm checking out this now

https://pandas.pydata.org/pandas-docs/stable/development/contributing.html

https://pandas.pydata.org/pandas-docs/stable/development/contributing.html#where-to-start

Planning to use

https://code.visualstudio.com/docs/remote/containers

https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers

Couldn't run it though. It killed my machine. :/ Needed too much memory I guess.
It got killed multiple times with exit code 137

Found some files related to `loc` feature

code - pandas/core/indexing.py

tests:
pandas/tests/indexing/test_loc.py
pandas/tests/indexing/multiindex/test_loc.py
pandas/tests/series/indexing/test_loc.py

Gotta see how to write the tests. The current tests are a bit confusing
