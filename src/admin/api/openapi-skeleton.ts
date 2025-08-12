// Admin-only OpenAPI skeleton (planning/mock)
// Status: internal, not public. Do not expose externally.

export type ApiSettings = {
  contact_email_for_api: string
  api_auth_model: 'apiKey' | 'oauth2' | 'both'
  versioning: 'url' | 'header'
  rate_limit: number
  webhook_signing: 'hmac-sha256' | 'none'
}

export const defaultApiSettings: ApiSettings = {
  contact_email_for_api: 'developers@featherbiz.io',
  api_auth_model: 'apiKey',
  versioning: 'url',
  rate_limit: 60,
  webhook_signing: 'hmac-sha256',
}

export function buildOpenApiSkeleton(settings: Partial<ApiSettings> = {}) {
  const cfg = { ...defaultApiSettings, ...settings }
  const servers = cfg.versioning === 'url' ? [{ url: 'https://api.featherbiz.io/v1' }] : [{ url: 'https://api.featherbiz.io' }]

  return {
    openapi: '3.1.0',
    info: {
      title: 'FeatherBiz API (Skeleton)',
      version: '0.0.0-mock',
      description: 'Internal planning spec. Endpoints are mock only and may change.',
      contact: { email: cfg.contact_email_for_api },
      'x-status': 'mock',
    },
    servers,
    tags: [
      { name: 'estimates' },
      { name: 'assignments' },
      { name: 'voices' },
      { name: 'calc' },
    ],
    externalDocs: { description: 'Admin preview only', url: 'https://featherbiz.io/admin/api/preview' },
    components: {
      securitySchemes: cfg.api_auth_model === 'apiKey' ? {
        ApiKeyAuth: { type: 'apiKey', in: 'header', name: 'X-API-Key' },
      } : cfg.api_auth_model === 'oauth2' ? {
        OAuth2: { type: 'oauth2', flows: { clientCredentials: { tokenUrl: 'https://auth.featherbiz.io/oauth/token', scopes: {} } } },
      } : {
        ApiKeyAuth: { type: 'apiKey', in: 'header', name: 'X-API-Key' },
        OAuth2: { type: 'oauth2', flows: { clientCredentials: { tokenUrl: 'https://auth.featherbiz.io/oauth/token', scopes: {} } } },
      },
      schemas: {
        Problem: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            title: { type: 'string' },
            status: { type: 'integer' },
            detail: { type: 'string' },
            instance: { type: 'string' },
          },
        },
        Estimate: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            estimate_number: { type: 'string' },
            title: { type: 'string' },
            amount: { type: 'number' },
            status: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Assignment: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            status: { type: 'string' },
            scheduled_date: { type: 'string', format: 'date' },
          },
        },
        VoiceLog: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            from: { type: 'string' },
            to: { type: 'string' },
            duration_seconds: { type: 'integer' },
            started_at: { type: 'string', format: 'date-time' },
          },
        },
        QuoteCalcRequest: {
          type: 'object',
          properties: {
            items: { type: 'array', items: { type: 'object', properties: { qty: { type: 'number' }, price: { type: 'number' } } } },
            tax_rate: { type: 'number' },
            discount: { type: 'number' },
          },
          required: ['items'],
        },
        QuoteCalcResponse: {
          type: 'object',
          properties: {
            subtotal: { type: 'number' },
            tax: { type: 'number' },
            discount: { type: 'number' },
            total: { type: 'number' },
          },
        },
      },
    },
    security: cfg.api_auth_model === 'oauth2' ? [{ OAuth2: [] }] : [{ ApiKeyAuth: [] }],
    paths: {
      '/v1/estimates': {
        get: {
          tags: ['estimates'],
          summary: 'List estimates',
          'x-status': 'mock',
          parameters: [
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 50 } },
            { name: 'cursor', in: 'query', schema: { type: 'string' } },
          ],
          responses: {
            '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Estimate' } } } } },
            '401': { description: 'Unauthorized', content: { 'application/problem+json': { schema: { $ref: '#/components/schemas/Problem' } } } },
          },
        },
        post: {
          tags: ['estimates'],
          summary: 'Create estimate',
          'x-status': 'mock',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Estimate' } } } },
          responses: {
            '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Estimate' } } } },
            '400': { description: 'Bad Request', content: { 'application/problem+json': { schema: { $ref: '#/components/schemas/Problem' } } } },
          },
        },
      },
      '/v1/assignments': {
        get: {
          tags: ['assignments'],
          summary: 'List assignments',
          'x-status': 'mock',
          responses: { '200': { description: 'OK' } },
        },
        post: {
          tags: ['assignments'],
          summary: 'Create assignment',
          'x-status': 'mock',
          responses: { '201': { description: 'Created' } },
        },
      },
      '/v1/voices': {
        get: {
          tags: ['voices'],
          summary: 'List call logs',
          'x-status': 'mock',
          responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/VoiceLog' } } } } } },
        },
      },
      '/v1/calc/quote': {
        post: {
          tags: ['calc'],
          summary: 'Estimate math',
          'x-status': 'mock',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/QuoteCalcRequest' } } } },
          responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/QuoteCalcResponse' } } } } },
        },
      },
    },
    'x-security': {
      rate_limit_per_minute: cfg.rate_limit,
      webhook_signing: cfg.webhook_signing,
      versioning: cfg.versioning,
    },
  }
}
