# jsx-class-transform

A Babel plugin that cleans up the `class=` and `className=` attribute of JSX elements.

```jsx
// this:
<div className="
  class-1 class-2
  
  class-3

  // comment
  class-6 class-7 class-8 
  class-9 class-10 class-11  // comment
" />
// becomes:
<div className="class-1 class-2 class-3 class-6 class-7 class-8 class-9 class-10 class-11" />


// template literals work too
// this:
<div class={`
  class-1 class-2
  
  class-3
  
  ${subst}

  // comment
  class-4 class-5 class-6
`} />
// becomes:
<div class={`class-1 class-2 class-3 ${subst} class-4 class-5 class-6`} />
```
