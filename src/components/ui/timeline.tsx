import * as React from 'react'

import { cn } from '@/lib/utils'

const Timeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-4', className)} {...props} />
))
Timeline.displayName = 'Timeline'

const TimelineItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative flex items-start gap-4', className)}
    {...props}
  />
))
TimelineItem.displayName = 'TimelineItem'

const TimelineMarker = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'success' | 'danger' | 'warning'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-muted-foreground',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative z-10 flex h-3 w-3 items-center justify-center rounded-full shrink-0 mt-1.5',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
})
TimelineMarker.displayName = 'TimelineMarker'

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 pb-6 last:pb-0', className)}
    {...props}
  />
))
TimelineContent.displayName = 'TimelineContent'

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute left-1.5 top-6 h-full w-px bg-border -translate-x-1/2',
      className,
    )}
    {...props}
  />
))
TimelineConnector.displayName = 'TimelineConnector'

export {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineContent,
  TimelineConnector,
}
