# /public/diagrams

Architecture diagrams for this build (SVG preferred, PNG accepted).

Reference from `build.config.ts`:

```ts
architecture: { diagramSrc: "/diagrams/flow.svg", ... }
```

Rule: real diagrams only. If no diagram exists yet, leave
`diagramSrc: null` — the page renders the system-map table alone.
Never ship a stock or placeholder image.
