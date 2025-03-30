'use client'

import * as React from 'react'

declare global {
  interface Window {
    visio: {
      /**
       * Initialize the Visio SDK
       * @param endpoint - The endpoint of the Visio server
       * @default window.location.hostname
       */
      init: (endpoint?: string) => void
      /**
       * Track a page view
       * @example
       */
      pageview: () => Promise<void>
      /**
       * Track an event
       * @param name - The name of the event
       * @param metadata - The metadata of the event
       */
      track: (name: string, metadata: Record<string, any>) => Promise<void>
    }
  }
}

function getSessionId() {
  const key = 'visio_session_id'
  let sessionId = getCookie(key)
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15)
    setCookie(key, sessionId, 30)
  }
  return sessionId
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

function visioAnalytics() {
  let domain = window.location.hostname.replace('www.', '')

  function init(endpoint?: string) {
    if (endpoint) {
      try {
        const url = endpoint.startsWith('http')
          ? endpoint
          : `https://${endpoint}`
        domain = new URL(url).hostname
      } catch (e) {
        domain = endpoint
      }
    }
    trackPageView()

    window.addEventListener('popstate', trackPageView)

    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (...args: any[]) {
      // @ts-ignore
      originalPushState.apply(this, args)
      trackPageView()
    }

    history.replaceState = function (...args: any[]) {
      // @ts-ignore
      originalReplaceState.apply(this, args)
      trackPageView()
    }
  }

  async function sendEvent(
    type: string,
    data?: Record<string, any>,
    metadata?: Record<string, any>,
  ) {
    const payload = {
      domain,
      sessionId: getSessionId(),
      url: window.location.pathname,
      timestamp: new Date(),
      ...(type === 'pageview' && { referrer: document.referrer, ...data }),
      ...(type === 'event' && { ...data, metadata }),
    }

    try {
      await fetch(
        `https://visio-vert.vercel.app/api/${type === 'pageview' ? 'view' : 'event'}`,
        {
          method: 'POST',
          keepalive: true,
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function trackPageView() {
    await sendEvent('pageview')
  }

  async function trackEvent(name: string, metadata: Record<string, any>) {
    await sendEvent('event', { name }, metadata)
  }

  return {
    init,
    pageview: trackPageView,
    track: trackEvent,
  }
}

export function Analytics() {
  React.useEffect(() => {
    const visio = visioAnalytics()
    visio.init()
  }, [])

  return null
}
