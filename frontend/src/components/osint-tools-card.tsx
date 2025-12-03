import React from 'react'
import { ExternalLink, LinkIcon } from 'lucide-react'

interface OsintTool {
  name: string
  url: string
  description: string
  icon?: string
}

interface OsintToolCardProps {
  tool: OsintTool
}

interface OsintToolsGridProps {
  tools: OsintTool[]
}

export const OsintToolCard: React.FC<OsintToolCardProps> = ({ tool }) => {
  return (
    <a 
      href={tool.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden my-4 w-full md:w-1/2 border border-border/50 hover:border-primary/30"
    >
      <div className="p-5 flex items-start space-x-4">
        <div className="flex-shrink-0">
          {tool.icon ? (
            <div className="w-12 h-12 rounded-lg bg-muted/50 p-2 flex items-center justify-center border border-border/50">
              <img 
                src={tool.icon} 
                alt={`${tool.name} icon`} 
                className="w-full h-full object-contain rounded"
                style={{ maxWidth: '40px', maxHeight: '40px' }}
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center border border-border/50">
              <LinkIcon className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-base font-semibold text-primary mb-1 flex items-center">
            {tool.name}
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </h4>
          <p className="text-sm text-muted-foreground mb-1 leading-relaxed">{tool.description}</p>
          <p className="text-xs text-muted-foreground/70">{new URL(tool.url).hostname}</p>
        </div>
      </div>
    </a>
  )
}

export const OsintToolsGrid: React.FC<OsintToolsGridProps> = ({ tools }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {tools.map((tool, index) => (
        <div key={index} className="w-full">
          <OsintToolCard tool={tool} />
        </div>
      ))}
    </div>
  )
}