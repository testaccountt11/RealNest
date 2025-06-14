declare module 'drizzle-kit' {
  export interface Config {
    schema: string;
    out: string;
    driver: 'pg' | 'postgres';
    dbCredentials: {
      connectionString: string;
    };
    verbose?: boolean;
    strict?: boolean;
  }
} 