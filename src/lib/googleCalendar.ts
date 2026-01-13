import { supabase } from './supabase'

export interface GoogleCalendarEvent {
  id: string
  summary: string
  description?: string
  start: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
  end: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
  location?: string
  htmlLink?: string
}

export interface GoogleCalendarEventsResponse {
  items: GoogleCalendarEvent[]
  nextPageToken?: string
}

const GOOGLE_CALENDAR_API_BASE_URL = 'https://www.googleapis.com/calendar/v3'

async function getGoogleAccessToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return null
  }

  if (session.provider_token) {
    return session.provider_token
  }

  if (session.provider_refresh_token) {
    try {
      const { data: { session: refreshedSession } } = await supabase.auth.refreshSession(session)
      return refreshedSession?.provider_token || null
    } catch (error) {
      console.error('토큰 갱신 실패:', error)
      return null
    }
  }

  return null
}

export async function signInWithGoogleForCalendar(
  readOnly: boolean = true
): Promise<void> {
  const calendarScope = readOnly
    ? 'https://www.googleapis.com/auth/calendar.readonly'
    : 'https://www.googleapis.com/auth/calendar'

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: calendarScope,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: window.location.origin,
    },
  })

  if (error) {
    throw new Error(`Google 로그인 실패: ${error.message}`)
  }
}

export async function fetchCalendarEvents(
  calendarId: string = 'primary',
  timeMin?: string,
  timeMax?: string,
  maxResults: number = 50
): Promise<GoogleCalendarEventsResponse> {
  const googleAccessToken = await getGoogleAccessToken()

  if (!googleAccessToken) {
    throw new Error('Google 로그인이 필요하거나, 캘린더 권한이 없습니다.')
  }

  const queryParams = new URLSearchParams({
    maxResults: maxResults.toString(),
  })

  if (timeMin) {
    queryParams.append('timeMin', timeMin)
  }

  if (timeMax) {
    queryParams.append('timeMax', timeMax)
  }

  const apiUrl = `${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${calendarId}/events?${queryParams.toString()}`

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `캘린더 데이터 가져오기 실패: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`
    )
  }

  const calendarData: GoogleCalendarEventsResponse = await response.json()
  return calendarData
}

export async function fetchUpcomingCalendarEvents(
  daysAhead: number = 30
): Promise<GoogleCalendarEvent[]> {
  const now = new Date()
  const timeMin = now.toISOString()
  
  const futureDate = new Date(now)
  futureDate.setDate(futureDate.getDate() + daysAhead)
  const timeMax = futureDate.toISOString()

  const calendarEventsResponse = await fetchCalendarEvents(
    'primary',
    timeMin,
    timeMax
  )

  return calendarEventsResponse.items
}

export async function deleteCalendarEvent(
  eventId: string,
  calendarId: string = 'primary'
): Promise<void> {
  const googleAccessToken = await getGoogleAccessToken()

  if (!googleAccessToken) {
    throw new Error('Google 로그인이 필요하거나, 캘린더 권한이 없습니다.')
  }

  const apiUrl = `${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${calendarId}/events/${eventId}`

  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `캘린더 이벤트 삭제 실패: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`
    )
  }
}

export async function updateCalendarEvent(
  eventId: string,
  updates: Partial<GoogleCalendarEvent>,
  calendarId: string = 'primary'
): Promise<GoogleCalendarEvent> {
  const googleAccessToken = await getGoogleAccessToken()

  if (!googleAccessToken) {
    throw new Error('Google 로그인이 필요하거나, 캘린더 권한이 없습니다.')
  }

  const apiUrl = `${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${calendarId}/events/${eventId}`

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `캘린더 이벤트 수정 실패: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`
    )
  }

  const updatedEvent: GoogleCalendarEvent = await response.json()
  return updatedEvent
}

export async function createCalendarEvent(
  eventData: {
    summary: string
    description?: string
    start: {
      dateTime?: string
      date?: string
      timeZone?: string
    }
    end: {
      dateTime?: string
      date?: string
      timeZone?: string
    }
    location?: string
  },
  calendarId: string = 'primary'
): Promise<GoogleCalendarEvent> {
  const googleAccessToken = await getGoogleAccessToken()

  if (!googleAccessToken) {
    throw new Error('Google 로그인이 필요하거나, 캘린더 권한이 없습니다.')
  }

  const apiUrl = `${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${calendarId}/events`

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `캘린더 이벤트 생성 실패: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`
    )
  }

  const createdEvent: GoogleCalendarEvent = await response.json()
  return createdEvent
}
