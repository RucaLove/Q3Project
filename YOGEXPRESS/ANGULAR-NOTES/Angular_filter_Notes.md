##### Filters
- Used to format a value (such as 3.14159265359, dates, currency etc)
  Example:
``` js
 {{ $ctrl.MyNum | number: 2 }}
```
  the ```|``` is used to "pipe" through the function

#### Filters to order data
- Can be written in controller to sort/ format data in a certain way (alphabetical, age, name.length)
you can use ```-``` to reverse order

``` js
{{ expression | filter:arguments }}

{{ orderBy_expression | orderBy : expression : reverse : comparator }}
 ```
- **[orderBy](https://docs.angularjs.org/api/ng/filter/orderBy)**
- _(optional)_ Reverse: If true, reverse the sorting order.
- _(optional)_ Comparator: function used to determine the relative order of value pairs. If omitted, the built-in comparator will be used.
```html
<div ng-repeat="element in first | orderBy: '-value' ">
   {{ element }}
 </div>
```
Would reverse the order of the elements based on the value of ```value```
