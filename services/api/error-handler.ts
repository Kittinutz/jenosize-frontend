/**
 * API Error Types and Handler
 * Handles all API-related errors
 */

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public error?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export interface ErrorResponse {
  statusCode: number
  message: string
  error?: string
}

/**
 * Parse error response from API
 */
export const parseErrorResponse = async (
  response: Response,
): Promise<ErrorResponse> => {
  try {
    return await response.json()
  } catch {
    return {
      statusCode: response.status,
      message: response.statusText || 'An error occurred',
      error: response.statusText,
    }
  }
}

/**
 * Handle API errors and throw ApiError
 */
export const handleApiError = async (response: Response): Promise<never> => {
  const errorData = await parseErrorResponse(response)
  throw new ApiError(errorData.statusCode, errorData.message, errorData.error)
}
