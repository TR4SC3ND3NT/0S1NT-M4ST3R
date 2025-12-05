"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Globe,
  ImageIcon,
  Users,
  Menu,
  X,
  Moon,
  Sun,
  Github,
  Search,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { FaGithub, FaTiktok, FaGoogle, FaDiscord } from "react-icons/fa"
import ImageSearch from "./image-search"
import DomainTools from "./domain-tools"
import GitHubTools from "./social_media/github"
import TikTokTools from "./social_media/tiktok"
import GoogleTools from "./social_media/google"
import DiscordTools from "./social_media/discord"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import UsernameSearch from "./username/username"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import AuthBar from "@/components/auth/AuthBar"

interface ToolItem {
  name: string
  icon: React.ElementType
  tool: string
  description: string
}

export default function OSINTToolkit() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [setTheme])

  const socialTools: ToolItem[] = [
    {
      name: "TikTok",
      icon: FaTiktok,
      tool: "tiktok",
      description: "Find video upload timestamps and user information",
    },
    {
      name: "Google",
      icon: FaGoogle,
      tool: "google",
      description: "Search Google account user information",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      tool: "github",
      description: "Discover GitHub user information",
    },
    {
      name: "Discord",
      icon: FaDiscord,
      tool: "discord",
      description: "Discord user information",
    },
  ]

  const mainTools = [
    {
      name: "Domain",
      icon: Globe,
      tool: "domain",
      description: "Analyze domains and subdomains",
    },
    {
      name: "Image",
      icon: ImageIcon,
      tool: "image",
      description: "Reverse image search and analysis",
    },
    {
      name: "Username",
      icon: Users,
      tool: "username",
      description: "Search usernames across platforms",
    },
  ]

  const renderTool = () => {
    switch (selectedTool) {
      case "domain":
        return <DomainTools />
      case "image":
        return <ImageSearch />
      case "github":
        return <GitHubTools />
      case "tiktok":
        return <TikTokTools />
      case "google":
        return <GoogleTools />
      case "username":
        return <UsernameSearch />
      case "discord":
        return <DiscordTools />
      default:
        return (
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm rounded-2xl p-10 mb-10 text-center shadow-2xl border border-border/50">
              <div className="w-40 h-40 mx-auto mb-8 flex items-center justify-center">
                <img
                  src="/osint-toolkit.png"
                  alt="0S1NT-M4ST3R Logo"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ maxWidth: "500px", maxHeight: "500px" }}
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-indigo-500 tracking-tight">
                Welcome to 0S1NT-M4ST3R
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
                A collection of carefully selected OSINT tools for investigations
                and CTFs, all in one place.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  onClick={() => selectTool("domain")}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Start Exploring
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://github.com/TR4SC3ND3NT/0S1NT-M4ST3R.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>

            <div className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {mainTools.map((tool) => (
                  <div
                    key={tool.tool}
                    className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/30 group"
                    onClick={() => selectTool(tool.tool)}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-primary/10 group-hover:bg-primary/20 p-3 rounded-lg mr-4 transition-colors duration-300">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mt-10 mb-6 flex items-center text-foreground">
                <Users className="mr-3 h-6 w-6 text-primary" />
                Social Networks
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {socialTools.map((tool) => (
                  <div
                    key={tool.tool}
                    className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/30 group"
                    onClick={() => selectTool(tool.tool)}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-primary/10 group-hover:bg-primary/20 p-3 rounded-lg mr-4 transition-colors duration-300">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-lg border border-border/50">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
                <Sparkles className="mr-3 h-6 w-6 text-primary" />
                About This Project
              </h3>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p className="text-base">
                  I have developed this website to share my knowledge in OSINT
                  and provide everyone with access to a practical toolkit,
                  especially useful for CTFs or investigations, without the need
                  to install all the tools for quick searches.
                </p>
                <p className="text-base">
                  I&apos;ve carefully selected the tools that I personally find
                  most useful and relevant. However, I had to make some
                  compromises and couldn&apos;t implement everything, as some
                  tools require a complex setup if made publicly accessible
                  (such as IP rotation, sock puppets, etc.).
                </p>
                <p className="text-base">
                  If you would like to add a tool, provide additional
                  information, or correct any errors, please feel free to
                  contribute to the project on GitHub.
                </p>
                <div className="pt-4 text-center">
                  <a
                    href="https://github.com/TR4SC3ND3NT/0S1NT-M4ST3R.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Contribute to the project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const selectTool = (tool: string) => {
    setSelectedTool(tool)
    setIsSidebarOpen(false)
  }

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const handleTitleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedTool(null)
    router.push("/")
  }

  if (!mounted) {
    return null
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background transition-all duration-300">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-md border-b border-border/50 px-6 py-4 flex justify-between items-center transition-all duration-300 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <a
              href="/"
              onClick={handleTitleClick}
              className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-indigo-500 hover:opacity-90 transition-all duration-300 tracking-tight"
            >
              0S1NT-M4ST3R
            </a>
            {selectedTool && (
              <div className="hidden md:flex items-center ml-4">
                <Separator orientation="vertical" className="h-6 mx-2" />
                <Badge variant="secondary" className="text-xs font-normal">
                  {selectedTool.charAt(0).toUpperCase() +
                    selectedTool.slice(1)}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {/* ←←← ВОТ ТУТ ДОБАВЛЕНА ПАНЕЛЬ ЛОГИН/РЕГИСТРАЦИЯ/ВЫХОД */}
            <AuthBar />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleThemeToggle}
                  aria-label="Toggle theme"
                  className="transition-all duration-300"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {theme === "dark" ? "light" : "dark"} mode</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://github.com/TR4SC3ND3NT/0S1NT-M4ST3R.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all duration-300"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden relative">
          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={cn(
              "bg-card/95 backdrop-blur-md border-r border-border/50 w-64 fixed md:relative inset-y-0 left-0 transform",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full",
              "md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:z-10 pt-0 mt-0 top-[65px] md:top-0 h-[calc(100vh-65px)] overflow-y-auto shadow-lg",
            )}
          >
            <nav className="p-4">
              <div className="mb-6">
                {mainTools.map((tool) => (
                  <Tooltip key={tool.tool}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={
                          selectedTool === tool.tool ? "secondary" : "ghost"
                        }
                        className="w-full justify-start mb-1 font-normal"
                        onClick={() => selectTool(tool.tool)}
                      >
                        <tool.icon className="mr-2 h-4 w-4" />
                        {tool.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{tool.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              <div>
                <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-3 px-3 tracking-wider">
                  Social Networks
                </h3>
                <div className="space-y-1">
                  {socialTools.map((tool) => (
                    <Tooltip key={tool.tool}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={
                            selectedTool === tool.tool ? "secondary" : "ghost"
                          }
                          className="w-full justify-start mb-1 font-normal"
                          onClick={() => selectTool(tool.tool)}
                        >
                          <tool.icon className="mr-2 h-4 w-4" />
                          {tool.name}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{tool.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="px-3 py-2">
                  <p className="text-xs text-muted-foreground">
                    By{" "}
                    <a
                      href="https://t.me/Werfauster"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      @WerFauster
                    </a>
                  </p>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6 md:p-8 overflow-auto bg-background text-foreground transition-all duration-300">
            {renderTool()}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
