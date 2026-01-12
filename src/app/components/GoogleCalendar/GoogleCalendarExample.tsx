import { useGoogleCalendar } from '@/app/hooks/useGoogleCalendar'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export function GoogleCalendarExample() {
  const {
    calendarEvents,
    isLoadingEvents,
    isAuthenticated,
    errorMessage,
    handleSignIn,
    handleSignOut,
    refreshCalendarEvents,
  } = useGoogleCalendar()

  const formatEventDateTime = (event: { start: { dateTime?: string; date?: string } }) => {
    if (event.start.dateTime) {
      return format(new Date(event.start.dateTime), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })
    }
    if (event.start.date) {
      return format(new Date(event.start.date), 'yyyy년 MM월 dd일', { locale: ko })
    }
    return '날짜 없음'
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Google 캘린더</h2>
        <div className="flex gap-2">
          {isAuthenticated ? (
            <>
              <button
                onClick={refreshCalendarEvents}
                disabled={isLoadingEvents}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                새로고침
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              onClick={handleSignIn}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Google로 로그인
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {!isAuthenticated && (
        <div className="p-4 bg-gray-100 border border-gray-300 rounded text-gray-700">
          Google 계정으로 로그인하여 캘린더 일정을 확인하세요.
        </div>
      )}

      {isAuthenticated && isLoadingEvents && (
        <div className="p-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">캘린더 일정을 불러오는 중...</p>
        </div>
      )}

      {isAuthenticated && !isLoadingEvents && calendarEvents.length === 0 && (
        <div className="p-4 bg-gray-100 border border-gray-300 rounded text-gray-700">
          예정된 일정이 없습니다.
        </div>
      )}

      {isAuthenticated && !isLoadingEvents && calendarEvents.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">다가오는 일정 ({calendarEvents.length}개)</h3>
          <div className="space-y-2">
            {calendarEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-lg mb-2">{event.summary}</div>
                <div className="text-sm text-gray-600 mb-1">
                  📅 {formatEventDateTime(event)}
                </div>
                {event.location && (
                  <div className="text-sm text-gray-600 mb-1">📍 {event.location}</div>
                )}
                {event.description && (
                  <div className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {event.description}
                  </div>
                )}
                {event.htmlLink && (
                  <a
                    href={event.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline mt-2 inline-block"
                  >
                    캘린더에서 보기 →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
