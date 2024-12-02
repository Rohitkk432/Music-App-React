import { Pool as PgPool, PoolConfig, QueryResult, QueryResultRow } from 'pg'

class Pool {
  private _pool: PgPool | null = null

  async connect(options: PoolConfig): Promise<QueryResult> {
    try {
      this._pool = new PgPool(options)
      // Test the connection
      const result = await this._pool.query('SELECT NOW()')
      return result
    } catch (error) {
      if (this._pool) {
        await this._pool.end()
      }
      throw error
    }
  }

  async close(): Promise<void> {
    if (this._pool) {
      await this._pool.end()
    }
  }

  async query<T extends QueryResultRow>(sql: string, params?: any[]): Promise<QueryResult<T>> {
    if (!this._pool) {
      throw new Error('Cannot execute query. Pool not connected')
    }
    return this._pool.query<T>(sql, params)
  }
}

export default new Pool() 