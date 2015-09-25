/**
 * Created by vietpn on 25/09/2015.
 */


function foo() {
    console.error('foo');
}

// example process.nextTick
process.nextTick(foo);
//setTimeout(foo, 0);
console.error('bar');