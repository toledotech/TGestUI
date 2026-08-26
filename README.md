# @toledotech/tgest-ui

Componentes de UI (Radix + shadcn) compartilhados entre os produtos ToledoTech que usam
Vite + React 19 + Tailwind 4 + Radix UI (família A: M8HUB, TGestCRM, TGestEvent).

Extraído do conjunto idêntico de `src/components/ui/*` que esses três projetos mantinham
duplicado byte a byte.

## Instalação nos projetos consumidores

```sh
npm install github:toledotech/TGestUI --legacy-peer-deps
```

Isso instala a versão compilada (`dist/`) direto do repositório Git — sem precisar de
registry npm privado.

## Uso

```tsx
import { Button, Card, Dialog } from "@toledotech/tgest-ui";
```

Os componentes usam classes utilitárias do Tailwind (ex: `bg-primary`, `text-foreground`).
Para o Tailwind do projeto consumidor enxergar essas classes, adicione um `@source`
apontando para o pacote no `index.css`/`styles.css`:

```css
@source "../node_modules/@toledotech/tgest-ui/dist";
```

E garanta que os tokens `--background`, `--primary`, `--radius`, etc. estejam definidos no
`@theme` do projeto (o pacote não define tema — só estrutura e comportamento dos componentes).

## Desenvolvimento

```sh
npm install
npm run build      # compila src/ -> dist/ (ESM + .d.ts) via tsup
npm run typecheck
```

Depois de alterar um componente, rode `npm run build`, faça commit e os projetos
consumidores pegam a atualização rodando `npm update @toledotech/tgest-ui`.

## Escopo

Contém: os 46 componentes base do shadcn/ui (Radix + `class-variance-authority` +
`tailwind-merge`), o helper `cn()` e o hook `useIsMobile`.

Não contém: componentes específicos de um produto (ex: `initials-avatar` do M8HUB ficou
de fora de propósito), nem tokens de tema/cor — cada produto mantém sua própria identidade
visual via `@theme`.
