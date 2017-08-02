const someCurry = arg1 => arg2 => console.log(arg1, arg2);

const fn2 = arg3 => someCurry("one")(someCurry("two")(arg3));
export { someCurry };
