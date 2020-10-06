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

---

I'm going ahead with setting up the whole thing in my local machine instead of
using Docker Containers and VS Code Remote Containers extension

https://pandas.pydata.org/pandas-docs/stable/development/contributing.html#installing-a-c-compiler
https://devguide.python.org/setup/#macos

I had to do

```
$ xcode-select --install
xcode-select: error: command line tools are already installed, use "Software Update" to install updates
```

Already installed. 

https://pandas.pydata.org/pandas-docs/stable/development/contributing.html#creating-a-python-environment

Now installing miniconda. I hope I don't have to install
more stuff later. As that's the only difference apparently.

https://docs.conda.io/en/latest/miniconda.html

Downloaded
https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh

Went to
https://conda.io/projects/conda/en/latest/user-guide/install/index.html
https://conda.io/projects/conda/en/latest/user-guide/install/macos.html

```
$ bash Miniconda3-latest-MacOSX-x86_64.sh
...
...
```

It kept showing something called `base` in my prompt. I have disabled it,
according to the installation's final instructions

```bash
==> For changes to take effect, close and re-open your current shell. <==

If you'd prefer that conda's base environment not be activated on startup,
   set the auto_activate_base parameter to false:

conda config --set auto_activate_base false

Thank you for installing Miniconda3!
```

```bash
(base)  ~  $ conda config --set auto_activate_base false
```

```bash
$ conda update conda
```

I have done all the updates. On running again

```bash
$ conda update conda
Collecting package metadata (current_repodata.json): done
Solving environment: done

# All requested packages already installed.
```

:D

Install the build dependencies

```bash
$ cd pandas-dev/pandas
$ conda env create -f environment.yml
$ conda activate pandas-dev
```

Build and install pandas

```bash
$ python setup.py build_ext --inplace -j 4
```

Noticed a warning in this step

```
warning: pandas/_libs/groupby.pyx:1134:26: Unreachable code
```

```bash
$ python -m pip install -e . --no-build-isolation --no-use-pep517
```

```bash
$ python
Python 3.8.5 | packaged by conda-forge | (default, Sep 24 2020, 16:37:41)
[Clang 10.0.1 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import pandas
>>> print(pandas.__version__)
1.2.0.dev0+628.gb58ee5779
>>>
```

Done with the installation stuff!

https://pandas.pydata.org/pandas-docs/stable/development/contributing.html#contributing-to-the-code-base

https://pandas.pydata.org/pandas-docs/stable/development/contributing.html#code-standards

Checking code standards stuff

```bash
$ ./ci/code_checks.sh
```

Running tests

```bash
$ pytest pandas
=============================================== test session starts ===============================================
platform darwin -- Python 3.8.5, pytest-6.1.1, py-1.9.0, pluggy-0.13.1
rootdir: /Users/karuppiahn/oss/github.com/pandas-dev/pandas, configfile: setup.cfg, testpaths: pandas
plugins: hypothesis-5.28.0, forked-1.2.0, asyncio-0.12.0, xdist-2.1.0, cov-2.10.1, instafail-0.4.1
collected 100258 items / 1 skipped / 100257 selected

pandas/tests/test_aggregation.py ........                                                                   [  0%]
pandas/tests/test_algos.py ..................................................................sss........ss. [  0%]
........................................xxx................................................................ [  0%]
............................ss........................                                                      [  0%]
pandas/tests/test_common.py ............................................................................... [  0%]
......................................                                                                      [  0%]
pandas/tests/test_downstream.py .....s.sss..                                                                [  0%]
pandas/tests/test_errors.py .............                                                                   [  0%]
pandas/tests/test_expressions.py ...........................................................x...x...x...x.. [  0%]
.x...x..                                                                                                    [  0%]
pandas/tests/test_flags.py .....                                                                            [  0%]
pandas/tests/test_join.py ..............                                                                    [  0%]
pandas/tests/test_lib.py ..........                                                                         [  0%]
pandas/tests/test_multilevel.py ........................................................................... [  0%]
........................................................................................................... [  0%]
........................................................................................................... [  0%]
.............................................................................                               [  0%]
pandas/tests/test_nanops.py ............................................................................... [  0%]
...................................                                                                         [  0%]
pandas/tests/test_optional_dependency.py ....                                                               [  0%]
pandas/tests/test_register_accessor.py ......                                                               [  0%]
pandas/tests/test_sorting.py .^C
...
================================================ warnings summary =================================================
<frozen importlib._bootstrap>:219
<frozen importlib._bootstrap>:219
  <frozen importlib._bootstrap>:219: RuntimeWarning: numpy.ufunc size changed, may indicate binary incompatibility. Expected 192 from C header, got 216 from PyObject

../../../../miniconda3/envs/pandas-dev/lib/python3.8/site-packages/aiohttp/helpers.py:107
  /Users/karuppiahn/miniconda3/envs/pandas-dev/lib/python3.8/site-packages/aiohttp/helpers.py:107: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
    def noop(*args, **kwargs):  # type: ignore

-- Docs: https://docs.pytest.org/en/stable/warnings.html
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! KeyboardInterrupt !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/Users/karuppiahn/oss/github.com/pandas-dev/pandas/pandas/tests/test_sorting.py:88: KeyboardInterrupt
(to show a full traceback on KeyboardInterrupt use --full-trace)
======================= 973 passed, 12 skipped, 9 xfailed, 3 warnings in 125.86s (0:02:05) ========================
^C
```

I interrupted it. Lot of tests! It takes 20 mins it seems!

Fast running of tests

```bash
$ pip install pytest-xdist
$ ./test_fast.sh
```

Again, stopping as it will take lots of time :P

For now, I think I should just stick to running only the tests related to my
PR and then run everything together later, finally. :)
