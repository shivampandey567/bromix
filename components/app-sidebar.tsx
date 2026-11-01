"use client"

import * as React from "react"

import { NavUser } from "@/components/nav-user"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import {
  InboxIcon,
  TicketIcon,
  BotIcon,
  PieChartIcon,
  KeyRoundIcon,
  PlusIcon,
  SparklesIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  PaletteIcon,
  MessageSquareIcon,
  UsersIcon,
  SmileIcon,
  TrendingUpIcon,
  ClockIcon,
  StoreIcon,
  WebhookIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
  SettingsIcon,
  ToggleLeftIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  CirclePlusIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
} from "./ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

type NavTitle = "Inbox" | "Tickets" | "Model" | "Analytics" | "Webhook"

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Inbox", url: "#", icon: <InboxIcon /> },
    { title: "Tickets", url: "#", icon: <TicketIcon /> },
    { title: "Model", url: "#", icon: <BotIcon /> },
    { title: "Analytics", url: "#", icon: <PieChartIcon /> },
    { title: "Webhook", url: "#", icon: <KeyRoundIcon /> },
  ] as { title: NavTitle; url: string; icon: React.ReactNode }[],

  // Quick filter chips per option (options not listed have no filters)
  filters: {
    Inbox: ["All", "AI", "Human"],
    Tickets: ["All", "Open", "Pending", "Resolved"],
    Webhook: ["All", "Connected", "Not connected"],
  } as Partial<Record<NavTitle, string[]>>,

  searchPlaceholder: {
    Inbox: "Search chats...",
    Tickets: "Search tickets...",
    Model: "Search settings...",
    Analytics: "Search reports...",
    Webhook: "Search apps...",
  } as Record<NavTitle, string>,

  chats: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Where is my order?",
      date: "09:34 AM",
      teaser:
        "My order #1042 was supposed to arrive yesterday.\nCan you check the delivery status?",
      unread: true,
      handledBy: "AI",
    },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Wrong item received",
      date: "Yesterday",
      teaser:
        "I ordered a blue shirt but got a red one.\nHow can I get it replaced?",
      unread: true,
      handledBy: "Human",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Return request",
      date: "2 days ago",
      teaser:
        "I'd like to return the shoes I bought last week.\nWhat is the return process?",
      unread: false,
      handledBy: "AI",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Refund not received",
      date: "2 days ago",
      teaser:
        "I returned my order 10 days ago and still\nhaven't received the refund.",
      unread: false,
      handledBy: "Human",
    },
    {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Change delivery address",
      date: "1 week ago",
      teaser:
        "I entered the wrong address at checkout.\nCan you update it before it ships?",
      unread: false,
      handledBy: "AI",
    },
    {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Damaged package",
      date: "1 week ago",
      teaser:
        "The box arrived damaged and the product\nis broken. Please help.",
      unread: true,
      handledBy: "Human",
    },
    {
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "Cancel my order",
      date: "1 week ago",
      teaser: "I want to cancel order #0988 if it\nhasn't shipped yet.",
      unread: false,
      handledBy: "AI",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
      subject: "Delivery delayed",
      date: "1 week ago",
      teaser: "My package has been stuck in transit\nfor 5 days now.",
      unread: false,
      handledBy: "AI",
    },
  ],

  tickets: [
    {
      id: "#1042",
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Order not delivered",
      status: "Open",
      priority: "High",
      date: "09:34 AM",
    },
    {
      id: "#1041",
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Wrong item received",
      status: "Open",
      priority: "Medium",
      date: "Yesterday",
    },
    {
      id: "#1039",
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Refund not received",
      status: "Pending",
      priority: "High",
      date: "2 days ago",
    },
    {
      id: "#1036",
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Damaged package",
      status: "Pending",
      priority: "Medium",
      date: "1 week ago",
    },
    {
      id: "#1030",
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Return request",
      status: "Resolved",
      priority: "Low",
      date: "1 week ago",
    },
    {
      id: "#1027",
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "Cancel my order",
      status: "Resolved",
      priority: "Low",
      date: "2 weeks ago",
    },
  ],

  modelOptions: [
    {
      title: "Persona & Tone",
      description: "Bot name, avatar and how it speaks",
      icon: <PaletteIcon />,
    },
    {
      title: "Knowledge Base",
      description: "FAQs, policies and uploaded files",
      icon: <BookOpenIcon />,
    },
    {
      title: "Behavior Rules",
      description: "Escalation and blocked topics",
      icon: <ShieldCheckIcon />,
    },
    {
      title: "Training Review",
      description: "Fix wrong or low-confidence answers",
      icon: <SparklesIcon />,
    },
  ],

  reports: [
    {
      title: "Overview",
      description: "Key numbers at a glance",
      icon: <PieChartIcon />,
    },
    {
      title: "Conversations",
      description: "Volume, peak hours, channels",
      icon: <MessageSquareIcon />,
    },
    {
      title: "AI Performance",
      description: "Resolution and handoff rate",
      icon: <TrendingUpIcon />,
    },
    {
      title: "Response Time",
      description: "First reply and resolve time",
      icon: <ClockIcon />,
    },
    {
      title: "Customer Satisfaction",
      description: "CSAT scores and feedback",
      icon: <SmileIcon />,
    },
    {
      title: "Customers",
      description: "Top issues and repeat customers",
      icon: <UsersIcon />,
    },
  ],

  organizations: ["amazon", "flipkart", "myntra", "robocraze"],

  apps: [
    {
      name: "Shopify",
      description: "Orders, products and customers",
      connected: true,
      icon: <StoreIcon />,
    },
    {
      name: "WooCommerce",
      description: "Orders and shipping updates",
      connected: false,
      icon: <StoreIcon />,
    },
    {
      name: "WhatsApp",
      description: "Customer chat channel",
      connected: true,
      icon: <MessageSquareIcon />,
    },
    {
      name: "Custom Webhook",
      description: "Send events to your own URL",
      connected: false,
      icon: <WebhookIcon />,
    },
  ],
}

const pill = "rounded-full border px-2 py-0.5 text-[10px] font-medium"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState("All")
  const [unreadOnly, setUnreadOnly] = React.useState(false)
  const [activeOption, setActiveOption] = React.useState("")
  const { setOpen } = useSidebar()

  const title = activeItem.title
  const filters = data.filters[title]
  const q = query.trim().toLowerCase()
  const match = (...fields: string[]) =>
    !q || fields.some((f) => f.toLowerCase().includes(q))

  const chats = data.chats.filter(
    (c) =>
      (!unreadOnly || c.unread) &&
      (filter === "All" || c.handledBy === filter) &&
      match(c.name, c.email, c.subject, c.teaser)
  )
  const tickets = data.tickets.filter(
    (t) =>
      (filter === "All" || t.status === filter) &&
      match(t.id, t.name, t.email, t.subject)
  )
  const modelOptions = data.modelOptions.filter((o) =>
    match(o.title, o.description)
  )
  const reports = data.reports.filter((r) => match(r.title, r.description))
  const apps = data.apps.filter(
    (a) =>
      (filter === "All" ||
        (filter === "Connected" ? a.connected : !a.connected)) &&
      match(a.name, a.description)
  )

  const rowClass =
    "flex w-full flex-col items-start gap-2 border-b p-4 text-left text-sm leading-tight hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

  const empty = (
    <div className="p-4 text-sm text-muted-foreground">Nothing found.</div>
  )

  const formatOrgName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1)

  const getInitials = (name: string) => name.slice(0, 2).toUpperCase()

  const [organization, setOrganization] = React.useState(data.organizations[0])

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        setQuery("")
                        setFilter("All")
                        setUnreadOnly(false)
                        setActiveOption("")
                        setOpen(true)
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* Its content changes based on the selected option */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">{title}</div>

            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-7 w-7 rounded-full border-olive-300 text-[11px]"
                    >
                      {getInitials(organization)}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>

                <TooltipContent side="right">
                  <p>{formatOrgName(organization)}</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenuContent className="w-fit">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    shivampandey6710@gmail.com
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={organization}
                    onValueChange={setOrganization}
                  >
                    {data.organizations.map((org) => (
                      <DropdownMenuRadioItem key={org} value={org}>
                        <div className="h-5 w-5 border border-black rounded-full flex items-center justify-center text-[8px]">{getInitials(org)}</div>
                        {formatOrgName(org)}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <CirclePlusIcon />
                    Create organization
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {title === "Model" && (
            <Button size="sm" className="w-full">
              <PlusIcon /> Create custom AI support
            </Button>
          )}
          {title === "Webhook" && (
            <Button size="sm" className="w-full">
              <PlusIcon /> Add webhook
            </Button>
          )}

          <SidebarInput
            placeholder={data.searchPlaceholder[title]}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {filters && (
            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  className="h-6 rounded-full px-2.5 text-xs"
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
          )}
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {/* INBOX: chat list */}
              {/* INBOX: same look as the original rows */}
              {title === "Inbox" &&
                (chats.length === 0
                  ? empty
                  : chats.map((chat) => (
                      <a
                        href="#"
                        key={chat.email}
                        className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <div className="flex w-full items-center gap-2">
                          <span>{chat.name}</span>{" "}
                          <span className="ml-auto text-xs">{chat.date}</span>
                        </div>
                        <span className="font-medium">{chat.subject}</span>
                        <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                          {chat.teaser}
                        </span>
                      </a>
                    )))}

              {/* TICKETS: same row, with the ticket info in the teaser line */}
              {title === "Tickets" &&
                (tickets.length === 0
                  ? empty
                  : tickets.map((t) => (
                      <a
                        href="#"
                        key={t.id}
                        className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <div className="flex w-full items-center gap-2">
                          <span>{t.name}</span>{" "}
                          <span className="ml-auto text-xs">{t.date}</span>
                        </div>
                        <span className="font-medium">{t.subject}</span>
                        <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                          {t.id} · {t.status} · {t.priority}
                        </span>
                      </a>
                    )))}

              {/* MODEL: customisation options */}
              {title === "Model" &&
                (modelOptions.length === 0
                  ? empty
                  : modelOptions.map((o) => (
                      <button
                        key={o.title}
                        onClick={() => setActiveOption(o.title)}
                        data-active={activeOption === o.title}
                        className={`${rowClass} data-[active=true]:bg-sidebar-accent`}
                      >
                        <div className="flex items-center gap-2 font-medium [&_svg]:size-4">
                          {o.icon}
                          {o.title}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {o.description}
                        </span>
                      </button>
                    )))}

              {/* ANALYTICS: report list */}
              {title === "Analytics" &&
                (reports.length === 0
                  ? empty
                  : reports.map((r) => (
                      <button
                        key={r.title}
                        onClick={() => setActiveOption(r.title)}
                        data-active={activeOption === r.title}
                        className={`${rowClass} data-[active=true]:bg-sidebar-accent`}
                      >
                        <div className="flex items-center gap-2 font-medium [&_svg]:size-4">
                          {r.icon}
                          {r.title}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {r.description}
                        </span>
                      </button>
                    )))}

              {/* WEBHOOK: connected apps */}
              {title === "Webhook" &&
                (apps.length === 0
                  ? empty
                  : apps.map((a) => (
                      <a href="#" key={a.name} className={rowClass}>
                        <div className="flex w-full items-center gap-2 font-medium [&_svg]:size-4">
                          {a.icon}
                          {a.name}
                          <span className={`${pill} ml-auto`}>
                            {a.connected ? "Connected" : "Not connected"}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {a.description}
                        </span>
                      </a>
                    )))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
