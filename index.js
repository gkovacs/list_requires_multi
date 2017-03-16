// Generated by LiveScript 1.5.0
(function(){
  var espree, walk, list_requires_multi;
  espree = require('espree');
  walk = require('esprima-walk');
  list_requires_multi = function(code, list_of_function_names){
    var parsed, function_name_to_output, i$, len$, function_name, output, output_set;
    if (list_of_function_names == null) {
      list_of_function_names = ['require'];
    }
    parsed = espree.parse(code, {
      tolerant: true,
      ecmaVersion: 8
    });
    function_name_to_output = {};
    for (i$ = 0, len$ = list_of_function_names.length; i$ < len$; ++i$) {
      function_name = list_of_function_names[i$];
      output = [];
      output_set = {};
      walk(parsed, fn$);
      function_name_to_output[function_name] = output;
    }
    return function_name_to_output;
    function fn$(node){
      var ref$, ref1$, value, ref2$, ref3$;
      if ((node != null ? node.type : void 8) === 'CallExpression' && (node != null ? (ref$ = node.callee) != null ? ref$.type : void 8 : void 8) === 'Identifier' && (node != null ? (ref1$ = node.callee) != null ? ref1$.name : void 8 : void 8) === function_name) {
        value = node != null ? (ref2$ = node.arguments) != null ? (ref3$ = ref2$[0]) != null ? ref3$.value : void 8 : void 8 : void 8;
        if (!output_set[value]) {
          output.push(value);
          return output_set[value] = true;
        }
      }
    }
  };
  module.exports = list_requires_multi;
}).call(this);
