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
* [day-04](src/day-04/)
* [day-05](src/day-05/)
* [day-06](src/day-06/)
* [day-07](src/day-07/)
* [day-08](src/day-08/)
* [day-09](src/day-09/)
* [day-10](src/day-10/)
* [day-11](src/day-11/)
* [day-12](src/day-12/)
* [day-13](src/day-13/)
* [day-14](src/day-14/)
* [day-16](src/day-16/)
