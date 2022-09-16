export class BaseError extends Error {
    constructor(message: string, public code: number) {
      super(message);
    }
  }
export class ErrorMySql extends Error {
    sqlMessage!: string;
    
    constructor(sqlMessage: string, public code: number) {
      super(sqlMessage);
    }
  }

  