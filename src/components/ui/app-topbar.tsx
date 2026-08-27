import * as React from "react";
import { Bell, LogOut, UserCircle2 } from "lucide-react";

import { cn } from "../../lib/utils";
import { SidebarTrigger } from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

/**
 * Header global do ecossistema ToledoTech (ver design_system.md, seção 4 — "Header Global").
 *
 * Ocupa 100% da largura da tela, acima da sidebar, usando os mesmos tokens de cor da
 * sidebar (`bg-sidebar` / `text-sidebar-foreground`) para que as duas áreas se fundam
 * visualmente. Não define paleta própria — herda do `@theme` do projeto consumidor,
 * como todo o resto do pacote.
 */
export interface AppTopbarUser {
  /** Nome de exibição do usuário logado. */
  name: string;
  /** Cargo/perfil (ex: "Super Admin", "Admin", "Vendedor"). */
  role?: string;
  /** E-mail do usuário logado. */
  email?: string;
}

export interface AppTopbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Nome do sistema, exibido centralizado (ex: "TGestVeic"). */
  title: string;
  /** Texto opcional exibido ao lado do título, em tom mais claro (ex: "- Gestão de Concessionárias"). */
  slogan?: string;
  /** Dados do usuário logado, exibidos no dropdown do avatar. */
  user?: AppTopbarUser;
  /** Quantidade de notificações não lidas. Omitido ou 0 esconde o badge. */
  notificationCount?: number;
  /** Chamado ao clicar no sino de notificações. */
  onNotificationsClick?: () => void;
  /** Chamado ao clicar em "Meu Perfil" no dropdown do usuário. */
  onProfileClick?: () => void;
  /** Chamado ao clicar em "Sair" no dropdown do usuário. */
  onLogout?: () => void;
}

const AppTopbar = React.forwardRef<HTMLElement, AppTopbarProps>(
  (
    {
      className,
      title,
      slogan,
      user,
      notificationCount = 0,
      onNotificationsClick,
      onProfileClick,
      onLogout,
      ...props
    },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-30 grid h-14 grid-cols-[1fr_auto_1fr] items-center bg-sidebar px-4 text-sidebar-foreground md:px-6",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-3 justify-self-start">
          <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:hidden" />
        </div>

        <h1 className="col-start-2 justify-self-center whitespace-nowrap text-[1.15rem] font-extrabold tracking-tight text-sidebar-foreground">
          {title}
          {slogan && (
            <span className="ml-1 hidden font-medium text-sidebar-foreground/60 sm:inline">
              {slogan}
            </span>
          )}
        </h1>

        <div className="col-start-3 flex items-center gap-1.5 justify-self-end">
          <button
            type="button"
            aria-label="Notificações"
            onClick={onNotificationsClick}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-sidebar-foreground/80 transition-colors hover:text-sidebar-foreground"
          >
            <Bell size={19} />
            {notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold leading-none text-white">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Abrir menu do usuário"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sidebar-foreground/80 transition-colors hover:text-sidebar-foreground"
                >
                  <UserCircle2 size={22} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
                  <span className="text-sm font-semibold text-foreground">{user.name}</span>
                  {user.role && (
                    <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-primary">
                      {user.role}
                    </span>
                  )}
                  {user.email && (
                    <span className="break-all text-xs text-muted-foreground">{user.email}</span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {onProfileClick && (
                  <DropdownMenuItem onClick={onProfileClick}>
                    <UserCircle2 size={16} /> Meu Perfil
                  </DropdownMenuItem>
                )}
                {onLogout && (
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut size={16} /> Sair
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
    );
  },
);
AppTopbar.displayName = "AppTopbar";

export { AppTopbar };
