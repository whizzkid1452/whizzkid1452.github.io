import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import {
  signInWithGoogleForCalendar,
  fetchUpcomingCalendarEvents,
  type GoogleCalendarEvent,
} from '@/lib/googleCalendar'

interface UseGoogleCalendarReturn {
  calendarEvents: GoogleCalendarEvent[]
  isLoadingEvents: boolean
  isAuthenticated: boolean
  errorMessage: string | null
  handleSignIn: () => Promise<void>
  handleSignOut: () => Promise<void>
  refreshCalendarEvents: () => Promise<void>
}

export function useGoogleCalendar(): UseGoogleCalendarReturn {
  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const checkAuthenticationStatus = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    const hasValidSession = !!(session?.provider_token || session?.provider_refresh_token)
    setIsAuthenticated(hasValidSession)
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
      const upcomingEvents = await fetchUpcomingCalendarEvents(30)
      setCalendarEvents(upcomingEvents)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '캘린더 데이터를 불러오는 중 오류가 발생했습니다.'
      setErrorMessage(errorMessage)
      setCalendarEvents([])
    } finally {
      setIsLoadingEvents(false)
    }
  }, [checkAuthenticationStatus])

  const handleSignIn = useCallback(async () => {
    setErrorMessage(null)
    try {
      await signInWithGoogleForCalendar()
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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.'
      setErrorMessage(errorMessage)
    }
  }, [])

  useEffect(() => {
    checkAuthenticationStatus()
    loadCalendarEvents()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        checkAuthenticationStatus().then(() => {
          loadCalendarEvents()
        })
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        setCalendarEvents([])
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [checkAuthenticationStatus, loadCalendarEvents])

  return {
    calendarEvents,
    isLoadingEvents,
    isAuthenticated,
    errorMessage,
    handleSignIn,
    handleSignOut,
    refreshCalendarEvents: loadCalendarEvents,
  }
}
