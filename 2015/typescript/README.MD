# typescript solutions

## instructions

symbolic links for the input and expected directories
from the parent folder required to run the tests.

package has postinstall script to do exactly that,
but in case it didn't work for some reason —
create symbolic links for the `input/` and `expected/` folders
from the parent directory manually.

```
$ mkdir static
$ ln -s ../../input static/input
$ ln -s ../../expected static/expected
```

run test cases for each day

```
$ yarn test
$ yarn test-coverage
```

## days

* [day-01](src/day-01/)
* [day-02](src/day-02/)
* [day-03](src/day-03/)
