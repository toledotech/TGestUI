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
`tailwind-merge`), o helper `cn()`, o hook `useIsMobile`, e o `AppTopbar` — o header
global do ecossistema ToledoTech (ver `design_system.md`, seção 4).

Não contém: componentes específicos de um produto (ex: `initials-avatar` do M8HUB ficou
de fora de propósito), nem tokens de tema/cor — cada produto mantém sua própria identidade
visual via `@theme`.

## AppTopbar

Header global (largura total, acima da sidebar) com título centralizado, sino de
notificações e dropdown de usuário — a versão Tailwind/shadcn do padrão implementado
em CSS puro no TGestVeic.

```tsx
import { AppTopbar, SidebarProvider, Sidebar } from "@toledotech/tgest-ui";

<SidebarProvider>
  <AppTopbar
    title="TGestCRM"
    slogan="- Gestão de Relacionamento"
    user={{ name: "Fabio Toledo", role: "Super Admin", email: "user@toledotech.com.br" }}
    notificationCount={2}
    onProfileClick={() => {/* ... */}}
    onLogout={() => {/* ... */}}
  />
  <div className="flex flex-1">
    <Sidebar>{/* ... */}</Sidebar>
    <main>{/* conteúdo */}</main>
  </div>
</SidebarProvider>
```

Usa os mesmos tokens `--sidebar` / `--sidebar-foreground` que o componente `Sidebar` do
shadcn já exige — não precisa de tokens novos, só herda a cor navy definida no `@theme`
do projeto consumidor.
