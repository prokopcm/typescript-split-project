# typescript-split-project
This is an example TypeScript monorepo project that demonstrates project
references.
In addition, all the projects use TypeScript `paths` mapping at compiletime
and the `module-alias` package at runtime.

## Building

To build all projects from top-level: `tsc`
To build with verbosity: `tsc -b -v`

Each project can also be built individually:
```
cd server/
tsc
node dist/src/app.js
```

or by using the convenience npm scripts:
```
cd server/
npm run build
// or npm run 
```

## Dependencies

If project `A` relies on project `B` (e.g. `cron` relies on something from
`server`), make sure `A`'s `tsconfig.json` references project `B`'s root folder
like so:
```
"references": [
  // should point to the folder with the tsconfig.json
  // Alternatively: { "path": "../B/tsconfig.json" }
  { "path": "../B" }
]
```
A `paths` mapping value isn't strictly necessary, but can make for cleaner imports.
```
"paths": {
  "@B/*": [
    "../B/src/*"
  ],
}
```

Next, make sure that `B`'s `tsconfig.json` has `"composite": true` in the
`compilerOptions` area.

So altogether:
```
// cron/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "paths": {
      "@server/*": [
        "../server/src/*"
      ],
      ...
    }
  },
  "references": [
    { "path": "../server" }
  ],
  ...
}

// server/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    ...
  }
}
```

## Aliasing
The only gotcha is that a project needs to define all the aliases of the
projects it references (or at least the subset used in the files it references)
in the `_moduleAliases` section of `package.json`.

Note this is not necessary to do the same thing in the `tsconfig`, only the
paths you want to directly use in the project need to be declared.
```
// cron/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "paths": {
      // note only @server is declared here, and only to avoid ../../-style
      // imports.
      "@server/*": [
        "../server/src/*"
      ],
      ...
    }
  },
  ...
}


// cron/package.json
"_moduleAliases": {
  // server code uses this internally, must declare this
  "@": "../server/dist/src",

  // this one is strictly unnecessary, but helpful to disambiguate which 
  // external project the dependency came from when referenced
  "@server": "../server/dist/src"
}
```
And don't forget to include `import 'module-alias/register'` at the top of the
entry point file for each project that uses path mapping (or references projects
that do)