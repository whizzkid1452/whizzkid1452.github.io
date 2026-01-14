import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import {
  signInWithGoogleForCalendar,
  fetchUpcomingCalendarEvents,
  fetchCalendarEvents,
  type GoogleCalendarEvent,
} from '@/lib/googleCalendar'

interface UseGoogleCalendarOptions {
  daysAhead?: number
  timeMin?: string
  timeMax?: string
  maxResults?: number
  autoLoad?: boolean
}

interface UseGoogleCalendarReturn {
  calendarEvents: GoogleCalendarEvent[]
  isLoadingEvents: boolean
  isAuthenticated: boolean
  errorMessage: string | null
  userName: string | null
  userEmail: string | null
  handleSignIn: () => Promise<void>
  handleSignOut: () => Promise<void>
  refreshCalendarEvents: () => Promise<void>
}

export function useGoogleCalendar(options: UseGoogleCalendarOptions = {}): UseGoogleCalendarReturn {
  const {
    daysAhead = 30,
    timeMin,
    timeMax,
    maxResults = 250,
    autoLoad = true,
  } = options

  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const checkAuthenticationStatus = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    const hasValidSession = !!(session?.provider_token || session?.provider_refresh_token)
    setIsAuthenticated(hasValidSession)
    
    if (session?.user) {
      // Google OAuth에서 제공하는 메타데이터에서 이름 가져오기
      const fullName = session.user.user_metadata?.full_name || 
                       session.user.user_metadata?.name || 
                       null
      const email = session.user.email || null
      
      setUserName(fullName)
      setUserEmail(email)
    } else {
      setUserName(null)
      setUserEmail(null)
    }
    
    return hasValidSession
  }, [])

  const loadCalendarEvents = useCallback(async () => {
    const isUserAuthenticated = await checkAuthenticationStatus()
    
    if (!isUserAuthenticated) {
      setCalendarEvents([])
      return
    }

    setIsLoadingEvents(true)
    setErrorMessage(null)

    try {
      let events: GoogleCalendarEvent[]
      
      if (timeMin && timeMax) {
        const calendarEventsResponse = await fetchCalendarEvents(
          'primary',
          timeMin,
          timeMax,
          maxResults
        )
        events = calendarEventsResponse.items
      } else {
        events = await fetchUpcomingCalendarEvents(daysAhead)
      }
      
      setCalendarEvents(events)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '캘린더 데이터를 불러오는 중 오류가 발생했습니다.'
      setErrorMessage(errorMessage)
      setCalendarEvents([])
    } finally {
      setIsLoadingEvents(false)
    }
  }, [checkAuthenticationStatus, daysAhead, timeMin, timeMax, maxResults])

  const handleSignIn = useCallback(async () => {
    setErrorMessage(null)
    try {
      await signInWithGoogleForCalendar(false)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google 로그인 중 오류가 발생했습니다.'
      setErrorMessage(errorMessage)
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    setErrorMessage(null)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      setIsAuthenticated(false)
      setCalendarEvents([])
      setUserName(null)
      setUserEmail(null)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.'
      setErrorMessage(errorMessage)
    }
  }, [])

  useEffect(() => {
    checkAuthenticationStatus()
    if (autoLoad) {
      loadCalendarEvents()
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        checkAuthenticationStatus().then(() => {
          if (autoLoad) {
            loadCalendarEvents()
          }
        })
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        setCalendarEvents([])
        setUserName(null)
        setUserEmail(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [checkAuthenticationStatus, loadCalendarEvents, autoLoad])

  useEffect(() => {
    if (autoLoad && isAuthenticated) {
      loadCalendarEvents()
    }
  }, [timeMin, timeMax, autoLoad, isAuthenticated, loadCalendarEvents])

  return {
    calendarEvents,
    isLoadingEvents,
    isAuthenticated,
    errorMessage,
    userName,
    userEmail,
    handleSignIn,
    handleSignOut,
    refreshCalendarEvents: loadCalendarEvents,
  }
}
